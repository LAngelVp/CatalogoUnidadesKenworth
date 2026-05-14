import { LightningElement, track, api } from 'lwc';
import LOGO_KENWORTH from '@salesforce/resourceUrl/LogoKenworthKreiDaf';

export default class NavbarOficialPage extends LightningElement {
    logoUrl = LOGO_KENWORTH;
    @track isModalOpen = false;
    @track isMobileMenuOpen = false;

    _activePage = 'inicio';

    @api 
    get activePage() {
        return this._activePage;
    }
    set activePage(value) {
        this._activePage = value || 'inicio';
    }

    get tabClass() {
        const pages = ['inicio', 'servicio', 'refacciones', 'unidades', 'sucursales', 'empresa', 'quejasSugerencias', 'trabajaConNosotros'];
        const classes = {};
        pages.forEach(p => {
            classes[p] = this._activePage === p ? 'nav-link active' : 'nav-link';
        });
        return classes;
    }

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
        this._activePage = 'inicio';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'inicio' } }));
        this.closeMobileMenu();
    }
    
    selectServicio() {
        this._activePage = 'servicio';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'servicio' } }));
        this.closeMobileMenu();
    }
    
    selectRefacciones() {
        this._activePage = 'refacciones';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'refacciones' } }));
        this.closeMobileMenu();
    }
    
    selectUnidades() {
        this._activePage = 'unidades';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'unidades' } }));
        this.closeMobileMenu();
    }
    
    selectSucursales() {
        this._activePage = 'sucursales';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'sucursales' } }));
        this.closeMobileMenu();
    }
    
    selectEmpresa() {
        this._activePage = 'empresa';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'empresa' } }));
        this.closeMobileMenu();
    }

    selectQuejasSugerencias() {
        this._activePage = 'quejasSugerencias';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'quejasSugerencias' } }));
        this.closeMobileMenu();
    }
    
    selectTrabajaConNosotros() {
        this._activePage = 'trabajaConNosotros';
        this.dispatchEvent(new CustomEvent('navchange', { detail: { page: 'trabajaConNosotros' } }));
        this.closeMobileMenu();
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