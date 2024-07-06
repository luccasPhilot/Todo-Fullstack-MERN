//npm run dev
const express = require('express');
const app = express();
const port = 3000;
const todoRoute = require('./routes/todo');

app.use(express.json());

app.use('/todo', todoRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
