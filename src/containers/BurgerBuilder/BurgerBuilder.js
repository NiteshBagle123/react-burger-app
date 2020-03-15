import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from  '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalprice: 4
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
        })
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
        })
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
                <Burger ingredients={this.state.ingredient}/>
                <BurgerControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    burgerPrice={this.state.totalprice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
