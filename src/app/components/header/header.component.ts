import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor
  (
    private usersService: UsersService
  ) { }

  arrData: User[] = []
  myUsers: User[] = []
  async ngOnInit(): Promise<void> {
    let response = this.arrData = await this.usersService.getAll()
    this.myUsers = response.data
  }

}
