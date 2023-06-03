import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  authors: any = [
    { name: 'Josep', surname: 'Martín', imgUrl: 'josep', description: 'Fullstack Developer', linkedinUrl: 'https://www.linkedin.com/in/josepmartintorres/' },
    { name: 'Matías', surname: 'Fraga', imgUrl: 'matias', description: 'Fullstack Developer', linkedinUrl: 'https://www.linkedin.com/in/matias-fraga-189ab5207/' }
  ]

  openLinkedin(linkedinUrl: string) {
    var win = window.open(linkedinUrl, '_blank');
    win?.focus();
  }
}
