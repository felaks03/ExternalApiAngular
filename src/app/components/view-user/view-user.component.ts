import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  arrData: User[] = []
  myUsers: User[] = []

  async ngOnInit(): Promise<void> {
    let response = this.arrData = await this.usersService.getAll()
    this.myUsers = response.data
    this.getId()
  }

  myUser: User[] | any

  getId() {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.id
      this.myUser = this.myUsers.find(user => user.id == id)
      console.log(this.myUser)
    })
  }
}
