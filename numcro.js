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

var line_h = document.getElementById('line_h')
var line_v = document.getElementById('line_v')
var box    = document.getElementById('box')

line_h.addEventListener('click', function(){ func_line_h() })
line_v.addEventListener('click', function(){ func_line_v() })
box.addEventListener('click', function(){ func_box() })

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

function arr_length(){
  var length = 0;
  for(var y = 0; y < 9; y++){
    for(var x = 0; x < 9; x++){
      length += arr[y][x].length
    }
  }
  return length
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

  // display remain numbers(goal : 9 * 9 = 81)
  var p     = document.createElement('p')
  p.innerText = "remain : " + arr_length()
  table.appendChild(p)

  var table_last = document.querySelector('#debug .table')
  section.insertBefore(table, table_last) // ok table_last == null

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

function func_line_h(){
  for(var y = 0; y < 9; y++){
    for(var x = 0; x < 9; x++){
      if(arr[y][x].length != 1){ continue } // 未確定cellなら次

      // ここへ来たら確定cellなので他の横列から該当数字を削除
      for(var i = 0; i < 9; i++){
        if(i == x){ continue }
        arr[y][i] = arr[y][i].replace(arr[y][x], '')
      }
    }
  }
  arr_display(DEBUG)
}

function func_line_v(){
  for(var y = 0; y < 9; y++){
    for(var x = 0; x < 9; x++){
      if(arr[y][x].length != 1){ continue } // 未確定cellなら次

      // ここへ来たら確定cellなので他の縦列から該当数字を削除
      for(var i = 0; i < 9; i++){
        if(i == y){ continue }
        arr[i][x] = arr[i][x].replace(arr[y][x], '')
      }
    }
  }
  arr_display(DEBUG)
}

function func_box(){
  for(var box_y = 0; box_y < 3; box_y++){
    for(var box_x = 0; box_x < 3; box_x++){
      for(var y = 0; y < 3; y++){
        for(var x = 0; x < 3; x++){
          if(arr[box_y * 3 + y][box_x * 3 + x].length != 1){
            // 未確定cellなのでbox内の確定数字を削除
            for(var j = 0; j < 3; j++){
              for(var i = 0; i < 3; i++){
                if(i == x && j == y){ continue }
                var str = arr[box_y * 3 + j][box_x * 3 + i]
                if(str.length != 1){ continue }
                console.log(str + " @box_x:" + box_x + " box_y:" + box_y + " x:" + x + " y:" + y + " i:" + i + " j:" + j)
                arr[box_y * 3 + y][box_x * 3 + x] = arr[box_y * 3 + y][box_x * 3 + x].replace(str, '')
              }
            }
          } 
        }
      }
    } // box_x
  } // box_y
  arr_display(DEBUG)
}

initialize()

