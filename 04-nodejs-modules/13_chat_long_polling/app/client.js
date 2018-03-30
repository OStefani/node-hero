const publish = document.getElementById('publish');
publish.addEventListener('click', () => {
    //const par = document.createElement('p');
    //const body = document.getElementsByTagName('body');
    //body[0].appendChild(par);
    const message = document.getElementsByName('message');
    console.log(message[0].value);
    //par.innerHTML = message[0].value;
    //message[0].value = '';

    messageBody = message[0].value;
    console.log('messageBody: ', messageBody)
    fetch('/publish', {method: 'POST', body: messageBody})
        .then(response => {
            message[0].value = '';
            return response.txt();
        }).then(response => {
            console.log('response2: ', response);    
            return;
        }).catch((err) => { console.log(err)});
    
});

subscribe();
  function subscribe() {
      fetch('/subscribe').then(response => {
          console.log('subscribe: ', response.responseText);
          return response.json();
      }).then(response => {
          console.log(response);
      }).catch(err => console.log(err));
  }