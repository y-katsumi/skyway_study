
<todo>

  <h3>
    skyway_id<br>{ opts.id }
  </h3>

  <ul>
    <li each={ items.filter(whatShow) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add } show={ connect }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.filter(whatShow).length + 1 }</button>

    <button disabled={ items.filter(onlyDone).length == 0 } onclick={ removeAllDone }>
    X{ items.filter(onlyDone).length } </button>
  </form>

  <style scoped>
    :scope { display: block }
    h3 { font-size: 240% }
    /** other tag specific styles **/
  </style>

  <!-- this script tag is optional -->
  <script>

    this.items = opts.items

    initTodo(this)
    changeId(txt){
      opts.id = txt
      this.connect = true
      this.update()
    }

    recive(data){
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
    }

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
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
    }

    removeAllDone(e) {
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
    }

    // an two example how to filter items on the list
    whatShow(item) {
      return !item.hidden
    }

    onlyDone(item) {
      return item.done
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      datas = {
        type: 'Toggle',
        body: item
      }
      sendData(datas)
      return true
    }
  </script>

</todo>
