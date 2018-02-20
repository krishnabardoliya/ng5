import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { animation } from '@angular/animations/src/animation_metadata';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  animations: [
    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
        animate('.6s ease-in', keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
          style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
        ]))]), { optional: true })
      ])
    ])
  ]  
})
export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = 'ADD';
  lifeGoals: string = 'my first life goal';
  goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.itemCount=2;
    this._data.goal.subscribe(res => this.goals = res);
    this._data.changeGoal(this.goals);  
  }

  addItem()
    {
      this.goals.push(this.lifeGoals);
      this.lifeGoals='';
      this.itemCount=this.goals.length;
      this._data.changeGoal(this.goals);  

    }

    removeItem(i)
    {
      this.goals.splice(i,1);
      this.itemCount=this.goals.length; 
      this._data.changeGoal(this.goals);  
    
    }

}
