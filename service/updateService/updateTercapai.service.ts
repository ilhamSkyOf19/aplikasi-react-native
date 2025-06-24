import { db } from "../../db";

export const updateTabunganMulti = async (
    id: string,
    data: Record<string, string | number | null>
): Promise<boolean> => {
    try {
        const database = await db;

        const keys = Object.keys(data);
        const values = Object.values(data);

        // Bentuk query SET column1 = ?, column2 = ?, ...
        const setClause = keys.map((key) => `${key} = ?`).join(', ');

        await database?.withTransactionAsync(async () => {
            await database?.runAsync(
                `UPDATE data_keuangan SET ${setClause} WHERE id = ?`,
                [...values, id]
            );
        });

        console.log('Update berhasil dilakukan');
        return true;
    } catch (error) {
        console.error('Gagal memperbarui tabungan:', error);
        return false;
    }
};
