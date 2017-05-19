import * as express from "express";
import * as path from "path";
var app = express();

app.use(express.static(path.resolve('public')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('public/index.html'));
})

app.listen(normalizePort(process.env.PORT || 3000), function () {
  console.log('backApp listening on port 3000!')
})

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}
