import { Observable } from 'rxjs';
import { User } from '../models/user';

export abstract class UserRepository {
  abstract getusers(): Observable<User[]>;
  abstract registerUser(user: User): Observable<User[]>;
}
