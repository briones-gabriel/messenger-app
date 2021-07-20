import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unreadBubble: {
    padding: "0.5rem",
    margin: "0px 12px 0px 0px",
    borderRadius: "1rem",
    background: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
  },
  unreadCount: {
    margin: 0,
    height: "0.5rem",
    display: "flex",
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    fontWeight: "bold"
  }
};

const Chat = (props) => {
  const handleClick = async (conversation) => {
    await props.handleChatClick(conversation.id);
    await props.setActiveChat(conversation.otherUser.username);
  };

  const { classes } = props;
  const otherUser = props.conversation.otherUser;
  
  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
      {
        this.props.conversation.unreadCount > 0 &&
        <div className={classes.unreadBubble}>
          <p className={classes.unreadCount}>{props.conversation.unreadCount}</p>
        </div>
      }
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (username) => {
      dispatch(setActiveChat(username));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
