import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskRequest, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  isEdit = false;
  taskId: number | null = null;
  loading = false;
  fetchLoading = false;
  error = '';
  fieldErrors: { [key: string]: string } = {};

  task: TaskRequest = {
    title: '',
    description: '',
    status: 'TODO'
  };

  statusOptions: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.taskId = +id;
      this.fetchTask(this.taskId);
    }
  }

  fetchTask(id: number): void {
    this.fetchLoading = true;
    this.taskService.getTaskById(id).subscribe({
      next: (t) => {
        this.task = { title: t.title, description: t.description, status: t.status };
        this.fetchLoading = false;
      },
      error: () => {
        this.error = 'Task not found.';
        this.fetchLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.fieldErrors = {};
    this.error = '';

    if (!this.task.title || this.task.title.trim().length < 3) {
      this.fieldErrors['title'] = 'Title is required and must be at least 3 characters.';
    }
    if (this.task.description && this.task.description.length > 500) {
      this.fieldErrors['description'] = 'Description must be 500 characters or less.';
    }
    if (Object.keys(this.fieldErrors).length > 0) return;

    this.loading = true;

    const action = this.isEdit
      ? this.taskService.updateTask(this.taskId!, this.task)
      : this.taskService.createTask(this.task);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.loading = false;
        if (err?.error && typeof err.error === 'object') {
          this.fieldErrors = err.error;
        } else {
          this.error = 'Something went wrong. Please try again.';
        }
      }
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'TODO': return 'To Do';
      case 'IN_PROGRESS': return 'In Progress';
      case 'DONE': return 'Done';
      default: return status;
    }
  }
}
