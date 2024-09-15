import { Types } from "mongoose";

export type TReview = {
    user:Types.ObjectId;
    car:Types.ObjectId;
    comment: string;
    ratings:number;
}