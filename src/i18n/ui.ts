export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Dumitru',
    'hero.role': 'Data Platform Specialist · Cloud Engineer · DevOps · Data Engineer',
    'hero.description': 'Data Platform Engineer with 7+ years of experience working with Azure data platforms and analytics solutions. I use DataOps, DevOps, and MLOps practices, including CI/CD, Infrastructure as Code, and data integration tools.',
    'hero.approach': 'I like to follow a systematic/engineering approach in my work: first understand the problem, then find the right balance between all the factors. I try to keep a humble mindset and always ask why.',
    'hero.career': 'Most of my experience is in healthcare and pharma. I have worked on improving applications for patient enrollment, building multitenant platforms for national health services, and supporting data platforms during COVID-19. Certified in multiple Microsoft technologies (Solutions Architect, AI Engineer, Fabric, Security, among others), GitHub, and infrastructure tools like CKA and Terraform.',
    'section.experience': 'Work Experience',
    'section.career': 'Career Path',
    'section.personal': 'Personal Projects',

    'section.contributions': 'Contributions',
    'section.blog': 'Blog',
    'career.dev': 'Development, Automation & Delivery (DevOps)',
    'career.cloud': 'Cloud Operations & Infrastructure',
    'career.data': 'Data Platforms, DataOps & AI',
    'career.industries': 'Industries',
    'career.pharma': 'Pharma',
    'career.insurance': 'Insurance',
    'career.public': 'Public Sector',
    'career.milestones': 'Key Milestones',
    'career.milestone1': 'Worked at a pharmaceutical company that developed a COVID vaccine',
    'career.milestone2': 'Large-scale migrations',
    'career.milestone3': 'Platform modernizations',
    'career.milestone4': 'Multiple industry certifications',
    'footer.built': 'Built with Astro & Tailwind CSS',
    'blog.coming': 'Blog posts coming soon...',
    'blog.search': 'Search posts...',
    'blog.allTags': 'All',
    'blog.noResults': 'No posts match your search.',
    'lang.toggle': 'ES',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.about': 'Sobre mí',
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Dumitru',
    'hero.role': 'Especialista en Plataformas de Datos · Ingeniero Cloud · DevOps · Ingeniero de Datos',
    'hero.description': 'Ingeniero de Plataformas de Datos con más de 7 años de experiencia trabajando con plataformas de datos y soluciones analíticas en Azure. Utilizo prácticas de DataOps, DevOps y MLOps, incluyendo CI/CD, Infraestructura como Código y herramientas de integración de datos.',
    'hero.approach': 'Me gusta seguir un enfoque sistemático/ingenieril en mi trabajo: primero entender el problema, luego encontrar el equilibrio adecuado entre todos los factores. Intento mantener una mentalidad humilde y siempre preguntar por qué.',
    'hero.career': 'La mayor parte de mi experiencia es en salud y farmacéutica. He trabajado en mejorar aplicaciones para reclutamiento de pacientes, construir plataformas multitenant para servicios nacionales de salud y apoyar plataformas de datos durante el COVID-19. Certificado en múltiples tecnologías Microsoft (Solutions Architect, AI Engineer, Fabric, Security, entre otras), GitHub y herramientas de infraestructura como CKA y Terraform.',
    'section.experience': 'Experiencia Profesional',
    'section.career': 'Trayectoria Profesional',
    'section.personal': 'Proyectos Personales',

    'section.contributions': 'Contribuciones',
    'section.blog': 'Blog',
    'career.dev': 'Desarrollo, Automatización y Entrega (DevOps)',
    'career.cloud': 'Operaciones Cloud e Infraestructura',
    'career.data': 'Plataformas de Datos, DataOps e IA',
    'career.industries': 'Industrias',
    'career.pharma': 'Farmacéutica',
    'career.insurance': 'Seguros',
    'career.public': 'Sector Público',
    'career.milestones': 'Hitos Clave',
    'career.milestone1': 'Trabajé en una farmacéutica que desarrolló una vacuna COVID',
    'career.milestone2': 'Migraciones a gran escala',
    'career.milestone3': 'Modernización de plataformas',
    'career.milestone4': 'Múltiples certificaciones de la industria',
    'footer.built': 'Hecho con Astro y Tailwind CSS',
    'blog.coming': 'Próximamente artículos en el blog...',
    'blog.search': 'Buscar artículos...',
    'blog.allTags': 'Todos',
    'blog.noResults': 'No hay artículos que coincidan con tu búsqueda.',
    'lang.toggle': 'EN',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
