import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void{

    // detect scroll top or down
    const smartScroll = $('.smart-scroll');

    if (smartScroll.length > 0) // check if element exists
    {
      // tslint:disable-next-line: variable-name
      let last_scroll_top = 0;

      // tslint:disable-next-line: typedef
      $(window).on('scroll', function()
      {
        // tslint:disable-next-line: variable-name
        const scroll_top = $(this).scrollTop();
        if (scroll_top < last_scroll_top) {
            $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
        }
        else {
            $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
        }
        last_scroll_top = scroll_top;
      });
    }
  } // end ngOnInit()
} // end class
