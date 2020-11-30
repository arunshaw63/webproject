router.get('/delete/:id',function(req,res,next){
   var passCat_id=req.params.id;
  console.log('this is id of password'+passCat_id);
    var passdelete= passCateModel.findByIdAndDelete(passCat_id);
  passdelete.exec(function(err){
    if(err) throw err;
    res.redirect('/passwordCategory');
  });
  
});