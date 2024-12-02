import mongoose from "mongoose";

const connectDb = async  () => {
    mongoose.connection.on("connected", () => {
        console.log("connected");
        
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/cheatsheet-website`)
}
export default connectDb;