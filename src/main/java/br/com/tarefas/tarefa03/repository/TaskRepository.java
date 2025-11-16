package br.com.tarefas.tarefa03.repository;


import br.com.tarefas.tarefa03.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
