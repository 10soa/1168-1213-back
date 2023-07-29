var { Categorie } = require("../Model/CategorieModel");

exports.getAllCategories = async (res) => {
    try {
      let data = await Categorie.find();
      return data;
    } catch (err) {
        throw err;
    }
  };