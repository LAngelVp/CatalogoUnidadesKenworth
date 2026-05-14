import { LightningElement, track } from 'lwc';
import IMAGE_MOCK from '@salesforce/resourceUrl/PageOficial_imaget2000';

export default class IntranetQualityComponent extends LightningElement {
    @track activeTab = '5s'; // '5s' or 'sgc'
    @track selectedBranch = '';
    @track selectedDept5S = '';
    
    // 5S Data
    @track branches = [
        { label: 'Matriz CDMX', value: 'matriz' },
        { label: 'Sucursal Este', value: 'este' },
        { label: 'Sucursal Norte', value: 'norte' },
        { label: 'Sucursal Sur', value: 'sur' }
    ];

    @track departments5S = [
        { label: 'Taller', value: 'taller' },
        { label: 'Almacén', value: 'almacen' },
        { label: 'Ventas', value: 'ventas' },
        { label: 'Administración', value: 'admin' },
        { label: 'BI', value: 'bi' }
    ];

    @track s5SubSections = [
        { id: 1, title: 'Resultados de Evaluación 5S', icon: 'utility:chart', type: 'results', isNotResults: false },
        { id: 2, title: 'Formatos para tu Evaluación', icon: 'utility:edit_form', type: 'formats', isNotResults: true },
        { id: 3, title: 'Normas y Reglas 5S', icon: 'utility:rules', type: 'rules', isNotResults: true },
        { id: 4, title: 'Fondos de Escritorio', icon: 'utility:desktop', type: 'wallpapers', isNotResults: true },
        { id: 5, title: 'Bloqueo de Pantalla', icon: 'utility:lock', type: 'lockscreens', isNotResults: true }
    ];

    // Formatos Evaluación Data
    @track evaluationAreas = [
        { 
            name: 'Administración', 
            id: 'admin',
            note: 'Administración, Recepción, Servicio, CyC, MK, Refacciones, Compras, TI, BI, Contabilidad, Calidad.',
            items: [
                { sucursal: 'Corporativo', grupo: '1', depto: 'Administración' },
                { sucursal: 'Matriz', grupo: '2', depto: 'Recepción' },
                { sucursal: 'Matriz', grupo: '6', depto: 'CyC, MK, Refacciones, Compras, Post Venta' },
                { sucursal: 'TREBOL', grupo: '1', depto: 'Unidades Seminuevas' }
            ]
        },
        { 
            name: 'Refacciones', 
            id: 'refacciones',
            note: 'Refacciones, CyC y mantenimiento en diversas sucursales.',
            items: [
                { sucursal: 'MATRIZ', grupo: '1', depto: 'Refacciones' },
                { sucursal: 'TREBOL', grupo: '3', depto: 'Refacciones' },
                { sucursal: 'ORIZABA', grupo: '1', depto: 'Refacciones, CyC' }
            ]
        },
        { 
            name: 'Talleres', 
            id: 'talleres',
            note: 'Mecánica correctiva/preventiva, Bodyshop, Break Center, Servicio express.',
            items: [
                { sucursal: 'MATRIZ', grupo: '13', depto: 'Mecánica y administración preventiva' },
                { sucursal: 'VERACRUZ', grupo: '6', depto: 'Mecánica correctiva' }
            ]
        },
        { 
            name: 'Almacenes', 
            id: 'almacenes',
            note: 'Control y gestión de almacenes por sucursal.',
            items: [
                { sucursal: 'MATRIZ', grupo: '4', depto: 'Almacén' },
                { sucursal: 'TREBOL', grupo: '4', depto: 'Almacén' }
            ]
        },
        { 
            name: 'Limpieza, Mantenimiento y Vigilancia', 
            id: 'mantenimiento',
            note: 'Vigilancia, Limpieza, Mantenimiento y Seguridad.',
            items: [
                { sucursal: 'MATRIZ', grupo: '17', depto: 'Vigilancia' },
                { sucursal: 'MATRIZ', grupo: '18', depto: 'Limpieza' },
                { sucursal: 'MATRIZ', grupo: '19', depto: 'Mantenimiento y seguridad' }
            ]
        }
    ];

    @track normsList = [
        { id: 1, name: 'Estandares frigobar - refrigerador', url: '#' },
        { id: 2, name: 'Estandar de salas', url: '#' },
        { id: 3, name: 'Normas del comedor', url: '#' },
        { id: 4, name: 'Reglas del baño', url: '#' },
        { id: 5, name: 'Estándar de vestidores de técnicos', url: '#' },
        { id: 6, name: 'Estándar de recepción, matriz', url: '#' },
        { id: 7, name: 'Estándar de salas - Veracruz', url: '#' },
        { id: 8, name: 'Estándar de cocineta en comedor Veracruz', url: '#' }
    ];

    @track wallpapers = [
        { id: 1, name: 'Fondo Kenworth - Noche', image: IMAGE_MOCK },
        { id: 2, name: 'Fondo Kenworth - Carretera', image: IMAGE_MOCK },
        { id: 3, name: 'Fondo Kenworth - Corporativo', image: IMAGE_MOCK }
    ];

    @track lockscreens = [
        { id: 1, name: 'Bloqueo - T680', image: IMAGE_MOCK },
        { id: 2, name: 'Bloqueo - Logo Kenworth', image: IMAGE_MOCK },
        { id: 3, name: 'Bloqueo - Seguridad', image: IMAGE_MOCK }
    ];

    // SGC Data
    @track sgcDepartments = [
        { 
            id: 'ti', 
            name: 'Tecnologías de la Información', 
            icon: 'utility:setup',
            docs: {
                organigrama: [{ name: 'Organigrama TI 2024.pdf', url: '#' }],
                puestos: [{ name: 'Descriptor Puesto Dev.pdf', url: '#' }],
                procedimientos: [{ name: 'Gestión de Accesos.pdf', url: '#' }],
                politicas: [{ name: 'Política Seguridad Info.pdf', url: '#' }],
                guias: [{ name: 'Guía de Usuario ERP.pdf', url: '#' }],
                formatos: [{ name: 'Solicitud Equipo.xlsx', url: '#' }],
                anexos: [],
                diagramas: [{ name: 'Flujo Soporte.png', url: '#' }]
            }
        },
        { 
            id: 'rh', 
            name: 'Recursos Humanos', 
            icon: 'utility:people',
            docs: {
                organigrama: [{ name: 'Organigrama RH.pdf', url: '#' }],
                puestos: [{ name: 'Descriptor Reclutador.pdf', url: '#' }],
                procedimientos: [{ name: 'Onboarding.pdf', url: '#' }],
                politicas: [{ name: 'Política Vacaciones.pdf', url: '#' }],
                guias: [],
                formatos: [{ name: 'Formato Permiso.docx', url: '#' }],
                anexos: [],
                diagramas: []
            }
        }
    ];

    @track isModalOpen = false;
    @track isFormatsModalOpen = false;
    @track isNormsModalOpen = false;
    @track isWallpapersModalOpen = false;
    @track isLockscreensModalOpen = false;

    @track modalTitle = '';
    @track selectedSgcDept = null;
    @track selectedArea = null;

    // Tab Handlers
    handleTab5S() { this.activeTab = '5s'; }
    handleTabSGC() { this.activeTab = 'sgc'; }

    // 5S Handlers
    handleBranchChange(event) { this.selectedBranch = event.detail.value; }
    handleDept5SChange(event) { this.selectedDept5S = event.detail.value; }

    handleDownloadEvaluation() {
        if (!this.selectedBranch || !this.selectedDept5S) {
            alert('Por favor selecciona sucursal y departamento.');
            return;
        }
        alert(`Descargando evaluación para ${this.selectedBranch} - ${this.selectedDept5S}...`);
    }

    handleS5Click(event) {
        const type = event.currentTarget.dataset.type;
        if (type === 'formats') {
            this.selectedArea = this.evaluationAreas[0];
            this.isFormatsModalOpen = true;
        } else if (type === 'rules') {
            this.isNormsModalOpen = true;
        } else if (type === 'wallpapers') {
            this.isWallpapersModalOpen = true;
        } else if (type === 'lockscreens') {
            this.isLockscreensModalOpen = true;
        } else {
            alert(`Módulo de ${type} en desarrollo...`);
        }
    }

    handleAreaSelect(event) {
        const areaId = event.currentTarget.dataset.id;
        this.selectedArea = this.evaluationAreas.find(a => a.id === areaId);
    }

    closeFormatsModal() { this.isFormatsModalOpen = false; }
    closeNormsModal() { this.isNormsModalOpen = false; }
    closeWallpapersModal() { this.isWallpapersModalOpen = false; }
    closeLockscreensModal() { this.isLockscreensModalOpen = false; }

    // SGC Handlers
    handleSgcDeptClick(event) {
        const deptId = event.currentTarget.dataset.id;
        this.selectedSgcDept = this.sgcDepartments.find(d => d.id === deptId);
        this.modalTitle = `Documentación: ${this.selectedSgcDept.name}`;
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedSgcDept = null;
    }

    // Getters for UI
    get is5S() { return this.activeTab === '5s'; }
    get isSGC() { return this.activeTab === 'sgc'; }
    get tab5SClass() { return `tab-btn ${this.is5S ? 'active' : ''}`; }
    get tabSGCClass() { return `tab-btn ${this.isSGC ? 'active' : ''}`; }

    get downloadFormats() {
        return [
            { id: 1, name: '1. Evaluación', ext: 'Excel' },
            { id: 2, name: '2. Calendario de Tareas', ext: 'Excel' },
            { id: 3, name: '3. Lista de Necesarios', ext: 'Excel' }
        ];
    }

    get sgcDocCategories() {
        if (!this.selectedSgcDept) return [];
        const categories = [
            { key: 'organigrama', label: 'Organigrama' },
            { key: 'puestos', label: 'Puestos' },
            { key: 'procedimientos', label: 'Procedimientos' },
            { key: 'politicas', label: 'Políticas' },
            { key: 'guias', label: 'Guías' },
            { key: 'formatos', label: 'Formatos' },
            { key: 'anexos', label: 'Anexos' },
            { key: 'diagramas', label: 'Diagramas' }
        ];
        
        return categories.map(cat => {
            const files = this.selectedSgcDept.docs[cat.key] || [];
            const hasFiles = files.length > 0;
            return {
                ...cat,
                files: files,
                hasFiles: hasFiles,
                noFiles: !hasFiles,
                statusClass: hasFiles ? 'dot green' : 'dot gray'
            };
        });
    }
}