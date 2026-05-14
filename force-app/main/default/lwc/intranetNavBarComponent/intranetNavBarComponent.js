import { LightningElement, track } from 'lwc';
import LOGO_KENWORTH from '@salesforce/resourceUrl/PageOficial_l_horizontal_razondos';

export default class IntranetNavBarComponent extends LightningElement {
    logoUrl = LOGO_KENWORTH;
    @track isCollapsed = false;
    @track activeItem = 'perfil';

    get sidebarClass() {
        return this.isCollapsed ? 'sidebar collapsed' : 'sidebar';
    }

    get toggleIcon() {
        return this.isCollapsed ? 'utility:chevronright' : 'utility:chevronleft';
    }

    handleToggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    handleNavClick(event) {
        const selectedItem = event.currentTarget.dataset.id;
        this.activeItem = selectedItem;
        
        // Dispatch event for parent component to handle content switching
        this.dispatchEvent(new CustomEvent('navchange', {
            detail: { item: selectedItem }
        }));
    }

    get isPerfilActive() { return this.activeItem === 'perfil'; }
    get isDirectorioActive() { return this.activeItem === 'directorio'; }
    get isRecursosActive() { return this.activeItem === 'recursos'; }
    get isCalidadActive() { return this.activeItem === 'calidad'; }

    get perfilClass() {
        return `nav-link ${this.isPerfilActive ? 'active' : ''}`;
    }

    get directorioClass() {
        return `nav-link ${this.isDirectorioActive ? 'active' : ''}`;
    }

    get recursosClass() {
        return `nav-link ${this.isRecursosActive ? 'active' : ''}`;
    }

    get calidadClass() {
        return `nav-link ${this.isCalidadActive ? 'active' : ''}`;
    }
}