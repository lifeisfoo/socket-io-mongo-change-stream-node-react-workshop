import { useState } from "react";
import useSWR from "swr";
import Scroll from "react-scroll";
import { fetcher, postMessage } from "./utils";
const scroll = Scroll.animateScroll;

function AppHttp() {
  const [text, setText] = useState("");
  const [user, setUser] = useState("guest");

  const { data: messages, mutate } = useSWR("/messages", fetcher);

  const onSubmit = () => {
    postMessage({ from: user, text }).then(() => {
      setText("");
      mutate().then(() => scroll.scrollToBottom());
    });
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

export default AppHttp;
