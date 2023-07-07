import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ContentHeader } from "@components";
import { PfButton, PfImage } from "@profabric/react-components";
import styled from "styled-components";

import ActivityTab from "./ActivityTab";
import TimelineTab from "./TimelineTab";
import SettingsTab from "./SettingsTab";

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState("ACTIVITY");
  const [t] = useTranslation();

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
                  <h3 className="profile-username text-center">John Doe</h3>
                  <p className="text-muted text-center"><strong>Email: </strong>johndoe@gmail.com</p>
                  <p className="text-muted text-center"><strong>Tel: </strong>97854623</p>
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="exampleInputEmail1">Nom</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="John"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="exampleInputEmail1">Prenom</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="johndoe@gmail.com"
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
                              type="tel"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="97854623"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="row text-center login-button">
              <div style={{margin: "0px 95px"}} className="col">
                <button className='btn btn-primary'>
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
