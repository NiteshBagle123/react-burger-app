import React from 'react';
import classes from './NavigationItems.css';
import NaigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NaigationItem link="/" exact>Burger Builder</NaigationItem>
        <NaigationItem link="/orders">Orders</NaigationItem>
    </ul>
);

export default navigationItems;