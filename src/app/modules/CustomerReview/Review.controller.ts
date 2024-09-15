import catchAsync from "../../utilis/catchAsync";



const createReview = catchAsync(async(req,res)=>{
    const {review} = req.body;
    console.log({review});
})





export const ReviewController = {
    createReview
}