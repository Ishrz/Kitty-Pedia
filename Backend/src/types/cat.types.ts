import type { Document } from "mongoose";

export interface ICAT extends Document {
    name: string;
    color: string;
    breed: string;
    description : string;
    energyLevel : string;
    image: string;
    lifeSpan : number;
    isAppartmentFriendly: boolean;
    isKidsFriendly : boolean;

    createdAt?: Date;
    updatedAt?: Date

}