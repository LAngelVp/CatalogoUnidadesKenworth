import { LightningElement } from 'lwc';
import LOGO_KENWORTH from '@salesforce/resourceUrl/PageOficial_l_horizontal_razondos';

export default class PageOficialFooterComponent extends LightningElement {
    logoUrl = LOGO_KENWORTH;

    get currentYear() {
        return new Date().getFullYear();
    }
}