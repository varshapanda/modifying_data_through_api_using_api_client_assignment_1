const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const MenuItems = require('./schema.js');
dotenv.config();

const app = express();
app.use(express.json());

mongoose
.connect(process.env.ATLAS_URL)
.then(()=>console.log('Connected to MongoDB Atlas'))
.catch((error)=>console.error('Error while connecting to MongoDB Atlas',error))

app.post('/menu',async(req,res)=>{
  try{
    const {name,description,price}=req.body;
    if(!(name && price)){
      return res.status(400).json({
        success:false,
        message:'Name and price are required',
      });
    }
    const newMenuItems = await MenuItems.create({
      name,
      description,
      price,
    });
    res.status(201).json({
      success:true,
      message:'New Item created successfully',
      data:newMenuItems
    })
  }
  catch(error){
    res.status(400).json({
      success:false,
      message:'Error creating menu Item',
      error:error.message,
    })
  }
});

app.get('/menu',async(req,res)=>{
  try{
    const menuItems = await MenuItems.find();
    res.status(200).json({
      success:true,
      data:menuItems
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:'Error fetching menu Items',
      error:error.message,
    })
  }
})

const port = process.env.PORT||3010;
app.listen(port, () => {
  console.log(`The server is running on port http://localhost:${port}`);
});
