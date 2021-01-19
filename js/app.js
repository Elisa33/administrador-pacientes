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

let editando;

class Citas {
	constructor() {
		this.citas = [];
	}
	agregarCita(cita) {
		this.citas = [...this.citas, cita];
	}
	eliminarCita(id) {
		this.citas = this.citas.filter((cita) => cita.id !== cita.id);
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

			// boton eliminar
			const btnEliminar = document.createElement('button');
			btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
			btnEliminar.innerHTML = `Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

			btnEliminar.onclick = () => eliminarCita(id);

			// Añade boton para editar
			const btnEditar = document.createElement('button');
			btnEditar.classList.add('btn', 'btn-info');
			btnEditar.innerHTML = `Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;

			btnEditar.onclick = () => cargarEdicion(cita);

			divCita.appendChild(mascotaParrafo);
			divCita.appendChild(propietarioParrafo);
			divCita.appendChild(telefonoParrafo);
			divCita.appendChild(fechaParrafo);
			divCita.appendChild(horaParrafo);
			divCita.appendChild(sintomasParrafo);
			divCita.appendChild(btnEliminar);
			divCita.appendChild(btnEditar);
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
	if (editando) {
		ui.imprimirAlerta('Se agregó correctamente');
		//pasar el objeto de la cita
		formulario.querySelector('button[type="submit"]').textContent =
			'Crear Cita';
		editando = false;
	} else {
		// generar id
		citaObj.id = Date.now();
		// creando nueva cita
		administrarCitas.agregarCita({ ...citaObj });
		//mensaje
		ui.imprimirAlerta('Se agregó correctamente');
	}

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
function eliminarCita(id) {
	// eliminar la cita
	administrarCitas.eliminarCita(id);
	// mensaje
	ui.imprimirAlerta('La cita se elimino correctamente');
	//refresque
	ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
	const { mascota, propietario, telefono, fecha, hora, sintomas } = cita;

	// llenar inputs
	mascotaInput.value = mascota;
	propietarioInput.value = propietario;
	telefonoInput.value = telefono;
	fechaInput.value = fecha;
	horaInput.value = hora;
	sintomasInput.value = sintomas;

	// llenar el objeto
	citaObj.mascota = mascota;
	citaObj.propietario = propietario;
	citaObj.telefono = telefono;
	citaObj.fecha = fecha;
	citaObj.hora = hora;
	citaObj.sintomas = sintomas;
	citaObj.id = id;

	//cambiar texto del boton
	formulario.querySelector('button[type="submit"]').textContent =
		'Guardar Cambios';
	editando = true;
}
