var passModel =require('../../module/add_password');
var passCateModel =require('../../module/password_category');
var getPassCat=passCateModel.find({ },{password_category:1,_id:1});

exports.getCategory=function(req,res,next){
	 //  getPassCat.exec(function(err,data){
  //   if(err) throw err;
  //   //res.send(data);
  //   res.status(200).json({
  //   	message:"success",
  //   	result:data
  //   })
  // });
  getPassCat.exec()
  .then(data=>{
   res.status(200).json({
   	message:"ok",
   	result:data
   })
  })
  .catch(err=>{
  res.json(err)
  })
	
};

exports.addCategory=function(req,res,next){
	 var passCatName=  req.body.passwordCategory;
        var passDetils=new passCateModel({
                password_category:passCatName
        });
	/*
  passDetils.save(function(err,doc){
    if(err) throw err;
    res.send("success data inserted successfully");
  res.status(201).json({
  	messgage:"data inserted successfully",
  	result:doc
  })
 });
	*/
passDetils.save().then(doc=>{
 	res.status(201).json({
 		message:"category inserted",
 		result:doc
 	})
 }).catch(err=>{
  	res.json(err);
  });

	
};

exports.delCategory=function(req,res,next){
	var delcat=req.body.id;
// 	passCateModel.findByIdAndRemove(delcat,function(err){
// if(err) throw err;
//     res.send('successfullyat deleted');
// 	})
	  	passCateModel.findByIdAndRemove(delcat).then(doc=>{
	    	res.status(201).json({
          message:"successfully deleted",
          result:doc
        })
	    }).catch(err=>{
	    	res.json(err)
	    })
	
};

