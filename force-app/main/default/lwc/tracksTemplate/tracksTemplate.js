import { LightningElement, wire, track } from 'lwc';
import getTractos from '@salesforce/apex/TractosController.getTractos';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TracksTemplate extends LightningElement {
    allTracks = []; // Backup de todos los datos
    renderizarHijos = false;
    @track displayedTracks = []; // Lo que se ve en pantalla

    @wire(getTractos, { busqueda: '' })
    wiredResultado({ error, data }) {
        if (data) {
            this.allTracks = data;
            // IMPORTANTE: Asignar aquí para que se vean datos al cargar la página
            this.displayedTracks = [...data]; 
            
            console.log('Datos recibidos:', this.allTracks);
            this.mensaje('Éxito', `Elementos encontrados ${data.length}`, 'success');
            this.renderizarHijos = true;
        } else if (error) {
            this.mensaje("Error", "Error al consultar los datos", "error");
            console.error(error);
        }
    }

    // Escucha el evento del hijo c-filters-tracts
    handleFilteredData(event) {
        // Actualizamos la lista que se renderiza con lo que mandó el hijo
        this.displayedTracks = event.detail.data;
        console.log('Registros después del filtro:', this.displayedTracks.length);
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