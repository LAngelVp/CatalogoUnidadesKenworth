import { LightningElement, api, track } from 'lwc';

export default class FiltersTracts extends LightningElement {
    @api tracks = []; // Datos originales
    @track isModalOpen = false;

    // Inicializamos todos los campos del filtro
    @track filtros = {
        marca: '',
        modelo: '',
        anio: '',
        estado: '',
        precioMin: 0,
        precioMax: 0,
        marcaMotor: '',
        modeloMotor: '',
        transmision: '',
        ejes: 0
    };

    handleFilterChange(event) {
        const field = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.filtros[field] = value;
    }

    handleReset() {
        this.filtros = {
            marca: '', 
            modelo: '', 
            anio: '', 
            estado: '', 
            precioMin: 0, 
            precioMax: 0, 
            marcaMotor: '', 
            modeloMotor: '', 
            transmision: '', 
            ejes: 0
        };
        this.dispatchEvent(new CustomEvent('filterapplied', {
            detail: { data: this.tracks }
        }));
    }

    aplicarFiltros() {
        const resultados = this.tracks.filter(item => {
            const t = item.tracto || item;

            // 1. Lógica de Marca, Modelo, Año y Estado
            const matchMarca = !this.filtros.marca || t.Name === this.filtros.marca;
            const matchModelo = !this.filtros.modelo || t.Modelo__c === this.filtros.modelo;
            const matchAnio = !this.filtros.anio || t.Year_Modelo__c == this.filtros.anio;
            const matchEstado = !this.filtros.estado || t.Estado_de_la_Unidad__c === this.filtros.estado;
            const matchTransmision = !this.filtros.transmision || t.Transmision__c === this.filtros.transmision;

            // 2. Lógica de Motor (Búsqueda por texto)
            const matchMotorM = !this.filtros.marcaMotor || 
                (t.Marca_de_Motor__c && t.Marca_de_Motor__c.toLowerCase().includes(this.filtros.marcaMotor.toLowerCase()));
            
            const matchMotorMod = !this.filtros.modeloMotor || 
                (t.Modelo_del_Motor__c && t.Modelo_del_Motor__c.toLowerCase().includes(this.filtros.modeloMotor.toLowerCase()));

            // 3. Lógica Numérica (Precios y Ejes)
            // Convertimos a Number para asegurar una comparación correcta
            const precioVenta = parseFloat(t.Precio_Venta__c) || 0;
            const matchPrecioMin = !this.filtros.precioMin || precioVenta >= parseFloat(this.filtros.precioMin);
            const matchPrecioMax = !this.filtros.precioMax || precioVenta <= parseFloat(this.filtros.precioMax);
            
            // Suma de ejes (Delanteros + Traseros)
            const totalEjes = (parseInt(t.Capacidad_Ejes_Delanteros__c) || 0) + (parseInt(t.Capacidad_Ejes_Traseros__c) || 0);
            const matchEjes = !this.filtros.ejes || totalEjes >= parseInt(this.filtros.ejes);

            // Retornamos true solo si cumple TODAS las condiciones
            return matchMarca && 
                matchModelo && 
                matchAnio && 
                matchEstado && 
                matchTransmision &&
                matchMotorM && 
                matchMotorMod && 
                matchPrecioMin && 
                matchPrecioMax && 
                matchEjes;
        });

        console.log('Filtros aplicados, resultados encontrados:', resultados.length);

        // Enviar los datos filtrados al componente padre
        this.dispatchEvent(new CustomEvent('filterapplied', {
            detail: { data: resultados }
        }));

        this.closeModal();
    }

    // Getters para opciones dinámicas
    get isModelDisabled() { return !this.filtros.marca; }

    get brandOptions() {
        const marcas = [...new Set(this.tracks.map(item => item.tracto?.Name || item.Name))];
        return marcas.map(m => ({ label: m, value: m }));
    }

    get modelOptions() {
        if (!this.filtros.marca) return [];
        const modelos = this.tracks
            .filter(item => (item.tracto?.Name || item.Name) === this.filtros.marca)
            .map(item => item.tracto?.Modelo__c || item.Modelo__c);
        return [...new Set(modelos)].map(m => ({ label: m, value: m }));
    }

    get transmissionOptions() {
    // Usamos Transmision__c que es el API Name que viene de tu consulta SOQL
        const transmisiones = [...new Set(this.tracks.map(item => item.tracto?.Transmision__c || item.Transmision__c))];
        
        // Filtramos valores nulos o vacíos para que no aparezcan en el combo
        return transmisiones
            .filter(t => t) 
            .map(t => ({ label: t, value: t }));
    }

    get statusOptions() {
        if (!this.tracks) return [];
        
        // Extraemos todos los estados únicos del campo Estado_de_la_Unidad__c
        const estados = [...new Set(this.tracks.map(item => 
            item.tracto?.Estado_de_la_Unidad__c || item.Estado_de_la_Unidad__c
        ))];
        
        // Formateamos para el combobox, eliminando valores nulos
        return estados
            .filter(est => est) 
            .map(est => ({ label: est, value: est }));
    }

    openModal() { this.isModalOpen = true; }
    closeModal() { this.isModalOpen = false; }
}