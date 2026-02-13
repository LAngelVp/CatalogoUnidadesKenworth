import { LightningElement, wire, track } from 'lwc';
import getTractos from '@salesforce/apex/TractosController.getTractos';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TracksTemplate extends LightningElement {
    allTracks = [];
    renderizarHijos = false;
    @track displayedTracks = [];

    @wire(getTractos, { busqueda: '' })
    wiredResultado({ error, data }) {
        if (data) {
            this.allTracks = data;
            this.displayedTracks = [...data]; 
            this.mensaje('Éxito', `Se encontraron ${data.length} unidades`, 'success');
            this.renderizarHijos = true;
        } else if (error) {
            this.mensaje("Error", `No se encontraron unidades: ${error}`, "error");
        }
    }
    handleFilteredData(event) {
        this.displayedTracks = event.detail.data;
        if (event.detail.data.length === 0) {
            this.mensaje('Éxito', `No se encontraron unidades`, 'warning');
        } else {
            this.mensaje('Éxito', `Se encontraron ${event.detail.data.length} unidades`, 'success');
        }
    }
    mensaje(titulo, mensaje, variante) {
        const contenido = new ShowToastEvent({
            title: titulo,
            message: mensaje,
            variant: variante,
        });
        this.dispatchEvent(contenido);
    }
}