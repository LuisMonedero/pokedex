import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';

export interface Pokemons {
  name: string;
  id: number;
  type: string;
  type2: string;
}



@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  constructor(private pokemonService: PokemonService) { }
  displayedColumns: string[] = ['id', 'name', 'image', 'type'];
  data:any[151]=[];
  dataSource= new MatTableDataSource<any>(this.data);
  pokemons:any[]=[];

  ngOnInit(): void {
    this.getPokemons();
  }
  getSelected(pokemon:any){
    console.log(pokemon);
  }
  getPokemons(){
    let pokemonData;
    let cont = 1;
    for(let i = 1;i<=151;i++){
      this.pokemonService.getPokemons(i).subscribe( 
        res=>{
          if(res.types.length>1){
            pokemonData={
              id: i,
              name: res.name,
              image: res.sprites.front_default,
              type: res.types[0].type.name,
              type2: res.types[1].type.name
            }
          }else{
            pokemonData={
              id: i,
              name: res.name,
              image: res.sprites.front_default,
              type: res.types[0].type.name,
              type2: null 
            }
          }
          this.data[pokemonData.id-1]=pokemonData;
          this.dataSource=new MatTableDataSource<any>(this.data);
        },err =>{
          console.log(err);
        }
      );
      
    }
    this.pokemons=this.data;
  }
}