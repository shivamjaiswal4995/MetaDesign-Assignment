const studentDAO = require("./../dao/student.dao");
const { StudentNotFoundError } = require("../customErrors/customError");

const registerStudents = async (studentEmails) => {
  for (let i = 0; i < studentEmails.length; i++) {
    let studentObject = await studentDAO.findStudentByEmail(studentEmails[i]);
    if (studentObject === null) {
      await studentDAO.addStudent(studentEmails[i]);
    }
  }
};
//   studentEmails.map((studentEmail) => {
//     studentDAO.findStudentByEmail(studentEmail, (err, student) => {
//       if (err) {
//         if (err instanceof StudentNotFoundError) {
//           studentDAO.addStudent(studentEmail, (err) => {
//             if (err) {
//               return done(err);
//             } else {
//               return done();
//             }
//           });
//         } else {
//           return done(err);
//         }
//       }
//     });
//   });
// };
const findStudentByEmail = async (studentEmail) => {
  let student = await studentDAO.findStudentByEmail(studentEmail);
  return student;
};

// const registerTeacherToStudent = (studentEmail, teacherEmail, done) => {
//   studentDAO.registerTeacherToStudent(studentEmail, teacherEmail, done);
// };

const suspendStudent = async (studentEmail) => {
  let student = await studentDAO.findStudentByEmail(studentEmail);
  if (student === null) {
    let err = new StudentNotFoundError("No student found with this email.");
    return new Promise((resolve, reject) => {
      reject(err);
    });
  } else {
    await studentDAO.suspendStudent(studentEmail);
  }
  //email Id of the student can be wrong. there do not exist any user
};

const checkSuspensionSatus = (studentRecepientsArray, done) => {
  let resultStudentRecepient = studentRecepientsArray.filter((studentEmail) => {
    studentDAO.getSuspensionStatus(studentEmail, (err, result) => {
      if (err) {
        if (err instanceof StudentNotFoundError) {
          return false;
        } else {
          return;
        }
      } else {
        return !result;
      }
    });
  });
  return done(undefined);
};

module.exports = {
  findStudentByEmail,
  //addStudent,
  suspendStudent,
  registerStudents,
};
