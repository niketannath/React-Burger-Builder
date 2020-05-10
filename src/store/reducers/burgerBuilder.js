import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 100,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 50,
    paneer: 100,
    cheese: 30,
    chicken: 100
};

const addIngredient = (state,action) => {
    const updatedIngredient = {[action.item]: state.ingredients[action.item] + 1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.item],
        building: true
    }
    return updateObject(state,updatedState);
}

const removeIngredient = (state,action) => {
    if(state.ingredients[action.item] <= 0)
        return state;
    
    const updatedIng = {[action.item]: state.ingredients[action.item] - 1}
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.item],
        building: true
    }
    return updateObject(state,updatedSt);
}

const setIngredients = (state,action) => {
    return updateObject(state,{
        ingredients: {
            salad: action.ingredients.salad,
            paneer: action.ingredients.paneer,
            cheese: action.ingredients.cheese,
            chicken: action.ingredients.chicken
        },
        error: false,
        totalPrice: 100,
        building: false
    });
}

const fetchIngredientsFailed = (state,action) => {
    return updateObject(state,{error:true});
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        // case 'CLEAN_HOME_PAGE':
        //     return initialState;

        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
            
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
            
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);

        default: return state;
    }
}

export default reducer;