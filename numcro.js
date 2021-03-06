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

var auto    = document.getElementById('auto')
var simple  = document.getElementById('simple')
var line_h  = document.getElementById('line_h')
var line_v  = document.getElementById('line_v')
var box     = document.getElementById('box')
var only1   = document.getElementById('only1')
var only1_h = document.getElementById('only1_h')
var only1_v = document.getElementById('only1_v')
var only1_box = document.getElementById('only1_box')
var pair = document.getElementById('pair')
var pair_h = document.getElementById('pair_h')
var pair_v = document.getElementById('pair_v')
var pair_box = document.getElementById('pair_box')
var inline= document.getElementById('inline')
var inline_h = document.getElementById('inline_h')
var inline_v = document.getElementById('inline_v')

auto.addEventListener('click', function(){ func_auto() })
simple.addEventListener('click', function(){ func_simple() })
line_h.addEventListener('click', function(){ func_line_h() })
line_v.addEventListener('click', function(){ func_line_v() })
box.addEventListener('click', function(){ func_box() })
only1.addEventListener('click', function(){ func_only1() })
only1_h.addEventListener('click', function(){ func_only1_h() })
only1_v.addEventListener('click', function(){ func_only1_v() })
only1_box.addEventListener('click', function(){ func_only1_box() })
pair.addEventListener('click', function(){ func_pair() })
pair_h.addEventListener('click', function(){ func_pair_h() })
pair_v.addEventListener('click', function(){ func_pair_v() })
pair_box.addEventListener('click', function(){ func_pair_box() })
inline.addEventListener('click', function(){ func_inline() })
inline_h.addEventListener('click', function(){ func_inline_h() })
inline_v.addEventListener('click', function(){ func_inline_v() })

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
  clean_display()
  arr_display(VIEW)
}

function clean_display(){
  var view = document.getElementById('view')
  var debug = document.getElementById('debug')
  view.innerHTML = ''
  debug.innerHTML = ''
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

function arr_display(place, str){
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
  p.innerText = "remain : " + arr_length() + " @ " + str
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

function func_simple(){
  func_line_h()
  func_line_v()
  func_box()
}
function func_auto(){
  var length_last
  var length_new

  while(1){
    length_last = arr_length()

    // simple
    func_simple()

    // only1
    func_only1()

    // pair
    func_pair()

    length_new = arr_length()

    if(length_last == length_new){ break }
    // if(length_last == length_new){
    //   // step2
    //   func_only1_h()
    //   func_only1_v()
    //   func_only1_box()
    //
    //   length_new = arr_length()
    //   if(length_last == length_new){ break }
    // }
  }
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
  arr_display(DEBUG, 'line_h')
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
  arr_display(DEBUG, 'line_v')
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
                // console.log(str + " @box_x:" + box_x + " box_y:" + box_y + " x:" + x + " y:" + y + " i:" + i + " j:" + j)
                arr[box_y * 3 + y][box_x * 3 + x] = arr[box_y * 3 + y][box_x * 3 + x].replace(str, '')
              }
            }
          } 
        }
      }
    } // box_x
  } // box_y
  arr_display(DEBUG, 'box')
}

function func_only1(){
  func_only1_h()
  func_only1_v()
  func_only1_box()
}

function func_only1_h(){
  for(var y = 0; y < 9; y++){
    var str_unfixed = ''
    var str_1char = ''
    for(var x = 0; x < 9; x++){
      if(arr[y][x].length != 1){
        str_unfixed += arr[y][x]
      }else{
        str_unfixed += arr[y][x] + arr[y][x]  // 確定文字は2文字とする
      }
    }
    // 1文字の数字を抽出 -> 確定できる ex)161891689191681658126812 -> 5
    str_1char = pickup_1char(str_unfixed)
    for(var i = 0; i < str_1char.length; i++){
      for(var x = 0; x < 9; x++){
        if(arr[y][x].length != 1 && arr[y][x].indexOf(str_1char[i]) != -1){
          arr[y][x] = str_1char[i]
        }
      }
    }
  }
  arr_display(DEBUG, 'only1_h')
}

function func_only1_v(){
  for(var x = 0; x < 9; x++){
    var str_unfixed = ''
    var str_1char = ''
    for(var y = 0; y < 9; y++){
      if(arr[y][x].length != 1){
        str_unfixed += arr[y][x]
      }else{
        str_unfixed += arr[y][x] + arr[y][x]  // 確定文字は2文字とする
      }
    }
    // 1文字の数字を抽出 -> 確定できる ex)161891689191681658126812 -> 5
    str_1char = pickup_1char(str_unfixed)
    // console.log('x: ' + x + '->' + str_1char)
    for(var i = 0; i < str_1char.length; i++){
      for(var y = 0; y < 9; y++){
        if(arr[y][x].length != 1 && arr[y][x].indexOf(str_1char[i]) != -1){
          arr[y][x] = str_1char[i]
        }
      }
    }
  }
  arr_display(DEBUG, 'only1_v')
}

function func_only1_box(){
  for(var box_y = 0; box_y < 3; box_y++){
    for(var box_x = 0; box_x < 3; box_x++){
      var str_unfixed = ''
      var str_1char = ''
      for(var y = 0; y < 3; y++){
        for(var x = 0; x < 3; x++){
          var cell = arr[box_y * 3 + y][box_x * 3 + x]
          // if(arr[box_y * 3 + y][box_x * 3 + x].length != 1){
          //   str_unfixed += arr[box_y * 3 + y][box_x * 3 + x]
          // }
          if(cell.length != 1){
            str_unfixed += cell
          }else{
            str_unfixed += cell + cell // 確定文字は2文字とする
          }
        }
      }
      str_1char = pickup_1char(str_unfixed)
      // console.log('box_x: ' + box_x + ' box_y: ' + box_y + '->' + str_1char + ' =' + str_unfixed)
      for(var i = 0; i < str_1char.length; i++){
        for(var y = 0; y < 3; y++){
          for(var x = 0; x < 3; x++){
            var cell = arr[box_y * 3 + y][box_x * 3 + x]
            if(cell.length != 1 && cell.indexOf(str_1char[i]) != -1){
              arr[box_y * 3 + y][box_x * 3 + x] = str_1char[i]
            }
          }
        }
      }
    }
  }
  arr_display(DEBUG, 'only1_box')
}

function func_pair(){
  func_pair_h()
  func_pair_v()
  func_pair_box()
}

function func_pair_h(){
  for(var y = 0; y < 9; y++){
    for(var x = 0; x < 9; x++){
      var cell = arr[y][x]
      if(cell.length == 2){
        for(var search_x = x + 1; search_x < 9; search_x++){
          if(arr[y][search_x] == cell){
            console.log(cell + " @ x:" + x + " y:" + y)
            // pair cellを見つけたらpair数値は他のcell候補から外す
            for(var i = 0; i < 9; i++){
              if(i == x || i == search_x){ continue }
              arr[y][i] = arr[y][i].replace(cell.charAt(0), '')
              arr[y][i] = arr[y][i].replace(cell.charAt(1), '')
            }
          }
        }
      }
    }
  }
  arr_display(DEBUG, 'pair_h')
}

function func_pair_v(){
  for(var x = 0; x < 9; x++){
    for(var y = 0; y < 9; y++){
      var cell = arr[y][x]
      if(cell.length == 2){
        for(var search_y = y + 1; search_y < 9; search_y++){
          if(arr[search_y][x] == cell){
            console.log(cell + " @ x:" + x + " y:" + y)
            // pair cellを見つけたらpair数値は他のcell候補から外す
            for(var j = 0; j < 9; j++){
              if(j == y || j == search_y){ continue }
              arr[j][x] = arr[j][x].replace(cell.charAt(0), '')
              arr[j][x] = arr[j][x].replace(cell.charAt(1), '')
            }
          }
        }
      }
    }
  }
  arr_display(DEBUG, 'pair_v')
}

function func_pair_box(){
  for(var box_y = 0; box_y < 3; box_y++){
    for(var box_x = 0; box_x < 3; box_x++){
      box_next:
      for(var y = 0; y < 3; y++){
        for(var x = 0; x < 3; x++){
          var cell = arr[box_y * 3 + y][box_x * 3 + x]
          if(cell.length == 2){
            // console.log(cell + " @ box_x:" + box_x + " box_y:" + box_y + " x:" + x + " y:" + y)
            // 同じ2文字(数値)がbox内の他cellに無いか探す
            for(var search_y = y; search_y < 3; search_y++){
              for(var search_x = 0; search_x < 3; search_x++){  // search_xはsearch_y増加で戻るので0 start
                if(search_x == x && search_y == y){ continue }
                if(arr[box_y * 3 + search_y][box_x * 3 + search_x] == arr[box_y * 3 + y][box_x * 3 + x]){
                  // pair cellを見つけたらpair数値は他のcell候補から外す
                  console.log(cell + " @ box_x:" + box_x + " box_y:" + box_y + " x:" + x + " y:" + y)
                  for(var j = 0; j < 3; j++){
                    for(var i = 0; i < 3; i++){
                      if(i == x        && j == y       ){ continue }
                      if(i == search_x && j == search_y){ continue }
                      // console.log(cell + " @ i:" + i + " j:" + j + " cell:" + arr[box_y * 3 + j][box_x * 3 + i])
                      arr[box_y * 3 + j][box_x * 3 + i] = arr[box_y * 3 + j][box_x * 3 + i].replace(cell.charAt(0), '')
                      arr[box_y * 3 + j][box_x * 3 + i] = arr[box_y * 3 + j][box_x * 3 + i].replace(cell.charAt(1), '')
                    }
                  }
                  continue box_next // pairはboxに1つなはずなので、1つ処理したら次のboxへ
                }
              }
            }
          } // arr[box_y * 3 + y][box_x * 3 + x].length == 2
        }
      }
    }
  }
  arr_display(DEBUG, 'pair_box')
}

function func_inline(){
  func_inline_h()
  func_inline_v()
}
function func_inline_h(){
  console.log('h')

  for(var box_y = 0; box_y < 3; box_y++){
    for(var box_x = 0; box_x < 3; box_x++){
      // box内で未決定が2 or 3個の数字を収集
      var number_all_in_box = ''
      for(var y = 0; y < 3; y++){
        for(var x = 0; x < 3; x++){
          number_all_in_box += arr[box_y * 3 + y][box_x * 3 + x]
        }
      }
      var tmp_2 = pickup_2char(number_all_in_box)
      var tmp_3 = pickup_3char(number_all_in_box)
      // console.log("box[" + box_y + "][" + box_x + "]:" + number_all_in_box + " -> 2:" + tmp_2 + " 3:" + tmp_3)
      var char_2or3 = tmp_2 + tmp_3

      // 2 or 3文字が1列なら他boxの候補を削除
      if(char_2or3.length != 0){
        for(var l = 0; l < char_2or3.length; l++){
          var collect_y_corrdinate = ''
          for(var y = 0; y < 3; y++){
            for(var x = 0; x < 3; x++){
              if(arr[box_y * 3 + y][box_x * 3 + x].indexOf(char_2or3[l]) != -1){
                collect_y_corrdinate += box_y * 3 + y
              }
            }
          }
          // console.log("box[" + box_y + "][" + box_x + "]:" + char_2or3[l] + "->" + collect_y_corrdinate + " " + is_same(collect_y_corrdinate))
          if(is_same(collect_y_corrdinate)){
            var char_delete  = char_2or3[l]
            var y_corrdinate = collect_y_corrdinate[0]
            for(var box_i = 0; box_i < 3; box_i++){
              if(box_x == box_i){ continue }
              for(var i = 0; i < 3; i++){
                arr[y_corrdinate][box_i * 3 + i] = arr[y_corrdinate][box_i * 3 + i].replace(char_delete, '')
                console.log("box[" + box_y + "][" + box_x + "]:" + char_2or3[l] + "->y_corrdinate " + collect_y_corrdinate)
              }
            }
          }
        }
      }
    }
  }
  arr_display(DEBUG, 'inline_h')
}
function func_inline_v(){
  console.log('v')

  for(var box_y = 0; box_y < 3; box_y++){
    for(var box_x = 0; box_x < 3; box_x++){
      // box内で未決定が2 or 3個の数字を収集
      var number_all_in_box = ''
      for(var y = 0; y < 3; y++){
        for(var x = 0; x < 3; x++){
          number_all_in_box += arr[box_y * 3 + y][box_x * 3 + x]
        }
      }
      var tmp_2 = pickup_2char(number_all_in_box)
      var tmp_3 = pickup_3char(number_all_in_box)
      // console.log("box[" + box_y + "][" + box_x + "]:" + number_all_in_box + " -> 2:" + tmp_2 + " 3:" + tmp_3)
      var char_2or3 = tmp_2 + tmp_3

      // 2 or 3文字が1列なら他boxの候補を削除
      if(char_2or3.length != 0){
        for(var l = 0; l < char_2or3.length; l++){
          var collect_x_corrdinate = ''
          for(var y = 0; y < 3; y++){
            for(var x = 0; x < 3; x++){
              if(arr[box_y * 3 + y][box_x * 3 + x].indexOf(char_2or3[l]) != -1){
                collect_x_corrdinate += box_x * 3 + x
              }
            }
          }
          // console.log("box[" + box_y + "][" + box_x + "]:" + char_2or3[l] + "->" + collect_x_corrdinate + " " + is_same(collect_x_corrdinate))
          if(is_same(collect_x_corrdinate)){
            var char_delete  = char_2or3[l]
            var x_corrdinate = collect_x_corrdinate[0]
            for(var box_j = 0; box_j < 3; box_j++){
              if(box_y == box_j){ continue }
              for(var j = 0; j < 3; j++){
                arr[box_j * 3 + j][x_corrdinate] = arr[box_j * 3 + j][x_corrdinate].replace(char_delete, '')
                console.log("box[" + box_y + "][" + box_x + "]:" + char_2or3[l] + "->x_corrdinate " + collect_x_corrdinate)
              }
            }
          }
        }
      }
    }
  }
  arr_display(DEBUG, 'inline_v')
}

// '11232' -> '2'
// '123342' -> '14'
function pickup_1char(str){
  var str_1char = ''
  for(var i = 1; i < 10; i++){
    if(str.indexOf(i) == str.lastIndexOf(i) && str.indexOf(i) != -1){
      str_1char += String(i)
    }
  }
  return str_1char
}
function pickup_2char(str){
  var str_2char = ''
  for(var i = 1; i < 10; i++){
    var str_tmp = str.replace(new RegExp(i, 'g'), '')
    if(str.length - str_tmp.length == 2){ str_2char += i }
  }
  return str_2char
}
function pickup_3char(str){
  var str_3char = ''
  for(var i = 1; i < 10; i++){
    var str_tmp = str.replace(new RegExp(i, 'g'), '')
    if(str.length - str_tmp.length == 3){ str_3char += i }
  }
  return str_3char
}
function is_same(str){
  var tmp = str.replace(new RegExp(str[0], 'g'), '')
  return tmp.length == 0 ? true : false
}

initialize()

