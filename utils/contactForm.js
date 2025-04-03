export const useContactForm = () => {
  const form = ref({
    name: "",
    email: "",
    message: "",
  });

  const submitForm = () => {
    console.log("Form submitted:", form.value);
    alert("Thank you!");
    form.value = { name: "", email: "", message: "" };
  };

  return { form, submitForm };
};
