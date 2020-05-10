import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Backdrop.css';

const backdrop = props => {
    return (
        <Aux>
            {props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null}
        </Aux>
    );
}

export default backdrop;