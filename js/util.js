////ATTENTION!/////
//util.js is a generated file. To edit the source go to /js/util/index.js

/* ==========================================================================

   ANGULARJS APP

========================================================================== */

var App = (function () {

    var storage = {

        app: angular.module("App", ["ng"]),

        base_url: '/',

        leavePageConfirmation: false

    };



    var getAppInstance = function(){

        return storage.app;

    };



    var getBaseURL = function(){

        return storage.base_url;

    };

    

    var getLeavePageConfirmation = function(){

        return leavePageConfirmation;

    };



    var setLeavePageConfirmation = function(val){

        leavePageConfirmation = val;

    };



    return {

        getAppInstance: getAppInstance,

        getBaseURL: getBaseURL,

        getLeavePageConfirmation: getLeavePageConfirmation,

        setLeavePageConfirmation: setLeavePageConfirmation

    };

}());

