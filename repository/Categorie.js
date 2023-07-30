var { Categorie } = require("../Model/CategorieModel");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getAllCategories = async () => {
    try {
      let data = await Categorie.find();
      return data;
    } catch (err) {
        throw err;
    }
  };

// recherche article : getAll, avec mot cle et categorie
exports.findArticles = async (recherche) => {
    try {
        var unwind = { $unwind: "$article" };
        let matchQuery = {};
        if(recherche.motcle){
            matchQuery = {
                "article.mot_cle": { $regex:  recherche.motcle , $options: "i" }
            };
        }
        if (recherche.categorie) {
            matchQuery._id = new ObjectID(recherche.categorie);
        }
        var match = { $match: matchQuery};
        let data = await Categorie.aggregate([unwind, match]);
        return data;
    } catch (err) {
        throw err;
    }
};

exports.findAllArticlesCategorie = async (categorie) => {
    try {
        var unwind = { $unwind: "$article" };
        var match = {
        $match: {
            _id: new ObjectID(categorie)
        },
        };
        let data = await Categorie.aggregate([unwind, match]);
        return data;
    } catch (err) {
        throw err;
    }
}


/* Fiche Article */
exports.getOneArticle = async (id) => {
    try {
      const varUnwind =  { $unwind: "$article" };
      const varMatch = {
        $match: {
          "article._id": new ObjectID(id)
        },
      };
      const data = await Categorie.aggregate([varUnwind, varMatch]);  
    return data;
    } catch (err) {
        throw err; 
    }
  };