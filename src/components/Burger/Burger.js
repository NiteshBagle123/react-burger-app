import React from 'react';
import classes from  './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        })
    })
    .reduce((arr, ele) => {
        return arr.concat(ele)
    }, []);

    if(!transformedIngredient.length){
        transformedIngredient = <p>Please start adding ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
