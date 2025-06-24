import { db } from "../../db";
export const deleteDataSetoran = async (id: number): Promise<boolean> => {
    try {
        const result = (await db).runAsync(
            `DELETE FROM data_setoran WHERE id = ?`,
            [id]
        );

        return true
    } catch (error) {
        console.error('Gagal menghapus data setoran:', error);
        return false;
    }
};
