import { useMemo, useState, useEffect } from "react";
import "../../../shared/styles/Global.css";
import ChatPanel from "../../Components/ChatPanel/ChatPanel";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Storage from "../../../shared/Services/storage";
import LoginPanel from "@wasp/ext-src/Components/LoginPanel/LoginPanel";
import "./ChatPage.css";

/**
 * Get list contacts from DB
 * On switch to contact -> update messages
 * Chat panel -> contact to panel -> fetches messages for that contact
 */

const ChatPage = () => {
  const storage = new Storage();
  const userData = storage.retrieve("user") || null;
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [user, setUser] = useState(userData);

  const loadLoginPanel = () => {
    if (!user) {
      setIsLoginShowing(true);
    }
  };

  useEffect(() => {
    loadLoginPanel();
  }, []);

  window.addEventListener("closeLoginPanel", (e) => {
    setIsLoginShowing(false);
    setUser(storage.retrieve("user"));
  });

  return (
    <section className="container">
      <Header
        title="WASP Chat App"
        subtitle="E2E encrypted chat via P2P built with Wasp-lang"
      />
      <main>
        {!!isLoginShowing && (
          <div className="login__panel_container">
            <div className="login__panel__overlay"></div>
            <LoginPanel />
          </div>
        )}
        <ChatPanel />
      </main>
      <Footer />
    </section>
  );
};

export default ChatPage;
