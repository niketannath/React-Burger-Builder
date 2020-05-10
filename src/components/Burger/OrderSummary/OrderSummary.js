import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
//import { Link } from 'react-router-dom';

class order extends Component {
    render(){
        const ingredients = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                            <span style={{textTransform: 'capitalize'}}> {igKey} </span> : {this.props.ingredients[igKey]}
                    </li>
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: Rs. {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.showBackdrop}>CANCEL</Button>
                {/*<Link to="/checkout">*/}<Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default order;
