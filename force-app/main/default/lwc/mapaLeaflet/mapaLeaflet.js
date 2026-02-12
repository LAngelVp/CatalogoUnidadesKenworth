import { LightningElement, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import LEAFLET_RESOURCE from '@salesforce/resourceUrl/leaflet';

export default class MapaLeaflet extends LightningElement {
    @api tracksForMap = [];
    map;
    mapaTerminado = false;
    
    renderedCallback() {
        console.log('✅ DEBUGUEANDO EL MAPA, CREADO CON EXITO');
        console.log(`Total tracks recibidos: ${this.tracksForMap.length}`);
        if (this.map) return;
        this.initMap();
    }
    
    async initMap() {
        try {
            await loadStyle(this, LEAFLET_RESOURCE + '/leaflet/leaflet.css');
            await loadScript(this, LEAFLET_RESOURCE + '/leaflet/leaflet.js');
            this.createMap();
        } catch (error) {
            console.error('Error cargando mapa:', error);
        }
    }
    
    createMap() {
        const checkMapContainer = () => {
            const mapContainer = this.template.querySelector('.map-container');
            console.log('🔍 Buscando .map-container:', mapContainer);
            if (mapContainer) {
                this.map = L.map(mapContainer,{
                    maxBounds: [
                    [10.397963, -125.154309],  // Esquina suroeste (lat, lng)
                    [40.046243, -83.929856]    // Esquina noreste (lat, lng)
                ],
                maxBoundsViscosity: 1.0 
                }).setView([23.6345, -102.5528], 5);
                this.map.attributionControl.setPrefix('Propiedad de Kenworth DAF del Este');
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    minZoom: 5,
                    subdomains: ['a', 'b', 'c']
                }).addTo(this.map);
                console.log('✅ DEBUGUEANDO EL MAPA, CREADO CON EXITO');
                this.agregarPuntos();
                setTimeout(() => this.map.invalidateSize(), 100);
            } else {
                setTimeout(checkMapContainer, 50);
            }
        };
        checkMapContainer();
    }

    agregarPuntos() {
        const colors = ['#0176d3', '#2e844a', '#ba0517', '#f88962', '#906068'];
        let tracksConCoordenadas = 0;
        
        console.log('=== INICIO DEBUG TRACKS ===');
        console.log('Total tracks recibidos:', this.tracksForMap.length);
    
        this.tracksForMap.forEach((punto, index) => {
            // Para debug: ver todo el objeto
            console.log(`Track ${index}:`, punto);
            
            if (!punto || !punto.tracto) {
                console.log(`  ⚠️ Track ${index} no tiene objeto tracto`);
                return;
            }
            
            // Obtener valores como texto
            const latText = punto.tracto.Latitud_tracto__c;
            const lngText = punto.tracto.Longitud_tracto__c;
            
            console.log(`  Track "${punto.tracto.Name}":`);
            console.log(`    Latitud_tracto__c (texto): "${latText}"`);
            console.log(`    Longitud_tracto__c (texto): "${lngText}"`);
            console.log(`    Tipo lat: ${typeof latText}, Tipo lng: ${typeof lngText}`);
            
            // Convertir de texto a número
            const lat = parseFloat(latText);
            const lng = parseFloat(lngText);
            
            console.log(`    Latitud (número): ${lat}`);
            console.log(`    Longitud (número): ${lng}`);
            console.log(`    ¿Es NaN lat?: ${isNaN(lat)}`);
            console.log(`    ¿Es NaN lng?: ${isNaN(lng)}`);
            
            // Validar conversión
            const tieneCoordenadas = !isNaN(lat) && !isNaN(lng);
            
            if (tieneCoordenadas) {
                tracksConCoordenadas++;
                console.log(`    ✅ Coordenadas válidas: ${lat}, ${lng}`);
                
                L.circleMarker([lat, lng], {
                    color: colors[index % colors.length],
                    fillColor: colors[index % colors.length],
                    fillOpacity: 0.8,
                    radius: 8,
                    weight: 2
                })
                .addTo(this.map)
                .bindPopup(`
                    <div class="salesforce-popup">
                        <div class="popup-header" style="background: #0176d3;">
                            <h3 style="margin: 0; color: white; padding: 10px; font-size: 16px;">
                                📍 ${punto.tracto.Name}
                            </h3>
                        </div>
                        <div class="popup-content" style="padding: 15px;">
                            <div style="margin-bottom: 10px;">
                                <strong>Modelo:</strong> ${punto.tracto.modelo__c || 'N/A'}<br>
                                <strong>Estado:</strong> ${punto.tracto.status__c || 'N/A'}<br>
                                <strong>Precio:</strong> ${punto.tracto.price__c ? '$' + punto.tracto.price__c : 'N/A'}
                            </div>
                            <div style="background: #f3f2f2; padding: 8px; border-radius: 4px; font-size: 12px; color: #706e6b;">
                                📍 Coordenadas: ${lat}, ${lng}
                            </div>
                        </div>
                    </div>
                `);
            } else {
                console.log(`    ❌ Coordenadas inválidas o vacías`);
            }
        });
        
        console.log('=== FIN DEBUG TRACKS ===');
        console.log(`Se encontraron ${tracksConCoordenadas} tracks con coordenadas válidas de ${this.tracks.length} totales`);
        this.mapaTerminado = true;
        console.log('✅ DEBUGUEANDO EL MAPA, CREADO CON EXITO');
        if (tracksConCoordenadas === 0) {
            console.warn('⚠️ No se pudo mostrar ningún track en el mapa');
        }
    }
}