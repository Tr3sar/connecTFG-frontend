import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grupo-chat',
  templateUrl: './grupo-chat.component.html',
  styleUrls: ['./grupo-chat.component.scss']
})
export class GrupoChatComponent implements OnInit {

  @Input() group_id: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

}
