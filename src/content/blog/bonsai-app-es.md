---
permalink: bonsai-app
title: "BonsaiApp: Cultivando el Crecimiento Emocional a Través de la Tecnología"
description: "Una app móvil construida con React Native y Expo para ayudar a los usuarios a desarrollar habilidades de autogestión emocional y afrontar la soledad."
date: 2026-04-20
tags: ["Projects", "Software"]
secondaryTags: ["React Native", "Expo", "Mobile", "Salud Mental"]
lang: es
---

## La Idea

La soledad — emocional y social — es uno de los desafíos más extendidos pero menos discutidos de la vida moderna. Quise construir algo que pudiera ayudar, no con una solución rápida, sino con un enfoque lento e intencional hacia el crecimiento personal.

La metáfora del **bonsái** encajaba perfectamente: el crecimiento requiere paciencia, atención y consistencia. No se puede apresurar. La app refleja esta filosofía.

## Qué Hace

BonsaiApp es una aplicación móvil diseñada para ayudar a los usuarios a:

- **Registrar su estado emocional** — Check-ins diarios simples para construir consciencia a lo largo del tiempo
- **Practicar la autorreflexión** — Prompts de diario guiados que fomentan la introspección honesta
- **Construir hábitos saludables** — Pequeñas acciones consistentes para el bienestar emocional
- **Visualizar el crecimiento** — Un bonsái que crece conforme interactúas con la app, reforzando la consistencia

## Stack Tecnológico

Construida con **React Native** y **Expo** para desarrollo móvil multiplataforma:

```javascript
// App.js - Configuración de navegación
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen name="Growth" component={GrowthScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

Decisiones técnicas clave:

- **Expo** — Desarrollo rápido, testing fácil en dispositivos físicos, sin complejidad de builds nativos
- **React Navigation** — Navegación familiar basada en tabs para UX móvil
- **Almacenamiento local** — Las entradas del diario y datos emocionales se quedan en el dispositivo por privacidad
- **UI limpia inspirada en la naturaleza** — Verdes suaves y tonos tierra para crear una experiencia calmante

## Filosofía de Diseño

La app es intencionalmente minimalista. Las herramientas de salud mental no deberían sentirse abrumadoras ni gamificadas hasta generar ansiedad. Principios clave:

- **Sin funciones sociales** — Este es un espacio personal y privado
- **Sin rachas ni castigos** — Perderse un día está bien, el bonsái no muere
- **Recordatorios suaves** — Las notificaciones son opcionales y nunca generan culpa
- **Privacidad primero** — Todos los datos se quedan en el dispositivo

## Lo Que Aprendí

- **Diseñar para la vulnerabilidad** requiere cuidado extra — el copy de la UI, los colores y las interacciones afectan cuán seguro se siente el usuario.
- **Expo** es fantástico para prototipar apps móviles rápidamente, especialmente cuando no necesitas módulos nativos pesados.
- La parte más difícil de construir una app de bienestar no es el código — es hacer algo que la gente realmente use de forma consistente.

## Pruébalo

El proyecto es open source: [BonsaiApp en GitHub](https://github.com/dumitrux/bonsaiApp)
