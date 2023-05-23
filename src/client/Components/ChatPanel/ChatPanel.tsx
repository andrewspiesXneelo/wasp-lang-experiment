import { useState, ChangeEvent, MouseEvent } from "react";
import MessagePanel from "../MessagePanel/MessagePanel";
import Storage from "../../../shared/Services/storage";
import storeMessage from "@wasp/actions/storeMessage";
import getMessages from "@wasp/queries/getMessages";
import getChannels from "@wasp/queries/getChannels";
import getUsers from "@wasp/queries/getUsers";
import type { Channel, Message, User, Code } from "../../../server/serverTypes";
import "./ChatPanel.css";
import { useQuery } from "@wasp/queries";

const ChatPanel = () => {
  const storage = new Storage();
  const userData = storage.retrieve("user") || null;
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<number>();

  const { data: channels, error: channelError } = useQuery(getChannels);
  const { data: users, error: usersError } = useQuery(getUsers);

  const { data: messages, error: messsagesError } = useQuery(getMessages, {
    channelId: selectedChannel!,
  });

  // if (user) {
  //   const { data: messages, error: messsagesError } = useQuery(getMessages, {
  //     userId: user[0].id,
  //   });
  // }

  const getChannelMessages = (id: number) => {
    setSelectedChannel(id);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const date = new Date();
    const selectedUser: any = users!.filter(
      (user: User) => user.username === userData.name
    );

    const newMessageObj: Message = {
      id: 0,
      text: newMessage,
      channelId: selectedChannel!,
      userId: selectedUser[0].id,
      author: selectedUser[0].username,
      created: new Date(),
    };

    await storeMessage({
      text: newMessage,
      channelId: selectedChannel!,
      userId: selectedUser[0].id,
      author: selectedUser[0].username,
    });
    setNewMessage("");
  };

  const handleNewMessage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewMessage((e.target as HTMLInputElement).value);
  };

  // techically this be renamed to channels not contacts
  return (
    <div className="chat__panel">
      <div className="contacts__panel">
        <ul>
          {!!channels &&
            channels.map((channel: Channel, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    getChannelMessages(channel.id);
                  }}
                >
                  <span className="contact__name">
                    {channel.id + ": " + channel.name}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="messages__panel">
        <MessagePanel messages={messages} />
        <div className="message__input">
          <form
            onSubmit={(e) => {
              sendMessage(e);
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              onChange={(e) => handleNewMessage(e)}
              value={newMessage}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
