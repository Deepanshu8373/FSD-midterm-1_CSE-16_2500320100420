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
