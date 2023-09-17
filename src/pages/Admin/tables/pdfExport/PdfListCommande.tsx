import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./pdfCommande.css"
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllClients, fetchAllLivreurs, getUserById } from "@app/pages/Admin/tables/UsersService";
import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";
import { fetchCommandes } from "../CommandesService";

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


const PdfListCommande = () => {
    const [commandes, setCommandes] = useState<Commande[]>([]);
    const [livreurs, setLivreurs] = useState<User[]>([]);
    const [clients, setClients] = useState<User[]>([])

    const [commande, setCommande] = useState<Commande | null>();
    const [client, setClient] = useState<User>();
    const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(
        null
    );
    const [openDialog, setOpenDialog] = useState(false);
    const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
    const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation', 'en attente pickup', 'en dépot', 'en cours de livraison', 'reporté', 'livré', 'annulé']);
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
        getAllCommande();
        getAllLivreur();
        getAllClient()
        setCommande(data)
        getClient()
        setTimeout(() => {
            generatePDF(1966, 3338);
        }, 1500);

    }, [])


    const getAllCommande = async () => {
        const data = await fetchCommandes();
        setCommandes(data);
        setFilteredCommandes(data);
    };

    const getAllLivreur = async () => {
        const data = await fetchAllLivreurs();
        setLivreurs(data);
    };
    const getAllClient = async () => {
        const data = await fetchAllClients()
        setClients(data)
    }

    const getClient = async () => {
        const client = await getUserById(data.clientId)
        setClient(client)
    }


    const generatePDF = (pdfWidth: any, pdfHeight: any) => {
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

    const getClientFirstName = (clientId: number) => {
        const client = clients.find((client) => client.idUser === clientId);
        return client ? client.firstName + " " + client.lastName : "client inconnu";
    };

    const getLivreurFirstName = (livreurId: number) => {
        const livreur = livreurs.find((livreur) => livreur.idUser === livreurId);
        return livreur ? livreur.firstName + " " + livreur.lastName : "Livreur inconnu";
    };

    return (
        <>
            <div className="mt-4" style={{
                width: "width: 195%;",
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
                    width: "129%",

                }}>
                    <div className="mx-2 my-3" id="htmlData">
                        <div className="d-flex align-items-center justify-content-between mx-4">
                            <div className="justify-content-left">
                                <h1>FASTO</h1>
                            </div>
                            <div className="justify-content-right mt-2">
                                <div className="d-flex align-items-center"><h6>Date d'impression : {currentDate}</h6></div>
                            </div>
                        </div>
                        <table className="tablePdfCommande" style={{ width: '100%' }}>
                            <tbody><tr>
                                <th>Client</th>
                                <th>Collis</th>
                                <th>Date de livraison</th>
                                <th>Déstinateur</th>
                                <th>Déstination Addresse</th>
                                <th>Déstination</th>
                                <th>Départ Addresse</th>
                                <th>Départ</th>
                                <th>Prix</th>
                                <th>Téléphone Déstinateur</th>
                                <th>Status Commande</th>
                                <th>Status Paiement</th>
                                <th>Livreur</th>
                            </tr>
                                {filteredCommandes.length === 0 ? (
                                    <tr>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                        <td className="text-center">Pas de commande</td>
                                    </tr>
                                ) : (
                                    filteredCommandes.map((commande) => {
                                        return (
                                            <tr>
                                                <td>{getClientFirstName(commande.clientId)}</td>
                                                <td>

                                                    {commande.articles
                                                        .split("-")
                                                        .map((article, index) => (
                                                            <a key={index}>
                                                                {article} <br/>
                                                            </a>
                                                        ))}
                                                </td>
                                                <td>{commande.delivredAt}</td>
                                                <td>{commande.nomDestinataire + " - " + commande.prenomDestinataire}</td>
                                                <td>{commande.destination}</td>
                                                <td>{commande.destinationVille + " / "+commande.destinationCite}</td>
                                                <td>{commande.depart}</td>
                                                <td>{commande.departVille + " / "+commande.departCite}</td>
                                                <td>{commande.prixArticle + " DT"}</td>
                                                <td>{commande.phoneDestinataire}</td>
                                                <td>
                                                    {commande.commandeStatus}
                                                </td>
                                                <td>
                                                    {commande.paymentStatus}
                                                </td>
                                                <td>
                                                    {commande.livreurId
                                                        ? (
                                                            <>{getLivreurFirstName(commande.livreurId)}</>
                                                        )
                                                        : (
                                                            <>Pas de Livreur</>)
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }))}
                            </tbody></table>

                    </div>
                </div>

            </div>

        </>
    );
}

export default PdfListCommande;