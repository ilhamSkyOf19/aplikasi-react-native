import React from 'react';
// import * as Notifications from 'expo-notifications';

import TabunganPages from '@/pages/homeScreen/TabunganPages';
import { useRouter } from 'expo-router';

const Tabungan: React.FC = () => {
    const router = useRouter()




    return (
        <TabunganPages />
    )
}

export default Tabungan;
