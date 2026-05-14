import { LightningElement, track } from 'lwc';
import LOGO_KENWORTH from '@salesforce/resourceUrl/LogoKenworthKreiDaf';

export default class IntranetLogin extends LightningElement {
    logoUrl = LOGO_KENWORTH;

    @track email;
    @track password;
    @track error;
    @track loading = false;

    handleEmailChange(event) {
        this.email = event.target.value;
        this.error = '';
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
        this.error = '';
    }

    handleSubmit() {
        if (!this.email || !this.password) {
            this.error = 'Por favor complete todos los campos';
            return;
        }

        this.loading = true;
        this.error = '';

        // Simulación de autenticación exitosa
        setTimeout(() => {
            this.loading = false;
            
            // Dispatch del evento de éxito para que el padre cambie la vista
            this.dispatchEvent(new CustomEvent('loginsuccess'));
        }, 1500);
    }
}