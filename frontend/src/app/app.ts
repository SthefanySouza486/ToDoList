import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskList} from './components/task-list/task-list';
import {Footer} from './components/footer/footer';
import { DOCUMENT} from '@angular/core';
import { Inject} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskList,
    Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'frontend'

  public isDarkMode = false;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    this.document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
}
