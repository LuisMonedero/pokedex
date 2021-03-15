
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {
  
  constructor(private pokemonService:PokemonService,private activatedRouter:ActivatedRoute) { 
    this.activatedRouter.params.subscribe(params=>{
      this.pokName=params['name'];
    });
  }
  pokName:any;
  pokemon:any;

  ngOnInit(): void {
    this.getSelectedPokemon();
  }

  getSelectedPokemon(){
    let pokemonData;
    this.pokemonService.getPokemonByName(this.pokName).subscribe(
      res=>{
        if(res.types.length==1){
          pokemonData={
            name: res.name,
            id: res.id,
            type: res.types[0].type.name,
            type2: null,
            sprite: res.sprites.front_default,
            stats: res.stats
          }
        }else{
          pokemonData={
            name: res.name,
            id: res.id,
            type: res.types[0].type.name,
            type2: res.types[1].type.name,
            sprite: res.sprites.front_default,
            stats: res.stats
          }
        }
        this.pokemon=pokemonData;
      },err=>{
        console.log(err);
      }
    );  
    
  }
}

