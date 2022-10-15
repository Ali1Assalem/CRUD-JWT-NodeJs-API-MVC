const Blog=require('./../models/blog.model');
const BlogComment=require('./../models/blogComment.model');
const mongoose=require('mongoose');
const { Validator } = require('node-input-validator');


exports.list=(req,res)=>{
	let blog_id=req.query.blog_id;
	if(!mongoose.Types.ObjectId.isValid(blog_id)){
		return res.status(400).send({
	  		message:'Invalid blog id',
	  		data:{}
	  	});
	}

	Blog.findOne({_id:blog_id}).then(async (blog)=>{
		if(!blog){
			return res.status(400).send({
				message:'No blog found',
				data:{}
			});	
		}else{

			try{
				let query=[
					{
						$lookup:
						{
						 from: "users",   //users collection
						 localField: "user_id",
						 foreignField: "_id",
						 as: "user"
						}
					},
					{$unwind: '$user'},
					{
						$match:{
							'blog_id':mongoose.Types.ObjectId(blog_id)  //for make sure we return data for this blog only.
						}
					}
				];


				let comments=await BlogComment.aggregate(query);
				return res.send({
		  		    message:'Comment successfully fetched',
			  		data:{
			  			comments:comments,
			  		}
		  	    });

			}catch(err){
				return res.status(400).send({
			  		message:err.message,
			  		data:err
			  	});
			}



		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})	



}

exports.create=async (req,res)=>{
	let blog_id=req.body.blog_id;
	if(!mongoose.Types.ObjectId.isValid(blog_id)){
		return res.status(400).send({
	  		message:'Invalid blog id',
	  		data:{}
	  	});
	}
	Blog.findOne({_id:blog_id}).then(async (blog)=>{
		if(!blog){
			return res.status(400).send({
				message:'No blog found',
				data:{}
			});	
		}else{

			try{
				const v = new Validator(req.body, {
					comment:'required',
				});
				const matched = await v.check();
				if (!matched) {
					return res.status(422).send(v.errors);
				}

				let newCommentDocument= new BlogComment({
					comment:req.body.comment,
					blog_id:blog_id,
					user_id:req.user._id
				});

				let commentData=await newCommentDocument.save();

				await Blog.updateOne(
					{_id:blog_id},
					{
						$push: { blog_comments :commentData._id  } 
					}
				)


				let query=[
					{
						$lookup:
						{
						 from: "users",
						 localField: "user_id",
						 foreignField: "_id",
						 as: "user"
						}
					},
					{$unwind: '$user'},
					{
						$match:{
							'_id':mongoose.Types.ObjectId(commentData._id)
						}
					},

				];

				let comments=await BlogComment.aggregate(query);

				return res.status(200).send({
					message:'Comment successfully added',
					data:comments[0]
				});


			}catch(err){
				return res.status(400).send({
			  		message:err.message,
			  		data:err
			  	});
			}

		
		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})

}