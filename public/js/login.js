const form = document.querySelector('form');
const accountError = document.querySelector('.account.error');
const passwordError = document.querySelector('.password.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //reset errors
  accountError.textContent = '';
  passwordError.textContent = '';

  //get the values
  const account = form.account.value;
  const password = form.password.value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ account, password }),
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
    }
    if (data.user) {
      if (account === 'admin') {
        location.assign('/admin');
      } else {
        location.assign('/');
      }
    }    
  }
  catch (err) {
    console.log(err);
  }
});
