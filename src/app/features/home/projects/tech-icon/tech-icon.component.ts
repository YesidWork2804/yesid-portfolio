import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

type TechName =
  | 'Angular'
  | 'JavaScript'
  | 'Node.js'
  | 'Express'
  | 'MySQL'
  | 'MongoDB'
  | 'TypeScript'
  | 'AWS'
  | 'Docker'
  | 'NestJS'
  | 'Tailwind'
  | 'RxJS'
  | 'NgRx'
  | 'Git'
  | 'Postman'
  | 'Swagger'
  | 'Figma'
  | 'JWT'
  | 'REST APIs';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  templateUrl: './tech-icon.component.html',
})
export class TechIconComponent implements OnChanges {
  @Input({ required: true }) name!: string;
  @Input() size = 18;

  imgSrc = '';
  private fallbackSrc = '';

  get useInvertOnDark(): boolean {
    const n = (this.name || '').toLowerCase();
    return n === 'express' || n === 'jwt';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.setSources();
    }
  }

  get url(): string {
    return this.imgSrc;
  }

  onError(): void {
    if (this.fallbackSrc && this.imgSrc !== this.fallbackSrc) {
      this.imgSrc = this.fallbackSrc;
    }
  }

  private setSources(): void {
    const local = this.toLocalIcon(this.name as TechName);
    const key = this.toSimpleIconSlug(this.name as TechName);
    const cdn = `https://cdn.simpleicons.org/${key}`;

    this.imgSrc = local ?? cdn;
    this.fallbackSrc = local ? cdn : '';
  }

  private toLocalIcon(name: TechName | string): string | null {
    switch (name) {
      case 'Angular':
        return '/assets/icons/icons8-angular-96%20(1).png';
      case 'AWS':
        return '/assets/icons/icons8-amazon-aws-96.png';
      case 'MySQL':
        return '/assets/icons/icons8-mysql-96.png';
      case 'MongoDB':
        return '/assets/icons/icons8-mongodb-96.png';
      case 'Tailwind':
        return '/assets/icons/icons8-tailwind-css-96.png';
      case 'Git':
        return '/assets/icons/icons8-git-96.png';
      case 'Postman':
        return '/assets/icons/icons8-cartero-inc.-96.png';
      case 'Swagger':
        return '/assets/icons/swagger.png';
      case 'RxJS':
        return '/assets/icons/rxjs-1.svg';
      default:
        return null;
    }
  }

  private toSimpleIconSlug(name: TechName | string): string {
    switch (name) {
      case 'Angular':
        return 'angular';
      case 'JavaScript':
        return 'javascript';
      case 'Node.js':
        return 'nodedotjs';
      case 'Express':
        return 'express';
      case 'MySQL':
        return 'mysql';
      case 'MongoDB':
        return 'mongodb';
      case 'TypeScript':
        return 'typescript';
      case 'AWS':
        return 'amazonwebservices';
      case 'Docker':
        return 'docker';
      case 'NestJS':
        return 'nestjs';
      case 'Tailwind':
        return 'tailwindcss';
      case 'RxJS':
        return 'rxjs';
      case 'NgRx':
        return 'ngrx';
      case 'Git':
        return 'git';
      case 'Postman':
        return 'postman';
      case 'REST APIs':
        return 'swagger';
      case 'JWT':
        return 'jsonwebtokens';
      case 'Figma':
        return 'figma';
      case 'Swagger':
        return 'swagger';
      default:
        return 'code';
    }
  }
}
