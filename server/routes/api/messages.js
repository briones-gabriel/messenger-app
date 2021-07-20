const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }

    // case we don't know the conversation id, we create a new conversation
    const conversation = await Conversation.create({
      user1Id: senderId,
      user2Id: recipientId,
    });
    if (onlineUsers.includes(sender.id)) {
      sender.online = true;
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    return res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/read/:conversationId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversationId = req.params.conversationId;

    await Message.update({ readStatus: true }, {
      where: {
        conversationId,
        senderId: {
          [Op.not]: userId,
        },
        readStatus: false,
      },
    });

    res.json();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
