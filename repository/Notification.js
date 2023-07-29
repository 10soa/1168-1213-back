var { Notification } = require("../Model/NotificationModel");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getAllNotifications = async (res) => {
  try {
    let data = await Notification.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
