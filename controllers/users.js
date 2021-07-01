const pool = require("../config/postgres");
const userValidation = require("../validations/userValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = {
  // Signup the user
  signup: async (req, res) => {
    try {
      const { name, email, password, repeat_password } = req.body;
      //Validating the signup schema
      const { error, value } = await userValidation.signup(req.body);

      if (error) {
        return res.status(404).json({ message: error.details[0].message });
      }
      //Checking if a user already present in the database or not
      const result = await pool.query("SELECT * FROM users where email=$1", [
        email,
      ]);
      // If it is present , return status 404 with messeage
      if (result.rows.length > 0) {
        return res.status(404).json({ message: "Email alredy exist" });
      }
      // If it is not,  detalis of the user will be stored in database with hashed password
      else {
        // creating hash of password
        const salt = await bcrypt.genSalt(10);
        hashPassword = await bcrypt.hash(password, salt);
        //  console.log(hashPassword);
        const result = await pool.query(
          "INSERT INTO users (name,email,password) VALUES ($1, $2 ,$3) RETURNING*",
          [name, email, hashPassword]
        );
        // console.log(JWT_SECRET);
        // Creating JWT token using user's id
        const token = jwt.sign({ user_id: result.rows[0].id }, JWT_SECRET, {
          expiresIn: "2d",
        });
        res.status(200).json({
          token,
          data: {
            user_detail: {
              user_id: result.rows[0].id,
              email: result.rows[0].email,
              name: result.rows[0].name,
            },
          },
        });
      }
    } catch (err) {
      console.log(`there is an error ${err}`);
    }
  },

  signin: (req, res)=>{

  },

  // GET request for all the users
  getAllUsers: (req, res) => {
    pool
      .query("SELECT * FROM users ORDER BY id")
      .then((result) => {
        res.status(200).json({ result: result.rows });
      })
      .catch((err) => console.log(`there is an error ${err}`));
  },

  // GET request for specific user
  getUserById: (req, res) => {
    console.log(req.params);
    pool
      .query("SELECT * FROM users WHERE id=$1 ORDER BY id", [
        req.params.user_id,
      ])
      .then((result) => {
        if (result.rows.length > 0) {
          res.status(200).json({ result: result.rows });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => console.log(`there is an error ${err}`));
  },

  // GET request for all the active users
  activeUsers: (req, res) => {
    pool
      .query("SELECT * FROM users WHERE active=$1 ORDER BY id", [1])
      .then((result) => {
        console.log(result);
        if (result.rows.length > 0) {
          res.status(200).json({ result: result.rows });
        } else {
          res.status(404).json({ message: "No active user found" });
        }
      })
      .catch((err) => console.log(`there is an error ${err}`));
  },
  // Delete data only for user
  userDelete: (req, res) => {
    const { user_id } = req.params;
    pool.query("SELECT * FROM users WHERE id=$1", [user_id]).then((result) => {
      if (result.rows.length > 0) {
        if (result.rows[0].active) {
          pool
            .query("UPDATE users SET active=$1 WHERE id=$2", [0, user_id])
            .then(() => res.status(200).json({ message: "ok" }))
            .catch((err) => console.error(err));
        } else {
          return res.status(400).json({ message: "Invalid request" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    });
  },
  // DELETE user data permanently
  userDeletePermanent: (req, res) => {
    const { id } = req.body;
    console.log(id);
    if (parseInt(id) === admins_id) {
      pool
        .query("DELETE FROM users WHERE id=$1 RETURNING*", [req.params.user_id])
        .then((result) =>
          res
            .status(200)
            .json({
              result: result.rows[0],
              message: "User Deleted Succesfulley",
            })
        )
        .catch((err) => console.error(err));
    } else {
      res.status(401).json({ message: "Unautherized request" });
    }
  },
};
