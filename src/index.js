import dotenv from "dotenv";
import { app } from './app.js'

import { connectDB } from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is ruuning at port ${process.env.PORT}`);
        
    })
})
.catch( (err) => {
    console.log("mysql db connection failed !!!", err)
})