
exports.getTest = async (req, res) => {
    try {
      res.status(200).json({
        status: 200,
        data: "Bonjour Nick RAKOTOMANANA",
      });
    } catch (err) {}
  };