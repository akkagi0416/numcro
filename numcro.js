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

function initialize(){
  var table = document.getElementById('table')

  // table作成
  for(var y = 0; y < 9; y++){
    var row = document.createElement('div')
    row.classList.add('row')
    table.appendChild(row)

    arr[y] = []
    for(var x = 0; x < 9; x++){
      var cell = document.createElement('div')
      cell.className = 'cell'
      cell.id = 'c' + String(y * 10 + x)
      row.appendChild(cell)

      for(var c = 1; c <= 9; c++){
        var number = document.createElement('div')
        number.className = 'number exists'
        cell.appendChild(number)
      }

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
  arr_display()
}

function arr_display(){
  for(var y = 0; y < 9; y++){
    for(var x = 0; x < 9; x++){
      var cell = document.getElementById('c' + String(y * 10 + x))

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


initialize()

