# RAE Marketing Services | Official Website

> **Ideas • Estrategia • Resultados**  
> *Tu crecimiento, nuestra pasión.*

Sitio web oficial desarrollado para **RAE Marketing Services** ([raemarketingservices.com](https://raemarketingservices.com/)), diseñado bajo los más altos estándares de **UI/UX, Frontend Development, CRO (Conversion Rate Optimization), SEO y Accesibilidad Web (WCAG AA)**.

---

## 🎨 Identidad de Marca y Brand Guidelines

- **Azul Principal (`#2D4AFF`)**: Confianza, profesionalismo, botones de acción principal, estado activo y enlaces prioritarios.
- **Azul Claro (`#4EA1FF`)**: Innovación, tecnología, modernidad y gradientes secundarios.
- **Azul Oscuro / Navy (`#0F2D6B`)**: Estabilidad, estrategia, solidez (sección *¿Por qué RAE?*, gradiente del banner CTA y *Footer*).
- **Gris Claro (`#F2F4F8`)**: Fondos limpios, tarjetas de soporte y equilibrio visual.
- **Gris Oscuro (`#333333`)**: Tipografía principal con alto contraste de lectura.
- **Blanco (`#FFFFFF`)**: Claridad, espacio negativo y tarjetas de primer nivel.
- **Tipografía Principal**: `Montserrat` (pesos 400, 500, 600, 700, 800).
- **Tipografía de Acento Emocional**: `Caveat` para firmas selectas (*"Tu crecimiento, nuestra pasión.", "Hagamos Grandes Cosas Juntos"*).
- **Logo Oficial**: Circular original `/rae-logo.png` con versiones adaptadas para cabeceras y pie de página.

---

## 🚀 Arquitectura y Secciones de la Landing Page

1. **Header / Sticky Navigation**: Cabecera interactiva con efecto `backdrop-blur` al hacer scroll, logotipo oficial, enlaces de navegación, botón WhatsApp y CTA *"Hablemos"*. Menú responsive lateral para móviles.
2. **Hero Section de Alto Impacto**: 
   - Headline: *"SOLUCIONES DIGITALES PARA NEGOCIOS QUE QUIEREN MÁS"*, con gradiente en *"QUIEREN MÁS"*.
   - Composición visual del ecosistema digital: ventana de navegador interactiva mostrando interfaz web moderna con métricas en tiempo real, smartphone flotante con engagement en redes sociales y badges flotantes dinámicos (`+Engagement`, `+Leads Calificados`, `Automatización 24/7`).
   - Microinteracción de parallax ligero con el mouse y respeto a `prefers-reduced-motion`.
3. **Value Proposition & Trust**: *"NO SOLO MARKETING. CREAMOS EXPERIENCIAS DIGITALES."* con 3 pilares esenciales (Estrategia, Creatividad, Tecnología) y cintillo marquee sutil.
4. **Sobre RAE**: Composición asimétrica que presenta la Misión, Visión y Valores oficiales (Creatividad, Compromiso, Innovación, Transparencia, Resultados, Trabajo en equipo).
5. **Servicios (Bento Grid)**: 5 tarjetas en el orden exacto especificado:
   - `01` **Diseño de Páginas Web** (Bento Card grande con preview UI/UX, responsive y optimización de conversión).
   - `02` **Marketing Digital** (Card mediana con analítica de campañas y posicionamiento).
   - `03` **Manejo de Redes Sociales** (Card vertical con enfoque en contenido visual, reels y comunidad).
   - `04` **Automatización para Negocios** (Card tecnológica con WhatsApp API, CRM e inteligencia artificial).
   - `05` **Diseño Gráfico y Branding** (Card visual de identidad y material corporativo).
6. **¿Por qué RAE?**: Sección profunda en fondo `#0F2D6B` con los 4 pilares:
   - *01. Estrategia antes que diseño*
   - *02. Soluciones personalizadas*
   - *03. Tecnología que simplifica*
   - *04. Enfoque en resultados*
7. **Proceso de Trabajo**: Timeline interactivo de 5 etapas (*Descubrimos → Planificamos → Creamos → Optimizamos → Crecemos*), con visualización horizontal en desktop y vertical en móvil.
8. **Portafolio / Casos de Estudio**: Grid visual con pestañas de filtrado (*Todos, Web Design, Social Media, Branding, Marketing, Automation*) y modal interactivo detallado con desafío, solución, entregables e impacto.
9. **Resultados / Beneficios**: Enfoque en valor comercial tangible (*Más Visibilidad, Más Profesionalismo, Mejor Experiencia, Más Eficiencia, Más Oportunidades*), sin métricas inventadas.
10. **CTA Principal**: Banner prémium con gradiente `#0F2D6B` → `#2D4AFF` y botón *"HABLEMOS DE TU PROYECTO →"*.
11. **Contacto**: Formulario con validación en tiempo real, dropdown de servicios, despacho preformateado a WhatsApp con un solo clic, feedback con confeti y canales oficiales (*WhatsApp 809 419 2390, Instagram @raemarketingservices*).
12. **Footer**: Pie de página institucional en `#0F2D6B` con logotipo, enlaces a todas las secciones y páginas de servicio, y avisos legales.
13. **Botón Flotante de WhatsApp**: Widget interactivo con estado "En línea", ventana emergente con preguntas rápidas y conexión directa a `+1 809 419 2390`.

---

## 📄 Páginas Individuales de Servicio

Cada servicio cuenta con su ruta dedicada para posicionamiento SEO y detalle integral:

- `/diseno-web`: Diseño de Páginas Web
- `/marketing-digital`: Marketing Digital
- `/redes-sociales`: Manejo de Redes Sociales
- `/automatizacion`: Automatización para Negocios
- `/diseno-grafico`: Diseño Gráfico y Branding

Cada página de servicio incluye:
- Hero específico con badge de numeración y llamada a la acción
- El problema recurrente que sufren los negocios
- La solución estratégica del Método RAE
- Beneficios clave
- Lista detallada de entregables incluidos
- Roadmap paso a paso del servicio
- Proyectos relacionados
- Preguntas Frecuentes (FAQ Accordion interactivo)
- Selector rápido entre servicios
- Formulario de contacto pre-seleccionado con el servicio activo

---

## 🛠️ Tecnologías Utilizadas

- **React 19 & TypeScript**: Componentes modulares y tipado estricto.
- **Vite 8**: Compilación ultrarrápida (sub-2s) y recarga instantánea.
- **Tailwind CSS 3.4**: Sistema de diseño a medida con la paleta y sombras oficiales de RAE.
- **Lucide Icons**: Iconografía moderna y minimalista.
- **Canvas-Confetti**: Micro-interacción de confirmación en el formulario.
- **SEO Ready**: Schema.org JSON-LD (`Organization`, `ProfessionalService`, `WebSite`), OpenGraph, Twitter Cards, `robots.txt` y `sitemap.xml`.

---

## 💻 Comandos de Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (genera la carpeta dist/)
npm run build

# Previsualizar el build de producción
npm run preview
```
