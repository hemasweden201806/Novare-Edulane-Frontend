import Api from './Api';

class AssignmentApi {
  getAllAssignments() {
    // If Teacher, you get ALL assignments
    // If Student, you only get own assignments
    return Api.get('/assignments');
  }

  getAssignmentById(id) {
    return Api.get('/assignments/' + id);
  }

  createAssignment(newAssignment) {
    return Api.post('/assignments', newAssignment);
  }

  updateAssignment(updateAssignment) {
    return Api.put('/assignments', updateAssignment);
  }

  deleteAssignment(id) {
    return Api.delete('/assignments/' + id);
  }

  // Get all assignments made by teacher
  getTeacherAssignments() {
    return Api.get('/assignments/teacher');
  }

  // If Teacher, get all student assignments
  getAllStudentAssignments() {
    return Api.get('/assignments/students');
  }
}
export default new AssignmentApi();
