import { Certificate } from './certificate.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CertificatesService {
  certificates: Certificate[] = [
    new Certificate(
      'Azure Developer',
      'Microsoft Certified: Azure Developer Associate',
      'https://images.youracclaim.com/size/680x680/images/92e0618b-8002-4868-9e88-794a33aeb3b5/azure-developer-associate-600x600.png',
      'https://www.youracclaim.com/badges/d5587330-78cb-4319-87e5-6c35a8e176d5'
    ),
    new Certificate(
      'DevOps Engineer Expert',
      'Microsoft Certified: DevOps Engineer Expert',
      'https://images.youracclaim.com/size/680x680/images/c3ab66f8-5d59-4afa-a6c2-0ba30a1989ca/CERT-Expert-DevOps-Engineer-600x600.png',
      'https://www.youracclaim.com/badges/6d128431-d8a4-4a4e-9d57-95b3de70db81'
    ),
    new Certificate(
      'Azure Administrator',
      'Microsoft Certified: Azure Administrator Associate',
      'https://images.youracclaim.com/size/680x680/images/35d18649-95c6-4c78-b07a-cfc1362318f3/azure-administrator-associate.png',
      'https://www.youracclaim.com/badges/c7a56ae7-6802-4339-ac13-56b88fe30942'
    ),
    new Certificate(
      'AWS Certified Solutions Architect – Associate',
      'AWS Certified Solutions Architect – Associate',
      'https://images.youracclaim.com/size/680x680/images/6774b3bf-7a82-4d40-a2d1-86b412635bae/AWS-SolArchitect-Associate.png',
      'https://www.youracclaim.com/badges/fa6af1b3-5bf4-4f70-a47c-0e79797ffdbd'
    )
  ];

  getCertificates() {
    return  this.certificates;
  }
}
