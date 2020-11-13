/**
 * 
 * @param {boolean} cancelSocket:是否断开websocket，默认false
 * @param {str} wsUrl: websocket的链接，无默认值
 * @param {str} sockUrl: 不支持websocket时的链接，无默认值
 * @param {func} openSendMsg： 打开websocket的onopen时执行的方法
 * @param {func} sendMsg: 连接上后，onmessage中发送消息的方法，无默认值
 * @param {func} receiveMsg: 连接上后，onmessage中接收到消息的方法，无默认值
 */
(function($) {
	var originThis;
	var ws; // websocket实例
	var lockReconnect = false; // 避免重复连接
	var wsUrl = '';
	var sockUrl = '';
	var getConnect = 0;
	NewSocket.DEFAULTS = {
		cancelSocket: false,
		wsUrl: null,
		sockUrl: null,
		openSendMsg: null,
		sendMsg: null,
		receiveMsg: null,
	};

	function NewSocket(options) {
		originThis = this;
		originThis.opts = $.extend({}, NewSocket.DEFAULTS, options);
		if (originThis.opts.cancelSocket) {
			originThis.cancelConnect();
			return;
		}
		originThis.connect();
	}

	// 函数：websocket连接
	NewSocket.prototype.connect = function() {
		console.log('connect():连接中...');
		getConnect = 1;
		originThis.getIp();
		originThis.createWebSocket(wsUrl, sockUrl);
		
		console.log("连接地址：" + wsUrl)
		lockReconnect = false;
	};
	// 函数：websocket断开连接，并且不再重连
	NewSocket.prototype.cancelConnect = function() {
		console.log('cancelConnect():断开连接');
		getConnect = 2;
		ws.close();
		lockReconnect = true;
	};
	// 函数：获取ip
	NewSocket.prototype.getIp = function() {
		wsUrl = 'ws://' + originThis.opts.wsUrl;
		sockUrl = 'http://' +  originThis.opts.sockUrl;
	};
	// 函数：获取url
	NewSocket.prototype.webSocketUrl = function(url, sUrl) {
		if ('WebSocket' in window) {
			websocket = new WebSocket(url);
		} else if ('MozWebSocket' in window) {
			websocket = new MozWebSocket(url);
		} else {
			$.getScript('//cdn.jsdelivr.net/sockjs/1.0.0/sockjs.min.js');
			websocket = new SockJS(sUrl);
		}
		return websocket;
	};
	// 函数：创建websocket
	NewSocket.prototype.createWebSocket = function(url, sUrl) {
		try {
			ws = originThis.webSocketUrl(url, sUrl);
			originThis.initEventHandle();
		} catch (e) {
			originThis.reconnect(url, sUrl);
		}
	};
	// 函数：websocket相关操作,onopen、onmessage、onclose、onerror
	NewSocket.prototype.initEventHandle = function() {
		ws.onclose = function() {
			if (getConnect == 1) {
				originThis.reconnect(wsUrl, sockUrl);
				console.log('close():断开');
			}
		};
		ws.onerror = function() {
			if (getConnect == 1) {
				originThis.reconnect(wsUrl, sockUrl);
				console.log('error()：报错');
			}
		};
		ws.onopen = function() {
			if (ws.readyState == 1) {
				var msg = originThis.opts.openSendMsg();
				if (!msg) {
					var openTimeSpe = curTime();
					console.log('onopen()：连接成功，' + openTimeSpe);
					msg = '打开时间:' + openTimeSpe;
					console.log("打开时间：" + openTimeSpe)
				}
				ws.send(msg);
			}
		};
		ws.onmessage = function(event) {
			originThis.opts.sendMsg && originThis.opts.sendMsg(ws); // 发送消息
			originThis.opts.receiveMsg && originThis.opts.receiveMsg(event); //接收消息
		}
	};
	// 函数：websocket重连
	NewSocket.prototype.reconnect = function(url, sUrl) {
		if (lockReconnect) return;
		lockReconnect = true;
		// 没连接上会一直重连，设置延迟避免请求过多
		setTimeout(function() {
			originThis.createWebSocket(url, sUrl);
			lockReconnect = false;
		}, 30000);
	};

	// 函数：当前时间，年/月/日 时：分：秒
	function curTime() {
		var openTime = new Date();
		var openTimeSpe = openTime.getFullYear() + '/' + Number(Number(openTime.getMonth()) + 1) + '/' + openTime.getDate() +
			'，' + openTime.getHours() + ':' + openTime.getMinutes() + ':' + openTime.getSeconds();
		return openTimeSpe;
	}

	$.extend({
		newSocket: function(opts) {
			new NewSocket(opts);
		}
	});
})(jQuery);
