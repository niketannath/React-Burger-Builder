import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{

    state = {
        //ingredients: null,
        //totalPrice: 100,
        //purchasable: false,
        purchasing: false,
        loading: false,
        //error: false
    }

    componentDidMount = () => {
        // axios.get('https://the-burger-builder-fee33.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data})
        //     })
        //     .catch(err=>{this.setState({error:true})})

        this.props.onInitIngredients();
    }

    // addIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount+1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = newCount;
    //     this.setState({ingredients:updatedIngredients,totalPrice:this.state.totalPrice+INGREDIENT_PRICES[type]});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0) 
    //         return;
    //     const newCount = oldCount-1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = newCount;
    //     this.setState({ingredients:updatedIngredients,totalPrice:this.state.totalPrice-INGREDIENT_PRICES[type]});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    updatePurchaseState = ingredients => {
        /*for(let i in this.state.ingredients)
            if(this.state.ingredients[i] > 0)
            {
                this.setState({purchasable:true});
                break;
            }
            */
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0)
        //this.setState({purchasable: sum > 0});
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated)
            this.setState({purchasing:true});
        else
        {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    closeModalHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        //alert("Order Successful!");
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'NikeDaddy',
        //         address: {
        //             street: 'Park Street',
        //             zipCode: '123456',
        //             country: 'WonderLand'
        //         },
        //         email: 'daddy@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json',order)
        //     .then(res => {
        //         this.setState({loading: false,purchasing: false})
        //     })
        //     .catch(err => this.setState({loading: false,purchasing: false}));

        // const queryParams = [];

        // for(let i in this.state.ingredients)
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))

        // queryParams.push('price=' + this.props.price);
        
        // const queryString = queryParams.join('&');
        
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {...this.props.ings};
        for(let i in disabledInfo)
            disabledInfo[i] = disabledInfo[i] <= 0;
    /*
        let x = 0; 
        for(let i in this.state.ingredients)
            if(this.state.ingredients[i] > 0)
            {
                x++;
                break;
            }
        let disableOrder = x < 1; */
        
        let orderSummary = null;

        if(this.props.ings)
            orderSummary = (<OrderSummary showBackdrop={this.closeModalHandler} ingredients={this.props.ings} 
                                            continue={this.purchaseContinueHandler} price={this.props.price}/>);

        if(this.state.loading)
            orderSummary = (<Spinner></Spinner>);
        
        let burger = this.props.error ? <p style={{textAlign:'center'}}>Ingredients cannot be loaded!</p> : <Spinner></Spinner>;

        if(this.props.ings)
            burger = (
                        <Aux>
                            <Burger ingrdnt={this.props.ings}></Burger>
                            <BuildControls 
                                disableOrder={this.updatePurchaseState(this.props.ings)} price={this.props.price} 
                                disable={disabledInfo} ingadded={this.props.addIngredientFun} ingremoved={this.props.removeIngredientFun}
                                ordered={this.purchaseHandler} isAuth={this.props.isAuthenticated}>
                            </BuildControls>
                        </Aux>
                     );
       
        if(this.state.loading)
            orderSummary = (<Spinner></Spinner>);

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.closeModalHandler}>
                        {orderSummary}
                </Modal>
                <div style={{marginTop:'100px'}}>
                    {burger}
                </div>
            </Aux>
        );

    }
}
//export default BurgerBuilder;

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addIngredientFun: (item) => dispatch(actions.addIngredient(item)),
        removeIngredientFun: (item) => dispatch(actions.removeIngredient(item)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));