
import httpStatus from "http-status";
import { Bookings } from "../booking/booking.model"
import AppError from "../Error/AppError";
import { Payment } from "./payment.model";
import mongoose from "mongoose";







const createPaymentIntoDB = async(id:string)=>{
    const booking = await Bookings.findById({_id:id}).populate('user').populate('car');
    if(!booking){
        throw new AppError(httpStatus.BAD_REQUEST,"Booking not found")
    }
   return booking;
}

const paymentSuccessDB = async(id:string)=>{
      const session = await mongoose.startSession();

      session.startTransaction();


      try {
        const payment = await Payment.findOne({transId:id}).session(session)
        if(!payment){
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,"Payment not found")
        }
        payment.date = new Date().toLocaleDateString(); 
        payment.status = 'Complete'
        await payment.save({session});
        const booking = await Bookings.findById(payment.bookingId).session(session).populate('car')      // Populate car details
        .populate('user');
            if (!booking) {
                throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
            }
           
            booking.paid = 'paid';
            await booking.save({ session });
            
            // Commit the transaction
        
            await session.commitTransaction();
            session.endSession();
            return{payment,booking}
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(httpStatus.BAD_GATEWAY,"Transaction not successful")
      }
    
    
    
}


const paymentCancelDB = async(id:string)=>{
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the payment by transaction ID
    const payment = await Payment.findOne({ transId: id }).session(session);

    if (!payment) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Payment not found");
    }

    // Update the payment status to 'Failed'
    payment.status = 'Cancel';
    await payment.save({ session });

    // Find the booking associated with the payment
    const booking = await Bookings.findById(payment.bookingId)
      .session(session)
      .populate('car')  // Assuming 'car' is a reference to another collection
      .populate('user') // Assuming 'user' is a reference to another collection
              // Execute the query to populate the fields

    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }

    // No need to update the booking's payment status since it's failed

    // Commit the transaction
    await session.commitTransaction();
    
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_GATEWAY, "Transaction not successful");
  } finally {
    // End the session
    session.endSession();
  }
}

const paymentFailedDB = async(id:string)=>{
    const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the payment by transaction ID
    const payment = await Payment.findOne({ transId: id }).session(session);

    if (!payment) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Payment not found");
    }

    // Update the payment status to 'Failed'
    payment.status = 'Failed';
    await payment.save({ session });

    // Find the booking associated with the payment
    const booking = await Bookings.findById(payment.bookingId)
      .session(session)
      .populate('car')  // Assuming 'car' is a reference to another collection
      .populate('user') // Assuming 'user' is a reference to another collection
              // Execute the query to populate the fields

    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }

    // No need to update the booking's payment status since it's failed

    // Commit the transaction
    await session.commitTransaction();
    
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_GATEWAY, "Transaction not successful");
  } finally {
    // End the session
    session.endSession();
  }
};


const getPaymentInfoDB = async(id:string)=>{
  const result = await Payment.findOne({transId:id})
            .populate({
                path: 'bookingId',
                populate: [
                    { path: 'user', model: 'User' },  
                    { path: 'car', model: 'Car' }    
                ]
            })
            .exec();
            if(!result){
              throw new AppError(httpStatus.NOT_FOUND,"Payment not found")   
            }
  return result;
}


export const  PaymentService = {
    createPaymentIntoDB,
    paymentSuccessDB,
    paymentCancelDB,
    paymentFailedDB,
    getPaymentInfoDB
 
}