const MsgList = ({ messages }) => {
  return (
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
  );
};

export default MsgList;
