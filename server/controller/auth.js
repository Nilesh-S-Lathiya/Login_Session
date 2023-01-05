import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register customer
export const customerregister = (req, res) => {
  // Checking user if alredy register
  const q = "SELECT * FROM auth WHERE email = ?";
  const abc = db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log(err)
    if (data.length) {
      res.status(409).json("User Alredy Registered");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const inserquery =
        "INSERT INTO auth (`firstname`, `lastname`, `email`, `password`, `isAdmin`) VALUES (?)";
      const value = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        hashedPassword,
        req.body.isAdmin,
      ];

      db.query(inserquery, [value], (err, data) => {
        if (err) return res.status(500).json(err);
        // var {insertId} = data
        return res
          .status(200)
          .json("User Registered successfully with customer role");
      });
    }
  });
};

//register admin
export const adminregister = (req, res) => {
  // Checking user if alredy register
  const q = "SELECT * FROM auth WHERE email = ?";
  const abc = db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log(err)
    if (data.length) {
      res.status(409).json("User Alredy Registered");
    } else {

      const inserquery =
        "INSERT INTO auth (`firstname`, `lastname`, `email`, `password`, `isAdmin`) VALUES (?)";
      const value = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.isAdmin,
      ];

      db.query(inserquery, [value], (err, data) => {
        if (err) return res.status(500).json(err);
        // var {insertId} = data
        return res
          .status(200)
          .send("User Registered successfully with Admin role");
      });
    }
  });
};

// Login Auth
export const login = (req, res) => {
  const q = "SELECT * FROM auth WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(200).json("User Not Registerd");

    if (data[0].isAdmin === 1) {
      // const checkPassword = bcrypt.compare(data[0].password, req.body.password);
      if (data[0].password !== req.body.password) {
        return res.status(200).json("Wrong password or username!");
      } else {
        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];

        res
          .cookie("accessToken", token, {
            httpOnly: true,
          })
          .status(200)
          .json(others);
      }
    } else {
      return res.status(200).json("You not allowed to login from here");
    }
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
