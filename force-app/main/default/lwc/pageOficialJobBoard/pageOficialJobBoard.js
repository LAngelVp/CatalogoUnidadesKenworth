import { LightningElement, track } from 'lwc';
import IMAGE_HERO_JOBBOARD from '@salesforce/resourceUrl/PageOficial_Jobs';

export default class PageOficialJobBoard extends LightningElement {
    imgHeroJobBoard = IMAGE_HERO_JOBBOARD;
    observer;
    
    @track selectedJob = null;

    @track jobs = [
        {
            id: '1',
            title: 'Técnico Mecánico Diésel B',
            department: 'Servicio Técnico',
            branch: 'Matriz Venta Parada',
            type: 'Tiempo Completo',
            shortDescription: 'Únete a nuestro equipo de taller realizando diagnósticos, mantenimientos y reparaciones a unidades pesadas.',
            fullDescription: 'Buscamos un Técnico Mecánico con experiencia en motores diésel para integrarse a nuestra matriz. Serás el responsable de diagnosticar fallas mecánicas y electrónicas utilizando herramientas especializadas (escáner), así como realizar mantenimientos preventivos y correctivos a unidades Kenworth y DAF garantizando los estándares de calidad de la marca.',
            requirements: [
                'Experiencia comprobable mínima de 3 años en motores diésel (Cummins, PACCAR).',
                'Manejo avanzado de escáner de diagnóstico (INSITE, DAVIE).',
                'Conocimiento en transmisiones y diferenciales.',
                'Disponibilidad de horario y para realizar rescates carreteros ocasionales.'
            ],
            benefits: [
                'Sueldo base competitivo + Destajo.',
                'Prestaciones superiores a las de ley.',
                'Capacitación constante y certificación por planta Kenworth.',
                'Fondo de ahorro y vales de despensa.'
            ]
        },
        {
            id: '2',
            title: 'Asesor de Refacciones',
            department: 'Refacciones',
            branch: 'Veracruz',
            type: 'Tiempo Completo',
            shortDescription: 'Atención a clientes en mostrador y prospección de ventas de refacciones para equipo pesado.',
            fullDescription: 'Buscamos un Asesor de Refacciones proactivo y con orientación al cliente. Tu misión será atender los requerimientos de refacciones de nuestros clientes tanto en mostrador como vía telefónica, asesorarlos sobre las mejores opciones para sus unidades, y realizar el seguimiento postventa para fidelización y alcance de objetivos comerciales.',
            requirements: [
                'Experiencia en venta de refacciones para equipo pesado (tráileres, camiones).',
                'Facilidad de palabra y excelente atención al cliente.',
                'Manejo de catálogos electrónicos de partes.',
                'Manejo de paquetería Office y ERP.'
            ],
            benefits: [
                'Sueldo base + Atractivo esquema de comisiones.',
                'Prestaciones de ley y superiores.',
                'Oportunidad de crecimiento y desarrollo.',
                'Estabilidad laboral.'
            ]
        },
        {
            id: '3',
            title: 'Ejecutivo de Ventas Unidades',
            department: 'Ventas',
            branch: 'Córdoba / Orizaba',
            type: 'Tiempo Completo',
            shortDescription: 'Comercialización de unidades nuevas y seminuevas Kenworth y DAF en la región.',
            fullDescription: 'Te invitamos a formar parte de nuestra fuerza de ventas elite. El objetivo del puesto es promover y comercializar las unidades pesadas de nuestras marcas a nivel corporativo e individual, desarrollando estrategias de prospección, elaborando cotizaciones financieras y brindando un servicio de primer nivel durante todo el ciclo de venta.',
            requirements: [
                'Licenciatura terminada en Administración, Mercadotecnia, Ingeniería o afín.',
                'Experiencia mínima de 3 años en ventas corporativas (preferentemente en el sector automotriz o de transporte).',
                'Automóvil propio.',
                'Disponibilidad para viajar en la zona asignada.'
            ],
            benefits: [
                'Sueldo base garantía.',
                'Excelente esquema de comisiones (sin tope).',
                'Apoyo de gasolina y mantenimiento vehicular.',
                'Gastos médicos mayores.'
            ]
        }
    ];

    get hasSelectedJob() {
        return this.selectedJob !== null;
    }

    renderedCallback() {
        this.setupIntersectionObserver();
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

        if (this.observer) {
            this.observer.disconnect();
        }

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

    handleViewDetails(event) {
        const jobId = event.currentTarget.dataset.id;
        this.selectedJob = this.jobs.find(job => job.id === jobId);
        
        // Timeout para asegurar que el DOM del detalle se renderizó y animarlo
        setTimeout(() => {
            this.setupIntersectionObserver();
            this.scrollToTop();
        }, 50);
    }

    handleBackToList() {
        this.selectedJob = null;
        
        setTimeout(() => {
            this.setupIntersectionObserver();
            this.scrollToTop();
        }, 50);
    }

    scrollToTop() {
        const topElement = this.template.querySelector('.jobs-container');
        if (topElement) {
            topElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}