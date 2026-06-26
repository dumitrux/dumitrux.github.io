export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About Me',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Dumitru',
    'hero.role': 'Data Platform Specialist · Cloud Engineer · DevOps · Data Engineer',
    'hero.description': 'Data Platform Engineer with 7+ years of experience working with Azure data platforms and analytics solutions. I use DataOps, DevOps, and MLOps practices, including CI/CD, Infrastructure as Code, and data integration tools.',
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
    'blog.postsPerPage': 'Posts per page',
    'blog.pinned': 'Pinned',
    'post.back': 'Back',
    'exp.back': 'Back to Experience',
    'a11y.skip': 'Skip to content',
    'notFound.title': 'Page not found',
    'notFound.message': "The page you're looking for doesn't exist or has moved.",
    'notFound.home': 'Back to homepage',
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
    'blog.postsPerPage': 'Posts por página',
    'blog.pinned': 'Fijado',
    'post.back': 'Volver',
    'exp.back': 'Volver a Experiencia',
    'a11y.skip': 'Saltar al contenido',
    'notFound.title': 'Página no encontrada',
    'notFound.message': 'La página que buscas no existe o se ha movido.',
    'notFound.home': 'Volver al inicio',
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
