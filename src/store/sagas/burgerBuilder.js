import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action){
    
    try{
        const res = yield axios.get('https://the-burger-builder-fee33.firebaseio.com/ingredients.json')
        yield put(actions.setIngredients(res.data));
    }
    catch(err){
        yield put(actions.fetchIngredientsFailed());
    }
}