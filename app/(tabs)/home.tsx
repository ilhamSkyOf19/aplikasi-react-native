import React, { useCallback } from 'react';
// import * as Notifications from 'expo-notifications';

import TabunganPages from '@/pages/HomeScreen/TabunganPages';
import { useRouter } from 'expo-router';

const Tabungan: React.FC = () => {
    const router = useRouter()

    const handleSettings = useCallback((): void => {
        router.push('/settings');
    }, []);

    const handleAbout = useCallback((): void => {
        router.push('/about');
    }, [])




    return (
        <TabunganPages handleSettings={handleSettings} handleAbout={handleAbout} />
    )
}

export default Tabungan;
