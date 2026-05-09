// interface que herda de pessoa

import {Pessoa} from "@/src/modules/components/pessoa/types/pessoaType";

export interface HospedeType extends Pessoa{
    cpf: string;
}