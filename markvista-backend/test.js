// // // function getNextDayDate(currentDate = new Date()) {
// //   const tomorrow = new Date(currentDate);
// //   tomorrow.setDate(tomorrow.getDate() + 1);

// //   return tomorrow.toISOString().split("T")[0];
// // }

// // console.log(getNextDayDate(new Date()));

// export const signup = async (req, res) => {
//    user {
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//   };

//   try {
//     const newUser = new User(user);

//     if (req.body.roles) {
//       const roles = await Role.find({ name: { $in: req.body.roles } });
//       newUser.roles = roles.map((role) => role._id);
//     } else {
//       const userRole = await Role.findOne({ name: "user" });
//       newUser.roles = [userRole._id];
//     }

//     await newUser.save();
//     await RefreshToken.createToken(newUser);
//     res.send({ message: "User was registered successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Error: " + err.message });
//   }
// };
