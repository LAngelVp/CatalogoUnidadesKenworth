import { LightningElement, track } from 'lwc';

export default class IntranetMainApp extends LightningElement {
    @track isLoggedIn = false;

    handleLoginSuccess() {
        this.isLoggedIn = true;
    }
}
