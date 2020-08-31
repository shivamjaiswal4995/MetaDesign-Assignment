class TeacherNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
class StudentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
class TeacherAndStudentAlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  TeacherNotFoundError: TeacherNotFoundError,
  StudentNotFoundError: StudentNotFoundError,
  TeacherAndStudentAlreadyExistError: TeacherAndStudentAlreadyExistError,
};
