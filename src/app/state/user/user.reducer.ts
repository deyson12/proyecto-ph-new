import { Action } from '@ngrx/store';
import * as fromUserAction from './user.actions';
import { User } from './user';

const initialState: User = {
    username: '',
    isLoggedIn: false
};

export function userReducer(state: User = initialState, action: Action) {

    if (action.type === fromUserAction.SAVE) {
        return (action as fromUserAction.SaveAction).payload;
    } else if (action.type === fromUserAction.REMOVE) {
        return initialState;
    } else {
        return state;
    }

}
