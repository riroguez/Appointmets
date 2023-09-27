import { 
    formAppointment,
    ownerInput,
    petInput,
    phoneInput,
    dateAppointmentInput,
    hourAppointmentInput, 
    symptomsInput 
} from '../selectors.js';
import { 
    validateForm, 
    dataAppoinment, 
    showAppointmenst, 
    validateDate, 
    currentDate,
    validateHours,
    validatePhone 
} from '../functions.js';

class App {
    constructor() {
        this.initApp();
    }
    
    initApp() {
        eventListeners();
        function eventListeners() {
            formAppointment.addEventListener('submit', validateForm);
            ownerInput.addEventListener('change', dataAppoinment);
            petInput.addEventListener('change', dataAppoinment);
            phoneInput.addEventListener('change', dataAppoinment);
            dateAppointmentInput.addEventListener('change', dataAppoinment);
            hourAppointmentInput.addEventListener('change', dataAppoinment);
            symptomsInput.addEventListener('change', dataAppoinment);
            currentDate();
            showAppointmenst();
            validateDate();
            validateHours();
            validatePhone();
        }
    }

}//end class

export default App;