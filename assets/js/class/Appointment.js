class Appointment {

    constructor() {
        this.appointments = [];
    }

    addAppointment(appointmentsObj) {
        this.appointments = [...this.appointments, appointmentsObj];
        this.saveStorage(this.appointments);
    }

    deleteAppointment(idAppo) {
        this.appointments = this.appointments.filter(item => item.id !== idAppo);
        this.saveStorage(this.appointments);
    }

    editAppointment(updateAppointment) {
        this.appointments = this.appointments.map(item => item.id === updateAppointment.id ? updateAppointment : item);
        this.saveStorage(this.appointments);
    }

    saveStorage() {
        localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }

}//end class

export default Appointment;