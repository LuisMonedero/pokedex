import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, AfterViewInit {
  constructor(private pokemonService: PokemonService, private router:Router,private activatedRouter:ActivatedRoute) {
    
    this.activatedRouter.params.subscribe(params=>{
      this.nameRegion=params['region'];
      switch(this.nameRegion){
        case "Kanto":
          this.region=2;
          break;
        case "Johto":
          this.region=3;
          break;
        case "Hoenn":
          this.region=4;
          break;
        case "Sinnoh":
          this.region=5;
          break;
        case "Sinnoh2":
          this.region=6;
          break;
        case "Johto2":
          this.region=7;
          break;
        case "Unova":
          this.region=8;
          break;
        case "Unova2":
          this.region=9;
          break;
        case "Kalos":
          this.region=12;
          break;
        case "Kalos2":
          this.region=13;
          break;
        case "Kalos3":
          this.region=14;
          break;
        case "Hoenn2":
          this.region=15;
          break;
        case "Alola":
          this.region=16;
          break;
        case "Alola2":
          this.region=21;
          break;
        case "Kanto2":
          this.region=26;
          break;
        case "Galar":
          this.region=27;
          break;
      };
    })
    this.data=[];
    this.pokemons=[];
  }
  ngAfterViewInit(): void {
    this.getPokemons()
  }
  nameRegion:any;
  region: any;
  data:any[]=[];
  pokemons:any[]=[];

  ngOnInit(): void {
    
  }
  getSelected(pokemon:any){
    this.router.navigateByUrl(`${this.nameRegion}/pokedex/${pokemon.name}`);
  }


  getPokemons(){
    let pokemonData;
    this.pokemonService.getPokedexRegion(this.region).subscribe(    //REGION
        res=>{
          for(let i = 0;i<res.pokemon_entries.length;i++){   //NUMERO POKS
            pokemonData={
              name: res.pokemon_entries[i].pokemon_species.name,
              number: res.pokemon_entries[i].entry_number
            }
            this.data[i]=pokemonData;
          }
          this.pokemons=this.data;
        },err =>{
          console.log(err);
        }
      );
    
  }
}