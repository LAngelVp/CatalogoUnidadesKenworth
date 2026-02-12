
@IsTest
private class EliminadorRegistrosEnObjetoTest {
    
    @IsTest
    static void testEliminacionExitosa() {
        // Crear datos de prueba
        List<Account> cuentas = new List<Account>();
        for(Integer i = 0; i < 5; i++) {
            cuentas.add(new Account(Name = 'Test ' + i));
        }
        insert cuentas;
        
        Integer cuentaInicial = [SELECT COUNT() FROM Account];
        
        Test.startTest();
        EliminadorRegistrosEnObjeto.eliminadorRegistrosEnObjeto('Account', 3);
        Test.stopTest();
        
        Integer cuentaFinal = [SELECT COUNT() FROM Account];
        System.assertEquals(cuentaInicial - 3, cuentaFinal);
    }
    
    @IsTest
    static void testValidaciones() {
        // Test nombre vacío
        try {
            EliminadorRegistrosEnObjeto.eliminadorRegistrosEnObjeto('', 5);
            System.assert(false, 'Debería lanzar excepción');
        } catch (IllegalArgumentException e) {
            System.assert(true);
        }
        
        // Test límite cero
        try {
            EliminadorRegistrosEnObjeto.eliminadorRegistrosEnObjeto('Account', 0);
            System.assert(false, 'Debería lanzar excepción');
        } catch (IllegalArgumentException e) {
            System.assert(true);
        }
    }
}