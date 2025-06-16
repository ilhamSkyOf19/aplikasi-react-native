import * as Sqlite from 'expo-sqlite';
const db = Sqlite.openDatabaseAsync('keuangan.db');

export default db;