$(function () {
    $("#example1").DataTable({
      responsive: false,
      lengthChange: false,
      info: false,
      autoWidth: false,
      bDestroy: true,
      language: {
        emptyTable: " ",
      },
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
});
  