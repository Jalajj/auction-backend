const Category = require("../models/category.model")

exports.create = (req, res) => {
   Category.create(req.body).then((category) => {
       res.json(category);
   }).catch((err) => {
       console.log(err)
   })
}
exports.categoryById = (req, res , next) => {
     Category.findById(req.params.categoryId).exec((err, category) => {
         if(err || !category){
             return res.status(400).json({
                 error: 'Category does not exist'
             })
         }
         req.category = category;
         next();
     })
}
exports.read = (req, res) => {
    return res.json(req.category);
}

exports.updateCategory = (req, res) => {
     Category.findByIdAndUpdate(req.params.categoryId, {
         $set:req.body
     }, {new: true}).then((newCategory) => {
        return res.status(200).json(newCategory)
    }).catch((err) => {
        console.log(err)
        return res.status(404).json("Error undefined");
    })
}
exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId).then((resp) => {
        return res.status(200).json(resp)
    }).catch((err) => {
        console.log(err)
        return res.status(404).json("Error undefined");
    })
}
exports.allCategory = (req , res) => {
    Category.find({}).then((categories) => {
        return res.status(200).json(categories)
    }).catch((err) => {
        console.log(err)
        return res.status(404).json("Error undefined");
    })
}