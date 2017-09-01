import {Injectable} from '@angular/core';
import {DexieDatabase} from './dexie.database';

@Injectable()
export class DexieService {
    
    constructor(private db: DexieDatabase) {}

    addOne(table: string,object: Object) {
        return this.db.table(table).add(object);
    }

    addMultiple(table: string,objects: Object[]) {
        return this.db.table(table).bulkAdd(objects);
    }

    count(table: string) {
        return this.db.table(table).count();
    }

    addOrUpdateOne(table: string,object: Object,key?: any) {
        if(key) {
            return this.db.table(table).put(object,key);
        } else {
            return this.db.table(table).put(object);
        }
    }

    addOrUpdateMultiple(table: string,objects: Object[],keys?: any) {
        if(keys) {
            return this.db.table(table).bulkPut(objects,keys);
        } else {
            return this.db.table(table).bulkPut(objects);
        }
    }

    deleteOne(table: string,primaryKey: any) {
        return this.db.table(table).delete(primaryKey);
    }

    deleteMultiple(table: string,primaryKeys: any[]) {
        return this.db.table(table).bulkDelete(primaryKeys);
    }

    clearAll(table: string) {
        return this.db.table(table).clear();
    }

    operateOnEach(table: string,callback: (item: any,idbCursor: any) => any) {
        return this.db.table(table).each(callback);
    }

    filter(table: string,filterFunction: (value: any) => boolean) {
        return this.db.table(table).filter(filterFunction);
    }

    getByPrimaryKey(table: string,primaryKey: any,callback?: (item: Object) => any) {
        if(callback) {
            return this.db.table(table).get(primaryKey,callback);
        } else {
            return this.db.table(table).get(primaryKey);
        }
    }

    getByKeyToValueMap(table: string,keyValueMap: Object,callback?: (item: Object) => any) {
        if(callback) {
            return this.db.table(table).get(keyValueMap,callback);
        } else {
            return this.db.table(table).get(keyValueMap);
        }
    }

    getFirstNItemsOfTable(table: string,num: number) {
        return this.db.table(table).limit(num);
    }

    orderBy(table: string,index: string) {
        return this.db.table(table).orderBy(index);
    }

    offset(table: string,ignoreUpto: number) {
        return this.db.table(table).offset(ignoreUpto);
    }

    reverse(table: string) {
        return this.db.table(table).reverse();
    }

    toArray(table: string,callback?: (objects: Object[]) => any) {
        if(callback) {
            return this.db.table(table).toArray(callback);
        } else {
            return this.db.table(table).toArray();
        }
    }

    toCollection(table: string) {
        return this.db.table(table).toCollection();
    }

    update(table: string,key: any,changes: Object) {
        return this.db.table(table).update(key,changes);
    }

}