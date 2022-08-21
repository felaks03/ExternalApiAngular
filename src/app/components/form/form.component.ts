import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { CardUserComponent } from '../card-user/card-user.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myUsers!: User[] | undefined

  constructor
  (
    private usersService: UsersService,
    private router: Router
  ) 
  {
    this.formModel = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z ]{2,254}/)
      ]), 
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z ]{2,254}/)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\S+\@\S+\.[com,es]/)
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[https://]\S+\.[png, jpg, webp]/)
      ]),
    }, [])
  }

  formModel: FormGroup

  ngOnInit(): void {
  }

  id: number = 12

  async getData(){
    if(this.formModel.value){
      //Inserto el usuario en el array del api, pero como no se dibuja luego en la lista lo añado tambien a la base de datos local

      this.formModel.value.id = this.id
      this.id++
      let response = await this.usersService.getAll()
      this.myUsers = response.data
      this.myUsers?.push(this.formModel.value)
      console.log(this.myUsers)

      this.usersService.getAllNew().push(this.formModel.value)
      this.router.navigate(['/home'])
    } else {
      alert("el formulario no está relleno")
    }
  }

  checkControl(_input: string, _error: string) {
    return this.formModel.get(_input)?.hasError(_error) && this.formModel.get(_input)?.touched
  }
}