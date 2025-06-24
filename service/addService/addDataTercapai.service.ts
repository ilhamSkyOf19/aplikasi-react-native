import { TypeData } from "@/interface/type";
import { db } from "../../db";

export const updateDataTercapai = async (id: number, typeData: TypeData): Promise<boolean> => {
    try {
        const database = await db;
        database?.withTransactionAsync(async () => {
            await database?.runAsync(
                `
          UPDATE data_keuangan 
          SET tercapai = 'tercapai' 
          WHERE id = ? AND typeData = ?;
          `,
                [id, typeData]
            );
        })

        console.log("✅ Status 'tercapai' berhasil di-update untuk ID:", id);
        return true;
    } catch (error) {
        console.error("❌ Gagal update status 'tercapai':", error);
        return false;
    }
};
