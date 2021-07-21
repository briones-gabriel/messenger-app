const router = require("express").Router();
const { User } = require("../../db/models");
const { Op } = require("sequelize");
const { isUserOnline } = require("../../onlineUsers");

// find users by username
router.get("/:username", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username,
        },
        id: {
          [Op.not]: req.user.id,
        },
      },
    });

    // add online status to each user that is online
    users.forEach((user, i) => {
      const userJSON = user.toJSON();
      userJSON.online = isUserOnline(userJSON.id);
      users[i] = userJSON;
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
