const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
        console.log('here')
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_name:username, password:password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

  