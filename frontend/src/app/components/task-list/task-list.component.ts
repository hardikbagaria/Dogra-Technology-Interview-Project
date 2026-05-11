import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task, TaskStatus, TaskParams } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, RouterModule, DatePipe, NgClass],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error = '';
  deleteLoading: number | null = null;
  successMsg = '';

  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  sortBy = 'createdAt';
  direction: 'asc' | 'desc' = 'desc';

  statusFilter: TaskStatus | '' = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';
    const params: TaskParams = {
      page: this.page,
      size: this.size,
      sortBy: this.sortBy,
      direction: this.direction,
    };
    if (this.statusFilter) params.status = this.statusFilter;

    this.taskService.getTasks(params).subscribe({
      next: (res) => {
        this.tasks = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load tasks. Please try again.';
        this.loading = false;
      }
    });
  }

  onStatusFilterChange(): void {
    this.page = 0;
    this.loadTasks();
  }

  onSort(field: string): void {
    if (this.sortBy === field) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.direction = 'asc';
    }
    this.loadTasks();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadTasks();
  }

  deleteTask(id: number): void {
    if (!confirm('Are you sure you want to delete this task?')) return;
    this.deleteLoading = id;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.deleteLoading = null;
        this.successMsg = 'Task deleted successfully!';
        setTimeout(() => (this.successMsg = ''), 3000);
        this.loadTasks();
      },
      error: () => {
        this.deleteLoading = null;
        this.error = 'Failed to delete task.';
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'TODO': return 'badge-todo';
      case 'IN_PROGRESS': return 'badge-inprogress';
      case 'DONE': return 'badge-done';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'TODO': return 'To Do';
      case 'IN_PROGRESS': return 'In Progress';
      case 'DONE': return 'Done';
      default: return status;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
