# 📝 **Lista de tareas**

### Funcionalidades principales:
- [x] **Cada usuario puede crear y eliminar diferentes boards.** Las boards se pueden filtrar por fecha o alfabeticamente.
- [x] **Vista detalle de cada board** con las tareas respectivas.
- [x] **Diferentes columnas para los estado de las tasks.** Cada task tiene un estado que pude ser *done, inprogress y todo*
- [x] **Cada tarea muestra un nivel de prioridad.** El nivel de prioridad puede ser *HIGH, MEDIUM, LOW*.
- [x] **Notificaciones tipo Toast** para confirmar acciones como crear, eliminar boards/tasks
      *(usando react-hot-toast)*.
- [x] **Drag & Drop** para gestionar las tasks entre las posibles columnas.
- [ ] **Notificación por email** cuando una tarea está próxima a vencer *(usando react-email)*.
---

### Mejoras:
- [x] **Integración con Zustand** como manejador de estado.
- [x] **Gestion de los diferentes tipos de modales con HOC**. Los modales están construido con *HeadlessUI*.
- [ ] **Support dark mode.** With tailwindcss dark mode.
- [ ] **Integración con Axios** para manejo de datos❓

### Tareas para hoy:
- [x] **FIX: ** eliminar task. Arreglar dnd para evitar cuando se quiere borrar.
- [ ] **FIX: ** evitar que en mobile el calendario salga el teclado. Cambiar priority
badges por un select o algo que ocupe menos.
- [ ] **PERF: ** filtros para las Kanban Columns. Ordenar tasks por priority o endDate.
- [ ] **PERF: ** checkear el dnd para hacerlo más smoth.
