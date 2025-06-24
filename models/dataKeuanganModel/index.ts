import { db } from '../../db';

export const dataKeuanganModel = async () => {

    // model
    const database = await db;
    database?.withTransactionAsync(async () => {
        await database?.execAsync(
            `
            CREATE TABLE IF NOT EXISTS data_keuangan (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                idCurrency INTEGER,
                img TEXT,
                nama TEXT,
                target REAL,
                targetSetoran REAL,
                tabungan REAL,
                date TEXT,
                tercapai TEXT,
                typeData TEXT,
                dateTercapai TEXT
            ); `
        )
    })

    console.log('data keuangan model created');

}
