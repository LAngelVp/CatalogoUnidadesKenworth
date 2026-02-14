public with sharing class TractosController {
    
    @AuraEnabled(cacheable=true)
    public static List<TractoWrapper> getTractos(String busqueda) {
        try {
            List<TractoCamionTractoLocator__c> tractos;
            
            if (String.isBlank(busqueda)) {
                tractos = [
                    SELECT Id, Name, Year_Modelo__c, Caballos_de_fuerza_HP__c, Camarote__c,
                    Capacidad_Ejes_Delanteros__c, Capacidad_Ejes_Traseros__c, Coordenada_Latitud__c,
                    Coordenada_Longitud__c, Correo_Contacto__c, Capacidad_de_Suspension__c,
                    Estado_de_la_Unidad__c, Imagen__c, Kilometraje__c, Marca_de_Motor__c,
                    Modelo__c, Modelo_del_Motor__c, Nombre_Contacto__c, Numero_del_Contacto__c,
                    NumeroVIN__c, Observaciones_Generales__c, Paso_de_Diferenciales__c,
                    Precio_Venta__c, Transmision__c
                    FROM TractoCamionTractoLocator__c 
                    ORDER BY CreatedDate DESC
                ];
            } else {
                String searchPattern = '%' + busqueda + '%';
                tractos = [
                    SELECT Id, Name, Year_Modelo__c, Caballos_de_fuerza_HP__c, Camarote__c,
                    Capacidad_Ejes_Delanteros__c, Capacidad_Ejes_Traseros__c, Coordenada_Latitud__c,
                    Coordenada_Longitud__c, Correo_Contacto__c, Capacidad_de_Suspension__c,
                    Estado_de_la_Unidad__c, Imagen__c, Kilometraje__c, Marca_de_Motor__c,
                    Modelo__c, Modelo_del_Motor__c, Nombre_Contacto__c, Numero_del_Contacto__c,
                    NumeroVIN__c, Observaciones_Generales__c, Paso_de_Diferenciales__c,
                    Precio_Venta__c, Transmision__c
                    FROM TractoCamionTractoLocator__c 
                    WHERE Name LIKE :searchPattern
                    ORDER BY Name
                ];
            }
            
            // 1. Initialize the return list
            List<TractoWrapper> wrappers = new List<TractoWrapper>();
            
            // 2. Map the SObject records to your Wrapper class
            for (TractoCamionTractoLocator__c t : tractos) {
                TractoWrapper tw = new TractoWrapper();
                tw.tracto = t;
                wrappers.add(tw);
            }
            
            // 3. RETURN the list
            return wrappers;
            
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            // Re-throwing as AuraHandledException is correct for LWC/Aura components
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    public class TractoWrapper {
        @AuraEnabled public TractoCamionTractoLocator__c tracto { get; set; }
    }
}