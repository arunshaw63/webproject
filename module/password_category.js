const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useCreateIndex: true,});
//require('dotenv').config();
//var dburl=process.env.MONDO_DB_URL;
//mongoose.connect(dburl,{useNewUrlParser: true, useCreateIndex: true,});
var conn=mongoose.Collection;
 var passcatSchema =new mongoose.Schema({
      password_category:{
      	type:String,
      	required:true,
      	index:{
      		unique:true
      	}
      },
      date:{
      	type:Date,
      	default:Date.now
      }
    });
   var passCateModel =new mongoose.model('password_categories',passcatSchema);
   module.exports=passCateModel ;