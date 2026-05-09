import { LightningElement, track } from 'lwc';

export default class PageOficialComplaintsSuggestions extends LightningElement {
    observer;
    
    @track isSubmitted = false;
    
    @track formData = {
        type: 'Sugerencia',
        name: '',
        email: '',
        phone: '',
        branch: '',
        message: ''
    };

    get isSuggestion() {
        return this.formData.type === 'Sugerencia';
    }

    get isComplaint() {
        return this.formData.type === 'Queja';
    }

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

    handleChange(event) {
        const field = event.target.name;
        this.formData[field] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // Aquí normalmente se haría un llamado a Apex o a la API para guardar la queja/sugerencia.
        // Simularemos un tiempo de carga y luego mostraremos el éxito.
        
        // Console log para propósitos de debug:
        console.log('Formulario enviado:', JSON.parse(JSON.stringify(this.formData)));

        // Mostrar el estado de éxito
        this.isSubmitted = true;
        
        // Hacer scroll suave hacia arriba para ver el mensaje de éxito
        const formSection = this.template.querySelector('.form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    resetForm() {
        this.isSubmitted = false;
        this.formData = {
            type: 'Sugerencia',
            name: '',
            email: '',
            phone: '',
            branch: '',
            message: ''
        };
        
        // Esperamos a que el DOM se renderice de nuevo para observar los elementos animados
        setTimeout(() => {
            const elements = this.template.querySelectorAll('.animate-on-scroll');
            elements.forEach(el => {
                el.classList.remove('visible');
                if (this.observer) {
                    this.observer.observe(el);
                }
            });
        }, 100);
    }
}