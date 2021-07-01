const router = require('express').Router();

const usersController = require('../controllers/users');
//const admin_id = 1;
checkAdmin = (req, res, next) => {
    if(parseInt(req.body.id) === admin_id ){
        next();
    }else{
        return res.status(401).json({message: 'unauthorized request'});
    }
}

router.post('/signup', usersController.signup);
router.get('/', usersController.getAllUsers);
router.get('/active', usersController.activeUsers);
router.get('/:user_id', usersController.getUserById);
router.put('/:user_id/delete', usersController.userDelete);
router.delete('/:user_id/delete',checkAdmin, usersController.userDeletePermanent);



module.exports = router;