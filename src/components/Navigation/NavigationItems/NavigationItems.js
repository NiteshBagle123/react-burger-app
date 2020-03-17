import React from 'react';
import classes from './NavigationItems.css';
import NaigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NaigationItem link="/" active>Burger Builder</NaigationItem>
        <NaigationItem link="/">Checkout</NaigationItem>
    </ul>
);

export default navigationItems;