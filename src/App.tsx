import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
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
  getAuthStatus
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
import AjoutPaymentExpediteur from './pages/Admin/forms/AjoutPaymentExpediteur';
import PaymentExpediteur from './pages/Admin/tables/PaymentExpediteur';
import LivreurPaymentExpediteur from './pages/Livreur/tables/LivreurPaymentExpediteur';import RoleAuth from './routes/RoleAuth';
import ChangePassword from './modules/login/ChangerPassword';
import UpdateUser from './pages/Admin/forms/UpdateUser';
import EnPreparation from './pages/Admin/tables/ListCommandByStatus/EnPreparation';
import EnAttentePickUp from './pages/Admin/tables/ListCommandByStatus/EnAttentePickUp';
import EnDepot from './pages/Admin/tables/ListCommandByStatus/EnDepot';
import EnCours from './pages/Admin/tables/ListCommandByStatus/EnCoursDeLivraison';
import Livree from './pages/Admin/tables/ListCommandByStatus/Livree';
import Annulee from './pages/Admin/tables/ListCommandByStatus/Annulee';
import Livreur from './pages/Admin/tables/Livreur';
import ForgotPassword from '@modules/forgot-password/ForgotPassword';

declare const FB: any;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [currentUserRole,setCurrentUserRole] =useState("");

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
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
    return <p>Loading...</p>;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/delivery">
          <Route path="/delivery/" element={<FrontMain />}>
            <Route path="/delivery/" element={<FrontHome />} /> 
            <Route path="/delivery/register" element={<Register />} />
          </Route>
        </Route>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path="/ajoutUser/changePassword/:password/:id" element={<ChangePassword />} />
        <Route path="/forgot/changePassword/:password/:id" element={<ChangePassword />} />
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
            <Route path="/users"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/listPaymentExpediteur"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/listPaymentExpediteur" element={<PaymentExpediteur />} />
            </Route>
            <Route path="/commandes"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/commandes" element={<Commandes />} />
            </Route>
            <Route path="/ajoutCommande"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/ajoutCommande" element={<AjoutCommandes />} />
            </Route>
            <Route path="/ajoutUser"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/ajoutUser" element={<AjoutUser />} />
            </Route>
            <Route path="/ajoutPaymentExpediteur"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/ajoutPaymentExpediteur" element={<AjoutPaymentExpediteur />} />
            </Route>
            <Route path="/enPreparation"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/enPreparation" element={<EnPreparation />} />
            </Route>
            <Route path="/enAttentePickUp"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/enAttentePickUp" element={<EnAttentePickUp />} />
            </Route>
            <Route path="/enDepot"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/enDepot" element={<EnDepot />} />
            </Route>
            <Route path="/enCours"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/enCours" element={<EnCours />} />
            </Route>
            <Route path="/livree"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/livree" element={<Livree />} />
            </Route>
            <Route path="/annulee"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/annulee" element={<Annulee />} />
            </Route>
            <Route path="/suiviLivreur"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/suiviLivreur" element={<Livreur />} />
            </Route>
            <Route path="/clientCommandes"  element={<RoleAuth allowedRole={["client"]} />} >
              <Route path="/clientCommandes" element={<ClientCommandes />} />
            </Route>
            <Route path="/clientAjoutCommande"  element={<RoleAuth allowedRole={["client"]} />} >
              <Route path="/clientAjoutCommande" element={<ClientAjoutCommandes />} />
            </Route>
            <Route path="/clientProfile"  element={<RoleAuth allowedRole={["client"]} />} >
              <Route path="/clientProfile" element={<ClientProfile />} />
            </Route>
            <Route path="/livreurCommandes"  element={<RoleAuth allowedRole={["livreur"]} />} >
              <Route path="/livreurCommandes" element={<LivreurCommandes />} />
            </Route>
            <Route path="/LivreurPaymentExpediteur"  element={<RoleAuth allowedRole={["livreur"]} />} >
              <Route path="/LivreurPaymentExpediteur" element={<LivreurPaymentExpediteur />} />
            </Route>
            <Route path="/"  element={<RoleAuth allowedRole={["admin","superAdmin"]} />} >
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/"  element={<RoleAuth allowedRole={["client"]} />} >
              <Route path="/" element={<Blank />} />
            </Route>
            <Route path="/"  element={<RoleAuth allowedRole={["livreur"]} />} >
              <Route path="/" element={<Blank />} />
            </Route>
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
    </HashRouter>
  );
};

export default App;
