import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private http = inject(HttpClient);
  
  protected readonly title = signal('PECC Interface');
  protected readonly responseMessage = signal('');

  private apiUrl = 'https://mschustereder-pecc.hf.space/chat';

  sendRequest() {
    const payload = { message: "Austria" };
    
    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: (res) => {
        console.log('Success:', res);
        this.responseMessage.set(res.reply);
      },
      error: (err) => {
        console.error('Error:', err);
        this.responseMessage.set('Connection failed.');
      }
    });
  }
}