import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const fun = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Your tasty burger is waiting</h1>
            <div style={{width:'100%',margin:'auto'}}> 
                <Burger ingrdnt={props.ingredients}></Burger>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default fun;