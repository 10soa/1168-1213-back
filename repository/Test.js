var { Test } = require("../Model/TestModel");
var ObjectID = require("mongoose").Types.ObjectId;
var nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");
const { Console } = require("console");
const { BSONSymbol } = require("mongodb");

exports.getTests = async (res) => {
  try {
    let data = await Test.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
