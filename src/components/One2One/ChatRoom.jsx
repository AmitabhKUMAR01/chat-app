// ChatRoom.js
import React, { useState, useEffect } from 'react';

const ChatRoom = ({
  user,
  messages,
  messageBody,
  setMessageBody,
  handleSubmit,
  visibleDeleteMessages,
  selectedMessage,
  deleteMessages,
  handleDoubleClick,
  userId,
}) => {
  return (
    <div className="room--container">
        <form id="message--form" onSubmit={handleSubmit}>
    <div>
      <textarea
        required
        maxLength={"1000"}
        placeholder="say something"
        onChange={(e) => setMessageBody(e.target.value)}
        value={messageBody}
      >
        {" "}
      </textarea>
    </div>
    <div className="send-btn--wrapper">
      <input className="btn btn--secondary" type="submit" value="Send" />
    </div>
  </form>
    </div>
  );
};

export default ChatRoom;
