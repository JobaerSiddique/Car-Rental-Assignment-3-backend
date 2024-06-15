import { TCars } from "./cars.interface"
import { Cars } from "./cars.model"



const createCarsIntoDB = async(payload:TCars)=>{
    const result = await Cars.create(payload)
    return result;
}

const getAllCarsFromDB = async()=>{
    const result = await Cars.find()
    return result;
}

const getSingleCarFromDB = async(id:string)=>{
    const result = await Cars.findById(id)
    return result;
}


const updateCarFromDB = async(id:string, payload:TCars)=>{
    const result = await Cars.findByIdAndUpdate(id,payload)
    return result
}
const deleteCarFromDB = async(id:string)=>{
    const result = await Cars.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}

const returnCarfromDB = async(bookingId:string,endTime:string)=>{
   
}
export const CarService = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB,
    returnCarfromDB
} 