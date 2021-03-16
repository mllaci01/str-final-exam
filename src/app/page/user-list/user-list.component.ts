import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.userList$;


   selectedItemToDelete: User = new User;


   filterPhrase: string = '';
   filterKey: string = 'name';


   sortby: string = 'id';

  constructor(
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.userService.getAll();
    this.users$.subscribe(
         );
  }


  setToDelete(user: User): void {
    this.selectedItemToDelete = user;
  }

  deleteItem(): void {
    this.userService.remove(this.selectedItemToDelete).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

  setSorter(param: string): void {
    this.sortby = param;
    const selectedHeader = document.querySelector('#header_'+param);
    const tableHeaders = document.querySelectorAll('.table__header');
    tableHeaders.forEach(element => {
      element.classList.remove('table__header--active');
    })
    selectedHeader?.classList.add('table__header--active');
  }


}
