const formData = {
  email: "",
  message: ""
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";
      
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Error parsing saved data:', error);
    }
  }
}

function onFormInput(event) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;
  
  formData[fieldName] = fieldValue;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  
  console.log(formData);
  
  localStorage.removeItem(STORAGE_KEY);
  
  formData.email = "";
  formData.message = "";
  
  form.reset();
}

loadFormData();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);
