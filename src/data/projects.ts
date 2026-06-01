export interface PersonalProject {
  slug: string;
  name: string;
  description: { en: string; es: string };
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
    tags: ['Deep Learning', 'Computer Vision', 'Python'],
  },
  {
    slug: 'face2sprite',
    name: 'Face2Sprite',
    description: {
      en: 'Hackathon project: a tool that converts a face image into a sprite for use in video games or pixel art.',
      es: 'Proyecto de hackathon: herramienta que convierte una imagen facial en un sprite para videojuegos o pixel art.',
    },
    tags: ['Hackathon', 'Image Processing'],
  },
  {
    slug: 'covid-tracking-on-campus',
    name: 'Covid-Tracking on Campus',
    description: {
      en: 'Hackathon-winning Android app that notifies students of COVID-19 exposure via Bluetooth Low Energy scanning.',
      es: 'App Android ganadora de hackathon que notifica a estudiantes de exposición a COVID-19 mediante escaneo Bluetooth Low Energy.',
    },
    tags: ['Hackathon', 'Android', 'Python'],
  },
  {
    slug: 'navigate-mri-with-3dmouse',
    name: 'navigate-MRI-with-3Dmouse',
    description: {
      en: 'Medical imaging project using a 3D mouse to navigate through MRI images in 3D Slicer.',
      es: 'Proyecto de imagen médica usando un ratón 3D para navegar imágenes MRI en 3D Slicer.',
    },
    tags: ['Medical Imaging', '3D Slicer'],
  },
  {
    slug: 'posit-team-helm-k8s',
    name: 'posit-team-helm-k8s',
    description: {
      en: 'Helm chart for deploying Posit Team (RStudio) on Kubernetes.',
      es: 'Chart de Helm para desplegar Posit Team (RStudio) en Kubernetes.',
    },
    tags: ['Helm', 'Kubernetes', 'RStudio'],
  },
  {
    slug: 'solar-system-threejs',
    name: 'solar-system-threejs',
    description: {
      en: 'A solar system simulation built with Three.js to learn about 3D web graphics.',
      es: 'Simulación del sistema solar con Three.js para aprender sobre gráficos 3D web.',
    },
    tags: ['Three.js', 'WebGL', '3D'],
  },
  {
    slug: 'bonsai-app',
    name: 'BonsaiApp',
    description: {
      en: 'A mobile app to cultivate emotional self-management and personal growth, helping users deal with emotional and social loneliness.',
      es: 'Una app móvil para cultivar la autogestión emocional y el crecimiento personal, ayudando a los usuarios a lidiar con la soledad emocional y social.',
    },
    tags: ['React Native', 'Expo', 'Mobile'],
  },
];
