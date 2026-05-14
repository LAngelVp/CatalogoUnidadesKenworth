import { LightningElement, track } from 'lwc';
import IMAGEBOLETIN from '@salesforce/resourceUrl/PageOficial_imaget2000';

export default class IntranetHumanResourcesComponent extends LightningElement {
    @track birthdays = [
        { id: 1, name: 'Elena Martínez', dept: 'LOGÍSTICA', day: '12', photo: '' },
        { id: 2, name: 'Ricardo Soto', dept: 'MECÁNICA', day: '15', photo: '' },
        { id: 3, name: 'Luis Vega', dept: 'VENTAS', day: '22', photo: '' },
        { id: 4, name: 'Ana Gómez', dept: 'RH', day: '28', photo: '' }
    ];

    @track anniversaries = [
        { id: 1, name: 'Jorge Ramírez', years: '15', label: 'Años de Excelencia', icon: 'utility:favorite' },
        { id: 2, name: 'Patricia Luna', years: '10', label: 'Años de Compromiso', icon: 'utility:standard_objects' },
        { id: 3, name: 'Marco Torres', years: '5', label: 'Años de Trayectoria', icon: 'utility:outcome' }
    ];

    @track bulletins = [
        { 
            id: 1, 
            title: 'Nuevos protocolos de seguridad en taller', 
            tag: 'SEGURIDAD', 
            tagClass: 'tag-security',
            time: 'Hace 2 días',
            image: IMAGEBOLETIN
        },
        { 
            id: 2, 
            title: 'Programa de Mentoría Kenworth 2024', 
            tag: 'CULTURA', 
            tagClass: 'tag-culture',
            time: 'Hace 5 días',
            image: IMAGEBOLETIN
        },
        { 
            id: 3, 
            title: 'Actualización de Normas ISO 9001', 
            tag: 'SGC', 
            tagClass: 'tag-sgc',
            time: 'Hace 1 semana',
            image: IMAGEBOLETIN
        }
    ];

    get currentMonth() {
        return 'OCTUBRE';
    }
}