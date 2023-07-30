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

/* liste contennu multimédia  photos */
exports.getAllMediasImages = async (off, lim, res) => {
  try {
    var unwind = { $unwind: "$article" };
    var match = {
      $match: {
        "article.images": { $ne: [] }
      },
    };
    const varProject = { $project: { _id : 0,categorie:0,"article.description":0,"article.court_description":0,
    "article.localisation":0,"article.site":0,"article.videos":0,"article.mot_cle":0,
    "article.autres":0,"article.x":0,"article.y":0
    } };
    var data1 = await Categorie.aggregate([unwind,match,varProject]);
    const page = off || 0;
    const pageNumber = lim || 20;
    var total = data1.length;
    let totalPage = Math.floor(Number(total) / pageNumber);
    if (Number(total) % pageNumber != 0) {
      totalPage = totalPage + 1;
    }
    var data = await Categorie.aggregate([unwind,match,varProject])
      .skip(Number(off))
      .limit(Number(lim));
    return {
      multimedia: data,
      page: page,
      pageNumber: pageNumber,
      totalPage: totalPage,
    };
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

/* liste contennu multimédia vidéos */
exports.getAllMediasVideos = async (off, lim, res) => {
  try {
    var unwind = { $unwind: "$article" };
    var match = {
      $match: {
        "article.videos": { $ne: [] }
      },
    };
    const varProject = { $project: { _id : 0,categorie:0,"article.description":0,"article.court_description":0,
    "article.localisation":0,"article.site":0,"article.images":0,"article.mot_cle":0,
    "article.autres":0,"article.x":0,"article.y":0
    } };
    var data1 = await Categorie.aggregate([unwind,match,varProject]);
    const page = off || 0;
    const pageNumber = lim || 20;
    var total = data1.length;
    let totalPage = Math.floor(Number(total) / pageNumber);
    if (Number(total) % pageNumber != 0) {
      totalPage = totalPage + 1;
    }
    var data = await Categorie.aggregate([unwind,match,varProject])
      .skip(Number(off))
      .limit(Number(lim));
    return {
      multimedia: data,
      page: page,
      pageNumber: pageNumber,
      totalPage: totalPage,
    };
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
