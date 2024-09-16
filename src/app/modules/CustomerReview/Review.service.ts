import { Review } from "./Review.model"




const createReviewDB = async(payload:any)=>{
    const result = await  Review.create(payload)
    return result
}


const getReviewDB = async()=>{
    const result = await Review.find({})
    .populate('carId')
    .populate('user')
    return result;
}

export const ReviewService = {
    createReviewDB,
    getReviewDB
}