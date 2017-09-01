import {NgModule,ModuleWithProviders,InjectionToken} from '@angular/core';

import {DexieDatabase} from './dexie.database';
import {DexieService} from './dexie.service';
import {DexieConfig} from './dexieConfig';

export function DexieFactory(config: DexieConfig) {
    return new DexieDatabase(config);
}

export const DEXIE_CONFIG_TOKEN = new InjectionToken<DexieConfig>('__DEXIE_CONFIG__');

@NgModule({})
export class DexieModule {

    static forRoot(config: DexieConfig): ModuleWithProviders {
        return {
            ngModule: DexieModule,
            providers: [
                {provide: DEXIE_CONFIG_TOKEN,useValue: config},
                {
                    provide: DexieDatabase,
                    useFactory: DexieFactory,
                    deps: [DEXIE_CONFIG_TOKEN]
                },
                DexieService
            ]
        };
    }
}