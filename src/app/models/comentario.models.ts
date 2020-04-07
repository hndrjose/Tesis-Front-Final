export class Comentarios {
    constructor(
        public Idchat: number,
        public fecha: string,
        public comentario: string,
        public Iduser?: number,
        public Idactividad?: number,
        public origen?: string,
        public Idorigen?: number,
        public Hora?: string
    ) { }
}
