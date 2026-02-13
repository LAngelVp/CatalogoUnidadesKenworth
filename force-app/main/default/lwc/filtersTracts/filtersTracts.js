import Name from '@salesforce/schema/Account.Name';
import { LightningElement, api, track } from 'lwc';

export default class FiltersTracts extends LightningElement {
    @api tracks = [];
    @track isModalOpen = false;
    selectedBrandId = '';

    handleReset(){
        this.selectedBrandId = '';
        this.dispatchEvent(new CustomEvent('filterapplied', {
            detail: { data: this.tracks }
        }));
    }

    handleBrandChange(event) {
        this.selectedBrandId = event.detail.value;
    }
    @track filtros = {
        Name: ''
    };
    handleFilterChange(event) {
        const field = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        
        this.filtros[field] = value;

        if (field === 'Name') {
            this.filtros.Name = '';
        }
    }

    aplicarFiltros() {
        if (!this.selectedBrandId) {
            this.dispatchEvent(new CustomEvent('filterapplied', {
                detail: { data: this.tracks }
            }));
            this.closeModal();
            return;
        }

        const resultados = this.tracks.filter(item => {
            const nombreMarca = item.tracto?.Name || item.Name || '';
            
            return nombreMarca.trim() === this.selectedBrandId.trim();
        });

        console.log('Resultados filtrados:', resultados.length);

        this.dispatchEvent(new CustomEvent('filterapplied', {
            detail: { data: resultados }
        }));

        this.closeModal();
    }
    get isModelDisabled() {
        return !this.selectedBrandId;
    }
    get brandOptions() {
        if (!this.tracks || this.tracks.length === 0) {
            return [];
        }

        const nombresUnicos = new Set();
        const optionsUnicas = [];
        
        this.tracks.forEach(item => {
            const nombre = item.tracto?.Name || item.Name || 'Sin nombre';
            const id = item.tracto?.Id || item.Id;
            
            if (!nombresUnicos.has(nombre)) {
                nombresUnicos.add(nombre);
                optionsUnicas.push({
                    label: nombre,
                    value: nombre
                });
            }
        });
        return optionsUnicas;
    }
    get modelOptions() {
        if (!this.tracks || !this.selectedBrandId) {
            return [];
        }
        
        const modelosUnicos = new Set();
        const optionsUnicas = [];
        
        const modelosFiltrados = this.tracks.filter(item => {
            const nombreMarca = item.tracto?.Name || item.Name || 'Sin nombre';
            return nombreMarca === this.selectedBrandId; 
        });

        modelosFiltrados.forEach(item => {
            const modelo = item.tracto?.modelo__c || item.modelo__c || 'Sin modelo';
            const valModelo = item.tracto?.modelo__c || item.modelo__c; 
            
            if (!modelosUnicos.has(modelo)) {
                modelosUnicos.add(modelo);
                optionsUnicas.push({
                    label: modelo,
                    value: valModelo 
                });
            }
        });

        return optionsUnicas;
    }
    openModal() {
        this.isModalOpen = true;
        this.selectedBrandId = '';
    }
    closeModal() {
        this.isModalOpen = false;
    }
}