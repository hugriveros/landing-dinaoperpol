import type { NoticiaVideo, NoticiaProyecto } from '../types/noticias';

// ─── Helpers de URL ─────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function noticiaUrl(titulo: string, id: number): string {
  return `${import.meta.env.BASE_URL}noticia/${slugify(titulo)}-${id}`;
}

// ─── Noticias del carrusel Stories ─────────────────────────────────────────

export const noticiasVideos: NoticiaVideo[] = [
  {
    id: 9,
    titulo: "Inauguración de la 29ª Comisaría de Carabineros La Farfana",
    fecha: "10 de Marzo, 2026",
    descripcion: "Inauguración oficial de la 29ª Comisaría de Carabineros La Farfana.",
    video: "",
    categoria: "Infraestructura"
  },
  {
    id: 8,
    titulo: "Aniversario L.6",
    fecha: "05 de Agosto, 2025",
    descripcion: "Conmemoración del aniversario del Departamento L.6 y su contribución operacional.",
    video: "videos/ANIVERSARIO L.6 05-08-25.mov",
    categoria: "Institucional"
  },
  {
    id: 7,
    titulo: "Lanzamiento Subasta Inversa Electrónica",
    fecha: "19 de Junio, 2025",
    descripcion: "Lanzamiento oficial del sistema de Subasta Inversa Electrónica institucional.",
    video: "videos/VIDEO SUBASTA INVERSA ELECTRONICA LANZAMIENTO 19-06-25.mov",
    categoria: "Tecnología"
  },
  {
    id: 6,
    titulo: "Video Aniversario Depto L.6",
    fecha: "05 de Junio, 2025",
    descripcion: "Video conmemorativo del aniversario del Departamento L.6 institucional.",
    video: "videos/VIDEO ANIVERSARIO DEPTO L.6 05-06-25.mov",
    categoria: "Institucional"
  },
  {
    id: 5,
    titulo: "Día de la Ingeniería",
    fecha: "13 de Mayo, 2025",
    descripcion: "Celebración del Día de la Ingeniería y reconocimiento al personal técnico.",
    video: "videos/VIDEO DIA DE LA INGENIERIA 13-05-25.mov",
    categoria: "Celebración"
  },
  {
    id: 4,
    titulo: "Día de la Madre",
    fecha: "10 de Mayo, 2025",
    descripcion: "Homenaje institucional en el Día de la Madre a funcionarias y familias.",
    video: "videos/VIDEO DIA DE LA MADRE 10-05-25.mov",
    categoria: "Celebración"
  },
  {
    id: 3,
    titulo: "Aniversario Departamento Finanzas",
    fecha: "2025",
    descripcion: "Celebración del aniversario del Departamento de Finanzas reconociendo su labor estratégica.",
    video: "videos/ANIVERSARIO DEPTO FINANZAS.mp4",
    categoria: "Institucional"
  },
  {
    id: 2,
    titulo: "Aniversario MICC",
    fecha: "2025",
    descripcion: "Celebración del aniversario del Módulo de Información y Control de Carabineros.",
    video: "videos/ANIVERSARIO MICC.mov",
    categoria: "Institucional"
  },
  {
    id: 1,
    titulo: "Día del SOM 2025",
    fecha: "2025",
    descripcion: "Conmemoración del Día del Servicio de Orden y Movilización institucional.",
    video: "videos/DIA DEL SOM 2025.mp4",
    categoria: "Celebración"
  }
];

// ─── Noticias/Proyectos con página de detalle ───────────────────────────────
// Agregar nuevas noticias aquí. Los IDs deben ser únicos y no reutilizarse.

export const proyectos: NoticiaProyecto[] = [
  {
    id: 4,
    titulo: "Inauguración 29ª Comisaría La Farfana en la comuna de Maipú",
    fecha: "Martes 10 de Marzo 2026",
    descripcion: "La 29ª Comisaría La Farfana, ubicada en Av. Isabel Riquelme N°1253 esquina Av. El Rosal en Maipú, fortalece el despliegue operativo en el sector poniente de la Región Metropolitana con una inversión que supera los 11.800 millones de pesos.",
    detalleCompleto: "La 29ª Comisaría La Farfana, ubicada en Avenida Isabel Riquelme N°1253, esquina Avenida El Rosal, en la comuna de Maipú, corresponde a un importante proyecto de infraestructura policial desarrollado por Carabineros de Chile para fortalecer el despliegue operativo en el sector poniente de la Región Metropolitana.\n\nLa iniciativa, financiada con recursos sectoriales institucionales y ejecutada por la Dirección Regional de Arquitectura del Ministerio de Obras Públicas, contempla la construcción de un moderno cuartel de tipología operativo territorial, con dos niveles y un subterráneo, que alcanza una superficie construida de 3.295,8 m² en un terreno fiscal de 3.527 m².\n\nLas obras civiles, cuya inversión supera los 11.800 millones de pesos, se iniciaron el 28 de diciembre de 2023 y finalizaron contractualmente el 25 de noviembre de 2025, concretándose la entrega a explotación del cuartel el 10 de diciembre de 2025.\n\nEl proyecto considera además la implementación progresiva de mobiliario, equipamiento tecnológico, sistemas de comunicaciones, CCTV y una futura dotación de vehículos policiales.",
    beneficios: [
      "Fortalecimiento del despliegue operativo en el sector poniente de la Región Metropolitana.",
      "Moderno cuartel de 3.295,8 m² con dos niveles y un subterráneo.",
      "Implementación de tecnología: CCTV, sistemas de comunicaciones y equipamiento.",
      "Mejora de la seguridad y presencia policial en la comuna de Maipú y su entorno."
    ],
    conclusion: "Este proyecto fortalece las capacidades operativas de la Prefectura Santiago Rinconada, contribuyendo decisivamente a mejorar la seguridad y la presencia policial en la comuna de Maipú y su entorno, en línea con el compromiso institucional de acercar Carabineros a la comunidad.",
    icon: "",
    portada: "noticias/inaguracion_29_comisaria/portada.jpeg",
    fotos: [
      "noticias/inaguracion_29_comisaria/1.jpeg",
      "noticias/inaguracion_29_comisaria/2.jpeg",
      "noticias/inaguracion_29_comisaria/3.jpeg"
    ],
    videoDetalle: "",
    categoria: "Infraestructura",
    destacada: true
  },
  {
    id: 3,
    titulo: "Inauguración de Salas Modulares en la Escuela de Formación de Carabineros ESFOCAR",
    fecha: "Miércoles 4 de Marzo 2026",
    descripcion: "El día 04 de marzo se realizó la ceremonia de inauguración de 5 salas modulares y 4 baños en la Escuela de Formación de Carabineros, con una inversión sobre los 430 millones de pesos.",
    detalleCompleto: "El día 04 de marzo, se realizó la ceremonia de inauguración de Salas Modulares en la Escuela de Formación de Carabineros, lo cual consiste en 5 salas modulares y 4 baños, conforme a módulos prefabricados con instalación sanitaria y eléctrica.\n\nLas obras tienen una inversión sobre los 430 millones de pesos e instaladas en el sector occidental a la ESFOCAR en Cerrillos. Este tipo de infraestructura proporcionará una incorporación de una cifra superior a 100 alumnos a la Escuela de Formación.\n\nA la ceremonia asistieron representantes de gobierno, como la Subsecretaria de Prevención del Delito, Sra. Carolina Leitao, y parte del alto mando institucional.",
    beneficios: [
      "Incorporación de más de 100 nuevos alumnos a la Escuela de Formación.",
      "Infraestructura prefabricada moderna con instalaciones sanitarias y eléctricas.",
      "Inversión sobre los 430 millones de pesos en beneficio de la formación policial.",
      "Ampliación de la capacidad operativa de la ESFOCAR en Cerrillos."
    ],
    conclusion: "Esta obra refuerza el compromiso institucional con la formación de nuevos carabineros, entregando condiciones dignas y modernas para el desarrollo académico y práctico de los futuros integrantes de Carabineros de Chile.",
    icon: "",
    portada: "noticias/inaguracion_salas_modulares/portada.jpeg",
    fotos: [
      "noticias/inaguracion_salas_modulares/1.jpeg",
    ],
    videoDetalle: "",
    categoria: "Infraestructura",
    destacada: false
  },
  {
    id: 2,
    titulo: "Se inaugura nuevo punto de posada para helicópteros en retén de Carabineros de Choshuenco y Riñihue",
    fecha: "Lunes 2 Marzo 2026",
    descripcion: "El día viernes 27 de febrero de 2026, se realizó la entrega oficial del Punto de Posada para Helicópteros (PPH) en el Retén de Carabineros Choshuenco, una infraestructura clave para reforzar los puntos donde la geografía impone desafíos.",
    detalleCompleto: "El día viernes 27 de febrero de 2026, se realizó la entrega oficial del Punto de Posada para Helicópteros (PPH) en el Retén de Carabineros Choshuenco, una infraestructura clave para reforzar los puntos donde la geografía impone desafíos. Esta entrega oficial, contempla dos PPH en territorios como Choshuenco y Riñihue, localidades en donde la distancia es un factor crítico, pero con este tipo de infraestructura se garantiza una conexión concreta y protección para la comunidad. Estas iniciativas superan los 200 millones de pesos y se encuentran en el compromiso presidencial de contar con 100 puntos de posada para helicópteros al mes de marzo de 2026. A la fecha, se han logrado terminar 110 plataformas, de las cuales 25 de ellas se encuentran en recintos de Carabineros de Chile.",
    beneficios: [
      "Reducir los tiempos de respuesta ante emergencias.",
      "Fortalecer la labor preventiva y el patrullaje.",
      "Entregar mayor sensación de seguridad a vecinos y turistas.",
      "Generar un vínculo más directo entre Carabineros y la comunidad."
    ],
    conclusion: "Esta infraestructura se encuentra plenamente alineada con el Plan de Desarrollo Policial \"Carabineros del Centenario\", particularmente en su eje estratégico vinculado a la cadena logística eficiente para el apoyo a las funciones policiales. Así, estos nuevos PPH son símbolos de previsión, cooperación y servicio público; y que, cuando sean requeridos, permitan salvar vidas, proteger comunidades y fortalecer la seguridad de Chile.",
    icon: "",
    portada: "noticias/Inaguracion_Helipuertos_Rinihue/portada.png",
    fotos: [
      "noticias/Inaguracion_Helipuertos_Rinihue/1.jpg"
    ],
    videoDetalle: "",
    categoria: "Infraestructura",
    destacada: false
  },
  {
    id: 1,
    titulo: "Inicio de Mecánica de Suelos para el nuevo Edificio DIGCAR",
    fecha: "Martes 27 de Enero 2026",
    descripcion: "El 27 de enero de 2026 se da un importante avance en materia de infraestructura institucional con el inicio del despeje del área para los trabajos de mecánica de suelos del nuevo Edificio DIGCAR, destinado a albergar el nivel estratégico de Carabineros de Chile.",
    detalleCompleto: "El día martes 27 de enero de 2026 se da un importante avance en materia de infraestructura institucional, en donde se inicia el despeje del área para el posicionamiento de la máquina de perforación rotatoria, trabajos relacionados a la mecánica de suelos del proyecto.\n\nEste edificio está destinado a albergar el nivel estratégico de Carabineros de Chile, iniciativa que fue postulada a etapa de diseño y obtuvo recomendación satisfactoria (RS) durante el proceso presupuestario del año 2019.\n\nEl proyecto contempla la edificación de un moderno complejo de 23.518 m², compuesto por ocho pisos sobre nivel y tres subterráneos. Su emplazamiento se proyecta en terrenos fiscales ubicados en Zenteno N° 96-98 y Portada de Guías N° 54, incorporando además terrenos del Serviu Metropolitano en San Diego N° 61 al 79, lo que permitirá conformar una superficie aproximada de 3.182 m².\n\nEsta iniciativa busca concentrar diversas altas reparticiones institucionales en un solo lugar, generando beneficios significativos para la Institución.",
    beneficios: [
      "Concentración de altas reparticiones institucionales en un único complejo moderno.",
      "Ahorro en costos de arriendo de dependencias actuales.",
      "Reducción de desplazamientos y optimización operativa.",
      "Edificio de 23.518 m² con 8 pisos sobre nivel y 3 subterráneos en el centro de Santiago."
    ],
    conclusion: "Esta iniciativa representa un hito histórico en la modernización de la infraestructura estratégica de Carabineros de Chile, concentrando el nivel directivo superior en un complejo moderno que optimizará la operación institucional y liberará dependencias para otras necesidades operativas.",
    icon: "",
    portada: "noticias/inicio_mecanica_suelo_digcar/portada.jpeg",
    fotos: [],
    videoDetalle: "",
    categoria: "Infraestructura",
    destacada: false
  }
];