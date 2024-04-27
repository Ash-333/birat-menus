const mongoose=require('mongoose')

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    cuisine:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cuisine'
    }
})

const Menu=mongoose.model('menu',menuSchema)
module.exports=Menu