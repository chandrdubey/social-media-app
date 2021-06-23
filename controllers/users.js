const pool = require('../config/postgres');
// pool.query(
//     "SELECT * FROM users;")
//     .then(result => console.log(result.rows))
//     .catch(err => console.log(err))
module.exports = {
    signup : ( req, res)=>{
        const {name , email, active, mobile_number } = req.body;
        pool.query(
            "INSERT INTO users (active,name,email,mobile_number) VALUES ($1, $2 ,$3 ,$4)",
            [active, name, email, mobile_number],)
            .then(result => res.status(200).json({result:result.rows,message: "user signup successful"}))
            .catch(err => console.log(`there is an error ${err}`))
    },
    getAllUsers: (req, res) =>{
        pool.query(
            "SELECT * FROM users ORDER BY id;")
            .then(result => {
               res.status(200).json({ result :result.rows});
            })
            .catch(err => console.log(`there is an error ${err}`));
    },
    getUserById: (req, res)=>{
        console.log(req.params);
        pool.query(
            "SELECT * FROM users WHERE id=$1 ORDER BY id;",[])
            .then(result => {
               if(result.rows.length > 0){
                res.status(200).json({ result :result.rows});
               }else{
                   res.status(404).json({message : "User not found"});
               }
            })
            .catch(err => console.log(`there is an error ${err}`));
    },
    activeUsers: (req, res)=>{
        pool.query(
            "SELECT * FROM users WHERE active=$1 ORDER BY id;", [1])
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
    
    
}