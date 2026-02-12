declare module 'sql.js' {
  export interface Database {
    run(sql: string, params?: unknown[]): void;
    exec(sql: string): { columns: string[]; values: unknown[][] }[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }
  export interface Statement {
    bind(values: unknown[] | Record<string, unknown>): boolean;
    step(): boolean;
    get(): unknown[];
    getAsObject(): Record<string, unknown>;
    free(): void;
  }
  export interface SqlJsStatic {
    Database: {
      new (data?: Uint8Array): Database;
    };
  }
  export default function initSqlJs(config?: {
    locateFile?: (file: string) => string;
  }): Promise<SqlJsStatic>;
}
