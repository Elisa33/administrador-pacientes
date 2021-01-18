// campos formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// ui
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// registro eventos
eventListeners();
function eventListeners() {
	mascotaInput.addEventListener('change', datosCita);
	propietarioInput.addEventListener('change', datosCita);
	telefonoInput.addEventListener('change', datosCita);
	fechaInput.addEventListener('change', datosCita);
	horaInput.addEventListener('change', datosCita);
	sintomasInput.addEventListener('change', datosCita);
}

// objeto con la informacion de la cita
const citaObj = {
	mascota: '',
	propietario: '',
	telefono: '',
	fecha: '',
	hora: '',
	sintomas: '',
};

// agrega los datos a la cita
function datosCita(e) {
	citaObj[e.target.name] = e.target.value;
	console.log(citaObj);
}
