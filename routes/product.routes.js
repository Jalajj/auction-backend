const express = require("express");
const router = express.Router();
const {create, read, deleteProduct, updateProduct, filterProducts, makeBid, list, updateBid, biddedProducts} = require('../controller/product.controller');

router.post("/create/:userId", create);
router.get("/:productId", read);

router.delete("/:productId/:userId", deleteProduct);

router.put("/:productId/:userId", updateProduct);

router.put('/make/bid/:productId/:userId', makeBid);
router.put('/update/bid/:productId/:bidId', updateBid);

router.get('/get/bidded/:userId', biddedProducts)

router.get("/", list);

// router.get('/different', filterProducts)

module.exports = router;