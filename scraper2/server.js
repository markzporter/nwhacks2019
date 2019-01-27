const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const languagetool = require('languagetool-api');

const params = {
  language: 'en-GB',
  text: 'She are you doing because we and if like like',
};

languagetool.check(params, function(err, res) {
  if (err) {
    console.log(err);
    console.log('HERE 1');
  } else {
    // console.log(res);
    languagetool.bestSuggestion(res, function(arr) {
      var i = 0;
      var offset_value = 0;
      var length_value = 0;
      var message_value = '';
      var sentence_value = res.matches[0].sentence;
      var spacing = '';
      var addition = 0;
      console.log(sentence_value);

      arr.forEach(function(item) {
        offset_value = res.matches[i].offset;
        console.log(offset_value);

        length_value = res.matches[i].length;
        console.log(length_value);

        message_value = res.matches[i].message;
        console.log(message_value);

        if (i > 0) {
          spacing = ' '
          addition = 1;
        }
        sentence_value = sentence_value.slice(0, offset_value - addition) + item.bestSuggestion + spacing +
        sentence_value.slice(offset_value + length_value);

        console.log(sentence_value);

        console.log('Mistake: '+item.mistake+'Suggest: '+item.bestSuggestion);
        i++;
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