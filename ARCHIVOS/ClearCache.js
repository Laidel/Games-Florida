async function getFiles() {
    // Abre el selector de carpetas
    const directoryHandle = await window.showDirectoryPicker();
    
    for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'file') {
            console.log("Archivo encontrado:", entry.name);
        }
    }
}
