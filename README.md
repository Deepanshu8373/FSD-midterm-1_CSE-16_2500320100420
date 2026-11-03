# FSD Midterm Project

A minimal Express application built with Node.js.

## Requirements

- Node.js 18 or later

## Run

```bash
node server.js
```

The server listens on port `3000` and uses Express JSON middleware to parse
incoming JSON request bodies.

Visit [http://localhost:3000](http://localhost:3000) to see the response.
Create a student by sending a JSON `POST` request to `/api/students`. The
required fields are `id`, `name`, `email`, `course`, and `age`; successful
requests return the created record with status `201`, while missing or blank
fields receive a `400` response.

Update an existing student with a JSON `PUT` request to
`/api/students/:id`, providing all required fields in the request body. The
body's `id` must match the URL ID. Successful updates return the updated record
with status `200`; invalid bodies receive `400`, and unknown IDs receive `404`.

Delete a student with a `DELETE` request to `/api/students/:id`. Successful
deletions return the deleted record with status `200`; unknown IDs receive
`404`.
