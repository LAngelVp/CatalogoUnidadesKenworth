import { LightningElement, api } from 'lwc';

export default class TractoDetailModal extends LightningElement {
    @api selectedTracto;

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}