var express = require('express');
var router = express.Router();
var passCateModel =require('../module/password_category');
var passModel =require('../module/add_password');
var getPassCat=passCateModel.find({ },{password_category:1,_id:1});
var categoryController=require('./controller/category');



//get category
router.get('/getcategory',categoryController.getCategory);

//add category
router.post('/addcategory',categoryController.addCategory);

//delete category
router.delete('/deletecategory',categoryController.delCategory);

//add new password 
router.post('/add-new-password/',function(req,res,next){
    
   var pass_details=req.body.pass_details;
   var project_name= req.body.project_name;
     var pass_cat=req.body.pass_cat;

     var password_details=new passModel({
      password_category:pass_cat,
      password_detail:pass_details,
      project_name:project_name,
     });
  
    password_details.save()
    .then(doc=>{
    	res.status(201).json({
    		message:'successfully inserted password category',
    		result:doc
    	})
    })
    .catc(err=>{
      res.json(err)
    })
  
});

//get all password
router.get('/getallpasswords',function(req,res,next){
	 // passModel.exec(function(err,data){
  //   if(err) throw err;
  //  res.send(data)
  //     });
	passModel.find()
  .select("password_category password_detail project_name")
  .exec()
  .then(data=>{
		res.status(200).json({
			message:"ok",
			result:data
		});
	}).catch(err=>{
		res.json(err)
	})  

});


module.exports=router;