import { BoardSpace } from '../game-state/game-state';

export class BasePlayer {
  id: string;
  code: string;
  name: string;
  email: string;
  photoURL: string;
}

export class Player extends BasePlayer {
  private _getMove(state: BoardSpace[][]): number {
    return 0;
  }

  private _setGetMoveFunction(code: string): void {
    eval('this._getMove = ' + code + ';');
  }

  updateFrom(player: BasePlayer): void {
    this.code = player.code;
    this.name = player.name;
    this.email = player.email;
    this.photoURL = player.photoURL;
  }

  getMove(state: BoardSpace[][], sandbox: any): number {
    this._setGetMoveFunction(this.code);
    const stateCopy = JSON.parse(JSON.stringify(state));
    return this._getMove.call(sandbox, stateCopy);
  }

  // because we can't save methods to firebase
  toBasePlayer(): BasePlayer {
    const bp = new BasePlayer();
    bp.code = this.code;
    bp.name = this.name;
    bp.email = this.email;
    bp.photoURL = this.photoURL;
    return bp;
  }
}
