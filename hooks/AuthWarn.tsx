import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

// Tipe untuk triger peringatan
interface TriggerState {
    kondisi: boolean;
    type: string;
    message: string;
}

// Hook utama
export const useAuthWarn = (
    trigger: TriggerState,
    setTrigger: (trigger: TriggerState) => void,
    inputValue: string
) => {

    const inputRef = useRef<TextInput>(null);

    const [borderStyle, setBorderStyle] = useState<string>('rgba(255,255,255,0.5)');

    useEffect(() => {
        if (!trigger.kondisi) {
            setBorderStyle('rgba(255,255,255,0.5)');
            return;
        }

        // Jika validasi 'max'
        if (trigger.type === 'max' && inputValue.length > 7) {
            setBorderStyle('red');
            return;
        }

        // Jika validasi 'empty'
        if (trigger.type === 'empty' && inputValue === '') {
            setBorderStyle('red');
            return;
        }
        // Jika validasi 'empty'
        if (trigger.type === 'password') {
            setBorderStyle('red');
            return;
        }

        // Reset jika validasi selesai
        setBorderStyle('rgba(255,255,255,0.5)');
        setTrigger({ kondisi: false, type: '', message: '' });
    }, [trigger, inputValue]);


    return { inputRef, borderStyle };
};
