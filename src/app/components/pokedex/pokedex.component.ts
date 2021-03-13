import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

export interface Pokemons {
  name: string;
  id: number;
  type: string;
  type2: string;
  stats: [];
  weight: number;
  height: number;
}



@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  constructor(private pokemonService: PokemonService, private router:Router) { }
  data:any[]=[];
  pokemons:any[151]=[151];
  pokemons1:any[]=[];
  pokemonsRegion:any[]=[];

  ngOnInit(): void {
    this.getPokemons();
  }
  getSelected(pokemon:any){
    console.log(pokemon);
    this.router.navigateByUrl(`${pokemon.id}`);
  }
  printhem(){
    console.log(this.pokemons);
  }


  getPokemons(){
    let regionData;
    let pokemonData;
    for(let i = 0;i<151;i++){   //NUMERO POKS
      this.pokemonService.getPokemonsRegion(1).subscribe(    //REGION
          res=>{
            
            regionData = res.pokemon_species[i].url;
            this.pokemonsRegion.push(regionData);
            this.pokemonService.getPokemons(this.pokemonsRegion[i]).subscribe(
              res=>{
                var cont = res.id;
                this.pokemonService.getPokemon(cont).subscribe(
                    res=>{
                      if(res.types.length>1){
                        pokemonData={
                          id: res.id,
                          name: res.name,
                          image: res.sprites.front_default,
                          type: res.types[0].type.name,
                          type2: res.types[1].type.name,
                          stats: res.stats,
                          weight: res.weight,
                          height: res.height
                        }
                      }else{
                        pokemonData={
                          id: res.id,
                          name: res.name,
                          image: res.sprites.front_default,
                          type: res.types[0].type.name,
                          type2: null ,
                          stats: res.stats,
                          weight: res.weight,
                          height: res.height
                        }
                      }
                      
                      this.data[pokemonData.id-1]=pokemonData;
                      //console.log(this.data)
                    },
                    err=>{
                      console.log(err);
                    }
                )
              },err=>{
                console.log(err);
              }
            );
          },err =>{
            console.log(err);
          }
      );
      
    }
    this.pokemons=this.data;
  }
}