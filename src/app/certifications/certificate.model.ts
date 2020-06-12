export class Certificate {
  public name: string;
  public description: string;
  public imagePath: string;
  public credential: string;


  constructor(name: string, desc: string, imagePath: string, credential: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.credential = credential;
  }
}
