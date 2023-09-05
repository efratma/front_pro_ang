import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

interface QuizData {
  problem_str: string;
  solution: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000'; // Update with your Django API URL

  constructor(private http: HttpClient) { }

  login(user: { username: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/login/`;
    return this.http.post(url, user);
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/register/`;
    return this.http.post(url, user);
  }

  getDifficultSystemOfEquations(): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    return this.http.get<any>(`${this.apiUrl}/problem/test_2/`, { headers });
  }



getMediumSystemOfEquations(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get<any>(`${this.apiUrl}/problem/test_3/`, { headers });
}

getEasySystemOfEquations() {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get<any>(`${this.apiUrl}/problem/test_4/`, { headers });
}

getHardLawOfDivision(): Observable<QuizData> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get<QuizData>(`${this.apiUrl}/problem/test/`, { headers });
}

getEasyLawOfDivision() {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get<QuizData>(`${this.apiUrl}/problem/test_1/`, { headers });
}

getHardEquationInOneVanishing(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_5/`, { headers });
}

getMediumEquationInOneVanishing(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_6/`, { headers });
}

getEasyEquationInOneVanishing(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_7/`, { headers });
}

getPythagorasEasy(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_14/`, { headers });
}

getPythagorasHard(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_8/`, { headers });
}

getLinearLine(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_9/`, { headers });
}
getCuttingPoints(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_11/`, { headers });
}

getMeetingPoint(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_10/`, { headers });
}


getTriangularArea(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get(`${this.apiUrl}/problem/test_13/`, { headers });
}
// auth.service.ts
logout(): void {
  localStorage.removeItem('token');  // Assuming you're using a token for authentication.
}
isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}
getUserExercises(): Observable<any> {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return this.http.get<any>(`${this.apiUrl}/user-exercises/`, { headers });
}
}






