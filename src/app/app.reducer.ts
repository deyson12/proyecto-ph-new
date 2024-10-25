import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Unit } from './state/unit/unit';
import { unitReducer } from './state/unit/unit.reducer';
import { User } from './state/user/user';
import { userReducer } from './state/user/user.reducer';

export interface AppState {
    user: User;
    unit: Unit
}

export const structure = {
    user: userReducer,
    unit: unitReducer
}
