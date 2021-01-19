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

class Citas {
	constructor() {
		this.citas = [];
	}
	agregarCita(cita) {
		this.citas = [...this.citas, cita];
		console.log(this.citas);
	}
}

class UI {
	imprimirAlerta(mensaje, tipo) {
		const divMensaje = document.createElement('div');
		divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
		// clase por tipo de error
		if (tipo === 'error') {
			divMensaje.classList.add('alert-danger');
		} else {
			divMensaje.classList.add('alert-success');
		}
		divMensaje.textContent = mensaje;
		document
			.querySelector('#contenido')
			.insertBefore(divMensaje, document.querySelector('.agregar-cita'));

		setTimeout(() => {
			divMensaje.remove();
		}, 3000);
	}
	imprimirCitas({ citas }) {
		this.limpiarHTML();

		citas.forEach((cita) => {
			const {
				mascota,
				propietario,
				telefono,
				fecha,
				hora,
				sintomas,
				id,
			} = cita;

			const divCita = document.createElement('div');
			divCita.classList.add('cita', 'p-3');
			divCita.dataset.id = id;
			// scripting de la cita
			const mascotaParrafo = document.createElement('h2');
			mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
			mascotaParrafo.textContent = mascota;

			const propietarioParrafo = document.createElement('p');
			propietarioParrafo.innerHTML = `<span class='font-weight-bolder'>Propietario </span>${propietario}`;

			const telefonoParrafo = document.createElement('p');
			telefonoParrafo.innerHTML = `<span class='font-weight-bolder'>Telefono </span>${telefono}`;

			const fechaParrafo = document.createElement('p');
			fechaParrafo.innerHTML = `<span class='font-weight-bolder'>Fecha </span>${fecha}`;

			const horaParrafo = document.createElement('p');
			horaParrafo.innerHTML = `<span class='font-weight-bolder'>Hora </span>${hora}`;

			const sintomasParrafo = document.createElement('p');
			sintomasParrafo.innerHTML = `<span class='font-weight-bolder'>Sintomas </span>${sintomas}`;

			divCita.appendChild(mascotaParrafo);
			divCita.appendChild(propietarioParrafo);
			divCita.appendChild(telefonoParrafo);
			divCita.appendChild(fechaParrafo);
			divCita.appendChild(horaParrafo);
			divCita.appendChild(sintomasParrafo);
			contenedorCitas.appendChild(divCita);
		});
	}

	limpiarHTML() {
		while (contenedorCitas.firstChild) {
			contenedorCitas.removeChild(contenedorCitas.firstChild);
		}
	}
}

const administrarCitas = new Citas();
const ui = new UI();

// registro eventos
eventListeners();
function eventListeners() {
	mascotaInput.addEventListener('change', datosCita);
	propietarioInput.addEventListener('change', datosCita);
	telefonoInput.addEventListener('change', datosCita);
	fechaInput.addEventListener('change', datosCita);
	horaInput.addEventListener('change', datosCita);
	sintomasInput.addEventListener('change', datosCita);

	formulario.addEventListener('submit', nuevaCita);
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
}
// valida y agrega nueva cita
function nuevaCita(e) {
	e.preventDefault();
	const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
	if (
		mascota === '' ||
		propietario === '' ||
		telefono === '' ||
		fecha === '' ||
		hora === '' ||
		sintomas === ''
	) {
		ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
		return;
	}
	// crear nueva cita
	// generar id
	citaObj.id = Date.now();
	// creando nueva cita
	administrarCitas.agregarCita({ ...citaObj });

	reiniciarObjeto();

	formulario.reset();
	//mostrar el HTML
	ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
	citaObj.mascota = '';
	citaObj.propietario = '';
	citaObj.telefono = '';
	citaObj.fecha = '';
	citaObj.hora = '';
	citaObj.sintomas = '';
}
