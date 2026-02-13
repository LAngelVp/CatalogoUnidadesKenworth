
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
            
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
    
    public class TractoWrapper {
        @AuraEnabled public tracto__c tracto { get; set; }
    }
}