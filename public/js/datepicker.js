document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#checkin", {
      dateFormat: "Y-m-d",
      minDate: "today",
      allowInput: false,
    });
  });