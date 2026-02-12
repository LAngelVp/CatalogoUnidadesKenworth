import { LightningElement, api } from 'lwc';

export default class FiltersTracts extends LightningElement {
    @api tracks = [];
    get modelOptions() {
        if (!this.tracks || this.tracks.length === 0) {
            return [];
        }
        
     // Usar Set para valores únicos
    const nombresUnicos = new Set();
    const optionsUnicas = [];
    
    this.tracks.forEach(item => {
        const nombre = item.tracto?.Name || item.Name || 'Sin nombre';
        const id = item.tracto?.Id || item.Id;
        
        // Solo agregar si el nombre no está en el Set
        if (!nombresUnicos.has(nombre)) {
            nombresUnicos.add(nombre);
            optionsUnicas.push({
                label: nombre,
                value: id
            });
        }
    });
    
    return optionsUnicas;
    }
}