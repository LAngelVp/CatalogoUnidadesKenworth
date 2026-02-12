// recordDeletionFormKWE.js
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// CORREGIDO: Usar el nombre correcto del método
import eliminadorRegistrosEnObjeto from '@salesforce/apex/EliminadorRegistrosEnObjeto.eliminadorRegistrosEnObjeto';

export default class RecordDeletionFormKWE extends LightningElement {
    @track nombreObjeto = '';
    @track limite = 100;
    @track isLoading = false;
    @track resultado = '';

    handleNombreObjetoChange(event) {
        this.nombreObjeto = event.target.value;
    }

    handleLimiteChange(event) {
        this.limite = parseInt(event.target.value, 10);
    }

    async eliminarRegistros() {
        try {
            // Validación
            if (!this.nombreObjeto || !this.limite || this.limite < 1) {
                this.mostrarMensaje('Error', 'Completa todos los campos correctamente', 'error');
                return;
            }

            this.isLoading = true;
            this.resultado = '';

            // CORREGIDO: Llamar al método con el nombre correcto
            await eliminadorRegistrosEnObjeto({
                nombreObjeto: this.nombreObjeto,
                limite: this.limite
            });

            this.resultado = 'Registros eliminados exitosamente';
            this.mostrarMensaje('Éxito', 'Registros eliminados correctamente', 'success');

        } catch (error) {
            console.error('Error:', error);
            this.resultado = `Error: ${error.body?.message || error.message}`;
            this.mostrarMensaje('Error', 'No se pudieron eliminar los registros', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    mostrarMensaje(titulo, mensaje, tipo) {
        this.dispatchEvent(new ShowToastEvent({
            title: titulo,
            message: mensaje,
            variant: tipo
        }));
    }
}