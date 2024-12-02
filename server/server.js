import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongoDB.js"


const app = express();
const port = process.env.PORT || 4000
connectDB()



//middleware
app.use(express.json())
app.use(cors())


app.get("/", (req,res) => {
res.send("API working")
})


app.listen(port,  () => {
    console.log("server running at port : " + port);
    
})