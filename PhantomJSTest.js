console.log('웹 페이지를 로드하는 중');
var page = require('webpage').create();
var url = 'https://ko.wikipedia.org/';
page.open(url, function (status) {
  console.log('페이지를 로드함');
  page.render('wikipedia.org.png');
  phantom.exit();
});