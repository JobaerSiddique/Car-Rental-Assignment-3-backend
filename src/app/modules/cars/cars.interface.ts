

export type TCars = {
    name:string,
    description:string,
    color:string,
    isElectric:boolean,
    features:string[],
    types:string,
    image:string,
    status:'available'|'unavailable',
    pricePerHour:number,
    isDeleted:boolean,
}