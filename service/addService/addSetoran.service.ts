import { DataSetoran, TypeData } from "@/interface/type";
import { db } from "../../db";


export const addDataSetoran = async (data: DataSetoran, typeData: TypeData): Promise<boolean> => {
    try {
        const database = await db;
        database?.withTransactionAsync(async () => {
            await database?.runAsync(
                `
                INSERT INTO data_setoran 
                (idKeuangan, setoran, plus, date, ket, typeData) 
                VALUES (?, ?, ?, ?, ?, ?);
                `,
                [
                    data.idKeuangan,
                    data.setoran,
                    data.plus ? 1 : 0, // SQLite tidak punya tipe BOOLEAN → pakai 1/0
                    data.date,
                    data.ket,
                    typeData
                ]
            );
        })

        console.log('data keuangan berhasil ditambahkan');
        console.log(data);
        return true;
    } catch (error) {
        console.error('gagal menambahkan data keuangan', error);
        return false;
    }

}