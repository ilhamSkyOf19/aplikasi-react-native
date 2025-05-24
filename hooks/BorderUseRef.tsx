import { useEffect, useRef, useState } from "react";
import { TextInput, ViewStyle } from "react-native";

// interface Parameter {
//     triger: boolean;
// }


export const useBorderUseRef = (triger: boolean, setTriger: (triger: boolean) => void, inputValue: string, warningMaxInput: boolean, setWaringMaxInput?: (triger: boolean) => void, tipe?: string) => {
    const inputRef = useRef<TextInput>(null)

    const [borderColor, setBorderColor] = useState<ViewStyle>({ borderColor: 'black', borderWidth: 1 });

    // Efek untuk 'triger' input kosong
    useEffect(() => {
        if (triger) {
            if (inputValue === '') {
                inputRef.current?.focus();
                setBorderColor({ borderColor: 'red', borderWidth: 1 });
            } else {
                setBorderColor({ borderColor: 'black', borderWidth: 1 });
                setTriger(false);
            }
        } else {
            setBorderColor({ borderColor: 'black', borderWidth: 1 });
        }
    }, [triger, inputValue]);

    // Efek untuk 'warningMaxInput'
    useEffect(() => {
        if (warningMaxInput) {
            inputRef.current?.focus();
            setBorderColor({ borderColor: 'red', borderWidth: 1 });

            if (tipe === 'nama' || tipe === 'estimasi') {
                const timer = setTimeout(() => {
                    setBorderColor({ borderColor: 'black', borderWidth: 1 });
                    setWaringMaxInput?.(false);
                }, 2000);

                return () => clearTimeout(timer);
            }
        } else {
            setBorderColor({ borderColor: 'black', borderWidth: 1 });
        }
    }, [warningMaxInput]);



    return { inputRef, borderColor }
}