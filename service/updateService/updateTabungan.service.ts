import { db } from '../../db';

export const updateTabungan = async (
    id: string,             // ID dari data yang ingin diupdate
    column: string,         // Kolom mana yang ingin diupdate (contoh: 'tabungan')
    value: string | number  // Nilai baru untuk kolom tersebut
): Promise<boolean> => {
    try {
        const database = await db;
        await database?.withTransactionAsync(async () => {
            console.log(`Updating ${column} to ${value} where id = ${id}`);
            await database?.runAsync(
                `UPDATE data_keuangan SET ${column} = ? WHERE id = ?`,
                [value, id]
            );

        })

        console.log('Tabungan berhasil diperbarui');
        return true;
    } catch (error) {
        console.error('Gagal memperbarui tabungan:', error);
        return false;
    }
};
