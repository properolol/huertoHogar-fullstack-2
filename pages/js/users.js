const botonesEliminar = document.querySelectorAll(".boton-eliminar");

botonesEliminar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const confirmar = confirm("¿Está seguro de que desea eliminar este usuario?");

        if (confirmar) {
            const fila = boton.closest("tr");
            fila.remove();

            alert("Usuario eliminado correctamente.");
        }

    });

});
