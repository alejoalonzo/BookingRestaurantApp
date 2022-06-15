import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.scss']
})
export class CancelBookingComponent implements OnInit {

  public state = "Your reservation's haven't been cancel yet"
  public codeReservation: String='';
  constructor(
    private service : AppService
  ) { }

  ngOnInit(): void {
  }
  sendCancel(){
    this.service.cancelReservation(this.codeReservation).subscribe((result: any)=>{
      this.state = "Your reservation has been create sucssesfuly"
      console.log(result);
    })
    console.log(this.codeReservation);
  }


}
