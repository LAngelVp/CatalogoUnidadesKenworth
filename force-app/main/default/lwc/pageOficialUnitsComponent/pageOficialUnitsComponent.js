import { LightningElement } from 'lwc';
import IMAGE_HERO_UNITS from '@salesforce/resourceUrl/PageOficial_imageHeroUnits';
import IMAGE_NEW_KW from '@salesforce/resourceUrl/PageOficial_imageNewKw';
import IMAGE_NEW_DAF from '@salesforce/resourceUrl/PageOficial_imageNewDaf';
import IMAGE_NEW_VOCATIONAL from '@salesforce/resourceUrl/PageOficial_imageNewVocational';
import IMAGE_USED_1 from '@salesforce/resourceUrl/PageOficial_imageUsed1';
import IMAGE_USED_2 from '@salesforce/resourceUrl/PageOficial_imageUsed2';

export default class PageOficialUnitsComponent extends LightningElement {
    imgHeroUnits = IMAGE_HERO_UNITS;
    imgNewKw = IMAGE_NEW_KW;
    imgNewDaf = IMAGE_NEW_DAF;
    imgNewVocational = IMAGE_NEW_VOCATIONAL;
    imgUsed1 = IMAGE_USED_1;
    imgUsed2 = IMAGE_USED_2;

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
                    // Opcional: Descomentar la siguiente línea si solo quieres que se anime una vez
                    // this.observer.unobserve(entry.target);
                }
            });
        }, options);

        const elements = this.template.querySelectorAll('.fade-in, .slide-up');
        elements.forEach(el => {
            this.observer.observe(el);
        });
    }

    scrollToContact() {
        const contactSection = this.template.querySelector('.contact-cta');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}