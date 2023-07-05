import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private service:TestService,private router:Router){

  }

  private piece="ONE PIECE";
  private shippuden="NARUTO";
  private slayer="DEMON SLAYER";
  private ball="DRAGON BALL";
  private note="DEATH NOTE";
  private hunter="HUNTER X HUNTER";
  private clover="BLACK CLOVER";
  private kaisen="JUJUTSU KAISEN";
  private man="CHAINSAW MAN";
  private revengers="TOKYO REVENGERS";
  private hero="MY HERO ACADEMIA";
  private me="SUZUME";
  
  ngOnInit(): void {
    
  }


  one(){
    this.service.variable1 = this.piece;
    this.router.navigate(['booking']);
 }
  nar(){
    this.service.variable1 = this.shippuden;
    this.router.navigate(['booking']);
  }
  dem(){
    this.service.variable1 = this.slayer;
    this.router.navigate(['booking']);
  }
  dra(){
    this.service.variable1 = this.ball;
    this.router.navigate(['booking']);
  }
  dea(){
    this.service.variable1 = this.note;
    this.router.navigate(['booking']);
  }
  hxh(){
    this.service.variable1 = this.hunter;
    this.router.navigate(['booking']);
  }
  bla(){
    this.service.variable1 = this.clover;
    this.router.navigate(['booking']);
  }
  juj(){
    this.service.variable1 = this.kaisen;
    this.router.navigate(['booking']);
  }
  cha(){
    this.service.variable1 = this.man;
    this.router.navigate(['booking']);
  }
  tok(){
    this.service.variable1 = this.revengers;
    this.router.navigate(['booking']);
  }
  my(){
    this.service.variable1 = this.hero;
    this.router.navigate(['booking']);
  }
  suz(){
     this.service.variable1 = this.me;
     this.router.navigate(['booking']);
 }
}

