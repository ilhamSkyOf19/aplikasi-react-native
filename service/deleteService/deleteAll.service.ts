import { db } from "../../db";

export const deleteAllData = async (): Promise<boolean> => {
    try {
        const database = await db;

        database?.withTransactionAsync(async () => {
            await database?.runAsync(`DELETE FROM data_setoran`);
            await database?.runAsync(`DELETE FROM data_keuangan`);
        });

        return true;
    } catch (error) {
        console.error('Gagal menghapus data:', error);
        return false;
    }
};
