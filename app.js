/*
 * @Author: your name
 * @Date: 2020-05-19 19:26:16
 * @LastEditTime: 2020-10-11 22:06:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\app.js
 */
var express = require('express');
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var model = require("./models/index");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var ue = bodyParser.urlencoded({ extended: false })
app.use(bodyParser());
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'))
var v = fs.readdirSync(path.resolve('./controller'))
app.get('/', async (req, res) => {
  var aw = await model.label.findAll({
    where: {
      relevance: 0,
      isdelete: 0
    },
    include: [
      {
        model: model.goods
      }
    ]
  })
  aw = JSON.parse(JSON.stringify(aw))
  aw.map(s =>{
    s.goods = s.goods.slice(0,8)
    // 
  })
  res.render('index', {
    labelList: aw
  })
})
v.map(s => {
  var value = `${s.match(/(.+?).js$/)[1]}`
  app.use(`/${value}`, require(`./controller/${value}`));
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
