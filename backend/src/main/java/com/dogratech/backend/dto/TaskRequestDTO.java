package com.dogratech.backend.dto;

import com.dogratech.backend.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequestDTO {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    @NotNull(message = "Status is required")
    private TaskStatus status;
}