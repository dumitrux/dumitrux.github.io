export interface PersonalProject {
  slug: string;
  name: string;
  description: { en: string; es: string };
  details: { en: string; es: string };
  url: string;
  tags: string[];
}

export const personalProjects: PersonalProject[] = [
  {
    slug: 'architectural-style-recognition',
    name: 'architectural-style-recognition',
    description: {
      en: 'Deep learning and computer vision project to recognize architectural styles. Created for my partner whose passion is architecture — before AI was cool.',
      es: 'Proyecto de deep learning y visión por computador para reconocer estilos arquitectónicos. Creado para mi pareja, apasionada de la arquitectura — antes de que la IA estuviera de moda.',
    },
    details: {
      en: 'A deep learning project that uses convolutional neural networks to classify architectural styles from photographs. Built as a personal project inspired by my partner\'s passion for architecture. The model was trained on a curated dataset of architectural images spanning multiple styles including Gothic, Baroque, Art Deco, and Modern. Implemented using Python with TensorFlow/Keras for model training and evaluation.',
      es: 'Un proyecto de deep learning que usa redes neuronales convolucionales para clasificar estilos arquitectónicos a partir de fotografías. Construido como proyecto personal inspirado por la pasión de mi pareja por la arquitectura. El modelo fue entrenado con un dataset curado de imágenes arquitectónicas abarcando múltiples estilos incluyendo Gótico, Barroco, Art Deco y Moderno. Implementado usando Python con TensorFlow/Keras para entrenamiento y evaluación del modelo.',
    },
    url: 'https://github.com/dumitrux/architectural-style-recognition',
    tags: ['Deep Learning', 'Computer Vision', 'Python'],
  },
  {
    slug: 'face2sprite',
    name: 'Face2Sprite',
    description: {
      en: 'Hackathon project: a tool that converts a face image into a sprite for use in video games or pixel art.',
      es: 'Proyecto de hackathon: herramienta que convierte una imagen facial en un sprite para videojuegos o pixel art.',
    },
    details: {
      en: 'A hackathon project that takes a face image as input and generates a pixel art sprite suitable for video games. The pipeline involves face detection, feature extraction, and style transfer to produce retro-style character sprites. Built in a fast-paced hackathon environment, demonstrating rapid prototyping and creative problem solving.',
      es: 'Un proyecto de hackathon que toma una imagen facial como entrada y genera un sprite de pixel art adecuado para videojuegos. El pipeline involucra detección facial, extracción de características y transferencia de estilo para producir sprites de personajes estilo retro. Construido en un entorno de hackathon de ritmo rápido, demostrando prototipado rápido y resolución creativa de problemas.',
    },
    url: 'https://github.com/dumitrux/Face2Sprite',
    tags: ['Hackathon', 'Image Processing'],
  },
  {
    slug: 'navigate-mri-with-3dmouse',
    name: 'navigate-MRI-with-3Dmouse',
    description: {
      en: 'Medical imaging project using a 3D mouse to navigate through MRI images in 3D Slicer.',
      es: 'Proyecto de imagen médica usando un ratón 3D para navegar imágenes MRI en 3D Slicer.',
    },
    details: {
      en: 'A medical imaging project that integrates a 3D mouse (SpaceMouse) with 3D Slicer to enable intuitive navigation through MRI scan volumes. The project allows medical professionals to explore brain scans and other volumetric data using natural 3D movements, improving the review workflow for radiologists and researchers.',
      es: 'Un proyecto de imagen médica que integra un ratón 3D (SpaceMouse) con 3D Slicer para permitir la navegación intuitiva a través de volúmenes de escaneo MRI. El proyecto permite a profesionales médicos explorar escáneres cerebrales y otros datos volumétricos usando movimientos 3D naturales, mejorando el flujo de trabajo de revisión para radiólogos e investigadores.',
    },
    url: 'https://github.com/dumitrux/navigate-MRI-with-3Dmouse',
    tags: ['Medical Imaging', '3D Slicer'],
  },
  {
    slug: 'posit-team-helm-k8s',
    name: 'posit-team-helm-k8s',
    description: {
      en: 'Helm chart for deploying Posit Team (RStudio) on Kubernetes.',
      es: 'Chart de Helm para desplegar Posit Team (RStudio) en Kubernetes.',
    },
    details: {
      en: 'An open-source Helm chart for deploying the full Posit Team suite (RStudio Workbench, Posit Connect, and Posit Package Manager) on Kubernetes. Includes configuration for persistent storage, authentication integration, resource limits, and ingress routing. Designed for teams that need a production-ready data science platform on Kubernetes.',
      es: 'Un chart de Helm de código abierto para desplegar la suite completa de Posit Team (RStudio Workbench, Posit Connect y Posit Package Manager) en Kubernetes. Incluye configuración para almacenamiento persistente, integración de autenticación, límites de recursos y enrutamiento de ingress. Diseñado para equipos que necesitan una plataforma de ciencia de datos lista para producción en Kubernetes.',
    },
    url: 'https://github.com/dumitrux/posit-team-helm-k8s',
    tags: ['Helm', 'Kubernetes', 'RStudio'],
  },
  {
    slug: 'solar-system-threejs',
    name: 'solar-system-threejs',
    description: {
      en: 'A solar system simulation built with Three.js to learn about 3D web graphics.',
      es: 'Simulación del sistema solar con Three.js para aprender sobre gráficos 3D web.',
    },
    details: {
      en: 'An interactive 3D solar system simulation built with Three.js and WebGL. Features realistic planet orbits, textures, and lighting. Users can zoom, rotate, and explore the solar system in their browser. Built as a learning project to understand 3D rendering, shader programming, and animation loops in the browser.',
      es: 'Una simulación interactiva del sistema solar en 3D construida con Three.js y WebGL. Incluye órbitas planetarias realistas, texturas e iluminación. Los usuarios pueden hacer zoom, rotar y explorar el sistema solar en su navegador. Construido como proyecto de aprendizaje para entender renderizado 3D, programación de shaders y bucles de animación en el navegador.',
    },
    url: 'https://github.com/dumitrux/solar-system-threejs',
    tags: ['Three.js', 'WebGL', '3D'],
  },
  {
    slug: 'bonsai-app',
    name: 'BonsaiApp',
    description: {
      en: 'A mobile app to cultivate emotional self-management and personal growth, helping users deal with emotional and social loneliness.',
      es: 'Una app móvil para cultivar la autogestión emocional y el crecimiento personal, ayudando a los usuarios a lidiar con la soledad emocional y social.',
    },
    details: {
      en: 'Bonsai is a mobile application built with React Native and Expo to cultivate emotional self-management and personal growth. The app helps users deal with the feeling of emotional and social loneliness through guided exercises, journaling, and self-reflection tools. Designed with a calm, nature-inspired interface that mirrors the patience required to grow a bonsai.',
      es: 'Bonsai es una aplicación móvil construida con React Native y Expo para cultivar la autogestión emocional y el crecimiento personal. La app ayuda a los usuarios a lidiar con el sentimiento de soledad emocional y social a través de ejercicios guiados, diario personal y herramientas de autorreflexión. Diseñada con una interfaz calmada e inspirada en la naturaleza que refleja la paciencia necesaria para cultivar un bonsái.',
    },
    url: 'https://github.com/dumitrux/bonsaiApp',
    tags: ['React Native', 'Expo', 'Mobile'],
  },
];
