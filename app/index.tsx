import HomePages from "@/pages/HomePages";
import { useRouter } from "expo-router";

export default function Index() {

    const router = useRouter();


    const handleSettings = () => router.push("/settings");
    const handleAbout = () => router.push("/about");


    return <HomePages handleAbout={handleAbout} handleSettings={handleSettings} />;
}
