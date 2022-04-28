import { Component, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  templateUrl: './button-cell-renderer.component.html',
})
export class ButtonCellRenderer implements AgRendererComponent {
  params: any;

  constructor(
    private router: Router) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  // This was needed to make the link work correctly
  navigate(link: any) {
    if (this.params.buttonText == 'Assign') {
      let navigationExtras: NavigationExtras = {
        queryParams: {
            "user": JSON.stringify(this.params.data)
        }
      };
      this.router.navigate([link], navigationExtras);
    }
    else {
      this.router.navigate([link, this.params.data.id]);
    }
  }
}