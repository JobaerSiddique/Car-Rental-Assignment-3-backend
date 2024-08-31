

export const generateTransId = ()=>{
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `CRH${randomNumber}`;
}

