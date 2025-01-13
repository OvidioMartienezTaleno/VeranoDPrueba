Configuración de React con Vite
Este proyecto utiliza React como biblioteca principal para el desarrollo de la interfaz de usuario, junto con Vite como herramienta de construcción por su velocidad y optimización en proyectos modernos. El proyecto fue creado utilizando npm create vite@5.2.3 con soporte para TypeScript.

Creación del Proyecto
Para crear este proyecto desde cero, se utilizó el siguiente comando:

bash
Copiar código
npm create vite@5.2.3
Durante el proceso de configuración, se seleccionaron las siguientes opciones:

Framework: React
Variant: TypeScript
Este comando inicializó el proyecto con una estructura base optimizada para React y configurada para TypeScript.

Instalación de Dependencias
Después de crear el proyecto, se instalaron las dependencias iniciales ejecutando:

bash
Copiar código
npm install
Estructura Base del Proyecto
El proyecto generado tiene una estructura inicial similar a esta:
📂 src  
 ├── 📄 App.tsx // Componente principal de la aplicación  
 ├── 📄 main.tsx // Punto de entrada de la aplicación  
 ├── 📂 assets // Recursos estáticos (imágenes, estilos etc.)  
 ├── 📂 css // Estilos de las páginas
├── 📂 pages // Páginas de lo web
├── 📂 components // Componentes reutilizables  
 └── 📄 index.css // Estilos globales de la aplicación  
📄 index.html // Archivo HTML base  
📄 tsconfig.json // Configuración de TypeScript  
📄 vite.config.ts // Configuración de Vite

Scripts Disponibles
Los siguientes scripts están disponibles en el archivo package.json para la gestión del proyecto:

npm run dev: Inicia el servidor de desarrollo con Vite.
npm run build: Genera una versión optimizada para producción.
npm run preview: Previsualiza la aplicación en modo producción localmente.

Implementación de Traducciones con i18next
Este proyecto utiliza i18next para manejar la internacionalización y traducción de textos en la aplicación web. A continuación, se describe la configuración y utilización de esta funcionalidad.

Instalación de Dependencias
Para habilitar las traducciones, asegúrate de instalar las siguientes dependencias:
npm install i18next react-i18next i18next-browser-languagedetector

i18next: Biblioteca principal para la internacionalización.
react-i18next: Conector para integrar i18next con aplicaciones React.
i18next-browser-languagedetector: Detecta automáticamente el idioma del usuario en el navegador.
Configuración de i18next
Archivo i18n.tsx: Este archivo configura i18next y define los recursos de traducción.
Incluye los textos traducidos en los idiomas inglés y español.

Autenticación y Base de Datos con Firebase
Este proyecto utiliza Firebase para la autenticación de usuarios y el almacenamiento de datos en la nube mediante Firestore. Se implementaron funcionalidades para:

Autenticación con Google.
Registro y autenticación con correo electrónico y contraseña.
Almacenamiento de datos de usuario en Firestore.

Configuración de Firebase
Para integrar Firebase en este proyecto, se utilizó la siguiente configuración:

Crear un proyecto en Firebase Console:
En Firebase Console, se crea un proyecto nuevo y se configura la autenticación y Firestore.

Instalación de las dependencias de Firebase:
npm install firebase

Configuración del proyecto:
En el código se inicializó Firebase con las credenciales del proyecto en el objeto firebaseConfig.

const firebaseConfig = {
apiKey: "",
authDomain: "",
projectId: ",
storageBucket: "",
messagingSenderId: "",
appId: "",
};

Funcionalidades Implementadas

1. Autenticación con Google:
   Implementada mediante GoogleAuthProvider y signInWithPopup.
   Al autenticar un usuario, se almacena su información básica en Firestore.

2. Registro con Correo Electrónico y Contraseña:
   Implementado con createUserWithEmailAndPassword.
   Al registrar un usuario, su información se guarda en Firestore.

3. Inicio de Sesión con Correo Electrónico y Contraseña:
   Implementado con signInWithEmailAndPassword.
   Manejo de errores como usuario no encontrado, contraseña incorrecta o correo inválido.
