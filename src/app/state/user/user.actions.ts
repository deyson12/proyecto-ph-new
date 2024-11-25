import { Action } from '@ngrx/store';
import { User } from '../../domain/user';

export const SAVE = '[User] - Save'
export const REMOVE = '[User] - Remove'

export class SaveAction implements Action {
    readonly type = SAVE;
    constructor(public payload: User) {}
}

export class RemoveAction implements Action {
    readonly type = REMOVE;
    constructor() {}
}

export type actions = SaveAction;
