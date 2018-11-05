
import {ADD_THEME, SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE, INSERT_THEME} from "../constants/ThemeActionTypes";
import {Observable} from "rxjs/Rx";

const url = 'http://info-grund.com:8080/songtext-organizer-api/api/theme/';

export const addTheme = (actions$, store, {ajax}) => (
    actions$
    .ofType(INSERT_THEME)
    .switchMap(action =>
        ajax({
          method: 'POST',
          url: url + "create",
          body: {
            themeGeneral: action.themeGeneral
          }
        })
        .flatMap(response =>
            Observable.concat(
                Observable.of({
                  type: ADD_THEME,
                  themeId: response.response,
                  themeGeneral: action.themeGeneral
                }),
                Observable.of({
                  type: SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE,
                  themeId: response.response
                })
            )
        )
    )
);