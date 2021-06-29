const pool = require('../config/postgres');

module.exports = {

    postComments: (req, res) => {
        const { post_id } = req.params;
        console.log(post_id);
        pool.query("SELECT * FROM comments WHERE post_id = $1", [post_id])
            .then(result => {
                res.status(200).json({ result: result.rows });
            })
            .catch(err => {
                console.log(`there is an err ${err}`);
            })
    },

    newComment: (req, res) => {
        const { content, author_id, post_id } = req.body;
        //    console.log(content, post_id, author_id);
        pool.query(
            "INSERT INTO comments (content, post_id ,author_id) VALUES ($1, $2 , $3)",
            [content, post_id, author_id])
            .then(result => {
                res.status(200).json({ message: "comment added successfully" })
            })
            .catch(err => console.log(`there is an error ${err}`))
    },
    editComment: (req, res) => {
        const {comment_id} = req.params;
        const {content}  = req.body;
       // console.log(comment_id, content);
        pool.query("SELECT * FROM comments WHERE comment_id=$1", [comment_id])
            .then(result => {
                if (result.rows.length > 0) {
                    pool.query("UPDATE comments SET content=$1 WHERE comment_id=$2 RETURNING*", [content, comment_id])
                        .then((result) => {
                            res.status(200).json({result: result.rows[0], message: "ok" })
                        })
                        .catch(err => console.error(err))
                } else {
                    return res.status(404).json({ message: "Comment not found" });
                }
            })
    },
    deleteComment : (req, res)=>{
        const {comment_id} = req.params;
     //   console.log(comment_id);
        pool.query("SELECT * FROM comments WHERE comment_id=$1",[comment_id])
        .then(result =>{
            if(result.rows.length>0){
                pool.query("DELETE FROM comments WHERE comment_id=$1 RETURNING*", [comment_id])
                .then(result => res.status(200).json({result: result.rows[0], message:"Comment deleted Succesfulley"}))
                .catch(err => console.error(err))
            }else{
                return res.status(404).json({message :"Comment not found"});
            }
        });     
    }
    

}