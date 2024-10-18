import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { UserDTOInterface, UserInterface } from '../models/user.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
// import { generateKeyPairSync } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  createUser(userDto: UserDTOInterface) : Observable<UserInterface> {
    const publicKey = `publicKey`;
    const privateKey = `privateKey`;

    console.log(publicKey, privateKey);

    userDto.public_key = publicKey;

    return this.http.post<UserInterface>(`${this.apiUrl}/users`, userDto)
    .pipe(map((user: UserInterface) => {
      user.private_key = privateKey;
      return user;
    }));
  }



  login(user: UserInterface) {

  }
}
