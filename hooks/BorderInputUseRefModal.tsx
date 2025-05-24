import { useEffect, useRef, useState } from "react";
import { TextInput, ViewStyle } from "react-native";

// interface Parameter {
//     triger: boolean;
// }


export const useBorderInputUseRefModal = (triger: boolean, setTriger: (triger: boolean) => void) => {
    const inputRef = useRef<TextInput>(null)

    const [borderColor, setBorderColor] = useState<ViewStyle>({ borderColor: 'black', borderWidth: 0.9 });

    useEffect(() => {
        if (triger) {
            inputRef.current?.focus();
            setBorderColor({ borderColor: 'red', borderWidth: 0.9 })

            const timer = setTimeout(() => {
                setTriger(false)
            }, 2500);
            return () => clearTimeout(timer);
        } else {
            setBorderColor({ borderColor: 'black', borderWidth: 0.9 })
        }
    }, [triger])


    return { inputRef, borderColor }
}