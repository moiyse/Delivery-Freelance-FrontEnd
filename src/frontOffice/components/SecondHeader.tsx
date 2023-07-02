import { useEffect } from "react";



const SecondHeader = () => {

    useEffect(() => {
        const headerScrolled = () => {
          const header = document.querySelector('#header');
          if (header && window.scrollY > 100) {
            header.classList.add('header-scrolled');
          } else if (header) {
            header.classList.remove('header-scrolled');
          }
        };
    
        window.addEventListener('load', headerScrolled);
        window.addEventListener('scroll', headerScrolled);
    
        return () => {
          window.removeEventListener('load', headerScrolled);
          window.removeEventListener('scroll', headerScrolled);
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
          <nav id="navbar" className="navbar">
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
                <a className="nav-link scrollto" href="#contact">
                  Devenir Client
                </a>
              </li>
              <li>
                <a className="getstarted scrollto" href="#about">
                  Se Connecter
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>
          {/* .navbar */}
        </div>
      </header>
      {/* End Header */}
    </>
  );
};

export default SecondHeader;
