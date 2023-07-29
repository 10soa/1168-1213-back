const categorieRepository = require("../repository/Categorie");
exports.getAllCategories = async (req, res) => {
    try {
     const categories = await categorieRepository.getAllCategories();
      res.status(200).json({
        status: 200,
        data: categories,
      });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
  };