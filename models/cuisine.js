const mongoose=require('mongoose')
const cuisineSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    resId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    }
})

const Cuisine=new mongoose.model('cuisine',cuisineSchema)
module.exports=Cuisine

