const MsgInput = ({ user, setUser, text, setText, onSubmit }) => {
  return (
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
  );
};

export default MsgInput;
