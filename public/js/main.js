// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = randomMove();
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  } else if (algo === 4) { //eval2
    var move = cbm_proj(skill, game, game.turn())[1];
  } else if (algo === 5) { //eval3
    var move = cbm2_proj(skill, game, game.turn())[1];
  }else {//eval1
    var move = calcBestMove(skill, game, game.turn())[1];
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(alg1=4, alg2 = 4, skillW=2, skillB=2) {
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  var skill = game.turn() === 'w' ? skillW : skillB;
  var alg = game.turn() === 'w' ? alg1 : alg2;
  makeMove(alg, skill);
  window.setTimeout(function() {
    playGame(alg, skillW, skillB);
  }, 250);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};
