import { db } from '@/db';
import { DataKeuangan, TypeData } from '@/interface/type';

const updateAllDataKeuangan = async (
    id: number | string,
    typeData: TypeData,
    data: DataKeuangan
): Promise<boolean> => {
    try {
        const database = await db;

        const {
            idCurrency,
            img,
            nama,
            target,
            targetSetoran,
            tabungan,
            date,
            tercapai,
        } = data;

        await database?.withTransactionAsync(async () => {
            await database?.runAsync(
                `
            UPDATE data_keuangan SET
              idCurrency = ?,
              img = ?,
              nama = ?,
              target = ?,
              targetSetoran = ?,
              tabungan = ?,
              date = ?,
              tercapai = ?,
              typeData = ?
            WHERE id = ?
          `,
                [
                    idCurrency,
                    img,
                    nama,
                    target,
                    targetSetoran,
                    tabungan,
                    date,
                    tercapai,
                    typeData,
                    id
                ]
            );
        })

        console.log('Data berhasil diupdate di SQLite');
        return true;
    } catch (error) {
        console.error('Gagal mengupdate data di SQLite:', error);
        return false;
    }
};

export default updateAllDataKeuangan;
