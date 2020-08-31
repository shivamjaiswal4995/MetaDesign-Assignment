const studentModel = require("./../entity/student.entity");
const StudentNotFoundError = require("./../customErrors/customError")
  .StudentNotFoundError;
const { v4: uuidv4 } = require("uuid");

const findStudentByEmail = async (studentEmail) => {
  const student = await studentModel.findOne({ studentEmail: studentEmail });
  return student;
};

const addStudent = async (studentEmail) => {
  var newStudent = new studentModel({
    studentId: uuidv4(),
    studentEmail: studentEmail,
    isSuspended: false,
  });
  await newStudent.save();
};

const suspendStudent = async (studentEmail) => {
  const filter = { studentEmail: studentEmail };
  const update = { isSuspended: true };
  await studentModel.findOneAndUpdate(filter, update);
};

const getSuspensionStatus = async (studentEmail) => {
  const studentObject = await studentModel.findOne({
    studentEmail: studentEmail,
  });
  if (studentObject === null) {
    let err = new StudentNotFoundError(
      `No student found with this email: ${studentEmail}. Register him/her first`
    );
    return new Promise((resolve, reject) => {
      reject(err);
    });
  } else {
    return studentObject.isSuspended;
  }
};

module.exports = {
  findStudentByEmail,
  addStudent,
  suspendStudent,
  getSuspensionStatus,
};
