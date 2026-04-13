// --- FUNCIÓN PARA BORRAR TODO EL CACHÉ ---
async function borrarCacheTotal() {
    // Sonido de basura para darle el toque de tu web
    playSnd('sndTrash'); 

    if (confirm("¿Deseas forzar la limpieza de caché? La aplicación se reiniciará para aplicar cambios.")) {
        try {
            // 1. Desregistrar Service Workers
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let registration of registrations) {
                    await registration.unregister();
                }
            }

            // 2. Borrar todas las llaves de caché
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(name => caches.delete(name))
            );

            alert("✅ Sistema limpiado. Recargando...");
            
            // 3. Recarga forzada desde el servidor
            window.location.reload(true);
        } catch (error) {
            console.error("Error al limpiar caché:", error);
            alert("❌ Hubo un error al limpiar. Inténtalo de nuevo.");
        }
    }
}

// --- REGISTRO DEL SW (Asegúrate que esté activo) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Importante: tu sw.js debe estar en la raíz junto a este HTML
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log("Florida Games SW: Activo"))
            .catch(err => console.log("Error SW:", err));
    });
}
