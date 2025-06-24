import { db } from "@/db";
import { DataKeuangan, TypeData } from "@/interface/type";

export const addDataKeuangan = async (typeData: TypeData, data: DataKeuangan): Promise<boolean> => {
    console.log(typeData);
    try {
        const database = await db;

        database?.withTransactionAsync(async () => {
            await database?.runAsync(
                `
                INSERT INTO data_keuangan (idCurrency, img, nama, target, targetSetoran, tabungan, date, tercapai, typeData)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
                `,
                [
                    data.idCurrency,
                    data.img,
                    data.nama,
                    data.target,
                    data.targetSetoran,
                    data.tabungan,
                    data.date,
                    data.tercapai,
                    typeData
                ]
            );
        });

        // Cek apakah data berhasil dimasukkan (misal berdasarkan nama dan tanggal)
        const result = await database.getFirstAsync(
            `SELECT * FROM data_keuangan WHERE nama = ? AND date = ? ORDER BY id DESC LIMIT 1`,
            [data.nama, data.date]
        );

        if (result) {
            console.log("✅ Data berhasil ditambahkan ke DB:", result);
            return true;
        } else {
            console.warn("⚠️ Data tidak ditemukan setelah insert.");
            return false;
        }

    } catch (error) {
        console.error('❌ Gagal menambahkan data keuangan:', error);
        return false;
    }
};
