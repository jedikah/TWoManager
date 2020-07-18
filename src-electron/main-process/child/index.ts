// const express = require('express');
// const app = express();
// const path = require('path');

// import './src/main.ts';
// require('./src/main.ts');
if (process.send) process.send('querty 1');
process.on('message', m => {
  console.log(m);
  process.send('querty');
});

// app.get('/app', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.listen(3001);
