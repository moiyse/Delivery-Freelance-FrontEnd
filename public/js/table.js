$(function () {
  $("#userTable").DataTable({
    responsive: true,
    lengthChange: false,
    autoWidth: false,
    bDestroy: true,
    columnDefs: [
      { responsivePriority: 1, targets: 0 },
      { responsivePriority: 1, targets: -1 },
      {
        targets: [-1] /* column index */,
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
