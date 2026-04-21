export interface WorkExperience {
  slug: string;
  name: string;
  period: string;
  description: { en: string; es: string };
  details: { en: string; es: string };
  skills: string[];
}

export const workExperience: WorkExperience[] = [
  {
    slug: 'gsk-flightdeck',
    name: 'GSK FlightDeck',
    period: 'Oct 2024 – Present',
    description: {
      en: 'Data platform and analytics project for GSK pharmaceutical operations.',
      es: 'Plataforma de datos y analítica para operaciones farmacéuticas de GSK.',
    },
    details: {
      en: 'Led the design and implementation of the FlightDeck data platform for GSK pharmaceutical operations. Built scalable data pipelines using Azure Databricks, implemented Infrastructure as Code with Terraform, and established CI/CD practices for reliable deployments. The platform enables real-time analytics and reporting across multiple business units.',
      es: 'Lideré el diseño e implementación de la plataforma de datos FlightDeck para operaciones farmacéuticas de GSK. Construí pipelines de datos escalables usando Azure Databricks, implementé Infraestructura como Código con Terraform y establecí prácticas de CI/CD para despliegues fiables. La plataforma permite analítica y reportes en tiempo real en múltiples unidades de negocio.',
    },
    skills: ['Azure', 'Databricks', 'Data Platform', 'Analytics', 'Infrastructure as Code'],
  },
  {
    slug: 'gsk-intelhub',
    name: 'GSK IntelHub',
    period: 'Jan 2023 – Sep 2024',
    description: {
      en: 'Enhances trial planning by integrating various data sources. Focused on country and site data for patient recruitment planning and tracking. Main goal: increase chances of successfully delivering GSK trials.',
      es: 'Mejora la planificación de ensayos integrando diversas fuentes de datos. Enfocado en datos de países y sitios para la planificación y seguimiento del reclutamiento de pacientes.',
    },
    details: {
      en: 'Worked on the IntelHub platform to enhance clinical trial planning by integrating diverse data sources including country-level and site-level data. Built automated data pipelines in Azure Databricks and Python for patient recruitment planning and tracking. Implemented CI/CD workflows and monitoring dashboards. The platform significantly improved the ability to plan and track recruitment across global trials.',
      es: 'Trabajé en la plataforma IntelHub para mejorar la planificación de ensayos clínicos integrando diversas fuentes de datos, incluyendo datos a nivel de país y de centro. Construí pipelines de datos automatizados en Azure Databricks y Python para la planificación y seguimiento del reclutamiento de pacientes. Implementé flujos de CI/CD y dashboards de monitorización. La plataforma mejoró significativamente la capacidad de planificar y rastrear el reclutamiento en ensayos globales.',
    },
    skills: ['Azure', 'Databricks', 'Data Platform', 'Analytics', 'CI/CD', 'Python'],
  },
  {
    slug: 'nhs-somerset',
    name: 'NHS Somerset',
    period: 'Mar 2022 – Dec 2022',
    description: {
      en: 'Multitenant applications deployed and managed in Azure for the National Health Service.',
      es: 'Aplicaciones multitenant desplegadas y gestionadas en Azure para el Servicio Nacional de Salud.',
    },
    details: {
      en: 'Deployed and managed multitenant applications in Azure for NHS Somerset, part of the National Health Service. Worked with containerized workloads, automated infrastructure provisioning with PowerShell and Bash scripts, and ensured high availability and security compliance for healthcare applications serving thousands of users.',
      es: 'Desplegué y gestioné aplicaciones multitenant en Azure para NHS Somerset, parte del Servicio Nacional de Salud. Trabajé con cargas de trabajo en contenedores, automaticé el aprovisionamiento de infraestructura con scripts de PowerShell y Bash, y aseguré alta disponibilidad y cumplimiento de seguridad para aplicaciones sanitarias que sirven a miles de usuarios.',
    },
    skills: ['Azure', 'Containerization', 'PowerShell', 'Bash'],
  },
  {
    slug: 'waltham-mars-petcare',
    name: 'Waltham Petcare Science Institute (Mars Petcare)',
    period: 'Jun 2021 – Feb 2022',
    description: {
      en: 'Prepared a Posit data platform integrated with Databricks on Azure Kubernetes Service, enabling around 20 data scientists and data professionals to collaborate and work efficiently.',
      es: 'Preparé una plataforma de datos Posit integrada con Databricks en Azure Kubernetes Service, permitiendo a unos 20 científicos de datos y profesionales de datos colaborar y trabajar de manera eficiente.',
    },
    details: {
      en: 'Set up a Posit (RStudio) data platform integrated with Databricks running on Azure Kubernetes Service. Configured Helm charts for deployment, managed cluster scaling and networking, and integrated authentication and storage. The platform served around 20 data scientists and data professionals, providing them with collaborative workspaces connected to Databricks for large-scale data processing.',
      es: 'Configuré una plataforma de datos Posit (RStudio) integrada con Databricks ejecutándose en Azure Kubernetes Service. Configuré charts de Helm para el despliegue, gestioné el escalado y la red del clúster, e integré autenticación y almacenamiento. La plataforma sirvió a unos 20 científicos de datos y profesionales de datos, proporcionándoles espacios de trabajo colaborativos conectados a Databricks para procesamiento de datos a gran escala.',
    },
    skills: ['Azure', 'Kubernetes', 'Databricks', 'Posit', 'Data Platform', 'Infrastructure as Code'],
  },
  {
    slug: 'janssen-jnj',
    name: 'Janssen (Johnson & Johnson)',
    period: 'May 2020 – May 2021',
    description: {
      en: 'Business intelligence and cloud infrastructure project leveraging Qlik Sense, Qlik View, and Azure.',
      es: 'Proyecto de inteligencia de negocio e infraestructura cloud con Qlik Sense, Qlik View y Azure.',
    },
    details: {
      en: 'Worked on business intelligence and cloud infrastructure for Janssen (Johnson & Johnson). Built and maintained dashboards and data visualizations using Qlik Sense and Qlik View. Managed Azure cloud infrastructure, SQL databases, and Power BI reports. Supported data-driven decision making across pharmaceutical operations during the COVID-19 pandemic.',
      es: 'Trabajé en inteligencia de negocio e infraestructura cloud para Janssen (Johnson & Johnson). Construí y mantuve dashboards y visualizaciones de datos usando Qlik Sense y Qlik View. Gestioné infraestructura cloud de Azure, bases de datos SQL e informes de Power BI. Apoyé la toma de decisiones basada en datos en operaciones farmacéuticas durante la pandemia de COVID-19.',
    },
    skills: ['Qlik Sense', 'Qlik View', 'Azure', 'SQL', 'Power BI'],
  },
];
