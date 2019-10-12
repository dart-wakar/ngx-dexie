import { Injectable } from '@angular/core';
import { DexieDatabase } from './dexie.database';
import { Dexie } from 'dexie';
import { from } from 'rxjs';

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
     * @param table 
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
     * 
     * @param table 
     * @param primaryKey 
     */
    deleteOne<TKey extends keyof T>(table: TKey, primaryKey: any) {
        return from(this.db.table(String(table)).delete(primaryKey));
    }

    /**
     * 
     * @param table 
     * @param primaryKeys 
     */
    deleteMultiple<TKey extends keyof T>(table: TKey, primaryKeys: any[]) {
        return from(this.db.table(String(table)).bulkDelete(primaryKeys));
    }

    /**
     * 
     * @param table 
     */
    clearAll<TKey extends keyof T>(table: TKey) {
        return from(this.db.table(String(table)).clear());
    }

    // check
    /**
     * 
     * @param table 
     * @param callback 
     */
    operateOnEach<TKey extends keyof T>(table: TKey, callback: (item: T[TKey], idbCursor: any) => any) {
        return from(this.db.table(String(table)).each(callback));
    }

    /**
     * 
     * @param table 
     * @param filterFunction 
     */
    filter<TKey extends keyof T>(table: TKey, filterFunction: (value: T[TKey]) => boolean) {
        return this.db.table(String(table)).filter(filterFunction) as Dexie.Collection<T[TKey], TKey>;
    }

    // check
    /**
     * 
     * @param table 
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
     * 
     * @param table 
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
     * 
     * @param table 
     * @param num 
     */
    getFirstNItemsOfTable<TKey extends keyof T>(table: TKey, num: number) {
        return this.db.table(String(table)).limit(num) as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * 
     * @param table 
     * @param index 
     */
    orderBy<TKey extends keyof T>(table: TKey, index: string) {
        return this.db.table(String(table)).orderBy(index) as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * 
     * @param table 
     * @param ignoreUpto 
     */
    offset<TKey extends keyof T>(table: TKey, ignoreUpto: number) {
        return this.db.table(String(table)).offset(ignoreUpto) as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * 
     * @param table 
     */
    reverse<TKey extends keyof T>(table: TKey) {
        return this.db.table(String(table)).reverse() as Dexie.Collection<T[TKey], TKey>;
    }

    /**
     * 
     * @param table 
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
     * 
     * @param table 
     */
    toCollection<TKey extends keyof T>(table: TKey) {
        return this.db.table(String(table)).toCollection() as Dexie.Collection<T[TKey], TKey>;
    }

    // check
    /**
     * 
     * @param table 
     * @param key 
     * @param changes 
     */
    update<TKey extends keyof T>(table: TKey, key: any, changes: T[TKey]) {
        return from(this.db.table(String(table)).update(key, changes));
    }

}
