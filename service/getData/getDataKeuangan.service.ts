import { DataKeuangan } from '@/interface/type';
import { db } from '../../db';

export const getDataKeuangan = async (typeData: string, status: string): Promise<DataKeuangan[]> => {
    try {
        // ambil data
        const result = (await db).getAllAsync<DataKeuangan>(
            `SELECT * FROM data_keuangan WHERE typeData = ? AND tercapai = ? ORDER BY date DESC`,
            [typeData, status]
        );

        // kembalikan response
        return result;
    } catch (error) {
        console.error('gagal mengambil data keuangan', error);
        return [];
    }
}