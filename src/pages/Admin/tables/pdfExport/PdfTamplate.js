export const template=(depart,dest,dateLiv,dateCre,nomDest,phone)=>`
<div style="width:500px">
<table style="font-size:10px">
<tr>
  <td>Depart:</td>
  <td>${depart}</td>
</tr>
<tr>
  <td>Destination:</td>
  <td>  ${dest}</td>
</tr>
<tr>
  <td>Date Livraison:</td>
  <td>${dateLiv}</td>
</tr>
<tr>
  <td>Nom Destinateur:</td>
  <td>${nomDest}</td>
</tr>
<tr>
  <td>Téléphone:</td>
  <td>${phone}</td>
</tr>
</table>
</div>
`;