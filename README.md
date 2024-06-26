### Pasos para ejecutar el proyecto localmente

1. **Clonar el repositorio**:

   - Clone el repositorio en un directorio local de su elección.

2. **Instalar dependencias**:

   - Navegue hasta el directorio raíz del proyecto.
   - Instale los paquetes necesarios con el siguiente comando:
     ```bash
     npm install
     ```

3. **Iniciar el proyecto**:
   - Levante el proyecto con el siguiente comando:
     `bash
     npm run dev
     `
     `user`: nexttesttestnext@gmail.com .\
     `pass`: testnext123

## Detalle técnicos

👉 `Simplificación del enrutamiento`: Utilizando el sistema de enrutamiento de páginas basado en la estructura de directorios de la carpeta pages de Next.js. Cada archivo en esta carpeta se convierte automáticamente en una ruta de la aplicación.\
👉 `Estilos`: Estilado con Tailwind CSS para una interfaz moderna y eficiente. Permite aplicar estilos directamente en los componentes con clases utilitarias.\
👉 `Gestión de Estado`: La aplicación está envuelta con AppContext y AppLayout a nivel global, permitiendo consumir y configurar datos comunes en toda la aplicación de manera sencilla.\
👉 `Custom Hooks` : Implementación de useFetchList para llamadas a la API.\
👉 `Rutas Dinámicas`: Manejo flexible de rutas con parámetros variables.\
👉 `Aplicación SPA`: Funciona como una Single Page Application (SPA), es decir, no se vuelve a recargar la página.\
👉 `Mock de API`: Mock de llamadas a la API en la carpeta api.\
👉 `Loading`: Indicador de carga mientras se espera la respuesta del servidor.\
👉 `Manejo de Errores`: Muestra errores en caso de fallos del servidor, ya sea por falta de conexión a internet u otros motivos.\
👉 Realiza filtrado de busqueda por useName.\
👉 Este proyecto sigue principios de SOLID y buenas prácticas de desarrollo, incluyendo la reutilización de código y la responsabilidad única. Por ej. generateTimesline ubicado en test/factores se aplico:\
1- Responsabilidad Única: Cada función tiene una única responsabilidad. generateTimeline se encarga de crear un objeto de timeline, mientras que generateTimesline se encarga de generar una lista de estos objetos.\
2- Abierto/Cerrado: El código está abierto a la extensión pero cerrado a la modificación. Si necesitas cambiar la forma en que se generan los timelines, puedes extender el código sin necesidad de modificar las funciones existentes.\
3- Inversión de Dependencia: Se usa faker y lodash/range como dependencias externas, pero estas se inyectan y utilizan de manera que el código principal no depende directamente de implementaciones específicas de estas bibliotecas.\

## Tecnologías Utilizadas

✅ `Reutilización de Código`: Por ej. La función generateTimeline es reutilizada dentro de generateTimesline para generar múltiples elementos de timeline, promoviendo la reutilización de código.\
✅ `Modularidad`: El código está modularizado en pequeños compoentes y reutilizables, lo que facilita el mantenimiento y la extensión del código, por ej. SearchPage y HomePage reutilizan el componente ListDevists.\

## Tecnologías Utilizadas

✨ Next.js: Framework de React que permite renderizado del lado del servidor (SSR) y generación estática de páginas (SSG).\
✨ Tailwind CSS: Framework de CSS utilitario para diseñar interfaces rápidas y modernas.\
✨ TypeScript: Superconjunto de JavaScript que agrega tipado estático al lenguaje.\
