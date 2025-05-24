import { RouteProp } from "@react-navigation/native";
import { SelectedType } from "./type";

//=================
// Route: Setoran
//=================
type RootStackParam = {
    Setoran: {
        header?: string;
        typeData?: string;
    };
};
export type SetoranRouteProp = RouteProp<RootStackParam, "Setoran">;

//=================
// Route: Add
//=================
type RootStackParamAdd = {
    Add: {
        typeData?: SelectedType;
        id?: string;
        tipe?: "edit" | undefined;
    };
};
export type AddRouteProp = RouteProp<RootStackParamAdd, "Add">;

//=================
// Route: Tercapai
//=================
type RootStackParamTercapai = {
    Tercapai: {
        id: string;
    };
};
export type TercapaiRouteProp = RouteProp<RootStackParamTercapai, "Tercapai">;
