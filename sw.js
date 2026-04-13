// --- FUNCIÓN PARA BORRAR TODO EL CACHÉ ---
async function borrarCacheTotal() {
    // Sonido de basura (Asegúrate que la ruta en playSnd considere la carpeta ARCHIVOS/)
    if (typeof playSnd === "function") playSnd('sndTrash'); 

    if (confirm("¿Deseas forzar la limpieza de caché? La aplicación se reiniciará para aplicar cambios.")) {
        try {
            // 1. Desregistrar todos los Service Workers instalados
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let registration of registrations) {
                    await registration.unregister();
                }
            }

            // 2. Borrar físicamente todas las llaves de almacenamiento de caché
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(name => caches.delete(name))
            );

            alert("✅ Sistema limpiado. Recargando para actualizar...");
            
            // 3. Recarga forzada con "Cache Busting" (añade un número único a la URL)
            const urlLimpia = window.location.href.split('#')[0].split('?')[0];
            window.location.href = urlLimpia + "?update=" + Date.now();

        } catch (error) {
            console.error("Error al limpiar caché:", error);
            alert("❌ Hubo un error al limpiar. Inténtalo de nuevo.");
        }
    }
}

// --- REGISTRO DEL SERVICE WORKER (SW) ---
// Al estar TiendaVirtual.html y sw.js en la raíz, el alcance es total.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log("Florida Games SW: Activo en Raíz - Scope:", reg.scope);
            })
            .catch(err => {
                console.log("Error al registrar el SW:", err);
            });
    });
}
