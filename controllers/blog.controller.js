const { Validator } = require('node-input-validator');
const blog = require('./../models/blog.model');

const mongoose=require('mongoose');

exports.create = async (req,res)=>{
    
    if(req.files && req.files.image){
        req.body['image']=req.files.image;
    }
    
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
    
    try{
        if(req.files && req.files.image){
            var image_file= req.files.image;
            var image_file_name=Date.now()+'-blog-image-'+image_file.name;
            var image_path=publicPath+'/uploads/blog_images/'+image_file_name;
            await image_file.mv(image_path);
		}

        const newBlog = new blog({
            title:req.body.title,
            short_description:req.body.short_description,
            description:req.body.description,
            category:req.body.category,
            created_by:req.user._id,
            image:image_file_name
        });

        let blogData = await newBlog.save();
        //let populatedData = await blogData.populate('category').populate('created_by').execPopulate();


        return res.status(201).send({
            message:'Blog Created Successfully',
            data:blogData
        });

    }catch(err){
        return res.status(400).send({
            message:err.message,
            data:err
        });
    }


}