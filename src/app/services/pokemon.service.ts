import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 baseUrl = "https://pokeapi.co/api/v2";

  constructor(private http: HttpClient) { 
  }
  
  getPokedexRegion(index:number){  //Pokedex component
    return this.http.get<any>(`${this.baseUrl}/pokedex/${index}`);
  }
  
  getPokemonByName(name:string){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`);
  }
}
