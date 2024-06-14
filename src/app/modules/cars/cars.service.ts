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

export const CarService = {
    createCarsIntoDB,
    getAllCarsFromDB
} 