import { LightningElement, api } from 'lwc';

export default class Kenworthdafdeleste extends LightningElement {
    @api tituloSeccion;
    activePage = 'inicio';

    get showInicio() {
        return this.activePage === 'inicio';
    }
    
    get showServicio() {
        return this.activePage === 'servicio';
    }
    
    get showRefacciones() {
        return this.activePage === 'refacciones';
    }
    
    get showUnidades() {
        return this.activePage === 'unidades';
    }
    
    get showSucursales() {
        return this.activePage === 'sucursales';
    }
    
    get showEmpresa() {
        return this.activePage === 'empresa';
    }
    
    handleNavChange(event) {
        this.activePage = event.detail.page;
    }
}