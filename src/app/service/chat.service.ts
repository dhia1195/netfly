import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'https://pi-dev-4twin3-group7-12.onrender.com';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    // Set headers to send form data
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Convert message to form data
    const formData = new FormData();
    formData.append('msg', message);

    // Convert form data to URL encoded format
    const urlEncodedFormData = new URLSearchParams(formData as any).toString();

    // Send POST request with URL encoded form data
    return this.http.post<any>(`${this.baseUrl}/chat`, urlEncodedFormData, { headers });
  }
}
