---
permalink: how-the-internet-works
title: "Cómo Funciona Internet: Del Clic a la Respuesta"
description: "Una explicación simplificada de cómo funciona internet — desde cables y datacenters hasta DNS, HTTP y la infraestructura cloud detrás de cada petición."
date: 2026-04-08
tags: ["Infrastructure"]
secondaryTags: ["Cloud", "Redes", "Fundamentos"]
thumbnail: "/images/blog/how-internet-works-thumbnail.svg"
lang: es
---

Abres un navegador, escribes una URL y aparece una web. Pero, ¿qué pasa realmente entre ese clic y la carga de la página? Vamos a desglosarlo.

## Empieza con Cables

Internet es, en su núcleo, una **red global de cables físicos** — cables de fibra óptica que recorren océanos, continentes y edificios. Estos cables transportan datos como pulsos de luz a velocidades cercanas a la de la luz.

Los cables submarinos conectan continentes. Empresas como Google, Microsoft, Meta y Amazon poseen o alquilan grandes porciones de esta infraestructura.

## Datacenters: Donde Vive la Nube

Cuando la gente dice "la nube", se refiere al **ordenador de otra persona** — específicamente, ordenadores en datacenters masivos alrededor del mundo.

Solo Microsoft opera datacenters en **más de 60 regiones** a nivel global. Puedes explorarlos en [datacenters.microsoft.com](https://datacenters.microsoft.com/globe/explore/). Cada datacenter contiene miles de servidores, sistemas de almacenamiento y equipos de red, todo refrigerado, alimentado y asegurado 24/7.

Cuando despliegas una app en Azure, AWS o GCP, tu código se ejecuta en servidores físicos dentro de una de estas instalaciones.

## Qué Pasa Cuando Escribes una URL

### 1. Resolución DNS

Tu navegador necesita convertir `www.ejemplo.com` en una dirección IP (como `93.184.216.34`). Pregunta a un **servidor DNS (Domain Name System)** — esencialmente la guía telefónica de internet.

```
Tú → Caché DNS local → DNS del ISP → DNS Raíz → DNS TLD → DNS Autoritativo
                                                                ↓
                                                         93.184.216.34
```

### 2. Conexión TCP

Tu navegador abre una **conexión TCP (Transmission Control Protocol)** a la dirección IP del servidor. Es un handshake de tres pasos:

1. **SYN** — "Oye, quiero conectar"
2. **SYN-ACK** — "Recibido, vamos a conectar"
3. **ACK** — "¡Conectados!"

Para HTTPS (que es la mayor parte de la web hoy), hay un **handshake TLS** adicional para establecer el cifrado.

### 3. Petición HTTP

Tu navegador envía una **petición HTTP**:

```
GET /index.html HTTP/2
Host: www.ejemplo.com
Accept: text/html
```

### 4. Procesamiento del Servidor

El servidor recibe la petición y la procesa. Esto puede implicar:

- Servir un archivo estático (HTML, CSS, imagen)
- Ejecutar código de aplicación (Node.js, Python, etc.)
- Consultar una base de datos
- Llamar a otros servicios (APIs, cachés)

### 5. Respuesta HTTP

El servidor envía una respuesta:

```
HTTP/2 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>...
```

### 6. Renderizado

Tu navegador parsea el HTML, descarga CSS, JavaScript, imágenes y fuentes (cada una es una petición HTTP separada) y renderiza la página.

## Los Actores Clave

| Componente | Rol |
|---|---|
| **ISP** | Tu Proveedor de Servicios de Internet — te conecta a la red |
| **DNS** | Traduce nombres de dominio a direcciones IP |
| **CDN** | Red de Distribución de Contenido — cachea contenido más cerca de ti |
| **Load Balancer** | Distribuye el tráfico entre múltiples servidores |
| **Servidor Web** | Gestiona peticiones HTTP y sirve respuestas |
| **Base de Datos** | Almacena y recupera datos |
| **Firewall/WAF** | Filtra tráfico malicioso |

## CDNs: Acercando el Contenido

Una **Red de Distribución de Contenido** cachea copias de tu web en servidores alrededor del mundo (llamados nodos edge o PoPs). Cuando alguien en Tokio solicita tu sitio alojado en Europa, el CDN lo sirve desde un nodo cercano en lugar de cruzar el océano.

Azure CDN, Cloudflare y AWS CloudFront son ejemplos comunes.

## Direcciones IP y Enrutamiento

Cada dispositivo en internet tiene una **dirección IP**. Los datos viajan en **paquetes**, cada uno con una IP de origen y destino. Los routers a lo largo del camino deciden el mejor siguiente salto para cada paquete.

- **IPv4**: `192.168.1.1` (4 mil millones de direcciones — se agotaron)
- **IPv6**: `2001:0db8:85a3::8a2e:0370:7334` (virtualmente ilimitadas)

## Protocolos Que Lo Hacen Funcionar

| Protocolo | Capa | Propósito |
|---|---|---|
| **HTTP/HTTPS** | Aplicación | Comunicación web |
| **TCP** | Transporte | Entrega fiable y ordenada |
| **UDP** | Transporte | Rápido, sin garantías (vídeo, gaming) |
| **IP** | Red | Direccionamiento y enrutamiento |
| **TLS/SSL** | Seguridad | Cifrado |
| **DNS** | Aplicación | Resolución de nombres |

## Mi Opinión

Entender cómo funciona internet — aunque sea a alto nivel — te hace mejor ingeniero. Cuando un despliegue falla, una API da timeout, o la latencia se dispara, conocer las capas involucradas te ayuda a depurar más rápido.

La próxima vez que tu web cargue en 200ms, recuerda: tu petición viajó por servidores DNS, a través de cables de fibra óptica, llegó a un load balancer, pasó por código de aplicación, consultó una base de datos y volvió — todo en un parpadeo.
