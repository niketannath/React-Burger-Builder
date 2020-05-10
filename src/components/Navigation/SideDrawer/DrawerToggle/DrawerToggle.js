import React from 'react';
import classes from './DrawerToggle.css';

const drawer = props => {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawer;