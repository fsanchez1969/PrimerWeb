// Actualiza hora y fecha cada segundo
function actualizarHoraFecha() {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString('es-ES');
    const fecha = ahora.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('hora').textContent = hora;
    document.getElementById('fecha').textContent = fecha;
}

// Obtener ubicación del usuario
function obtenerUbicacion() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            obtenerCiudad(latitude, longitude);
        }, () => {
            document.getElementById('ubicacion').textContent = "No se pudo obtener la ubicación.";
        });
    } else {
        document.getElementById('ubicacion').textContent = "Geolocalización no soportada.";
    }
}

// Usa una API gratuita para obtener la ciudad a partir de coordenadas
function obtenerCiudad(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`)
        .then(res => res.json())
        .then(data => {
            const ciudad = data.address.city || data.address.town || data.address.village || "Ubicación desconocida";
            document.getElementById('ubicacion').textContent = `${ciudad}`;
        })
        .catch(() => {
            document.getElementById('ubicacion').textContent = "Error obteniendo ciudad.";
        });
}

// Inicialización
actualizarHoraFecha();
setInterval(actualizarHoraFecha, 1000);
obtenerUbicacion();

