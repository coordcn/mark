var mark = require('../markc');
var temp = require('./temp');
var table = require('./table');
var ul = require('./ul');
var fs = require('fs');

var td = [
  ['姓名', '性别', '年龄', '籍贯', '政治面貌'],
  ['张三', '男', 32, '江苏', '高端群众'],
  ['李四', '男', 27, '浙江', '高端群众'],
  ['王二', '男', 28, '上海', '中共党员'],
  ['麻子', '男', 25, '北京', '高端群众']
];

var li = [
  {href:'http://www.baidu.com', text:'baidu'},
  {href:'http://www.jsonml.org/', text:'jsonml'},
  {href:'https://www.zybuluo.com/mdeditor', text:'mdeditor'},
  {href:'https://github.com/evilstreak/markdown-js', text:'markdown-js'},
  {href:'https://github.com/trevnorris/jqml', text:'jqml'}
];

var data = {
  head: ['title', 'good'],
  table: mark.html(table, td),
  ul: mark.html(ul, li)
};
var test = mark.html(temp, data);

console.log(test);
fs.writeFileSync('test.html', test);