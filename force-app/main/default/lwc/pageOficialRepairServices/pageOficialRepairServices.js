import { LightningElement } from 'lwc';
import IMAGE_HERO_SERVICES from '@salesforce/resourceUrl/PageOficial_imageHeroServices';

export default class PageOficialRepairServices extends LightningElement {
    imgHeroServices = IMAGE_HERO_SERVICES;

    observerInitialized = false;

    renderedCallback() {
        if (this.observerInitialized) {
            return;
        }
        
        const sections = this.template.querySelectorAll('.animate-on-scroll');
        if (sections.length > 0) {
            this.observerInitialized = true;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });

            sections.forEach(section => observer.observe(section));
        }
    }
}