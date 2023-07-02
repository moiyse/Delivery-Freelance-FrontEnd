$(function () {
    $("#example1").DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 1, targets: 2 },
        { responsivePriority: 1, targets: -1 },
        { responsivePriority: 2, targets: 6 },
        { responsivePriority: 2, targets: 7 },
        { responsivePriority: 3, targets: 5 },
        {
          targets: [8] /* column index */,
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
  