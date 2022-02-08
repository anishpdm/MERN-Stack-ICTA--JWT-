const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const {userModel}=require('./models/users')
var jwt = require('jsonwebtoken');


let app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


// CORS Policy
app.use( (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
} )

mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/BlogAppDb',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } );

  app.post("/api/login",async(req,res)=>{

    try{

        console.log(req.body)
        var userEmail= req.body.email
        var userPass= req.body.password
        let result= await userModel.find(
            {$and:[
                {email:userEmail},
                {password:userPass}
            ]
        }
            )

            if(result.length>0)
            {
                res.json({status:'success',data:result})
            }
            else{
                res.json({status:'authentication failed.'})
            }


    }
    catch(error)
    {
        res.json({status:'error'})

    }

  })


app.post("/api/register",async(req,res)=>{

    try{


        let user=new userModel(req.body)
        let result=await user.save()
         res.json({status:'sucesss'})

    }
    catch(error)
    {
        res.json({status:'error'})

    }

})


app.listen(3001,()=>{
    console.log("server running ......")
})