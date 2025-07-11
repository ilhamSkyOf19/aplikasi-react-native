import { DataKeuangan } from '@/interface/type';
import { db } from '../../db';

export const getDataTercapai = async (status: string): Promise<DataKeuangan[]> => {
    try {
        // ambil data
        const result = (await db).getAllAsync<DataKeuangan>(
            `SELECT * FROM data_keuangan WHERE tercapai = ? ORDER BY date DESC`,
            [status]
        );

        // kembalikan response
        return result;
    } catch (error) {
        console.error('gagal mengambil data keuangan', error);
        return [];
    }
}