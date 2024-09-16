import { TContact } from "./contact.interface"
import { Contact } from "./contact.model"


const createContactDB = async(paylaod:TContact) =>{
    const result = await Contact.create(paylaod)
    return result;
}



export const ContactService = {
    createContactDB
}