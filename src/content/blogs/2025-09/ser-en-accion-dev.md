---
title: "Ingeniería de Ser en Acción: Sistema de Match Laboral Basado en COUC"
pubDate: "2025-12-27T18:00:00.000Z"
author: Francisco Núñez
description: "Análisis técnico del desarrollo de una plataforma de reclutamiento sostenible utilizando Node.js, Tailwind CSS y la integración de la Clasificación Única de Ocupaciones para Colombia."
tags: [nodejs, tailwindcss, arquitectura-software, data-analysis]
---

El proyecto **Ser en Acción** representa una evolución en los sistemas de adquisición de talento. Técnicamente, el reto consistió en transformar la estructura semántica de la **Clasificación Única de Ocupaciones para Colombia (COUC)** en un modelo de datos relacional capaz de ejecutar cálculos de compatibilidad en tiempo real entre perfiles de candidatos y vacantes empresariales.

## Arquitectura del Sistema

La plataforma se construyó bajo un enfoque de **arquitectura de microservicios desacoplados**, permitiendo que el motor de búsqueda y el algoritmo de match operen de forma independiente al núcleo de gestión de usuarios.

* **Backend:** Entorno de ejecución **Node.js**, aprovechando su naturaleza asíncrona para el manejo de múltiples peticiones concurrentes durante los procesos de evaluación masiva.
* **Frontend:** Desarrollado con una arquitectura de componentes modulares, utilizando **Tailwind CSS** para garantizar una interfaz de alta fidelidad, responsive y con un rendimiento optimizado mediante la eliminación de estilos no utilizados (Purge CSS).
* **Base de Datos:** Estructura relacional diseñada para soportar la jerarquía compleja de la COUC (Gran Grupo, Grupo Principal, Grupo Primario y Perfil Ocupacional).

## Implementación Técnica de la COUC

El corazón del sistema es el motor de normalización de vacantes. A diferencia de las plataformas tradicionales que utilizan texto libre, **Ser en Acción** obliga a la persistencia de datos estructurados.

### El Proceso de Estructuración
Cuando una organización registra una vacante, el backend realiza las siguientes acciones:
1.  **Consumo de API/Diccionario:** Mapea la selección de la empresa con los códigos estándar de la COUC.
2.  **Extracción de Competencias:** El sistema desglosa automáticamente el perfil ocupacional en competencias técnicas y habilidades transversales predefinidas por el estándar nacional.
3.  **Ponderación de Atributos:** Se asigna un peso específico ($W$) a cada competencia, permitiendo que la empresa priorice qué habilidades son críticas y cuáles son deseables.

## Algoritmo de Match y Matriz de Resultados

El cálculo de compatibilidad no es una simple búsqueda booleana. Se implementó un algoritmo de **Matriz de Resultados** que evalúa la distancia euclidiana entre el vector del candidato y el vector de la vacante.

$$Compatibilidad = \frac{\sum_{i=1}^{n} (C_i \cdot V_i)}{\sqrt{\sum_{i=1}^{n} C_i^2} \cdot \sqrt{\sum_{i=1}^{n} V_i^2}}$$

Donde:
* $C$: Vector de competencias y habilidades del candidato.
* $V$: Vector de requisitos de la vacante.

### Flujo de Datos Técnico

<pre class="mermaid">
graph LR
    A[Request: Postulación] --> B{Node.js API}
    B --> C[Data Normalizer]
    C --> D[COUC Reference Engine]
    D --> E[Match Calculator]
    E --> F[Result Matrix Persistence]
    F --> G[Tailwind-based UI Dashboard]
</pre>

## Frontend y Experiencia de Usuario con Tailwind CSS

Para la interfaz, se priorizó la velocidad de carga y la claridad de los datos complejos. La elección de **Tailwind CSS** permitió:

1.  **Diseño Atómico:** Creación de componentes de tarjetas de "Match" que cambian de color y estado dinámicamente según el porcentaje de compatibilidad.
2.  **Optimización de Bundle:** Reducción drástica del CSS final, fundamental para usuarios en zonas con conectividad limitada en Colombia.
3.  **Consistencia Visual:** Implementación de un sistema de diseño basado en utilidades que asegura que cada formulario de la COUC mantenga la jerarquía visual necesaria para evitar la fatiga cognitiva del reclutador.

## Seguridad y Escalabilidad

Dado que el sistema maneja información sensible de ciudadanos y empresas:
* **Autenticación:** Implementación de JWT (JSON Web Tokens) para sesiones seguras.
* **Validación de Datos:** Middlewares en Node.js para la limpieza y validación de esquemas (Zod/Joi), garantizando que los datos ingresados cumplan con el estándar COUC antes de ser procesados por la matriz.

## Conclusión

**Ser en Acción** demuestra que la tecnología puede ser un puente hacia la equidad. Al sustituir la subjetividad del reclutador por una matriz técnica basada en Node.js y estándares gubernamentales, logramos un sistema donde el "saber hacer" es el único factor determinante.

---

¿Deseas que incluya algún fragmento de código específico de la lógica del controlador en Node.js o la configuración del tema de Tailwind?