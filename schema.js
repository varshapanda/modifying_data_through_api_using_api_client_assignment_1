const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Menu item is/are required']
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:[true, 'Price is required']
    }
    
})
const MenuItems = mongoose.model('MenuItems',menuItemsSchema);
module.exports = MenuItems