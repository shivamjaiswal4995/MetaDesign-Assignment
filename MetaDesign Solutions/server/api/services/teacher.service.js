const teacherDAO = require("./../dao/teacher.dao");
const studentDAO = require("./../dao/student.dao");
const studentService = require("./student.service");
const { TeacherNotFoundError } = require("../customErrors/customError");
const TeacherAndStudentAlreadyExistError = require("./../customErrors/customError")
  .TeacherAndStudentAlreadyExistError;

const findTeacherByEmail = async (teacherEmail) => {
  let teacherObj = await teacherDAO.findTeacherByEmail(teacherEmail);
  return teacherObj;
};

const registerTeacherAndStudent = async (teacherEmail, studentEmailArray) => {
  let teacherObject = await teacherDAO.findTeacherByEmail(teacherEmail);
  if (teacherObject === null) {
    let teacher = {
      teacher: teacherEmail,
      students: studentEmailArray,
    };
    await studentService.registerStudents(studentEmailArray);
    await teacherDAO.addTeacher(teacher);
  } else {
    let distinctStudents = getDistinctStudents(
      teacherObject,
      studentEmailArray
    );
    if (distinctStudents.length === 0) {
      console.log("I reached here");
      let err = new TeacherAndStudentAlreadyExistError(
        "All Students are already registered with teacher."
      );
      console.log(err);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    } else {
      console.log(teacherObject);
      let registeredStudents = teacherObject.students;
      await studentService.registerStudents(distinctStudents);
      let updatedStudents = [...registeredStudents, ...distinctStudents];
      console.log(updatedStudents);
      await teacherDAO.registerStudentsToTeacher(
        teacherObject.teacherEmail,
        updatedStudents
      );
    }
  }
};

const getDistinctStudents = (teacherObject, studentEmails) => {
  let registeredStudents = teacherObject.students;
  let studentSet = new Set(registeredStudents);
  let distinctStudents = [];
  for (let i = 0; i < studentEmails.length; i++) {
    if (!studentSet.has(studentEmails[i])) {
      distinctStudents.push(studentEmails[i]);
    }
  }
  return distinctStudents;
};

const getCommonStudents = async (teacherEmails) => {
  if (teacherEmails instanceof Array) {
    let commonStudents = await teacherDAO.getStudents(teacherEmails[0]);

    for (let i = 1; i < teacherEmails.length; i++) {
      let studentsOfTeacher = await teacherDAO.getStudents(teacherEmails[i]);
      commonStudents = commonStudents.filter((student) =>
        studentsOfTeacher.includes(student)
      );
    }
    return commonStudents;
  } else {
    const students = await teacherDAO.getStudents(teacherEmails);
    return students;
  }
};

const retrieveNotificationRecepients = async (teacherEmail, notification) => {
  let teacherObject = await teacherDAO.findTeacherByEmail(teacherEmail);
  if (teacherObject === null) {
    let err = new TeacherNotFoundError("Invalid Teacher email");
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
  let studentsArray = teacherObject.students;
  const notificationStudentArray = notification.split(" @");
  notificationStudentArray.splice(0, 1);
  let studentRecepients = [...studentsArray];
  notificationStudentArray.map((student) => {
    if (!studentsArray.includes(student)) {
      studentRecepients.push(student);
    }
  });
  let studentRecepientsAfterCheck = [];
  for (let i = 0; i < studentRecepients.length; i++) {
    let isSuspended = await studentDAO.getSuspensionStatus(
      studentRecepients[i]
    );
    if (!isSuspended) {
      studentRecepientsAfterCheck.push(studentRecepients[i]);
    }
  }
  return studentRecepientsAfterCheck;
};

const addTeacher = (teacherObj) => {
  studentService
    .registerStudents(teacherObj.students)
    .then(() => {
      return teacherDAO.addTeacher(teacherObj);
    })
    .then(() => {
      return new Promise((reject, resolve) => {
        resolve();
      });
    })
    .catch((error) => {
      return new Promise((reject, resolve) => {
        reject(error);
      });
    });
};

module.exports = {
  findTeacherByEmail,
  getCommonStudents,
  retrieveNotificationRecepients,
  addTeacher,
  registerTeacherAndStudent,
};
