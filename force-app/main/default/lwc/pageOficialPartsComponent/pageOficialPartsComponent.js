import { LightningElement } from 'lwc';
import IMAGE_HERO_REFACCIONES from '@salesforce/resourceUrl/PageOficial_imageHeroRefacciones';

export default class PageOficialPartsComponent extends LightningElement {
    imgHeroRefacciones = IMAGE_HERO_REFACCIONES;

    brands = [
        {
            id: '1',
            name: 'TRP',
            description: 'Refacciones multimarca de calidad confiable y probada para todas las marcas de tractocamiones, remolques y autobuses. La alternativa inteligente.',
            colorClass: 'brand-name trp-brand'
        },
        {
            id: '2',
            name: 'FULLER',
            description: 'Transmisiones manuales y automatizadas líderes en la industria, ofreciendo máxima eficiencia, durabilidad y control total sobre el camino.',
            colorClass: 'brand-name fuller-brand'
        },
        {
            id: '3',
            name: 'HOLLAND',
            description: 'Sistemas de acoplamiento, quintas ruedas y suspensiones de alta resistencia. Diseñados para brindar seguridad extrema bajo cualquier condición.',
            colorClass: 'brand-name holland-brand'
        },
        {
            id: '4',
            name: 'MERITOR',
            description: 'Ejes y sistemas de frenos de alto rendimiento, fabricados para soportar las exigencias más duras del transporte pesado con precisión.',
            colorClass: 'brand-name meritor-brand'
        },
        {
            id: '5',
            name: 'HORTON',
            description: 'Soluciones de enfriamiento y embragues de ventilador premium para optimizar la temperatura de su motor, mejorando la eficiencia del combustible.',
            colorClass: 'brand-name horton-brand'
        }
    ];

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