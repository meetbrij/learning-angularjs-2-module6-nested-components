import { Component, Input, OnChanges } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
	selector: 'my-movie-detail',
	template: `
		<div *ngIf="movie">
			<div class="modal fade in show" role="dialog">
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" (click)="onCloseModal()">&times;</button>
							<h2>{{movie.name}}</h2>
							<p [ngClass]="{red: isAdult, green: !isAdult}">({{movie.mpaaRating.type}}: {{movie.mpaaRating.label}})</p>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-4">
									<img class="movie-image" src="{{movie.imgPath}}" />
								</div>
								<div class="col-md-8">
									<h3>Details</h3>
									<p>Genre: {{movie.genre}}</p>
									<p>Language: {{movie.language}}</p>
									<p>Duration: {{movie.duration}} minutes</p>
									<p>User Rating: {{movie.userRating}}</p>
								<hr>
									<h3>Synopsis</h3>
									<div class="movie-desc">{{movie.description}}</div>
									<div class="red" *ngIf="isAdult">
										<hr>
										* Identity Card would be required for verifying age.
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button class="btn btn-default left" (click)="onCloseModal()">Close</button>
							<button class="btn btn-default left movie-details">Edit Movie Details</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-backdrop fade in"></div>
		</div>
	`,
  styles: [`
    .movie-details {
      margin-right: 15px;
    }

    .movie-image {
    	width: 100%;
    }

    .movie-desc {
    	max-height: 250px;
    	overflow-y: auto;
    }
    
    .red {
      color: #EF0000;
      font-weight: bold;
    }
    
    .green {
      color: #03C30A;
    }
  `]
})
export class MovieDetailComponent implements OnChanges {
	@Input()
	movie: Movie;
	isAdult = false;
  
  	ngOnChanges() {
  		if(this.movie) {
  			if(this.movie.mpaaRating.type == "M18" ||  this.movie.mpaaRating.type == "R21") {
    			this.isAdult = true; 
    		} else {
    			this.isAdult = false;
    		}
  		}
	}

	onCloseModal() {
		this.movie = null;
	}
}