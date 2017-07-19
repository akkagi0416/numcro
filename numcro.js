const VIEW  = 0
const DEBUG = 1

var arr = []
var arr_init = [
  '054 000 000',
  '700 640 850',
  '238 070 096',
  '010 320 708',
  '060 000 020',
  '402 057 030',
  '570 030 284',
  '029 085 007',
  '000 000 910'
]
var step = 0

function initialize(){
  for(var y = 0; y < 9; y++){
    arr[y] = []
    for(var x = 0; x < 9; x++){
      arr[y][x] = '123456789'
    }
  }
}

function set(str, x, y){
  arr[y][x] = str
}

function get(x, y){
  return arr[y][x]
}

function read_form(){
  var i = 0
  var text_area = document.fm.input.value

  str = text_area.replace(/\s+/g, '').replace(/\r?\n/, '')

  for(var y = 0; y < 9; y++){
    for(var x = 0; x < 9; x++){
      number = str.charAt(i++)
      if(number == '0'){
        number = '123456789'
      }
      arr[y][x] = number
    }
  }
  arr_display(VIEW)
}

function arr_display(place){
  var section
  if(place == VIEW){
    section = document.getElementById('view')
  }else{
    section = document.getElementById('debug')
  }

  var table = document.createElement('div')
  table.className = 'table'
  section.appendChild(table)

  for(var y = 0; y < 9; y++){
    var row = document.createElement('div')
    row.classList.add('row')
    table.appendChild(row)

    for(var x = 0; x < 9; x++){
      var cell = document.createElement('div')
      cell.className = 'cell'
      row.appendChild(cell)

      for(var c = 1; c <= 9; c++){
        var number = document.createElement('div')
        number.className = 'number exists'
        cell.appendChild(number)
      }

      if(arr[y][x].length == 1){
        // fix
        for(var i = 0; i < 9; i++){
          cell.children[i].classList.remove('exists')
          cell.children[i].innerText = ''
        }
        cell.children[4].classList.add('fixed')
        cell.children[4].innerText = arr[y][x] 

      }else{
        // not fix
        for(var i = 0; i < 9; i++){
          if(arr[y][x].indexOf(String(i+1)) == -1){
            cell.children[i].classList.remove('exists')
          }
          cell.children[i].innerText = i + 1
        }
      }
    }
  }
}

function debug_step(){
  arr_display(DEBUG)
}

function line_h(){
  var x, y
  var i

  for(y = 0; y < 9; y++){
    for(x = 0; x < 9; x++){
      if(arr[y][x].len != 1){ continue }

      for(i = 0; i < 9; i++){
        if(i == x){ continue }

        arr[y][i].replace(arr[y][x], '')
      }
    }
  }
}

function line_v(){
}


initialize()

