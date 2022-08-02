const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
       
        title: String,
        description: String,
        bids: Number,
        price: Number, //will be stored in cents?
        bidders: [{
        user : {
        type:  mongoose.Schema.Types.ObjectId,
        ref:'User'
        },
        bid: Number,
        }],
        seller: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }, 
        image: String,
        category: {
            type: String,
            required:true,      
        }
       
}, {timestamps:true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;