import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

export interface EconomyData {
  region: string;
  gdp_total_nominal: string;
  gdp_per_capita_nominal: string;
  year: string;
}

export interface PeccData {
  population: string;
  economy: EconomyData;
  capital: string;
  currency: string;
  summary: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private http = inject(HttpClient);
  
  protected readonly countryInput = signal('');
  protected readonly isLoading = signal(false);
  
  protected readonly peccData = signal<PeccData | null>(null);
  protected readonly errorMessage = signal('');

  private apiUrl = 'https://mschustereder-pecc.hf.space/chat';

  sendRequest() {
    if (!this.countryInput().trim()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.peccData.set(null);

    const payload: ChatRequest = { message: this.countryInput() };
    
    this.http.post<ChatResponse>(this.apiUrl, payload).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        try {
          const parsedData: PeccData = JSON.parse(res.reply);
          this.peccData.set(parsedData);
        } catch (e) {
          console.error('cannot parse JSON:', res.reply);
          this.errorMessage.set('got invalid data format from PECC.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error:', err);
        this.errorMessage.set('Connection failed. Please check the PECC API status.');
      }
    });
  }
}
