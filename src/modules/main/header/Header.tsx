import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleControlSidebar,
  toggleSidebarMenu,
} from "@app/store/reducers/ui";
import MessagesDropdown from "@app/modules/main/header/messages-dropdown/MessagesDropdown";
import NotificationsDropdown from "@app/modules/main/header/notifications-dropdown/NotificationsDropdown";
import LanguagesDropdown from "@app/modules/main/header/languages-dropdown/LanguagesDropdown";
import UserDropdown from "@app/modules/main/header/user-dropdown/UserDropdown";
import "./header.css";

const Header = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };

  const handleToggleControlSidebar = () => {
    dispatch(toggleControlSidebar());
  };

  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  const headerInitialization = () => {
    const authenticationData: any = localStorage.getItem("authentication");
    const authenticationObject = JSON.parse(authenticationData);
    if (
      authenticationObject.profile.role == "admin" ||
      authenticationObject.profile.role == "superAdmin"
    ) {
      return (
        <>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/users" className="nav-link">
              Utilisateurs
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/commandes" className="nav-link">
              Commandes
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/payments" className="nav-link">
              Payments
            </Link>
          </li>
        </>
      );
    } else if (authenticationObject.profile.role == "livreur") {
      return (
        <>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/livreurCommandes" className="nav-link">
              Mes Commandes
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/livreurPayment" className="nav-link">
              Payment des commandes
            </Link>
          </li>
        </>
      );
    } else if (authenticationObject.profile.role == "client") {
      return (
        <>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/clientProfile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/clientAjoutCommande" className="nav-link">
              Ajouter Commande
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/clientCommandes" className="nav-link">
              Mes Commandes
            </Link>
          </li>
        </>
      );
    }
  };




  return (
    <nav style={{ padding: "0.5rem 0.5rem" }} className={getContainerClasses()}>
      <ul style={{ display: "flex" }} className="navbar-nav">
        <li className="nav-item">
          <button
            onClick={handleToggleMenuSidebar}
            type="button"
            className="nav-link"
          >
            <i className="fas fa-bars" />
          </button>
        </li>

        {headerInitialization()}
        
      </ul>
      <ul className="navbar-nav ml-auto">
        <MessagesDropdown />
        <NotificationsDropdown />
        <LanguagesDropdown />
        <UserDropdown />
        <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            onClick={handleToggleControlSidebar}
          >
            <i className="fas fa-th-large" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
