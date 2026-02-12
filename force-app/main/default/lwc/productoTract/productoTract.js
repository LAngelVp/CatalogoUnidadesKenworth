import { LightningElement, api } from 'lwc';

export default class ProductoTract extends LightningElement {
    @api allTractsChild = [];
    
    connectedCallback() {
        console.log("DEBUGUEANDO EL COMPONENTE DE PRODUCTO")
        console.log('✅ Todos los tractos en el componente de productos:', this.allTractsChild);
        console.log('Cantidad:', this.allTractsChild.length);
        
        // Si quieres ver el contenido detallado
        if (this.allTractsChild.length > 0) {
            const datosNormales = JSON.parse(JSON.stringify(this.allTractsChild));
            console.log('Datos convertidos:', datosNormales);
            console.log('Primer elemento:', this.allTractsChild[0]);
            console.log('Todos los elementos:', JSON.parse(JSON.stringify(this.allTractsChild)));
        }
    }
}