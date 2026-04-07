import { Component, signal, inject, HostListener, OnInit } from '@angular/core';
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
export class App implements OnInit {
  private http = inject(HttpClient);
  
  protected readonly countryInput = signal('');
  protected readonly isLoading = signal(false);
  
  protected readonly peccData = signal<PeccData | null>(null);
  protected readonly errorMessage = signal('');
  
  protected readonly textareaRows = signal(1);

  private apiUrl = 'https://mschustereder-pecc.hf.space/chat';

  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWindowSize();
  }

  private checkWindowSize() {
    if (window.innerWidth <= 480) {
      this.textareaRows.set(3);
    } else if (window.innerWidth <= 768) {
      this.textareaRows.set(2);
    } else {
      this.textareaRows.set(1);
    }
  }

  private handleFallbackError() {
    this.peccData.set({
      population: "N/A",
      economy: {
        region: "N/A",
        gdp_total_nominal: "N/A",
        gdp_per_capita_nominal: "N/A",
        year: "N/A"
      },
      capital: "N/A",
      currency: "N/A",
      summary: "Hello, I am PECC. I encountered a temporary network or processing error while attempting to fetch data for your request. Please try searching again."
    });
  }

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
          this.handleFallbackError();
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error:', err);
        this.handleFallbackError();
      }
    });
  }
}
