import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./pdf.css"
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "@app/pages/Admin/tables/UsersService";
import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";

export interface Commande {
  idCommande: number;
  depart: string;
  departVille: string;
  departCite: string;
  destination: string;
  destinationVille: string;
  destinationCite: string;
  paymentStatus: string;
  commandeStatus: string;
  commandeType: string;
  createdAt: string;
  delivredAt: string;
  nomDestinataire: string;
  prenomDestinataire: string;
  phoneDestinataire: string;
  articles: string;
  livreurId: number;
  clientId: number;
  prixArticle: number;
}

type User = {
  idUser: number;
  firstName: string;
  lastName: String;
  email: string;
  phone: string;
  role: string;
  retour: number;
  livraison: number;
  caisse: number
  status: string;
  createdAt: string;
};


const PdfTamplate = () => {
  const [commande, setCommande] = useState<Commande | null>();
  const [client, setClient] = useState<User>();
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation', 'en attente pickup', 'en dépot', 'en cours de livraison', 'reporté','livré', 'annulé']);
  const [valueOfThePaymentStatus, setValueOfThePaymentStatus] = useState<string[]>(['payé', 'nonPayé']);
  const [tableInit, setTableInit] = useState(false);
  const [filterState, setFilterState] = useState(false);

  const location = useLocation();
  const { data } = location.state || {};

  const navigate = useNavigate();



  useEffect(() => {
    if (filteredCommandes.length != 0 && tableInit === false) {
      const script = document.createElement("script");
      script.src = "js/tableCommande.js";
      script.async = true;
      document.body.appendChild(script);
      setTableInit(true);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [filteredCommandes]);

  useEffect(() => {
    setCommande(data)
    getClient()
    setTimeout(() => {
      generatePDF(565.4, 448.5);    
    }, 1500);


  }, [])

  const getClient = async () => {
    const client = await getUserById(data.clientId)
    setClient(client)
  }


  const generatePDF = (pdfWidth:any, pdfHeight:any) => {
    const DATA = document.getElementById('htmlData');
    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight], // Specify the dimensions here
    });
  
    if (DATA) {
      pdf.html(DATA, {
        callback: () => {
          pdf.save('facture.pdf');
        },
      });
    } else {
      console.error("Element with id 'htmlData' not found.");
    }
  };

  const back = () => {
    navigate("/commandes", { state: { data: commande } });

  }

  return (
    <>
      <div className="mt-4" style={{
        width: "1020px",
        margin: "0px auto"
      }} >
        <div style={{
          cursor: "pointer", color: "#066181",
          fontSize: "17px",
          fontWeight: "600"
        }} onClick={() => { back() }}>
          <i className="fas fa-long-arrow-alt-left"></i> Retourner
        </div>
        <div style={{
          width: "57%",
          margin: "50px auto",

        }}>
          <div className="mx-2" id="htmlData">
            <div className="d-flex justify-content-between mx-4">
              <div className="justify-content-left">
                <h1>FASTO</h1>
              </div>
              <div className="justify-content-right mt-2">
              <div className="d-flex align-items-center"><h6>Date de creation : {commande?.createdAt}</h6></div>
              <div className="d-flex align-items-center"><h6>Date de livraison : {commande?.delivredAt}</h6></div>
                <h6>client :{client?.lastName + " " + client?.firstName}</h6>
              </div>
            </div>
            <table className="pdfTable">
              <tr>
                <th>FASTO</th>
                <th><img src="./barcode.png" alt="Logo" style={{ width: '30px',height:'30px' }} /></th>
              </tr>
              <tr>
                <td><strong>Destinateur</strong><br />{commande?.nomDestinataire + " " + commande?.prenomDestinataire}</td>
                <td><strong>Téléphone</strong> <br />{commande?.phoneDestinataire}</td>
              </tr>
              <tr>
                <td><strong>Départ ville / localité</strong> <br /> {commande?.departVille + " / " + commande?.departCite}</td>
                <td><strong>Départ address</strong> <br /> {commande?.depart}</td>
              </tr>
              <tr>
                <td><strong>Destination ville / localité</strong> <br /> {commande?.destinationVille + " / " + commande?.destinationCite}</td>
                <td><strong>Déstination address</strong> <br /> {commande?.destination}</td>
              </tr>
              <tr>
                <td><strong>Date de création</strong> <br /> {commande?.createdAt}</td>
                <td><strong>Date de livraison</strong> <br /> {commande?.delivredAt}</td>
              </tr>
              <tr>
                <td><strong>Prix article</strong> <br /> {commande?.prixArticle + " DT"}</td>
                <td><strong>Client</strong> <br /> {client?.lastName + " " + client?.firstName}</td>
              </tr>
            </table>
          </div>
        </div>

      </div>

    </>
  );
}

export default PdfTamplate;