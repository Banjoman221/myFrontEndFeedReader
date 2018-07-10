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


        // Expects Feeds to have an url
        it('have an url', function() {
            // Loops through the feed
            for(feeds of allFeeds){
                // expects url in the feed to be defined
                expect(feeds.url).toBeDefined();
            };
        });

        // Expects Feeds to have a name
        it('have a name', function() {
            // Loops through the feed
            for(feeds of allFeeds){
                // expects the name in the feed to be defined
                expect(feeds.name).toBeDefined();
            };
        });
    });


    describe('The menu', function(){
        // Makes sure that the menue is hidden by default
        it('must be hidden by default', function () {
            // Makes sure ther is a slide-menu
            expect($('div.slide-menu')).toBeDefined();
            // Makes sure that body has the class of menu-hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* Makes sure that the slide-menu is visible when clicked
        * and hidden when clicked again
        */
        it('is visible when clicked', function() {
            let menuIcon = $('.menu-icon-link');
            // Clicks on menuIcon
            menuIcon.click();
            /* Makes sure menu-hidden class is gone
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
    // Test suite for Initial Entries
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        // Makes sure loadFeed() is run before test start
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('should contain at least one entry', function (done) {
            let entry = $('.entry')
            // Expects the html to contain the entries content
            expect(entry.html()).toBeDefined();
            done();
        })

    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        let entry1,
        entry2;
        beforeEach(function(done) {
                loadFeed(1, function() {
                    entry1 = $('.entry').html()
                    done();
                });
                loadFeed(0, function() {
                    entry2 = $('.entry').html()
                    done();
            });
        });
        it('content should actually change', function (done) {
            expect(entry1).not.toBe(entry2);
            done();
        })
    })
}());
