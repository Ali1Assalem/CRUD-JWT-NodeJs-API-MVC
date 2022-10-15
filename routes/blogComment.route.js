const router=require('express').Router();
const blogCommentController=require('./../controllers/blogComment.controller')
const middleware=require('./../helper/middleware');

router.post('/comments/create',middleware.auth,blogCommentController.create)
router.get('/comments',blogCommentController.list)
router.post('/comments/update',middleware.auth,blogCommentController.update)
router.post('/comments/delete',middleware.auth,blogCommentController.delete)

module.exports=router;