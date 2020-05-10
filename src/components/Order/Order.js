import React from 'react';
import classes from './Order.css';

const Order = props => {
    const ingredients = [];
    
    for(let ingredientName in props.ingredients)
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })

    const output = ingredients.map(ig => {
        return <span style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid grey',
                padding: '5px'
        }} key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>Rs.{props.price}</strong></p>
        </div>
    );
}

export default Order;