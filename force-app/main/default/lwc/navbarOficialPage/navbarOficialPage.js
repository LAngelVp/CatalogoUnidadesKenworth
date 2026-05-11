import { LightningElement, track } from 'lwc';
import LOGO_KENWORTH from '@salesforce/resourceUrl/LogoKenworthKreiDaf';

export default class NavbarOficialPage extends LightningElement {
    logoUrl = LOGO_KENWORTH;
    @track isModalOpen = false;
    @track isMobileMenuOpen = false;

    activePage = 'inicio';

    get mobileMenuClass() {
        return this.isMobileMenuOpen ? 'textNavbar open' : 'textNavbar';
    }

    get hamburgerIcon() {
        return this.isMobileMenuOpen ? 'utility:close' : 'utility:all';
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
    }
    
    // Métodos específicos para cada página
    selectInicio() {
        this.activePage = 'inicio';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'inicio' } }));
        this.closeMobileMenu();
    }
    
    selectServicio() {
        this.activePage = 'servicio';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'servicio' } }));
        this.closeMobileMenu();
    }
    
    selectRefacciones() {
        this.activePage = 'refacciones';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'refacciones' } }));
        this.closeMobileMenu();
    }
    
    selectUnidades() {
        this.activePage = 'unidades';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'unidades' } }));
        this.closeMobileMenu();
    }
    
    selectSucursales() {
        this.activePage = 'sucursales';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'sucursales' } }));
        this.closeMobileMenu();
    }
    
    selectEmpresa() {
        this.activePage = 'empresa';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'empresa' } }));
        this.closeMobileMenu();
    }

    selectQuejasSugerencias() {
        this.activePage = 'quejasSugerencias';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'quejasSugerencias' } }));
        this.closeMobileMenu();
    }
    
    selectTrabajaConNosotros() {
        this.activePage = 'trabajaConNosotros';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'trabajaConNosotros' } }));
        this.closeMobileMenu();
    }
    
    getTabClass(page) {
        return this.activePage === page ? 'active' : '';
    }

    openContactModal() {
        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';
        this.closeMobileMenu();
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