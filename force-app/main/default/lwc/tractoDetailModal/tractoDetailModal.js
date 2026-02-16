import { LightningElement, api } from 'lwc';

export default class TractoDetailModal extends LightningElement {
    @api selectedTracto;

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    // Usamos un getter para procesar el texto enriquecido en tiempo real
    get processedImages() {
        // Accedemos a la ruta exacta que usas en el HTML
        const richText = this.selectedTracto?.tracto?.Imagen__c;
        
        if (!richText) {
            return { first: null, remaining: [] };
        }

        // Extraer todas las etiquetas <img>
        const imgRegex = /<img [^>]*>/g;
        const images = richText.match(imgRegex) || [];

        return {
            first: images.length > 0 ? images[0] : null,
            remaining: images.length > 1 ? images.slice(1) : []
        };
    }

    // Getters auxiliares para el HTML
    get firstImage() {
        return this.processedImages.first;
    }

    get remainingImages() {
        return this.processedImages.remaining;
    }

    get hasRemainingImages() {
        return this.remainingImages.length > 0;
    }
}