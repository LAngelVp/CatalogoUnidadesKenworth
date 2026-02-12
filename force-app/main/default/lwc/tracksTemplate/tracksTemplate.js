import { LightningElement, wire, api } from 'lwc';
import getTractos from '@salesforce/apex/TractosController.getTractos';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TracksTemplate extends LightningElement {
    allTracks = [];
    renderizarHijos = false;

    @wire(getTractos, {busqueda: ''})
    wiredResultado({error, data}){
        if(data){
            this.allTracks = data;
            console.log(`Estos son todos los tractos recibidos en la consulta:  ${this.allTracks}`);
            this.mensaje('Éxito', `Elementos encontrados ${data.length}`, 'success');
            this.renderizarHijos = true;
        }else{
            this.mensaje("Error", "No se encontraron resultados", "error")
        }
    }

    mensaje(titulo, mensaje, variante){
        const contenido = new ShowToastEvent({
            title: titulo,
            message: mensaje,
            variant: variante,
        });
        this.dispatchEvent(contenido);
    }
}