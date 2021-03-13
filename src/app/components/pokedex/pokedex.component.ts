import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class PokedexComponent implements OnInit, AfterViewInit {
  constructor(private pokemonService: PokemonService, private router:Router,private activatedRouter:ActivatedRoute) {
    
    this.activatedRouter.params.subscribe(params=>{
      switch(params['region']){
        case "Kanto":
          this.region=1;
          this.numPok=151;
          this.initPokCont=1
          break;
        case "Johto":
          this.region=2;
          this.numPok=99;
          this.initPokCont=152;
          break;
        case "Hoenn":
          this.region=3;
          this.numPok=134;
          this.initPokCont=252;
          break;
      };
      
    })
    this.data=[];
    this.pokemons=[];
    this.pokemonsRegion=[];
  }
  ngAfterViewInit(): void {
    this.getPokemons()
  }
  initPokCont:any;
  numPok:any;
  region: any;
  data:any[]=[];
  pokemons:any[]=[];
  pokemonsRegion:any[]=[];

  ngOnInit(): void {
    
  }
  getSelected(pokemon:any){
    console.log(pokemon);
    this.router.navigateByUrl(`${pokemon.id}`);
  }


  getPokemons(){
    let regionData;
    let pokemonData;
    this.pokemonService.getPokemonsRegion(this.region).subscribe(    //REGION
        res=>{
          for(let i = 0;i<this.numPok;i++){   //NUMERO POKS
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
                      
                      this.data[pokemonData.id-this.initPokCont]=pokemonData;
                    },
                    err=>{
                      console.log(err);
                    }
                )
              },err=>{
                console.log(err);
              }
            );
          }
        },err =>{
          console.log(err);
        }
      );
      
    
    this.pokemons=this.data;
  }
}