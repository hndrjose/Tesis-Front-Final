export class Comentarios {
    constructor(
        public Idchat: number,
        public fecha: string,
        public comentario: string,
        public Iduser?: number,
        public Idpedido?: number,
        public origen?: string
    ) { }
}
