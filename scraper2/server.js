const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const languagetool = require('languagetool-api');

const params = {
  language: 'en-GB',
  text: 'She are you doing',
};

languagetool.check(params, function(err, res) {
  if (err) {
    console.log(err);
    console.log('HERE 1');
  } else {
    console.log(res);
    languagetool.bestSuggestion(res, function(arr) {
      console.log(arr);
      arr.forEach(function(item) {
        console.log('HERE 2');
        console.log('Mistake: '+item.mistake+'Suggest: '+item.bestSuggestion);
      });
    });
  };
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('We made it\n');
});

// languagetool.check(params, function(err, res) {
//   if (err) {
//     console.log(err);
//     console.log('HERE 1');
//   } else {
//     languagetool.showMistakes(res, function(arr) {
//       console.log(arr);
//       arr.forEach(function(item) {
//         console.log('HERE 2');
//         console.log(res);
//       });
//     });
//   };
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});