package com.dogratech.backend.repository;

import com.dogratech.backend.entity.Task;
import com.dogratech.backend.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByStatus(TaskStatus status, Pageable pageable);
}
