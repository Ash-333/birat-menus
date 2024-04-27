const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv").config()
const port=process.env.PORT||3000
const resturant=require('./routes/resturant')
const menu=require('./routes/menu')
const cuisine=require('./routes/cuisine')
const bodyParser=require('body-parser')

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

  app.get("/", (req, res) => {
    res.send("hello world!");
  });

  app.use('/api',resturant)
  app.use('/api',cuisine)
  app.use('/api',menu)

  app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });