const pool = require('../config/postgres');

module.exports = {
       allComments :  (req, res) =>{
           const {post_id} = req.params;
           pool.query("SELECT * FROM comments WHERE post_id = $1",[post_id])
           .then(result=>{
                res.status(200).json({result: result.rows});
           })
           .catch(err=>{
               console.log(`there is an err ${err}`);
           })
       },
       newComment : (req, res)=>{
           
       }

}