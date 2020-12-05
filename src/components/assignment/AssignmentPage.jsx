import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AssignmentApi from '../../api/AssignmentApi';

import CreateAssignment from './CreateAssignment';
import Assignment from './Assignment';

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [allStudentsAssignments, setAllStudentsAssignments] = useState([]);

  const user_role = window.sessionStorage.getItem('role');
  
  const [assignmentAssignedOn, setAssignmentAssignedOn] = useState(true);
  const [assignmentSubmittedOn, setAssignmentSubmittedOn] = useState(false);

  const handleAssignAssignment = () => {
    setAssignmentAssignedOn(!assignmentAssignedOn);
    setAssignmentSubmittedOn(false);
  };
  const handleSubmitAssignment = () => {
    setAssignmentAssignedOn(false);
    setAssignmentSubmittedOn(!assignmentSubmittedOn);
  };

  function getAllAssignments() {
    AssignmentApi.getAllAssignments().then(data => {
      setAssignments(data.data);
    });
  }
  function getTeacherAssignments() {
    AssignmentApi.getTeacherAssignments().then(data => {
      setTeacherAssignments(data.data);
    });
  }
  function getAllStudentAssignments() {
    AssignmentApi.getAllStudentAssignments().then(data => {
      setAllStudentsAssignments(data.data);
    });
  }

  useEffect(() => {
    getAllAssignments();
    getTeacherAssignments();
    getAllStudentAssignments();
  }, []);


  function deleteAssignment(assignmentId) {
    AssignmentApi.deleteAssignment(assignmentId).then(() => {
      alert("Assignment Deleted");
      getAllAssignments(); // to refresh the list immediately
    });
  }
  function deleteTeacherAssignment(assignmentId) {
    AssignmentApi.deleteAssignment(assignmentId).then(() => {
      alert("Assignment Deleted");
      getTeacherAssignments(); // to refresh the list immediately
    });
  }
  function deleteAllStudentAssignment(assignmentId) {
    AssignmentApi.deleteAssignment(assignmentId).then(() => {
      alert("Assignment Deleted");
      getAllStudentAssignments(); // to refresh the list immediately
    });
  }

  return (
    <div className="assignment-page">
      <div
        className="container d-flex justify-content-around mb-4 btn-group btn-group-toggle"
        data-toggle="buttons">
        <label className="btn btn-secondary active">
          <input
            type="radio"
            name="options"
            id="option1"
            autoComplete="off"
            onClick={handleAssignAssignment}
          />{' '}
          Assigned Assignments
        </label>
        <label className="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option2"
            autoComplete="off"
            onClick={handleSubmitAssignment}
          />{' '}
          Submitted Assignments
        </label>
      </div>

      {assignmentAssignedOn &&  (
        <div className="assignment-div">
          { user_role === "teacher" ? 
          (<CreateAssignment
            assignments={teacherAssignments}
            getAllAssignments={getTeacherAssignments}
          /> ): null}

          {teacherAssignments.length === 0
            ? 'No assignment assigned yet.'
            : teacherAssignments.map(assignment => (
                <Assignment
                  key={uuid()}
                  assignment={assignment}
                  deleteAssignment={deleteTeacherAssignment}
                />
              ))}
        </div>

      )}
      {assignmentSubmittedOn && (
        <div className="assignment-div">
          { user_role === "student" ? 
          (<CreateAssignment
            assignments={allStudentsAssignments}
            getAllAssignments={getAllStudentAssignments}
          /> ): null}

          {assignments.length === 0 && user_role === "student"
            ? 'No assignment submitted yet.' : null}
          { allStudentsAssignments.length === 0 && user_role === "teacher" 
            ? 'No assignment submitted yet.' : null}  

            { user_role === "student" 
            ?  (assignments.map(assignment => (
              <Assignment
                key={uuid()}
                assignment={assignment}
                deleteAssignment={deleteAssignment}
              /> )
            ) ): null}

              { user_role === "teacher" 
            ?  (allStudentsAssignments.map(assignment => (
              <Assignment
                key={uuid()}
                assignment={assignment}
                deleteAssignment={deleteAllStudentAssignment}
              /> )
            ) ): null}
        </div>
      )}
    </div>
  );
}
