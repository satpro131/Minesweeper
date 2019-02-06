import { Component } from '@angular/core';

@Component({
	selector: 'mines',
	templateUrl: './mines.component.html',
})


export class MinesComponent{
	width = WIDTH;
	height = HEIGHT;
	showMap = 0;

	//MAP:number[][] = [];
	

  
  public MAP:number[][] = [];
  public mapFlag:number[][] = [];

  constructor() {
  	this.MAP = [];
  	this.mapFlag = [];

  	for(var i: number = 0; i<16; i++){
  		this.MAP[i] = [];
  		this.mapFlag[i] = [];
  		for(var j: number = 0; j<30; j++){
  			this.MAP[i][j] = 0;
  			this.mapFlag[i][j] = 0;
  		}
  	}
  }
  

  createNewGame(): void {
  	//console.log("Create New Game is called");
  	var arr = [];
  	
  	this.showMap = 1;

  	while(arr.length < 100){
  		var randomNumber = Math.ceil(Math.random()*480);
  		if(arr.indexOf(randomNumber) > -1)
  			continue;
  		arr[arr.length] = randomNumber;
  	}
  	arr.sort(function(a, b){return a - b});
  	console.log(arr);

  	var bCount = 0;
  	var count = 1;

  	var map:number[][] = [];

  	map = [];

  	for(var i: number = 0; i<16; i++){
  		map[i] = [];
  		for(var j: number = 0; j<30; j++){
  			map[i][j] = 0;
  		}
  	}



  	for(var i: number = 0; i<16; i++){
  		for(var j: number = 0; j<30; j++){
  			this.mapFlag[i][j] = 0;
  			if(count == arr[bCount] && bCount < 100){
  				map[i][j] = -1;

  				count++;
  				bCount++;
  			}
  			else{
  				map[i][j] = 0;
  				count++;
  			}
  		}
  	}

  	for(var i:number = 0; i<16; i++){
  		for(var j:number = 0; j<30; j++){
  			if(map[i][j] == 0){
  				var count = 0;
  				if(i-1 >=0 && j-1 >=0 && map[i-1][j-1] == -1)
  					count++;
  				if(i-1 >=0 && map[i-1][j] == -1)
  					count++;
  				if(i-1 >=0 && j+1 <30 && map[i-1][j+1] == -1)
  					count++;
  				if(j-1>=0 && map[i][j-1] == -1)
  					count++;
  				if(j+1 <30 && map[i][j+1] == -1)
  					count++;
  				if(i+1<16 && j-1>=0 && map[i+1][j-1] == -1)
  					count++;
  				if(i+1<16 && map[i+1][j] == -1)
  					count++;
  				if(i+1<16 && j+1 <30 && map[i+1][j+1] == -1)
  					count++;
  				
  				map[i][j] = count;
  			}

  		}
  	}

  	this.MAP = map;

  	console.log(this.MAP);

  }

  checkMines(x, y): void{
  	console.log("Check Mine function called");
  	console.log("x-coordinates:", x);
  	console.log("y-coordinates:", y);
  	console.log(this.MAP[x][y]);

  	if(this.MAP[x][y] >0){
  		this.mapFlag[x][y] =1;
  	}
  	else if(this.MAP[x][y] == -1){
  		for(var i:number=0; i<16; i++){
  			for(var j:number=0; j<30; j++){
  				if(this.mapFlag[i][j] == 3){
  					if(this.MAP[i][j] >=0)
  						this.mapFlag[i][j] = 5;
  				}
  				else if(this.MAP[i][j] >= 0){
  					this.mapFlag[i][j] = 1;
  				}

  				else{
  					this.mapFlag[i][j] = 2;
  				}
  			}
  		}
  		this.mapFlag[x][y] = 4;
  	}
  	else if(this.MAP[x][y] == 0){
  		this.mapFlag[x][y] = 1;

  		if(x-1 >=0 && y-1 >=0 && this.MAP[x-1][y-1] == 0 && this.mapFlag[x-1][y-1] == 0){
  			this.checkMines(x-1, y-1);
  		}
  		else if(x-1 >=0 && y-1 >=0){
  			this.mapFlag[x-1][y-1] = 1;
  		}
  			
  		if(x-1 >=0 && this.MAP[x-1][y] == 0 && this.mapFlag[x-1][y] == 0){
  			this.checkMines(x-1, y);
  		}
  		else if(x-1 >=0 ){
  			this.mapFlag[x-1][y] = 1;
  		}
  		
  		if(x-1 >=0 && y+1 <30 && this.MAP[x-1][y+1] == 0 && this.mapFlag[x-1][y+1] == 0){
  			this.checkMines(x-1, y+1);
  		}
  		else if(x-1 >=0 && y+1 <30){
  			this.mapFlag[x-1][y+1] = 1;
  		}

  		if(y-1>=0 && this.MAP[x][y-1] == 0 && this.mapFlag[x][y-1] == 0){
  			this.checkMines(x, y-1);
  		}
  		else if(y-1>=0){
  			this.mapFlag[x][y-1] = 1;
  		}
  				
  		if(y+1 <30 && this.MAP[x][y+1] == 0 && this.mapFlag[x][y+1] == 0){
  			this.checkMines(x, y+1);
  		}
  		else if(y+1 < 30){
  			this.mapFlag[x][y+1] = 1;
  		}

  		if(x+1<16 && y-1>=0 && this.MAP[x+1][y-1] == 0 && this.mapFlag[x+1][y-1] == 0){
  			this.checkMines(x+1, y-1);
  		}
  		else if(x+1<16 && y-1>=0 ){
  			this.mapFlag[x+1][y-1] = 1;
  		}

  		if(x+1<16 && this.MAP[x+1][y] == 0 && this.mapFlag[x+1][y] == 0){
  			this.checkMines(x+1, y);
  		}
  		else if(x+1<16){
  			this.mapFlag[x+1][y] = 1;
  		}
  			
  		if(x+1<16 && y+1 <30 && this.MAP[x+1][y+1] == 0 && this.mapFlag[x+1][y+1] == 0){
  			this.checkMines(x+1, y+1);
  		}
  		else if(x+1<16 && y+1 <30){
  			this.mapFlag[x+1][y+1] = 1;
  		}
  			
  	}
  }
  	
  

  markFlag(x, y): void{
  	console.log("Right click working fine");
  	console.log("x-coordinates:", x);
  	console.log("y-coordinates:", y);
  	this.mapFlag[x][y] = 3;
  }
  	
  	

}

export class Width {
	id : number;
}

export class Height {
	
	id : number;
}

const HEIGHT : Height[] = [
	{id: 1},
	{id: 2},
	{id: 3},
	{id: 4},
	{id: 5},
	{id: 6},
	{id: 7},
	{id: 8},
	{id: 9},
	{id: 10},
	{id: 11},
	{id: 12},
	{id: 13},
	{id: 14},
	{id: 15},
	{id: 16},
]

const WIDTH : Width[]  = [
	{id: 1},
	{id: 2},
	{id: 3},
	{id: 4},
	{id: 5},
	{id: 6},
	{id: 7},
	{id: 8},
	{id: 9},
	{id: 10},
	{id: 11},
	{id: 12},
	{id: 13},
	{id: 14},
	{id: 15},
	{id: 16},
	{id: 17},
	{id: 18},
	{id: 19},
	{id: 20},
	{id: 21},
	{id: 22},
	{id: 23},
	{id: 24},
	{id: 25},
	{id: 26},
	{id: 27},
	{id: 28},
	{id: 29},
	{id: 30},
]

