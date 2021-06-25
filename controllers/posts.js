const pool = require('../config/postgres');

module.exports = {
    newPost : ( req, res)=>{
        const {title , description} = req.body;
       // console.log(req.body);
        pool.query(
            "INSERT INTO admin_posts (active,title,description,likes, dislikes) VALUES ($1, $2 ,$3 ,$4, $5)",
            [1, title, description, 0, 0],)
            .then(result =>{
        //        console.log(result);
                res.status(200).json({message: "post added successfully"})
        })
            .catch(err => console.log(`there is an error ${err}`))
    },
    getAllPosts: (req, res) =>{
        pool.query(
            "SELECT * FROM admin_posts ORDER BY post_id")
            .then(result => {
               res.status(200).json({ result :result.rows});
            })
            .catch(err => console.log(`there is an error ${err}`));
    },
    archivePosts: (req, res)=>{
        pool.query(
            "SELECT * FROM admin_posts WHERE active=$1 ORDER BY post_id", [0])
            .then(result => {
                console.log(result);
               if(result.rows.length > 0){
                res.status(200).json({ result :result.rows});
               }else{
                   res.status(404).json({message :"No archive posts found"});
               }
            })
            .catch(err => console.log(`there is an error ${err}`));
    },
    editPost: (req, res) =>{
        const {post_id} = req.params;
        console.log(req.body);
        pool.query("SELECT * FROM admin_posts WHERE post_id=$1",[post_id])
       
        .then(result =>{
            if(result.rows.length>0){
                const currActive = result.rows[0].active ? 0 : 1;
                //console.log(currActive);
                    pool.query("UPDATE admin_posts SET active=$1 WHERE post_id=$2", [currActive, post_id])
                    .then(() =>{
                        res.status(200).json({message:"ok"})})
                    .catch(err =>console.error(err))
            }else{
                return res.status(404).json({message :"Post not found"});
            }
        })
  },
  postDeletePermanent : (req, res)=>{
    const {post_id} = req.params;
        console.log(req.body);
        pool.query("SELECT * FROM admin_posts WHERE post_id=$1",[post_id])
    .then(result =>{
        if(result.rows.length>0){
            const currActive = result.rows[0].active ? 0 : 1;
            //console.log(currActive);
            pool.query("DELETE FROM admin_posts WHERE post_id=$1 RETURNING*", [req.params.post_id])
            .then(result => res.status(200).json({result: result.rows[0], message:"Post Deleted Succesfulley"}))
            .catch(err => console.error(err))
        }else{
            return res.status(404).json({message :"Post not found"});
        }
    })
       
}   



}