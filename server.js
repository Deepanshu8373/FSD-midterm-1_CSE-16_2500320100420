const express = require("express");

const app = express();
const port = 3000;
const students = [];
const requiredStudentFields = ["id", "name", "email", "course", "age"];

app.use(express.json());

app.get("/", (request, response) => {
  response.type("text").send("Hello, world!\n");
});

app.post("/api/students", (request, response) => {
  const student = request.body;

  if (!student || typeof student !== "object" || Array.isArray(student)) {
    return response.status(400).json({ error: "Request body must be a JSON object" });
  }

  const missingFields = requiredStudentFields.filter(
    (field) =>
      student[field] === undefined ||
      student[field] === null ||
      (typeof student[field] === "string" && student[field].trim() === ""),
  );

  if (missingFields.length > 0) {
    return response.status(400).json({
      error: "Missing required student fields",
      fields: missingFields,
    });
  }

  students.push(student);
  return response.status(201).json(student);
});

app.use((request, response) => {
  response.status(404).type("text").send("Not found\n");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
