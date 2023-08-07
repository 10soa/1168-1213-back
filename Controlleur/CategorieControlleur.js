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

/* liste contenu multimédia Photos */
exports.getAllMediasImages = async (req, res) => {
  try {
   const categories = await categorieRepository.getAllMediasImages(req.params.off,req.params.lim,res);
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

/* liste contenu multimédia Photos */
exports.getAllMediasVideos = async (req, res) => {
  try {
   const categories = await categorieRepository.getAllMediasVideos(req.params.off,req.params.lim,res);
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

/* deroulante liste Catégorie */
exports.getDeroulanteCategorie = async (req, res) => {
  try {
   const categories = await categorieRepository.getDeroulanteCategorie(req,res);
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

/* creation article */
exports.createArticlePublication = async (req, res) => {
  try {
    categorieRepository.createArticle(req,res)
      .then((result) => res.status(200).json({ data: result }))
      .catch((error) =>
        res.status(400).json({ status: 400, message: error.message })
      );
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};