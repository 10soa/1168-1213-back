
const notificationRepository = require("../repository/Notification");

exports.getAllNotifications = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: await notificationRepository.getAllNotifications(),
    });
  } catch (err) {}
};