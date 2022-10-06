const mongoose=require('mongoose');

const schema = new mongoose.Schema({
 title: String,
 short_description:String,
 description:String,
 image: {type:String,default:null},
 category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
 created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 //blog_comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment' }],
 //blog_likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'BlogLike' }]
},{
    timestamps:true,
});

const Blog = mongoose.model('Blog',schema);
module.exports = Blog;