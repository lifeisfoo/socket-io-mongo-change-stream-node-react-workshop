import { useEffect, useState } from "react";
import Scroll from "react-scroll";
import { postMessage, getMessages } from "./utils";
import MsgList from "./MsgList";
import MsgInput from "./MsgInput";
const scroll = Scroll.animateScroll;

function AppHttp() {
  const [text, setText] = useState("");
  const [user, setUser] = useState("guest");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const msgs = await getMessages();
      const newMsgs = msgs.length > messages.length;
      setMessages(msgs);
      if (newMsgs) {
        scroll.scrollToBottom();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [messages, setMessages, scroll]);

  const onSubmit = () => {
    postMessage({ from: user, text }).then(() => {
      setText("");
    });
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

export default AppHttp;
