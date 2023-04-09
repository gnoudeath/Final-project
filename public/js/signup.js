const form = document.querySelector('form');
const accountError = document.querySelector('.account.error');
const passwordError = document.querySelector('.password.error');
const emailError = document.querySelector('.email.error');
const phoneError = document.querySelector('.phone.error');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //reset errors
  accountError.textContent = '';
  passwordError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';

  //get the values
  const account = form.account.value;
  const password = form.password.value;
  const userName = form.userName.value;
  const email = form.email.value;
  const phone = form.phone.value;

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ account, password, userName, email, phone }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      if (data.errors.account) {
        accountError.textContent = data.errors.account;
      }
      if (data.errors.password) {
        passwordError.textContent = data.errors.password;
      }
      if (data.errors.email) {
        emailError.textContent = data.errors.email;
      }
      if (data.errors.phone) {
        phoneError.textContent = data.errors.phone;
      }
    }
    if (data.user) {
      location.assign('/');
    } 
  }
  catch (err) {
    console.log(err);
  }
});


