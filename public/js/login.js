const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
 e.preventDefault();

  //get the values
  const account = form.account.value;
  const password = form.password.value;

  console.log(account, password);
})
