import { LightningElement, track } from 'lwc';
import LOGO_KENWORTH from '@salesforce/resourceUrl/LogoKenworthKreiDaf';

export default class NavbarOficialPage extends LightningElement {
    logoUrl = LOGO_KENWORTH;
    
    // ✅ IMPORTANTE: Declarar isModalOpen como @track para que sea reactivo
    @track isModalOpen = false;

    openContactModal() {
        this.isModalOpen = true;
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    closeContactModal() {
        this.isModalOpen = false;
        // Restaurar scroll del body
        document.body.style.overflow = 'auto';
    }

    // Cerrar modal si se hace clic en el overlay (fondo)
    closeModalOnOverlay(event) {
        if (event.target.classList.contains('modal-overlay')) {
            this.closeContactModal();
        }
    }

    connectedCallback() {
        window.addEventListener('closeModal', this.handleCloseModal.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('closeModal', this.handleCloseModal.bind(this));
        // Asegurar que se restaure el scroll si el componente se destruye
        document.body.style.overflow = 'auto';
    }

    handleCloseModal() {
        this.closeContactModal();
    }
}