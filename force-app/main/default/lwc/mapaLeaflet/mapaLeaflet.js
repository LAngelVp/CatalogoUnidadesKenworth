import { LightningElement, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import LEAFLET_RESOURCE from '@salesforce/resourceUrl/leaflet';

export default class MapaLeaflet extends LightningElement {
    _tracksForMap = [];
    map;
    markerLayer; 
    isMapInitialized = false;
    marcaColorMap = new Map();
    @api 
    get tracksForMap() {
        return this._tracksForMap;
    }
    set tracksForMap(value) {
        this._tracksForMap = value;
        if (this.isMapInitialized) {
            this.refreshMarkers();
        }
    }

    renderedCallback() {
        if (this.isMapInitialized) return;
        this.initMap();
    }

    async initMap() {
        try {
            await Promise.all([
                loadStyle(this, LEAFLET_RESOURCE + '/leaflet/leaflet.css'),
                loadScript(this, LEAFLET_RESOURCE + '/leaflet/leaflet.js')
            ]);
            this.createMap();
        } catch (error) {
            console.error('Error cargando recursos de Leaflet:', error);
        }
    }

    createMap() {
        const mapContainer = this.template.querySelector('.map-container');
        if (mapContainer) {
            this.map = L.map(mapContainer, {
                maxBounds: [
                    [10.397963, -125.154309],
                    [40.046243, -83.929856]
                ],
                maxBoundsViscosity: 1.0 
            }).setView([23.6345, -102.5528], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                minZoom: 5,
                attribution: '© OpenStreetMap'
            }).addTo(this.map);

            this.map.attributionControl.setPrefix('Kenworth DAF del Este');

            this.markerLayer = L.layerGroup().addTo(this.map);
            
            this.isMapInitialized = true;
            this.refreshMarkers();

            setTimeout(() => {
                this.map.invalidateSize();
            }, 200);
        }
    }

    refreshMarkers() {
        if (!this.map || !this.markerLayer) return;
        this.markerLayer.clearLayers();
        const palette = ['#0176d3', '#2e844a', '#ba0517', '#f88962', '#906068', '#54698d', '#706e6b'];
        let colorIndex = 0;
        this._tracksForMap.forEach((punto) => {
            const lat = parseFloat(punto.tracto?.Coordenada_Latitud__c);
            const lng = parseFloat(punto.tracto?.Coordenada_Longitud__c);
            if (!isNaN(lat) && !isNaN(lng)) {
                const marca = punto.tracto.Name || 'Desconocida';
                if (!this.marcaColorMap.has(marca)) {
                    this.marcaColorMap.set(marca, palette[colorIndex % palette.length]);
                    colorIndex++;
                }
                const markerColor = this.marcaColorMap.get(marca);
                const marker = L.circleMarker([lat, lng], {
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 0.8,
                    radius: 8,
                    weight: 2
                }).bindPopup(this.getPopupContent(punto, lat, lng));
                this.markerLayer.addLayer(marker);
            }
        });
        this.ajustarVistaMapa();
    }
    getPopupContent(punto, lat, lng) {
        return `
            <div class="salesforce-popup">
                <div class="popup-header" style="background: #0176d3; color: white; padding: 8px; border-radius: 4px 4px 0 0;">
                    <h3 style="margin: 0; font-size: 14px;">📍 ${punto.tracto.Name}</h3>
                </div>
                <div class="popup-content" style="padding: 10px; border: 1px solid #ccc; border-top: none;">
                    <strong>Modelo:</strong> ${punto.tracto.Modelo__c || 'N/A'}<br>
                    <strong>Estado:</strong> ${punto.tracto.Estado_de_la_Unidad__c || 'N/A'}<br>
                    <strong>Precio:</strong> ${punto.tracto.Precio_Venta__c ? '$' + punto.tracto.Precio_Venta__c : 'N/A'}<br>
                    <div style="font-size: 10px; color: #777; margin-top: 5px;">Coord: ${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
                </div>
            </div>
        `;
    }
    ajustarVistaMapa() {
        const markers = this.markerLayer.getLayers();
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
        }
    }
}