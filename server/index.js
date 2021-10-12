const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes.js');


app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));
app.use(router);

app.get('/helloworld', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`App listening at ${port}`)
})