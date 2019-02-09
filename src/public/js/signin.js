const signinForm = document.getElementById('signin-form');
const errorText = document.getElementById('signin-error');
const switchLink = document.getElementById('switch-link');

const path = window.location.pathname;
const params = Url.getParams(window.location.href);
const callbackUrl = params['redirect'];
const clientId = params['clientId'];

function processResult(error, result, log){
  if( error ) {
    // Show the error
    errorText.innerHTML = error;
  }
  else if( result && result.token && callbackUrl ){
    // Redirect to the callbackUrl with the token
    window.location.href = Url.build(callbackUrl, {token: result.token});
  }
  else {
    // Redirect to the home screen
    window.location.href = "/";
  }
}

signinForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const body = {
    'email': signinForm.email.value,
    'password': signinForm.password.value
  };

  if( clientId ) {
    body['clientId'] = clientId;
  }

  switch( path ) {
    case '/login':
      AuthRequests.login(body, (error, result, log) => { processResult(error, result, log); });
      break;
    case '/signup':
      if( signinForm.password.value != signinForm.confirm.value ) {
        errorText.innerHTML = "Passwords do not match";
      } else {
        AuthRequests.signup(body, (error, result, log) => { processResult(error, result, log); });
      }
      break;
    default:
      errorText.innerHTML = "Path is invalid";
  }
});

switchLink.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = Url.build(switchLink.href, params);
});
