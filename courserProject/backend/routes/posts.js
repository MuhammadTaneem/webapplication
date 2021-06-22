const express = require('express');
const router  = express.Router();
const cheackAuth = require('../middleware/cheack-auth');
const upload= require('../middleware/multer-middleware');
const postControl= require('../controllers/posts');





router.get('',postControl.getposts);

router.get('/:_id',postControl.getpost);
// save  new post
router.post('',cheackAuth,upload,postControl.savePost);
// delete post
router.delete('/:_id',cheackAuth,postControl.deletePost);
// edit post
router.put('/:_id',cheackAuth,upload,postControl.editPost);




module.exports = router;
