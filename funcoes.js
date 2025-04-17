import fs from 'fs/promises';
import PromptSync from 'prompt-sync';
const tarefas = '../task-management-system/tarefas.json'
const prompt = PromptSync()

export function menu () {
    return `
        Menu  de operações de tarefas:
        1 - Visualise uma tarefa.
        2 - Crie uma tarefa.
        3 - Atualize uma tarefa.
        4 - Concluir tarefa.
        `
}

export async function lerTarefas() {
    try {
        const dados = await fs.readFile(tarefas, 'utf-8');
        return JSON.parse(dados) 
    } catch (error) {
        console.error(`Erro ao ler o arquivo ${error.message}`)
        return undefined
    }
}

export async function escreverNoArquivo(listaTarefas) {
    const listaTarefasString = JSON.stringify(listaTarefas, null, 2)
    try {
        await fs.writeFile(tarefas, listaTarefasString, 'utf-8')
        return "Arquivo Atualizado"
    } catch (error) {
        console.error(`Erro ao escrever o arquivo ${error.message}`)
        return undefined
    }
}

export async function mostrarTarefas() {
    try {
        const todasAsTarefas = await lerTarefas();
        console.log( await todasAsTarefas )
    } catch (error) {
        console.error(`Erro ao mostrar o arquivo ${error.message}`)
        return undefined
    }
}

export async function tarefasConcluidas(){
    const tarefa = await lerTarefas()
    const realizadas = tarefa.filter(r => r.concluida == true)
    if(!realizadas){
        console.log("Não Encontradas!")
    }
    console.log(`Tarefas concluídas com sucesso: ${realizadas.forEach( (item, index) => {
    console.log(` ${index + 1} => Titulo - ${item.titulo} | Descrição - ${item.descricao} | Concluídas ${item.concluida}`)        
    })}`)
}
export async function criarTarefas() {
    const tarefa = await lerTarefas()
    const titulo = prompt("Digite o título da tarefa: ")
    const descricao = prompt("Descreva sua tarefa: ")
    const idNovo = tarefa[tarefa.length-1].id + 1;

    const novaTarefa = {
        id: idNovo,
        titulo,
        descricao,
        concluida: false
    }

    tarefa.push(novaTarefa)
    await escreverNoArquivo(tarefa)
}
