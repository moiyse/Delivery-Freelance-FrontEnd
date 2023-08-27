import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PfDropdown, PfImage } from '@profabric/react-components';
import { setAuthentication } from '@app/store/reducers/auth';

const StyledSmallUserImage = styled(PfImage)`
  margin-top: 3px;
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const StyledBigUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
  --pf-border: 3px solid #fff3;
`;

const UserHeader = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 75px;
  padding: 10px;
  text-align: center;
  img {
    z-index: 5;
    height: 90px;
    width: 90px;
    border: 3px solid;
    border-color: #e93f47;
  }
  p {
    z-index: 5;
    font-size: 17px;
    margin-top: 10px;
    small {
      display: block;
      font-size: 12px;
    }
  }
`;

const UserBody = styled.li`
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom: 1px solid #e93f47;
  border-top: 1px solid #e93f47;
  padding: 15px;
  &::after {
    display: block;
    clear: both;
    content: '';
  }

  @media (min-width: 576px) {
    a {
      background: #e93f47 !important;
      color: #e93f47 !important;
    }
  }
`;

const UserFooter = styled.li`
  background-color: #f8f9fa;
  padding: 10px;
  &::after {
    display: block;
    clear: both;
    content: '';
  }
  .btn-default {
    color: #6c757d;
  }

  @media (min-width: 576px) {
    .btn-default:hover {
      background-color: #f8f9fa;
    }
  }
`;

export const StyledDropdown = styled(PfDropdown)`
  border: none;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  --pf-dropdown-menu-min-width: 280px;

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

declare const FB: any;

const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const authentication = useSelector((state: any) => state.auth.authentication);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = async (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    console.log('authentication', authentication);
    dispatch(setAuthentication(undefined));
      
    localStorage.removeItem('authentication');
    // window.location.href = '/#/login';
  };
  

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/clientProfile');
  };

  const userRole = () => {
    const authenticationData: any = localStorage.getItem("authentication");
    const authenticationObject = JSON.parse(authenticationData);
    const authenticationToken = authenticationObject.profile.token
    let jwt = authenticationToken
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    if(decodedJwtData.role == "client"){
      return true
    }
    return false
  }

  return (
    <StyledDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="button"
        src={authentication.profile.picture}
        fallbackSrc="/img/default-profile.png"
        alt="User"
        width={25}
        height={25}
        rounded
      />
      <div slot="menu">
        <UserHeader style={{backgroundColor:"#2b3467",border:"3px solid #e93f47",borderBottom:"none",color:"white"}}>
          <p>
            {authentication.profile.email}
          </p>
        </UserHeader>
        <UserFooter style={{border:"3px solid #e93f47",borderTop:"none",color:"#e93f47"}}>
            {userRole() && (
            <button
              type="button"
              className="btn btn-default btn-flat button-user-header"
              onClick={navigateToProfile}
            >
              Profile
            </button>
          )}
          <button
            type="button"
            className="btn btn-default btn-flat float-right button-user-header"
            onClick={logOut}
          >
            Sign Out
          </button>
        </UserFooter>
      </div>
    </StyledDropdown>
  );
};

export default UserDropdown;
