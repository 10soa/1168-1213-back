
const utilisateurRepository = require("../repository/Utilisateur");

exports.getAllUtilisateurs = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: await utilisateurRepository.getAllUtilisateurs(),
    });
  } catch (err) {}
};

exports.login = async (req, res) => {
  try {
    const data = await  utilisateurRepository.login(req.body.email,req.body.mdp,res);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.createUtilisateur = async (req, res) => {
  utilisateurRepository
    .createUtilisateur(req, res) 
    .then((result) => res.status(200).json({ result })) 
    .catch();
};

exports.addUserShare = async (req,res) => {
  try {
    const data = await  utilisateurRepository.addUserShare(req.params.id,req.body);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
}

/* fiche Publication */
exports.getOnePublication = async (req, res) => {
  try {
   const publications = await utilisateurRepository.getOnePublication(req.params.idparatage);
    res.status(200).json({
      status: 200,
      data: publications,
    });
  } catch (err) {
      res.status(400).json({
          status: 400,
          message: err.message,
      });
  }
};

/* fiche Publication */
exports.getFicheUtilisateur = async (req, res) => {
  try {
   const utilisateurs = await utilisateurRepository.getFicheUtilisateur(req.params.idutilisateur);
    res.status(200).json({
      status: 200,
      data: utilisateurs,
    });
  } catch (err) {
      res.status(400).json({
          status: 400,
          message: err.message,
      });
  }
};

/* fiche Publication */
exports.getAllUserExperiencePagination = async (req, res) => {
  try {
   const utilisateurs = await utilisateurRepository.getAllUserExperiencePagination(req.params.off,req.params.lim,res);
    res.status(200).json({
      status: 200,
      data: utilisateurs,
    });
  } catch (err) {
      res.status(400).json({
          status: 400,
          message: err.message,
      });
  }
};