import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import {
    Animated
} from 'react-native';


interface Props {
    from: number;
    to?: number;
    duration?: number;
}

const useAnimated = ({ from,
    to = 0,
    duration = 500,
}: Props) => {
    const Anim = useRef(new Animated.Value(from)).current; // mulai di luar layar bawah

    useFocusEffect(
        useCallback(() => {
            Anim.setValue(from); // reset ke posisi awal sebelum animasi

            Animated.timing(Anim, {
                toValue: to,
                duration,
                useNativeDriver: true,
            }).start();

            return () => {
                // Optional: reset saat keluar
                Anim.setValue(0);
            };
        }, [from, to, duration])
    );

    return Anim;
};




export default useAnimated
