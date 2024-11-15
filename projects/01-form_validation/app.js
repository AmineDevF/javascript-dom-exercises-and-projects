// Récupération des éléments du DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const submitBtn = document.getElementById('submitBtn');

// Désactive le bouton de soumission si tous les champs ne sont pas valides
function toggleSubmitButton() {
  const isFormValid = document.querySelectorAll('.form-control.success').length === 4;
  submitBtn.disabled = !isFormValid;
}

// Affiche un message d'erreur et applique la classe 'error'
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
  toggleSubmitButton(); // Mise à jour du statut du bouton
}

// Affiche une bordure de succès en appliquant la classe 'success'
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  toggleSubmitButton(); // Mise à jour du statut du bouton
}

// Vérifie si l'email est valide
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Vérifie que tous les champs requis sont remplis
function checkRequired(input) {
  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is required`);
  } else {
    showSuccess(input);
  }
}

// Vérifie la longueur du champ (min et max)
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Vérifie si les mots de passe correspondent
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else if(input2.value.trim() !== '') {
    showSuccess(input2); // Si les mots de passe correspondent et le champ n'est pas vide
  }
}

// Retourne le nom du champ avec la première lettre en majuscule
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Ajoute les événements de validation sur le focus et le blur
username.addEventListener('focusout', () => checkLength(username, 3, 15));
email.addEventListener('focusout', () => checkEmail(email));
password.addEventListener('focusout', () => checkLength(password, 6, 25));
password2.addEventListener('focusout', () => checkPasswordsMatch(password, password2));

// Validation finale lors de la soumission du formulaire
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche l'envoi par défaut du formulaire

  checkRequired(username);
  checkRequired(email);
  checkRequired(password);
  checkRequired(password2);

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  // Vérifie si le formulaire est valide avant d'afficher la popup
  if (!submitBtn.disabled) {
    Swal.fire({
      title: 'Registration Successful!',
      text: 'Welcome to our community!',
      icon: 'success',
      confirmButtonText: 'Awesome!'
    });
  }
});
