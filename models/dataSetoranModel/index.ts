import { db } from '../../db';

export const dataSetoranModel = async () => {
    // aktifkan foreign key constraint (hanya perlu dilakukan sekali saat inisialisasi DB)
    await (await db).execAsync(`PRAGMA foreign_keys = ON;`);

    // model
    await (await db).execAsync(`
        CREATE TABLE IF NOT EXISTS data_setoran (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idKeuangan INTEGER,
            setoran REAL,
            plus BOOLEAN,
            date TEXT,
            ket TEXT,
            typeData TEXT,
            FOREIGN KEY (idKeuangan) REFERENCES data_keuangan(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
    `);

    console.log('data_setoran model with foreign key created');
};
