
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
    await  utilisateurRepository.login(req.body.email,req.body.mdp,res);
  } catch (err) {}
};