import SecondHeader from "../components/SecondHeader";

const Register = () => {
  return (
    <>
      <SecondHeader />
        <section id="hero-secondary" className="d-flex align-items-center">
          <div className="container">
            <div className="section-title">
              <h2>
                Accueil
                <i className="bi bi-arrow-right-short" />
                Devenir Client{" "}
              </h2>
            </div>
          </div>
        </section>
        {/* End Hero */}
        <main id="main">
          {/* ======= Contact Section ======= */}
          <section id="register" className="register">
            <div className="container">
              <div className="section-title">
                <h2>Devenir un client</h2>
                <p>
                  Magnam dolores commodi suscipit. Necessitatibus eius
                  consequatur ex aliquid fuga eum quidem. Sit sint consectetur
                  velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit
                  suscipit alias ea. Quia fugiat sit in iste officiis commodi
                  quidem hic quas.
                </p>
              </div>
              <div className="row">
                <div className="col" />
                <div className="col-lg-8 mt-5 mt-lg-0 d-flex align-items-stretch">
                  <form
                    action="forms/contact.php"
                    method="post"
                    role="form"
                    className="php-email-form"
                  >
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Nom</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Prenom</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Telephone</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        rows={10}
                        required
                        defaultValue={""}
                      />
                    </div>
                    <div className="my-3">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit">Envoyer</button>
                    </div>
                  </form>
                </div>
                <div className="col" />
              </div>
            </div>
          </section>
          {/* End Contact Section */}
        </main>
        {/* End #main */}
    </>
  );
};

export default Register;
