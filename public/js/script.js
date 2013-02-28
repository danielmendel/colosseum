(function() {

    var start = function(game) {
        console.log('start');
        for (var r = 0; r < 6; r++) {
            for (var i = 0; i < 7; i++) {
                document.getElementById('c' + (r*7 + i)).addEventListener('click', (function(i) {
                    return function() {
                        sock.send(i);
                    };
                })(i));
            }
        }
    };

    var gameover = function(game) {
        console.log('gameover');
        renderBoard(game.board);
    };

    var move = function(game) {
        console.log('move');
        renderBoard(game.board);
    };

    var renderBoard = function(board) {
        for (var i = 0; i < board.length; i++) {
            if (board[i] !== " ") {
                document.getElementById('c' + i).className = board[i];
            }
        }
    };

    var sock = new SockJS('/tunnel');
    window.sock = sock;
    sock.onopen = function() {
       console.log('open');
    };
    sock.onmessage = function(e) {
       console.log('message', e.data);
       var game = JSON.parse(e.data);
       if( game.hasOwnProperty('timelimit') )
           return start(game);
       if( game.hasOwnProperty('result') && game.result !== 0 )
           return gameover(game);

       return move(game);
    };
    sock.onclose = function() {
       console.log('close');
    };

})();
