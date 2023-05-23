import { useState, FormEvent } from "react";
import sendChatInvite from "@wasp/actions/sendChatInvite";
import createChatChannel from "@wasp/actions/createChannel";
import getUsers from "@wasp/queries/getUsers";
import Storage from "../../../shared/Services/storage";
import "./InvitePanel.css";
import { useQuery } from "@wasp/queries";

const InvitePanel = () => {
  const storage = new Storage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: users, error: err1 } = useQuery(getUsers);

  const userData = storage.retrieve("user");
  const user = users?.find((user) => user.username === userData.name);

  const handleInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const inviteArgs = {
      email,
      code: userData.code,
    };

    const chatArgs = {
      name: userData.code,
      userIds: [user!.id],
    };

    sendChatInvite(inviteArgs)
      .then((res: any) => {
        createChatChannel(chatArgs)
          .then((res: any) => {
            console.log(res);
          })
          .catch((err: Error) => console.error(err));
        closeInvitePanel();
      })
      .catch((err: Error) => console.error(err.message));
  };

  const closeInvitePanel = () => {
    const event = new Event("closeInvitePanel", { bubbles: true });
    dispatchEvent(event);
  };

  return (
    <div className="invite__panel">
      {!!loading && (
        <div className="invite__panel_loader">
          <p>Sending Invite...</p>
        </div>
      )}
      <div className="invite__panel_header">
        <h2>Invite Contact</h2>
        <button
          type="button"
          className="close__button"
          onClick={() => {
            closeInvitePanel();
          }}
        >
          X
        </button>
      </div>
      <div className="invite__panel_body">
        <form onSubmit={(e) => handleInvite(e)}>
          <label>Contact Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            autoComplete="on"
            required
          />
          <button type="submit" disabled={!email.includes("@")}>
            Send Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvitePanel;
