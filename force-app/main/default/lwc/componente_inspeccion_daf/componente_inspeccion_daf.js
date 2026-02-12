import { LightningElement, api } from 'lwc';

export default class Componente_inspeccion_daf extends LightningElement {
    @api IDFormato;
    get visualforceUrl(){
        return "https://grupokrei--c.vf.force.com/apex/Recepcion_DAF?id=" + this.IDFormato;
    }
}