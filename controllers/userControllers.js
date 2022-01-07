const User = require("../models/User");

const userControllers = {
  addToFav: async (req, res) => {
    try {
      const { userId, shoeId, isLiked } = req.body;
      //   si esta likeado, se elimina; de lo contrario, se agrega
      const action = isLiked ? "$pull" : "$push";
      const updatedUser = User.findOneAndUpdate(
        { _id: userId },
        { [action]: { favorites: shoeId } },
        { new: true }
      );
      res.json({ success: true, error: null, response: updatedUser });

      // funcion para guardar o eliminar el id del zapato que llega desde el body, segun un isLiked (esto se verifica en frontend, para asi no molestar a la base de datos con los datos del usuario. Como ya tenemos el usuario cargado en redux, lo verificamos ahi mismo.)
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  
};

module.exports = userControllers
