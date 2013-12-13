(function() {
    
    "use strict";
    
    angular.module('common.api', [])
    
    .factory('Api', ['$http', function($http) {
        /**
         * @api {private} encodeObject(obj); encodeObject()
         * @apiName encodeObject
         * @apiGroup API
         *
         * @apiParam {Object} obj The object to be converted into a http query string.
         *
         * @apiSuccess {String} str http query string.
         */
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
        
        var base = '';
        var api = {};
        
        
        
        /**
         * @api {public} Api.setBase('/api/v2/'); setBase()
         * @apiName setBase
         * @apiGroup API
         *
         * @apiParam {String} newBase The new base url for all $http requests.
         *
         * @apiSuccess {Null} null
         */
        api.setBase = function(newBase) {
            base = newBase;
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.get = function(url, data){
            return $http.get(base + url + "?" + encodeObject(data));
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.post = function(url, data){
            return $http.post(base + url, data);
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.put = function(url, data){
            return $http.put(base + url, data);
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.delete = function(url, data){
            return $http.delete(base + url + "?" + encodeObject(data));
        };
        
        return api;
    }]);
    
})();