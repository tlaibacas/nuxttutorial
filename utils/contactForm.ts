import { ref } from "vue";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const useContactForm = () => {
  const form = ref<ContactForm>({
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
