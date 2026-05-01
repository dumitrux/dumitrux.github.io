---
permalink: solar-system-threejs
title: "Sistema Solar en Three.js: Aprendiendo Gráficos 3D Web"
description: "Una simulación interactiva del sistema solar en 3D construida con Three.js y WebGL para explorar planetas, órbitas y renderizado en tiempo real en el navegador."
date: 2026-01-05
tags: ["Projects", "Software"]
secondaryTags: ["Three.js", "WebGL", "JavaScript"]
thumbnail: "/images/blog/solar-system-threejs-thumbnail.jpg"
lang: es
---

## El Objetivo

Quería aprender gráficos 3D web — no a través de tutoriales, sino construyendo algo visual e interactivo. Un sistema solar parecía el proyecto perfecto: tiene órbitas (matemáticas), texturas (assets), iluminación (renderizado) e interactividad (controles de cámara).

## Qué Hace

Una simulación interactiva del sistema solar ejecutándose completamente en el navegador:

- **Los 8 planetas** orbitando el Sol con distancias y velocidades proporcionales
- **Texturas realistas** — Mapas de texturas de la NASA aplicados a cada planeta
- **Iluminación dinámica** — El Sol emite luz, los planetas proyectan sombras
- **Controles de cámara** — Zoom, pan y rotación para explorar desde cualquier ángulo
- **Trayectorias orbitales** — Órbitas elípticas visibles para cada planeta
- **Paneles de información** — Haz clic en un planeta para ver datos y hechos

## Aspectos Técnicos

```javascript
// Crear un planeta con textura y órbita
function createPlanet(radius, texturePath, orbitRadius, orbitSpeed) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const texture = new THREE.TextureLoader().load(texturePath);
  const material = new THREE.MeshPhongMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);

  // Animación de órbita
  mesh.userData = { orbitRadius, orbitSpeed, angle: Math.random() * Math.PI * 2 };
  return mesh;
}

// Bucle de animación
function animate() {
  requestAnimationFrame(animate);
  planets.forEach(planet => {
    planet.userData.angle += planet.userData.orbitSpeed;
    planet.position.x = Math.cos(planet.userData.angle) * planet.userData.orbitRadius;
    planet.position.z = Math.sin(planet.userData.angle) * planet.userData.orbitRadius;
  });
  renderer.render(scene, camera);
}
```

## Desafíos

- **Escala** — El sistema solar real es imposiblemente grande. Usé escalado logarítmico para distancias y tamaños exagerados de planetas para mantener todo visible.
- **Rendimiento** — Texturas de alta resolución y múltiples fuentes de luz pueden hundir los frames por segundo. La compresión de texturas y LOD (nivel de detalle) ayudaron.
- **Órbitas suaves** — Conseguir órbitas elípticas keplerianas correctas (no solo círculos) requirió repasar mecánica orbital.

## Lo Que Aprendí

- **Three.js** abstrae WebGL de forma elegante, pero entender los conceptos subyacentes (shaders, buffers, pipelines de renderizado) sigue siendo esencial para depurar.
- **El patrón del bucle de animación** (requestAnimationFrame) es la columna vertebral de cualquier aplicación web en tiempo real.
- **Las matemáticas están en todas partes** en gráficos 3D — trigonometría para órbitas, álgebra lineal para transformaciones de cámara, física para movimiento realista.
- Construir proyectos visuales es increíblemente motivante — cada pequeño cambio produce feedback inmediato y satisfactorio.

## Pruébalo

El proyecto es open source: [solar-system-threejs en GitHub](https://github.com/dumitrux/solar-system-threejs)
