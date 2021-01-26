import Citas from './clases/Citas.js';
import UI from './clases/UI.js';
import {
	mascotaInput,
	propietarioInput,
	telefonoInput,
	fechaInput,
	horaInput,
	sintomasInput,
	formulario,
} from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI();

let editando;

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
export function datosCita(e) {
	citaObj[e.target.name] = e.target.value;
}

// valida y agrega nueva cita
export function nuevaCita(e) {
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
		ui.imprimirAlerta('Editado correctamente');
		//pasar el objeto de la cita
		administrarCitas.editarCita({ ...citaObj });
		// regresa el boton a su estado orginal
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

export function reiniciarObjeto() {
	citaObj.mascota = '';
	citaObj.propietario = '';
	citaObj.telefono = '';
	citaObj.fecha = '';
	citaObj.hora = '';
	citaObj.sintomas = '';
}
export function eliminarCita(id) {
	// eliminar la cita
	administrarCitas.eliminarCita(id);
	// mensaje
	ui.imprimirAlerta('La cita se elimino correctamente');
	//refresque
	ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
	const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

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
