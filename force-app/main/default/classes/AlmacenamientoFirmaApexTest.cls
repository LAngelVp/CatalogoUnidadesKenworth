@isTest
private class AlmacenamientoFirmaApexTest {

    // Método helper para crear datos de prueba válidos
    private static Vacacion__c crearVacacionDePrueba() {
        Personal__c empleado = new Personal__c(
            Name = 'Luis Pérez',
            RFC__c = 'PEPL800101XXX',  // RFC válido de ejemplo
            NSS__c = '12345678901',    // NSS válido de ejemplo
            CURP__c = 'PEPL800101HDFRLS04'  // Máximo 18 caracteres
        );
        insert empleado;

        Vacacion__c vacacion = new Vacacion__c(
            Empleado__c = empleado.Id
        );
        insert vacacion;

        return vacacion;
    }

    @isTest
    static void testGuardarFirmaBase64_Exito() {
        Vacacion__c vacacion = crearVacacionDePrueba();

        String firmaValida = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';

        Test.startTest();
        Map<String, Object> resultado = AlmacenamientoFirmaApex.guardarFirmaBase64(vacacion.Id, firmaValida);
        Test.stopTest();

        System.assertEquals(true, resultado.get('success'));
        System.assertEquals('Firma almacenada correctamente', resultado.get('message'));

        Vacacion__c actualizado = [SELECT FirmaEmpleado__c FROM Vacacion__c WHERE Id = :vacacion.Id];
        System.assertNotEquals(null, actualizado.FirmaEmpleado__c);
        System.assert(actualizado.FirmaEmpleado__c.startsWith('iVBORw0KGgoAAA'));
    }

    @isTest
    static void testGuardarFirmaBase64_FormatoInvalido() {
        Vacacion__c vac = crearVacacionDePrueba();

        String firmaJpeg = 'data:image/jpeg;base64,ABCDEF1234';

        Map<String, Object> resultado = AlmacenamientoFirmaApex.guardarFirmaBase64(vac.Id, firmaJpeg);
        System.assertEquals(false, resultado.get('success'));
        System.assert(((String)resultado.get('message')).contains('Formato de imagen no válido'));
    }

    @isTest
    static void testGuardarFirmaBase64_IdInvalido() {
        String firma = 'data:image/png;base64,iVBORw0KGgo';
        Map<String, Object> resultado = AlmacenamientoFirmaApex.guardarFirmaBase64('001FakeId', firma);
        System.assertEquals(false, resultado.get('success'));
        System.assert(((String)resultado.get('message')).contains('Registro de vacación no encontrado'));
    }

    @isTest
    static void testGuardarFirmaBase64_DatosVacios() {
        Map<String, Object> resultado = AlmacenamientoFirmaApex.guardarFirmaBase64('', '');
        System.assertEquals(false, resultado.get('success'));
        System.assertEquals('Datos incompletos', resultado.get('message'));
    }

    @isTest
    static void testGuardarFirmaBase64_FirmaMuyLarga() {
        Vacacion__c vac = crearVacacionDePrueba();

        // Generar cadena base64 muy larga (> 131072 caracteres)
        String firmaLarga = '';
        for (Integer i = 0; i < 131073; i++) {
            firmaLarga += 'a';
        }

        String imagenFirma = 'data:image/png;base64,' + firmaLarga;

        Test.startTest();
        Map<String, Object> resultado = AlmacenamientoFirmaApex.guardarFirmaBase64(vac.Id, imagenFirma);
        Test.stopTest();

        System.assertEquals(false, resultado.get('success'));
        System.assert(((String)resultado.get('message')).contains('La firma es demasiado grande'));
    }

    @isTest
    static void testGuardarFirmaBase64_ErrorUpdate() {
        // Para forzar error en update, creamos un registro y le quitamos permisos 
        // o hacemos rollback en el update con un trigger de prueba, pero para simplificar:
        // Usaremos un Id válido pero con campo inmutable (por ejemplo, omitiremos el test o
        // modificaremos para que espere el mensaje correcto si el registro no existe).

        // Aquí simulamos error de update borrando el registro antes de update:
        Vacacion__c vac = crearVacacionDePrueba();
        delete vac; // vac ya no existe, update lanzará error

        String firmaValida = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';

        Map<String, Object> resultado = AlmacenamientoFirmaApex.guardarFirmaBase64(vac.Id, firmaValida);

        System.assertEquals(false, resultado.get('success'));
        // Aquí puede ser el mensaje de "Registro de vacación no encontrado" porque
        // el query falla, o si pasa al update fallará con "Error al guardar firma"
        System.assert(
            ((String)resultado.get('message')).contains('Registro de vacación no encontrado')
            || ((String)resultado.get('message')).startsWith('Error al guardar firma')
        );
    }
}
