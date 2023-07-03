import { useEffect } from "react";
import { Link } from "react-router-dom";


const Header = () => {

  useEffect(() => {
    const handleHeaderScroll = () => {
      const header = document.querySelector('#header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }
    };
  
    const handleNavToggle = () => {
      document.querySelector('#navbar')?.classList.toggle('navbar-mobile');
      document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-list');
      document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-x');
    };
  
    const handleDropdownActivate = (e: any) => {
      const navbar = document.querySelector('#navbar');
      if (navbar?.classList.contains('navbar-mobile')) {
        e.preventDefault();
        (e.target as HTMLElement).nextElementSibling?.classList.toggle('dropdown-active');
      }
    };
  
    const handleScrollTo = (e: any) => {
      const hash = e.target.hash;
      if (document.querySelector(hash)) {
        e.preventDefault();
  
        const navbar = document.querySelector('#navbar');
        if (navbar?.classList.contains('navbar-mobile')) {
          navbar?.classList.remove('navbar-mobile');
          document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-list');
          document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-x');
        }
  
        scrollTo(hash);
      }
    };
  
    window.addEventListener('load', handleHeaderScroll);
    document.addEventListener('scroll', handleHeaderScroll);
    document.addEventListener('click', (e) => {
      if ((e.target as Element)?.matches('.mobile-nav-toggle')) {
        handleNavToggle();
      }
  
      if ((e.target as Element)?.matches('.navbar .dropdown > a')) {
        handleDropdownActivate(e);
      }
  
      if ((e.target as Element)?.matches('.scrollto')) {
        handleScrollTo(e);
      }
    });
  
    return () => {
      window.removeEventListener('load', handleHeaderScroll);
      document.removeEventListener('scroll', handleHeaderScroll);
      document.removeEventListener('click', handleNavToggle);
      document.removeEventListener('click', handleDropdownActivate);
      document.removeEventListener('click', handleScrollTo);
    };
  }, []);


  return (
    <>
      <header id="header" className="fixed-top ">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <a href="index.html">Delivery</a>
          </h1>
          {/* Uncomment below if you prefer to use an image logo */}
          {/* <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
          <nav style={{padding:"0"}} id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Accueil
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  Qui Somme Nous
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Nos Services
                </a>
              </li>
              <li>
                  <a className="nav-link scrollto">
                    <Link style={{padding:"0"}} to="register">
                    Devenir Client
                    </Link>
                  </a>
              </li>
              <li>
                <a className="getstarted scrollto">
                <Link style={{padding:"0"}} to="/login">
                  Se Connecter
                </Link>
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>
          {/* .navbar */}
        </div>
      </header>
      {/* End Header */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          {/*<img data-aos="zoom-in" data-aos-delay="200" src="" class="bus-img img-fluid animated" alt="">*/}
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <h1>
                Faites confiance à notre service de livraison
              </h1>
              <h2>
                Nous nous spécialisons dans une livraison sécurisée et rapide de vos colis, en veillant au succès de votre entreprise.
              </h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="#about" className="btn-get-started scrollto">
                  Commencer
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay={200}
            >
              <img
                data-aos="zoom-in"
                data-aos-delay={200}
                src="assets/img/355883417_780777890376276_509635892871197134_n.png"
                className="bus-img img-fluid animated"
                alt="bus-img"
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Hero */}
    </>
  );
};

export default Header;
