import { User } from './state/user/user';
import { userReducer } from './state/user/user.reducer';

export interface AppState {
    user: User;
}

export const structure = {
    user: userReducer
}