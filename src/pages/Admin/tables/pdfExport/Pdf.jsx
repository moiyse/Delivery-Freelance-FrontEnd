import React from 'react';

const Pdf = ({ depart, dest, dateLiv, dateCre, nomDest, phone , clientName , livreurName }) => (
  <div style={{ width: '500px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h2>Facture de livraison</h2>
      <img src="./barcode.png" alt="Logo" style={{ width: '30px',height:'30px' }} />
    </div>
    <br></br> <br></br>
    <table style={{ fontSize: '14px', width: '100%' }}>
      <tr>
        <td style={cellStyle}>Départ:</td>
        <td style={cellStyle}>{depart}</td>
      </tr>
      <tr>
        <td style={cellStyle}>Déstination:</td>
        <td style={cellStyle}>{dest}</td>
      </tr>
      <tr>
        <td style={cellStyle}>Date Livraison:</td>
        <td style={cellStyle}>{dateLiv}</td>
      </tr>
      <tr>
        <td style={cellStyle}>Date de création:</td>
        <td style={cellStyle}>{dateCre}</td>
      </tr>
      <tr>
        <td style={cellStyle}>Nom Destinataire:</td>
        <td style={cellStyle}>{nomDest}</td>
      </tr>
      <tr>
        <td style={cellStyle}>Téléphone Destinataire:</td>
        <td style={cellStyle}>{phone}</td>
      </tr>
      <tr>
        <td style={cellStyle}>Nom du client:</td>
        <td style={cellStyle}>{clientName}</td>
      </tr>
      <tr>
        <td style={cellStyle}>Nom de livreur:</td>
        <td style={cellStyle}>{livreurName}</td>
      </tr>
    </table>
  </div>
);

const cellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ccc',
  borderRight: '1px solid #ccc', // Add right border to left cell
  paddingLeft: '10px', // Padding to move text away from the border
};

export default Pdf;
