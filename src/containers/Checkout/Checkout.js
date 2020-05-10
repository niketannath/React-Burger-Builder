import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/index';

class Checkout extends Component{
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // componentDidMount = () => {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelHandler = () => {
        this.props.history.push('/');               //this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    // UNSAFE_componentWillMount = () => {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries())
    //     {   
    //         if(param[0] === 'price')
    //             price = param[1];
    //         else
    //             ingredients[param[0]] = +param[1];
    //     }

    //     this.setState({ingredients: ingredients,totalPrice:price});
    //     console.log(ingredients);
    // }

    render(){
        let summary = <Redirect to='/'></Redirect>;

        if(this.props.ings)
        {
            const purchasedRedirect = this.props.purchased ? <Redirect to = '/'></Redirect> : null;
            summary = (
                    <div>
                        {purchasedRedirect}
                        <CheckoutSummary checkoutCancelled={this.checkoutCancelHandler} 
                                        checkoutContinued={this.checkoutContinueHandler} 
                                        ingredients={this.props.ings}>
                        </CheckoutSummary>
                        <Route path = {this.props.match.url + "/contact-data"} component = {ContactData}></Route>
                    </div>);
        }

        return summary;
        // return (
        //     <div>
        //         {summary}
        //         {/* <Route path = {this.props.match.url + "/contact-data"} render = {(props) => {
        //             return (
        //                 <div>
        //                     <ContactData {...props} ingredients = {this.props.ings} totalPrice = {this.props.price}></ContactData>
        //                 </div>
        //             );
        //         }}></Route> */}
                
        //     </div>
        // );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return { 
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps,/*mapDispatchToProps*/)(Checkout);