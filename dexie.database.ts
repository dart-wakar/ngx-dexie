import {Injectable,EventEmitter,Inject} from '@angular/core';
import Dexie from 'dexie';

import {DexieConfig} from './dexieConfig';
import {DEXIE_CONFIG_TOKEN} from './dexie.module';

@Injectable()
export class DexieDatabase extends Dexie {

    constructor(@Inject(DEXIE_CONFIG_TOKEN) config: DexieConfig) {
        const databaseName: string = config.databaseName;
        const schema: any = config.schema;

        super(databaseName);

        this.version(1).stores(schema);
    }

}