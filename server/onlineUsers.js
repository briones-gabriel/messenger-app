const onlineUsers = {};

const addOnlineUser = (userId, socket) => {
  // Add the socket to the room dictated by it's user id
  socket.join(userId.toString());

  // If a user is connected with this user id, then add the socket to the list
  if (onlineUsers[userId]) {
    onlineUsers[userId].push(socket.id);
  }

  // Else, create a list of user sockets
  onlineUsers[userId] = [socket.id];
};

const removeOnlineUser = (userId, socket) => {
  if (onlineUsers[userId] === undefined) return;

  const socketPos = onlineUsers[userId].indexOf(socket.id);

  // Check if the socket is in the list and remove it if so
  if (socketPos !== -1) {
    onlineUsers[userId].splice(socketPos, 1);
  }

  // If there is no more sockets in the list, remove the userId from onlineUsers
  if (!onlineUsers[userId].length) delete onlineUsers[userId];

  // Emit to other users that someone was disconnected
  socket.broadcast.emit("remove-offline-user", userId);
}

const isUserOnline = (userId) => {
  return onlineUsers[userId] !== undefined;
};

module.exports = {
  onlineUsers,
  isUserOnline,
  addOnlineUser,
  removeOnlineUser
};