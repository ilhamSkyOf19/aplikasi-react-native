import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout: React.FC = () => {

    return (

        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#11A7FE", tabBarInactiveTintColor: "gray" }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={20} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="pencapaian"
                options={{
                    title: "Pencapaian",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="trophy" size={20} color={color} />
                    ),
                }}
            />

        </Tabs>
    );
}


export default TabsLayout;