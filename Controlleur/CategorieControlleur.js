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

exports.getAllArticlesCategorie = async (req, res) => {
    try {
     const categories = await categorieRepository.findAllArticlesCategorie(req.params.categorie);
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

exports.findArticles = async (req,res) => {
    try {
        const categories = await categorieRepository.findArticles(req.query);
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
}

/* fiche Article */
exports.getOneArticle = async (req, res) => {
  try {
   const categories = await categorieRepository.getOneArticle(req.params.idCategorie);
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