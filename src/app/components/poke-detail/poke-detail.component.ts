
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
      this.name=params['name'];
    });
  }
  name:any;
  ngOnInit(): void {
    this.getSelectedPokemon();
  }



  getSelectedPokemon(){
    let pokemonData;
    this.pokemonService.getPokemonByName(this.name).subscribe(
      res=>{
        console.log(res);
          pokemonData={

          }
      },err=>{
        console.log(err);
      }
    );  
    
  }
}

