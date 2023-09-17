import { useRef } from "react";
import Header from "../components/Header";

const FrontHome = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);


  return (
    <>
      <Header aboutRef={aboutRef} servicesRef={servicesRef} contactRef={contactRef} />
      <main id="main">
        <section id="about" ref={aboutRef} className="about">
          <div className="container">
            <div className="section-title">
              <h2>Qui Somme Nous</h2>
            </div>
            <div className="row content">
              <div className="col" />
              <div className="col-lg-6">
                <p>
                Nous sommes une équipe dévouée qui s'engage à fournir des solutions de livraison efficaces. Forts de plusieurs années d'expérience, nous veillons à ce que vos colis parviennent à destination rapidement.
                </p>
                <ul>
                  <li>
                    <i className="ri-check-double-line" /> Notre équipe possède une expertise approfondie en matière de gestion logistique
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Grâce à notre système de suivi en temps réel, vous pouvez avoir une visibilité complète sur l'emplacement de vos colis
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Notre priorité est de vous offrir un service client exceptionnel
                  </li>
                </ul>
              </div>
              <div className="col-lg-5 pt-4 pt-lg-0 d-flex justify-content-center">
                <img
                  style={{ width: 427 }}
                  src="assets/img/1687615190056.png"
                  className="img-fluid text-center"
                />
              </div>
            </div>
          </div>
        </section>
        {/* End About Us Section */}
        <section id="services" ref={servicesRef} className="cta cta-service">
          <div className="container">
            <div className="section-title">
              <h2>Nos Services</h2>
              <p style={{ color: "white" }}>
                Nous proposons une large gamme de services pour répondre à vos besoins en matière de livraison
              </p>
            </div>
            <div className="row">
              <div className="col-xl-3 col-md-6 d-flex align-items-stretch">
                <div className="icon-box text-center">
                  <div className="icon">
                    <i className="bi bi-box-seam-fill" />
                  </div>
                  <h4>
                    <a>Livraisons rapides et fiables</a>
                  </h4>
                  <p>
                  Nous vous garantissons des livraisons rapides et fiables, en veillant à votre satisfaction à chaque fois.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box text-center">
                  <div className="icon">
                    <i className="bi bi-geo-alt-fill" />
                  </div>
                  <h4>
                    <a>Suivi en temps réel</a>
                  </h4>
                  <p>
                    vous pouvez avoir une visibilité complète sur l'emplacement de vos colis à chaque étape du processus de livraison.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0">
                <div className="icon-box text-center">
                  <div className="icon">
                    <i className="bi bi-cash-stack" />
                  </div>
                  <h4>
                    <a>Économie d'argent</a>
                  </h4>
                  <p>
                  Nous comprenons l'importance de maîtriser vos coûts. Avec nos solutions de livraison efficaces, vous pouvez économiser de l'argent en optimisant vos opérations logistiques.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0">
                <div className="icon-box text-center">
                  <div className="icon">
                    <i className="bi bi-calendar3" />
                  </div>
                  <h4>
                    <a>Transport sécurisé</a>
                  </h4>
                  <p>
                  Vos colis sont manipulés avec le plus grand soin et transportés en toute sécurité jusqu'à leur destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Cta Section */}
        {/* ======= Frequently Asked Questions Section ======= */}
        <section id="faq" className="faq section-bg">
          <div className="container">
            <div className="section-title">
              <h2>Question fréquemment posée</h2>
              <p>
                Trouvez des réponses aux questions courantes sur nos services de livraison
              </p>
            </div>
            <div className="faq-list">
              <ul>
                <li>
                  <i className="bx bx-help-circle icon-help" />{" "}
                  <a
                    data-bs-toggle="collapse"
                    className="collapse"
                    data-bs-target="#faq-list-1"
                  >
                     Quels sont les délais de livraison que vous proposez ?{" "}
                    <i className="bx bx-chevron-down icon-show" />
                    <i className="bx bx-chevron-up icon-close" />
                  </a>
                  <div
                    id="faq-list-1"
                    className="collapse show"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      FNous offrons des délais de livraison rapides et fiables. Les délais exacts peuvent varier en fonction de la destination, du type de colis et du service choisi. Contactez-nous pour obtenir une estimation précise pour votre envoi.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bx bx-help-circle icon-help" />{" "}
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-2"
                    className="collapsed"
                  >
                    Proposez-vous des options d'assurance pour mes colis ?{" "}
                    <i className="bx bx-chevron-down icon-show" />
                    <i className="bx bx-chevron-up icon-close" />
                  </a>
                  <div
                    id="faq-list-2"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                    Oui, nous proposons des options d'assurance pour assurer la protection de vos colis pendant le transport. Notre équipe peut vous guider sur les différents niveaux de couverture disponibles et vous aider à choisir la meilleure option pour vos besoins.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bx bx-help-circle icon-help" />{" "}
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-3"
                    className="collapsed"
                  >
                    Quels types de colis pouvez-vous livrer ?{" "}
                    <i className="bx bx-chevron-down icon-show" />
                    <i className="bx bx-chevron-up icon-close" />
                  </a>
                  <div
                    id="faq-list-3"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                    Nous pouvons livrer une large gamme de colis, des petits paquets aux articles volumineux. Que ce soit des documents, des produits commerciaux ou des objets personnels, nous avons les capacités pour les transporter en toute sécurité.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bx bx-help-circle icon-help" />{" "}
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-4"
                    className="collapsed"
                  >
                    Comment puis-je effectuer le suivi de mon colis ? <i className="bx bx-chevron-down icon-show" />
                    <i className="bx bx-chevron-up icon-close" />
                  </a>
                  <div
                    id="faq-list-4"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                    Notre système de suivi en ligne vous permet de suivre votre colis en temps réel. Une fois que votre colis est en transit, vous recevrez un numéro de suivi que vous pourrez utiliser sur notre site web pour connaître l'état et l'emplacement actuel de votre envoi.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bx bx-help-circle icon-help" />{" "}
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-5"
                    className="collapsed"
                  >
                    Que se passe-t-il si mon colis est endommagé pendant la livraison ?{" "}
                    <i className="bx bx-chevron-down icon-show" />
                    <i className="bx bx-chevron-up icon-close" />
                  </a>
                  <div
                    id="faq-list-5"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                    Nous prenons toutes les précautions nécessaires pour assurer la sécurité de vos colis. En cas de dommage pendant la livraison, veuillez nous contacter dès que possible. Nous examinerons la situation et travaillerons avec vous pour résoudre le problème de manière satisfaisante.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* End Frequently Asked Questions Section */}
        {/* ======= Contact Section ======= */}
        <section id="contact" ref={contactRef} className="contact">
          <div className="container">
            <div className="section-title">
              <h2>Contact</h2>
              <p>
                N'hésitez pas à nous contacter pour tous vos besoins en matière de livraison 
              </p>
            </div>
            <div className="row">
              <div className="col-lg-5 d-flex align-items-stretch">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt" />
                    <h4>Location:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                  <div className="email">
                    <i className="bi bi-envelope" />
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>
                  <div className="phone">
                    <i className="bi bi-phone" />
                    <h4>Call:</h4>
                    <p>+1 5589 55488 55s</p>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                    frameBorder={0}
                    style={{ border: 0, width: "100%", height: 290 }}
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Your Email</label>
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
                    <label htmlFor="name">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      required
                    />
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
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Section */}
        {/* ======= Cta Section ======= */}
        <section id="cta" className="cta">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 text-center text-lg-start">
                <h3>Devenir Un Client</h3>
                <p>
                  {" "}
                  Rejoignez-nous et profitez de nos services de livraison efficaces. Nous veillons à votre satisfaction à chaque livraison.
                </p>
              </div>
              <div className="col-lg-3 cta-btn-container text-center">
                <a className="cta-btn align-middle" ref={contactRef}>Devenir Client</a>
              </div>
            </div>
          </div>
        </section>
        {/* End Cta Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default FrontHome;
