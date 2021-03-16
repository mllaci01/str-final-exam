import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:3000/users';

  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);



  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  /**
   * Get all users from the database.
   * @returns on observable with all users.
   */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.endpoint}`);
  }

  /**
   * Get a specified user from the database by id.
   * @param id {number} user id.
   * @returns an observable with a user object.
   */
  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  /**
   * Delete a user from the database.
   * The method is: this.http.delete
   */
  remove(user: User): void {
    this.http.delete<User>(
      `${this.endpoint}/${user.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.warning('The event has been deleted.', 'DELETED');
  }


  /**
   * Create a user in the database.
   * The method is: this.http.post
   */
  create(user: User): void {
    this.http.post<Event>(
      `${this.endpoint}`,
      user
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.success('The event has been created.', 'NEW EVENT');
  }


  /**
   * Update a user in the database.
   * The method is: this.http.patch
   */




update(user: User): Observable<User> {
  return this.http.patch<User>(`${this.endpoint}/${user.id}`, user);

}

  /*.subscribe(
    () => this.getAll()
  );
  this.toastr.success('The event has been created.', 'NEW EVENT');*/

}


