var url = 'https://goinstant.net/bendecoste/presentations';

function run() {
  var platform = new goinstant.Platform(url);
  platform.connect(function(err) {
    if (err) {
      throw err;
    }

    var room = platform.room('present');
    room.join(function(err) {
      if (err) {
        throw err;
      }

      syncState(room);
    });
  });
}

function syncState(room) {
  var key = room.key('slide');

  Reveal.addEventListener('slidechanged', function(evt) {
    // get the current slide
    key.set({
      h: evt.indexh,
      v: evt.indexv,
      f: evt.indexf
    });
  });

  key.on('set', function(val) {
    Reveal.slide(val.h, val.v, val.f);
  });
}

window.runPlatform = run;
