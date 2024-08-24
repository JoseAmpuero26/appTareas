# App de Tareas

## Descripción

La **App de Tareas** es una herramienta de gestión de tareas diseñada para ayudar a los usuarios a organizar y realizar un seguimiento de sus actividades diarias. Ofrece una interfaz intuitiva que permite agregar, editar, eliminar y filtrar tareas con facilidad. La aplicación se basa en una lista de tareas, donde cada tarea puede ser marcada como completada, editada con un nuevo nombre y fecha, o eliminada completamente. Además, los usuarios pueden buscar tareas específicas y aplicar filtros para ver solo las tareas pendientes, completadas o todas las tareas.

## Lenguajes y Tecnologías Usados

- **HTML**: Utilizado para la estructura y el contenido de la aplicación.
- **CSS**: Utilizado para el diseño y la presentación visual de la aplicación.
- **JavaScript**: Utilizado para la lógica y la funcionalidad interactiva de la aplicación.

## Funcionamiento de la Aplicación

1. **Inicio**: Al iniciar la aplicación, se muestra la fecha actual y se cargan las tareas previamente guardadas desde el almacenamiento local del navegador.
2. **Agregar Tareas**: Los usuarios pueden agregar nuevas tareas utilizando un campo de entrada y un botón dedicado. Cada tarea se guarda con un identificador único, un nombre, una fecha de creación, y un estado que indica si está completada o eliminada.
3. **Lista de Tareas**: Las tareas se presentan en una lista con opciones para marcarlas como completadas, editarlas o eliminarlas.
4. **Filtrado y Búsqueda**: Las tareas pueden ser filtradas mediante botones específicos que permiten ver todas las tareas, solo las pendientes o solo las completadas. Además, la aplicación ofrece una función de búsqueda para encontrar tareas por nombre.
5. **Edición de Tareas**: Los usuarios pueden editar tareas existentes a través de un modal que aparece al seleccionar la opción de edición. En este modal, se pueden ajustar el nombre y la fecha de la tarea, siempre y cuando cumpla con las validaciones establecidas (como evitar enlaces, emojis y restringir la longitud del nombre).
6. **Alertas y Validaciones**: La aplicación proporciona alertas para notificar a los usuarios sobre cualquier error o problema con los datos ingresados.
7. **Persistencia de Datos**: Todas las acciones se reflejan en el almacenamiento local para asegurar que los datos se mantengan entre sesiones.

## Instalación

Para utilizar la App de Tareas, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/ampuerovillanueva/appTareas
