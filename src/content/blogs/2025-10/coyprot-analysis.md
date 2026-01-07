---
title: "Coyprot Analizador Pro: Arquitectura Forense de Datos Telefónicos"
pubDate: "2025-10-06T12:00:00.000Z"
author: Francisco Núñez
description: "Análisis profundo de la ingeniería detrás del sistema de procesamiento CDR con geolocalización multinivel y normalización heurística."
image: logo.png
tags: [python, data-analysis, how-it-works, data-engineering, geolocation, solid-principies]
---

El procesamiento de Registros de Detalles de Llamadas (CDR) en entornos de inteligencia requiere un nivel de precisión quirúrgica. No se trata simplemente de leer archivos Excel; se trata de garantizar la integridad referencial y la trazabilidad cronológica de los datos para la generación de informes interactivos.

Recientemente desarrollé **Analizador de Llamadas**, una herramienta avanzada diseñada bajo principios de arquitectura limpia para transformar sábanas de llamadas crudas en inteligencia accionable mediante geolocalización y análisis estadístico.

## Filosofía de Diseño: Más allá del Scripting

A diferencia de herramientas convencionales, este sistema implementa una separación estricta de responsabilidades (**Separation of Concerns**). La lógica de negocio en el núcleo del sistema está desacoplada de la interfaz de usuario (GUI basada en Tkinter) y de los orquestadores de reportes.

## Arquitectura de Componentes

<pre class="mermaid">
graph TD
    subgraph Ingesta de Datos
        A[Excel/CSV Raw] --> B[Column Mapper Engine]
        B --> C[Data Sanitizer]
    end

    subgraph Núcleo de Procesamiento
        C --> D{Normalización Heurística}
        D --> E[Phone Utils - ISO-CO Standard]
        D --> F[Cell Geocoder - Pattern Matching]
        F --> G[Geocoding Multilevel - GPS/DB/Inference]
    end

    subgraph Capa de Presentación
        G --> H[Report Orchestrator]
        H --> I[Folium Maps Engine]
        H --> J[Matplotlib Analytics]
        H --> K[Jinja2 HTML Generator]
    end

    subgraph Distribución
        K --> L[Portable HTML Bundle]
        L --> M[FTP TLS Upload]
    end
</pre>

## Normalización Telefónica Heurística

Uno de los desafíos en el procesar de los datos es la unificación de identidades. El sistema implementa una normalización estricta que elimina prefijos de país (57), prefijos de operador (132, 005, 009) y basura para evitar duplicados en el análisis forense.

```python
# Lógica de limpieza profunda para estandarización a 10 dígitos (Colombia)
def normalizar_numero_colombia(numero):
    # Manejo de valores vacíos o nulos
    if pd.isna(numero) or str(numero).strip() in ["", "nan", "None", "Desconocido"]:
        return "Desconocido"
    
    # Eliminación de metadatos no numéricos mediante Regex
    s = re.sub(r'\D', '', str(numero)) 
    longitud = len(s)
    
    if longitud == 10:
        return s
    if longitud > 10:
        ultimos_10 = s[-10:]
        # Validación de payload útil (Móvil o Fijo Nuevo)
        if ultimos_10.startswith('3') or ultimos_10.startswith('60'):
            return ultimos_10
    return s

```

## Motor de Geolocalización de 3 Capas (Fall-through)

El sistema implementa un algoritmo de geocodificación multinivel para maximizar la recuperación de datos espaciales:

1. GPS Nativo: Uso automático de coordenadas latitud/longitud presentes en el archivo original.

2. Base de Datos de Celdas: Cruce con un maestro de antenas mediante limpieza de nombres raíz del sitio.

3. Inferencia por Municipio: Si los anteriores fallan, el sistema utiliza heurística de texto para detectar municipios y asignar coordenadas aproximadas basadas en un diccionario especializado de Colombia.

## Secuencia de Geocodificación Forense

<pre class="mermaid"> 
sequenceDiagram 
    participant CDR as CDR Record 
    participant GEO as Geocoder Engine 
    participant DB as Cell Database 
    participant MUN as Colombia Data

CDR->>GEO: Solicitar ubicación (Nombre Celda)
GEO->>GEO: Limpiar sufijos técnicos (_LTE, _R1)
GEO->>DB: Consultar Site Root
alt Existe en DB
    DB-->>GEO: Retornar Coordenadas Exactas
else No existe en DB
    GEO->>MUN: Aplicar Heurística de Municipio
    MUN-->>GEO: Retornar Centroide Geográfico (Inferencia)
end
GEO-->>CDR: Inyectar Geometría (Lat/Lon)

</pre>

## Análisis Visual e Informes Dinámicos

El report_generator.py actúa como un orquestador que consume modelos de datos para construir un ecosistema interactivo basado en Jinja2. El informe final incluye:

* Dashboards Interactivos: Gráficos de tendencias horarias y tooltips inteligentes con enlaces a Google Maps.

* Mapeo Avanzado: Generación de mapas de calor, clusters y rutas cronológicas numeradas para seguir el desplazamiento secuencial del objetivo.

* Gestión Multi-PDF: Soporte para adjuntos categorizados (Financieros, Judiciales, etc.) visualizables directamente en el reporte.

## Ingeniería de Calidad y SOLID

El software se adhiere a las mejores prácticas de ingeniería de software:

* Single Responsibility: Módulos independientes para geolocalización, utilidades telefónicas y gestión FTP.

* Thread-safe UI: Todas las operaciones de procesamiento pesado y subidas por FTP TLS se ejecutan en hilos secundarios para mantener la fluidez de la interfaz gráfica.

* Data Integrity: Implementación de manejadores de errores para reparar formatos de coordenadas incorrectos (ej: corregir 47286 a 4.7286).

El analizador hecho para Coyprot demuestra cómo la aplicación de patrones de diseño avanzados y el procesamiento heurístico de datos pueden transformar registros administrativos en potentes herramientas de investigación criminalística y seguridad.