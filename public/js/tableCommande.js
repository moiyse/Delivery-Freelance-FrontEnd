$(function () {
    $("#example1").DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      bDestroy: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 1, targets: 7 },
        { responsivePriority: 1, targets: 8 },
        { responsivePriority: 1, targets: 9 },
        { responsivePriority: 1, targets: 10 },
        {
          targets: [-1] /* column index */,
          orderable: false /* true or false */,
        },
      ],
    });
    $("#example1_wrapper").css("min-width", "1000px");

    $("#commandeTableClient").DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      bDestroy: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 1, targets: 2 },
        { responsivePriority: 1, targets: 6 },
        { responsivePriority: 1, targets: 7 },
        { responsivePriority: 1, targets: 8 },
        {
          targets: [-1] /* column index */,
          orderable: false /* true or false */,
        },
      ],
    });
    $("#commandeTableClient_wrapper").css("min-width", "700px");

    $("#commandeTableLivreur").DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      bDestroy: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 1, targets: 3 },
        { responsivePriority: 1, targets: 6 },
        { responsivePriority: 1, targets: 7 },
        {
          targets: [-1] /* column index */,
          orderable: false /* true or false */,
        },
      ],
    });
    $("#commandeTableLivreur_wrapper").css("min-width", "700px");

    $("#commandeDemander").DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      bDestroy: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 1, targets: 3 },
        {
          targets: [-1] /* column index */,
          orderable: false /* true or false */,
        },
      ],
    });
    $("#commandeDemander_wrapper").css("min-width", "700px");
});
  