var peer = new Peer({
  key: 'bc027ba1-6d2d-4bdf-b011-9afbf95e1328',
  debug: 1,
  logFunction: function() {
    var copy = Array.prototype.slice.call(arguments).join(' ');
    console.log('peerのlog:', copy);
  }
});
var connectedPeers = {};
var selfConn = '';
var tagObj = {};
var host_flag = false;

//必須
window.onunload = window.onbeforeunload = function(e) {
  if (!!peer && !peer.destroyed) {
    peer.destroy();
  }
};
(function(){

  peer.on('open', function(id){
    selfConn = id;
    tagObj.changeId(selfConn);
  });
  //新たに接続されたコネクションからデータを受け撮った時の処理
  peer.on('connection', function(c){
    c.on('data', function(data) {
      reciveData(data);
    });
    c.on('error', function(err) { console.log(c); });
    c.on('close', function() {
      delete connectedPeers[c.peer];
    });
    connectedPeers[c.peer] = 1;
  });
  peer.listAllPeers(function(list){
    if (!Array.isArray(list)) {
      return 0;
    }
    for (var i in list) {
      var requestedPeer = list[i];
      if (!connectedPeers[requestedPeer]) {
        var c = peer.connect(requestedPeer, {
          label: 'tag',
          serialization: 'none',
          reliable: true,
          metadata: {message: 'new client'}
        });
        c.on('open', function() {
        });
        c.on('data', function(data) {
          reciveData(data);
        });
        c.on('error', function(err) {
          console.log(err);
        });

        c.on('close', function() {
          connectedPeers[this.peer] = 0;
        });
        connectedPeers[requestedPeer] = 1;
      }
    }
  });
})();

function reciveData(data){
  tagObj.recive(JSON.parse(data));
}
function sendData(data){
  for (var requestedPeer in connectedPeers) {
    if (requestedPeer != selfConn && connectedPeers[requestedPeer] != 0) {
      var conns = peer.connections[requestedPeer];
      for (var i = 0, ii = conns.length; i < ii; i += 1) {
        var c = conns[i];
        c.send(JSON.stringify(data));
      }
    }
  }
}
function initTodo(obj){
  tagObj = obj;
}