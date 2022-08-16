import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor
  (
    private usersService: UsersService
  ) { }

  arrData: User[] = []
  myUsers: User[] = []
  async ngOnInit(): Promise<void> {
    let response = this.arrData = await this.usersService.getAll()
    this.myUsers = response.data
    console.log(this.myUsers)
  }

}
