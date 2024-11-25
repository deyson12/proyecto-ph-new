import { Apartment } from "./apartment";

export interface Building {
    id: string;
    name: string;
    apartments: Apartment[];
}