import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MovieService {
	
	constructor(private http:Http) { }

	getMovies() {
		return this.http.get('/app/json/movies-list.json')
			.map((res:Response) => res.json());
	}
}