/**
 * Created by oteken on 6/5/2017.
 */
module.exports = function NotifyGameStartedCommand (gameId) {
    var commandName = "NotifyGameStartedCommand";
    var commandType = "systemCommand";

    this.executeCommand = function (systemNavigator) {
        notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.notifyGameStarted(gameId);
    }

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function () {
        return commandType;
    }

    this.getParameters = function(){
        return {gameId: gameId};
    }
}