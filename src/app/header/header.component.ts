import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Response} from '@angular/http'
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducers'
import { Observable } from "rxjs";
import * as fromAuth from '../auth/store/auth.reducers';
import * as AuthActions from '../auth/store/auth.actions';
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit{
   
    authState: Observable<fromAuth.State>;
    constructor(private dataStorgeService: DataStorageService,
        private store: Store<fromApp.AppState>)
    {}
    ngOnInit()
    {
        this.authState = this.store.select('auth');
    }
    onSaveData()
    {
        this.dataStorgeService.storeRecipes()
        .subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    onFetchData()
    {
        this.dataStorgeService.getRecipes();
    }

    onLogout()
    {
        this.store.dispatch(new AuthActions.Logout());
    }
}