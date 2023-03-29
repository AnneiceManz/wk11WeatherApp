import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "semantic-ui-react";

const UserForm = ({ onSaveStudent, editingStudent, onUpdateStudent }) => {
  // This is the original State with not initial student
  const [student, setStudent] = useState(
    editingStudent || {
      firstname: "",
      lastname: "",
      is_current: false,
    }
  );

  //create functions that handle the event of the user typing into the form
  const handleNameChange = (event) => {
    const firstname = event.target.value;
    setStudent((student) => ({ ...student, firstname }));
  };

  const handleLastnameChange = (event) => {
    const lastname = event.target.value;
    setStudent((student) => ({ ...student, lastname }));
  };

  const handleCheckChange = (event) => {
    const is_current = event.target.checked;
    //console.log(iscurrent);
    setStudent((student) => ({ ...student, is_current }));
  };

  const clearForm = () => {
    setStudent({ firstname: "", lastname: "", is_current: false });
  };

  //A function to handle the post request
  const postStudent = (newStudent) => {
    return fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of Students (the parent) for updating the list
        onSaveStudent(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the post request
  const putStudent = (toEditStudent) => {
    return fetch(`http://localhost:8080/api/students/${toEditStudent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditStudent),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateStudent(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (student.id) {
      putStudent(student);
    } else {
      postStudent(student);
    }
  };

  return (
    <Card raised color="teal">
      <Card.Content>
        <Card.Header>User</Card.Header>
      </Card.Content>
      <Card.Content>
        <Form className="form-students" onSubmit={handleSubmit}>
          <Form.Input
            label="Username"
            type="text"
            id="add-user-name"
            required
            value={student.firstname}
            onChange={handleNameChange}
          />

          <Form.Input
            label="Password"
            type="text"
            id="add-user-lastname"
            required
            value={student.lastname}
            onChange={handleLastnameChange}
          />

          <Button color="purple" type="submit" variant="outline-success">
            {student.id ? "Edit Student" : "Add Student"}
          </Button>
          {student.id ? (
            <Button
              color="purple"
              type="button"
              variant="outline-warning"
              onClick={clearForm}
            >
              Cancel
            </Button>
          ) : null}
        </Form>
      </Card.Content>
    </Card>
  );
};

export default UserForm;
