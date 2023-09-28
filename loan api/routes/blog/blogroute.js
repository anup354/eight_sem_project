const { Router } = require('express')
const router = Router();
const blogController = require("../../controller/blogs/blogcontroller");
const { authMiddleware } = require("../../middleware/auth");
const { upload } = require("../../middleware/fileupload")


router.post('/api/blog', upload.single('image'), blogController.addBlog)
router.get('/api/blog', blogController.getBlog)
router.get('/api/blogbyid/:blog_id', blogController.getByIdBlog)
router.put('/api/blog/:blog_id', upload.single('image'), blogController.updateBlog)
router.delete('/api/blog/:blog_id', blogController.deleteBlog)

module.exports = router;
