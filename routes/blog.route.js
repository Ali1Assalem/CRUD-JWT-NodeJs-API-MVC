const router = require('express').Router();
const blogController = require('./../controllers/blog.controller');
const middleware = require('./../helper/middleware');

router.post('/create',middleware.auth,blogController.create);


module.exports = router; 