# ngx-dexie

Dexie module for Angular 2.0+ projects

## Install

``` npm install ngx-dexie --save ```

## How to use

### Import and configure DexieModule

```ts
//...
import {DexieModule,DexieConfig} from 'ngx-dexie';

const config: DexieConfig = {
  databaseName: 'AppDatabase',//your database name here
  schema: {
            friends: '++id,first_name,last_name',
            teachers: '++id,first_name,last_name'
          } // any schema of your choice
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DexieModule.forRoot(config)
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
```

### Using your dexie instance

The ```DexieModule``` provides now a configured Dexie db instance and a Dexie db service,i.e. ```DexieService``` which can be injected anywhere inside the ```AppModule```.

```ts
import {Injectable} from '@angular/core';
import {DexieService} from 'ngx-dexie';

@Injectable()
export class IndexedDbService {

    constructor(private dexieService: DexieService) {}

    addOneFriend(friendObject: Object) {
        this.dexieService.addOne('friends',friendObject);
    }

}
```
## API

### `dexieService.addOne(table: string,object: Object)`
Adds the entry ```object``` to the dexie table ```table```