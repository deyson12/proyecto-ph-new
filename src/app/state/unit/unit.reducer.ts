import { Action } from '@ngrx/store';
import * as fromUnitAction from './unit.actions';
import { Unit } from '../../domain/unit';

export const unitInitialState: Unit = {
    name: '',
    logo: '',
    login: '',
    id: ''
};

export function unitReducer(state: Unit = unitInitialState, action: Action) {

    if (action.type === fromUnitAction.SAVE) {
        return (action as fromUnitAction.SaveAction).payload;
    } else if (action.type === fromUnitAction.REMOVE) {
        return unitInitialState;
    } else {
        return state;
    }

}
