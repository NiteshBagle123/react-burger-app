import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from  '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.2,
    meat: 1,
    cheese: 0.1
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredient: null,
        totalprice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://react-burger-app-1612e.firebaseio.com/ingredient.json')
            .then(response => {
                console.log('response.data', response.data);
                this.setState({ ingredient: response.data})
            })
            .catch(err => {
                this.setState({ error: true });
            });
    }
    updatePurchaseState(ingredient) {
        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey]
            })
            .reduce((sum, ele) => {
                return sum + ele;
            },0);
        this.setState({
            purchasable: sum > 0
        });
    }
    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredient[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredient = {
            ...this.state.ingredient
        }
        updatedIngredient[type] = updatedIngredientCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalprice: newPrice,
            ingredient: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredient[type];
        if(oldIngredientCount <=0){
            return;
        }
        const updatedIngredientCount = oldIngredientCount - 1;
        const updatedIngredient = {
            ...this.state.ingredient
        }
        updatedIngredient[type] = updatedIngredientCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalprice: newPrice,
            ingredient: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinue = () => {
        // alert('You continue!');
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredient,
            price: this.state.totalprice,
            customerData: {
                name: 'Nitesh Bagle',
                address: {
                    street: 'testing',
                    zipCode: '411006',
                    country: 'India'
                },
                email: 'test.test@gmail.com',
                deliveryMethod: 'fastest'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
            });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredient
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredient can not be loaded</p> : <Spinner />;
        if(this.state.ingredient){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredient}/>
                        <BurgerControls 
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            burgerPrice={this.state.totalprice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                        />
                </Aux>
            );

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredient}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinue}
            price={this.state.totalprice}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        // disabledInfo = { salad: true,  bacon: true, cheese: true, meat: true }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
