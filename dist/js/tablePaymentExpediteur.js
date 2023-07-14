$(function () {
    $("#example1").DataTable({
      responsive: true,
      lengthChange: false,
      info: false,
      autoWidth: false,
      language: {
        emptyTable: " ",
      },
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 1 },
        {
          targets: [5] /* column index */,
          orderable: false /* true or false */,
        },
      ],
    });
    $("#example2").DataTable({
      paging: true,
      lengthChange: false,
      searching: false,
      ordering: true,
      info: true,
      autoWidth: false,
      responsive: true,
    });
  });
  