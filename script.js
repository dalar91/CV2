document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('saveAsPdf').addEventListener('click', () => {
        const element = document.querySelector('.container');

        if (!window.html2pdf) {
            alert("Error: No se pudo cargar html2pdf.js. Verifica tu conexión a Internet.");
            return;
        }

        if (!element) {
            alert("Error: No se encontró el contenedor .container. Asegúrate de que tu HTML lo contenga.");
            return;
        }

        // Ajustar imágenes para evitar problemas de exportación
        document.querySelectorAll("img").forEach(img => {
            img.setAttribute("crossOrigin", "anonymous");
            img.onerror = function() {
                console.warn("❌ Imagen eliminada por error de CORS:", img.src);
                img.remove(); // Elimina la imagen si causa problemas
            };
        });

        // Pequeño ajuste en los márgenes para evitar cortes de texto
        const options = {
            margin: [12, 10, 12, 10], // Márgenes suavemente ajustados
            filename: 'Perfil_profesional_Alexander_La_Rotta.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, allowTaint: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).toPdf().save()
        .catch(err => {
            console.error("Error al generar el PDF:", err);
            alert("Se detectó un error con la estructura del contenido. Revisa la consola para más detalles.");
        });
    });
});
