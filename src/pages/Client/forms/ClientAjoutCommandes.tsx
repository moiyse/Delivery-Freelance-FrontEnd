import { useEffect, useState } from "react";
import "./forms.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClientAjoutCommandes = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleInputChange = (index: any, event: any) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveFields = (index:any) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      <div className="card card-primary form-card">
        <div className="card-header">
          <h3 className="card-title">Ajouter Commandes</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form>
          <div className="card-body">
            <div className="form-group">
              <div className="row d-flex align-items-center">
                <label htmlFor="exampleInputEmail1">Articles</label>
                <div className="col-sm-1">
                  <i
                    style={{
                      color: "#007bff",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    className="fa fa-plus-circle"
                    onClick={handleAddFields}
                  ></i>
                </div>
                <div className="col-sm-11">
                  {inputFields.map((inputField, index) => (
                    <div className="d-flex">
                      <input
                        key={index}
                        type="text"
                        className="form-control"
                        placeholder="Enter le Nom"
                        value={inputField.value}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveFields(index)}
                        >
                          <i style={{color:"#eb0000"}} className="fa fa-times"></i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Choisir votre destination"
                  />
                </div>
                <div className="col-md-6">
                  <div>
                    <label>Date et temps pour la livraison</label>
                    <div
                      className="input-group date"
                      id="reservationdatetime"
                      data-target-input="nearest"
                    >
                      <DatePicker
                        selected={selectedDateTime}
                        onChange={(date: any) => setSelectedDateTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Date et temps préférer"
                        className="form-control datetimepicker-input"
                        customInput={
                          <input
                            type="text"
                            className="form-control datetimepicker-input"
                          />
                        }
                        popperClassName="custom-popper"
                        timeCaption="Time"
                        shouldCloseOnSelect={false}
                        withPortal
                      />
                      <div
                        className="input-group-append"
                        data-target="#reservationdatetime"
                        data-toggle="datetimepicker"
                      >
                        <div className="input-group-text">
                          <i className="fa fa-calendar" />
                        </div>
                      </div>
                    </div>
                  </div>
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

export default ClientAjoutCommandes;
