import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setAuthentication } from '@store/reducers/auth';
import { setWindowClass } from '@app/utils/helpers';
import { PfCheckbox, PfButton } from '@profabric/react-components';
import * as Yup from 'yup';
import { CHANGE_PASSWORD, GET_CLIENT_BY_ID } from "../../../apiUrls"
import "./login.css"


import {
    authLogin,
  } from '@app/utils/oidc-providers';
  import { Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

type User = {
    idUser: number;
    firstName: string;
    lastName:String;
    email: string;
    phone: string;
    role: string;
    retour:number;
    livraison:number;
    caisse:number
    status: string;
    createdAt: string;
  };

const ChangePassword = () => {

    const { password,id } = useParams();
    const [userId, setUserId] = useState(id);
    const [generatedPassword, setGeneratedPassword] = useState(password);
    const [getUser,setGetUser] = useState<User>()
    const [isAuthLoading, setAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();


  

  const changePassword = async (newPassword: string) => {
    const formData = new FormData();
    if (userId) {
        formData.append("userId", userId );
      }
      if (generatedPassword) {
        formData.append("generatedPassword", generatedPassword);
      }
      formData.append("newPassword", newPassword);
      console.log(formData)
    try {

        await axios.post(CHANGE_PASSWORD, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async function (response) {
            console.log("here before authLogin")
            await axios.get(GET_CLIENT_BY_ID(userId))
            .then(async (res)=> {
                console.log('get client',res.data)
                await authLogin(res.data.email, newPassword);
                toast.success("Mot de passe changer")
                if(res.data.role == "admin" || res.data.role == "superAdmin")
                {
                  window.location.href = "/#/"
                }
                else if(res.data.role == "client")
                { 
                  window.location.href = "/#/clientProfile"
                }else if(res.data.role == "livreur")
                {
                  window.location.href = "/#/livreurCommande"
                }
                else
                {
                  window.location.href = "/#/"
                }
                
            })
            .catch((error)=>{
                console.log(error)
            })
            
            //window.location.href = "/";
            
        });

        

        
          
          console.log("here 5")
          
        } catch (error: any) {
          toast.error(error.message || "Failed");
        }
  };


  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
        changePassword(values.password);
    },
  });

  setWindowClass('hold-transition login-page');



    return (
        <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/#/" className="h1">
            <b>FASTO</b>
          </Link>
        </div>
        <div className="card-body login-body">
          <p className="login-box-msg">Changer votre password</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3 login-input">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row text-center login-button">
              <div className="col">
                <button type="submit" className='btn btn-primary'>
                  Changer mot de passe
                </button>
                {/*<PfButton
                  block
                  type="submit"
                  loading={isAuthLoading}
                  className='button-login'
                >
                  {t<string>('login.button.signIn.label')}
                </PfButton>*/}
              </div>
            </div>
          </form>
          {/*<p className="mb-1">
            <Link to="/forgot-password">
              Oublier mot de passe
            </Link>
              </p>*/}
        </div>
      </div>
    </div>
    )
}


export default ChangePassword;