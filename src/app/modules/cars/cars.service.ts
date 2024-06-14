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

export const CarService = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB
} 