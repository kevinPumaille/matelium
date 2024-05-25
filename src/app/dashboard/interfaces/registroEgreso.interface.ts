export interface RegistroEgreso{
    id?: string;
    categoria: string;
    monto: number;
    dia: number;
    mes: number;
    anio: number;
    idUsuario?: string;
}