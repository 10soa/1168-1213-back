
const testRepository = require("../repository/Test");

exports.getTest = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: await testRepository.getTests(),
    });
  } catch (err) {}
};