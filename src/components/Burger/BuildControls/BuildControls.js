import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Paneer',type:'paneer'},
    {label:'Cheese',type:'cheese'},
    {label:'Chicken',type:'chicken'}
];

const build = props => {
    return (
        <div className={classes.BuildControls}>
            <p style={{fontSize:"1.2em"}}>Current Price: <strong>Rs. {props.price}</strong></p>
            {controls.map(el=>(
                <BuildControl added={()=>props.ingadded(el.type)} removed={()=>props.ingremoved(el.type)} 
                    disabled={props.disable[el.type]}
                    key={el.label} label={el.label}>
                </BuildControl>
            ))}
            <button className={classes.OrderButton} disabled={!(props.disableOrder)} onClick={props.ordered}>
            {props.isAuth?"ORDER NOW":"SIGN IN"}</button>
        </div>
    );
}

export default build;