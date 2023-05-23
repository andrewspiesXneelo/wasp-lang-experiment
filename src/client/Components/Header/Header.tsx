import { useState, MouseEvent } from "react";
import InvitePanel from "../InvitePanel/InvitePanel";
import "./Header.css";

const Header = (props: { title: string; subtitle: string }) => {
  const [showInvite, setShowInvite] = useState<boolean>(false);
  const [showConnectPanel, setShowConnectPanel] = useState<boolean>(false);

  const openInvitePanel = () => {
    setShowInvite(showInvite ? false : true);
  };

  const openConnectPanel = () => {
    setShowConnectPanel(showConnectPanel ? false : true);
  };

  window.addEventListener("closeInvitePanel", (e) => {
    setShowInvite(false);
  });

  window.addEventListener("closeConnectPanel", (e) => {
    setShowConnectPanel(false);
  });

  return (
    <div className="header__container">
      {!!showInvite && (
        <div className="invite__panel_container">
          <div className="invite__panel__overlay"></div>
          <InvitePanel />
        </div>
      )}

      <header className="header">
        <div className="header__title_container">
          <h1 className="header__title">{props.title}</h1>
          <p className="header__subtitle">{props.subtitle}</p>
        </div>
        <div className="header__button_container">
          <button
            className="invite__button"
            type="button"
            onClick={() => {
              openInvitePanel();
            }}
          >
            Invite Contact
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
