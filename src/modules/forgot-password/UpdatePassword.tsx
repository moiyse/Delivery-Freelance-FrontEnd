import React from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import "../login/login.css"
import { setWindowClass } from '@app/utils/helpers';
import { Link,useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { updatePassword } from '@app/pages/Admin/tables/UsersService';


function UpdatePassword() {
    const { id } = useParams();

    const changePassword=async(password:string)=>{
        await updatePassword(id,password)
    }
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
              <Link to="/delivery" className="h1">
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
                  <Link to='/login'>S'authentifier</Link>
                </div>
    
                <div className="row text-center login-button">
                  <div className="col">
                    <button type="submit" className='btn btn-primary'>
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
    
    
    export default UpdatePassword;