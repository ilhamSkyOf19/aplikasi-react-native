import React from 'react';
// import * as Notifications from 'expo-notifications';

import PencapaianPages from '@/pages/Pencapaian/PencapaianPages';
import { useRouter } from 'expo-router';

const Pencapaian: React.FC = () => {

    const router = useRouter()
    const handleSettings = (): void => {
        router.push('/settings');
    };
    const handleAbout = (): void => {
        router.push('/about');
    };


    return (
        <PencapaianPages handleSettings={handleSettings} handleAbout={handleAbout} />
    )
}

export default Pencapaian;
