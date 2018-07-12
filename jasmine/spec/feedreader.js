/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty. Experiment with this before you get started on
        * the rest of this project. What happens when you change
        * allFeeds in app.js to be an empty array and refresh the
        * page?
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have an url', function() {
            // Loops through the feed
            for(feeds of allFeeds){
                // expects url in the feed to be defined
                expect(feeds.url).toBeDefined();
                expect(feeds.url).not.toBe('');
            };
        });

        it('have a name', function() {
            // Loops through the feed
            for(feeds of allFeeds){
                // expects the name in the feed to be defined
                expect(feeds.name).toBeDefined();
                expect(feeds.name).not.toBe('');
            };
        });
    });


    describe('The menu', function(){
        // Global variable for this spec
        let menuIcon = $('.menu-icon-link');

        it('must be hidden by default', function () {
            // Makes sure that body has the class of menu-hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility when clicked', function() {
            // Clicks on menuIcon
            menuIcon.click();
            /* Makes sure menu-hidden class was removed
            * which indicates that the slide menu is showing
            */
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Clicks on menuIcon again
            menuIcon.click();
            /* Makes sure menu-hidden class was added back
            * which indicates that the slide menu is not showing
            */
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        // Makes sure loadFeed() is run before test start
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should contain at least one entry', function() {
            let entry = $('.feed .entry');
            // Expects the html to contain the entries content
            expect(entry.length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {
        // Global variable declaration for this spec
        let entry1;
        let entry2;

        // Makes sure the loadFeed() functions are run before test start
        beforeEach(function(done) {
            // Runs loadFeed(1)
            loadFeed(1, function() {
                // Assigns the entries to the first entry variable
                entry1 = $('.feed').html();
                // Runs loadFeed(0)
                loadFeed(0, function() {
                    // Assigns the entries to the second entry variable
                    entry2 = $('.feed').html();
                    done();
                });
            });
        });

        it('content should actually change', function() {
            /* Expects the first entries to not
            / be equel to the second entries
            */
            expect(entry1).not.toBe(entry2);
        });
    });
}());
