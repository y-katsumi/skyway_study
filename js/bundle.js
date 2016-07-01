/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var peer = new Peer({
	  key: 'bc027ba1-6d2d-4bdf-b011-9afbf95e1328',
	  debug: 3,
	  logFunction: function() {
	    var copy = Array.prototype.slice.call(arguments).join(' ');
	    console.log('peerのlog:', copy);
	  }
	});
	var connectedPeers = {};

	//必須
	window.onunload = window.onbeforeunload = function(e) {
	  if (!!peer && !peer.destroyed) {
	    peer.destroy();
	  }
	};

	peer.on('open', function(id){
	  console.log('openのログ:', id);
	});
	peer.listAllPeers(function(list){
	  for (var i in list) {
	    var requestedPeer = list[i];
	    var c = peer.connect(requestedPeer, {
	      label: 'tag',
	      serialization: 'none',
	      metadata: {message: 'new client'}
	    });
	    c.on('open', function() {
	      // add(c);
	    });
	    c.on('error', function(err) { alert(err); });

	    c.on('data', function(data) {
	    });
	    c.on('close', function() {
	      delete connectedPeers[c.peer];
	    });
	  }
	  connectedPeers[requestedPeer] = 1;
	});

	function add(c) {
	  $('#send').submit(function(e) {
	    // For each active connection, send the message.
	    var msg = $('#text').val();
	    eachActiveConnection(function(c, $c) {
	      if (c.label === 'chat') {
	        c.send(msg);
	        $c.find('.messages').append('<div><span class="you">You: </span>' + msg
	          + '</div>');
	      }
	    });
	    $('#text').val('');
	    $('#text').focus();
	  });

	  function eachActiveConnection(fn) {
	    var actives = $('.active');
	    var checkedIds = {};
	    actives.each(function() {
	      var peerId = $(this).attr('id');

	      if (!checkedIds[peerId]) {
	        var conns = peer.connections[peerId];
	        for (var i = 0, ii = conns.length; i < ii; i += 1) {
	          var conn = conns[i];
	          fn(conn, $(this));
	        }
	      }
	    });
	  }
	}


/***/ }
/******/ ]);