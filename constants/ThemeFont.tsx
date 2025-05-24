import { useFonts } from "expo-font";

export const useThemeFonts = (): boolean => {
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    });

    return fontsLoaded;
};
