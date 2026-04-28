require("dotenv").config();

const express=require("express");
const morgan=require("morgan");

const app=express();

app.use(express.json());

app.use(morgan("dev"));

app.use(
"/api/students",
require("./routes/student.routes")
);

app.use(
require("./middlewares/errorHandler")
);

module.exports=app;