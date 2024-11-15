# 📝 **Lista de tareas**

### Funcionalidades principales:

- [x] **Cada usuario puede crear y eliminar diferentes boards.** Las boards se pueden filtrar por fecha o alfabeticamente.
- [x] **Vista detalle de cada board** con las tareas respectivas.
- [x] **Diferentes columnas para los estado de las tasks.** Cada task tiene un estado que pude ser *done, inprogress y todo*
- [x] **Cada tarea muestra un nivel de prioridad.** El nivel de prioridad puede ser *HIGH, MEDIUM, LOW*.
- [x] **Notificaciones tipo Toast** para confirmar acciones como crear, eliminar boards/tasks
      *(usando react-hot-toast)*.
- [ ] **Drag & Drop** para gestionar las tasks entre las posibles columnas.
- [ ] **Notificación por email** cuando una tarea está próxima a vencer *(usando react-email)*.
---

### Mejoras:

- [x] **Integración con Zustand** como manejador de estado.
- [x] **Gestion de los diferentes tipos de modales con HOC**. Los modales están construido con *HeadlessUI*
- [ ] **Integración con Axios** para manejo de datos❓
- [ ] **Cambiar a FireBaseAuth**❓
---

### Tareas:

- [x] **Añadir calendario** para seleccionar la fecha de vencimiento de tareas.
- [x] **Action para añadir tareas.**
- [x] **Mostrar tareas** en sus respectivas columnas.
- [x] **Estilizar TaskItem** para mejorar la apariencia de cada tarea.
- [x] **Corregir el display de tareas** al añadir una nueva.
- [x] **Corregir persistencia de ubicación al recargar.**
- [x] **Actions para eliminar tareas.**
- [x] **Cuando se borra un board** eliminar las tareas correspondientes a esa board.
- [x] **Notificación tipo toast** cuando se creat/elimina una board/task.
- [x] **Fix estado de las tasks cuando salimos de la vista de la board.** Limpiar el estado para evitar que se vean las tareas de un board al entrar a un board distinto.
- [ ] **DnD de las tareas.** Las tareas se pueden arrastrar de una column a otra cambiando su state.
- [ ] **Filtros de las Kanban Columns**
- [ ] **Limpiar el estado al hacer 'logout'**
