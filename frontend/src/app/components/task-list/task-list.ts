import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Task} from '../../models/task';
import {Api} from '../../services/api';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {

  public tasks: Task[] = [];
  public newTaskDescription: string = '';

  constructor(private apiService: Api) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.apiService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        console.log('Tarefas carregadas!', data);
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  addTask(): void {
    if (!this.newTaskDescription.trim()) {
      return;
    }

    const newTask: Task = {
      descricao: this.newTaskDescription,
      completo: false
    };

    this.apiService.addTask(newTask).subscribe(
      (savedTask) => {
        this.tasks.push(savedTask);
        this.newTaskDescription = '';
      },
      (error) => {
        console.error('Erro ao adicionar tarefa:', error);
      }
    );
  }

  toggleTaskCompletion(task: Task): void {
    task.completo = !task.completo;

    this.apiService.updateTask(task).subscribe(
      (updatedTask) => {
        console.log('Tarefa atualizada!', updatedTask);
      },
      (error) => {
        task.completo = !task.completo;
        console.error('Erro ao atualizar tarefa:', error);
      }
    );
  }

  deleteTask(id: number | undefined): void {
    if (!id) return;

    this.apiService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar tarefa:', error);
      }
    );
  }
}
