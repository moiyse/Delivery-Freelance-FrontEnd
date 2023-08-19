import { useEffect } from "react";
import "./users.css";
import { ContentHeader } from "@app/components";

const Payments = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "js/tablePayment.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
    <ContentHeader title="Payment Commandes" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Status commandes et payments</h3>
              </div>
              {/* /.card-header */}
              <div style={{overflow:"auto"}} className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Id Commande</th>
                      <th>Status Commande</th>
                      <th>Status Paiment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>4</td>
                      <td className="pill-td">
                        <span className="badge bg-warning">Waiting Pickup</span>
                      </td>
                      <td className="pill-td">
                        <span className="badge bg-danger">Not payed</span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning">
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="dropdown"
                            aria-expanded="true"
                          >
                            <i className="fa fa-bars" />
                          </button>
                          <ul
                            className="dropdown-menu "
                            x-placement="top-start"
                            style={{
                              position: "absolute",
                              willChange: "transform",
                              top: 0,
                              left: 0,
                              transform: "translate3d(-122px, -84px, 0px)",
                            }}
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                              payed
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                              Not paye
                              </a>
                            </li>
                            
                          </ul>
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="pill-td">
                        <span className="badge bg-success">Delivered</span>
                      </td>
                      <td className="pill-td">
                        <span className="badge bg-success">Payed</span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning">
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="dropdown"
                            aria-expanded="true"
                          >
                            <i className="fa fa-bars" />
                          </button>
                          <ul
                            className="dropdown-menu "
                            x-placement="top-start"
                            style={{
                              position: "absolute",
                              willChange: "transform",
                              top: 0,
                              left: 0,
                              transform: "translate3d(-122px, -84px, 0px)",
                            }}
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                              payed
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                              Not paye
                              </a>
                            </li>
                            
                          </ul>
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="pill-td">
                        <span className="badge bg-warning">Waiting Pickup</span>
                      </td>
                      <td className="pill-td">
                        <span className="badge bg-danger">Not payed</span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning">
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="dropdown"
                            aria-expanded="true"
                          >
                            <i className="fa fa-bars" />
                          </button>
                          <ul
                            className="dropdown-menu "
                            x-placement="top-start"
                            style={{
                              position: "absolute",
                              willChange: "transform",
                              top: 0,
                              left: 0,
                              transform: "translate3d(-122px, -84px, 0px)",
                            }}
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                              payed
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                              Not paye
                              </a>
                            </li>
                            
                          </ul>
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="pill-td">
                        <span className="badge bg-info">Picked Up</span>
                      </td>
                      <td className="pill-td">
                        <span className="badge bg-danger">Not payed</span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning">
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="dropdown"
                            aria-expanded="true"
                          >
                            <i className="fa fa-bars" />
                          </button>
                          <ul
                            className="dropdown-menu "
                            x-placement="top-start"
                            style={{
                              position: "absolute",
                              willChange: "transform",
                              top: 0,
                              left: 0,
                              transform: "translate3d(-122px, -84px, 0px)",
                            }}
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                              payed
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                              Not paye
                              </a>
                            </li>
                            
                          </ul>
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="pill-td">
                        <span className="badge bg-danger">Canceled</span>
                      </td>
                      <td className="pill-td">
                        <span className="badge bg-danger">Not payed</span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning">
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="dropdown"
                            aria-expanded="true"
                          >
                            <i className="fa fa-bars" />
                          </button>
                          <ul
                            className="dropdown-menu "
                            x-placement="top-start"
                            style={{
                              position: "absolute",
                              willChange: "transform",
                              top: 0,
                              left: 0,
                              transform: "translate3d(-122px, -84px, 0px)",
                            }}
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                              payed
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                              Not paye
                              </a>
                            </li>
                            
                          </ul>
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </>
  );
};

export default Payments;
