import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
import { NEWUSERS } from '../db/newusers.db';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = "https://peticiones.online/api/users"

  newUsers: User[] = []
  constructor
  (
    private httpClient: HttpClient
  ) 
  {
    this.newUsers = NEWUSERS
  }

  arrUsers: Promise<Object> | any
  getAll(): Promise<any> {
    this.arrUsers = lastValueFrom(this.httpClient.get(<any>(this.baseUrl)))
    return this.arrUsers
  }
  getAllNew(){
    return this.newUsers
  }

}
