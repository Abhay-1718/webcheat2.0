import mongoose from "mongoose";

const passowordHistorySchema = new mongoose.Schema({
    passowordHash:{
        type:String,
        required:true
    },
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    dateChanged:{
        type:Date,
        default:Date.now
    },
})

const PasswordHistory = mongoose.model('PasswordHistory', passowordHistorySchema);

export default PasswordHistory;