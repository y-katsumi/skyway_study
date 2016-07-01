mount_obj = {}
mount_op = {
    'todo': {
        title: ' ',
        items: [
            { title: 'Avoid excessive caffeine', done: true, key: 0},
            { title: 'Hidden item',  hidden: true, key: 1},
            { title: 'Be less provocative', key: 2},
            { title: 'Be nice to people', key: 3}
        ]
    }
}
riot.route.start()

// 初期マウント
name = 'todo'
mount_obj[name] = riot.mount(name, mount_op[name])
