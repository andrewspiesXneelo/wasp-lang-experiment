import { useState, FormEvent, useEffect } from "react";
import Storage from "../../../shared/Services/storage";
import { generateConnectionCode } from "../../../shared/Utilities/utils";
import createUser from "@wasp/actions/createUser";
import "./LoginPanel.css";

const LoginPanel = () => {
  const storage = new Storage();
  const [loading, setLoading] = useState(false);
  const [connCode, setConnCode] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    generateConnectionCode()
      .then((code) => {
        console.log("Conn Code", code);
        setConnCode(code);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    storage.store("user", { name, code: connCode });

    await createUser({
      username: name,
      code: connCode,
      channelIds: [],
      messageIds: [],
    })
      .then((res) => console.log("user created", res))
      .catch((err) => console.error(err));
    closeLoginPanel();
  };

  const closeLoginPanel = () => {
    const event = new Event("closeLoginPanel", { bubbles: true });
    dispatchEvent(event);
  };

  return (
    <div className="login__panel">
      {!!loading && (
        <div className="login__panel_loader">
          <p>Setting Up Temporary Profile...</p>
        </div>
      )}
      <div className="login__panel_header">
        <h2>Chat Profile Setup</h2>
        <button
          type="button"
          className="close__button"
          onClick={() => {
            closeLoginPanel();
          }}
        >
          X
        </button>
      </div>
      <div className="login__panel_body">
        <form onSubmit={(e) => handleLogin(e)}>
          <label>Provide Your Chat Handle</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Username"
            required
          />
          <button type="submit" disabled={name.length < 3}>
            Set Chat Handle
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPanel;
