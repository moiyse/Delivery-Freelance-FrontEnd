import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {PfDropdown} from '@profabric/react-components';
import { getNumberOfCommandeNewUpdated, getNumberOfCommandeNotViewed, getNumberOfCommandeNotViewedAndDemende, updateCommandsToViewed } from './NotificationService';
import { FaPlus, FaBell } from 'react-icons/fa';
import { useNotification } from './NotificationContext';
export const StyledDropdown = styled(PfDropdown)`
  border: none;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  --pf-dropdown-menu-min-width: 18rem;

  .dropdown-item {
    padding: 0.5rem 1rem;
  }

  .text-sm {
    margin-bottom: 0;
  }
  .dropdown-divider {
    margin: 0;
  }
`;

const NotificationsDropdown = () => {
  const [t] = useTranslation();
  const [numberOfNotif,setNumberOfNotif]=useState('')
  const [numberOfDemanderNotif,setNumberOfDemanderNotif]=useState('')
  const [totaleNotif,setTotaleNotif]=useState(0)
  const [newUpdatedCommande,setNewUpdatedCommande]=useState('')
  const { notifications } = useNotification()

  useEffect(() => {
    const getNumberOfNotif=async()=>{
      const numberNotViewed = await getNumberOfCommandeNotViewed();
      const notViewedAndDemende = await getNumberOfCommandeNotViewedAndDemende();
      const updatedCommande = await getNumberOfCommandeNewUpdated();
      
      // Parse the fetched values
      const numberOfNotifInt = parseInt(numberNotViewed);
      const numberOfDemanderNotifInt = parseInt(notViewedAndDemende);
      const numberOfNewUpdatedNotifInt = parseInt(updatedCommande);
      
      // Calculate the total
      const total = numberOfNotifInt + numberOfDemanderNotifInt + numberOfNewUpdatedNotifInt;
      
      // Set all the state values
      setNumberOfNotif(numberNotViewed);
      setNumberOfDemanderNotif(notViewedAndDemende);
      setNewUpdatedCommande(updatedCommande);
      setTotaleNotif(total);
    }
    getNumberOfNotif()
  }, [numberOfNotif, numberOfDemanderNotif,notifications]);

  const updateAllCommandeToViewed=async()=>{
    await updateCommandsToViewed() 
    setTotaleNotif(0)
  }
  return (
    <StyledDropdown hideArrow>
      <div onClick={updateAllCommandeToViewed} slot="button">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">{totaleNotif}</span>
      </div>
      <div slot="menu">
        <span className="dropdown-item dropdown-header ">
          {t<string>('header.notifications.count', {quantity: totaleNotif})}
        </span>
        <div className="dropdown-divider " />
        <div className="dropdown-divider" />
        <Link to="/#/" className="dropdown-item header-notification-style">
          <FaBell style={{ color: 'red' }} />
          <span>
            {t<string>('header.notifications.friendRequestsCount', {
              quantity: numberOfNotif
            })}
          </span>
        </Link>
        <div className="dropdown-divider " />
        <Link to="/#/" className="dropdown-item header-notification-style">
          <FaPlus style={{ color: 'red' }} />
          <span>
            {t<string>('header.notifications.reportsCount', {
              quantity: numberOfDemanderNotif
            })}
          </span>
        </Link>
        <div className="dropdown-divider " />

        <Link to="/#/" className="dropdown-item header-notification-style">
          <FaPlus style={{ color: 'red' }} />
          <span>
            {t<string>('header.notifications.updatedCount', {
              quantity: newUpdatedCommande
            })}
          </span>
        </Link>
        <div className="dropdown-divider " />
        <Link to="/#/" className="dropdown-item dropdown-footer header-notification-style">
          {t<string>('header.notifications.seeAll')}
        </Link>
      </div>
    </StyledDropdown>
  );
};

export default NotificationsDropdown;
