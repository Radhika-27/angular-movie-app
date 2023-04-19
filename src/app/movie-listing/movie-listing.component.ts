import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {  interval, Subscription } from 'rxjs';
import {
  debounce,
} from 'rxjs/operators';
import { MovieService } from '../service/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FormControl, FormGroup } from '@angular/forms';

type Data = any;
@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.scss'],
})
export class MovieListingComponent implements OnInit , OnDestroy {
  public movielisting: any;
  public searchText: any;
  private obs: Subscription;
  private delay = 250;
  public mform: FormGroup = new FormGroup({
    name: new FormControl(),
  });
  constructor(private movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovieData();
    /* This debounce is help to user to search the particular movie name */
    this.obs = this.mform.valueChanges
      .pipe(
        debounce(() => {
          console.log(this.delay);
          return interval(this.delay);
        })
      )
      .subscribe((data) => {
        this.searchText = data.name;
        console.log(data);
      });
  }

  /* this method is used to fetch movie details */
  getMovieData() {
    this.movieService.movieDetails().subscribe((res: any) => {
      this.movielisting = res.results;
    });
  }
  /* It is used to refresh page */
  refresh() {
    this.getMovieData();
  }
  /* It is used to open dialogue for particular movie details */
  dialogueOpen(params: any) {
    let dialogRef = this.dialog.open(MovieDetailsComponent, {
      data: params,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
   /* It is used to unsubscribe all subscription */
  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
