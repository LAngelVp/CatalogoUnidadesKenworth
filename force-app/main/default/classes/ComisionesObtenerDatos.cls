public with sharing class ComisionesObtenerDatos {
    
    public static List<ObjetoComision__c> obtenerRegistros() {
        return [
            SELECT Id, Name FROM ObjetoComision__c
            WHERE Fecha__c = LAST_MONTH
        ];
    }
    
    // MÉTODO ORIGINAL (mantenido para compatibilidad)
    public static String crearExcel(){
        List<ObjetoComision__c> registros = obtenerRegistros();
        String imagenBase64 = obtenerImagenBase64();
        
        String xml = '<?xml version="1.0"?>' +
            '<?mso-application progid="Excel.Sheet"?>' +
            '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ' +
            'xmlns:o="urn:schemas-microsoft-com:office:office" ' +
            'xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
            'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ' +
            'xmlns:html="http://www.w3.org/TR/REC-html40">' +
            '<Worksheet ss:Name="Comisiones">' +
            '<Table>';
        
        if(imagenBase64 != null) {
            xml += '<Row>' +
                '<Cell ss:MergeAcross="1">' +
                '<Data ss:Type="String">' +
                '<html>' +
                '<img src="data:image/png;base64,' + imagenBase64 + '" ' +
                'width="150" height="50"/>' +
                '</html>' +
                '</Data>' +
                '</Cell>' +
                '</Row>' +
                '<Row>' +
                '<Cell><Data ss:Type="String"></Data></Cell>' +
                '<Cell><Data ss:Type="String"></Data></Cell>' +
                '</Row>';
        }
        
        xml += '<Row>' +
            '<Cell><Data ss:Type="String">ID</Data></Cell>' +
            '<Cell><Data ss:Type="String">NOMBRE</Data></Cell>' +
            '</Row>';
        
        for(ObjetoComision__c reg : registros){
            xml += '<Row>' +
                '<Cell><Data ss:Type="String">' + reg.Id + '</Data></Cell>' +
                '<Cell><Data ss:Type="String">' + reg.Name + '</Data></Cell>' +
                '</Row>';
        }
        
        xml += '</Table></Worksheet></Workbook>';
        return xml;
    }
    
    // MÉTODO ORIGINAL (mantenido)
    public static Id descargarExcel(){
        String contenidoXML = crearExcel();
        Blob xmlBlob = Blob.valueOf(contenidoXML);
        
        String fechaActual = Datetime.now().format('yyyy-MM-dd');
        String fileName = 'Comisiones_' + fechaActual + '.xls';
        
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.VersionData = xmlBlob;
        cv.ContentLocation = 'S';
        
        insert cv;
        return cv.Id;
    }
    
    // ========== NUEVO MÉTODO CON NPOI ==========
    
    // 4. MÉTODO PARA GENERAR EXCEL REAL CON NPOI (CON IMAGEN INCORPORADA)
    public static Id generarExcelNPOI() {
        try {
            // Obtener datos
            List<ObjetoComision__c> registros = obtenerRegistros();
            
            // Crear nuevo workbook Excel (.xlsx)
            NPOI.XSSF.Workbook workbook = new NPOI.XSSF.Workbook();
            
            // Crear hoja de trabajo
            NPOI.SS.Usermodel.Sheet sheet = workbook.createSheet('Comisiones');
            
            // Agregar imagen del logo
            agregarLogoANPOI(workbook, sheet);
            
            // Crear estilos
            Map<String, NPOI.SS.Usermodel.CellStyle> estilos = crearEstilosNPOI(workbook);
            
            // Definir posición inicial (después del logo)
            Integer filaActual = 5; // Dejar espacio para el logo
            
            // Crear fila de encabezados
            NPOI.SS.Usermodel.Row headerRow = sheet.createRow(filaActual);
            
            // Crear celdas de encabezado
            String[] encabezados = new String[]{'ID', 'NOMBRE'};
            for (Integer i = 0; i < encabezados.size(); i++) {
                NPOI.SS.Usermodel.Cell cell = headerRow.createCell(i);
                cell.setCellValue(encabezados[i]);
                cell.setCellStyle(estilos.get('header'));
                // Autoajustar ancho de columna
                sheet.autoSizeColumn(i);
            }
            
            filaActual++;
            
            // Agregar datos
            for (ObjetoComision__c reg : registros) {
                NPOI.SS.Usermodel.Row dataRow = sheet.createRow(filaActual);
                
                // Celda ID
                NPOI.SS.Usermodel.Cell cellId = dataRow.createCell(0);
                cellId.setCellValue(reg.Id);
                cellId.setCellStyle(estilos.get('texto'));
                
                // Celda Nombre
                NPOI.SS.Usermodel.Cell cellNombre = dataRow.createCell(1);
                cellNombre.setCellValue(reg.Name != null ? reg.Name : '');
                cellNombre.setCellStyle(estilos.get('texto'));
                
                filaActual++;
            }
            
            // Autoajustar todas las columnas
            for (Integer i = 0; i < encabezados.size(); i++) {
                sheet.autoSizeColumn(i);
            }
            
            // Opcional: Congelar paneles (fijar encabezados)
            sheet.createFreezePane(0, 6); // Congelar después de la fila 6
            
            // Convertir workbook a Blob
            Blob excelBlob = workbook.writeToBlob();
            
            // Crear nombre de archivo con fecha
            String fechaActual = Datetime.now().format('yyyy-MM-dd_HHmm');
            String fileName = 'Comisiones_' + fechaActual + '.xlsx';
            
            // Guardar como ContentVersion
            ContentVersion cv = new ContentVersion();
            cv.Title = fileName;
            cv.PathOnClient = fileName;
            cv.VersionData = excelBlob;
            cv.ContentLocation = 'S';
            
            insert cv;
            
            System.debug('✅ Excel NPOI generado exitosamente: ' + fileName);
            return cv.Id;
            
        } catch (Exception e) {
            System.debug('❌ Error generando Excel NPOI: ' + e.getMessage());
            System.debug('Stack trace: ' + e.getStackTraceString());
            
            // Fallback: usar método original si NPOI falla
            try {
                System.debug('🔄 Intentando método original como fallback...');
                return descargarExcel();
            } catch (Exception e2) {
                throw new AuraHandledException('Error generando Excel: ' + e.getMessage());
            }
        }
    }
    
    // Método auxiliar para agregar logo con NPOI
    private static void agregarLogoANPOI(NPOI.XSSF.Workbook workbook, NPOI.SS.Usermodel.Sheet sheet) {
        try {
            // Obtener imagen del StaticResource
            List<StaticResource> recursos = [
                SELECT Body, ContentType 
                FROM StaticResource 
                WHERE Name = 'logo_daf' 
                LIMIT 1
            ];
            
            if (!recursos.isEmpty() && recursos[0].Body != null) {
                StaticResource logo = recursos[0];
                Blob imagenBlob = logo.Body;
                
                // Determinar tipo de imagen
                Integer pictureType = NPOI.SS.Usermodel.Workbook.PICTURE_TYPE_PNG;
                if (logo.ContentType == 'image/jpeg' || logo.ContentType == 'image/jpg') {
                    pictureType = NPOI.SS.Usermodel.Workbook.PICTURE_TYPE_JPEG;
                }
                
                // Agregar imagen al workbook
                Integer pictureIdx = workbook.addPicture(imagenBlob, pictureType);
                
                // Crear dibujo en la hoja
                NPOI.SS.Usermodel.Drawing drawing = sheet.createDrawingPatriarch();
                
                // Crear anclaje para posicionar la imagen
                NPOI.SS.Usermodel.ClientAnchor anchor = workbook.getCreationHelper().createClientAnchor();
                
                // Configurar posición (A1 a C3)
                anchor.setCol1(0);  // Columna inicial (A)
                anchor.setRow1(0);  // Fila inicial (1)
                anchor.setCol2(2);  // Columna final (C) 
                anchor.setRow2(3);  // Fila final (3)
                
                // Insertar imagen
                drawing.createPicture(anchor, pictureIdx);
                
                System.debug('✅ Logo agregado al Excel NPOI');
            } else {
                System.debug('⚠️ No se encontró el StaticResource logo_daf');
            }
        } catch (Exception e) {
            System.debug('⚠️ Error agregando logo NPOI: ' + e.getMessage());
            // Continuar sin logo
        }
    }
    
    // Método auxiliar para crear estilos con NPOI
    private static Map<String, NPOI.SS.Usermodel.CellStyle> crearEstilosNPOI(NPOI.XSSF.Workbook workbook) {
        Map<String, NPOI.SS.Usermodel.CellStyle> estilos = new Map<String, NPOI.SS.Usermodel.CellStyle>();
        
        // 1. Estilo para encabezados
        NPOI.SS.Usermodel.CellStyle headerStyle = workbook.createCellStyle();
        NPOI.SS.Usermodel.Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(NPOI.HSSF.Util.HSSFColor.WHITE.index);
        headerFont.setFontHeightInPoints((short)12);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(NPOI.HSSF.Util.HSSFColor.BLUE.index);
        headerStyle.setFillPattern(NPOI.SS.Usermodel.CellStyle.SOLID_FOREGROUND);
        headerStyle.setAlignment(NPOI.SS.Usermodel.CellStyle.ALIGN_CENTER);
        headerStyle.setVerticalAlignment(NPOI.SS.Usermodel.CellStyle.VERTICAL_CENTER);
        estilos.put('header', headerStyle);
        
        // 2. Estilo para texto normal
        NPOI.SS.Usermodel.CellStyle textoStyle = workbook.createCellStyle();
        NPOI.SS.Usermodel.Font textoFont = workbook.createFont();
        textoFont.setFontHeightInPoints((short)11);
        textoStyle.setFont(textoFont);
        textoStyle.setWrapText(true);
        estilos.put('texto', textoStyle);
        
        // 3. Estilo para bordes
        NPOI.SS.Usermodel.CellStyle bordeStyle = workbook.createCellStyle();
        bordeStyle.setFont(textoFont);
        bordeStyle.setBorderTop(NPOI.SS.Usermodel.CellStyle.BORDER_THIN);
        bordeStyle.setBorderBottom(NPOI.SS.Usermodel.CellStyle.BORDER_THIN);
        bordeStyle.setBorderLeft(NPOI.SS.Usermodel.CellStyle.BORDER_THIN);
        bordeStyle.setBorderRight(NPOI.SS.Usermodel.CellStyle.BORDER_THIN);
        estilos.put('borde', bordeStyle);
        
        return estilos;
    }
    
    // ========== MÉTODOS EXISTENTES (MANTENIDOS) ==========
    
    // 1. MÉTODO PARA GENERAR CSV (RECOMENDADO)
    public static Id generarCSV(){
        List<ObjetoComision__c> registros = obtenerRegistros();
        
        // Crear contenido CSV
        String csv = '';
        
        // Encabezados
        csv += '"ID","NOMBRE"\n';
        
        // Datos
        for(ObjetoComision__c reg : registros){
            // Escapar comillas dobles
            String nombre = reg.Name != null ? reg.Name.replace('"', '""') : '';
            csv += '"' + reg.Id + '","' + nombre + '"\n';
        }
        
        Blob csvBlob = Blob.valueOf(csv);
        String fechaActual = Datetime.now().format('yyyy-MM-dd');
        String fileName = 'Comisiones_' + fechaActual + '.csv';
        
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.VersionData = csvBlob;
        cv.ContentLocation = 'S';
        
        insert cv;
        return cv.Id;
    }
    
    // 2. MÉTODO PARA GENERAR HTML (CON IMAGEN)
    public static Id generarHTMLExcel(){
        List<ObjetoComision__c> registros = obtenerRegistros();
        String imagenBase64 = obtenerImagenBase64();
        
        String html = '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta charset="UTF-8">' +
            '<title>Reporte de Comisiones</title>' +
            '<style>' +
            'body { font-family: Arial, sans-serif; margin: 20px; }' +
            'table { border-collapse: collapse; width: 100%; margin-top: 20px; }' +
            'th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }' +
            'th { background-color: #4CAF50; color: white; font-weight: bold; }' +
            'tr:nth-child(even) { background-color: #f9f9f9; }' +
            'tr:hover { background-color: #f5f5f5; }' +
            '.logo { margin-bottom: 30px; text-align: center; }' +
            '.title { color: #333; margin-bottom: 10px; }' +
            '.date { color: #666; font-size: 14px; margin-bottom: 20px; }' +
            '</style>' +
            '</head>' +
            '<body>';
        
        // Agregar logo si existe
        if(imagenBase64 != null){
            html += '<div class="logo">' +
                '<img src="data:image/png;base64,' + imagenBase64 + '" ' +
                'width="200" height="70" alt="Logo">' +
                '</div>';
        }
        
        // Título y fecha
        html += '<h1 class="title">Reporte de Comisiones</h1>' +
            '<div class="date">Fecha: ' + Datetime.now().format('dd/MM/yyyy') + '</div>';
        
        // Tabla de datos
        html += '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>ID</th>' +
            '<th>NOMBRE</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        
        for(ObjetoComision__c reg : registros){
            html += '<tr>' +
                '<td>' + reg.Id + '</td>' +
                '<td>' + (reg.Name != null ? reg.Name.escapeHtml4() : '') + '</td>' +
                '</tr>';
        }
        
        html += '</tbody></table>';
        
        // Total de registros
        html += '<div style="margin-top: 20px; font-weight: bold;">' +
            'Total de registros: ' + registros.size() +
            '</div>';
        
        html += '</body></html>';
        
        Blob htmlBlob = Blob.valueOf(html);
        String fileName = 'Comisiones_' + Datetime.now().format('yyyy-MM-dd') + '.html';
        
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.VersionData = htmlBlob;
        cv.ContentLocation = 'S';
        
        insert cv;
        return cv.Id;
    }
    
    // 3. MÉTODO PARA GENERAR XML CORRECTO (sin extensión .xls)
    public static Id generarXMLExcel(){
        String contenidoXML = crearExcel();
        Blob xmlBlob = Blob.valueOf(contenidoXML);
        
        String fechaActual = Datetime.now().format('yyyy-MM-dd');
        
        // EXTENSIÓN .xml en lugar de .xls
        String fileName = 'Comisiones_' + fechaActual + '.xml';
        
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.VersionData = xmlBlob;
        cv.ContentLocation = 'S';
        
        insert cv;
        return cv.Id;
    }
    
    public static String obtenerImagenBase64(){
        try {
            StaticResource sr = [
                SELECT Body, ContentType
                FROM StaticResource
                WHERE Name = 'logo_daf'
                LIMIT 1
            ];
            return EncodingUtil.base64Encode(sr.Body);
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            return null;
        }    
    }
    
    // ========== MÉTODO UNIFICADO (SMART) ==========
    
    /**
     * Método inteligente que detecta si NPOI está disponible
     * y usa el mejor formato disponible
     */
    public static Id generarExcelInteligente() {
        try {
            // Intentar usar NPOI si está disponible
            return generarExcelNPOI();
        } catch (System.TypeException e) {
            // NPOI no está instalado, usar HTML como fallback
            System.debug('⚠️ NPOI no disponible, usando HTML como fallback');
            return generarHTMLExcel();
        } catch (Exception e) {
            // Cualquier otro error, usar CSV como último recurso
            System.debug('⚠️ Error con NPOI, usando CSV como fallback: ' + e.getMessage());
            return generarCSV();
        }
    }
    
    // ========== MÉTODO PARA OBTENER URL ==========
    
    public static String generarYDescargar() {
        Id fileId = generarExcelInteligente();
        
        // Construir URL
        String orgUrl = System.Url.getOrgDomainUrl().toExternalForm();
        String downloadUrl = orgUrl + '/sfc/servlet.shepherd/version/download/' + fileId;
        
        return downloadUrl;
    }
}


// public with sharing class ComisionesObtenerDatos {
//     // FUNCION PARA OBTENER LOS REGISTROS DE LA TABLA COMISIONES
//     public static List<ObjetoComision__c> obtenerRegistros() {
//         return [
//             SELECT Id, Name FROM ObjetoComision__c
//             WHERE Fecha__c = LAST_MONTH
//         ];
//     }
    
//     public static String crearExcel(){
//         List<ObjetoComision__c> registros = obtenerRegistros();
        
//         // Obtener imagen en base64
//         String imagenBase64 = obtenerImagenBase64();
        
//         // Inicio documento XML para Excel
//         String xml = '<?xml version="1.0"?>' +
//             '<?mso-application progid="Excel.Sheet"?>' +
//             '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ' +
//             'xmlns:o="urn:schemas-microsoft-com:office:office" ' +
//             'xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
//             'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ' +
//             'xmlns:html="http://www.w3.org/TR/REC-html40">' +
//             '<Worksheet ss:Name="Comisiones">' +
//             '<Table>';
        
//         // Insertar imagen en primera fila (combinando 2 columnas)
//         if(imagenBase64 != null) {
//             xml += '<Row>' +
//                 '<Cell ss:MergeAcross="1">' + // Combinar 2 columnas
//                 '<Data ss:Type="String">' +
//                 '<html>' +
//                 '<img src="data:image/png;base64,' + imagenBase64 + '" ' +
//                 'width="150" height="50"/>' +
//                 '</html>' +
//                 '</Data>' +
//                 '</Cell>' +
//                 '</Row>';
            
//             // Fila vacía de separación
//             xml += '<Row>' +
//                 '<Cell><Data ss:Type="String"></Data></Cell>' +
//                 '<Cell><Data ss:Type="String"></Data></Cell>' +
//                 '</Row>';
//         }
        
//         // Cabecera
//         xml += '<Row>' +
//             '<Cell><Data ss:Type="String">ID</Data></Cell>' +
//             '<Cell><Data ss:Type="String">NOMBRE</Data></Cell>' +
//             '</Row>';
        
//         // Datos
//         for(ObjetoComision__c reg : registros){
//             xml += '<Row>' +
//                 '<Cell><Data ss:Type="String">' + reg.Id + '</Data></Cell>' +
//                 '<Cell><Data ss:Type="String">' + reg.Name + '</Data></Cell>' +
//                 '</Row>';
//         }
        
//         xml += '</Table></Worksheet></Workbook>';
//         return xml;
//     }
    
//     // FUNCION PARA DESCARGAR EL ARCHIVO CSV
//     public static Id descargarExcel(){
//         String contenidoCSV = crearExcel();
//         Blob csvBlob = Blob.valueOf(contenidoCSV);
        
//         // CORRECCIÓN: Usar Datetime.now() en lugar de System.today().format()
//         String fechaActual = Datetime.now().format('yyyy-MM-dd');
//         String csvFileName = 'Comisiones_' + fechaActual + '.xls';
        
//         ContentVersion cv = new ContentVersion();
//         cv.Title = csvFileName;
//         cv.PathOnClient = csvFileName;
//         cv.VersionData = csvBlob;
//         cv.ContentLocation = 'S';
        
//         insert cv;
//         return cv.Id;
//     }
    
//     // FUNCION PARA OBTENER LA IMAGEN EN BASE64
//     public static String obtenerImagenBase64(){
//         try {
//             StaticResource sr = [
//                 SELECT Body, ContentType
//                 FROM StaticResource
//                 WHERE Name = 'logo_daf'
//                 LIMIT 1
//             ];
//             String base64String = EncodingUtil.base64Encode(sr.Body);
//             return base64String;

//         } catch (Exception e) {
//             System.debug('Error al obtener la imagen base64: ' + e.getMessage());
//             return null;
//         }    
//     }
// }