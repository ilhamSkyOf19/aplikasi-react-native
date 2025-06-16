import db from '../../db';

export const dataKeuanganModel = async () => {

    // model
    (await db).execAsync(
        `
        CREATE TABLE IF NOT EXISTS data_keuangan (
            id TEXT PRIMARY KEY NOT NULL,
            idCurrency INTEGER,
            img TEXT,
            nama TEXT,
            target REAL,
            targetSetoran REAL,
            tabungan REAL,
            date TEXT,
            tercapai TEXT
        ); `
    )

    console.log('data keuangan model created');
}
