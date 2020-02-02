export type DexieConfigSchema<T> = {
    [key in keyof T]: string;
}

export interface DexieConfig<T extends object = any> {
    databaseName: string;
    databaseVersion?: number;
    schema: DexieConfigSchema<T>;
}
