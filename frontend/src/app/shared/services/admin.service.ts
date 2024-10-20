import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { SignupResponse, UserDTOInterface, UserInterface } from '../models/user.interface';
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

  createUser(userDto: UserDTOInterface) : Observable<SignupResponse> {
    const publicKey = `publicKey`;
    const privateKey = `privateKey`;

    console.log(publicKey, privateKey);

    userDto.public_key = publicKey;

    return this.http.post<UserInterface>(`${this.apiUrl}/users`, userDto)
    .pipe(map((user: UserInterface) => {
      // user.private_key = privateKey;
      const res : SignupResponse = {
        private_key: privateKey,
        user: user
      };
      return res;
    }));
  }

  loginUser(userDto: UserDTOInterface, privateKey: string) : Observable<SignupResponse> {
    return this.http.post<UserInterface>(`${this.apiUrl}/users/login`, userDto)
    .pipe(map((user: UserInterface) => {
      const res : SignupResponse = {
        private_key: privateKey,
        user: user
      };
      return res;
    }));
  }
}
