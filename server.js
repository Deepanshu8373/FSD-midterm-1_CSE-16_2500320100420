const express = require("express");

const app = express();
const port = 3000;
const students = [];
const requiredStudentFields = ["id", "name", "email", "course", "age"];

function validateStudent(student) {
  if (!student || typeof student !== "object" || Array.isArray(student)) {
    return { error: "Request body must be a JSON object" };
  }

  const missingFields = requiredStudentFields.filter(
    (field) =>
      student[field] === undefined ||
      student[field] === null ||
      (typeof student[field] === "string" && student[field].trim() === ""),
  );

  if (missingFields.length > 0) {
    return {
      error: "Missing required student fields",
      fields: missingFields,
    };
  }

  return null;
}

app.use(express.json());

app.get("/", (request, response) => {
  response.type("text").send("Hello, world!\n");
});

app.post("/api/students", (request, response) => {
  const student = request.body;
  const validationError = validateStudent(student);

  if (validationError) {
    return response.status(400).json(validationError);
  }

  students.push(student);
  return response.status(201).json(student);
});

app.put("/api/students/:id", (request, response) => {
  const studentIndex = students.findIndex(
    (student) => String(student.id) === request.params.id,
  );

  if (studentIndex === -1) {
    return response.status(404).json({ error: "Student not found" });
  }

  const updatedStudent = request.body;
  const validationError = validateStudent(updatedStudent);

  if (validationError) {
    return response.status(400).json(validationError);
  }

  if (String(updatedStudent.id) !== request.params.id) {
    return response.status(400).json({
      error: "Student ID in the request body must match the URL",
    });
  }

  students[studentIndex] = updatedStudent;
  return response.status(200).json(updatedStudent);
});

app.delete("/api/students/:id", (request, response) => {
  const studentIndex = students.findIndex(
    (student) => String(student.id) === request.params.id,
  );

  if (studentIndex === -1) {
    return response.status(404).json({ error: "Student not found" });
  }

  const [deletedStudent] = students.splice(studentIndex, 1);
  return response.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent,
  });
});

app.use((request, response) => {
  response.status(404).type("text").send("Not found\n");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
