import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType : 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail ID'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType : 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount = () => {
        if(!this.props.building && this.props.authRedirectPath !== '/')
            this.props.onSetAuthRedirectPath();
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls:updatedControls});
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !(prevState.isSignup)
            }
        })
    }

    render(){
        const formElementsArray = [];
        for(let keys in this.state.controls)
            formElementsArray.push({
                id: keys,
                config: this.state.controls[keys]
            })

        let form = formElementsArray.map(formElement => {
            return (
                <div key={formElement.id}>
                    <Input elementType = {formElement.config.elementType} elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value} invalid = {!formElement.config.valid} 
                        changed = {(event)=>this.inputChangedHandler(event,formElement.id)}
                        shouldValidate = {formElement.config.validation} touched = {formElement.config.touched}></Input>
                    
                </div> 
                 )
        })

        if(this.props.loading)
            form = <Spinner></Spinner>;

        let errorMessage = null;

        if(this.props.error)
            errorMessage = (<p style={{color:"red",fontWeight:"bolder",fontSize:"1.2em"}}>{this.props.error.message}</p>);

        let authRedirect = null;

        if(this.props.isAuthenticated)
        {
            if(this.props.building)
                authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>
                
            else
                authRedirect = <Redirect to='/'></Redirect>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">{this.state.isSignup ? 'SIGN IN' : 'SIGN UP'} INSTEAD</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);