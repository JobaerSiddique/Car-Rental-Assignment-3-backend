import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { ReviewService } from "./Review.service";



const createReview = catchAsync(async(req,res)=>{
    const review = req.body;
    const result = await ReviewService.createReviewDB(review)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Review created successfully",
        data:result
    })
})


const getReview = catchAsync(async(req,res)=>{
    const result = await ReviewService.getReviewDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Review retrived successfully",
        data:result
    })
})





export const ReviewController = {
    createReview,
    getReview
}