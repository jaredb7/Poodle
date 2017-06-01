/**
 * Created by oteken on 5/30/2017.
 */
var notifyNewPlayerCommandFactory = require('../../Commands/NotifyNewPlayerCommand');

module.exports = function Notifier(){
    var systemConsole;

    this.notifyNewPlayerAdded = function(player, game){
        var notifyNewPlayerCommand = new notifyNewPlayerCommandFactory(player, game);
        systemConsole.executeCommand(notifyNewPlayerCommand);
    }

    this.setConsole = function(newConsole){
        systemConsole = newConsole;
    }
}