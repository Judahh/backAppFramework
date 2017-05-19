import * as express from "express";
import * as path from "path";
var app = express();

app.use(express.static(path.resolve('public')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('public/index.html'));
})

app.listen(3000, function () {
  console.log('backApp listening on port 3000!')
})