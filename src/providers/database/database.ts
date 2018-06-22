import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

export interface Game {
  startedAt?: number;
  lastMoveAt?: number;
  moves?: Move[],
  currentFEN: string
  whiteId: string,
  blackId: string
  players: any
}

export interface Move {
  to: string,
  from: string,
  timestamp?: number
}

@Injectable()
export class DatabaseProvider {

  private gamesRef: AngularFirestoreCollection<Game>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.gamesRef = this.afs.collection('games');
  }


  //// GAMES ////

  createGame(game: Game, ) {
    let now = Date.now();
    game.startedAt = now;
    game.lastMoveAt = now;
    
    // this.gamesRef.add(game);
  }

}
