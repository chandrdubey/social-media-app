const pool = require('../config/postgres');
// pool.query(
//     "SELECT * FROM users;")
//     .then(result => console.log(result.rows))
//     .catch(err => console.log(err))
const admins_id = 1;
module.exports = {
    signup : ( req, res)=>{
        const {name , email, active, mobile_number } = req.body;
        pool.query(
            "INSERT INTO users (active,name,email,mobile_number) VALUES ($1, $2 ,$3 ,$4)",
            [active, name, email, mobile_number],)
            .then(result => res.status(200).json({message: "user signup successful"}))
            .catch(err => console.log(`there is an error ${err}`))
    },
    
    // GET request for all the users 
    getAllUsers: (req, res) =>{
        pool.query(
            "SELECT * FROM users ORDER BY id")
            .then(result => {
               res.status(200).json({ result :result.rows});
            })
            .catch(err => console.log(`there is an error ${err}`));
    },

    // GET request for specific user
    getUserById: (req, res)=>{
        console.log(req.params);
        pool.query(
            "SELECT * FROM users WHERE id=$1 ORDER BY id",[req.params.user_id])
            .then(result => {
               if(result.rows.length > 0){
                res.status(200).json({ result :result.rows});
               }else{
                   res.status(404).json({message : "User not found"});
               }
            })
            .catch(err => console.log(`there is an error ${err}`));
    },

    // GET request for all the active users
    activeUsers: (req, res)=>{
        pool.query(
            "SELECT * FROM users WHERE active=$1 ORDER BY id", [1])
            .then(result => {
                console.log(result);
               if(result.rows.length > 0){
                res.status(200).json({ result :result.rows});
               }else{
                   res.status(404).json({message :"No active user found"});
               }
            })
            .catch(err => console.log(`there is an error ${err}`));
    },
    // Delete data only for user
    userDelete: (req, res) =>{
          const {user_id} = req.params;
          pool.query("SELECT * FROM users WHERE id=$1",[user_id])
          .then(result =>{
              if(result.rows.length>0){
                  if(result.rows[0].active){
                      pool.query("UPDATE users SET active=$1 WHERE id=$2", [0, user_id])
                      .then(() =>res.status(200).json({message:"ok"}))
                      .catch(err =>console.error(err))
                  }else{
                      return res.status(400).json({message:"Invalid request"});
                  }
              }else{
                  return res.status(404).json({message :"User not found"});
              }
          })
    },
    // DELETE user data permanently
    userDeletePermanent : (req, res)=>{
        const {id} = req.body;
        console.log(id);
        if(parseInt(id) === admins_id){
            pool.query("DELETE FROM users WHERE id=$1 RETURNING*", [req.params.user_id])
            .then(result => res.status(200).json({result: result.rows[0], message:"User Deleted Succesfulley"}))
            .catch(err => console.error(err))
        }else{
            res.status(401).json({message:"Unautherized request"});
        } 
    }    
}