import { Injectable } from '@angular/core';
import { from, bindCallback, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dexie } from 'dexie';

import { DatabaseChange } from './dexie.extends';
import { DexieDatabase } from './dexie.database';

@Injectable()
export class DexieService<T extends object = any> {
    
    constructor(private db: DexieDatabase) {}

    /**
     * Adds the entry ```object``` to the dexie table ```table```.
     * Returns a promise which when resolved gives the key of the object added, when rejected gives the error that occured.
     * 
     * @param table table name
     * @param object object to add
     */
    addOne<TKey extends keyof T>(table: TKey, object: T[TKey]) {
        return from(this.db.table(String(table)).add(object));
    }

    /**
     * Adds multiple ```objects``` to the dexie table ```table```
     * Returns a promise which works similar to Dexie ```bulkAdd()```
     * 
     * @param table table name
     * @param objects objects to add
     */
    addMultiple<TKey extends keyof T>(table: TKey, objects: T[TKey][]) {
        return from(this.db.table(String(table)).bulkAdd(objects));
    }

    /**
     * Returns a promise which when resolved gives the number of objects in the table ```table```
     * 
     * @param table table name
     */
    count<TKey extends keyof T>(table: TKey) {
        return from(this.db.table(String(table)).count());
    }

    /**
     * Works similar to Dexie ```put()```
     * 
     * @param table table name
     * @param object 
     * @param key 
     */
    addOrUpdateOne<TKey extends keyof T>(table: TKey, object: T[TKey], key?: any) {
        if(key) {
            return from(this.db.table(String(table)).put(object, key));
        } else {
            return from(this.db.table(String(table)).put(object));
        }
    }

    /**
     * Works similar to Dexie ```bulkPut()```
     * 
     * @param table table name
     * @param objects 
     * @param keys 
     */
    addOrUpdateMultiple<TKey extends keyof T>(table: TKey, objects: T[TKey][], keys?: any) {
        if(keys) {
            return from(this.db.table(String(table)).bulkPut(objects, keys));
        } else {
            return from(this.db.table(String(table)).bulkPut(objects));
        }
    }

    /**
     * Works similar to Dexie ```delete()```
     * 
     * @param table table name
     * @param primaryKey 
     */
    deleteOne<TKey extends keyof T>(table: TKey, primaryKey: any) {
        return from(this.db.table(String(table)).delete(primaryKey));
    }

    /**
     * Works similar to Dexie ```bulkDelete()```
     * 
     * @param table table name
     * @param primaryKeys 
     */
    deleteMultiple<TKey extends keyof T>(table: TKey, primaryKeys: any[]) {
        return from(this.db.table(String(table)).bulkDelete(primaryKeys));
    }

    /**
     * Works similar to Dexie ```clear()```
     * 
     * @param table table name
     */
    clearAll<TKey extends keyof T>(table: TKey) {
        return from(this.db.table(String(table)).clear());
    }

    // check
    /**
     * Works similar to Dexie ```each()```
     * 
     * @param table table name
     * @param callback 
     */
    operateOnEach<TKey extends keyof T>(table: TKey, callback: (item: T[TKey], idbCursor: any) => any) {
        return from(this.db.table(String(table)).each(callback));
    }

    /**
     * Works similar to Dexie ```filter()```
     * 
     * @param table table name
     * @param filterFunction 
     */
    filter<TKey extends keyof T>(table: TKey, filterFunction: (value: T[TKey]) => boolean) {
        return this.db.table(String(table)).filter(filterFunction) as Dexie.Collection<T[TKey], TKey>;
    }

    // check
    /**
     * Works similar to Dexie ```get()```
     * 
     * @param table table name
     * @param primaryKey 
     * @param callback 
     */
    getByPrimaryKey<TKey extends keyof T>(table: TKey, primaryKey: any, callback?: (item: T[TKey]) => any) {
        if(callback) {
            return from(this.db.table(String(table)).get(primaryKey, callback));
        } else {
            return from(this.db.table(String(table)).get(primaryKey));
        }
    }

    // check
    /**
     * Works similar to Dexie ```get()```
     * 
     * @param table table name
     * @param keyValueMap 
     * @param callback 
     */
    getByKeyToValueMap<TKey extends keyof T>(table: TKey, keyValueMap: Object, callback?: (item: T[TKey]) => any) {
        if(callback) {
            return from(this.db.table(String(table)).get(keyValueMap, callback));
        } else {
            return from(this.db.table(String(table)).get(keyValueMap));
        }
    }

    /**
     * Works similar to Dexie ```limit()```
     * 
     * @param table table name
     * @param num 
     */
    getFirstNItemsOfTable<TKey extends keyof T>(table: TKey, num: number) {
        return this.db.table(String(table)).limit(num) as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * Works similar to Dexie ```orderBy()```
     * 
     * @param table table name
     * @param index 
     */
    orderBy<TKey extends keyof T>(table: TKey, index: string) {
        return this.db.table(String(table)).orderBy(index) as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * Works similar to Dexie ```offset()```
     * 
     * @param table table name
     * @param ignoreUpto 
     */
    offset<TKey extends keyof T>(table: TKey, ignoreUpto: number) {
        return this.db.table(String(table)).offset(ignoreUpto) as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * Works similar to Dexie ```reverse()```
     * 
     * @param table table name
     */
    reverse<TKey extends keyof T>(table: TKey) {
        return this.db.table(String(table)).reverse() as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * Works similar to Dexie ```toArray()```
     * 
     * @param table table name
     * @param callback 
     */
    toArray<TKey extends keyof T>(table: TKey, callback?: (objects: T[TKey][]) => any) {
        if(callback) {
            return from(this.db.table(String(table)).toArray(callback));
        } else {
            return from(this.db.table(String(table)).toArray());
        }
    }

    /**
     * Works similar to Dexie ```toCollection()```
     * 
     * @param table table name
     */
    toCollection<TKey extends keyof T>(table: TKey) {
        return this.db.table(String(table)).toCollection() as Dexie.Collection<T[TKey], TKey>;
    }

    // check
    /**
     * Works similar to Dexie ```update()```
     * 
     * @param table table name
     * @param key 
     * @param changes 
     */
    update<TKey extends keyof T>(table: TKey, key: any, changes: T[TKey]) {
        return from(this.db.table(String(table)).update(key, changes));
    }

    onChanges(): Observable<DatabaseChange<any>[]>
    onChanges<TKey extends keyof T>(table: TKey): Observable<DatabaseChange<T[TKey]>[]>
    onChanges<TKey extends keyof T>(table?: TKey): Observable<DatabaseChange<T[TKey]>[]> {
        const onChange = (cb: (changes: DatabaseChange<T[TKey]>[]) => void) => this.db.on('changes', cb);
        return bindCallback(onChange)().pipe(
            map(changes => changes.filter(x => !table || x.table === table))
        );
    }

}
