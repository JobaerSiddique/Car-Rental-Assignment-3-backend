import { Types } from "mongoose";


export type TBooking ={
    date: Date;
    startTime: string;
    endTime: string;
    user: Types.ObjectId;
    car:Types.ObjectId;
    totalCost: Number;

}