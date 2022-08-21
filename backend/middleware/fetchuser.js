var jwt = require('jsonwebtoken');
const JWT_Secret = 'PrgrammingHunter@123'; 
const fetchuser =(req,res,next)=>
{
    const token = req.header('auth-token');

    if(!token)
    {
        res.status(401).send({error: "Please Authenticate by using valid Token"})
    }

    try {

        const data = jwt.verify(token, JWT_Secret);
        req.user= data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "Please Authenticate by using valid Token"})
    }



}

module.exports= fetchuser;