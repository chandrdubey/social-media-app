const router = require('express').Router();

const postsController = require('../controllers/posts');
const admin_id = 1;
// checkAdmin = (req, res, next) => {
//     if(parseInt(req.body.id) === admin_id ){
//         next();
//     }else{
//         return res.status(401).json({message: 'unauthorized request'});
//     }
// }

router.post('/new',postsController.newPost);
router.get('/', postsController.getAllPosts);
router.get('/archive',postsController.archivePosts);
router.put('/:post_id/edit', postsController.editPost);
router.delete('/:post_id/delete', postsController.postDeletePermanent);
router.put('/:post_id/toggle-like', postsController.postLikeOrUnlike);

module.exports = router;