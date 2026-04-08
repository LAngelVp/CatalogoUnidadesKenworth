import { LightningElement, track } from 'lwc';

export default class PageOficialContactForm extends LightningElement {
    // Datos personales
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track phone = '';
    @track phoneAlternate = '';
    @track birthDate = '';

    // Ubicación
    @track state = '';
    @track city = '';
    @track address = '';
    @track postalCode = '';
    @track colony = '';

    // Interés
    @track interestType = '';
    @track vehicleModel = '';
    @track comments = '';
    @track preferredContact = '';
    @track bestTime = '';

    // Adicionales
    @track companyName = '';
    @track fleetSize = '';
    @track position = '';
    @track howDidYouHear = '';

    // Términos
    @track privacyPolicy = false;
    @track newsletter = false;

    // Estados UI
    @track showSuccess = false;
    @track showError = false;
    @track successMessage = '';
    @track errorMessage = '';
    @track isSubmitting = false;

    // Opciones para comboboxes
    stateOptions = [
        { label: 'Aguascalientes', value: 'Aguascalientes' },
        { label: 'Baja California', value: 'Baja California' },
        { label: 'Baja California Sur', value: 'Baja California Sur' },
        { label: 'Campeche', value: 'Campeche' },
        { label: 'Chiapas', value: 'Chiapas' },
        { label: 'Chihuahua', value: 'Chihuahua' },
        { label: 'Ciudad de México', value: 'Ciudad de México' },
        { label: 'Coahuila', value: 'Coahuila' },
        { label: 'Colima', value: 'Colima' },
        { label: 'Durango', value: 'Durango' },
        { label: 'Estado de México', value: 'Estado de México' },
        { label: 'Guanajuato', value: 'Guanajuato' },
        { label: 'Guerrero', value: 'Guerrero' },
        { label: 'Hidalgo', value: 'Hidalgo' },
        { label: 'Jalisco', value: 'Jalisco' },
        { label: 'Michoacán', value: 'Michoacán' },
        { label: 'Morelos', value: 'Morelos' },
        { label: 'Nayarit', value: 'Nayarit' },
        { label: 'Nuevo León', value: 'Nuevo León' },
        { label: 'Oaxaca', value: 'Oaxaca' },
        { label: 'Puebla', value: 'Puebla' },
        { label: 'Querétaro', value: 'Querétaro' },
        { label: 'Quintana Roo', value: 'Quintana Roo' },
        { label: 'San Luis Potosí', value: 'San Luis Potosí' },
        { label: 'Sinaloa', value: 'Sinaloa' },
        { label: 'Sonora', value: 'Sonora' },
        { label: 'Tabasco', value: 'Tabasco' },
        { label: 'Tamaulipas', value: 'Tamaulipas' },
        { label: 'Tlaxcala', value: 'Tlaxcala' },
        { label: 'Veracruz', value: 'Veracruz' },
        { label: 'Yucatán', value: 'Yucatán' },
        { label: 'Zacatecas', value: 'Zacatecas' }
    ];

    interestOptions = [
        { label: 'Compra de tractocamión nuevo', value: 'new_purchase' },
        { label: 'Compra de tractocamión usado', value: 'used_purchase' },
        { label: 'Arrendamiento / Financiamiento', value: 'leasing' },
        { label: 'Servicio de taller', value: 'service' },
        { label: 'Refacciones y partes', value: 'parts' },
        { label: 'Asistencia en carretera', value: 'road_assistance' },
        { label: 'Cotización de flota', value: 'fleet_quote' },
        { label: 'Otro', value: 'other' }
    ];

    modelOptions = [
        { label: 'Kenworth T680', value: 'T680' },
        { label: 'Kenworth T880', value: 'T880' },
        { label: 'Kenworth W990', value: 'W990' },
        { label: 'Kenworth T370', value: 'T370' },
        { label: 'DAF XF', value: 'DAF_XF' },
        { label: 'DAF CF', value: 'DAF_CF' },
        { label: 'DAF LF', value: 'DAF_LF' },
        { label: 'No estoy seguro', value: 'unsure' }
    ];

    contactMethodOptions = [
        { label: 'Teléfono', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Correo electrónico', value: 'email' },
        { label: 'Cualquiera', value: 'any' }
    ];

    timeOptions = [
        { label: '8:00 AM - 12:00 PM', value: 'morning' },
        { label: '12:00 PM - 4:00 PM', value: 'midday' },
        { label: '4:00 PM - 8:00 PM', value: 'afternoon' },
        { label: 'Horario flexible', value: 'flexible' }
    ];

    referralOptions = [
        { label: 'Búsqueda en Google', value: 'google' },
        { label: 'Redes sociales', value: 'social' },
        { label: 'Recomendación', value: 'referral' },
        { label: 'Evento / Expo', value: 'event' },
        { label: 'Publicidad', value: 'ad' },
        { label: 'Otro', value: 'other' }
    ];

    // Manejadores de eventos
    handleInputChange(event) {
        const field = event.target.id;
        this[field] = event.target.value;
        this.hideAlerts();
    }

    handleComboboxChange(event) {
        const field = event.target.id;
        this[field] = event.target.value;
        this.hideAlerts();
    }

    handleCheckboxChange(event) {
        const field = event.target.id;
        this[field] = event.target.checked;
        this.hideAlerts();
    }

    hideAlerts() {
        this.showSuccess = false;
        this.showError = false;
    }

    validateForm() {
        // Validar campos requeridos
        if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.state || !this.city || !this.interestType) {
            this.showError = true;
            this.errorMessage = 'Por favor, completa todos los campos marcados con asterisco (*).';
            return false;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        if (!emailRegex.test(this.email)) {
            this.showError = true;
            this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
            return false;
        }

        // Validar teléfono (mínimo 10 dígitos)
        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(this.phone.replace(/[\s\-\(\)]/g, ''))) {
            this.showError = true;
            this.errorMessage = 'Por favor, ingresa un número de teléfono válido (mínimo 10 dígitos).';
            return false;
        }

        // Validar política de privacidad
        if (!this.privacyPolicy) {
            this.showError = true;
            this.errorMessage = 'Debes aceptar la Política de Privacidad para continuar.';
            return false;
        }

        return true;
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.isSubmitting = true;
        this.hideAlerts();

        // Construir objeto con los datos del formulario
        const formData = {
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            email: this.email,
            phone: this.phone,
            phoneAlternate: this.phoneAlternate,
            birthDate: this.birthDate,
            state: this.state,
            city: this.city,
            address: this.address,
            postalCode: this.postalCode,
            colony: this.colony,
            interestType: this.interestType,
            vehicleModel: this.vehicleModel,
            comments: this.comments,
            preferredContact: this.preferredContact,
            bestTime: this.bestTime,
            companyName: this.companyName,
            fleetSize: this.fleetSize,
            position: this.position,
            howDidYouHear: this.howDidYouHear,
            newsletter: this.newsletter,
            source: 'Formulario Web Kenworth del Este',
            dateSubmitted: new Date().toISOString()
        };

        try {
            // Opción 1: Enviar a Salesforce usando Apex
            // const result = await sendContactForm({ formData: JSON.stringify(formData) });
            
            // Opción 2: Enviar a un endpoint externo (webhook, API, etc.)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                this.showSuccess = true;
                this.successMessage = '¡Gracias por contactarnos! Un asesor de Kenworth del Este se comunicará contigo en las próximas 24 horas.';
                this.handleReset();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            this.showError = true;
            this.errorMessage = 'Ocurrió un error al enviar tu mensaje. Por favor, intenta nuevamente o llámanos al 01-800-xxx-xxxx.';
            console.error('Error:', error);
        } finally {
            this.isSubmitting = false;
        }
    }

    handleReset() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.phoneAlternate = '';
        this.birthDate = '';
        this.state = '';
        this.city = '';
        this.address = '';
        this.postalCode = '';
        this.colony = '';
        this.interestType = '';
        this.vehicleModel = '';
        this.comments = '';
        this.preferredContact = '';
        this.bestTime = '';
        this.companyName = '';
        this.fleetSize = '';
        this.position = '';
        this.howDidYouHear = '';
        this.privacyPolicy = false;
        this.newsletter = false;
        this.hideAlerts();
    }
}