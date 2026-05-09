import { LightningElement } from 'lwc';
import IMAGE_BRANCHHERO from '@salesforce/resourceUrl/PageOficial_SucursalCamiones';
import IMAGE_SUCURSAL1 from '@salesforce/resourceUrl/PageOficial_imagew900';
import IMAGE_SUCURSAL2 from '@salesforce/resourceUrl/PageOficial_imaget680';
import IMAGE_SUCURSAL3 from '@salesforce/resourceUrl/PageOficial_imaget880';
import IMAGE_SUCURSAL4 from '@salesforce/resourceUrl/PageOficial_imaget2000';

export default class PageOficialBranchesComponent extends LightningElement {
    imgBranchHero = IMAGE_BRANCHHERO;
    imgSucursal1 = IMAGE_SUCURSAL1;
    imgSucursal2 = IMAGE_SUCURSAL2;
    imgSucursal3 = IMAGE_SUCURSAL3;
    imgSucursal4 = IMAGE_SUCURSAL4;

    branches = [
        {
            id: '1',
            name: 'MATRIZ - VENTA PARADA',
            description: 'Nuestra matriz principal, ofreciendo el más amplio inventario de unidades y un servicio de taller especializado para mantener su flota en las mejores condiciones.',
            address: 'Km 9 + 700 Carretera Federal Córdoba-Veracruz s/n, Col. Venta Parada Amatlán de los Reyes, Ver. C.P.94954',
            phone: '271 717 1414 y 271 717 1410',
            image: this.imgSucursal1,
            containerClass: 'branch-section left-image hidden-scroll'
        },
        {
            id: '2',
            name: 'VILLAHERMOSA',
            description: 'Punto estratégico en el sureste, brindando atención integral en ventas, refacciones y servicio técnico certificado por Kenworth.',
            address: 'Carretera Villahermosa-Cárdenas Km. 8.5 S/N, Col. Ranchería Lázaro Cárdenas 2A Sección. C.P. 86287',
            phone: '993 317 0071',
            image: this.imgSucursal2,
            containerClass: 'branch-section right-image hidden-scroll'
        },
        {
            id: '3',
            name: 'TRÉBOL',
            description: 'Ubicación clave sobre la autopista, diseñada para ofrecer soporte rápido y eficiente a los transportistas en ruta.',
            address: 'Autopista Córdoba-México S/N, Trébol de la Luz, Col. Francisco I. Madero, Córdoba, Ver. C.P. 94542',
            phone: '271 714 7727 y 271 714 7788',
            image: this.imgSucursal3,
            containerClass: 'branch-section left-image hidden-scroll'
        },
        {
            id: '4',
            name: 'VERACRUZ',
            description: 'Instalaciones de primer nivel en el puerto, ideales para adquirir tractocamiones nuevos y usados con los mejores planes de financiamiento.',
            address: 'Carretera Federal 180 Tramo Náutla-Veracruz, Chalchihuecan, Veracruz, Ver. C.P. 91808',
            phone: '229 924 0155',
            image: this.imgSucursal4,
            containerClass: 'branch-section right-image hidden-scroll'
        },
        {
            id: '5',
            name: 'ORIZABA',
            description: 'Brindando soporte en la región de las altas montañas con un inventario completo de refacciones originales.',
            address: 'Camino Nacional, Número 48-A, Col. Los Pinos, Río Blanco, Ver. CP. 94732',
            phone: '272 727 5422 y 272 727 3432',
            image: this.imgSucursal1,
            containerClass: 'branch-section left-image hidden-scroll'
        },
        {
            id: '6',
            name: 'TEHUACÁN',
            description: 'Su socio de confianza en Puebla, ofreciendo asesoría experta y servicio de mantenimiento preventivo y correctivo.',
            address: 'Calz. Adolfo López Mateos No.4210, Col. San Lorenzo Teotipilco, Tehuacán, Pue. C.P. 75855',
            phone: '238 392 0140',
            image: this.imgSucursal2,
            containerClass: 'branch-section right-image hidden-scroll'
        },
        {
            id: '7',
            name: 'COATZACOALCOS',
            description: 'Atendiendo al sur de Veracruz con un equipo altamente capacitado para resolver cualquier necesidad de tu equipo pesado.',
            address: 'Aquiles Serdán No. 612, Manuel Ávila Camacho, Coatzacoalcos, Ver. C.P.96420',
            phone: '921 215 5406',
            image: this.imgSucursal3,
            containerClass: 'branch-section left-image hidden-scroll'
        },
        {
            id: '8',
            name: 'OAXACA',
            description: 'Conectando el transporte en el estado, nuestra sucursal garantiza refacciones disponibles y atención personalizada.',
            address: 'Camino a San Jacinto Amilpas No. 174, Col. Granjas y Huertos Brenamiel. San Jacinto Amilpas, Oax. C.P. 68285',
            phone: '951 549 2510',
            image: this.imgSucursal4,
            containerClass: 'branch-section right-image hidden-scroll'
        },
        {
            id: '9',
            name: 'MÉRIDA',
            description: 'Líderes en el mercado peninsular, comprometidos con el rendimiento y rentabilidad de su negocio a través de soluciones Kenworth.',
            address: 'Calle 32 Número 600, Col. El Roble Agrícola Mérida, Yucatán. C.P. 97295',
            phone: '999 689 3552',
            image: this.imgSucursal1,
            containerClass: 'branch-section left-image hidden-scroll'
        },
        {
            id: '10',
            name: 'TUXTLA GUTIÉRREZ, CHIAPAS',
            description: 'Respaldando a los transportistas chiapanecos con la calidad, fuerza y durabilidad que solo Kenworth puede ofrecer.',
            address: 'Col. Plan de Ayala Ampliación Sur, Blv. Bosques de la Trinidad. C.P. 29020',
            phone: '961 689 0751',
            image: this.imgSucursal2,
            containerClass: 'branch-section right-image hidden-scroll'
        }
    ];

    observerInitialized = false;

    renderedCallback() {
        if (this.observerInitialized) {
            return;
        }
        
        const sections = this.template.querySelectorAll('.branch-section');
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