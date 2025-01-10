import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    follower:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    }],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{
    timestamps:true
})

export const User = mongoose.model("User",schema);