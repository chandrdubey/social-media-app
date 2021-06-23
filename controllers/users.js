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
            .then(result => console.log(result))
            .catch(err => console.log(err))
    },
    getAllUsers: (req, res) =>{
        pool.query(
            "SELECT * FROM users;")
            .then(result => {
               res.status(200).json({ result :result.rows});
            })
            .catch(err => console.log(`there is an error ${err}`));
    }
}