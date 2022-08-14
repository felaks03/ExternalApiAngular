import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  arrData: User[] = []
  constructor
  (
    private usersService: UsersService
  ) { }

  myUsers: User[] = []
  async ngOnInit(): Promise<void> {
    let response = this.arrData = await this.usersService.getAll()
    this.myUsers = response.data
    console.log(response.data)
  }


}
