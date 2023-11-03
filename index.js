const express = require("express"); //initialize express
const app = express();
const mongoose=require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt=require("bcryptjs");

const mongoUrl="mongodb+srv://ashrafshaik4444:Reeha2006@cluster1.2rwhqto.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo");
//API
app.post("/register",async(req,res)=>{
    const {email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
           return res.send({error:"User Exists"});
        }
        await User.create({
            email,
            password:encryptedPassword,
        });
        res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
});

app.listen(5000,()=>{
    console.log("server started");
});
/*
app.post("/post",async(req,res)=>{
    console.log(req.body);
    const {data}=req.body;
    try{
        if(data=="ashraf"){
            res.send({status:"ok"})
        }else{
            res.send({status:"user not found"})
        }
    }catch(error){
        res.send({status:"something went wrong try again"})
    }

});
*/