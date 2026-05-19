# Test de Roles de Equipo

Sistema web para evaluar roles de equipo. 9 roles, 3 categorias (Accion / Mental / Social).
React + TypeScript + Vite. Sin backend — todo corre en el navegador.

## Correr

```bash
npm install
npm run dev      # desarrollo  -> http://localhost:5173
npm run build    # produccion  -> carpeta dist/
npm run preview  # ver el build
```

## Como funciona

- **7 secciones**, cada una con 9 frases. El usuario reparte **10 puntos** por seccion.
- Cada frase suma a uno de los **9 roles**. Maximo por rol: 70 puntos.
- Resultado **3/3/3**: 3 roles naturales, 3 aceptables, 3 a evitar.
- Reveal final animado: confeti, carta del rol, radar de los 9 roles, ranking.

## Idiomas

Espanol / English / Portugues. Selector en la pantalla de inicio.
Detecta el idioma del navegador y recuerda la eleccion (localStorage).

## Estructura

```
src/
  data/roles.ts        metadatos estaticos de los 9 roles (color, emoji, grupo)
  data/questions.ts    estructura del cuestionario (que rol mapea cada frase)
  i18n/                es.ts / en.ts / pt.ts  -> todo el texto traducible
  lib/scoring.ts       motor de puntaje y clasificacion 3/3/3
  lib/storage.ts       progreso e historial en localStorage
  components/          Intro, Question, Calculating, Results, RadarChart, Confetti...
```

## Nota legal

Las 63 frases del cuestionario son de **redaccion propia y original**.
NO reproducen el inventario oficial de Belbin Associates (material con copyright).
El modelo de 9 roles es un marco conceptual de uso general; los textos son propios.
Para uso comercial certificado, usar la herramienta oficial de Belbin.

## Personalizar

- Cambiar frases / traducciones: editar `src/i18n/{es,en,pt}.ts`.
- Cambiar mapeo frase-rol: editar `src/data/questions.ts` (el array `roles` de cada seccion
  debe quedar alineado por indice con los `statements` de cada idioma).
- Agregar idioma: crear `src/i18n/xx.ts`, registrarlo en `src/i18n/index.ts`.
```
