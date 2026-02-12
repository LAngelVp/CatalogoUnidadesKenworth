({
  /**
   * Método para obtener coordenadas (ejemplo)
   * @param {Object} component - El componente Aura
   * @param {Object} event - El evento que disparó la acción
   */
  getCoords: function (component, event) {
    console.log("hola");
    // Aquí iría la lógica para obtener coordenadas
  },
  guardarFirma: function(component, recordId, imageData) {
    var resultado = false
        // 2. Validar recordId
        if (!recordId || recordId.length !== 18) {
            this.mostrarError(component, "ID de registro no válido");
            return;
        }
        
        // 3. Mostrar indicador de carga
        component.set("v.cargando", true);
        
        // 4. Llamar a Apex
        var action = component.get("c.guardarFirmaBase64");
        action.setParams({
            "recordId": recordId,
            "imagenFirma": imageData
        });
        
        action.setCallback(this, $A.getCallback(function(response) {
            component.set("v.cargando", false);
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if (result.success) {
                    this.mostrarExito(component, result.message);
                    component.set("v.firmaValida", true)
                    resultado = true
                    // Opcional: cerrar el modal o redirigir
                } else {
                    this.mostrarError(component, result.message);
                }
            } else {
                var errors = response.getError();
                var errorMsg = "Error al guardar firma";
                if(errors && errors[0] && errors[0].message) {
                    errorMsg += ": " + errors[0].message;
                }
                this.mostrarError(component, errorMsg);
            }
        }));
        $A.enqueueAction(action);
        return resultado
    },
    
    canvasEstaVacio: function(canvas) {
        // Crear un canvas temporal en blanco para comparación
        var blankCanvas = document.createElement('canvas');
        blankCanvas.width = canvas.width;
        blankCanvas.height = canvas.height;
        return canvas.toDataURL() === blankCanvas.toDataURL();
    },
    
    mostrarExito: function(component, mensaje) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Éxito",
            "message": mensaje,
            "type": "success",
            "mode": "dismissible"
        });
        toastEvent.fire();
    },
    
    mostrarError: function(component, mensaje) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error",
            "message": mensaje,
            "type": "error",
            "mode": "sticky",
            "duration": 10000
        });
        toastEvent.fire();
    },
    hacerFondoTransparente: function(canvas) {
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        var ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
        
        // 1. Dibujar el canvas original en el temporal
        ctx.drawImage(canvas, 0, 0);
        
        // 2. Obtener los datos de la imagen
        var imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        var data = imageData.data;
        
        // 3. Procesar todos los píxeles
        for (var i = 0; i < data.length; i += 4) {
            // Detectar píxeles del fondo (blanco en este caso)
            // Ajusta estos valores según el color de fondo de tu canvas
            var esFondo = data[i] > 220 &&     // R
                        data[i+1] > 220 &&   // G
                        data[i+2] > 220 &&   // B
                        data[i+3] > 200;     // Alpha (opacidad)
            
            if (esFondo) {
                data[i+3] = 0; // Hacer completamente transparente
            }
        }
        
        // 4. Aplicar los cambios
        ctx.putImageData(imageData, 0, 0);
        
        // 5. Crear imagen PNG con transparencia
        return tempCanvas.toDataURL("image/png");
    }
});
