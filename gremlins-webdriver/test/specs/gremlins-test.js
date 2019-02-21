function loadScript(callback) {
    var s = document.createElement('script');
    s.src = 'http://127.0.0.1:8887/dist/gremlins.min.js';
    if (s.addEventListener) {
        s.addEventListener('load', callback, false);
    } else if (s.readyState) {
        s.onreadystatechange = callback;
    }
    document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
    function stop() {
        horde.stop();
        callback();
    }
    var horde = window.gremlins.createHorde();
    horde.seed(1234);

    horde.after(callback);
    window.onbeforeunload = stop;
    setTimeout(stop, ttl);
    horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

    it('it should not raise any error', function() {
        browser.url('/');
        browser.click('button=Cerrar');

        browser.timeoutsAsyncScript(60000);
        browser.executeAsync(loadScript);

        browser.timeoutsAsyncScript(60000);
        browser.executeAsync(unleashGremlins, 50000);
    });

    afterAll(function() {
        if (browser.log('browser')) {
            browser.log('browser').value.forEach(function(log) {
                browser.logger.info(log.message.split(' ')[2]);
            });
        }
    });

});