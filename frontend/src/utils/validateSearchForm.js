export function validateForm(formData) {
  const errors = {};
  let flag = true;
  // Validate 'From' field
  if (!formData.from.trim()) {
    errors.from = "Please enter the departure city.";
    flag = false;
  }

  // Validate 'To' field
  if (!formData.to.trim()) {
    errors.to = "Please enter the destination city.";
    flag = false;
  }

  // Validate if 'From' and 'To' are the same
  if (
    formData.from.trim() &&
    formData.to.trim() &&
    formData.from === formData.to
  ) {
    errors.to =
      "The destination city must be different from the departure city.";
    flag = false;
  }
  if (!formData.isoDate) {
    errors.date = "Please select a travel date.";
    flag = false;
  }

  return flag;
}
