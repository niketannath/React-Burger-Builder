import React,{ Component } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount = () => {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const orders = [];
        //         for(let key in res.data)
        //         {
        //             orders.push({
        //                 ...res.data[key],
        //                 id:key
        //             })
        //         }
        //         this.setState({orders: orders,loading: false})
        //     })
        //     .catch(err => this.setState({loading: false}));
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading)
            orders = (
                <div>
                    {this.props.orders.map(order => {
                        return <Order key = {order.id} ingredients = {order.ingredients} price = {order.price}></Order>
                    })}
                </div>
            );
        if(this.props.orders.length === 0)
            orders = <p style={{fontWeight:'bold',fontSize:'1.2em',textAlign:'center'}}>Place your first order. :)</p>
        return orders;
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token,uid) => dispatch(actions.fetchOrders(token,uid))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));