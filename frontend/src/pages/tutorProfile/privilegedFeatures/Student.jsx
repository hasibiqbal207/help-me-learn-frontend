import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Fab } from "react-tiny-fab";
import Chat from "../../../components/chat/Chat";

export default function Student(props) {
  let { tutorId } = props;

  const [showChat, toggleChat] = useState(false);

  const chatClosed = () => toggleChat(false);
  const chatOpened = () => toggleChat(true);

  function renderFabOption() {
    return (
      <Fab
        onMouseEnter={(e) => e.preventDefault()}
        onClick={chatOpened}
        icon={<i className="bi bi-chat-square-text"></i>}
      />
    );
  }

  function renderChat() {
    return (
      <div>
        {renderFabOption()}
        <Chat selectedUserId={tutorId} showChat={showChat} chatClosed={chatClosed} />
      </div>
    );
  }

  return renderChat();
}
