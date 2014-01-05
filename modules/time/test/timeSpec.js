describe('angular.common: time |', function() {
    beforeEach(module('common.time'));

    describe('moment |', function() {
        it("should display the current time",  inject(function(momentFilter) {
            var time = '2013-12-31 21:30:00';

            expect(momentFilter(time, "YYYY")).toBe("2013");
            expect(momentFilter(time, "MMM")).toBe("Dec");
            expect(momentFilter(time, "D")).toBe("31");
            expect(momentFilter(time, "MMM DD, YYYY - h:mma")).toBe("Dec 31, 2013 - 9:30pm");
        }));
    });

    describe('fromNow |', function() {
        it("should display the current time",  inject(function(fromNowFilter) {
            var time = '2013-12-31 21:30:00';
            var fromNow =

            expect(fromNowFilter(time, "MMM DD, YYYY - h:mma")).toBe("");
        }));
    });
});