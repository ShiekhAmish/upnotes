const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_Secret = 'PrgrammingHunter@123'; 
//Route #1: For Craete A USer "/api/auth/createuser"
router.post('/createuser',[
    body('name','Enter a Valid Name...').isLength({ min: 3 }),
    body('email','Enter a Valid email...').isEmail(),
    body('password',"Password must be greater then 5 charecters").isLength({ min: 5 }),

], async (req, res) => {
  let success= false;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
        
    
    let user =await User.findOne({email: req.body.email});
    if(user)
    {
      
        return res.status(400).json({success,error:'User Already Exits'})
    }
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

      });
      const data ={
        user: {
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_Secret);
     success=true;

    //   .then(user => res.json(user)).catch(err=>{console.log(err);
    //     res.json({error: 'Please enter a Unique Email', message: err.message})})
    // res.send(req.body);
res.json({success,authtoken})
} catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
}
  })

  //Route #2: For Login "/api/auth/login"
  router.post('/login',[
    body('email','Enter a Valid email...').isEmail(),
    body('password',"Password cannot be blanked").exists(),

], async (req, res) => {
  let success= false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  

  const {email, password} = req.body;
  try {
    let user =await User.findOne({email});
    if(!user)
    {
        return res.status(400).json({success,error:'UserName or Password is not Correct...'});
    }
    
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
      return res.status(400).json({success,error:'UserName or Password is not Correct...'});
    }
      const data ={
        user: {
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_Secret);
      success=true;
res.json({success,authtoken})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route #3: Get User DAtA "/api/auth/getuser"

router.post('/getuser',fetchuser, async (req, res) => {

  try {
    userID = req.user.id;
    const user= await User.findById(userID).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});
  module.exports = router