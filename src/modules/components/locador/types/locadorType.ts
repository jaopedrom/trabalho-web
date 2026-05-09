// interface que herda pessoa e imoveis
// 1:n 1 locador pode possuir n imoveis

import {Pessoa} from "@/src/modules/components/pessoa/types/pessoaType";
import {ImovelType} from "@/src/modules/components/imoveis/types/imoveisType";

export interface LocadorType extends Pessoa{
    imoveis: ImovelType[];
}