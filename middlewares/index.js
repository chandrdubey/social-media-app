const {ADMIN_ID} = require('../config');

module.exports = {
    checkAdmin : (req, res, next) => {
        if(parseInt(req.body.user_id) === ADMIN_ID){
            next();
        }else{
            return res.status(401).json({message: 'unauthorized request'});
        }
    }
}
