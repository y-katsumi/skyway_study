
riot.tag2('todo', '<h3> skyway_id<br>{opts.id} </h3> <ul> <li each="{items.filter(whatShow)}"> <label class="{completed: done}"> <input type="checkbox" __checked="{done}" onclick="{parent.toggle}"> {title} </label> </li> </ul> <form onsubmit="{add}" show="{connect}"> <input name="input" onkeyup="{edit}"> <button __disabled="{!text}">Add #{items.filter(whatShow).length + 1}</button> <button __disabled="{items.filter(onlyDone).length == 0}" onclick="{removeAllDone}"> X{items.filter(onlyDone).length} </button> </form>', 'todo,[riot-tag="todo"],[data-is="todo"]{ display: block } todo h3,[riot-tag="todo"] h3,[data-is="todo"] h3{ font-size: 240% }', '', function(opts) {

    this.items = opts.items

    initTodo(this)
    this.changeId = function(txt){
      opts.id = txt
      this.connect = true
      this.update()
    }.bind(this)

    this.recive = function(data){
      switch(data.type) {
        case 'AddTodo':
          this.items.push(data.body)
          break
        case 'Toggle':
          var key = data.body.key
          this.items[key].done = data.body.done
          break
        case 'RemoveAll':
          var i = 0
          this.items = this.items.filter(function(item, key) {
            item.key = i
            if (!item.done) {
              i++;
            }
            return !item.done
          })
          break
      }
      this.update()
    }.bind(this)

    this.edit = function(e) {
      this.text = e.target.value
    }.bind(this)

    this.add = function(e) {
      if (this.text) {
        var add_data = {title: this.text, key: this.items.length}
        this.items.push(add_data)
        datas = {
          type: 'AddTodo',
          body: add_data
        }
        sendData(datas)
        this.text = this.input.value = ''
      }
    }.bind(this)

    this.removeAllDone = function(e) {
      datas = {
        type: 'RemoveAll'
      }
      sendData(datas)
      var i = 0
      this.items = this.items.filter(function(item, key) {
        item.key = i
        if (!item.done) {
          i++;
        }
        return !item.done
      })
    }.bind(this)

    this.whatShow = function(item) {
      return !item.hidden
    }.bind(this)

    this.onlyDone = function(item) {
      return item.done
    }.bind(this)

    this.toggle = function(e) {
      var item = e.item
      item.done = !item.done
      datas = {
        type: 'Toggle',
        body: item
      }
      sendData(datas)
      return true
    }.bind(this)
});
