import { Component, OnInit } from '@angular/core';

import { Message } from '../message';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMsgs()
      .subscribe(messages => this.messages = messages);

  }

  add(msg: string): void {
    msg = msg.trim();
    if (!msg) { return; }
    this.messageService.addMsg({ msg } as Message)
      .subscribe(message => {
        this.messages.push(message);
      });
  }

  delete(message: Message): void {
    this.messages = this.messages.filter(msg => msg !== message);
    this.messageService.delMsg(message).subscribe(X => alert(X.msg + 'delete succesfully'));
  }
}
