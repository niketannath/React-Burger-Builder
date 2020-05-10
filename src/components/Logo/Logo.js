import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = props => {
    
    return (
        <div className={classes.Logo}>
            <img alt="MyBurger" src={burgerLogo}></img>
        </div>
    );
}

export default logo;

