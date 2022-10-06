const { Validator } = require('node-input-validator');


exports.create = async (req,res)=>{
    
    const v = new Validator(req.body, {
        title:'required|minLength:5|maxLength:100',
        short_description : 'required',
        description:'required',
        category:'required',
        image:'required|mime:jpg.jpeg,png'
    });

    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }


}