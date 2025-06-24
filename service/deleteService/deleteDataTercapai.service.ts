import { db } from "../../db";

export const deleteDataTercapai = async (id: string): Promise<boolean> => {
    try {
        const database = await db;

        await database?.withTransactionAsync(async () => {
            await database?.runAsync(`DELETE FROM data_setoran WHERE idKeuangan = ?`, [id]);
            await database?.runAsync(`DELETE FROM data_keuangan WHERE id = ?`, [id]);
        });

        return true;
    } catch (error) {
        console.error('Gagal menghapus data:', error);
        return false;
    }
};
