document.addEventListener("DOMContentLoaded", function () {
  const checkin = flatpickr("#checkin", {
    dateFormat: "Y-m-d",
    minDate: "today",
    allowInput: false,
    onChange: function (selectedDates, dateStr, instance) {
      // Update checkout's minDate when a checkin date is selected
      if (selectedDates.length > 0) {
        checkout.set("minDate", selectedDates[0]);
      }
    },
  });

  const checkout = flatpickr("#checkout", {
    dateFormat: "Y-m-d",
    minDate: "today",
    allowInput: false,
  });
});
