import { useCallback, useEffect, useState } from "react";
import Scroll from "react-scroll";
import { socket } from "./socket";
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
      <div className="container pb-5">
        <ul>
          {messages &&
            messages.map((m) => (
              <li key={m._id}>
                <i>{m.from}:</i> {m.text}
              </li>
            ))}
        </ul>
      </div>

      <div className="fixed-bottom">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <input
                className="w-100"
                value={user}
                onChange={(e) => setUser(e.currentTarget.value)}
              />
            </div>
            <div className="col-7">
              <input
                className="w-100"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                onKeyDown={(e) => e.code === "Enter" && onSubmit()}
              />
            </div>
            <div className="col-3">
              <button className="btn btn-primary" onClick={onSubmit}>
                Invia
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSocket;
