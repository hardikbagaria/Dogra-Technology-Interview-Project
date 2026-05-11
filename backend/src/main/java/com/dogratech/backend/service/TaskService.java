package com.dogratech.backend.service;

import com.dogratech.backend.dto.TaskRequestDTO;
import com.dogratech.backend.dto.TaskResponseDTO;
import com.dogratech.backend.enums.TaskStatus;
import org.springframework.data.domain.Page;

public interface TaskService {

    Page<TaskResponseDTO> getAllTasks(
            TaskStatus status,
            int page,
            int size,
            String sortBy,
            String direction
    );

    TaskResponseDTO getTaskById(Long id);

    TaskResponseDTO createTask(TaskRequestDTO dto);

    TaskResponseDTO updateTask(Long id, TaskRequestDTO dto);

    void deleteTask(Long id);
}