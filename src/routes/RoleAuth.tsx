import Blank from '@app/pages/Blank';
import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';


const currentUser = () => {
    const authenticationData: any = localStorage.getItem("authentication");
    const authenticationObject = JSON.parse(authenticationData);
    const authenticationToken = authenticationObject.profile.token
    let jwt = authenticationToken
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    return decodedJwtData
  }

  
  
const RoleAuth = ({ allowedRole }: { allowedRole: string[] }) => {
    console.log("allowed role gotten : ",allowedRole)
    console.log(currentUser())
    let currentRole = currentUser().role

    //!allowedRoles.includes(currentUser)
    
    if(currentRole == "client")
    {
      return allowedRole.includes(currentRole) ?  <Outlet /> : <Navigate to="/clientProfile" />;
    }
    else if(currentRole == "livreur")
    {
      return allowedRole.includes(currentRole) ?  <Outlet /> : <Navigate to="/livreurCommandes" />;
    }else if(currentRole == "admin" || currentRole == "superAdmin"){
      return allowedRole.includes(currentRole) ?  <Outlet /> : <Navigate to="/users" />;
    }else
    return allowedRole.includes(currentRole) ?  <Outlet /> : <Navigate to="/delivrey" />;
    
    
};

export default RoleAuth;