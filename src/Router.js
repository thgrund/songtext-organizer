import React from 'react'
import SimpleReactRouter from 'simple-react-router'

// Pages
import NotFound from './views/NotFound'
import SongList from './views/HomePage'
import ThemeIndexPage from './views/SignupPage'
import SongIndexPage from './views/LoginPage'
import NewSongPage from './views/SongNewForm'
import SongEditPage from './views/SongEditForm'

export default class Router extends SimpleReactRouter {
  routes(map){
    map('/',                   SongList);
    map('/themes',             ThemeIndexPage);
    map('/songs',              SongIndexPage);
    map('/songs/new',          NewSongPage);
    map('/songs/:postId/edit', SongEditPage);
    map('/:path*',             NotFound) // catchall route
  }
}