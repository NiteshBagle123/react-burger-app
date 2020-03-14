import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from  '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredient: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredient}/>
                <div>Burger controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
