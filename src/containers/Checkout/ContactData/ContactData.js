import React,{ Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class Contact extends Component{
    state = {
        orderForm: {
            name: {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pinCode: {
                elementType : 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'PIN Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            // country: {
            //     elementType : 'input',
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'Country'
            //     },
            //     value: '',
            //     validation: {
            //         required: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            mobile: {
                elementType : 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Mobile No.'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            email: {
                elementType : 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType : 'select',
                elementConfig: {
                    options: [{value:'fastest',displayValue:'Fastest'},
                              {value:'cheapest',displayValue:'Cheapest'}]
                },
                value: 'fastest',
                valid: true
            }
        },
        //loading: false,
        formIsValid: false
    }

    orderHandler = event => {
        event.preventDefault();
        //this.setState({loading: true});

        const formData = {};
        
        for(let formElement in this.state.orderForm)
            formData[formElement] = this.state.orderForm[formElement].value;
        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token);

        // axios.post('/orders.json',order)
        //     .then(res => {
        //         this.setState({loading: false});
        //         //this.props.abc();
        //         this.props.history.push('/');
        //     })
        //     .catch(err => this.setState({loading: false}));
    }

    inputChangedHandler = (event,inputType) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputType],{
            value: event.target.value,
            valid: checkValidity(event.target.value,this.state.orderForm[inputType].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputType]: updatedFormElement
        })
            
        let isValidForm = true;
        for(let key in updatedOrderForm)
            if(!updatedOrderForm[key].valid)
            {
                isValidForm = false;
                break;
            }

        this.setState({orderForm:updatedOrderForm,formIsValid:isValidForm}); 
    }

    render(){
        const formElementsArray = [];
        for(let keys in this.state.orderForm)
            formElementsArray.push({
                id: keys,
                config: this.state.orderForm[keys]
            })
        let form = (
            <form onSubmit={this.orderHandler}>
                    {/* <Input inputtype="input" type="text" name="name" placeholder="Your Name"></Input><br></br> */}
                    {/* <Input inputtype="input" type="email" name="email" placeholder="Your Mail"></Input><br></br>
                    <Input inputtype="input" type="text" name="street" placeholder="Your Street"></Input><br></br>
                    <Input inputtype="input" type="text" name="postal" placeholder="Your Postal Code"></Input><br></br> */}
                    {formElementsArray.map(formElement => {
                        return <Input elementType = {formElement.config.elementType} elementConfig = {formElement.config.elementConfig}
                                      key = {formElement.id} value = {formElement.config.value} invalid = {!formElement.config.valid}
                                      changed = {(event)=>this.inputChangedHandler(event,formElement.id)}
                                      shouldValidate = {formElement.config.validation} touched = {formElement.config.touched}
                                      ></Input>
                    })}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>PLACE ORDER</Button>
                </form>
        );

        if(this.props.loading)
            form = <Spinner></Spinner>

        return (
            <div className={classes.ContactData}>
                <h4>Enter your details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        //abc: () => dispatch({type:'CLEAN_HOME_PAGE'})
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Contact,axios));