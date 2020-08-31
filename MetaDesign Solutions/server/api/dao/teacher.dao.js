//const studentModel = require("./../entity/student.entity");
const teacherModel = require("./../entity/teacher.entity");
const { v4: uuidv4 } = require("uuid");
const findTeacherByEmail = async (teacherEmail) => {
  const teacherObject = await teacherModel.findOne({
    teacherEmail: teacherEmail,
  });
  return teacherObject;
};

const addTeacher = async (teacherObj) => {
  let newTeacher = new teacherModel({
    teacherId: uuidv4(),
    teacherEmail: teacherObj.teacher,
    students: teacherObj.students,
  });

  await newTeacher.save();
};

const registerStudentsToTeacher = async (email, updatedStudentsArray) => {
  const filter = { teacherEmail: email };
  const update = { students: updatedStudentsArray };
  await teacherModel.findOneAndUpdate(filter, update);
};

module.exports = {
  addTeacher,
  findTeacherByEmail,
  registerStudentsToTeacher,
};
