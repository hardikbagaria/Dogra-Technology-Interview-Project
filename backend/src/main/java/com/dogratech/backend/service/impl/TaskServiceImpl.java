package com.dogratech.backend.service.impl;

import com.dogratech.backend.dto.TaskRequestDTO;
import com.dogratech.backend.dto.TaskResponseDTO;
import com.dogratech.backend.entity.Task;
import com.dogratech.backend.enums.TaskStatus;
import com.dogratech.backend.exception.ResourceNotFoundException;
import com.dogratech.backend.repository.TaskRepository;
import com.dogratech.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Page<TaskResponseDTO> getAllTasks(
            TaskStatus status,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Task> tasks;

        if (status != null) {
            tasks = taskRepository.findByStatus(status, pageable);
        } else {
            tasks = taskRepository.findAll(pageable);
        }

        return tasks.map(this::mapToDTO);
    }

    @Override
    public TaskResponseDTO getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));

        return mapToDTO(task);
    }

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO dto) {

        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .status(dto.getStatus())
                .createdAt(LocalDateTime.now())
                .build();

        return mapToDTO(taskRepository.save(task));
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO dto) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());

        return mapToDTO(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));

        taskRepository.delete(task);
    }

    private TaskResponseDTO mapToDTO(Task task) {

        return TaskResponseDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .build();
    }
}