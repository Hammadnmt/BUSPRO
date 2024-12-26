export function validateForm(formData) {
  const errors = {};

  // Validate 'From' field
  if (!formData.from.trim()) {
    errors.from = "Please enter the departure city.";
  }

  // Validate 'To' field
  if (!formData.to.trim()) {
    errors.to = "Please enter the destination city.";
  }

  // Validate if 'From' and 'To' are the same
  if (
    formData.from.trim() &&
    formData.to.trim() &&
    formData.from === formData.to
  ) {
    errors.to =
      "The destination city must be different from the departure city.";
  }

  // Validate 'Date' field
  const selectedDate = new Date(formData.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day for comparison
  if (!formData.date) {
    errors.date = "Please select a travel date.";
  } else if (selectedDate < today) {
    errors.date =
      "Travel date cannot be in the past. Please select a valid date.";
  }

  return errors;
}
