var { Utilisateur } = require("../Model/UtilisateurModel");
var ObjectID = require("mongoose").Types.ObjectId;
var { Categorie } = require("../Model/CategorieModel");
const categorieRepository = require("../repository/Categorie");
const bcrypt = require('bcrypt');

exports.getAllUtilisateurs = async (res) => {
  try {
    let data = await Utilisateur.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// login
exports.login = async (username, mdp, res) => {
  try{
    let data = await Utilisateur.find({ email: username});
    console.log(typeof data);
     if(data){
      for (const utilisateur of data){
        const match = await bcrypt.compare(mdp,utilisateur.mdp);
        if(match){
          return utilisateur
        }
      }
    }else{
      throw new Error("Email ou mot de passe incorrect");
    }
    throw new Error("Email ou mot de passe incorrect");
  }catch (err){
    throw err;
  }
}

exports.createUtilisateur = async (req, res) => {
  try {
    const { nom,prenom,email,pseudo,naissance,pays,mdp } = req.body;
    if (!mdp)return res.status(400).json({ error: 'Le champ "Mot de passe" est requis.' });
    if(!nom)return res.status(400).json({ error: 'Le champ "Nom" est requis.' });
    if (!prenom)return res.status(400).json({ error: 'Le champ "Prenom" est requis.' });
    if(!email)return res.status(400).json({ error: 'Le champ "Gmail" est requis.' });
    if (!pseudo)return res.status(400).json({ error: 'Le champ "Pseudo" est requis.' });
    if(!naissance)return res.status(400).json({ error: 'Le champ "Date de naissance" est requis.' });
    if (!pays)return res.status(400).json({ error: 'Le champ "Pays d\'origine" est requis.' });
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(mdp, salt);
    const bodyWithHashedPassword = { ...req.body, mdp: hashedPassword };
    let data = await Utilisateur.create(bodyWithHashedPassword);
    return data;
  } catch (err) {
    return res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
  }
};

// ajout partage experience d'un utilisateur
exports.addUserShare = async (id,partage) => {
  try{
    if(!partage.libelle){
      throw new Error(" Libelle obligatoire");
    }
    if(!partage.note){
      throw new Error(" Note obligatoire");
    }
    if(partage.note && partage.note > 5){
      throw new Error(" La valeur de note doit être inférieure ou égale à 5");
    }
    if(!partage.localisation){
      throw new Error(" Localisation obligatoire");
    }
    const data = await Utilisateur.findOneAndUpdate(
      {
        _id: new ObjectID(id)
      },
      {
        $push: {
          "partage": {
            libelle: partage.libelle,
            description: partage.description && partage.description,
            date_publication : Date.now(),
            localisation: partage.localisation,
            image: partage.image,
            note: partage.note
          },
        },
      }
    );
    if(!data){
      throw new Error("Utilisateur inexistant");
    }
    return data;
  }catch (err){
    throw err;
  }
}

/* fiche publiction */
exports.getOnePublication = async (id) => {
  try {
    const varUnwind =  { $unwind: "$partage" };
    const varMatch = {
      $match: {
        "partage._id": new ObjectID(id)
      },
    };
    const data = await Utilisateur.aggregate([varUnwind, varMatch]);  
  return data;
  } catch (err) {
      throw err; 
  }
};

/* fiche Utilisateur */
exports.getFicheUtilisateur = async (id) => {
  try {
    const varProject = { $project: { partage: 0, favoris: 0 } };
    const varMatch = {
      $match: {
        _id : new ObjectID(id)
      },
    };
    const data = await Utilisateur.aggregate([varMatch,varProject]);  
  return data;
  } catch (err) {
      throw err; 
  }
};

/* liste Experience Sociale + pagination + recherche */
exports.getAllUserExperiencePagination = async (off, lim, res) => {
  try {
    const varProject = { $project: { email:0,pseudo:0,naissance:0,pays:0,mdp:0,favoris:0} };
    var unwind = { $unwind: "$partage" };
    var data1 = await Utilisateur.aggregate([unwind,varProject]);
    const page = off || 0;
    const pageNumber = lim || 20;
    var total = data1.length;
    let totalPage = Math.floor(Number(total) / pageNumber);
    if (Number(total) % pageNumber != 0) {
      totalPage = totalPage + 1;
    }
    var data = await Utilisateur.aggregate([unwind,varProject,{
      $sort: {
        "partage.date_publication": -1,
      },
    }])
      .skip(Number(off))
      .limit(Number(lim));
    return {
      partage: data,
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


/* liste partage des utilisateurs */
exports.getAllListPartage_utilisateurPagination = async (idUser,off, lim, res) => {
  try {
    const varProject = { $project: { nom:0,prenom:0,_id:0,email:0,pseudo:0,naissance:0,pays:0,mdp:0,favoris:0} };
    var unwind = { $unwind: "$partage" };
    const varMatch = {
      $match: {
        _id : new ObjectID(idUser)
      },
    };
    var data1 = await Utilisateur.aggregate([unwind,varMatch,varProject]);
    const page = off || 0;
    const pageNumber = lim || 20;
    var total = data1.length;
    let totalPage = Math.floor(Number(total) / pageNumber);
    if (Number(total) % pageNumber != 0) {
      totalPage = totalPage + 1;
    }
    var data = await Utilisateur.aggregate([unwind,varMatch,varProject,{
      $sort: {
        "partage.date_publication": -1,
      },
    }])
      .skip(Number(off))
      .limit(Number(lim));
    return {
      partage: data,
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
// deleteafavoris
exports.deleteFavoris = async (idutilisateur,idarticle) => {
  try{
    const data = await Categorie.findOneAndUpdate(
      { "article._id": new ObjectID(idarticle)},
      { $pull: { "article.$.liste_utilisateur_favoris": idutilisateur }},
      { upsert: true, new: true },
    );
    if(data){
    const u = await Utilisateur.findOneAndUpdate(
      { _id: new ObjectID(idutilisateur) },
      { $pull: { favoris: { article_id: new ObjectID(idarticle) } } },
      { new: true });
      if(!u){
        throw new error("Utilisateur inexistant");
      }
    }
    return data;
  }catch(err){
    throw err;
  }
}

// ajout favoris

// article_id : {type:ObjectID},
// libelle : {type:String},
// description : {type:String},
// localisation : {type:String},
exports.addFavoris = async (idutilisateur,idarticle) => {
  try{
    if(!idutilisateur){
      throw new Error("Joueur pas connecté");
    }
    if(!idarticle){
      throw new Error("Il n'y a pas d'article");
    }
    const article = await categorieRepository.getOneArticle(idarticle);
    if(!article || (article && article.length === 0)){
      throw new Error("Article inexistant");
    }
    if(article[0].article.liste_utilisateur_favoris ){
      for (const user of article[0].article.liste_utilisateur_favoris){
        if(user === idutilisateur){
          return this.deleteFavoris(idutilisateur,idarticle);
        }
      }
    }
    const data = await Utilisateur.findOneAndUpdate(
      {
        _id: new ObjectID(idutilisateur)
      },
      {
        $push: {
          "favoris": {
            libelle: article[0].article.libelle,
            description: article[0].article.court_description && article[0].article.court_description,
            localisation: article[0].article.localisation,
            article_id: new ObjectID(article[0].article._id),
            image: article[0].article.images.length > 0 ? article[0].article.images[0].lien : null
          },
        },
      }
    );
    if(!data){
      throw new Error("Utilisateur inexistant");
    }
    const farticle = await Categorie.findOneAndUpdate(
      {
        "article._id": new ObjectID(idarticle)
      },
      {
        $push: {
          "article.$.liste_utilisateur_favoris": idutilisateur
        },
      }
    );
    return farticle;
  } catch (err) {
    throw err; 
  }
}


// liste des articles favoris d'un utilisateur
exports.listeFavorisUtilisateur = async (utilisateur) =>{
  try {
    var unwind = { $unwind: "$favoris" };
    var match = { $match: {
      _id: new ObjectID(utilisateur)
    }};
    var project = {
      _id: 0,
      favoris: 1
    };
    let data = await Utilisateur.aggregate([unwind, match, { $project: project }]);
    return data;
  } catch (err) {
      throw err;
  }
}



/* supprimer partage utilisateur */
exports.deletePartageUtilisateur = async (req, res) => {
  try {
    const userId = req.params.idutilisateur;
    const partageId = req.params.idpartage;
    const updatedUser = await Utilisateur.findByIdAndUpdate(
      userId,
      { $pull: { partage: { _id: partageId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Partage non trouvé dans l'utilisateur" });
    }
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};
