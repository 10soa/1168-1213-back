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


exports.findArticles = async (motcle) => {
    try {
        var unwind = { $unwind: "$article" };
        var match = {
        $match: {
             "article.mot_cle": { $regex:  motcle , $options: "i" } 
        },
        };
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