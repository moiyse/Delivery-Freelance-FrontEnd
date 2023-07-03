import { useEffect } from "react";
import "./users.css";
import { ContentHeader } from "@app/components";

const LivreurCommandes = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "js/tableCommande.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
    <ContentHeader title="Commande à livrer" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Mes commandes à livrer</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Id Commande</th>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Destination</th>
                      <th>Deliver At</th>
                      <th>Commande Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>4</td>
                      <td>John Doe</td>
                      <td>
                        <a
                          style={{ textDecoration: "none",color: "#212529" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Articles
                        </a>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                          >
                            Shoes
                          </a>
                          <a className="dropdown-item">
                            Table
                          </a>
                          <a className="dropdown-item">
                            Vest
                          </a>
                        </div>
                      </td>
                      <td>06/30/2023</td>
                      <td>36.842427, 10.163887</td>
                      <td>07/16/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-warning">Waiting Pickup</span>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Michael Brown</td>
                      <td>
                        <a
                          style={{ textDecoration: "none",color: "#212529" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Articles
                        </a>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                          >
                            Book
                          </a>
                          <a className="dropdown-item">
                            Desk
                          </a>
                          <a className="dropdown-item">
                            Coat
                          </a>
                        </div>
                      </td>
                      <td>06/27/2023</td>
                      <td>37.7749° N, 122.4194° W</td>
                      <td>07/13/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-success">Delivered</span>
                      </td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td>Sarah Johnson</td>
                      <td>
                        <a
                          style={{ textDecoration: "none",color: "#212529" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Articles
                        </a>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                            
                          >
                            Camera
                          </a>
                          <a className="dropdown-item">
                            Chair
                          </a>
                          <a className="dropdown-item" >
                            Shirt
                          </a>
                        </div>
                      </td>
                      <td>06/26/2023</td>
                      <td>51.5074° N, 0.1278° W</td>
                      <td>07/12/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-warning">Waiting Pickup</span>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Olivia Davis</td>
                      <td>
                        <a
                          style={{ textDecoration: "none",color: "#212529" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Articles
                        </a>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                            
                          >
                            Watch
                          </a>
                          <a className="dropdown-item">
                            Sofa
                          </a>
                          <a className="dropdown-item">
                            T-shirt
                          </a>
                        </div>
                      </td>
                      <td>06/25/2023</td>
                      <td>40.7128° N, 74.0060° W</td>
                      <td>07/11/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-info">Picked Up</span>
                      </td>
                    </tr>

                    <tr>
                      <td>11</td>
                      <td>James Wilson</td>
                      <td>
                        <a
                          style={{ textDecoration: "none",color: "#212529" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Articles
                        </a>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                          >
                            Headphones
                          </a>
                          <a className="dropdown-item">
                            Table
                          </a>
                          <a className="dropdown-item">
                            Jacket
                          </a>
                        </div>
                      </td>
                      <td>06/24/2023</td>
                      <td>37.7749° N, 122.4194° W</td>
                      <td>07/10/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-danger">Canceled</span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Id Commande</th>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Destination</th>
                      <th>Deliver At</th>
                      <th>Commande Status</th>
                    </tr>
                  </tfoot>
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

export default LivreurCommandes;
