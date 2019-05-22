let canvas = $('#canvas')[0]
let context = canvas.getContext('2d')
let toggle_control = $('#toggle_control')[0]
let start = $('#start')[0]

let app = new Core(canvas, context)

app.initProperties({
  width: window.innerWidth - 15,
  height: window.innerHeight - 15,
  border_collide: false,
})

let Part = {
  pos: {
    x: 1,
    y: 1,
  },
  vel: {
    x: 1,
    y: 0,
  },
  acc: {
    x: 0,
    y: 0,
  },
  size: 5,
  mass: 30,
}

let Part2 = {
  pos: {
    x: 100,
    y: 100,
  },
  vel: {
    x: 0,
    y: 0,
  },
  acc: {
    x: 0,
    y: 0,
  },
  size: 10,
  mass: 10,
}

Listeners()

function mouse_l (x, y) {
  let k = Object.create(Part)
  let g = (Math.random() * (5) + 5)

  k.pos.x = x
  k.size = 5
  k.pos.y = y //k.mass = (Math.random() * (15) + 10);
  app.append(k, 'meteor')
//    console.log(k)
}

function mouse_r (x, y) {
  let k = Object.create(Part)

  let g = (Math.random() * (5) + 12)

  k.pos.x = x
  k.mass = 40
  k.pos.y = y
  k.size = 10
  app.append(k, 'sun')
//    console.log(k)
}

//console.log(sun);

$(window).resize(function (e) {

  app.width = window.innerWidth - 15
  app.height = window.innerHeight - 15
})

function Listeners () {
  document.oncontextmenu = function () {return false}

  app.height = window.document.body.clientHeight - 15
  app.width = window.document.body.clientWidth - 15

  toggle_control.addEventListener('click', toggleControl)
  start.addEventListener('click', startSimulate)

  canvas.addEventListener('click', function (e) {
    mouse_l(e.layerX, e.layerY)
  })

  canvas.addEventListener('contextmenu', function (e) {
    mouse_r(e.layerX, e.layerY)
  })

}

var interval = false // переменная зарезирвированя для хранения интервала

var buttonType = 0 // определяет левая кнопка зажата или правая

document.onmousedown = function (e) {
  buttonType = e.button
}

function fastAdd (cb) {

  // Зажатие alt
  document.getElementById('app').onkeydown = function (e) {
    if ('Alt' === e.key) {

      interval = setInterval(function () {
        cb()
      }, 150)

    }
  }

  // Отпускание alt
  document.getElementById('app').onkeyup = function (e) {
    if ('Alt' === e.key) {

      if (false !== interval) {
        clearInterval(interval)
        interval = false
      }
    }
  }

}

// callback
fastAdd(function () {
  let x, y

  // получение координаты
  function xCord (event) {
    x = 0
    if (event.pageX) {
      x = event.pageX
    } else if (event.clientX) {
      x = event.clientX +
        (document.documentElement.scrollLeft || document.body.scrollLeft) -
        document.documentElement.clientLeft
    }
  }

  // получение координаты
  function yCord (event) {
    y = 0

    if (event.pageY) {
      y = event.pageY
    } else if (event.clientY) {
      y = event.clientY +
        (document.documentElement.scrollTop || document.body.scrollTop) -
        document.documentElement.clientTop
    }
  }

  //  событие для получение объекта курсора
  document.onmousemove = function (e) {
    if (false !== interval) {
      xCord(e)
      yCord(e)

      // проверяем как4ая из кнопок зажата
      if (0 === buttonType) {
        mouse_l(x, y)
      }

      // проверяем как4ая из кнопок зажата
      if (2 === buttonType) {
        mouse_r(x, y)
      }
    }
  }
})

let starton = false

function startSimulate () {

  if (starton === false) {
    app.simulate()
    starton = true
  } else {
    app.stopSimulate()
    starton = false
  }

}

function toggleControl () {
  set.classList.toggle('visible')

}

