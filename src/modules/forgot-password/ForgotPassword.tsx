import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {setWindowClass} from '@app/utils/helpers';
import {Form, InputGroup} from 'react-bootstrap';
import { checkUser } from '@app/pages/Admin/tables/UsersService';

const ForgotPassword = () => {
  const navigate=useNavigate()
  const [login,setLogin]=useState('')
  setWindowClass('hold-transition login-page');
  const handlClick=async()=>{
    const check=await checkUser(login)
    const x=3
    if(check===true){
      navigate(`/updatePassword/${x}`)
    }else{
      toast.error('Invalide Login! verifier votre adresse')
    }
  }


    return (
        <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/delivery" className="h1">
            <b>FASTO</b>
          </Link>
        </div>
        <div className="card-body login-body">
          <p className="login-box-msg">Entrez votre Login</p>
          <form >
            <div className="mb-3">
              <InputGroup className="mb-3 login-input">
                <Form.Control
                  id="password"
                  name="password"
                  type="text"
                  placeholder="Login"
                  onChange={(e)=>{setLogin(e.target.value)}}
                />
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup.Append>
              </InputGroup>
            </div>
            <div className="row text-center login-button">
              <div className="col">
                <button onClick={handlClick} type="button" className='btn btn-primary'>
                  Changer mot de passe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}


export default ForgotPassword;
