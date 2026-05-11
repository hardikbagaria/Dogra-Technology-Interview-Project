import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskRequest, PagedResponse, TaskParams } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly API = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(params: TaskParams = {}): Observable<PagedResponse<Task>> {
    let httpParams = new HttpParams();
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.direction) httpParams = httpParams.set('direction', params.direction);
    if (params.status) httpParams = httpParams.set('status', params.status);
    return this.http.get<PagedResponse<Task>>(this.API, { params: httpParams });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API}/${id}`);
  }

  createTask(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(this.API, task);
  }

  updateTask(id: number, task: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${id}`, task);
  }

  deleteTask(id: number): Observable<string> {
    return this.http.delete(`${this.API}/${id}`, { responseType: 'text' });
  }
}
