import Swal from 'sweetalert2'
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
    let newUsers = this.usersService.getAllNew()
    let response = this.arrData = await this.usersService.getAll()
    this.myUsers = response.data
    this.myUsers = this.myUsers.concat(newUsers)
  }

  deleteUsers($event: any){
    Swal.fire({
      title: 'Warning!',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      iconColor: 'red',

      showCancelButton: true,
      cancelButtonText: 'Cancel',

      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',

      reverseButtons: true,
    }).then((result) => {
      if(result.isConfirmed){
        let deleteUser: any = this.myUsers.find(user => user.id == $event.target.value)
        let deletePos: number = this.myUsers.indexOf(deleteUser)
        this.myUsers.splice(deletePos, 1)

        Swal.fire({
          title: 'Exito',
          icon: 'success',
          text: 'Se a eliminado a ' + deleteUser.first_name + ' ' + deleteUser.last_name + ' correctamente',
          timer: 2500,
          showConfirmButton: false
        })
      }
    })
  }
}
