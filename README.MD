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
Returns a promise which when resolved gives the key of the object added,when rejected gives the error that occured.

### `dexieService.addMultiple(table: string,objects: Object[])`
Adds multiple ```objects``` to the dexie table ```table```
Returns a promise which works similar to Dexie ```bulkAdd()```

### `dexieService.count(table: string)`
Returns a promise which when resolved gives the number of objects in the table ```table```

### `dexieService.addOrUpdateOne(table: string,object: Object,key?: any)`
Works similar to Dexie ```put()```

### `dexieService.addOrUpdateMultiple(table: string,objects: Object[],keys?: any)`
Works similar to Dexie ```bulkPut()```

### `dexieService.deleteOne(table: string,primaryKey: any)`
Works similar to Dexie ```delete()```

### `dexieService.deleteMultiple(table: string,primaryKeys: any[])`
Works similar to Dexie ```bulkDelete()```

### `dexieService.clearAll(table: string)`
Works similar to Dexie ```clear()```

### `dexieService.operateOnEach(table: string,callback: (item: any,idbCursor: any) => any)`
Works similar to Dexie ```each()```

### `dexieService.filter(table: string,filterFunction: (value: any) => boolean)`
Works similar to Dexie ```filter()```

### `dexieService.getByPrimaryKey(table: string,primaryKey: any,callback?: (item: Object) => any)`
Works similar to Dexie ```get()```

### `dexieService.getByKeyToValueMap(table: string,keyValueMap: Object,callback?: (item: Object) => any)`
Works similar to Dexie ```get()```

### `dexieService.getFirstNItemsOfTable(table: string,num: number)`
Works similar to Dexie ```limit()```

### `dexieService.orderBy(table: string,index: string)`
Works similar to Dexie ```orderBy()```

### `dexieService.offset(table: string,ignoreUpto: number)`
Works similar to Dexie ```offset()```

### `dexieService.reverse(table: string)`
Works similar to Dexie ```reverse()```

### `dexieService.toArray(table: string,callback?: (objects: Object[]) => any)`
Works similar to Dexie ```toArray()```

### `dexieService.toCollection(table: string)`
Works similar to Dexie ```toCollection()```

### `dexieService.update(table: string,key: any,changes: Object)`
Works similar to Dexie ```update()```