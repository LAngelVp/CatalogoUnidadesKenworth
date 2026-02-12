public with sharing class AlmacenamientoFirmaApex {
    
    @AuraEnabled
    public static Map<String, Object> guardarFirmaBase64(String recordId, String imagenFirma) {
        Map<String, Object> result = new Map<String, Object>{
            'success' => false,
            'message' => ''
        };
        
        try {
            if (String.isBlank(recordId) || String.isBlank(imagenFirma)) {
                result.put('message', 'Datos incompletos');
                return result;
            }
            
            final String base64Prefix = 'data:image/png;base64,';
            if (!imagenFirma.startsWith(base64Prefix)) {
                result.put('message', 'Formato de imagen no válido. Debe ser PNG en formato base64.');
                return result;
            }
            
            Vacacion__c vacacion;
            try {
                vacacion = [SELECT Id FROM Vacacion__c WHERE Id = :recordId LIMIT 1];
            } catch (Exception e) {
                result.put('success', false);
                result.put('message', 'Registro de vacación no encontrado o Id inválido');
                return result;
            }
            
            String base64Image = imagenFirma.substringAfter(',');
            
            if (base64Image.length() > 131072) {
                result.put('message', 'La firma es demasiado grande. Por favor, dibuje una firma más pequeña.');
                return result;
            }
            
            vacacion.FirmaEmpleado__c = base64Image;
            try {
                update vacacion;
            } catch (Exception e) {
                result.put('success', false);
                result.put('message', 'Error al guardar firma: ' + e.getMessage());
                return result;
            }
            
            result.put('success', true);
            result.put('message', 'Firma almacenada correctamente');
            
        } catch (Exception e) {
            result.put('success', false);
            result.put('message', 'Error al guardar firma: ' + e.getMessage());
            System.debug('Error en guardarFirmaBase64: ' + e.getStackTraceString());
        }
        
        return result;
    }
}
