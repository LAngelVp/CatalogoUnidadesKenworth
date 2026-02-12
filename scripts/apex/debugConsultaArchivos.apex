try {
    // ID de un registro de PruebaCalidadDiagrama__c
    Id registroId = 'a0abc000006IDwDAAW';

    System.debug('ID de registro a consultar: ' + registroId);

    // 1. Obtener los ContentDocumentId
    List<ContentDocumentLink> links = [
        SELECT ContentDocumentId,
               ContentDocument.Title
        FROM ContentDocumentLink
        WHERE LinkedEntityId = :registroId
    ];

    System.debug('=== ARCHIVOS ENCONTRADOS ===');
    System.debug('Total archivos: ' + links.size());

    for(ContentDocumentLink link : links) {
        Id contentDocumentId = link.ContentDocumentId;

        // 2. Obtener la última versión publicada
        List<ContentVersion> versiones = [
            SELECT Id, Title, FileType, ContentSize, CreatedDate, LastModifiedDate
            FROM ContentVersion
            WHERE ContentDocumentId = :contentDocumentId
            ORDER BY VersionNumber DESC
            LIMIT 1
        ];

        if (!versiones.isEmpty()) {
            ContentVersion version = versiones[0];

            System.debug('--- Documento ---');
            System.debug('Título: ' + version.Title);
            System.debug('Tipo: ' + version.FileType);
            System.debug('Tamaño: ' + version.ContentSize + ' bytes');
            System.debug('Creado: ' + version.CreatedDate);
            System.debug('Modificado: ' + version.LastModifiedDate);
            System.debug('ContentVersionId: ' + version.Id);

            // ✅ URL para usar en Visualforce PDF
            System.debug('URL para PDF: /servlet/servlet.FileDownload?file=' + version.Id);
        }
    }
} catch(Exception e) {
    System.debug('Error: ' + e.getMessage());
    System.debug('Stack trace: ' + e.getStackTraceString());
}
