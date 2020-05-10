import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { delay } from 'redux-saga/effects';
import axios from 'axios';
import { config } from '../../config';

export function* logoutSaga(action){
    yield call([localStorage,'removeItem'],"token");
    yield call([localStorage,'removeItem'],"expirationDate");
    yield call([localStorage,'removeItem'],"userId");
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());
}

export function* authUserSaga(action){
    yield put(actions.authStart());
        
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken:true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + config.MY_KEY;
    
    if(!action.isSignup)
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + config.MY_KEY;
    
    try{
        const res = yield axios.post(url,authData);
                
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token',res.data.idToken);
        yield localStorage.setItem('expirationDate',expirationDate);
        yield localStorage.setItem('userId',res.data.localId);
        yield put(actions.authSuccess(res.data.idToken,res.data.localId));
        yield put(actions.checkAuthTimeout(res.data.expiresIn))
    }    

    catch(err){
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action){
    
    const token = yield localStorage.getItem('token');
    
    if(!token)
        yield put(actions.logout())
    
    else
    {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationDate > new Date())
        {
            yield put(actions.authSuccess(token,localStorage.getItem('userId')));
            yield put(actions.checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
        }
        else
            yield put(actions.logout());
    }
    
}