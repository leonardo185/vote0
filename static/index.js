document.addEventListener('DOMContentLoaded', ()=>{

  //Connect to the WebSocket.
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  //When conneced configure buttons.
  socket.on('connect', () => {
      //Each button should emit a "submit vote" event.
      document.querySelectorAll('button').forEach(button =>{
        button.onclick = () => {
          const selection = button.dataset.vote;
          socket.emit('submit vote', {'selection':selection});
        };
      });
  });


  //When a new vote is announced from the server add to the unoredered list.
  socket.on('announce vote', data => {
    //create a list and display the votes.
    const li = document.createElement('li');
    li.innerHTML = `Vote recorded: ${data.selection}`;
    document.querySelector('#votes').append(li);
  });
});
