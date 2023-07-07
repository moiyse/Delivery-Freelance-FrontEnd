import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize } from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@app/pages/Admin/profile/Profile';
import Tables from '@app/pages/Admin/tables/Users';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { setAuthentication } from './store/reducers/auth';
import {
  GoogleProvider,
  getAuthStatus,
  getFacebookLoginStatus,
} from './utils/oidc-providers';
import Users from '@app/pages/Admin/tables/Users';
import FrontMain from './frontOffice/components/FrontMain';
import FrontHome from './frontOffice/pages/FrontHome';
import Register from './frontOffice/pages/Register';
import Commandes from './pages/Admin/tables/Commandes';
import Payments from './pages/Admin/tables/Payments';
import AjoutCommandes from './pages/Admin/forms/AjoutCommandes';
import AjoutUser from './pages/Admin/forms/AjoutUser';
import ClientCommandes from './pages/Client/tables/ClientCommandes';
import ClientAjoutCommandes from './pages/Client/forms/ClientAjoutCommandes';
import ClientProfile from './pages/Client/profile/ClientProfile';
import LivreurCommandes from './pages/Livreur/tables/LivreurCommandes';
import LivreurPayments from './pages/Livreur/tables/LivreurPayments';
import UpdateUser from './pages/Admin/forms/UpdateUser';

declare const FB: any;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        getFacebookLoginStatus(),
        GoogleProvider.getUser(),
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log('error', error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/delivery">
          <Route path="/delivery/" element={<FrontMain />}>
            <Route path="/delivery/" element={<FrontHome />} /> 
            <Route path="/delivery/register" element={<Register />} />
          </Route>
        </Route>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/changer-mdp" element={<PublicRoute />}>
          <Route path="/changer-mdp" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/commandes" element={<Commandes />} />
            <Route path="/ajoutCommande" element={<AjoutCommandes />} />
            <Route path="/ajoutUser" element={<AjoutUser />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/clientCommandes" element={<ClientCommandes />} />
            <Route path="/clientAjoutCommande" element={<ClientAjoutCommandes />} />
            <Route path="/clientProfile" element={<ClientProfile />} />
            <Route path="/livreurCommandes" element={<LivreurCommandes />} />
            <Route path="/LivreurPayment" element={<LivreurPayments />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
