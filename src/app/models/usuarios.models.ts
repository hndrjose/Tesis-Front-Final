export class Usuario {
    constructor(
        public user: string,
        public password: string,
        public email: string,
        public nombre?: string,
        public direccion?: string,
        public telefono?: string,
        public vocacion?: string,
        public img?: string,
        public role?: string,
        public Iduser?: number
    ) { }
}
