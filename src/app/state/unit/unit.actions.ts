import { Action } from '@ngrx/store';
import { Unit } from '../../domain/unit';

export const SAVE = '[Unit] - Save'
export const REMOVE = '[Unit] - Remove'

export class SaveAction implements Action {
    readonly type = SAVE;
    constructor(public payload: Unit) {}
}

export class RemoveAction implements Action {
    readonly type = REMOVE;
    constructor() {}
}

export type actions = SaveAction;
