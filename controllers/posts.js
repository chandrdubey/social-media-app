const pool = require("../config/postgres");
const postValidation = require("../validations/postValidation");
module.exports = {
  newPost: (req, res) => {
    const { title, content, author_id } = req.body;
    //Validating the post schema
    const { error, value } = postValidation.post({ title, content });

    if (error) {
      return res.status(404).json({ message: error.details[0].message });
    }
    pool
      .query(
        "INSERT INTO posts (title, content, author_id) VALUES ($1, $2 , $3) RETURNING*",
        [title, content, author_id]
      )
      .then((result) => {
        //        console.log(result);
        const photos = req.files;
        for (let i = 0; i < photos.length; i++) {
          pool.query(
            "INSERT INTO images (image, post_id) VALUES ($1, $2 )",[photos[i],result.rows[0].post_id,]
          );
        }
        res.status(200).json({ message: "post added successfully" });
      })
      .catch((err) => console.log(`there is an error ${err}`));
  },

  getAllPosts: (req, res) => {
    pool
      .query("SELECT * FROM posts ORDER BY post_id")
      .then((result) => {
        res.status(200).json({ result: result.rows });
      })
      .catch((err) => console.log(`there is an error ${err}`));
  },

  archivePosts: (req, res) => {
    pool
      .query("SELECT * FROM posts WHERE active=$1 ORDER BY post_id", [0])
      .then((result) => {
        console.log(result);
        if (result.rows.length > 0) {
          res.status(200).json({ result: result.rows });
        } else {
          res.status(404).json({ message: "No archive posts found" });
        }
      })
      .catch((err) => console.log(`there is an error ${err}`));
  },

  editPost: (req, res) => {
    const { post_id } = req.params;
    // console.log(req.body);
    pool
      .query("SELECT * FROM posts WHERE post_id=$1", [post_id])
      .then((result) => {
        if (result.rows.length > 0) {
          const currActive = result.rows[0].active ? 0 : 1;
          //console.log(currActive);
          pool
            .query("UPDATE posts SET active=$1 WHERE post_id=$2", [
              currActive,
              post_id,
            ])
            .then(() => {
              res.status(200).json({ message: "ok" });
            })
            .catch((err) => console.error(err));
        } else {
          return res.status(404).json({ message: "Post not found" });
        }
      });
  },

  postDeletePermanent: (req, res) => {
    const { post_id } = req.params;
    console.log(req.body);
    pool
      .query("SELECT * FROM posts WHERE post_id=$1", [post_id])
      .then((result) => {
        if (result.rows.length > 0) {
          const currActive = result.rows[0].active ? 0 : 1;
          //console.log(currActive);
          pool
            .query("DELETE FROM posts WHERE post_id=$1 RETURNING*", [
              req.params.post_id,
            ])
            .then((result) =>
              res
                .status(200)
                .json({
                  result: result.rows[0],
                  message: "Post Deleted Succesfulley",
                })
            )
            .catch((err) => console.error(err));
        } else {
          return res.status(404).json({ message: "Post not found" });
        }
      });
  },

  //  PUT request : To toggle between like and unlike
  postLikeOrUnlike: async (req, res) => {
    const { author_id } = req.body;
    const { post_id } = req.params;
    //  console.log(author_id, post_id);
    pool
      .query("SELECT * FROM likes WHERE post_id=$1 and author_id=$2", [
        post_id,
        author_id,
      ])
      .then((result) => {
        if (result.rows.length > 0) {
          console.log(result);
          pool
            .query(
              "DELETE FROM likes WHERE post_id=$1 and author_id=$2 RETURNING*",
              [post_id, author_id]
            )
            .then((result) => {
              res
                .status(200)
                .json({
                  result: result.rows[0],
                  message: "Unlike succesfully",
                });
            })
            .catch((err) => console.error(err));
        } else {
          pool
            .query("INSERT INTO likes(author_id, post_id) VALUES ($1, $2)", [
              author_id,
              post_id,
            ])
            .then((result) =>
              res.status(200).json({ message: "Like succesfully" })
            )
            .catch((err) => console.log(`there is an error ${err}`));
        }
      });
  },
};
