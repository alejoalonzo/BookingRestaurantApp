import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { InfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';
import { Booking } from 'src/app/shared/models/booking-model';
import { Restaurant } from 'src/app/shared/models/restaurant-model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public restaurant: Restaurant = new Restaurant;
  public bookingForm!: any;
  public booking: Booking = new Booking;
  private idRestaurant!: number;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idRestaurant = Number(this.route.snapshot.paramMap.get('id'));
    this.getRestaurant();
    this.initForm();
  }

  getRestaurant(){
    this.service.getRestaurant(this.idRestaurant).subscribe((result:any)=>{
      this.restaurant= result.data;
    })
  }

  initForm(): void{
    this.bookingForm =this.fb.group({
      date:[new Date(), Validators.required],
      time:['', Validators.required],
      customers:['', Validators.required] 
    })
  }

  setBooking(){
    this.booking.restaurantId = this.idRestaurant;
    this.booking.turnId = this.bookingForm.get('time').value;
    this.booking.date = this.bookingForm.get('date').value;
    this.booking.person = this.bookingForm.get('customers').value;
  }
  sendBooking(){
    this.setBooking();
    this.service.createReservation(this.booking).subscribe((result: any)=>{
      console.log(result.data);
      const title = "BOOKING CODE: " + result.data;
      const info = "You'll need the code to get in the restaurant or cancel the booking, please keep it in a safe place";
      this.openDialog(title, info);
    })
    console.log('Sending booking', this.bookingForm.get('date').value);
  }

  openDialog(title: String, info: String): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {title: title, info: info},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


