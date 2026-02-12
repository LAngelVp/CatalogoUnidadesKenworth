
({
    doInit: function(component, event, helper) {
        // Usamos setTimeout para asegurarnos de que todo esté renderizado correctamente
        setTimeout($A.getCallback(function() {
            console.log("Iniciando el lienzo");

            // Usamos component.find() para encontrar el canvas en el componente Lightning
            var canvas = component.find('firma_lienzo') ? component.find('firma_lienzo').getElement() : null; 
            component.set("v.firmaValida", false)

            // Verificamos que el canvas esté correctamente encontrado
            if (!canvas) {
                console.error('No se encontró el canvas. Asegúrate de que el componente esté correctamente referenciado.');
                // Si no encontramos el canvas, establecemos un error
                component.set("v.hasError", true);
                component.set("v.errorMessage", "Ocurrio un error al momento de cargar la página, favor de recargar y si el problema persiste. El error es por renderizado.");
                return;
            }

            console.log("Canvas renderizado");
            

            // Aseguramos que el canvas tenga tamaño
            // if (!canvas.width || !canvas.height) {
            //     canvas.width = 400;  // Definir un tamaño por defecto
            //     canvas.height = 300;
            //     console.log("Canvas con tamaño por defecto: 400x300");
            // }

            // Obtener el contexto 2D para dibujar en el canvas
            var ctx = canvas.getContext('2d');
            var dibujo = false;

            // Establecer el estilo del trazo (puedes modificar el color y el grosor)
            ctx.strokeStyle = '#000000ff';
            ctx.lineWidth = 1;

            // Función para obtener las coordenadas del evento
            function getCoordinates(e) {
                var rect = canvas.getBoundingClientRect();
                var scaleX = canvas.width / rect.width;    // Relación de escala en el eje X
                var scaleY = canvas.height / rect.height;  // Relación de escala en el eje Y
                
                var x = e.clientX || (e.touches ? e.touches[0].clientX : 0); // Ajuste para eventos táctiles
                var y = e.clientY || (e.touches ? e.touches[0].clientY : 0); // Ajuste para eventos táctiles

                // Ajusta las coordenadas teniendo en cuenta el escalado
                return { 
                    x: (x - rect.left) * scaleX,  // Coordenada X ajustada por la escala
                    y: (y - rect.top) * scaleY    // Coordenada Y ajustada por la escala
                };
            }

            // Función para comenzar a dibujar
            function startDrawing(e) {
                console.log('Inicio del dibujo');
                dibujo = true;
                var coords = getCoordinates(e);
                ctx.beginPath();
                ctx.moveTo(coords.x, coords.y);
            }

            // Función para dibujar
            function draw(e) {
                if (dibujo) {
                    console.log('Dibujando');
                    var coords = getCoordinates(e);
                    ctx.lineTo(coords.x, coords.y);
                    ctx.stroke();
                }
            }

            // Función para detener el dibujo
            function stopDrawing() {
                console.log('Detener el dibujo');
                dibujo = false;
                ctx.closePath();
            }

            // Manejo de eventos para dispositivos con mouse
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
            canvas.addEventListener('touchstart', function(e) {
                e.preventDefault();
                startDrawing(e);
            });
            canvas.addEventListener('touchmove', function(e) {
                e.preventDefault();
                draw(e);
            });
            canvas.addEventListener('touchend', stopDrawing);

        }), 0);
    },
    
    limpiar_campo: function(component, event, helper) {
        // 1. Limpiar los valores primero
        component.set("v.firma", null);
        component.set("v.imagenPrevia", "");
        component.set("v.firmaDataURL", "")
        component.set("v.firmaValida", false)

        $A.enqueueAction(component.get("c.doInit"));

        // 2. Esperar un momento para que se actualice la vista
        setTimeout($A.getCallback(function() {
            // 3. Buscar el canvas de dos formas diferentes
            var canvas = component.find('firma_lienzo').getElement() || 
                        document.querySelector('.firma');
            
            // 4. Si existe el canvas, limpiarlo
            if (canvas) {
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            } else {
                console.error('No se encontró el canvas');
            }
        }), 200); // Espera 100ms para asegurar la actualización
    },
    aceptarFirma: function(component, event, helper) {
        var canvas = component.find("firma_lienzo").getElement();
        if (!canvas) {
            component.set("v.hasError", true);
            component.set("v.errorMessage", "Error al acceder al área de firma");
            return;
        }
        // Verificar si el canvas está vacío
        if(helper.canvasEstaVacio(canvas)) {
            component.set("v.hasError", true);
            component.set("v.errorMessage", "Debe ingresar su firma antes de continuar");
            return;
        }
        var imagenTransparente = helper.hacerFondoTransparente(canvas);
        // Marcar como válido y guardar
        component.set("v.hasError", false);
        component.set("v.errorMessage", "");
        console.log("imagen canva", imagenTransparente)
        component.set("v.firmaDataURL", imagenTransparente);
        // Notificar al flow que la validación cambió
        // $A.get("e.force:refreshView").fire();
    },

    almacenamiento_firma: function(component, event, helper){
        var data_firma = component.get("v.firmaDataURL");
        var id_registro = component.get("v.recordId")
        if (data_firma != ""){
            helper.guardarFirma(component, id_registro, data_firma);
        }
    },
    // APARTADO PARA AGREGAR IMAGEN DE FIRMA

    agregar_imagen_firma: function(component, event, helper) {
        // Simular clic en el input file oculto
        var fileInput = component.find("fileInput").getElement();
        fileInput.value = ''; // Permitir seleccionar el mismo archivo otra vez
        fileInput.click();
    },
    
    handleImageSelected: function(component, event, helper) {
        var fileInput = component.find("fileInput").getElement();
        var file = fileInput.files[0];
        
        if (!file) return;
        
        // Verificar que sea una imagen
        if (!file.type.match('image.*')) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "message": "Por favor selecciona un archivo de imagen",
                "type": "error"
            });
            toastEvent.fire();
            return;
        }
        
        // Mostrar vista previa de la imagen
        var reader = new FileReader();
        reader.onload = function(e) {
            component.set("v.imagenPrevia", e.target.result);
            
            // Opcional: Mostrar notificación de éxito
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Imagen cargada",
                "message": "Imagen seleccionada correctamente",
                "type": "success"
            });
            toastEvent.fire();
            
            // Aquí puedes guardar la imagen en un atributo para usarla luego
            var imagen_subida =  e.target.result;
            var recordId = component.get("v.recordId");
            // helper.guardarFirma(component, recordId, e.target.result)
            component.set("v.firmaDataURL", imagen_subida);
            console.log("imagen: ", imagen_subida);
        };
        reader.readAsDataURL(file);
    }
})