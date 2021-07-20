const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Sequelize = require("sequelize");

const Conversation = db.define("conversation", {
  user1Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user2Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  // return conversation or null if it doesn't exist
  return await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });
};

// retrieves all unread messages given a conversation id
Conversation.getUnreadMessagesCount = async (conversationId, userId) => {
  const userUnreadCount = await Message.count({
    where: {
      conversationId: conversationId,
      senderId: {
        [Op.not]: userId,
      },
      readStatus: false,
    },
  });

  const otherUserUnreadCount = await Message.count({
    where: {
      conversationId: conversationId,
      senderId: userId,
      readStatus: false,
    },
  });

  return [ userUnreadCount, otherUserUnreadCount ];
};

module.exports = Conversation;
