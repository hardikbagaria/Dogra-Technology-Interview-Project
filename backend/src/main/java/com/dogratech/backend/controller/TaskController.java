package com.dogratech.backend.controller;

import com.dogratech.backend.dto.TaskRequestDTO;
import com.dogratech.backend.dto.TaskResponseDTO;
import com.dogratech.backend.enums.TaskStatus;
import com.dogratech.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<Page<TaskResponseDTO>> getAllTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {

        return ResponseEntity.ok(
                taskService.getAllTasks(
                        status,
                        page,
                        size,
                        sortBy,
                        direction
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {

        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(
            @Valid @RequestBody TaskRequestDTO dto
    ) {

        return ResponseEntity.ok(taskService.createTask(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequestDTO dto
    ) {

        return ResponseEntity.ok(taskService.updateTask(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

        return ResponseEntity.ok("Task deleted successfully");
    }
}
