/*
 * TODO:
 * Abstract deck & layout into classes
 * "Draw" cards, preventing duplicates
 * Draw image into Promise
 * Draw images in order
 * Layout/spacing
 * Border, background
 * Hover events to display card name
 * Find meanings?
 * Animations?
 * Add pre-scaled images
 * Save layout?
 * New Layouts?
 */
navigator.serviceWorker.register('/worker.js', {scope: '/'}).then(reg => {
  console.log('worker registered: ', reg);
}).catch(error => {
  console.log('failed to register worker: ', error);
});

class Layout {
  constructor(canvas) {
    this.canvas = canvas;
  }
}

class CelticCross extends Layout {
  constructor (canvas) {
    super(canvas);
    this.initPositions();
  }

  initPositions () {
    var colWidth = this.canvas.width / 5,
      rowHeight = this.canvas.height / 4,
      columns = [];

    for(var i = 1; i < 5; i++) {
      columns.push(colWidth * i);
    }

    this._positions = [
      {
        x: columns[1],
        y: rowHeight * 2,
        name: 'present'
      },
      {
        x: columns[1],
        y: rowHeight * 2,
        rotate: 90,
        name: 'immediate challenge'
      },
      {
        x: columns[2],
        y: rowHeight * 2,
        name: 'distant past'
      },
      {
        x: columns[1],
        y: rowHeight * 3,
        name: 'recent past'
      },
      {
        x: columns[1],
        y: rowHeight,
        name: 'best outcome'
      },
      {
        x: columns[0],
        y: this.canvas.height / 2,
        name: 'immediate future'
      },
      {
        x: columns[3],
        y: (this.canvas.height / 5) * 4,
        rotate: 45,
        name: 'factors affecting situation'
      },
      {
        x: columns[3],
        y: (this.canvas.height / 5) * 3,
        rotate: 45,
        name: 'external influences'
      },
      {
        x: columns[3],
        y: (this.canvas.height / 5) * 2,
        rotate: 45,
        name: 'hopes and fears'
      },
      {
        x: columns[3],
        y: (this.canvas.height / 5),
        rotate: 45,
        name: 'final outcome'
      }
    ];
  }

    get positions () {
        return this._positions;
    }
}

class Deck {
}

window.onload = function () {

  // Init canvax
  const canvas = document.getElementById('layout');
  const context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = canvas.width * (9/16);

  const layout = new CelticCross(canvas);

  function initImage (path, position) {
    // Init image object
    let image = new Image();
    image.onload = () => {
      let dispHeight = image.height * 0.3;
      let dispWidth = image.width * 0.3;

      context.save();

      context.translate(
        position.x,
        position.y);

      if(position.rotate) {
        context.rotate((Math.PI / 180) * position.rotate);
      }

      // Draw with negative offset to allow rotation on center
      context.drawImage(image,
        -(dispWidth/2),
        -(dispHeight/2),
        dispWidth,
        dispHeight);

      context.restore();
    };
    image.src = path;
  }

  // Load images index
  let cards = [];

  return fetch('cards.json').then(response => {
    return response.json();
  }).then(function (res) {
    cards = res;

    for(let i = 0; i < layout.positions.length; i++) {
      //  select and draw card images
      let index = Math.floor(Math.random() * cards.length);
      initImage(cards[index].path, layout.positions[i]);
    }
  });
};
