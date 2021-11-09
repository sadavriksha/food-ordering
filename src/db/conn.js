const mongoose = require('mongoose');
MONGODB_URL='mongodb://localhost:27017/testdb';

mongoose.connect(
    MONGODB_URL,
    async(err)=>{
        if(err)
        console.log("not conncted to db") ;
        else
        console.log("conncted to db");
        
    }
)

/*const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sadadb", {

}).then(()=>{
    console.log(`connection successfully`);
}).catch((e)=>{
    console.log(e)
});

useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true*/