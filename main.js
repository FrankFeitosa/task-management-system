import { menu, mostrarTarefas, criarTarefas, tarefasConcluidas, tarefasNaoConcluidas, tarefaAConcluir } from './funcoes.js'
import PromptSync from 'prompt-sync';
const prompt = PromptSync()

let item;
console.log(menu())
do {
    item = +prompt("Escolha um dos itens do Gerenciador de Tarefa: ")
    switch (item) {
        case 1:
            await criarTarefas()
            break;
        case 2:
            await mostrarTarefas()
            break;
        case 3:
            await tarefasConcluidas()
            break;
        case 4:
            await tarefasNaoConcluidas()
            break;
        case 5:
            await tarefaAConcluir()
            break;
        case 6:
            console.log("Sair do Gerenciador")
            break;
        default:
            console.log("Opção inválida. Tente outra vez.")
            break;
    }
} while (item !== 6);

