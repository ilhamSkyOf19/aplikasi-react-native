import useAnimated from "@/hooks/UseAnimated";
import { height } from "@/utils/utils";

const useAnimation = (value?: number) => {
    // Animasi untuk container atas dan bawah
    const bottomAnim = useAnimated({ from: height, to: 0, duration: 800 });
    // back
    const anim = useAnimated({ from: 400 + (value ?? 0), to: 0, duration: 900 + (value ?? 0) });
    const animOpacity = useAnimated({ from: 0, to: 1, duration: 900 + (value ?? 0) });

    const keyAnimation = {
        bottomAnim,
        anim,
        animOpacity,
    }


    return keyAnimation
}

export default useAnimation