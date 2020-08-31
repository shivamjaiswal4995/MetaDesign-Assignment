const studentDAO = require("./../dao/student.dao");

studentDAO.addStudent("shivam.jaiswal@gmail.com");
// const mongoose = require("mongoose");
// const Text = mongoose.model("text", {
//   name: {
//     type: String,
//   },
//   description: {
//     type: String,
//   },
// });

// const me = new Text({
//   name: "lulla",
//   description: "6",
// });

// me.save()
//   .then((me) => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });
