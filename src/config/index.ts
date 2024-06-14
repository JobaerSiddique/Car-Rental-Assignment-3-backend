import * as dotenv from 'dotenv'
dotenv.config()



export default{
    port:process.env.PORT,
    db:process.env.DB,
    secret:process.env.SECRET,
    jwt:process.env.JWT,
    salt_Rounds:process.env.SALT_ROUNDS
}