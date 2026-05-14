import { LightningElement, track } from 'lwc';

export default class IntranetEmployesDirectoryComponent extends LightningElement {
    @track searchTerm = '';
    
    // Mock data for employees
    @track allEmployees = [
        { id: 1, name: 'Ángel Vallejo', position: 'Desarrollador Senior', department: 'BI', extension: '104', branch: 'Matriz CDMX', email: 'angel.vallejo@kenworth.com.mx', initials: 'AV' },
        { id: 2, name: 'Jessica García Silvarán', position: 'Gerente de BI', department: 'BI', extension: '201', branch: 'Matriz CDMX', email: 'jessica.garcia@kenworth.com.mx', initials: 'JG' },
        { id: 3, name: 'Pedro Sánchez', position: 'Analista de Sistemas', department: 'BI', extension: '105', branch: 'Sucursal Este', email: 'pedro.sanchez@kenworth.com.mx', initials: 'RS' },
        { id: 4, name: 'María Pérez', position: 'Coordinadora de RH', department: 'Recursos Humanos', extension: '305', branch: 'Sucursal Norte', email: 'maria.perez@kenworth.com.mx', initials: 'MP' },
        { id: 5, name: 'Carlos Luna', position: 'Ventas Unidades', department: 'Ventas', extension: '412', branch: 'Sucursal Sur', email: 'carlos.luna@kenworth.com.mx', initials: 'CL' },
        { id: 6, name: 'Ana Beltrán', position: 'Contadora', department: 'Finanzas', extension: '502', branch: 'Matriz CDMX', email: 'ana.beltran@kenworth.com.mx', initials: 'AB' },
        { id: 7, name: 'Fernando Ruiz', position: 'Técnico Master', department: 'Servicio', extension: '615', branch: 'Sucursal Este', email: 'fernando.ruiz@kenworth.com.mx', initials: 'FR' },
        { id: 8, name: 'Lucía Torres', position: 'Recepción', department: 'Administración', extension: '100', branch: 'Matriz CDMX', email: 'lucia.torres@kenworth.com.mx', initials: 'LT' },
        { id: 9, name: 'Ricardo Gómez', position: 'Asesor de Refacciones', department: 'Refacciones', extension: '220', branch: 'Sucursal Norte', email: 'ricardo.gomez@kenworth.com.mx', initials: 'RG' },
        { id: 10, name: 'Sofía Herrera', position: 'Analista Contable', department: 'Finanzas', extension: '503', branch: 'Matriz CDMX', email: 'sofia.herrera@kenworth.com.mx', initials: 'SH' },
        { id: 11, name: 'Manuel Ortiz', position: 'Logística', department: 'Operaciones', extension: '880', branch: 'Sucursal Sur', email: 'manuel.ortiz@kenworth.com.mx', initials: 'MO' },
        { id: 12, name: 'Gabriela Meza', position: 'Marketing Digital', department: 'Ventas', extension: '450', branch: 'Matriz CDMX', email: 'gabriela.meza@kenworth.com.mx', initials: 'GM' },
        { id: 13, name: 'Héctor Vega', position: 'Jefe de Taller', department: 'Servicio', extension: '610', branch: 'Sucursal Este', email: 'hector.vega@kenworth.com.mx', initials: 'HV' },
        { id: 14, name: 'Paola Díaz', position: 'Especialista RH', department: 'Recursos Humanos', extension: '310', branch: 'Matriz CDMX', email: 'paola.diaz@kenworth.com.mx', initials: 'PD' },
        { id: 15, name: 'Javier Castro', position: 'Soporte Técnico', department: 'BI', extension: '106', branch: 'Sucursal Norte', email: 'javier.castro@kenworth.com.mx', initials: 'JC' },
        { id: 16, name: 'Mónica Rivas', position: 'Crédito y Cobranza', department: 'Finanzas', extension: '515', branch: 'Matriz CDMX', email: 'monica.rivas@kenworth.com.mx', initials: 'MR' },
        { id: 17, name: 'Daniel Silva', position: 'Ventas Refacciones', department: 'Refacciones', extension: '225', branch: 'Sucursal Sur', email: 'daniel.silva@kenworth.com.mx', initials: 'DS' },
        { id: 18, name: 'Beatriz Mendoza', position: 'Secretaria Ejecutiva', department: 'Administración', extension: '102', branch: 'Matriz CDMX', email: 'beatriz.mendoza@kenworth.com.mx', initials: 'BM' },
        { id: 19, name: 'Sergio Ramos', position: 'Técnico A', department: 'Servicio', extension: '620', branch: 'Sucursal Norte', email: 'sergio.ramos@kenworth.com.mx', initials: 'SR' },
        { id: 20, name: 'Elena Flores', position: 'Gerente de Ventas', department: 'Ventas', extension: '400', branch: 'Sucursal Este', email: 'elena.flores@kenworth.com.mx', initials: 'EF' },
        { id: 21, name: 'Oscar Lara', position: 'Almacenista', department: 'Refacciones', extension: '230', branch: 'Matriz CDMX', email: 'oscar.lara@kenworth.com.mx', initials: 'OL' },
        { id: 22, name: 'Adriana Pineda', position: 'Auxiliar Contable', department: 'Finanzas', extension: '505', branch: 'Sucursal Norte', email: 'adriana.pineda@kenworth.com.mx', initials: 'AP' },
        { id: 23, name: 'Luis Morales', position: 'Chofer', department: 'Operaciones', extension: '885', branch: 'Sucursal Sur', email: 'luis.morales@kenworth.com.mx', initials: 'LM' },
        { id: 24, name: 'Karla Rojas', position: 'Community Manager', department: 'Ventas', extension: '455', branch: 'Matriz CDMX', email: 'karla.rojas@kenworth.com.mx', initials: 'KR' },
        { id: 25, name: 'Roberto Valdés', position: 'Mecánico Diesel', department: 'Servicio', extension: '625', branch: 'Sucursal Este', email: 'roberto.valdes@kenworth.com.mx', initials: 'RV' },
        { id: 26, name: 'Isabel Cruz', position: 'Nóminas', department: 'Recursos Humanos', extension: '320', branch: 'Matriz CDMX', email: 'isabel.cruz@kenworth.com.mx', initials: 'IC' },
        { id: 27, name: 'Felipe Jasso', position: 'DBA', department: 'BI', extension: '108', branch: 'Matriz CDMX', email: 'felipe.jasso@kenworth.com.mx', initials: 'FJ' },
        { id: 28, name: 'Martha Solís', position: 'Facturación', department: 'Finanzas', extension: '520', branch: 'Sucursal Sur', email: 'martha.solis@kenworth.com.mx', initials: 'MS' },
        { id: 29, name: 'Raúl Jiménez', position: 'Ventas Camiones', department: 'Ventas', extension: '415', branch: 'Sucursal Norte', email: 'raul.jimenez@kenworth.com.mx', initials: 'RJ' },
        { id: 30, name: 'Patricia Orozco', position: 'Asistente RH', department: 'Recursos Humanos', extension: '325', branch: 'Sucursal Este', email: 'patricia.orozco@kenworth.com.mx', initials: 'PO' },
        { id: 31, name: 'Enrique Galván', position: 'Inventarios', department: 'Refacciones', extension: '235', branch: 'Matriz CDMX', email: 'enrique.galvan@kenworth.com.mx', initials: 'EG' },
        { id: 32, name: 'Claudia Navarrete', position: 'Tesorería', department: 'Finanzas', extension: '525', branch: 'Matriz CDMX', email: 'claudia.navarrete@kenworth.com.mx', initials: 'CN' },
        { id: 33, name: 'Ignacio Prado', position: 'Seguridad', department: 'Administración', extension: '110', branch: 'Sucursal Sur', email: 'ignacio.prado@kenworth.com.mx', initials: 'IP' },
        { id: 34, name: 'Verónica Montes', position: 'Telemarketing', department: 'Ventas', extension: '460', branch: 'Sucursal Norte', email: 'veronica.montes@kenworth.com.mx', initials: 'VM' },
        { id: 35, name: 'Armando Cárdenas', position: 'Eléctrico', department: 'Servicio', extension: '630', branch: 'Matriz CDMX', email: 'armando.cardenas@kenworth.com.mx', initials: 'AC' },
        { id: 36, name: 'Yolanda Suárez', position: 'Capacitación', department: 'Recursos Humanos', extension: '330', branch: 'Sucursal Este', email: 'yolanda.suarez@kenworth.com.mx', initials: 'YS' },
        { id: 37, name: 'Hugo Méndez', position: 'Redes y Comunicaciones', department: 'BI', extension: '112', branch: 'Matriz CDMX', email: 'hugo.mendez@kenworth.com.mx', initials: 'HM' },
        { id: 38, name: 'Lorena Paredes', position: 'Auditoría Interna', department: 'Finanzas', extension: '530', branch: 'Matriz CDMX', email: 'lorena.paredes@kenworth.com.mx', initials: 'LP' },
        { id: 39, name: 'Gustavo Villalba', position: 'Ventas Flotillas', department: 'Ventas', extension: '420', branch: 'Sucursal Sur', email: 'gustavo.villalba@kenworth.com.mx', initials: 'GV' },
        { id: 40, name: 'Silvia Castillo', position: 'Compras', department: 'Administración', extension: '115', branch: 'Matriz CDMX', email: 'silvia.castillo@kenworth.com.mx', initials: 'SC' },
        { id: 41, name: 'Mario Espinoza', position: 'Técnico B', department: 'Servicio', extension: '635', branch: 'Sucursal Norte', email: 'mario.espinoza@kenworth.com.mx', initials: 'ME' },
        { id: 42, name: 'Cristina León', position: 'Psicóloga RH', department: 'Recursos Humanos', extension: '335', branch: 'Sucursal Este', email: 'cristina.leon@kenworth.com.mx', initials: 'CL' },
        { id: 43, name: 'Alberto Núñez', position: 'Programador BI', department: 'BI', extension: '115', branch: 'Matriz CDMX', email: 'alberto.nunez@kenworth.com.mx', initials: 'AN' },
        { id: 44, name: 'Sandra Villegas', position: 'Analista Financiero', department: 'Finanzas', extension: '535', branch: 'Sucursal Sur', email: 'sandra.villegas@kenworth.com.mx', initials: 'SV' },
        { id: 45, name: 'Pablo Domínguez', position: 'Entrega de Unidades', department: 'Ventas', extension: '425', branch: 'Sucursal Norte', email: 'pablo.dominguez@kenworth.com.mx', initials: 'PD' },
        { id: 46, name: 'Julia Serrano', position: 'Servicio al Cliente', department: 'Administración', extension: '120', branch: 'Matriz CDMX', email: 'julia.serrano@kenworth.com.mx', initials: 'JS' },
        { id: 47, name: 'Andrés Aguilar', position: 'Laminado y Pintura', department: 'Servicio', extension: '640', branch: 'Sucursal Este', email: 'andres.aguilar@kenworth.com.mx', initials: 'AA' },
        { id: 48, name: 'Estela Guerra', position: 'Relaciones Laborales', department: 'Recursos Humanos', extension: '340', branch: 'Matriz CDMX', email: 'estela.guerra@kenworth.com.mx', initials: 'EG' },
        { id: 49, name: 'Mauricio Peralta', position: 'Analista BI', department: 'BI', extension: '118', branch: 'Sucursal Sur', email: 'mauricio.peralta@kenworth.com.mx', initials: 'MP' },
        { id: 50, name: 'Rosa Linda Campos', position: 'Impuestos', department: 'Finanzas', extension: '540', branch: 'Matriz CDMX', email: 'rosalinda.campos@kenworth.com.mx', initials: 'RC' }
    ];



    handleSearch(event) {
        this.searchTerm = event.target.value.toLowerCase();
    }

    get filteredEmployees() {
        if (!this.searchTerm) {
            return this.allEmployees;
        }
        return this.allEmployees.filter(emp => 
            emp.name.toLowerCase().includes(this.searchTerm) ||
            emp.department.toLowerCase().includes(this.searchTerm) ||
            emp.position.toLowerCase().includes(this.searchTerm) ||
            emp.branch.toLowerCase().includes(this.searchTerm)
        );
    }
}