describe('angular.common: api', function() {
    var scope, httpMock, api, http;

    beforeEach(module('common.api'));

    beforeEach(inject(function($rootScope, $controller, $httpBackend, Api, $http) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        api = Api;
        http = $http;

        httpMock.when('GET', '/api/v2/test').respond('resr');
    }));

    it('should set the base to an api', function() {
        api.setBase('/api/v2/');
        expect(api.getBase()).toBe('/api/v2/');
    });

    it('should convert and object to a query string', function() {
        var data = {
            userId: 1,
            posts: ['test', 'test1']
        };

        expect(api.encodeObject(data), "userId=1&posts[0]=test&posts[1]=test1");
    });

    it('should make a GET request to a url', function() {
        expect(api.get('users/1')).toBeDefined();
    });

    it('should make a PUT request to a url', function() {
        expect(api.put('users/1')).toBeDefined();
    });

    it('should make a POST request to a url', function() {
        expect(api.post('users')).toBeDefined();
    });

    it('should make a  request to a url', function() {
        expect(api.delete('users/1')).toBeDefined();
    });
});