 var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var productModel=require('../module/products');
var multer  = require('multer');
const productsController=require('./controller/product');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now()+file.originalname)
  }
});

const fileFilter =(req, file, cb)=> {

if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png')
  
  {cb(null, true)
   }   
  else 
{  cb(null, false)
 } 
 };
var upload = multer({ 
	storage:storage,
    limits:{
    	filesize:1024*1024*5
    },fileFilter:fileFilter
	  });
    

//add products
router.post('/addProducts',upload.single('productImage'),productsController.addProducts);
//view products
router.get('/getProducts',productsController.getAllProducts)
module.exports=router;