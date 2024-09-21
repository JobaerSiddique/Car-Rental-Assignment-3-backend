import SSLCommerzPayment from 'sslcommerz-lts';
import mongoose from "mongoose";
import config from "../../../config";
import catchAsync from "../../utilis/catchAsync";
import { PaymentService } from "./payment.services";
import { generateTransId } from './payment.utils';
import { Payment } from './payment.model';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';


const store_id = config.store_Id;
const store_passwd = config.store_pass;
const is_live = false; // Set to true for production


const createPayment = catchAsync(async(req,res)=>{
    const id= req.params.id;
    
    const result = await PaymentService.createPaymentIntoDB(id);

    const session = await mongoose.startSession();
    session.startTransaction();
    

    try {
        const trans_id = generateTransId()
        const data = {
            total_amount: result.totalCost,
            currency: 'BDT',
            tran_id:trans_id , // Unique transaction ID
            success_url: `https://car-rental-assignment-3-backend.vercel.app/api/payment/paymentSuccess/${trans_id}`,
            fail_url: `https://car-rental-assignment-3-backend.vercel.app/api/payment/paymentFailed/${trans_id}`,
            cancel_url: `https://car-rental-assignment-3-backend.vercel.app/api/payment/paymentCancel/${trans_id}`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: result.car.name,
            product_category: result.car.types,
            product_profile: 'general',
            cus_name: result.user.name,
            cus_email: result.user.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: result.user.phone,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        
        const apiResponse = await sslcz.init(data);

        if (apiResponse && apiResponse.GatewayPageURL) {
            const payment = new Payment({
                bookingId: result._id,
                totalCost: result.totalCost,
                transId: trans_id,
                status: 'Pending',
               
            });

          result.paid = 'unpaid'
          await result.save({session})

          try {
            await payment.save({ session });
        } catch (saveError) {
            console.error("Error saving payment:", saveError);
            throw new Error('Failed to save payment to the database');
        }

           
            await session.commitTransaction();
            session.endSession();
            
            res.send({url:apiResponse.GatewayPageURL});
            console.log(apiResponse.GatewayPageURL);
            

            
        } else {
            throw new Error('Failed to generate payment gateway URL');
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
    
})

const userPaymentHistory = catchAsync(async(req,res)=>{
    
   const userId = req.user.userId
   
     const result = await PaymentService.userPaymentHistoryDB(userId)
     sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Payment History retrieved successfully",
        data:result,
     })
 })



const paymentSuccess = catchAsync(async(req,res)=>{
    const {trans_id} = req.params;
   const result = await PaymentService.paymentSuccessDB(trans_id);
  
res.redirect(`https://dapper-nasturtium-bce1b7.netlify.app/dashboard/payment/success/${trans_id}`)

})


const paymentCancel = catchAsync(async(req,res)=>{
    const {trans_id} = req.params;
    const result = await PaymentService.paymentCancelDB(trans_id);
    res.redirect(`https://dapper-nasturtium-bce1b7.netlify.app/dashboard/payment/cancel/${trans_id}`)
})

const paymentFailed = catchAsync(async(req,res)=>{
    const {trans_id} = req.params;
   const result = await PaymentService.paymentFailedDB(trans_id);

res.redirect(`https://dapper-nasturtium-bce1b7.netlify.app/dashboard/payment/failed/${trans_id}`)
  
})

const getPaymentInfo = catchAsync(async(req,res)=>{
    const { trans_id } = req.params;
    const result = await PaymentService.getPaymentInfoDB(trans_id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Payment Info",
        data:result,
    })
})



export const PaymentController ={
    createPayment,
    paymentSuccess,
    paymentCancel,
    paymentFailed,
    getPaymentInfo,
    userPaymentHistory
   
}