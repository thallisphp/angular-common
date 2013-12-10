(function() {
    
    "use strict";
    
    angular.module('common.api', [])
    
    .factory('Api', ['$http', function($http) {
        function encodeObject(obj) {
            var str = "";
            for(var p in obj) {
                if (obj[p]) {
                    switch(typeof obj[p]) {
                    case 'boolean' :
                        str += p + '=' + parseInt(obj[p], 10) + "&";
                        break;
    
                    case 'number' :
                    case 'string' :
                        str += p + "=" + obj[p] + "&";
                        break;
    
                    case 'object' :
                        for (var i in obj[p]) {
                            if (obj[p][i]) {
                                str += p + "[" + encodeURIComponent(i) + "]=" + encodeURIComponent(obj[p][i]) + "&";
                            }
                        }
                        break;
                    }
                }
            }
    
            return str;
        }
        
        var base = '',
            api = {};
        
        api.setBase = function(newBase) {
            base = newBase;
        };
        
        api.get = function(url, data){
            return $http.get(base + url + "?" + encodeObject(data));
        };
        
        api.post = function(url, data){
            return $http.post(base + url, data);
        };
        
        api.put = function(url, data){
            return $http.put(base + url, data);
        };
        
        api.delete = function(url, data){
            return $http.delete(base + url + "?" + encodeObject(data));
        };
        
        return api;
    }]);
    
})();