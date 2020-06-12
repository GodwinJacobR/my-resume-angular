import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {

  certificates = ['1', '2', '3', '4'];
  constructor() { }

  ngOnInit(): void {
  }

}
