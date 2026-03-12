/** Noticia del carrusel Stories (con video) */
export interface NoticiaVideo {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  icon?: string;
  video?: string;
  categoria: string;
}

/** Noticia/Proyecto con página de detalle */
export interface NoticiaProyecto {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  detalleCompleto: string;
  beneficios?: string[];
  conclusion?: string;
  icon: string;
  portada?: string;
  fotos?: string[];
  videoDetalle?: string;
  categoria: string;
  destacada: boolean;
}
