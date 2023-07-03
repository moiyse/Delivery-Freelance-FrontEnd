import { ContentHeader } from "@app/components";
import "./forms.css";

const AjoutUser = () => {
  return (
    <>
    <ContentHeader title="Ajouter Utilisateur" />
      <div className="card card-primary form-card">
        <div className="card-header">
          <h3 className="card-title">Ajouter User</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
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
                    placeholder="Entrer le Nom"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prenom</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer la prenom"
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
                    placeholder="Entrer l'email"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer la mot de passe"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Téléphone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer le numéro de téléphone"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label>Selectionner Role</label>
                  <select className="form-control">
                    <option>Client</option>
                    <option>Livreur</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AjoutUser;
