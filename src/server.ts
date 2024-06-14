
import mongoose from "mongoose";
import app from "./app";
import config from "./config";



async function main() {
    try {
        await mongoose.connect(config.db as string);
        console.log(config.db );
        app.listen(config.port, () => {
            console.log(`Car Rentals sever is running ${config.port}`)
          })
    } catch (error) {
        console.log(error)
    }
  
   
  }


  main()