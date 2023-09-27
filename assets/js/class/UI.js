import { containerAppointment } from '../selectors.js';
import { deleteAppointment, loadEdition, cancelEdition } from '../functions.js';

class UI {

    showAlert(message, type, reference) {
        const errorAlert = document.querySelector('.alert');
        if(errorAlert) {
            errorAlert.remove();
        }
        const divAlert = document.createElement('div');
        divAlert.classList.add('alert', type);
        divAlert.textContent = message;

        document.querySelector(`${reference}`).appendChild(divAlert);
        setTimeout(() => {
            divAlert.remove();
        }, 5000);
    }

    printAppointment( appointments ) {
        this.cleanHtml();
        appointments.forEach(appointment => {
            const { owner, pet, phone, dateAppointment, hourAppointment, symptoms, id } = appointment;

            //content appointmnets
            const contentAppointmet = document.createElement('div');
            contentAppointmet.classList.add('con-appointment');

            //title
            const headingPet = document.createElement('h3');
            headingPet.classList.add('heading-pet');
            headingPet.textContent = `${pet}:`;

            //owner
            const parragraphOwner = document.createElement('p');
            parragraphOwner.classList.add('parragraph');
            parragraphOwner.textContent = 'Propietario/a: ';

            const ownerSpan = document.createElement('span');
            ownerSpan.textContent = owner;

            parragraphOwner.appendChild(ownerSpan);

            //phone
            const parragraphPhone = document.createElement('p');
            parragraphPhone.classList.add('parragraph');
            parragraphPhone.textContent = 'Teléfono: ';

            const phoneSpan = document.createElement('span');
            phoneSpan.textContent = phone;

            parragraphPhone.appendChild(phoneSpan);

            //date
            const parragraphDate = document.createElement('p');
            parragraphDate.classList.add('parragraph');
            parragraphDate.textContent = 'Fecha: ';

            const dateSpan = document.createElement('span');
            dateSpan.textContent = dateAppointment;

            parragraphDate.appendChild(dateSpan);

            //hour
            const parragraphHour = document.createElement('p');
            parragraphHour.classList.add('parragraph');
            parragraphHour.textContent = 'Hora: ';

            const hourSpan = document.createElement('span');
            hourSpan.textContent = hourAppointment;

            parragraphHour.appendChild(hourSpan);

            //symptoms
            const parragraphSymptoms = document.createElement('p');
            parragraphSymptoms.classList.add('parragraph');
            parragraphSymptoms.textContent = 'Síntomas: ';

            const symptomsSpan = document.createElement('span');
            symptomsSpan.textContent = symptoms;

            parragraphSymptoms.appendChild(symptomsSpan);

            //button delete
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn-delete');
            btnDelete.type = 'button';
            btnDelete.textContent = 'Eliminar';
            btnDelete.onclick = () => {
                deleteAppointment(id);
            }

            //button cancel
            const btnCancel = document.createElement('button');
            btnCancel.classList.add('btn-cancel');
            btnCancel.type = 'button';
            btnCancel.textContent = 'Exit Edit';
            btnCancel.onclick = () => {
                cancelEdition(appointment);
            }

            //button delete
            const btnUpdate = document.createElement('button');
            btnUpdate.classList.add('btn-update');
            btnUpdate.type = 'button';
            btnUpdate.textContent = 'Editar';
            btnUpdate.onclick = () => {
                loadEdition(appointment);
            }

            containerAppointment.appendChild(contentAppointmet)

            contentAppointmet.appendChild(headingPet);
            contentAppointmet.appendChild(parragraphOwner);
            contentAppointmet.appendChild(parragraphPhone);
            contentAppointmet.appendChild(parragraphDate);
            contentAppointmet.appendChild(parragraphHour);
            contentAppointmet.appendChild(parragraphSymptoms);
            contentAppointmet.appendChild(btnUpdate);
            contentAppointmet.appendChild(btnCancel);
            contentAppointmet.appendChild(btnDelete);

        });
    }

    //clean html
    cleanHtml() {
        while(containerAppointment.firstChild) {
            containerAppointment.removeChild(containerAppointment.firstChild);
        }
    }

}//end Class

export default UI;