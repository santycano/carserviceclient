import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CarService} from '../shared/car/car.service';
import { throwMatDuplicatedDrawerError } from '@angular/material';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']

})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  cars: Array<any>;
  private markedOwner=[];

  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService, private carService: CarService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners=data._embedded.owners;
    });
  }
  getDni(href){
    let id=href.lastIndexOf("/");
    return href.substring(id++,href.length);
  }

  markOwner(href,markedValue){
    if(markedValue==true){
      this.markedOwner.push(href);
    }
    else{
      let position=this.markedOwner.indexOf(href);
      this.markedOwner.slice(position,1);
    }
  }

  delete(){
    this.carService.getAll().subscribe(data => {
      this.cars=data._embedded.cars;
      for(let i of this.markedOwner){
        for(let j of this.owners){
          if(i==j._links.self.href){
            for (const car of this.cars) {
              if(car.ownerDni==j.dni){
                car.ownerDni=null;
                car.href=car._links.self.href;
                this.carService.save(car).subscribe();
              }
            }
          }
        }
        this.ownerService.remove(i).subscribe();
      }
    });
    this.goToList();
  }

  goToList() {
    this.router.navigate(['/car-list']);
  }
}
