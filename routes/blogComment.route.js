const router=require('express').Router();
const blogCommentController=require('./../controllers/blogComment.controller')
const middleware=require('./../helper/middleware');

router.post('/comments/create',middleware.auth,blogCommentController.create)
router.get('/comments',blogCommentController.list)
// router.put('/comments/:comment_id/update',middleware.auth,blogCommentController.update)
// router.delete('/comments/:comment_id/delete',middleware.auth,blogCommentController.delete)

module.exports=router;