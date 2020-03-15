import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from  '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredient: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalprice: 4,
        purchasable: false,
        purchasing: false
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
        this.setState({purchasing: true})
    }

    purchaseCancel = () => {
        this.setState({purchasing: false})
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredient
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // disabledInfo = { salad: true,  bacon: true, cheese: true, meat: true }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                    <OrderSummary ingredients={this.state.ingredient}/>
                </Modal>
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
    }
}

export default BurgerBuilder;
