import React, { useCallback, useEffect, useState } from "react";
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
import { getCurrentUser } from "@app/services/auth";

const Header = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);
  const [userConnected,setUserConnected]=useState()

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
/*
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
  };*/
  const user = getCurrentUser();

  return (
    <nav style={{ padding: "0.5rem 0.5rem",display:"block" }} className={getContainerClasses()}>
    <ul style={{ display: "flex", justifyContent: "space-between" }} className="navbar-nav">
      <div className="nav-item">
        <li>
          <button
            onClick={handleToggleMenuSidebar}
            type="button"
            className="nav-link"
          >
            <i className="fas fa-bars" />
          </button>
        </li>
      </div>
      <div className="nav-item mx-auto">
        <li>
          {user.role === 'admin' && <NotificationsDropdown />}
        </li>
        <li>
          <UserDropdown />
        </li>
      </div>
    </ul>
  </nav>
  );
};

export default Header;
