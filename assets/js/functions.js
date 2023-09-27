import { 
    ownerInput, 
    petInput, 
    phoneInput, 
    dateAppointmentInput, 
    hourAppointmentInput, 
    symptomsInput, 
    formAppointment 
} from './selectors.js';

import UI from './class/UI.js';
import Appointment from './class/Appointment.js';

const ui = new UI();
const appointmentManager = new Appointment;
let editing = false;

const appointmentObj = {
    owner: '',
    pet: '',
    phone: '',
    dateAppointment: '',
    hourAppointment: '',
    symptoms: '',
}

export function dataAppoinment(e) {
    appointmentObj[e.target.name] = e.target.value;
}

export function validateForm(e) {
    e.preventDefault();
    const { owner, pet, phone, dateAppointment, hourAppointment, symptoms } = appointmentObj;
    
    if (owner === '' || pet === '' || phone === '' || dateAppointment === '' || hourAppointment === '' || symptoms === '') {
        ui.showAlert('Todos los campos son requeridos', 'error', '#error-alert');
        return;
    }

    if (editing) {
        appointmentManager.editAppointment({ ...appointmentObj });
        ui.showAlert('La cita se edito exitosamente', 'success', '#error-alert-appo');
        formAppointment.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editing = false;
    } else {
        appointmentObj.id = Date.now();
        appointmentManager.addAppointment({ ...appointmentObj });
        ui.showAlert('La cita se agrego exitosamente', 'success', '#error-alert-appo');
    }

    const { appointments } = appointmentManager;
    ui.printAppointment(appointments);

    resetObject();

    formAppointment.reset();

}

//storage
export function showAppointmenst() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    ui.printAppointment(appointments);
}

//delete apintment
export function deleteAppointment(id) {
    appointmentManager.deleteAppointment(id);
    const { appointments } = appointmentManager;
    ui.printAppointment(appointments);
    ui.showAlert('La cita fue eliminada correctamente', 'success', '#error-alert-appo');
}

//reset form
function resetObject() {
    appointmentObj.owner = '';
    appointmentObj.pet = '';
    appointmentObj.phone = '';
    appointmentObj.dateAppointment = '';
    appointmentObj.hourAppointment = '';
    appointmentObj.symptoms = '';
}

//load edition
export function loadEdition(appointment) {
    const { owner, pet, phone, dateAppointment, hourAppointment, symptoms, id } = appointment;
    
    //reset object
    appointmentObj.owner = owner;
    appointmentObj.pet = pet;
    appointmentObj.phone = phone;
    appointmentObj.dateAppointment = dateAppointment;
    appointmentObj.hourAppointment = hourAppointment;
    appointmentObj.symptoms = symptoms;
    appointmentObj.id = id;

    //fill fileds
    ownerInput.value = owner;
    petInput.value = pet;
    phoneInput.value = phone;
    dateAppointmentInput.value = dateAppointment;
    hourAppointmentInput.value = hourAppointment;
    symptomsInput.value = symptoms;

    formAppointment.querySelector('button[type="submit"]').textContent = 'Editar Cita';
    editing = true;
}

export function cancelEdition() {
    resetObject();
    //fill fileds
    ownerInput.value = '';
    petInput.value = '';
    phoneInput.value = '';
    dateAppointmentInput.value = '';
    hourAppointmentInput.value = '';
    symptomsInput.value = '';

    appointmentObj.id = ''

    formAppointment.querySelector('button[type="submit"]').textContent = 'Crear Cita';

    editing = false;
}

export function validateDate() {
    dateAppointmentInput.addEventListener('input', e => {
        const dia = new Date(e.target.value).getUTCDay();
        if(dia === 0) {
            e.target.value = '';
            ui.showAlert('Los domingos no atendemos', 'error', '#error-alert');
            return;
        }
    });
}

export function currentDate() {
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth()+1;
    const year = newDate.getFullYear();
    
    const newMonth = (month < 10) ? `0${month}` : month
    const formatDate = year + '-' + newMonth + '-' + day;
    dateAppointmentInput.min = formatDate;
}

export function validateHours() {
    hourAppointmentInput.addEventListener('input', e => {
        const hourAppointmet = e.target.value;
        const hour = hourAppointmet.split(":")[0];
        if(hour < 8 || hour > 18) {
            e.target.value = '';
            ui.showAlert('La hora seleccionada no es válida', 'error', '#error-alert');
            return;
        }
    });
}

export function validatePhone() {
    const regPhone = /^[09][0-9]{9,10}$/;
    phoneInput.addEventListener("change", e => {
        if(!regPhone.test(e.target.value)) {
            ui.showAlert('El número de teléfono no es válido', 'error', '#error-alert');
            return;
        }
    });
}
