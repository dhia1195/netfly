import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Correct import for FormsModule
import { ChatService } from 'app/service/chat.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule 
  ],
  declarations: [],
  exports: [],
  providers: [ChatService]
})
export class ChatModule { }
