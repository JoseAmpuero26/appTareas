class TodoApp {
    constructor() {
        this.fecha = document.querySelector('#fecha');
        this.lista = document.querySelector('#lista');
        this.input = document.querySelector('#input');
        this.botonEnter = document.querySelector('#boton-enter');
        this.busqueda = document.querySelector('#busqueda');
        this.filtroTodas = document.querySelector('#filtro-todas');
        this.filtroPendientes = document.querySelector('#filtro-pendientes');
        this.filtroTerminadas = document.querySelector('#filtro-terminadas');
        this.check = 'fa-check-circle';
        this.uncheck = 'fa-circle';
        this.lineThrough = 'line-through';
        this.LIST = [];
        this.id = 0;

        this.init();
    }

    init() {
        this.setFecha();
        this.cargarDesdeLocalStorage();
        this.agregarEventos();
    }

    setFecha() {
        const FECHA = new Date();
        this.fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' });
    }

    cargarDesdeLocalStorage() {
        let data = localStorage.getItem('TODO');
        if (data) {
            this.LIST = JSON.parse(data);
            this.id = this.LIST.length;
            this.cargarLista(this.LIST);
        }
    }

    agregarEventos() {
        this.botonEnter.addEventListener('click', () => this.agregarTareaDesdeInput());
        document.addEventListener('keyup', (event) => this.agregarTareaConEnter(event));
        this.lista.addEventListener('click', (event) => this.gestionarTarea(event));
        this.busqueda.addEventListener('input', () => this.buscarTareas());
        this.filtroTodas.addEventListener('click', () => this.mostrarTodas());
        this.filtroPendientes.addEventListener('click', () => this.mostrarPendientes());
        this.filtroTerminadas.addEventListener('click', () => this.mostrarTerminadas());
    }

    agregarTarea(tarea, id, realizado, eliminado, fechaCreacion) {
        if (eliminado) return;

        const REALIZADO = realizado ? this.check : this.uncheck;
        const LINE = realizado ? this.lineThrough : '';

        const elemento = `
            <li id="elemento">
                <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                <p class="text ${LINE}">${tarea} - ${fechaCreacion}</p>
                <i class="fas fa-edit edit" data="editar" id="${id}"></i>
                <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
            </li>
        `;
        this.lista.insertAdjacentHTML("beforeend", elemento);
    }

    tareaRealizada(element) {
        element.classList.toggle(this.check);
        element.classList.toggle(this.uncheck);
        element.parentNode.querySelector('.text').classList.toggle(this.lineThrough);
        this.LIST[element.id].realizado = !this.LIST[element.id].realizado;
        localStorage.setItem('TODO', JSON.stringify(this.LIST));
    }

    tareaEliminada(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        this.LIST[element.id].eliminado = true;
        localStorage.setItem('TODO', JSON.stringify(this.LIST));
    }

    tareaEditada(element) {
        const tareaTexto = element.parentNode.querySelector('.text');
        const tareaId = element.id;
        const [tareaNombre, tareaFecha] = tareaTexto.textContent.split(' - ');
        const nuevoNombre = prompt('Edita la tarea:', tareaNombre);
        const nuevaFecha = prompt('Edita la fecha (dd/mm):', tareaFecha);

        if (nuevoNombre && nuevaFecha) {
            tareaTexto.textContent = `${nuevoNombre} - ${nuevaFecha}`;
            this.LIST[tareaId].nombre = nuevoNombre;
            this.LIST[tareaId].fechaCreacion = nuevaFecha;
            localStorage.setItem('TODO', JSON.stringify(this.LIST));
        }
    }

    agregarTareaDesdeInput() {
        const tarea = this.input.value;
        if (tarea) {
            const fechaCreacion = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit' });
            this.agregarTarea(tarea, this.id, false, false, fechaCreacion);
            this.LIST.push({
                nombre: tarea,
                id: this.id,
                realizado: false,
                eliminado: false,
                fechaCreacion: fechaCreacion
            });
            localStorage.setItem('TODO', JSON.stringify(this.LIST));
            this.id++;
            this.input.value = '';
        }
    }

    agregarTareaConEnter(event) {
        if (event.key == 'Enter') {
            this.agregarTareaDesdeInput();
        }
    }

    gestionarTarea(event) {
        const element = event.target;
        const elementData = element.attributes.data.value;

        if (elementData == 'realizado') {
            this.tareaRealizada(element);
        } else if (elementData == 'eliminado') {
            this.tareaEliminada(element);
        } else if (elementData == 'editar') {
            this.tareaEditada(element);
        }
    }

    cargarLista(array) {
        this.lista.innerHTML = '';
        array.forEach(item => {
            this.agregarTarea(item.nombre, item.id, item.realizado, item.eliminado, item.fechaCreacion);
        });
    }

    buscarTareas() {
        const terminoBusqueda = this.busqueda.value.toLowerCase();
        const listaFiltrada = this.LIST.filter(tarea => tarea.nombre.toLowerCase().includes(terminoBusqueda));
        this.cargarLista(listaFiltrada);
    }

    limpiarBusqueda() {
        this.busqueda.value = '';
    }

    mostrarTodas() {
        this.limpiarBusqueda();
        this.cargarLista(this.LIST);
    }

    mostrarPendientes() {
        this.limpiarBusqueda();
        const listaPendientes = this.LIST.filter(tarea => !tarea.realizado && !tarea.eliminado);
        this.cargarLista(listaPendientes);
    }

    mostrarTerminadas() {
        this.limpiarBusqueda();
        const listaTerminadas = this.LIST.filter(tarea => tarea.realizado && !tarea.eliminado);
        this.cargarLista(listaTerminadas);
    }
}

const app = new TodoApp();
