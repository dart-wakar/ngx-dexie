import {Injectable} from '@angular/core';
import {DexieDatabase} from './dexie.database';

@Injectable()
export class DexieService {
    
    constructor(private db: DexieDatabase) {}

    addOne(table: string,object: Object) {
        this.db.table(table).add(object)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

}