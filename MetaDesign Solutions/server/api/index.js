const express = require("express");
const router = express.Router();
const teacherService = require("./services/teacher.service");
const studentService = require("./services/student.service");
const {
  TeacherAndStudentAlreadyExistError,
  StudentNotFoundError,
} = require("./customErrors/customError");
const TeacherNotFoundError = require("./customErrors/customError")
  .TeacherNotFoundError;

router.post("/register", (req, res) => {
  if (req.body && req.body.teacher) {
    teacherService
      .registerTeacherAndStudent(req.body.teacher, req.body.students)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof TeacherAndStudentAlreadyExistError) {
          return res
            .status(403)
            .send("All the students are already registered with the Teacher");
        } else {
          return res
            .status(500)
            .send("Unable to Register Teacher. Try after some time");
        }
      });
  } else {
    res.status(400).send("Invalid Request body");
  }
});

router.post("/suspend", (req, res) => {
  if (req.body && req.body.student) {
    studentService
      .suspendStudent(req.body.student)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        if (error instanceof StudentNotFoundError) {
          res.status(422).send("Invalid student email");
        } else {
          res
            .status(500)
            .send(
              "A problem occurred while suspending student. Please try after sometime!"
            );
        }
      });
  } else {
    res.status(400).send("Invalid Request body");
  }
});

router.post("/retrievefornotifications", (req, res) => {
  if (req.body && req.body.teacher && req.body.notification) {
    teacherService
      .retrieveNotificationRecepients(req.body.teacher, req.body.notification)
      .then((studentRecepientsArray) => {
        return res.status(200).send(studentRecepientsArray);
      })
      .catch((error) => {
        if (error instanceof TeacherNotFoundError) {
          return res.status(422).send("Invalid Teacher email");
        } else if (error instanceof StudentNotFoundError) {
          return res.status(422).send(error.message);
        } else {
          return res
            .status(500)
            .send(
              "A problem occurred while fetching student details. Please try after sometime"
            );
        }
      });
  } else {
    return res.status(400).send("Invalid Request body");
  }
});

router.get("/commonstudents", (req, res) => {
  let teacherEmails = req.query.teacher;
  teacherService
    .getCommonStudents(teacherEmails)
    .then((commonStudents) => {
      return res.status(200).send(commonStudents);
    })
    .catch((error) => {
      if (error instanceof TeacherNotFoundError) {
        return res.status(422).send(" Invalid Teacher Email");
      } else {
        return res
          .status(500)
          .send(
            "Problem occured while fetching common students. Please try after some time"
          );
      }
    });
});
module.exports = router;
