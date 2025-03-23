const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

function validasiForm(nama, email, password) {
  const errors = [];
  if (nama.trim().length < 4) errors.push("Nama harus lebih dari 3 karakter");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.trim())) errors.push("Email tidak valid");
  if (password.length < 8) errors.push("Password minimal 8 karakter");
  return errors;
}

submitBtn.addEventListener("click", () => {
  const errors = validasiForm(nameInput.value, emailInput.value, passInput.value);
  if (errors.length > 0) {
    result.innerHTML = errors.map(e => `<p class="error">${e}</p>`).join("");
  } else {
    result.innerHTML = `<p class="success">Semua input valid!</p>`;
  }
});
