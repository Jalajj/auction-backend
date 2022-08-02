const Product = require("../models/product.model");

exports.create = (req, res) => {
  const productData = { title: req.body.title, 
    price: req.body.price, 
    seller: req.params.userId,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category
}
    Product.create(req.body).then((product) => {
        return res.status(200).json(product);
    }).catch((err) =>{
        console.log(err)
    })
 }

exports.list = (req, res) => {
    const price = req.query.price;
    const category = req.query.category;
    Product.find(category ? {category: category[0].toUpperCase() + category.slice(1)}: {})
    .sort(price == 'low' ? {price: -1}: price == 'high' ? {price: 1}: null)
    .then((products) => {
        return res.status(200).json(products)
    }).catch((err) => {
        return res.status(400).json(err)
    })
}

 
exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.productId).then((resp) => {
        res.status(200).json(resp)
    }).catch((err) => {
        console.log(err);
    })
}

exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, {
        $set:req.body
    }, {new:true}).then((newProduct) => {
        return res.status(200).json(newProduct)
    }).catch((err) => {
        console.log(err)
        return res.status(404).json("Error undefined");
    })
}


exports.read = (req, res) => {
    Product.findById(req.params.productId).then((product) => {
        // req.profile = user;
        return res.status(200).json(product);
    }).catch((err) => {
        console.log(err);
    })
    // return res.json(req.product);
}

exports.biddedProducts = async (req, res) => {
    try{
      const bidded = await Product.find({bidders: {$elemMatch : {user: req.params.userId}}})
       if(bidded){
        return res.status(200).json(bidded)
    }else{
     return res.status(400).json({error: 'Cant find bids'})
    }
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.makeBid = async (req, res) => {
    try{
      
        // const  data = includesBidder? {bid: req.body.bid} : {user: req.params.userId, bid: req.body.bid}

           const bid = await Product.findByIdAndUpdate(req.params.productId, 
                {$addToSet: {bidders: {user: req.params.userId, bid: req.body.bid}},
                 $set: {price: req.body.bid}
          }).exec();
   if(bid){
    return res.status(200).json(bid)
   }else{
    return res.status(400).json({error: 'Cant make a bid'})
   }
    }catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.updateBid = (req, res) => {
        // const product = await Product.findById(req.params.productId).exec();
        // const includesBidder = product.bidders.map((bids) => {
        //     if(bids.user == req.params.userId){
        //         return bids._id
        //       }
        // })
        Product.update({_id: req.params.productId, bidders: {$elemMatch : {_id: req.params.bidId}}}, 
            { $set: { "bidders.$.bid" : req.body.bid, price: req.body.bid}}).then((updated) => {
            return res.status(200).json(updated)
          }).catch((err) => {
            console.log(err);
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          })
}