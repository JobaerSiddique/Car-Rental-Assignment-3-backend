import * as dotenv from 'dotenv'
dotenv.config()



export default{
    port:process.env.PORT,
    db:process.env.DB,
    secret:process.env.SECRET,
    jwt:process.env.JWT,
    RefreshToken:process.env.RefreshToken,
    salt_Rounds:process.env.SALT_ROUNDS,
    NODE_ENV: process.env.NODE_ENV,
    accessTokenExpires:process.env.access_Expires,
    refreshTokenExpires:process.env.refresh_Expires,
    store_Id:process.env.storeID,
    store_pass:process.env.storePassword,
    reset_link: process.env.resetLink,
    GMAIL_USER : process.env.gUser,
    GMAIL_PASS : process.env.gPass,
    Netlify_Link : process.env.RESET_LINK_NETLIFY
   
}