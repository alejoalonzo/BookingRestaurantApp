import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Booking } from '../shared/models/booking-model';
import { LightRestaurant } from '../shared/models/restaurant-light-model';

const API = 'http://localhost:8080/booking-restaurant/v1/'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getRestaurants(){
    return this.http.get(API+'restaurants');
  }
  getRestaurant(id: number){
    return this.http.get(API+'restaurant'+'/'+id);
  }
  createReservation(booking: Booking){
    return this.http.post(API+'reservation', booking);
  }

  cancelReservation(reservationCode: String){
    const options={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.delete(API+'deleteReservation?locator'+reservationCode, options)
  }

  getRestaurantsMock(){
    const restaurants : LightRestaurant[] =[];

    let restaurant = new LightRestaurant();
    restaurant.address = 'La Gran Via 123';
    restaurant.name = 'Pizza Loquete';
    restaurant.id = 1;
    restaurant.image = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

    let restaurant2 = new LightRestaurant();
    restaurant2.address = 'Ramblas';
    restaurant2.name = 'La casa de Juan';
    restaurant2.id = 2;
    restaurant2.image = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
    
    
    restaurants.push(restaurant);
    restaurants.push(restaurant2);

    return of(restaurants);
  }
}
