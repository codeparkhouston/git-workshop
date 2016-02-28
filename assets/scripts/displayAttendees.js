(function(window){

  window.displayAttendees = displayAttendees;

  function displayAttendees(wrapperId, attendees){
    var getAttendeeHTML = setupAttendeeDisplay();

    var attendeesDOM = document.getElementById(wrapperId)
    var attendeesHTML = _.chain(attendees)
      .map(getAttendeeHTML)
      .map(_.property('outerHTML'))
      .value();
    attendeesDOM.innerHTML = attendeesHTML.join('');

    var sizes = [
      { columns: 6, gutter: 10 },
      { mq: '768px', columns: 6, gutter: 10 },
      { mq: '992px', columns: 12, gutter: 10 },
      { mq: '1200px', columns: 12, gutter: 10 }
    ];

    var attendeesBricks = new Bricks({
      container: '#' + wrapperId,
      packed: 'data-packed',
      sizes: sizes
    });

    var images = document.querySelectorAll('img');
    var imagesLoaded = _.map(images, function(image){
      return new Promise(function(resolve, reject){
        image.onload = function(loadEvent){
          resolve(loadEvent);
        };
      });
    });

    var packAttendees = _.partial(pack, wrapperId, attendeesBricks, sizes);

    Promise.all(imagesLoaded).then(packAttendees);
    window.addEventListener('resize', _.debounce(packAttendees, 100));
  }

  function pack(wrapperId, attendeesBricks, sizes){
    sizeAttendees(wrapperId, sizes);
    attendeesBricks.pack();
  }

  function sizeAttendees(wrapperId, sizes){
    var attendeeWidth = getAttendeeSize(wrapperId, sizes);
    var attendeesDOM = document.getElementById(wrapperId);

    _.each(attendeesDOM.children, function(attendeeDOM){
      attendeeDOM.style.width = attendeeWidth + 'px';
    });
  }

  function getAttendeeSize(wrapperId, sizes){
    var attendeesDOM = document.getElementById(wrapperId);
    var attendeesSize = attendeesDOM.parentNode.getBoundingClientRect();
    var wrapperWidth = attendeesSize.width - 30;

    var sizeInfo = _.find(sizes, function(size){
      if(wrapperWidth >= getSizeMinWidth(size) - 60){
        return true;
      }
    });
    var attendeeWidth = ((wrapperWidth) - sizeInfo.columns * sizeInfo.gutter)/sizeInfo.columns;
    return attendeeWidth;
  }

  function getSizeMinWidth(size){
    var minWidth = 0;
    if(!_.isEmpty(size.mq)){
      minWidth = _.toNumber(size.mq.replace('px', ''));
    }
    return minWidth;
  }

  function setupAttendeeDisplay(){
    var wrapperDOM = document.createElement('div');
    wrapperDOM.classList.add('attendee');
    var baseImageDOM = document.createElement('img')
    baseImageDOM.classList.add('img-responsive');

    var templateDOM = wrapperDOM.cloneNode();
    templateDOM.appendChild(baseImageDOM.cloneNode());

    return function (attendee){
      var attendeeDOM = templateDOM.cloneNode(true);
      var photoSrc = attendee.photo || 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Blank.gif'
      attendeeDOM.children[0].src = photoSrc;
      attendeeDOM.dataset.name = attendee.name;
      if(!attendee.photo){
        attendeeDOM.classList.add('attendee-no-photo');
      }
      return attendeeDOM;
    }
  }

}(window));