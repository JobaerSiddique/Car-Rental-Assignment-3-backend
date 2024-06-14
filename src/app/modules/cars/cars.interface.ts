

export type TCars = {
    name:string,
    description:string,
    color:string,
    isElectric:boolean,
    features:string[],
    status:'available'|'unavailable',
    pricePerHour:number,
    isDeleted:boolean,
}