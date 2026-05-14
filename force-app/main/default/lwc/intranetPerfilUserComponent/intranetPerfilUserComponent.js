import { LightningElement } from 'lwc';
import FOTOMIA from '@salesforce/resourceUrl/fotomia';

export default class IntranetPerfilUserComponent extends LightningElement {
    userPhoto = FOTOMIA;

    userData = {
        name: 'Ángel Vallejo',
        position: 'Desarrollador Senior de Sistemas',
        department: 'Tecnologías de la Información',
        email: 'angel.vallejo@kenworth.com.mx',
        phone: '+52 (55) 1234 5678 Ext. 104',
        birthdate: '15 de Mayo de 1990',
        location: 'Matriz - Ciudad de México',
        employeeNumber: 'KW-2024-085',
        joinDate: '10 de Marzo de 2020',
        manager: 'Ing. Jessica Garcia Silvaran',
        contractType: 'Planta / Tiempo Indeterminado',
        yearsOfService: '3',
        emergencyContact: {
            name: 'Rosa Perez',
            relation: 'Madre',
            phone: '+52 (55) 9876 5432'
        }
    };
}
