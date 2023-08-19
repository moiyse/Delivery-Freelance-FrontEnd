$(function () {
    $("#example1").DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      bDestroy: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 8 },
        { responsivePriority: 1, targets: 2 },
        { responsivePriority: 1, targets: 5 },
        { responsivePriority: 1, targets: 9 },
        {
          targets: [-1] /* column index */,
          orderable: false /* true or false */,
        },
      ],
    });
    $("#example1_wrapper").css("min-width", "700px");

    $("#commandeTableClient").DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      bDestroy: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 1, targets: 2 },
        { responsivePriority: 1, targets: 5 },
        { responsivePriority: 1, targets: 7 },
        { responsivePriority: 1, targets: 8 },
        {
          targets: [-1] /* column index */,
          orderable: false /* true or false */,
        },
      ],
    });
    $("#commandeTableClient_wrapper").css("min-width", "700px");
});
  