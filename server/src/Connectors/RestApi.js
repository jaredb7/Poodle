/**
 * Created by oteken on 5/9/2017.
 */

module.exports = function RestApi(server, adapter){
    var adapter = adapter;

    server.post('/image', function(req, res){
        adapter.saveImageRequest(req.body, function (){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true }));
        });
    });

    server.post('/join', function(req, res){
        adapter.joinRequest(req, function(systemResponse, gameReponse){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: systemResponse, addedPlayer: gameReponse }));
        });
    });

    server.get('/newGame', function(req, res){
        adapter.newGameCommand(function(systemResponse){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: systemResponse }));
        })
    });
}

