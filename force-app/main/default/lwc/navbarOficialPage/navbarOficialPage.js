import { LightningElement, track } from 'lwc';
import LOGO_KENWORTH from '@salesforce/resourceUrl/LogoKenworthKreiDaf';

export default class NavbarOficialPage extends LightningElement {
    logoUrl = LOGO_KENWORTH;
    @track isModalOpen = false;

    activePage = 'inicio';
    
    // Métodos específicos para cada página
    selectInicio() {
        this.activePage = 'inicio';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'inicio' } }));
    }
    
    selectServicio() {
        this.activePage = 'servicio';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'servicio' } }));
    }
    
    selectRefacciones() {
        this.activePage = 'refacciones';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'refacciones' } }));
    }
    
    selectUnidades() {
        this.activePage = 'unidades';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'unidades' } }));
    }
    
    selectSucursales() {
        this.activePage = 'sucursales';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'sucursales' } }));
    }
    
    selectEmpresa() {
        this.activePage = 'empresa';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'empresa' } }));
    }
    
    getTabClass(page) {
        return this.activePage === page ? 'active' : '';
    }

    openContactModal() {
        this.isModalOpen = true;
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