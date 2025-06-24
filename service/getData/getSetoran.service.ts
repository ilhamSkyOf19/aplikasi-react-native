import { DataSetoran, TypeData } from '@/interface/type';
import { db } from '../../db';


export const getDataSetoran = async (colom: string, value: string | TypeData): Promise<DataSetoran[]> => {
    try {
        // ambil data
        const result = (await db).getAllAsync<DataSetoran>(
            `SELECT * FROM data_setoran WHERE ${colom} = ? ORDER BY date DESC`,
            [value]
        );

        // kembalikan response
        return result;
    } catch (error) {
        console.error('gagal mengambil data setoran', error);
        return [];
    }
}