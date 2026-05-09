import { LightningElement } from 'lwc';
import PDF_CALIDAD from '@salesforce/resourceUrl/PageOficial_pdfCalidad';
import PDF_PRIVACIDAD from '@salesforce/resourceUrl/PageOficial_pdfPrivacidad';
import PDF_COMUNICACION from '@salesforce/resourceUrl/PageOficial_pdfComunicacion';
import PDF_DENUNCIA from '@salesforce/resourceUrl/PageOficial_pdfDenuncia';
import PDF_DIVERSIDAD from '@salesforce/resourceUrl/PageOficial_pdfDiversidad';
import PDF_ETICA from '@salesforce/resourceUrl/PageOficial_pdfEtica';
import PDF_SEGURIDAD from '@salesforce/resourceUrl/PageOficial_pdfSeguridad';
import PDF_PROVEEDORES from '@salesforce/resourceUrl/PageOficial_pdfProveedores';
import IMAGE_HERO_ENTERPRISE from '@salesforce/resourceUrl/LogoKenworthKreiDaf';

export default class PageOficialEnterpriseComponent extends LightningElement {
    imgHeroEnterprise = IMAGE_HERO_ENTERPRISE;
    pdfCalidad = PDF_CALIDAD;
    pdfPrivacidad = PDF_PRIVACIDAD;
    pdfComunicacion = PDF_COMUNICACION;
    pdfDenuncia = PDF_DENUNCIA;
    pdfDiversidad = PDF_DIVERSIDAD;
    pdfEtica = PDF_ETICA;
    pdfSeguridad = PDF_SEGURIDAD;
    pdfProveedores = PDF_PROVEEDORES;

    observer;

    renderedCallback() {
        if (!this.observer) {
            this.setupIntersectionObserver();
        }
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        const elements = this.template.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            this.observer.observe(el);
        });
    }

    handleOpenPdf(event) {
        const pdfName = event.currentTarget.dataset.pdf;
        if (this[pdfName]) {
            window.open(this[pdfName], '_blank');
        }
    }
}