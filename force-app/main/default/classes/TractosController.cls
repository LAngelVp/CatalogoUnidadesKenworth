
public with sharing class TractosController {
    
    @AuraEnabled(cacheable=true)
    public static List<TractoWrapper> getTractos(String busqueda) {
        try {
            List<tracto__c> tractos;
            
            if (String.isBlank(busqueda)) {
                tractos = [
                    SELECT Id, Name, modelo__c, price__c, 
                           status__c, vin__c, year__c, CreatedDate, Latitud_tracto__c, Longitud_tracto__c
                    FROM tracto__c 
                    ORDER BY CreatedDate DESC
                ];
            } else {
                String searchPattern = '%' + busqueda + '%';
                tractos = [
                    SELECT Id, Name, modelo__c, price__c,
                           status__c, vin__c, year__c, CreatedDate, Latitud_tracto__c, Longitud_tracto__c
                    FROM tracto__c 
                    WHERE Name LIKE :searchPattern
                    ORDER BY Name
                ];
            }
            
            Set<Id> tractoIds = new Set<Id>();
            for (tracto__c t : tractos) {
                tractoIds.add(t.Id);
            }
            
            // Map para almacenar LISTA de imágenes por tracto
            Map<Id, List<String>> imagenesPorTracto = new Map<Id, List<String>>();
            
            if (!tractoIds.isEmpty()) {
                // Consultar TODAS las imágenes
                List<ContentDocumentLink> links = [
                    SELECT Id, LinkedEntityId, ContentDocumentId,
                           ContentDocument.Title, ContentDocument.FileExtension
                    FROM ContentDocumentLink 
                    WHERE LinkedEntityId IN :tractoIds
                    AND ContentDocument.FileExtension IN ('jpg', 'jpeg', 'png', 'gif', 'webp')
                    ORDER BY ContentDocument.CreatedDate DESC
                ];
                
                // Para cada link, obtener URL y agregar a la lista
                for (ContentDocumentLink link : links) {
                    String fileUrl = '/sfc/servlet.shepherd/version/download/' + 
                                    getUltimaVersionId(link.ContentDocumentId);
                    
                    if (!imagenesPorTracto.containsKey(link.LinkedEntityId)) {
                        imagenesPorTracto.put(link.LinkedEntityId, new List<String>());
                    }
                    imagenesPorTracto.get(link.LinkedEntityId).add(fileUrl);
                }
            }

            Integer totalImagenes = 0;
            Integer tractosConImagenes = 0;

            for(List<String> listaImagenes : imagenesPorTracto.values()) {
                if(listaImagenes != null && !listaImagenes.isEmpty()) {
                    totalImagenes += listaImagenes.size();
                    tractosConImagenes++;
                }
            }
            
            // Crear wrappers
            List<TractoWrapper> wrappers = new List<TractoWrapper>();
            for (tracto__c t : tractos) {
                TractoWrapper wrapper = new TractoWrapper();
                wrapper.tracto = t;
                wrapper.imagenes = imagenesPorTracto.get(t.Id); // Lista de imágenes
                wrapper.imagenPrincipal = imagenesPorTracto.containsKey(t.Id) && 
                                         !imagenesPorTracto.get(t.Id).isEmpty() ? 
                                         imagenesPorTracto.get(t.Id)[0] : null;
                wrappers.add(wrapper);
            }
            
            return wrappers;
            
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
    
    private static Id getUltimaVersionId(Id contentDocumentId) {
        try {
            ContentVersion cv = [
                SELECT Id FROM ContentVersion 
                WHERE ContentDocumentId = :contentDocumentId 
                AND IsLatest = true LIMIT 1
            ];
            return cv.Id;
        } catch (Exception e) {
            return null;
        }
    }
    
    public class TractoWrapper {
        @AuraEnabled public tracto__c tracto { get; set; }
        @AuraEnabled public List<String> imagenes { get; set; } // TODAS las imágenes
        @AuraEnabled public String imagenPrincipal { get; set; } // Primera imagen
    }
}