const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var productSchema=new mongoose.Schema({
	// _id:mongoose.Schema.Types.ObjectId,
	product_name:{
		type:String,
		require:true
	},
	price:{
		type:Number,
		required:true
	},
	quantity:{
		type:Number,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	data:{
		type:Date,
		default:Date.now()
	}
});
var productModel=mongoose.model("Products",productSchema);
module.exports=productModel; 