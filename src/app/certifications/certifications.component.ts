import { Component, OnInit } from '@angular/core';
import { Certificate } from './certificate.model';
import { CertificatesService } from './certificates.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {

  certificates: Certificate[];
  certFilter = '';
  constructor(private certificatesService: CertificatesService) { }

  ngOnInit() {
    this.certificatesService.getCertificates().subscribe(
      certs => {
        this.certificates = certs;
      }
    );
  }

}
