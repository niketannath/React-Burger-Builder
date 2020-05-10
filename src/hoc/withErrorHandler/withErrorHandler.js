import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const fun = (WrappedComponent,axios) => {
    return class extends Component {   
        state = {
            error: null
        }
        UNSAFE_componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res=>res,error => {
                this.setState({error:error});
            })
        }
        
        componentWillUnmount = () => {
            //console.log("WILL UNMOUNT",this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){                                                           //RETURNING A FUNCTIONAL COMPONENT
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </Aux>
            );
        }
    }
}

export default fun;