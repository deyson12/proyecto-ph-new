import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Unit } from './domain/unit';
import { unitReducer } from './state/unit/unit.reducer';
import { User } from './domain/user';
import { userReducer } from './state/user/user.reducer';

export interface AppState {
    user: User;
    unit: Unit
}

export const structure = {
    user: userReducer,
    unit: unitReducer
}
