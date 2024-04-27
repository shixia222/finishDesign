var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require('body-parser');

var managersRouter = require("./routes/managers");
var usersRouter = require("./routes/users");
var courseRouter = require("./routes/course");
var postRouter = require("./routes/post");
var replyRouter = require("./routes/reply");
var momentRouter = require("./routes/moment");
var sportPlanRouter = require("./routes/sportPlan");
var starCourseRouter = require("./routes/starCourse");
var sportRecordRouter = require("./routes/sportRecord");
var postureRouter = require("./routes/posture");
var searchRouter = require("./routes/search");
var targetWeightRouter = require("./routes/targetWeight");


var app = express();
// 设置 JSON 请求体的大小限制为50MB
app.use(bodyParser.json({ limit: '50mb' }));
// 设置 URL 编码请求体的大小限制为50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 解决跨域问题

app.all("*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GEt,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Content-Type", "application/json;charset=utf-8");
  req.next();
});

app.use("/api/managers", managersRouter);
app.use("/api/users", usersRouter);
app.use("/api/course", courseRouter);
app.use("/api/post", postRouter);
app.use("/api/reply", replyRouter);
app.use("/api/moment", momentRouter);
app.use("/api/sportPlan", sportPlanRouter);
app.use("/api/starCourse", starCourseRouter);
app.use("/api/sportRecord", sportRecordRouter);
app.use("/api/posture", postureRouter);
app.use("/api/search", searchRouter);
app.use("/api/targetWeight", targetWeightRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
