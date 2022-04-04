const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');
const respuesta = document.querySelector('#respuesta');

const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect', () => {
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})

socket.on('send-message', (payload) => {
    console.log(payload)
    respuesta.innerHTML += '<br> Anonymous: ' + payload.mensaje
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    socket.emit('send-message', payload, (id) => {
        console.log('Desde el server', id);
        respuesta.innerHTML += '<br> Tu: ' + payload.mensaje
    });
})