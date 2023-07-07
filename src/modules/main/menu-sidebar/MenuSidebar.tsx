import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import {PfImage} from '@profabric/react-components';
import styled from 'styled-components';
import {SidebarSearch} from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';
import './MenuSidebar.css'

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU_ADMIN: IMenuItem[] = [
  
  {
    name: "Utilisateurs",
    icon: 'fa fa-users nav-icon',
    children: [
      {
        name: "Ajouter utilisateur",
        icon: 'fa fa-plus-circle',
        path: '/ajoutUser'
      },

      {
        name: "List utilisateur",
        icon: 'fas fa-list-ul',
        path: '/users'
      }
    ]
  },
  {
    name: "Commandes",
    icon: 'fa fa-archive nav-icon',
    children: [
      {
        name: " Ajouter Commandes ",
        icon: 'fa fa-plus-circle',
        path: '/ajoutCommande'
      },

      {
        name: " List Commandes",
        icon: 'fas fa-list-ul',
        path: '/commandes'
      }
    ]
  },
  {
    name: "Payement Commande",
    icon: 'fa fa-file nav-icon',
    path: '/payments'
  },
  {
    name: "Suivi Livreur",
    icon: 'fa fa-user nav-icon',
    path: '/payments'
  },
  
];

export const MENU_CLIENT: IMenuItem[] = [

  {
    name: "Profile",
    icon: 'fa fa-user nav-icon',
    path: '/clientProfile'
  },
  {
    name: "Ajouter Commande",
    icon: 'fa fa-plus-circle nav-icon',
    path: '/clientAjoutCommande'
  },
  {
    name: "Mes Commandes",
    icon: 'fas fa-list-ul nav-icon',
    path: '/clientCommandes'
  },
  
];

export const MENU_LIVREUR: IMenuItem[] = [
  {
    name: "Mes Commandes",
    icon: 'fas fa-list-ul nav-icon',
    path: '/livreurCommandes'
  },
  {
    name: "Payment de mes commandes",
    icon: 'fa fa-file nav-icon',
    path: '/livreurPayment'
  },
  
];

const StyledBrandImage = styled(PfImage)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  let MENU:IMenuItem[] =[]
  let msg:string = "start"

  const initilizeMenu = () => { 
    const authenticationData:any = localStorage.getItem('authentication');
    const authenticationObject = JSON.parse(authenticationData);
    if(authenticationObject.profile.role == "admin" || authenticationObject.profile.role == "superAdmin")
    {
      console.log("here1")
      msg="admin"
      MENU = MENU_ADMIN
      console.log(MENU)
    }
    else if(authenticationObject.profile.role == "livreur")
    {
      msg="livreur"
      console.log("here2")
      MENU = MENU_LIVREUR
    }
    else if(authenticationObject.profile.role == "client")
    {
      msg="client"
      console.log("here3")
      MENU = MENU_CLIENT
    }

    return MENU
  }



  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <span className="brand-text">FASTO</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={authentication.profile.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {authentication.profile.email}
            </Link>
          </div>
        </div>

        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {initilizeMenu().map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
