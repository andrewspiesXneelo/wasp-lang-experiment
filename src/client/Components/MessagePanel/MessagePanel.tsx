import type { Message } from "../../../server/serverTypes";
import getUsers from "@wasp/queries/getUsers";
import { useQuery } from "@wasp/queries";
import "./MessagePanel.css";

const MessagePanel = (props: { messages?: Message[] }) => {
  const { data: user, error: userError } = useQuery(getUsers);
  

  return (
    <div className="message__panel">
      {props.messages?.map((message, index) => {
        return (
          <div key={index} className="message">
            <div className="message__author">{message.userId}</div>
            <div className="message__timestamp">
              {message.created.toString()}
            </div>
            <div className="message__content">{message.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagePanel;
