const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const { connected } = require("process");

const port = process.env.port ||3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../template/views")
const partials_path = path.join(__dirname,"../template/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);;
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
    res.render("index")
  
});

app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/register",async(req,res)=>{
    try{
            const password = req.body.password;
            const cpassword = req.body.confirmpassword;
            if(password==cpassword)
            {
                const Sadadb = new Register({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    phone:req.body.phone,
                    confirmpassword:req.body.confirmpassword,
                    address:req.body.address,
                })
                const registered = await Sadadb.save();
                res.status(404).render("index")
            }
            else{
                res.send("password not match!!!")
            }
    }
    catch(error){
        res.status(404).send(error);
    }
});

//login check

app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({email:email});

        if(useremail.password == password){
            res.status(404).render("index");
        }else{
            res.send("invalid username and password");
        }
        }
        catch(error){
            res.status(404).send("invalid username and password")
        }
    })

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});