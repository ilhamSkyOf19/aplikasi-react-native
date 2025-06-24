import { db } from '../../db';

export const updateSetoran = async (
    id: string,              // ID dari baris yang ingin di-update
    valueSetoran: number,    // Nilai baru untuk kolom 'setoran'
    valueKeterangan: string  // Nilai baru untuk kolom 'ket'
): Promise<boolean> => {
    try {
        const database = await db;
        database?.withTransactionAsync(async () => {
            await database?.runAsync(
                `UPDATE data_setoran SET setoran = ?, ket = ? WHERE id = ?`,
                [valueSetoran, valueKeterangan, id]
            );
        })

        console.log('Data setoran berhasil diupdate');
        return true;
    } catch (error) {
        console.error('Gagal mengupdate data setoran:', error);
        return false;
    }
};
