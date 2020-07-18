// const express = require('express');
// const app = express();
// const path = require('path');

import titleConst from './child.constant';

// process.on('message', (payloads: {title: string, data: {}}) => {const title = payloads.title, data = payloads.data})

process.on('message', (payloads: { title: string; data: any }) => {
  const title = payloads.title;
  if (title === titleConst.Child_process_is_started) {
    console.log('**************', title, '*************');
    require('./src/main.ts');

    // app.get('/app', function(req, res) {
    //   res.sendFile(path.join(__dirname + '/index.html'));
    // });

    // app.listen(3001);
  }
});
