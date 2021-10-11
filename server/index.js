const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.json());

console.log(__dirname+ '/../client/dist/index.html');
app.use(express.static(__dirname + '/../client/dist'));

app.get('/helloworld', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})