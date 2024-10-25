import { Action } from '@ngrx/store';
import * as fromUserAction from './user.actions';
import { User } from './user';

export const userInitialState: User = {
    username: '',
    isLoggedIn: false
};

export function userReducer(state: User = userInitialState, action: Action) {

    if (action.type === fromUserAction.SAVE) {
        return (action as fromUserAction.SaveAction).payload;
    } else if (action.type === fromUserAction.REMOVE) {
        return userInitialState;
    } else {
        return state;
    }

}
