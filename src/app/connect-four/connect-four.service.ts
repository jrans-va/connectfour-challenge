import { PlayerService } from './../player/player.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GameState, GameOverState } from './../game-state/game-state';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectFourService {
  gameState: BehaviorSubject<GameState> = new BehaviorSubject(new GameState());
  currentPlayer = 1;

  constructor(private _playerService: PlayerService) { }

  resetGame() {
    this.gameState.next(new GameState());
  }

  playTurn(): void {
    if (this.gameState.getValue().gameOverState === GameOverState.NOT_OVER) {
      const playerMove = this._playerService.getMove(this.currentPlayer, this.gameState.getValue().board);
      this.gameState.getValue().playMove(playerMove, this.currentPlayer);
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      this.gameState.next(this.gameState.getValue());
    }
  }
}