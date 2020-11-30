var productModel=require('../../module/products');

exports.getAllProducts=(req,res,next)=>{
	productModel.find({})
		.then(data=>{
		res.status(200).json({
			messgae:"ok",
			result:data
		})
	})
	.catch(err=>{
		res.json(err);
	})
}

//add product controller
exports.addProducts=function(req,res,next){
	console.log(req.file);
	var product_name=req.body.name;
	var price=req.body.price;
	var quantity=req.body.quantity;

	var productDetails=new productModel({
		// _id:mongoose.Schema.Types.ObjectId(),
		product_name:product_name,
		price:price,
		quantity:quantity,
		image:req.file.path
	});
	productDetails.save()
	.then(data=>{
		res.status(201).json({
			messgae:"data inserted successfully",
			result:data
		})
	})
	.catch(err=>{
		res.json(err);
	})

};