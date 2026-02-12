public with sharing class EliminadorRegistrosEnObjeto {
    @AuraEnabled
    public static void eliminadorRegistrosEnObjeto(String nombreObjeto, Integer limite) {
        if (String.isBlank(nombreObjeto) || limite <= 0) {
            throw new IllegalArgumentException('El nombre del objeto y el límite deben ser valores válidos.');
        }

        String query = 'SELECT Id FROM ' + nombreObjeto + ' LIMIT ' + limite;
        List<SObject> registros = Database.query(query);
        System.debug('Registros encontrados: ' + registros.size());
        Integer totalRegistrosEliminados = registros.size();

        if (totalRegistrosEliminados > 0) {
            Database.delete(registros);
            System.debug('Registros eliminados: ' + totalRegistrosEliminados);
        }
        else {
            System.debug('No se encontraron registros para eliminar.');
        }
    }
}