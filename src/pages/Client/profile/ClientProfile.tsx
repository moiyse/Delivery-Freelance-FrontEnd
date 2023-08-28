import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ContentHeader } from "@components";
import { PfButton, PfImage } from "@profabric/react-components";
import styled from "styled-components";
import { getCurrentUser } from "@app/services/auth";

import ActivityTab from "./ActivityTab";
import TimelineTab from "./TimelineTab";
import SettingsTab from "./SettingsTab";
import { getUserById, updateUserById } from "@app/pages/Admin/tables/UsersService";
import { toast } from "react-toastify";

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;
interface User{
  idUser:number,
  firstName:string,
  lastName:string,
  email:string,
  phone:string
}
const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState("ACTIVITY");
  const [t] = useTranslation();
  const [myDetails,setMyDetails]=useState<User>({
    idUser: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone:''
  })
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')


  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const updateUser=async()=>{
    const userUpdated={
      firstName:firstName ||myDetails.firstName,
      lastName:lastName || myDetails.lastName ,
      email:email || myDetails.email ,
      phone:phone || myDetails.phone
    }
    try{
      updateUserById(getCurrentUser().idUser,userUpdated)
      toast.success('Modifier avec Succés')
    }catch(error){
      toast.error('Failed')

    }
  }
  useEffect(() => {
    const getMyInfo=async()=>{
      const data=await getUserById(getCurrentUser().idUser)
      setMyDetails(data)
    }
    getMyInfo()

  }, []);

  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col"></div>
            <div className="col-9">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <h3 className="profile-username text-center">{myDetails.firstName} {myDetails.lastName}</h3>
                  <p className="text-muted text-center"><strong>Email: </strong>{myDetails.email}</p>
                  <p className="text-muted text-center"><strong>Tel: </strong>{myDetails.phone}</p>
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="exampleInputEmail1">Nom</label>
                            <input
                              onChange={(e)=>setFirstName(e.currentTarget.value)}
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder={myDetails.firstName}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="exampleInputEmail1">Prenom</label>
                            <input
                              onChange={(e)=>setLastName(e.currentTarget.value)}
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder={myDetails.lastName}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input
                              onChange={(e)=>setEmail(e.currentTarget.value)}
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder={myDetails.email}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Téléphone
                            </label>
                            <input
                              onChange={(e)=>setPhone(e.currentTarget.value)}
                              type="tel"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder={myDetails.phone}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="row text-center">
              <div style={{margin: "0px auto"}} className="col">
                <button style={{backgroundColor:"#e93f47",border:"none"}} onClick={updateUser} className='btn btn-primary'>
                  Modifier
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
                </div>
                {/* /.card-body */}
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientProfile;
