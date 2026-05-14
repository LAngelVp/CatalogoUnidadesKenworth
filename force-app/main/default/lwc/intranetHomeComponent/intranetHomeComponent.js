import { LightningElement, track } from 'lwc';

export default class IntranetHomeComponent extends LightningElement {
    @track selectedItem = 'perfil'; // Default selection

    handleNavChange(event) {
        this.selectedItem = event.detail.item;
    }

    get isPerfil() {
        return this.selectedItem === 'perfil';
    }

    get isDirectorio() {
        return this.selectedItem === 'directorio';
    }

    get isRecursos() {
        return this.selectedItem === 'recursos';
    }

    get isCalidad() {
        return this.selectedItem === 'calidad';
    }
}