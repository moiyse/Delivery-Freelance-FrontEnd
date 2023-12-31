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
        targets: [-1], /* column index */
        orderable: false /* true or false */,
      },
    ],
  });

  // Set a minimum width for the DataTable container
  $("#userTable_wrapper").css("min-width", "300px");
});
