import fs from 'fs/promises';
import PromptSync from 'prompt-sync';
const tarefas = '../task-management-system/tarefas.json'
const prompt = PromptSync()

export function menu() {
    return `
        Menu de tarefas:
        1 - Crie uma tarefa.
        2 - Visuaçise todas as tarefas.
        3 - Visualise as tarefas concluídas.
        4 - Visualise as tarefas não concluídas.
        5 - Concluir tarefa.
        6 - Sair.
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
    try {
        const listaTarefasString = JSON.stringify(listaTarefas, null, 2)
        await fs.writeFile(tarefas, listaTarefasString, 'utf-8')
        return "Arquivo Atualizado"
    } catch (error) {
        console.error(`Erro ao escrever o arquivo ${error.message}`)
        return undefined
    }
}

export async function criarTarefas() {
    try {
        const tarefa = await lerTarefas()
        const titulo = prompt("Digite o título da tarefa: ")
        const descricao = prompt("Descreva sua tarefa: ")
        
        const idNovo = tarefa[tarefa.length-1].id + 1;

        const novaTarefa = {
            id: idNovo,
            titulo: titulo,
            descricao: descricao,
            concluida: false
        }

        tarefa.push(novaTarefa)
        await escreverNoArquivo(tarefa)
    } catch (error) {
        console.error(`
        Erro: ${error}
        `)
    }
}

export async function mostrarTarefas() {
    try {
        const todasAsTarefas = await lerTarefas();
        console.log(await todasAsTarefas)
    } catch (error) {
        console.error(`Erro ao mostrar o arquivo ${error.message}`)
        return undefined
    }
}

export async function tarefasConcluidas() {
    try {
        const tarefa = await lerTarefas()
        const realizadas = tarefa.filter(r => r.concluida == true)
        if (!realizadas) {
            console.log("Não Encontradas!")
        }
        console.log(`Tarefas concluídas com sucesso: ${realizadas.forEach((item, index) => {
            console.log(` ${index + 1} => Titulo - ${item.titulo} | Descrição - ${item.descricao} | Concluídas - ${item.concluida}`)
        })}`)
    } catch (error) {
        console.error(`
            Erro: ${error}
            `)
    }
}

export async function tarefasNaoConcluidas() {
    try {
        const tarefa = await lerTarefas()
        const naoConcluidas = tarefa.filter((nr) => nr.concluida == false)
        if (!naoConcluidas) {
            console.log(`Tarefas concluidas ${await tarefasConcluidas()}`)
        }
        console.log(` Tarefas não concluídas: ${naoConcluidas.forEach((item, index) => {
            console.log(`
            ${index + 1} => Titulo - ${item.titulo} | Descrição - ${item.descricao} | Concluídas - ${item.concluida}  
            `)
        })}`)
    } catch (error) {
        console.error(`
        Erro: ${error}
        `)
    }
}

export async function tarefaAConcluir() {
    try {
        const concluir = +prompt("Qual tarefa você quer atualizar como concluída. Escreva o id: ")
        const tarefa = await lerTarefas()

        const tarefaAConcluir = tarefa.find(conclui => conclui.id === concluir)
        if (tarefaAConcluir) {
            tarefaAConcluir.concluida = true
            await escreverNoArquivo(tarefa)
            console.log(" Tarefa concluída com sucesso!")
        }
    } catch (error) {
        console.error(`
            Erro: ${error} 
            `)
    }

}
