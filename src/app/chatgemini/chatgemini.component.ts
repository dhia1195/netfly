import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ChatService } from 'app/service/chat.service';
import { FormBuilder, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-chatgemini',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    NgApexchartsModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatProgressBarModule,
    CurrencyPipe,
    DatePipe,
    RouterLink,
    HttpClientModule,    NgxChartsModule,  FormsModule

],
  templateUrl: './chatgemini.component.html',
  styleUrl: './chatgemini.component.scss'
})
export class ChatgeminiComponent {
  message = '';
  response = '';
  chatHistory: { message: string, response?: string ,date:string}[] = [];

  constructor(private chatService: ChatService) { }

  sendMessage(): void {
    console.log(this.message)
    if (!this.message.trim()) { // Check if the message is empty or contains only spaces
      this.response = 'No message provided';
      return;
    }
    const messageToSend = this.message;

    this.chatService.sendMessage(messageToSend).subscribe(
      (res) => {
        this.response = res.response;
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const str_time = hour + ":" + (minute < 10 ? "0" + minute : minute);
        this.chatHistory.push({ message: messageToSend, response: this.response, date: str_time });
      },
      (err) => {
        console.error('An error occurred:', err);
        this.response = 'An error occurred. Please try again.';
        this.chatHistory.push({ message: messageToSend, response: this.response, date: "" });
      }
    );

    this.message = ''; // Clear the message after sending
  }
}