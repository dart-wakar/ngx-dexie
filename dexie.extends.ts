import {
    ICreateChange,
    IUpdateChange,
    IDeleteChange
} from 'dexie-observable/api';

export { DatabaseChangeType } from 'dexie-observable/api';

export interface CreateChange<T> extends ICreateChange {
    obj: T;
}

export interface UpdateChange<T> extends IUpdateChange {
    mods: Partial<T>;
}

export interface DeleteChange extends IDeleteChange {}

export type DatabaseChange<T> = CreateChange<T> | UpdateChange<T> | DeleteChange;
