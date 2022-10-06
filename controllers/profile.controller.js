const User=require('./../models/user.model');

exports.current_user=(req,res)=>{
    return res.status(200).send({
        message:'Current user data Successful fetched',
        data:req.user
    });
}