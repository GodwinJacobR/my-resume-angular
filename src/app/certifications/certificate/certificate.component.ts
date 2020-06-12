import { Component, OnInit, Input } from '@angular/core';
import { Certificate } from '../certificate.model';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  @Input() cert: Certificate;

  constructor() { }

  ngOnInit(): void {
  }

}
