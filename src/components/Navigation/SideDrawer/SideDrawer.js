import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const side = props => {
    let attachedClasses = [classes.SideDrawer];
    if(props.open)
        attachedClasses.push(classes.Open);
    else
        attachedClasses.push(classes.Close);
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </Aux>
    );
}

export default side;