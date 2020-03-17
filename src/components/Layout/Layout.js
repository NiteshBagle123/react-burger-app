import React, { Component } from 'react';
import Aux from  '../../hoc/Aux';
import classes from  './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showDrawer: false
    };
    sideDrawerCloseHandler = () => {
        this.setState({ showDrawer: false });
    }

    switchMenuToolbarHandler = () => {
        this.setState((prevState) => { 
            return ({ showDrawer: !prevState.showDrawer });
        })
    };
    render(){
        return (
            <Aux>
                <Toolbar toggleButton={this.switchMenuToolbarHandler}/>
                <SideDrawer 
                    open={this.state.showDrawer} 
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;
