// --- FUNCIÓN PARA BORRAR CACHÉ TOTAL ---
async function borrarCacheTotal() {
    if (confirm("¿Seguro que quieres limpiar la caché? La app se reiniciará.")) {
        if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (let r of regs) await r.unregister();
        }
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
        alert("Caché borrada con éxito.");
        window.location.reload(true);
    }
}

// --- REGISTRO DEL SERVICE WORKER (Actualizado) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
        .then(reg => {
            console.log("Service Worker registrado con éxito en Florida Games");
        })
        .catch(err => {
            console.error("Error al registrar el SW:", err);
        });
    });
}
