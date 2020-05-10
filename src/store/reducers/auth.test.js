import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

configure({adapter: new Adapter()});

describe('Auth Reducer',() => {
    
    it('should return the initial state',() => {
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: '/'
        });
    })

    it('should store token upon login',() => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: '/'
        },{
            type:actionTypes.AUTH_SUCCESS,
            token:'some-token',
            userId:'some-userId'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})