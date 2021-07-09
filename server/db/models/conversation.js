const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

// retrieves all unread messages given a conversation id
Conversation.getUnreadMessagesCount = async (conversationId, userId) => {
  return await Message.count({
    where: {
      conversationId: conversationId,
      senderId: {
        [Op.not]: userId,
      },
      readStatus: false,
    },
  });
};

module.exports = Conversation;
