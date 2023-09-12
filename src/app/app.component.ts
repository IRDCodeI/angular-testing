import { Component } from '@angular/core';
import { AppService } from './app.service';
import { OnInit } from '@angular/core';
import { Observable, map, of, firstValueFrom } from 'rxjs';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  public page = 1;
  public users: any[] = [];

  constructor(
    private appService: AppService,
    private scrollDistpacher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.loadScrolTableData();
    this.registerScroll();
  }

  private registerScroll() {
    this.scrollDistpacher.scrolled().subscribe((event) => console.log(event));
  }

  private async loadScrolTableData() {
    try {
      const data = await firstValueFrom(
        this.appService.getUserList(this.page).pipe(
          map((source: any) => {
            return source.data;
          })
        )
      );

      const virtualData = Array.from({ length: 60 });
      Array.prototype.splice.apply(virtualData, [0, 6, ...data]);
      this.users = virtualData;
    } catch (error) {
      console.log(error);
    }
  }

  private async appendScrollData() {}
}
