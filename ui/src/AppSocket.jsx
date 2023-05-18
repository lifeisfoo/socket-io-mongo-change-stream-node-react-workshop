import { useEffect, useState } from "react";
import Scroll from "react-scroll";
import { socket } from "./socket";
import MsgList from "./MsgList";
import MsgInput from "./MsgInput";
const scroll = Scroll.animateScroll;

function AppSocket() {
  const [text, setText] = useState("");
  const [user, setUser] = useState("guest");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onChatHistory = (msgs) => {
      setMessages(msgs);
      scroll.scrollToBottom();
    };
    const onChatMessage = (msg) => {
      setMessages([...messages, msg]);
      scroll.scrollToBottom();
    };

    socket.on("chat history", onChatHistory);
    socket.on("chat message", onChatMessage);

    return () => {
      socket.off("chat history", onChatHistory);
      socket.off("chat message", onChatMessage);
    };
  }, [messages]);

  const onSubmit = () => {
    socket.emit("chat message", { from: user, text });
    setText("");
  };

  return (
    <>
      <MsgList messages={messages} />
      <MsgInput
        user={user}
        setUser={setUser}
        text={text}
        setText={setText}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default AppSocket;
