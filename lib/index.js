"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toCommandProperties = exports2.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports2.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports2.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issue = exports2.issueCommand = void 0;
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issueCommand = void 0;
    var fs = __importStar(require("fs"));
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports2.issueCommand = issueCommand;
  }
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/lib/proxy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkBypass = exports2.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports2.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports2.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports2.debug = debug;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports2, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/@actions/http-client/lib/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HttpClient = exports2.isHttps = exports2.HttpClientResponse = exports2.HttpClientError = exports2.getProxyUrl = exports2.MediaTypes = exports2.Headers = exports2.HttpCodes = void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports2.Headers || (exports2.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports2.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports2.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let output = Buffer.alloc(0);
            this.message.on("data", (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on("end", () => {
              resolve(output.toString());
            });
          }));
        });
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports2.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info, data);
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve(res);
              }
            }
            this.requestRawWithCallback(info, data, callbackForResult);
          });
        });
      }
      requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
          if (!info.options.headers) {
            info.options.headers = {};
          }
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info.httpModule.request(info.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function(err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info.options);
          }
        }
        return info;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), { host: proxyUrl.hostname, port: proxyUrl.port })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const statusCode = res.message.statusCode || 0;
            const response = {
              statusCode,
              result: null,
              headers: {}
            };
            if (statusCode === HttpCodes.NotFound) {
              resolve(response);
            }
            function dateTimeDeserializer(key, value) {
              if (typeof value === "string") {
                const a = new Date(value);
                if (!isNaN(a.valueOf())) {
                  return a;
                }
              }
              return value;
            }
            let obj;
            let contents;
            try {
              contents = yield res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
            }
            if (statusCode > 299) {
              let msg;
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                msg = contents;
              } else {
                msg = `Failed request: (${statusCode})`;
              }
              const err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          }));
        });
      }
    };
    exports2.HttpClient = HttpClient;
    var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
  }
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/lib/auth.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PersonalAccessTokenCredentialHandler = exports2.BearerCredentialHandler = exports2.BasicCredentialHandler = void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports2.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.summary = exports2.markdownSummary = exports2.SUMMARY_DOCS_URL = exports2.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports2.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports2.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports2.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports2.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      stringify() {
        return this._buffer;
      }
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      addRaw(text2, addEOL = false) {
        this._buffer += text2;
        return addEOL ? this.addEOL() : this;
      }
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      addHeading(text2, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text2);
        return this.addRaw(element).addEOL();
      }
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      addQuote(text2, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text2, attrs);
        return this.addRaw(element).addEOL();
      }
      addLink(text2, href) {
        const element = this.wrap("a", text2, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports2.markdownSummary = _summary;
    exports2.summary = _summary;
  }
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/@actions/core/lib/path-utils.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toPlatformPath = exports2.toWin32Path = exports2.toPosixPath = void 0;
    var path = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports2.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports2.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path.sep);
    }
    exports2.toPlatformPath = toPlatformPath;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getIDToken = exports2.getState = exports2.saveState = exports2.group = exports2.endGroup = exports2.startGroup = exports2.info = exports2.notice = exports2.warning = exports2.error = exports2.debug = exports2.isDebug = exports2.setFailed = exports2.setCommandEcho = exports2.setOutput = exports2.getBooleanInput = exports2.getMultilineInput = exports2.getInput = exports2.addPath = exports2.setSecret = exports2.exportVariable = exports2.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require("os"));
    var path = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name }, convertedVal);
      }
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports2.addPath = addPath;
    function getInput2(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports2.getInput = getInput2;
    function getMultilineInput(name, options) {
      const inputs = getInput2(name, options).split("\n").filter((x) => x !== "");
      return inputs;
    }
    exports2.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput2(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports2.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name }, value);
    }
    exports2.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports2.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports2.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports2.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports2.debug = debug;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports2.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports2.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports2.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports2.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports2.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports2, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports2, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports2, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports2, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports2, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  }
});

// node_modules/@sindresorhus/is/dist/index.js
var require_dist = __commonJS({
  "node_modules/@sindresorhus/is/dist/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var typedArrayTypeNames = [
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "BigInt64Array",
      "BigUint64Array"
    ];
    function isTypedArrayName(name) {
      return typedArrayTypeNames.includes(name);
    }
    var objectTypeNames = [
      "Function",
      "Generator",
      "AsyncGenerator",
      "GeneratorFunction",
      "AsyncGeneratorFunction",
      "AsyncFunction",
      "Observable",
      "Array",
      "Buffer",
      "Blob",
      "Object",
      "RegExp",
      "Date",
      "Error",
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Promise",
      "URL",
      "FormData",
      "URLSearchParams",
      "HTMLElement",
      ...typedArrayTypeNames
    ];
    function isObjectTypeName(name) {
      return objectTypeNames.includes(name);
    }
    var primitiveTypeNames = [
      "null",
      "undefined",
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol"
    ];
    function isPrimitiveTypeName(name) {
      return primitiveTypeNames.includes(name);
    }
    function isOfType(type) {
      return (value) => typeof value === type;
    }
    var { toString } = Object.prototype;
    var getObjectType = (value) => {
      const objectTypeName = toString.call(value).slice(8, -1);
      if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
        return "HTMLElement";
      }
      if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
      }
      return void 0;
    };
    var isObjectOfType = (type) => (value) => getObjectType(value) === type;
    function is(value) {
      if (value === null) {
        return "null";
      }
      switch (typeof value) {
        case "undefined":
          return "undefined";
        case "string":
          return "string";
        case "number":
          return "number";
        case "boolean":
          return "boolean";
        case "function":
          return "Function";
        case "bigint":
          return "bigint";
        case "symbol":
          return "symbol";
        default:
      }
      if (is.observable(value)) {
        return "Observable";
      }
      if (is.array(value)) {
        return "Array";
      }
      if (is.buffer(value)) {
        return "Buffer";
      }
      const tagType = getObjectType(value);
      if (tagType) {
        return tagType;
      }
      if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError("Please don't use object wrappers for primitive types");
      }
      return "Object";
    }
    is.undefined = isOfType("undefined");
    is.string = isOfType("string");
    var isNumberType = isOfType("number");
    is.number = (value) => isNumberType(value) && !is.nan(value);
    is.bigint = isOfType("bigint");
    is.function_ = isOfType("function");
    is.null_ = (value) => value === null;
    is.class_ = (value) => is.function_(value) && value.toString().startsWith("class ");
    is.boolean = (value) => value === true || value === false;
    is.symbol = isOfType("symbol");
    is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
    is.array = (value, assertion) => {
      if (!Array.isArray(value)) {
        return false;
      }
      if (!is.function_(assertion)) {
        return true;
      }
      return value.every(assertion);
    };
    is.buffer = (value) => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d !== void 0 ? _d : false;
    };
    is.blob = (value) => isObjectOfType("Blob")(value);
    is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
    is.object = (value) => !is.null_(value) && (typeof value === "object" || is.function_(value));
    is.iterable = (value) => {
      var _a;
      return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]);
    };
    is.asyncIterable = (value) => {
      var _a;
      return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.asyncIterator]);
    };
    is.generator = (value) => {
      var _a, _b;
      return is.iterable(value) && is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.next) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.throw);
    };
    is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
    is.nativePromise = (value) => isObjectOfType("Promise")(value);
    var hasPromiseAPI = (value) => {
      var _a, _b;
      return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.then) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
    };
    is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
    is.generatorFunction = isObjectOfType("GeneratorFunction");
    is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction";
    is.asyncFunction = (value) => getObjectType(value) === "AsyncFunction";
    is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty("prototype");
    is.regExp = isObjectOfType("RegExp");
    is.date = isObjectOfType("Date");
    is.error = isObjectOfType("Error");
    is.map = (value) => isObjectOfType("Map")(value);
    is.set = (value) => isObjectOfType("Set")(value);
    is.weakMap = (value) => isObjectOfType("WeakMap")(value);
    is.weakSet = (value) => isObjectOfType("WeakSet")(value);
    is.int8Array = isObjectOfType("Int8Array");
    is.uint8Array = isObjectOfType("Uint8Array");
    is.uint8ClampedArray = isObjectOfType("Uint8ClampedArray");
    is.int16Array = isObjectOfType("Int16Array");
    is.uint16Array = isObjectOfType("Uint16Array");
    is.int32Array = isObjectOfType("Int32Array");
    is.uint32Array = isObjectOfType("Uint32Array");
    is.float32Array = isObjectOfType("Float32Array");
    is.float64Array = isObjectOfType("Float64Array");
    is.bigInt64Array = isObjectOfType("BigInt64Array");
    is.bigUint64Array = isObjectOfType("BigUint64Array");
    is.arrayBuffer = isObjectOfType("ArrayBuffer");
    is.sharedArrayBuffer = isObjectOfType("SharedArrayBuffer");
    is.dataView = isObjectOfType("DataView");
    is.enumCase = (value, targetEnum) => Object.values(targetEnum).includes(value);
    is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
    is.urlInstance = (value) => isObjectOfType("URL")(value);
    is.urlString = (value) => {
      if (!is.string(value)) {
        return false;
      }
      try {
        new URL(value);
        return true;
      } catch (_a) {
        return false;
      }
    };
    is.truthy = (value) => Boolean(value);
    is.falsy = (value) => !value;
    is.nan = (value) => Number.isNaN(value);
    is.primitive = (value) => is.null_(value) || isPrimitiveTypeName(typeof value);
    is.integer = (value) => Number.isInteger(value);
    is.safeInteger = (value) => Number.isSafeInteger(value);
    is.plainObject = (value) => {
      if (toString.call(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.getPrototypeOf({});
    };
    is.typedArray = (value) => isTypedArrayName(getObjectType(value));
    var isValidLength = (value) => is.safeInteger(value) && value >= 0;
    is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
    is.inRange = (value, range) => {
      if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
      }
      if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
      }
      throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
    };
    var NODE_TYPE_ELEMENT = 1;
    var DOM_PROPERTIES_TO_CHECK = [
      "innerHTML",
      "ownerDocument",
      "style",
      "attributes",
      "nodeValue"
    ];
    is.domElement = (value) => {
      return is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) && !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
    };
    is.observable = (value) => {
      var _a, _b, _c, _d;
      if (!value) {
        return false;
      }
      if (value === ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        return true;
      }
      if (value === ((_d = (_c = value)["@@observable"]) === null || _d === void 0 ? void 0 : _d.call(_c))) {
        return true;
      }
      return false;
    };
    is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
    is.infinite = (value) => value === Infinity || value === -Infinity;
    var isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
    is.evenInteger = isAbsoluteMod2(0);
    is.oddInteger = isAbsoluteMod2(1);
    is.emptyArray = (value) => is.array(value) && value.length === 0;
    is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
    is.emptyString = (value) => is.string(value) && value.length === 0;
    var isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
    is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
    is.nonEmptyString = (value) => is.string(value) && value.length > 0;
    is.nonEmptyStringAndNotWhitespace = (value) => is.string(value) && !is.emptyStringOrWhitespace(value);
    is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
    is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
    is.emptySet = (value) => is.set(value) && value.size === 0;
    is.nonEmptySet = (value) => is.set(value) && value.size > 0;
    is.emptyMap = (value) => is.map(value) && value.size === 0;
    is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
    is.propertyKey = (value) => is.any([is.string, is.number, is.symbol], value);
    is.formData = (value) => isObjectOfType("FormData")(value);
    is.urlSearchParams = (value) => isObjectOfType("URLSearchParams")(value);
    var predicateOnArray = (method, predicate, values) => {
      if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
      }
      if (values.length === 0) {
        throw new TypeError("Invalid number of values");
      }
      return method.call(values, predicate);
    };
    is.any = (predicate, ...values) => {
      const predicates = is.array(predicate) ? predicate : [predicate];
      return predicates.some((singlePredicate) => predicateOnArray(Array.prototype.some, singlePredicate, values));
    };
    is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
    var assertType = (condition, description, value, options = {}) => {
      if (!condition) {
        const { multipleValues } = options;
        const valuesMessage = multipleValues ? `received values of types ${[
          ...new Set(value.map((singleValue) => `\`${is(singleValue)}\``))
        ].join(", ")}` : `received value of type \`${is(value)}\``;
        throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
      }
    };
    exports2.assert = {
      undefined: (value) => assertType(is.undefined(value), "undefined", value),
      string: (value) => assertType(is.string(value), "string", value),
      number: (value) => assertType(is.number(value), "number", value),
      bigint: (value) => assertType(is.bigint(value), "bigint", value),
      function_: (value) => assertType(is.function_(value), "Function", value),
      null_: (value) => assertType(is.null_(value), "null", value),
      class_: (value) => assertType(is.class_(value), "Class", value),
      boolean: (value) => assertType(is.boolean(value), "boolean", value),
      symbol: (value) => assertType(is.symbol(value), "symbol", value),
      numericString: (value) => assertType(is.numericString(value), "string with a number", value),
      array: (value, assertion) => {
        const assert = assertType;
        assert(is.array(value), "Array", value);
        if (assertion) {
          value.forEach(assertion);
        }
      },
      buffer: (value) => assertType(is.buffer(value), "Buffer", value),
      blob: (value) => assertType(is.blob(value), "Blob", value),
      nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined", value),
      object: (value) => assertType(is.object(value), "Object", value),
      iterable: (value) => assertType(is.iterable(value), "Iterable", value),
      asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable", value),
      generator: (value) => assertType(is.generator(value), "Generator", value),
      asyncGenerator: (value) => assertType(is.asyncGenerator(value), "AsyncGenerator", value),
      nativePromise: (value) => assertType(is.nativePromise(value), "native Promise", value),
      promise: (value) => assertType(is.promise(value), "Promise", value),
      generatorFunction: (value) => assertType(is.generatorFunction(value), "GeneratorFunction", value),
      asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), "AsyncGeneratorFunction", value),
      asyncFunction: (value) => assertType(is.asyncFunction(value), "AsyncFunction", value),
      boundFunction: (value) => assertType(is.boundFunction(value), "Function", value),
      regExp: (value) => assertType(is.regExp(value), "RegExp", value),
      date: (value) => assertType(is.date(value), "Date", value),
      error: (value) => assertType(is.error(value), "Error", value),
      map: (value) => assertType(is.map(value), "Map", value),
      set: (value) => assertType(is.set(value), "Set", value),
      weakMap: (value) => assertType(is.weakMap(value), "WeakMap", value),
      weakSet: (value) => assertType(is.weakSet(value), "WeakSet", value),
      int8Array: (value) => assertType(is.int8Array(value), "Int8Array", value),
      uint8Array: (value) => assertType(is.uint8Array(value), "Uint8Array", value),
      uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), "Uint8ClampedArray", value),
      int16Array: (value) => assertType(is.int16Array(value), "Int16Array", value),
      uint16Array: (value) => assertType(is.uint16Array(value), "Uint16Array", value),
      int32Array: (value) => assertType(is.int32Array(value), "Int32Array", value),
      uint32Array: (value) => assertType(is.uint32Array(value), "Uint32Array", value),
      float32Array: (value) => assertType(is.float32Array(value), "Float32Array", value),
      float64Array: (value) => assertType(is.float64Array(value), "Float64Array", value),
      bigInt64Array: (value) => assertType(is.bigInt64Array(value), "BigInt64Array", value),
      bigUint64Array: (value) => assertType(is.bigUint64Array(value), "BigUint64Array", value),
      arrayBuffer: (value) => assertType(is.arrayBuffer(value), "ArrayBuffer", value),
      sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), "SharedArrayBuffer", value),
      dataView: (value) => assertType(is.dataView(value), "DataView", value),
      enumCase: (value, targetEnum) => assertType(is.enumCase(value, targetEnum), "EnumCase", value),
      urlInstance: (value) => assertType(is.urlInstance(value), "URL", value),
      urlString: (value) => assertType(is.urlString(value), "string with a URL", value),
      truthy: (value) => assertType(is.truthy(value), "truthy", value),
      falsy: (value) => assertType(is.falsy(value), "falsy", value),
      nan: (value) => assertType(is.nan(value), "NaN", value),
      primitive: (value) => assertType(is.primitive(value), "primitive", value),
      integer: (value) => assertType(is.integer(value), "integer", value),
      safeInteger: (value) => assertType(is.safeInteger(value), "integer", value),
      plainObject: (value) => assertType(is.plainObject(value), "plain object", value),
      typedArray: (value) => assertType(is.typedArray(value), "TypedArray", value),
      arrayLike: (value) => assertType(is.arrayLike(value), "array-like", value),
      domElement: (value) => assertType(is.domElement(value), "HTMLElement", value),
      observable: (value) => assertType(is.observable(value), "Observable", value),
      nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream", value),
      infinite: (value) => assertType(is.infinite(value), "infinite number", value),
      emptyArray: (value) => assertType(is.emptyArray(value), "empty array", value),
      nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array", value),
      emptyString: (value) => assertType(is.emptyString(value), "empty string", value),
      emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace", value),
      nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string", value),
      nonEmptyStringAndNotWhitespace: (value) => assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace", value),
      emptyObject: (value) => assertType(is.emptyObject(value), "empty object", value),
      nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object", value),
      emptySet: (value) => assertType(is.emptySet(value), "empty set", value),
      nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set", value),
      emptyMap: (value) => assertType(is.emptyMap(value), "empty map", value),
      nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map", value),
      propertyKey: (value) => assertType(is.propertyKey(value), "PropertyKey", value),
      formData: (value) => assertType(is.formData(value), "FormData", value),
      urlSearchParams: (value) => assertType(is.urlSearchParams(value), "URLSearchParams", value),
      evenInteger: (value) => assertType(is.evenInteger(value), "even integer", value),
      oddInteger: (value) => assertType(is.oddInteger(value), "odd integer", value),
      directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T", instance),
      inRange: (value, range) => assertType(is.inRange(value, range), "in range", value),
      any: (predicate, ...values) => {
        return assertType(is.any(predicate, ...values), "predicate returns truthy for any value", values, { multipleValues: true });
      },
      all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values", values, { multipleValues: true })
    };
    Object.defineProperties(is, {
      class: {
        value: is.class_
      },
      function: {
        value: is.function_
      },
      null: {
        value: is.null_
      }
    });
    Object.defineProperties(exports2.assert, {
      class: {
        value: exports2.assert.class_
      },
      function: {
        value: exports2.assert.function_
      },
      null: {
        value: exports2.assert.null_
      }
    });
    exports2.default = is;
    module2.exports = is;
    module2.exports.default = is;
    module2.exports.assert = exports2.assert;
  }
});

// node_modules/p-cancelable/index.js
var require_p_cancelable = __commonJS({
  "node_modules/p-cancelable/index.js"(exports2, module2) {
    "use strict";
    var CancelError = class extends Error {
      constructor(reason) {
        super(reason || "Promise was canceled");
        this.name = "CancelError";
      }
      get isCanceled() {
        return true;
      }
    };
    var PCancelable = class {
      static fn(userFn) {
        return (...arguments_) => {
          return new PCancelable((resolve, reject, onCancel) => {
            arguments_.push(onCancel);
            userFn(...arguments_).then(resolve, reject);
          });
        };
      }
      constructor(executor) {
        this._cancelHandlers = [];
        this._isPending = true;
        this._isCanceled = false;
        this._rejectOnCancel = true;
        this._promise = new Promise((resolve, reject) => {
          this._reject = reject;
          const onResolve = (value) => {
            if (!this._isCanceled || !onCancel.shouldReject) {
              this._isPending = false;
              resolve(value);
            }
          };
          const onReject = (error) => {
            this._isPending = false;
            reject(error);
          };
          const onCancel = (handler) => {
            if (!this._isPending) {
              throw new Error("The `onCancel` handler was attached after the promise settled.");
            }
            this._cancelHandlers.push(handler);
          };
          Object.defineProperties(onCancel, {
            shouldReject: {
              get: () => this._rejectOnCancel,
              set: (boolean) => {
                this._rejectOnCancel = boolean;
              }
            }
          });
          return executor(onResolve, onReject, onCancel);
        });
      }
      then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this._promise.catch(onRejected);
      }
      finally(onFinally) {
        return this._promise.finally(onFinally);
      }
      cancel(reason) {
        if (!this._isPending || this._isCanceled) {
          return;
        }
        this._isCanceled = true;
        if (this._cancelHandlers.length > 0) {
          try {
            for (const handler of this._cancelHandlers) {
              handler();
            }
          } catch (error) {
            this._reject(error);
            return;
          }
        }
        if (this._rejectOnCancel) {
          this._reject(new CancelError(reason));
        }
      }
      get isCanceled() {
        return this._isCanceled;
      }
    };
    Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);
    module2.exports = PCancelable;
    module2.exports.CancelError = CancelError;
  }
});

// node_modules/defer-to-connect/dist/source/index.js
var require_source = __commonJS({
  "node_modules/defer-to-connect/dist/source/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function isTLSSocket(socket) {
      return socket.encrypted;
    }
    var deferToConnect = (socket, fn) => {
      let listeners;
      if (typeof fn === "function") {
        const connect = fn;
        listeners = { connect };
      } else {
        listeners = fn;
      }
      const hasConnectListener = typeof listeners.connect === "function";
      const hasSecureConnectListener = typeof listeners.secureConnect === "function";
      const hasCloseListener = typeof listeners.close === "function";
      const onConnect = () => {
        if (hasConnectListener) {
          listeners.connect();
        }
        if (isTLSSocket(socket) && hasSecureConnectListener) {
          if (socket.authorized) {
            listeners.secureConnect();
          } else if (!socket.authorizationError) {
            socket.once("secureConnect", listeners.secureConnect);
          }
        }
        if (hasCloseListener) {
          socket.once("close", listeners.close);
        }
      };
      if (socket.writable && !socket.connecting) {
        onConnect();
      } else if (socket.connecting) {
        socket.once("connect", onConnect);
      } else if (socket.destroyed && hasCloseListener) {
        listeners.close(socket._hadError);
      }
    };
    exports2.default = deferToConnect;
    module2.exports = deferToConnect;
    module2.exports.default = deferToConnect;
  }
});

// node_modules/@szmarczak/http-timer/dist/source/index.js
var require_source2 = __commonJS({
  "node_modules/@szmarczak/http-timer/dist/source/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var defer_to_connect_1 = require_source();
    var util_1 = require("util");
    var nodejsMajorVersion = Number(process.versions.node.split(".")[0]);
    var timer = (request) => {
      if (request.timings) {
        return request.timings;
      }
      const timings = {
        start: Date.now(),
        socket: void 0,
        lookup: void 0,
        connect: void 0,
        secureConnect: void 0,
        upload: void 0,
        response: void 0,
        end: void 0,
        error: void 0,
        abort: void 0,
        phases: {
          wait: void 0,
          dns: void 0,
          tcp: void 0,
          tls: void 0,
          request: void 0,
          firstByte: void 0,
          download: void 0,
          total: void 0
        }
      };
      request.timings = timings;
      const handleError = (origin) => {
        const emit = origin.emit.bind(origin);
        origin.emit = (event, ...args) => {
          if (event === "error") {
            timings.error = Date.now();
            timings.phases.total = timings.error - timings.start;
            origin.emit = emit;
          }
          return emit(event, ...args);
        };
      };
      handleError(request);
      const onAbort = () => {
        timings.abort = Date.now();
        if (!timings.response || nodejsMajorVersion >= 13) {
          timings.phases.total = Date.now() - timings.start;
        }
      };
      request.prependOnceListener("abort", onAbort);
      const onSocket = (socket) => {
        timings.socket = Date.now();
        timings.phases.wait = timings.socket - timings.start;
        if (util_1.types.isProxy(socket)) {
          return;
        }
        const lookupListener = () => {
          timings.lookup = Date.now();
          timings.phases.dns = timings.lookup - timings.socket;
        };
        socket.prependOnceListener("lookup", lookupListener);
        defer_to_connect_1.default(socket, {
          connect: () => {
            timings.connect = Date.now();
            if (timings.lookup === void 0) {
              socket.removeListener("lookup", lookupListener);
              timings.lookup = timings.connect;
              timings.phases.dns = timings.lookup - timings.socket;
            }
            timings.phases.tcp = timings.connect - timings.lookup;
          },
          secureConnect: () => {
            timings.secureConnect = Date.now();
            timings.phases.tls = timings.secureConnect - timings.connect;
          }
        });
      };
      if (request.socket) {
        onSocket(request.socket);
      } else {
        request.prependOnceListener("socket", onSocket);
      }
      const onUpload = () => {
        var _a;
        timings.upload = Date.now();
        timings.phases.request = timings.upload - ((_a = timings.secureConnect) !== null && _a !== void 0 ? _a : timings.connect);
      };
      const writableFinished = () => {
        if (typeof request.writableFinished === "boolean") {
          return request.writableFinished;
        }
        return request.finished && request.outputSize === 0 && (!request.socket || request.socket.writableLength === 0);
      };
      if (writableFinished()) {
        onUpload();
      } else {
        request.prependOnceListener("finish", onUpload);
      }
      request.prependOnceListener("response", (response) => {
        timings.response = Date.now();
        timings.phases.firstByte = timings.response - timings.upload;
        response.timings = timings;
        handleError(response);
        response.prependOnceListener("end", () => {
          timings.end = Date.now();
          timings.phases.download = timings.end - timings.response;
          timings.phases.total = timings.end - timings.start;
        });
        response.prependOnceListener("aborted", onAbort);
      });
      return timings;
    };
    exports2.default = timer;
    module2.exports = timer;
    module2.exports.default = timer;
  }
});

// node_modules/cacheable-lookup/source/index.js
var require_source3 = __commonJS({
  "node_modules/cacheable-lookup/source/index.js"(exports2, module2) {
    "use strict";
    var {
      V4MAPPED,
      ADDRCONFIG,
      ALL,
      promises: {
        Resolver: AsyncResolver
      },
      lookup: dnsLookup
    } = require("dns");
    var { promisify } = require("util");
    var os = require("os");
    var kCacheableLookupCreateConnection = Symbol("cacheableLookupCreateConnection");
    var kCacheableLookupInstance = Symbol("cacheableLookupInstance");
    var kExpires = Symbol("expires");
    var supportsALL = typeof ALL === "number";
    var verifyAgent = (agent) => {
      if (!(agent && typeof agent.createConnection === "function")) {
        throw new Error("Expected an Agent instance as the first argument");
      }
    };
    var map4to6 = (entries) => {
      for (const entry of entries) {
        if (entry.family === 6) {
          continue;
        }
        entry.address = `::ffff:${entry.address}`;
        entry.family = 6;
      }
    };
    var getIfaceInfo = () => {
      let has4 = false;
      let has6 = false;
      for (const device of Object.values(os.networkInterfaces())) {
        for (const iface of device) {
          if (iface.internal) {
            continue;
          }
          if (iface.family === "IPv6") {
            has6 = true;
          } else {
            has4 = true;
          }
          if (has4 && has6) {
            return { has4, has6 };
          }
        }
      }
      return { has4, has6 };
    };
    var isIterable = (map) => {
      return Symbol.iterator in map;
    };
    var ttl = { ttl: true };
    var all = { all: true };
    var CacheableLookup = class {
      constructor({
        cache = /* @__PURE__ */ new Map(),
        maxTtl = Infinity,
        fallbackDuration = 3600,
        errorTtl = 0.15,
        resolver = new AsyncResolver(),
        lookup = dnsLookup
      } = {}) {
        this.maxTtl = maxTtl;
        this.errorTtl = errorTtl;
        this._cache = cache;
        this._resolver = resolver;
        this._dnsLookup = promisify(lookup);
        if (this._resolver instanceof AsyncResolver) {
          this._resolve4 = this._resolver.resolve4.bind(this._resolver);
          this._resolve6 = this._resolver.resolve6.bind(this._resolver);
        } else {
          this._resolve4 = promisify(this._resolver.resolve4.bind(this._resolver));
          this._resolve6 = promisify(this._resolver.resolve6.bind(this._resolver));
        }
        this._iface = getIfaceInfo();
        this._pending = {};
        this._nextRemovalTime = false;
        this._hostnamesToFallback = /* @__PURE__ */ new Set();
        if (fallbackDuration < 1) {
          this._fallback = false;
        } else {
          this._fallback = true;
          const interval = setInterval(() => {
            this._hostnamesToFallback.clear();
          }, fallbackDuration * 1e3);
          if (interval.unref) {
            interval.unref();
          }
        }
        this.lookup = this.lookup.bind(this);
        this.lookupAsync = this.lookupAsync.bind(this);
      }
      set servers(servers) {
        this.clear();
        this._resolver.setServers(servers);
      }
      get servers() {
        return this._resolver.getServers();
      }
      lookup(hostname, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (typeof options === "number") {
          options = {
            family: options
          };
        }
        if (!callback) {
          throw new Error("Callback must be a function.");
        }
        this.lookupAsync(hostname, options).then((result) => {
          if (options.all) {
            callback(null, result);
          } else {
            callback(null, result.address, result.family, result.expires, result.ttl);
          }
        }, callback);
      }
      async lookupAsync(hostname, options = {}) {
        if (typeof options === "number") {
          options = {
            family: options
          };
        }
        let cached = await this.query(hostname);
        if (options.family === 6) {
          const filtered = cached.filter((entry) => entry.family === 6);
          if (options.hints & V4MAPPED) {
            if (supportsALL && options.hints & ALL || filtered.length === 0) {
              map4to6(cached);
            } else {
              cached = filtered;
            }
          } else {
            cached = filtered;
          }
        } else if (options.family === 4) {
          cached = cached.filter((entry) => entry.family === 4);
        }
        if (options.hints & ADDRCONFIG) {
          const { _iface } = this;
          cached = cached.filter((entry) => entry.family === 6 ? _iface.has6 : _iface.has4);
        }
        if (cached.length === 0) {
          const error = new Error(`cacheableLookup ENOTFOUND ${hostname}`);
          error.code = "ENOTFOUND";
          error.hostname = hostname;
          throw error;
        }
        if (options.all) {
          return cached;
        }
        return cached[0];
      }
      async query(hostname) {
        let cached = await this._cache.get(hostname);
        if (!cached) {
          const pending = this._pending[hostname];
          if (pending) {
            cached = await pending;
          } else {
            const newPromise = this.queryAndCache(hostname);
            this._pending[hostname] = newPromise;
            try {
              cached = await newPromise;
            } finally {
              delete this._pending[hostname];
            }
          }
        }
        cached = cached.map((entry) => {
          return { ...entry };
        });
        return cached;
      }
      async _resolve(hostname) {
        const wrap = async (promise) => {
          try {
            return await promise;
          } catch (error) {
            if (error.code === "ENODATA" || error.code === "ENOTFOUND") {
              return [];
            }
            throw error;
          }
        };
        const [A, AAAA] = await Promise.all([
          this._resolve4(hostname, ttl),
          this._resolve6(hostname, ttl)
        ].map((promise) => wrap(promise)));
        let aTtl = 0;
        let aaaaTtl = 0;
        let cacheTtl = 0;
        const now = Date.now();
        for (const entry of A) {
          entry.family = 4;
          entry.expires = now + entry.ttl * 1e3;
          aTtl = Math.max(aTtl, entry.ttl);
        }
        for (const entry of AAAA) {
          entry.family = 6;
          entry.expires = now + entry.ttl * 1e3;
          aaaaTtl = Math.max(aaaaTtl, entry.ttl);
        }
        if (A.length > 0) {
          if (AAAA.length > 0) {
            cacheTtl = Math.min(aTtl, aaaaTtl);
          } else {
            cacheTtl = aTtl;
          }
        } else {
          cacheTtl = aaaaTtl;
        }
        return {
          entries: [
            ...A,
            ...AAAA
          ],
          cacheTtl
        };
      }
      async _lookup(hostname) {
        try {
          const entries = await this._dnsLookup(hostname, {
            all: true
          });
          return {
            entries,
            cacheTtl: 0
          };
        } catch (_) {
          return {
            entries: [],
            cacheTtl: 0
          };
        }
      }
      async _set(hostname, data, cacheTtl) {
        if (this.maxTtl > 0 && cacheTtl > 0) {
          cacheTtl = Math.min(cacheTtl, this.maxTtl) * 1e3;
          data[kExpires] = Date.now() + cacheTtl;
          try {
            await this._cache.set(hostname, data, cacheTtl);
          } catch (error) {
            this.lookupAsync = async () => {
              const cacheError = new Error("Cache Error. Please recreate the CacheableLookup instance.");
              cacheError.cause = error;
              throw cacheError;
            };
          }
          if (isIterable(this._cache)) {
            this._tick(cacheTtl);
          }
        }
      }
      async queryAndCache(hostname) {
        if (this._hostnamesToFallback.has(hostname)) {
          return this._dnsLookup(hostname, all);
        }
        let query = await this._resolve(hostname);
        if (query.entries.length === 0 && this._fallback) {
          query = await this._lookup(hostname);
          if (query.entries.length !== 0) {
            this._hostnamesToFallback.add(hostname);
          }
        }
        const cacheTtl = query.entries.length === 0 ? this.errorTtl : query.cacheTtl;
        await this._set(hostname, query.entries, cacheTtl);
        return query.entries;
      }
      _tick(ms) {
        const nextRemovalTime = this._nextRemovalTime;
        if (!nextRemovalTime || ms < nextRemovalTime) {
          clearTimeout(this._removalTimeout);
          this._nextRemovalTime = ms;
          this._removalTimeout = setTimeout(() => {
            this._nextRemovalTime = false;
            let nextExpiry = Infinity;
            const now = Date.now();
            for (const [hostname, entries] of this._cache) {
              const expires = entries[kExpires];
              if (now >= expires) {
                this._cache.delete(hostname);
              } else if (expires < nextExpiry) {
                nextExpiry = expires;
              }
            }
            if (nextExpiry !== Infinity) {
              this._tick(nextExpiry - now);
            }
          }, ms);
          if (this._removalTimeout.unref) {
            this._removalTimeout.unref();
          }
        }
      }
      install(agent) {
        verifyAgent(agent);
        if (kCacheableLookupCreateConnection in agent) {
          throw new Error("CacheableLookup has been already installed");
        }
        agent[kCacheableLookupCreateConnection] = agent.createConnection;
        agent[kCacheableLookupInstance] = this;
        agent.createConnection = (options, callback) => {
          if (!("lookup" in options)) {
            options.lookup = this.lookup;
          }
          return agent[kCacheableLookupCreateConnection](options, callback);
        };
      }
      uninstall(agent) {
        verifyAgent(agent);
        if (agent[kCacheableLookupCreateConnection]) {
          if (agent[kCacheableLookupInstance] !== this) {
            throw new Error("The agent is not owned by this CacheableLookup instance");
          }
          agent.createConnection = agent[kCacheableLookupCreateConnection];
          delete agent[kCacheableLookupCreateConnection];
          delete agent[kCacheableLookupInstance];
        }
      }
      updateInterfaceInfo() {
        const { _iface } = this;
        this._iface = getIfaceInfo();
        if (_iface.has4 && !this._iface.has4 || _iface.has6 && !this._iface.has6) {
          this._cache.clear();
        }
      }
      clear(hostname) {
        if (hostname) {
          this._cache.delete(hostname);
          return;
        }
        this._cache.clear();
      }
    };
    module2.exports = CacheableLookup;
    module2.exports.default = CacheableLookup;
  }
});

// node_modules/normalize-url/index.js
var require_normalize_url = __commonJS({
  "node_modules/normalize-url/index.js"(exports2, module2) {
    "use strict";
    var DATA_URL_DEFAULT_MIME_TYPE = "text/plain";
    var DATA_URL_DEFAULT_CHARSET = "us-ascii";
    var testParameter = (name, filters) => {
      return filters.some((filter) => filter instanceof RegExp ? filter.test(name) : filter === name);
    };
    var normalizeDataURL = (urlString, { stripHash }) => {
      const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);
      if (!match) {
        throw new Error(`Invalid URL: ${urlString}`);
      }
      let { type, data, hash } = match.groups;
      const mediaType = type.split(";");
      hash = stripHash ? "" : hash;
      let isBase64 = false;
      if (mediaType[mediaType.length - 1] === "base64") {
        mediaType.pop();
        isBase64 = true;
      }
      const mimeType = (mediaType.shift() || "").toLowerCase();
      const attributes = mediaType.map((attribute) => {
        let [key, value = ""] = attribute.split("=").map((string) => string.trim());
        if (key === "charset") {
          value = value.toLowerCase();
          if (value === DATA_URL_DEFAULT_CHARSET) {
            return "";
          }
        }
        return `${key}${value ? `=${value}` : ""}`;
      }).filter(Boolean);
      const normalizedMediaType = [
        ...attributes
      ];
      if (isBase64) {
        normalizedMediaType.push("base64");
      }
      if (normalizedMediaType.length !== 0 || mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE) {
        normalizedMediaType.unshift(mimeType);
      }
      return `data:${normalizedMediaType.join(";")},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ""}`;
    };
    var normalizeUrl = (urlString, options) => {
      options = {
        defaultProtocol: "http:",
        normalizeProtocol: true,
        forceHttp: false,
        forceHttps: false,
        stripAuthentication: true,
        stripHash: false,
        stripTextFragment: true,
        stripWWW: true,
        removeQueryParameters: [/^utm_\w+/i],
        removeTrailingSlash: true,
        removeSingleSlash: true,
        removeDirectoryIndex: false,
        sortQueryParameters: true,
        ...options
      };
      urlString = urlString.trim();
      if (/^data:/i.test(urlString)) {
        return normalizeDataURL(urlString, options);
      }
      if (/^view-source:/i.test(urlString)) {
        throw new Error("`view-source:` is not supported as it is a non-standard protocol");
      }
      const hasRelativeProtocol = urlString.startsWith("//");
      const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);
      if (!isRelativeUrl) {
        urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
      }
      const urlObj = new URL(urlString);
      if (options.forceHttp && options.forceHttps) {
        throw new Error("The `forceHttp` and `forceHttps` options cannot be used together");
      }
      if (options.forceHttp && urlObj.protocol === "https:") {
        urlObj.protocol = "http:";
      }
      if (options.forceHttps && urlObj.protocol === "http:") {
        urlObj.protocol = "https:";
      }
      if (options.stripAuthentication) {
        urlObj.username = "";
        urlObj.password = "";
      }
      if (options.stripHash) {
        urlObj.hash = "";
      } else if (options.stripTextFragment) {
        urlObj.hash = urlObj.hash.replace(/#?:~:text.*?$/i, "");
      }
      if (urlObj.pathname) {
        urlObj.pathname = urlObj.pathname.replace(/(?<!\b(?:[a-z][a-z\d+\-.]{1,50}:))\/{2,}/g, "/");
      }
      if (urlObj.pathname) {
        try {
          urlObj.pathname = decodeURI(urlObj.pathname);
        } catch (_) {
        }
      }
      if (options.removeDirectoryIndex === true) {
        options.removeDirectoryIndex = [/^index\.[a-z]+$/];
      }
      if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
        let pathComponents = urlObj.pathname.split("/");
        const lastComponent = pathComponents[pathComponents.length - 1];
        if (testParameter(lastComponent, options.removeDirectoryIndex)) {
          pathComponents = pathComponents.slice(0, pathComponents.length - 1);
          urlObj.pathname = pathComponents.slice(1).join("/") + "/";
        }
      }
      if (urlObj.hostname) {
        urlObj.hostname = urlObj.hostname.replace(/\.$/, "");
        if (options.stripWWW && /^www\.(?!www\.)(?:[a-z\-\d]{1,63})\.(?:[a-z.\-\d]{2,63})$/.test(urlObj.hostname)) {
          urlObj.hostname = urlObj.hostname.replace(/^www\./, "");
        }
      }
      if (Array.isArray(options.removeQueryParameters)) {
        for (const key of [...urlObj.searchParams.keys()]) {
          if (testParameter(key, options.removeQueryParameters)) {
            urlObj.searchParams.delete(key);
          }
        }
      }
      if (options.removeQueryParameters === true) {
        urlObj.search = "";
      }
      if (options.sortQueryParameters) {
        urlObj.searchParams.sort();
      }
      if (options.removeTrailingSlash) {
        urlObj.pathname = urlObj.pathname.replace(/\/$/, "");
      }
      const oldUrlString = urlString;
      urlString = urlObj.toString();
      if (!options.removeSingleSlash && urlObj.pathname === "/" && !oldUrlString.endsWith("/") && urlObj.hash === "") {
        urlString = urlString.replace(/\/$/, "");
      }
      if ((options.removeTrailingSlash || urlObj.pathname === "/") && urlObj.hash === "" && options.removeSingleSlash) {
        urlString = urlString.replace(/\/$/, "");
      }
      if (hasRelativeProtocol && !options.normalizeProtocol) {
        urlString = urlString.replace(/^http:\/\//, "//");
      }
      if (options.stripProtocol) {
        urlString = urlString.replace(/^(?:https?:)?\/\//, "");
      }
      return urlString;
    };
    module2.exports = normalizeUrl;
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports2, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports2, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS({
  "node_modules/end-of-stream/index.js"(exports2, module2) {
    var once = require_once();
    var noop = function() {
    };
    var isRequest = function(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    };
    var isChildProcess = function(stream) {
      return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop);
      var ws = stream._writableState;
      var rs = stream._readableState;
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var cancelled = false;
      var onlegacyfinish = function() {
        if (!stream.writable)
          onfinish();
      };
      var onfinish = function() {
        writable = false;
        if (!readable)
          callback.call(stream);
      };
      var onend = function() {
        readable = false;
        if (!writable)
          callback.call(stream);
      };
      var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
      };
      var onerror = function(err) {
        callback.call(stream, err);
      };
      var onclose = function() {
        process.nextTick(onclosenexttick);
      };
      var onclosenexttick = function() {
        if (cancelled)
          return;
        if (readable && !(rs && (rs.ended && !rs.destroyed)))
          return callback.call(stream, new Error("premature close"));
        if (writable && !(ws && (ws.ended && !ws.destroyed)))
          return callback.call(stream, new Error("premature close"));
      };
      var onrequest = function() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (isChildProcess(stream))
        stream.on("exit", onexit);
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    };
    module2.exports = eos;
  }
});

// node_modules/pump/index.js
var require_pump = __commonJS({
  "node_modules/pump/index.js"(exports2, module2) {
    var once = require_once();
    var eos = require_end_of_stream();
    var fs = require("fs");
    var noop = function() {
    };
    var ancient = /^v?\.0/.test(process.version);
    var isFn = function(fn) {
      return typeof fn === "function";
    };
    var isFS = function(stream) {
      if (!ancient)
        return false;
      if (!fs)
        return false;
      return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
    };
    var isRequest = function(stream) {
      return stream.setHeader && isFn(stream.abort);
    };
    var destroyer = function(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      eos(stream, { readable: reading, writable: writing }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isFS(stream))
          return stream.close(noop);
        if (isRequest(stream))
          return stream.abort();
        if (isFn(stream.destroy))
          return stream.destroy();
        callback(err || new Error("stream was destroyed"));
      };
    };
    var call = function(fn) {
      fn();
    };
    var pipe = function(from, to) {
      return from.pipe(to);
    };
    var pump = function() {
      var streams = Array.prototype.slice.call(arguments);
      var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2)
        throw new Error("pump requires two streams per minimum");
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    };
    module2.exports = pump;
  }
});

// node_modules/cacheable-request/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "node_modules/cacheable-request/node_modules/get-stream/buffer-stream.js"(exports2, module2) {
    "use strict";
    var { PassThrough: PassThroughStream } = require("stream");
    module2.exports = (options) => {
      options = { ...options };
      const { array } = options;
      let { encoding } = options;
      const isBuffer = encoding === "buffer";
      let objectMode = false;
      if (array) {
        objectMode = !(encoding || isBuffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (isBuffer) {
        encoding = null;
      }
      const stream = new PassThroughStream({ objectMode });
      if (encoding) {
        stream.setEncoding(encoding);
      }
      let length = 0;
      const chunks = [];
      stream.on("data", (chunk) => {
        chunks.push(chunk);
        if (objectMode) {
          length = chunks.length;
        } else {
          length += chunk.length;
        }
      });
      stream.getBufferedValue = () => {
        if (array) {
          return chunks;
        }
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
      };
      stream.getBufferedLength = () => length;
      return stream;
    };
  }
});

// node_modules/cacheable-request/node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "node_modules/cacheable-request/node_modules/get-stream/index.js"(exports2, module2) {
    "use strict";
    var { constants: BufferConstants } = require("buffer");
    var pump = require_pump();
    var bufferStream = require_buffer_stream();
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    async function getStream(inputStream, options) {
      if (!inputStream) {
        return Promise.reject(new Error("Expected a stream"));
      }
      options = {
        maxBuffer: Infinity,
        ...options
      };
      const { maxBuffer } = options;
      let stream;
      await new Promise((resolve, reject) => {
        const rejectPromise = (error) => {
          if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
            error.bufferedData = stream.getBufferedValue();
          }
          reject(error);
        };
        stream = pump(inputStream, bufferStream(options), (error) => {
          if (error) {
            rejectPromise(error);
            return;
          }
          resolve();
        });
        stream.on("data", () => {
          if (stream.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      });
      return stream.getBufferedValue();
    }
    module2.exports = getStream;
    module2.exports.default = getStream;
    module2.exports.buffer = (stream, options) => getStream(stream, { ...options, encoding: "buffer" });
    module2.exports.array = (stream, options) => getStream(stream, { ...options, array: true });
    module2.exports.MaxBufferError = MaxBufferError;
  }
});

// node_modules/http-cache-semantics/index.js
var require_http_cache_semantics = __commonJS({
  "node_modules/http-cache-semantics/index.js"(exports2, module2) {
    "use strict";
    var statusCodeCacheableByDefault = /* @__PURE__ */ new Set([
      200,
      203,
      204,
      206,
      300,
      301,
      404,
      405,
      410,
      414,
      501
    ]);
    var understoodStatuses = /* @__PURE__ */ new Set([
      200,
      203,
      204,
      300,
      301,
      302,
      303,
      307,
      308,
      404,
      405,
      410,
      414,
      501
    ]);
    var errorStatusCodes = /* @__PURE__ */ new Set([
      500,
      502,
      503,
      504
    ]);
    var hopByHopHeaders = {
      date: true,
      connection: true,
      "keep-alive": true,
      "proxy-authenticate": true,
      "proxy-authorization": true,
      te: true,
      trailer: true,
      "transfer-encoding": true,
      upgrade: true
    };
    var excludedFromRevalidationUpdate = {
      "content-length": true,
      "content-encoding": true,
      "transfer-encoding": true,
      "content-range": true
    };
    function toNumberOrZero(s) {
      const n = parseInt(s, 10);
      return isFinite(n) ? n : 0;
    }
    function isErrorResponse(response) {
      if (!response) {
        return true;
      }
      return errorStatusCodes.has(response.status);
    }
    function parseCacheControl(header) {
      const cc = {};
      if (!header)
        return cc;
      const parts = header.trim().split(/\s*,\s*/);
      for (const part of parts) {
        const [k, v] = part.split(/\s*=\s*/, 2);
        cc[k] = v === void 0 ? true : v.replace(/^"|"$/g, "");
      }
      return cc;
    }
    function formatCacheControl(cc) {
      let parts = [];
      for (const k in cc) {
        const v = cc[k];
        parts.push(v === true ? k : k + "=" + v);
      }
      if (!parts.length) {
        return void 0;
      }
      return parts.join(", ");
    }
    module2.exports = class CachePolicy {
      constructor(req, res, {
        shared,
        cacheHeuristic,
        immutableMinTimeToLive,
        ignoreCargoCult,
        _fromObject
      } = {}) {
        if (_fromObject) {
          this._fromObject(_fromObject);
          return;
        }
        if (!res || !res.headers) {
          throw Error("Response headers missing");
        }
        this._assertRequestHasHeaders(req);
        this._responseTime = this.now();
        this._isShared = shared !== false;
        this._cacheHeuristic = void 0 !== cacheHeuristic ? cacheHeuristic : 0.1;
        this._immutableMinTtl = void 0 !== immutableMinTimeToLive ? immutableMinTimeToLive : 24 * 3600 * 1e3;
        this._status = "status" in res ? res.status : 200;
        this._resHeaders = res.headers;
        this._rescc = parseCacheControl(res.headers["cache-control"]);
        this._method = "method" in req ? req.method : "GET";
        this._url = req.url;
        this._host = req.headers.host;
        this._noAuthorization = !req.headers.authorization;
        this._reqHeaders = res.headers.vary ? req.headers : null;
        this._reqcc = parseCacheControl(req.headers["cache-control"]);
        if (ignoreCargoCult && "pre-check" in this._rescc && "post-check" in this._rescc) {
          delete this._rescc["pre-check"];
          delete this._rescc["post-check"];
          delete this._rescc["no-cache"];
          delete this._rescc["no-store"];
          delete this._rescc["must-revalidate"];
          this._resHeaders = Object.assign({}, this._resHeaders, {
            "cache-control": formatCacheControl(this._rescc)
          });
          delete this._resHeaders.expires;
          delete this._resHeaders.pragma;
        }
        if (res.headers["cache-control"] == null && /no-cache/.test(res.headers.pragma)) {
          this._rescc["no-cache"] = true;
        }
      }
      now() {
        return Date.now();
      }
      storable() {
        return !!(!this._reqcc["no-store"] && ("GET" === this._method || "HEAD" === this._method || "POST" === this._method && this._hasExplicitExpiration()) && understoodStatuses.has(this._status) && !this._rescc["no-store"] && (!this._isShared || !this._rescc.private) && (!this._isShared || this._noAuthorization || this._allowsStoringAuthenticated()) && (this._resHeaders.expires || this._rescc["max-age"] || this._isShared && this._rescc["s-maxage"] || this._rescc.public || statusCodeCacheableByDefault.has(this._status)));
      }
      _hasExplicitExpiration() {
        return this._isShared && this._rescc["s-maxage"] || this._rescc["max-age"] || this._resHeaders.expires;
      }
      _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
          throw Error("Request headers missing");
        }
      }
      satisfiesWithoutRevalidation(req) {
        this._assertRequestHasHeaders(req);
        const requestCC = parseCacheControl(req.headers["cache-control"]);
        if (requestCC["no-cache"] || /no-cache/.test(req.headers.pragma)) {
          return false;
        }
        if (requestCC["max-age"] && this.age() > requestCC["max-age"]) {
          return false;
        }
        if (requestCC["min-fresh"] && this.timeToLive() < 1e3 * requestCC["min-fresh"]) {
          return false;
        }
        if (this.stale()) {
          const allowsStale = requestCC["max-stale"] && !this._rescc["must-revalidate"] && (true === requestCC["max-stale"] || requestCC["max-stale"] > this.age() - this.maxAge());
          if (!allowsStale) {
            return false;
          }
        }
        return this._requestMatches(req, false);
      }
      _requestMatches(req, allowHeadMethod) {
        return (!this._url || this._url === req.url) && this._host === req.headers.host && (!req.method || this._method === req.method || allowHeadMethod && "HEAD" === req.method) && this._varyMatches(req);
      }
      _allowsStoringAuthenticated() {
        return this._rescc["must-revalidate"] || this._rescc.public || this._rescc["s-maxage"];
      }
      _varyMatches(req) {
        if (!this._resHeaders.vary) {
          return true;
        }
        if (this._resHeaders.vary === "*") {
          return false;
        }
        const fields = this._resHeaders.vary.trim().toLowerCase().split(/\s*,\s*/);
        for (const name of fields) {
          if (req.headers[name] !== this._reqHeaders[name])
            return false;
        }
        return true;
      }
      _copyWithoutHopByHopHeaders(inHeaders) {
        const headers = {};
        for (const name in inHeaders) {
          if (hopByHopHeaders[name])
            continue;
          headers[name] = inHeaders[name];
        }
        if (inHeaders.connection) {
          const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
          for (const name of tokens) {
            delete headers[name];
          }
        }
        if (headers.warning) {
          const warnings = headers.warning.split(/,/).filter((warning) => {
            return !/^\s*1[0-9][0-9]/.test(warning);
          });
          if (!warnings.length) {
            delete headers.warning;
          } else {
            headers.warning = warnings.join(",").trim();
          }
        }
        return headers;
      }
      responseHeaders() {
        const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        const age = this.age();
        if (age > 3600 * 24 && !this._hasExplicitExpiration() && this.maxAge() > 3600 * 24) {
          headers.warning = (headers.warning ? `${headers.warning}, ` : "") + '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        headers.date = new Date(this.now()).toUTCString();
        return headers;
      }
      date() {
        const serverDate = Date.parse(this._resHeaders.date);
        if (isFinite(serverDate)) {
          return serverDate;
        }
        return this._responseTime;
      }
      age() {
        let age = this._ageValue();
        const residentTime = (this.now() - this._responseTime) / 1e3;
        return age + residentTime;
      }
      _ageValue() {
        return toNumberOrZero(this._resHeaders.age);
      }
      maxAge() {
        if (!this.storable() || this._rescc["no-cache"]) {
          return 0;
        }
        if (this._isShared && (this._resHeaders["set-cookie"] && !this._rescc.public && !this._rescc.immutable)) {
          return 0;
        }
        if (this._resHeaders.vary === "*") {
          return 0;
        }
        if (this._isShared) {
          if (this._rescc["proxy-revalidate"]) {
            return 0;
          }
          if (this._rescc["s-maxage"]) {
            return toNumberOrZero(this._rescc["s-maxage"]);
          }
        }
        if (this._rescc["max-age"]) {
          return toNumberOrZero(this._rescc["max-age"]);
        }
        const defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;
        const serverDate = this.date();
        if (this._resHeaders.expires) {
          const expires = Date.parse(this._resHeaders.expires);
          if (Number.isNaN(expires) || expires < serverDate) {
            return 0;
          }
          return Math.max(defaultMinTtl, (expires - serverDate) / 1e3);
        }
        if (this._resHeaders["last-modified"]) {
          const lastModified = Date.parse(this._resHeaders["last-modified"]);
          if (isFinite(lastModified) && serverDate > lastModified) {
            return Math.max(
              defaultMinTtl,
              (serverDate - lastModified) / 1e3 * this._cacheHeuristic
            );
          }
        }
        return defaultMinTtl;
      }
      timeToLive() {
        const age = this.maxAge() - this.age();
        const staleIfErrorAge = age + toNumberOrZero(this._rescc["stale-if-error"]);
        const staleWhileRevalidateAge = age + toNumberOrZero(this._rescc["stale-while-revalidate"]);
        return Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1e3;
      }
      stale() {
        return this.maxAge() <= this.age();
      }
      _useStaleIfError() {
        return this.maxAge() + toNumberOrZero(this._rescc["stale-if-error"]) > this.age();
      }
      useStaleWhileRevalidate() {
        return this.maxAge() + toNumberOrZero(this._rescc["stale-while-revalidate"]) > this.age();
      }
      static fromObject(obj) {
        return new this(void 0, void 0, { _fromObject: obj });
      }
      _fromObject(obj) {
        if (this._responseTime)
          throw Error("Reinitialized");
        if (!obj || obj.v !== 1)
          throw Error("Invalid serialization");
        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl = obj.imm !== void 0 ? obj.imm : 24 * 3600 * 1e3;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
      }
      toObject() {
        return {
          v: 1,
          t: this._responseTime,
          sh: this._isShared,
          ch: this._cacheHeuristic,
          imm: this._immutableMinTtl,
          st: this._status,
          resh: this._resHeaders,
          rescc: this._rescc,
          m: this._method,
          u: this._url,
          h: this._host,
          a: this._noAuthorization,
          reqh: this._reqHeaders,
          reqcc: this._reqcc
        };
      }
      revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);
        delete headers["if-range"];
        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
          delete headers["if-none-match"];
          delete headers["if-modified-since"];
          return headers;
        }
        if (this._resHeaders.etag) {
          headers["if-none-match"] = headers["if-none-match"] ? `${headers["if-none-match"]}, ${this._resHeaders.etag}` : this._resHeaders.etag;
        }
        const forbidsWeakValidators = headers["accept-ranges"] || headers["if-match"] || headers["if-unmodified-since"] || this._method && this._method != "GET";
        if (forbidsWeakValidators) {
          delete headers["if-modified-since"];
          if (headers["if-none-match"]) {
            const etags = headers["if-none-match"].split(/,/).filter((etag) => {
              return !/^\s*W\//.test(etag);
            });
            if (!etags.length) {
              delete headers["if-none-match"];
            } else {
              headers["if-none-match"] = etags.join(",").trim();
            }
          }
        } else if (this._resHeaders["last-modified"] && !headers["if-modified-since"]) {
          headers["if-modified-since"] = this._resHeaders["last-modified"];
        }
        return headers;
      }
      revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if (this._useStaleIfError() && isErrorResponse(response)) {
          return {
            modified: false,
            matches: false,
            policy: this
          };
        }
        if (!response || !response.headers) {
          throw Error("Response headers missing");
        }
        let matches = false;
        if (response.status !== void 0 && response.status != 304) {
          matches = false;
        } else if (response.headers.etag && !/^\s*W\//.test(response.headers.etag)) {
          matches = this._resHeaders.etag && this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
          matches = this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag.replace(/^\s*W\//, "");
        } else if (this._resHeaders["last-modified"]) {
          matches = this._resHeaders["last-modified"] === response.headers["last-modified"];
        } else {
          if (!this._resHeaders.etag && !this._resHeaders["last-modified"] && !response.headers.etag && !response.headers["last-modified"]) {
            matches = true;
          }
        }
        if (!matches) {
          return {
            policy: new this.constructor(request, response),
            modified: response.status != 304,
            matches: false
          };
        }
        const headers = {};
        for (const k in this._resHeaders) {
          headers[k] = k in response.headers && !excludedFromRevalidationUpdate[k] ? response.headers[k] : this._resHeaders[k];
        }
        const newResponse = Object.assign({}, response, {
          status: this._status,
          method: this._method,
          headers
        });
        return {
          policy: new this.constructor(request, newResponse, {
            shared: this._isShared,
            cacheHeuristic: this._cacheHeuristic,
            immutableMinTimeToLive: this._immutableMinTtl
          }),
          modified: false,
          matches: true
        };
      }
    };
  }
});

// node_modules/lowercase-keys/index.js
var require_lowercase_keys = __commonJS({
  "node_modules/lowercase-keys/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (object) => {
      const result = {};
      for (const [key, value] of Object.entries(object)) {
        result[key.toLowerCase()] = value;
      }
      return result;
    };
  }
});

// node_modules/responselike/src/index.js
var require_src = __commonJS({
  "node_modules/responselike/src/index.js"(exports2, module2) {
    "use strict";
    var Readable = require("stream").Readable;
    var lowercaseKeys = require_lowercase_keys();
    var Response = class extends Readable {
      constructor(statusCode, headers, body, url) {
        if (typeof statusCode !== "number") {
          throw new TypeError("Argument `statusCode` should be a number");
        }
        if (typeof headers !== "object") {
          throw new TypeError("Argument `headers` should be an object");
        }
        if (!(body instanceof Buffer)) {
          throw new TypeError("Argument `body` should be a buffer");
        }
        if (typeof url !== "string") {
          throw new TypeError("Argument `url` should be a string");
        }
        super();
        this.statusCode = statusCode;
        this.headers = lowercaseKeys(headers);
        this.body = body;
        this.url = url;
      }
      _read() {
        this.push(this.body);
        this.push(null);
      }
    };
    module2.exports = Response;
  }
});

// node_modules/mimic-response/index.js
var require_mimic_response = __commonJS({
  "node_modules/mimic-response/index.js"(exports2, module2) {
    "use strict";
    var knownProps = [
      "destroy",
      "setTimeout",
      "socket",
      "headers",
      "trailers",
      "rawHeaders",
      "statusCode",
      "httpVersion",
      "httpVersionMinor",
      "httpVersionMajor",
      "rawTrailers",
      "statusMessage"
    ];
    module2.exports = (fromStream, toStream) => {
      const fromProps = new Set(Object.keys(fromStream).concat(knownProps));
      for (const prop of fromProps) {
        if (prop in toStream) {
          continue;
        }
        toStream[prop] = typeof fromStream[prop] === "function" ? fromStream[prop].bind(fromStream) : fromStream[prop];
      }
    };
  }
});

// node_modules/clone-response/src/index.js
var require_src2 = __commonJS({
  "node_modules/clone-response/src/index.js"(exports2, module2) {
    "use strict";
    var PassThrough = require("stream").PassThrough;
    var mimicResponse = require_mimic_response();
    var cloneResponse = (response) => {
      if (!(response && response.pipe)) {
        throw new TypeError("Parameter `response` must be a response stream.");
      }
      const clone = new PassThrough();
      mimicResponse(response, clone);
      return response.pipe(clone);
    };
    module2.exports = cloneResponse;
  }
});

// node_modules/json-buffer/index.js
var require_json_buffer = __commonJS({
  "node_modules/json-buffer/index.js"(exports2) {
    exports2.stringify = function stringify(o) {
      if ("undefined" == typeof o)
        return o;
      if (o && Buffer.isBuffer(o))
        return JSON.stringify(":base64:" + o.toString("base64"));
      if (o && o.toJSON)
        o = o.toJSON();
      if (o && "object" === typeof o) {
        var s = "";
        var array = Array.isArray(o);
        s = array ? "[" : "{";
        var first = true;
        for (var k in o) {
          var ignore = "function" == typeof o[k] || !array && "undefined" === typeof o[k];
          if (Object.hasOwnProperty.call(o, k) && !ignore) {
            if (!first)
              s += ",";
            first = false;
            if (array) {
              if (o[k] == void 0)
                s += "null";
              else
                s += stringify(o[k]);
            } else if (o[k] !== void 0) {
              s += stringify(k) + ":" + stringify(o[k]);
            }
          }
        }
        s += array ? "]" : "}";
        return s;
      } else if ("string" === typeof o) {
        return JSON.stringify(/^:/.test(o) ? ":" + o : o);
      } else if ("undefined" === typeof o) {
        return "null";
      } else
        return JSON.stringify(o);
    };
    exports2.parse = function(s) {
      return JSON.parse(s, function(key, value) {
        if ("string" === typeof value) {
          if (/^:base64:/.test(value))
            return Buffer.from(value.substring(8), "base64");
          else
            return /^:/.test(value) ? value.substring(1) : value;
        }
        return value;
      });
    };
  }
});

// node_modules/compress-brotli/src/merge-options.js
var require_merge_options = __commonJS({
  "node_modules/compress-brotli/src/merge-options.js"(exports2, module2) {
    "use strict";
    module2.exports = (defaultOptions = {}, options = {}) => {
      const params = {
        ...defaultOptions.params || {},
        ...options.params || {}
      };
      return {
        ...defaultOptions,
        ...options,
        ...Object.keys(params).length ? {
          params
        } : {}
      };
    };
  }
});

// node_modules/compress-brotli/src/index.js
var require_src3 = __commonJS({
  "node_modules/compress-brotli/src/index.js"(exports2, module2) {
    "use strict";
    var { promisify } = require("util");
    var JSONB = require_json_buffer();
    var zlib = require("zlib");
    var mergeOptions = require_merge_options();
    var compress = promisify(zlib.brotliCompress);
    var decompress = promisify(zlib.brotliDecompress);
    var identity = (val) => val;
    var createCompress = ({
      enable = true,
      serialize = JSONB.stringify,
      deserialize = JSONB.parse,
      compressOptions,
      decompressOptions
    } = {}) => {
      if (!enable) {
        return { serialize, deserialize, decompress: identity, compress: identity };
      }
      return {
        serialize,
        deserialize,
        compress: async (data, options = {}) => {
          if (data === void 0)
            return data;
          const serializedData = serialize(data);
          return compress(serializedData, mergeOptions(compressOptions, options));
        },
        decompress: async (data, options = {}) => {
          if (data === void 0)
            return data;
          return deserialize(
            await decompress(data, mergeOptions(decompressOptions, options))
          );
        }
      };
    };
    module2.exports = createCompress;
    module2.exports.stringify = JSONB.stringify;
    module2.exports.parse = JSONB.parse;
  }
});

// node_modules/keyv/src/index.js
var require_src4 = __commonJS({
  "node_modules/keyv/src/index.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var JSONB = require_json_buffer();
    var compressBrotli = require_src3();
    var loadStore = (options) => {
      const adapters = {
        redis: "@keyv/redis",
        rediss: "@keyv/redis",
        mongodb: "@keyv/mongo",
        mongo: "@keyv/mongo",
        sqlite: "@keyv/sqlite",
        postgresql: "@keyv/postgres",
        postgres: "@keyv/postgres",
        mysql: "@keyv/mysql",
        etcd: "@keyv/etcd",
        offline: "@keyv/offline",
        tiered: "@keyv/tiered"
      };
      if (options.adapter || options.uri) {
        const adapter = options.adapter || /^[^:+]*/.exec(options.uri)[0];
        return new (require(adapters[adapter]))(options);
      }
      return /* @__PURE__ */ new Map();
    };
    var iterableAdapters = [
      "sqlite",
      "postgres",
      "mysql",
      "mongo",
      "redis",
      "tiered"
    ];
    var Keyv = class extends EventEmitter {
      constructor(uri, { emitErrors = true, ...options } = {}) {
        super();
        this.opts = {
          namespace: "keyv",
          serialize: JSONB.stringify,
          deserialize: JSONB.parse,
          ...typeof uri === "string" ? { uri } : uri,
          ...options
        };
        if (!this.opts.store) {
          const adapterOptions = { ...this.opts };
          this.opts.store = loadStore(adapterOptions);
        }
        if (this.opts.compress) {
          const brotli = compressBrotli(this.opts.compress.opts);
          this.opts.serialize = async ({ value, expires }) => brotli.serialize({ value: await brotli.compress(value), expires });
          this.opts.deserialize = async (data) => {
            const { value, expires } = brotli.deserialize(data);
            return { value: await brotli.decompress(value), expires };
          };
        }
        if (typeof this.opts.store.on === "function" && emitErrors) {
          this.opts.store.on("error", (error) => this.emit("error", error));
        }
        this.opts.store.namespace = this.opts.namespace;
        const generateIterator = (iterator) => async function* () {
          for await (const [key, raw] of typeof iterator === "function" ? iterator(this.opts.store.namespace) : iterator) {
            const data = this.opts.deserialize(raw);
            if (this.opts.store.namespace && !key.includes(this.opts.store.namespace)) {
              continue;
            }
            if (typeof data.expires === "number" && Date.now() > data.expires) {
              this.delete(key);
              continue;
            }
            yield [this._getKeyUnprefix(key), data.value];
          }
        };
        if (typeof this.opts.store[Symbol.iterator] === "function" && this.opts.store instanceof Map) {
          this.iterator = generateIterator(this.opts.store);
        } else if (typeof this.opts.store.iterator === "function" && this.opts.store.opts && this._checkIterableAdaptar()) {
          this.iterator = generateIterator(this.opts.store.iterator.bind(this.opts.store));
        }
      }
      _checkIterableAdaptar() {
        return iterableAdapters.includes(this.opts.store.opts.dialect) || iterableAdapters.findIndex((element) => this.opts.store.opts.url.includes(element)) >= 0;
      }
      _getKeyPrefix(key) {
        return `${this.opts.namespace}:${key}`;
      }
      _getKeyPrefixArray(keys) {
        return keys.map((key) => `${this.opts.namespace}:${key}`);
      }
      _getKeyUnprefix(key) {
        return key.split(":").splice(1).join(":");
      }
      get(key, options) {
        const { store } = this.opts;
        const isArray = Array.isArray(key);
        const keyPrefixed = isArray ? this._getKeyPrefixArray(key) : this._getKeyPrefix(key);
        if (isArray && store.getMany === void 0) {
          const promises = [];
          for (const key2 of keyPrefixed) {
            promises.push(
              Promise.resolve().then(() => store.get(key2)).then((data) => typeof data === "string" ? this.opts.deserialize(data) : data).then((data) => {
                if (data === void 0 || data === null) {
                  return void 0;
                }
                if (typeof data.expires === "number" && Date.now() > data.expires) {
                  return this.delete(key2).then(() => void 0);
                }
                return options && options.raw ? data : data.value;
              })
            );
          }
          return Promise.allSettled(promises).then((values) => {
            const data = [];
            for (const value of values) {
              data.push(value.value);
            }
            return data.every((x) => x === void 0) ? [] : data;
          });
        }
        return Promise.resolve().then(() => isArray ? store.getMany(keyPrefixed) : store.get(keyPrefixed)).then((data) => typeof data === "string" ? this.opts.deserialize(data) : data).then((data) => {
          if (data === void 0 || data === null) {
            return void 0;
          }
          if (isArray) {
            const result = [];
            if (data.length === 0) {
              return [];
            }
            for (let row of data) {
              if (typeof row === "string") {
                row = this.opts.deserialize(row);
              }
              if (row === void 0 || row === null) {
                result.push(void 0);
                continue;
              }
              if (typeof row.expires === "number" && Date.now() > row.expires) {
                this.delete(key).then(() => void 0);
                result.push(void 0);
              } else {
                result.push(options && options.raw ? row : row.value);
              }
            }
            return result.every((x) => x === void 0) ? [] : result;
          }
          if (typeof data.expires === "number" && Date.now() > data.expires) {
            return this.delete(key).then(() => void 0);
          }
          return options && options.raw ? data : data.value;
        });
      }
      set(key, value, ttl) {
        const keyPrefixed = this._getKeyPrefix(key);
        if (typeof ttl === "undefined") {
          ttl = this.opts.ttl;
        }
        if (ttl === 0) {
          ttl = void 0;
        }
        const { store } = this.opts;
        return Promise.resolve().then(() => {
          const expires = typeof ttl === "number" ? Date.now() + ttl : null;
          if (typeof value === "symbol") {
            this.emit("error", "symbol cannot be serialized");
          }
          value = { value, expires };
          return this.opts.serialize(value);
        }).then((value2) => store.set(keyPrefixed, value2, ttl)).then(() => true);
      }
      delete(key) {
        const { store } = this.opts;
        if (Array.isArray(key)) {
          const keyPrefixed2 = this._getKeyPrefixArray(key);
          if (store.deleteMany === void 0) {
            const promises = [];
            for (const key2 of keyPrefixed2) {
              promises.push(store.delete(key2));
            }
            return Promise.allSettled(promises).then((values) => values.every((x) => x.value === true));
          }
          return Promise.resolve().then(() => store.deleteMany(keyPrefixed2));
        }
        const keyPrefixed = this._getKeyPrefix(key);
        return Promise.resolve().then(() => store.delete(keyPrefixed));
      }
      clear() {
        const { store } = this.opts;
        return Promise.resolve().then(() => store.clear());
      }
      has(key) {
        const keyPrefixed = this._getKeyPrefix(key);
        const { store } = this.opts;
        return Promise.resolve().then(async () => {
          if (typeof store.has === "function") {
            return store.has(keyPrefixed);
          }
          const value = await store.get(keyPrefixed);
          return value !== void 0;
        });
      }
      disconnect() {
        const { store } = this.opts;
        if (typeof store.disconnect === "function") {
          return store.disconnect();
        }
      }
    };
    module2.exports = Keyv;
  }
});

// node_modules/cacheable-request/src/index.js
var require_src5 = __commonJS({
  "node_modules/cacheable-request/src/index.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var urlLib = require("url");
    var normalizeUrl = require_normalize_url();
    var getStream = require_get_stream();
    var CachePolicy = require_http_cache_semantics();
    var Response = require_src();
    var lowercaseKeys = require_lowercase_keys();
    var cloneResponse = require_src2();
    var Keyv = require_src4();
    var CacheableRequest = class {
      constructor(request, cacheAdapter) {
        if (typeof request !== "function") {
          throw new TypeError("Parameter `request` must be a function");
        }
        this.cache = new Keyv({
          uri: typeof cacheAdapter === "string" && cacheAdapter,
          store: typeof cacheAdapter !== "string" && cacheAdapter,
          namespace: "cacheable-request"
        });
        return this.createCacheableRequest(request);
      }
      createCacheableRequest(request) {
        return (opts, cb) => {
          let url;
          if (typeof opts === "string") {
            url = normalizeUrlObject(urlLib.parse(opts));
            opts = {};
          } else if (opts instanceof urlLib.URL) {
            url = normalizeUrlObject(urlLib.parse(opts.toString()));
            opts = {};
          } else {
            const [pathname, ...searchParts] = (opts.path || "").split("?");
            const search = searchParts.length > 0 ? `?${searchParts.join("?")}` : "";
            url = normalizeUrlObject({ ...opts, pathname, search });
          }
          opts = {
            headers: {},
            method: "GET",
            cache: true,
            strictTtl: false,
            automaticFailover: false,
            ...opts,
            ...urlObjectToRequestOptions(url)
          };
          opts.headers = lowercaseKeys(opts.headers);
          const ee = new EventEmitter();
          const normalizedUrlString = normalizeUrl(
            urlLib.format(url),
            {
              stripWWW: false,
              removeTrailingSlash: false,
              stripAuthentication: false
            }
          );
          const key = `${opts.method}:${normalizedUrlString}`;
          let revalidate = false;
          let madeRequest = false;
          const makeRequest = (opts2) => {
            madeRequest = true;
            let requestErrored = false;
            let requestErrorCallback;
            const requestErrorPromise = new Promise((resolve) => {
              requestErrorCallback = () => {
                if (!requestErrored) {
                  requestErrored = true;
                  resolve();
                }
              };
            });
            const handler = (response) => {
              if (revalidate && !opts2.forceRefresh) {
                response.status = response.statusCode;
                const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts2, response);
                if (!revalidatedPolicy.modified) {
                  const headers = revalidatedPolicy.policy.responseHeaders();
                  response = new Response(revalidate.statusCode, headers, revalidate.body, revalidate.url);
                  response.cachePolicy = revalidatedPolicy.policy;
                  response.fromCache = true;
                }
              }
              if (!response.fromCache) {
                response.cachePolicy = new CachePolicy(opts2, response, opts2);
                response.fromCache = false;
              }
              let clonedResponse;
              if (opts2.cache && response.cachePolicy.storable()) {
                clonedResponse = cloneResponse(response);
                (async () => {
                  try {
                    const bodyPromise = getStream.buffer(response);
                    await Promise.race([
                      requestErrorPromise,
                      new Promise((resolve) => response.once("end", resolve))
                    ]);
                    if (requestErrored) {
                      return;
                    }
                    const body = await bodyPromise;
                    const value = {
                      cachePolicy: response.cachePolicy.toObject(),
                      url: response.url,
                      statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
                      body
                    };
                    let ttl = opts2.strictTtl ? response.cachePolicy.timeToLive() : void 0;
                    if (opts2.maxTtl) {
                      ttl = ttl ? Math.min(ttl, opts2.maxTtl) : opts2.maxTtl;
                    }
                    await this.cache.set(key, value, ttl);
                  } catch (error) {
                    ee.emit("error", new CacheableRequest.CacheError(error));
                  }
                })();
              } else if (opts2.cache && revalidate) {
                (async () => {
                  try {
                    await this.cache.delete(key);
                  } catch (error) {
                    ee.emit("error", new CacheableRequest.CacheError(error));
                  }
                })();
              }
              ee.emit("response", clonedResponse || response);
              if (typeof cb === "function") {
                cb(clonedResponse || response);
              }
            };
            try {
              const req = request(opts2, handler);
              req.once("error", requestErrorCallback);
              req.once("abort", requestErrorCallback);
              ee.emit("request", req);
            } catch (error) {
              ee.emit("error", new CacheableRequest.RequestError(error));
            }
          };
          (async () => {
            const get = async (opts2) => {
              await Promise.resolve();
              const cacheEntry = opts2.cache ? await this.cache.get(key) : void 0;
              if (typeof cacheEntry === "undefined") {
                return makeRequest(opts2);
              }
              const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
              if (policy.satisfiesWithoutRevalidation(opts2) && !opts2.forceRefresh) {
                const headers = policy.responseHeaders();
                const response = new Response(cacheEntry.statusCode, headers, cacheEntry.body, cacheEntry.url);
                response.cachePolicy = policy;
                response.fromCache = true;
                ee.emit("response", response);
                if (typeof cb === "function") {
                  cb(response);
                }
              } else {
                revalidate = cacheEntry;
                opts2.headers = policy.revalidationHeaders(opts2);
                makeRequest(opts2);
              }
            };
            const errorHandler = (error) => ee.emit("error", new CacheableRequest.CacheError(error));
            this.cache.once("error", errorHandler);
            ee.on("response", () => this.cache.removeListener("error", errorHandler));
            try {
              await get(opts);
            } catch (error) {
              if (opts.automaticFailover && !madeRequest) {
                makeRequest(opts);
              }
              ee.emit("error", new CacheableRequest.CacheError(error));
            }
          })();
          return ee;
        };
      }
    };
    function urlObjectToRequestOptions(url) {
      const options = { ...url };
      options.path = `${url.pathname || "/"}${url.search || ""}`;
      delete options.pathname;
      delete options.search;
      return options;
    }
    function normalizeUrlObject(url) {
      return {
        protocol: url.protocol,
        auth: url.auth,
        hostname: url.hostname || url.host || "localhost",
        port: url.port,
        pathname: url.pathname,
        search: url.search
      };
    }
    CacheableRequest.RequestError = class extends Error {
      constructor(error) {
        super(error.message);
        this.name = "RequestError";
        Object.assign(this, error);
      }
    };
    CacheableRequest.CacheError = class extends Error {
      constructor(error) {
        super(error.message);
        this.name = "CacheError";
        Object.assign(this, error);
      }
    };
    module2.exports = CacheableRequest;
  }
});

// node_modules/decompress-response/node_modules/mimic-response/index.js
var require_mimic_response2 = __commonJS({
  "node_modules/decompress-response/node_modules/mimic-response/index.js"(exports2, module2) {
    "use strict";
    var knownProperties = [
      "aborted",
      "complete",
      "headers",
      "httpVersion",
      "httpVersionMinor",
      "httpVersionMajor",
      "method",
      "rawHeaders",
      "rawTrailers",
      "setTimeout",
      "socket",
      "statusCode",
      "statusMessage",
      "trailers",
      "url"
    ];
    module2.exports = (fromStream, toStream) => {
      if (toStream._readableState.autoDestroy) {
        throw new Error("The second stream must have the `autoDestroy` option set to `false`");
      }
      const fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));
      const properties = {};
      for (const property of fromProperties) {
        if (property in toStream) {
          continue;
        }
        properties[property] = {
          get() {
            const value = fromStream[property];
            const isFunction = typeof value === "function";
            return isFunction ? value.bind(fromStream) : value;
          },
          set(value) {
            fromStream[property] = value;
          },
          enumerable: true,
          configurable: false
        };
      }
      Object.defineProperties(toStream, properties);
      fromStream.once("aborted", () => {
        toStream.destroy();
        toStream.emit("aborted");
      });
      fromStream.once("close", () => {
        if (fromStream.complete) {
          if (toStream.readable) {
            toStream.once("end", () => {
              toStream.emit("close");
            });
          } else {
            toStream.emit("close");
          }
        } else {
          toStream.emit("close");
        }
      });
      return toStream;
    };
  }
});

// node_modules/decompress-response/index.js
var require_decompress_response = __commonJS({
  "node_modules/decompress-response/index.js"(exports2, module2) {
    "use strict";
    var { Transform, PassThrough } = require("stream");
    var zlib = require("zlib");
    var mimicResponse = require_mimic_response2();
    module2.exports = (response) => {
      const contentEncoding = (response.headers["content-encoding"] || "").toLowerCase();
      if (!["gzip", "deflate", "br"].includes(contentEncoding)) {
        return response;
      }
      const isBrotli = contentEncoding === "br";
      if (isBrotli && typeof zlib.createBrotliDecompress !== "function") {
        response.destroy(new Error("Brotli is not supported on Node.js < 12"));
        return response;
      }
      let isEmpty = true;
      const checker = new Transform({
        transform(data, _encoding, callback) {
          isEmpty = false;
          callback(null, data);
        },
        flush(callback) {
          callback();
        }
      });
      const finalStream = new PassThrough({
        autoDestroy: false,
        destroy(error, callback) {
          response.destroy();
          callback(error);
        }
      });
      const decompressStream = isBrotli ? zlib.createBrotliDecompress() : zlib.createUnzip();
      decompressStream.once("error", (error) => {
        if (isEmpty && !response.readable) {
          finalStream.end();
          return;
        }
        finalStream.destroy(error);
      });
      mimicResponse(response, finalStream);
      response.pipe(checker).pipe(decompressStream).pipe(finalStream);
      return finalStream;
    };
  }
});

// node_modules/quick-lru/index.js
var require_quick_lru = __commonJS({
  "node_modules/quick-lru/index.js"(exports2, module2) {
    "use strict";
    var QuickLRU = class {
      constructor(options = {}) {
        if (!(options.maxSize && options.maxSize > 0)) {
          throw new TypeError("`maxSize` must be a number greater than 0");
        }
        this.maxSize = options.maxSize;
        this.onEviction = options.onEviction;
        this.cache = /* @__PURE__ */ new Map();
        this.oldCache = /* @__PURE__ */ new Map();
        this._size = 0;
      }
      _set(key, value) {
        this.cache.set(key, value);
        this._size++;
        if (this._size >= this.maxSize) {
          this._size = 0;
          if (typeof this.onEviction === "function") {
            for (const [key2, value2] of this.oldCache.entries()) {
              this.onEviction(key2, value2);
            }
          }
          this.oldCache = this.cache;
          this.cache = /* @__PURE__ */ new Map();
        }
      }
      get(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
          const value = this.oldCache.get(key);
          this.oldCache.delete(key);
          this._set(key, value);
          return value;
        }
      }
      set(key, value) {
        if (this.cache.has(key)) {
          this.cache.set(key, value);
        } else {
          this._set(key, value);
        }
        return this;
      }
      has(key) {
        return this.cache.has(key) || this.oldCache.has(key);
      }
      peek(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
          return this.oldCache.get(key);
        }
      }
      delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
          this._size--;
        }
        return this.oldCache.delete(key) || deleted;
      }
      clear() {
        this.cache.clear();
        this.oldCache.clear();
        this._size = 0;
      }
      *keys() {
        for (const [key] of this) {
          yield key;
        }
      }
      *values() {
        for (const [, value] of this) {
          yield value;
        }
      }
      *[Symbol.iterator]() {
        for (const item of this.cache) {
          yield item;
        }
        for (const item of this.oldCache) {
          const [key] = item;
          if (!this.cache.has(key)) {
            yield item;
          }
        }
      }
      get size() {
        let oldCacheSize = 0;
        for (const key of this.oldCache.keys()) {
          if (!this.cache.has(key)) {
            oldCacheSize++;
          }
        }
        return Math.min(this._size + oldCacheSize, this.maxSize);
      }
    };
    module2.exports = QuickLRU;
  }
});

// node_modules/http2-wrapper/source/agent.js
var require_agent = __commonJS({
  "node_modules/http2-wrapper/source/agent.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var tls = require("tls");
    var http2 = require("http2");
    var QuickLRU = require_quick_lru();
    var kCurrentStreamsCount = Symbol("currentStreamsCount");
    var kRequest = Symbol("request");
    var kOriginSet = Symbol("cachedOriginSet");
    var kGracefullyClosing = Symbol("gracefullyClosing");
    var nameKeys = [
      "maxDeflateDynamicTableSize",
      "maxSessionMemory",
      "maxHeaderListPairs",
      "maxOutstandingPings",
      "maxReservedRemoteStreams",
      "maxSendHeaderBlockLength",
      "paddingStrategy",
      "localAddress",
      "path",
      "rejectUnauthorized",
      "minDHSize",
      "ca",
      "cert",
      "clientCertEngine",
      "ciphers",
      "key",
      "pfx",
      "servername",
      "minVersion",
      "maxVersion",
      "secureProtocol",
      "crl",
      "honorCipherOrder",
      "ecdhCurve",
      "dhparam",
      "secureOptions",
      "sessionIdContext"
    ];
    var getSortedIndex = (array, value, compare) => {
      let low = 0;
      let high = array.length;
      while (low < high) {
        const mid = low + high >>> 1;
        if (compare(array[mid], value)) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return low;
    };
    var compareSessions = (a, b) => {
      return a.remoteSettings.maxConcurrentStreams > b.remoteSettings.maxConcurrentStreams;
    };
    var closeCoveredSessions = (where, session) => {
      for (const coveredSession of where) {
        if (coveredSession[kOriginSet].length < session[kOriginSet].length && coveredSession[kOriginSet].every((origin) => session[kOriginSet].includes(origin)) && coveredSession[kCurrentStreamsCount] + session[kCurrentStreamsCount] <= session.remoteSettings.maxConcurrentStreams) {
          gracefullyClose(coveredSession);
        }
      }
    };
    var closeSessionIfCovered = (where, coveredSession) => {
      for (const session of where) {
        if (coveredSession[kOriginSet].length < session[kOriginSet].length && coveredSession[kOriginSet].every((origin) => session[kOriginSet].includes(origin)) && coveredSession[kCurrentStreamsCount] + session[kCurrentStreamsCount] <= session.remoteSettings.maxConcurrentStreams) {
          gracefullyClose(coveredSession);
        }
      }
    };
    var getSessions = ({ agent, isFree }) => {
      const result = {};
      for (const normalizedOptions in agent.sessions) {
        const sessions = agent.sessions[normalizedOptions];
        const filtered = sessions.filter((session) => {
          const result2 = session[Agent.kCurrentStreamsCount] < session.remoteSettings.maxConcurrentStreams;
          return isFree ? result2 : !result2;
        });
        if (filtered.length !== 0) {
          result[normalizedOptions] = filtered;
        }
      }
      return result;
    };
    var gracefullyClose = (session) => {
      session[kGracefullyClosing] = true;
      if (session[kCurrentStreamsCount] === 0) {
        session.close();
      }
    };
    var Agent = class extends EventEmitter {
      constructor({ timeout = 6e4, maxSessions = Infinity, maxFreeSessions = 10, maxCachedTlsSessions = 100 } = {}) {
        super();
        this.sessions = {};
        this.queue = {};
        this.timeout = timeout;
        this.maxSessions = maxSessions;
        this.maxFreeSessions = maxFreeSessions;
        this._freeSessionsCount = 0;
        this._sessionsCount = 0;
        this.settings = {
          enablePush: false
        };
        this.tlsSessionCache = new QuickLRU({ maxSize: maxCachedTlsSessions });
      }
      static normalizeOrigin(url, servername) {
        if (typeof url === "string") {
          url = new URL(url);
        }
        if (servername && url.hostname !== servername) {
          url.hostname = servername;
        }
        return url.origin;
      }
      normalizeOptions(options) {
        let normalized = "";
        if (options) {
          for (const key of nameKeys) {
            if (options[key]) {
              normalized += `:${options[key]}`;
            }
          }
        }
        return normalized;
      }
      _tryToCreateNewSession(normalizedOptions, normalizedOrigin) {
        if (!(normalizedOptions in this.queue) || !(normalizedOrigin in this.queue[normalizedOptions])) {
          return;
        }
        const item = this.queue[normalizedOptions][normalizedOrigin];
        if (this._sessionsCount < this.maxSessions && !item.completed) {
          item.completed = true;
          item();
        }
      }
      getSession(origin, options, listeners) {
        return new Promise((resolve, reject) => {
          if (Array.isArray(listeners)) {
            listeners = [...listeners];
            resolve();
          } else {
            listeners = [{ resolve, reject }];
          }
          const normalizedOptions = this.normalizeOptions(options);
          const normalizedOrigin = Agent.normalizeOrigin(origin, options && options.servername);
          if (normalizedOrigin === void 0) {
            for (const { reject: reject2 } of listeners) {
              reject2(new TypeError("The `origin` argument needs to be a string or an URL object"));
            }
            return;
          }
          if (normalizedOptions in this.sessions) {
            const sessions = this.sessions[normalizedOptions];
            let maxConcurrentStreams = -1;
            let currentStreamsCount = -1;
            let optimalSession;
            for (const session of sessions) {
              const sessionMaxConcurrentStreams = session.remoteSettings.maxConcurrentStreams;
              if (sessionMaxConcurrentStreams < maxConcurrentStreams) {
                break;
              }
              if (session[kOriginSet].includes(normalizedOrigin)) {
                const sessionCurrentStreamsCount = session[kCurrentStreamsCount];
                if (sessionCurrentStreamsCount >= sessionMaxConcurrentStreams || session[kGracefullyClosing] || session.destroyed) {
                  continue;
                }
                if (!optimalSession) {
                  maxConcurrentStreams = sessionMaxConcurrentStreams;
                }
                if (sessionCurrentStreamsCount > currentStreamsCount) {
                  optimalSession = session;
                  currentStreamsCount = sessionCurrentStreamsCount;
                }
              }
            }
            if (optimalSession) {
              if (listeners.length !== 1) {
                for (const { reject: reject2 } of listeners) {
                  const error = new Error(
                    `Expected the length of listeners to be 1, got ${listeners.length}.
Please report this to https://github.com/szmarczak/http2-wrapper/`
                  );
                  reject2(error);
                }
                return;
              }
              listeners[0].resolve(optimalSession);
              return;
            }
          }
          if (normalizedOptions in this.queue) {
            if (normalizedOrigin in this.queue[normalizedOptions]) {
              this.queue[normalizedOptions][normalizedOrigin].listeners.push(...listeners);
              this._tryToCreateNewSession(normalizedOptions, normalizedOrigin);
              return;
            }
          } else {
            this.queue[normalizedOptions] = {};
          }
          const removeFromQueue = () => {
            if (normalizedOptions in this.queue && this.queue[normalizedOptions][normalizedOrigin] === entry) {
              delete this.queue[normalizedOptions][normalizedOrigin];
              if (Object.keys(this.queue[normalizedOptions]).length === 0) {
                delete this.queue[normalizedOptions];
              }
            }
          };
          const entry = () => {
            const name = `${normalizedOrigin}:${normalizedOptions}`;
            let receivedSettings = false;
            try {
              const session = http2.connect(origin, {
                createConnection: this.createConnection,
                settings: this.settings,
                session: this.tlsSessionCache.get(name),
                ...options
              });
              session[kCurrentStreamsCount] = 0;
              session[kGracefullyClosing] = false;
              const isFree = () => session[kCurrentStreamsCount] < session.remoteSettings.maxConcurrentStreams;
              let wasFree = true;
              session.socket.once("session", (tlsSession) => {
                this.tlsSessionCache.set(name, tlsSession);
              });
              session.once("error", (error) => {
                for (const { reject: reject2 } of listeners) {
                  reject2(error);
                }
                this.tlsSessionCache.delete(name);
              });
              session.setTimeout(this.timeout, () => {
                session.destroy();
              });
              session.once("close", () => {
                if (receivedSettings) {
                  if (wasFree) {
                    this._freeSessionsCount--;
                  }
                  this._sessionsCount--;
                  const where = this.sessions[normalizedOptions];
                  where.splice(where.indexOf(session), 1);
                  if (where.length === 0) {
                    delete this.sessions[normalizedOptions];
                  }
                } else {
                  const error = new Error("Session closed without receiving a SETTINGS frame");
                  error.code = "HTTP2WRAPPER_NOSETTINGS";
                  for (const { reject: reject2 } of listeners) {
                    reject2(error);
                  }
                  removeFromQueue();
                }
                this._tryToCreateNewSession(normalizedOptions, normalizedOrigin);
              });
              const processListeners = () => {
                if (!(normalizedOptions in this.queue) || !isFree()) {
                  return;
                }
                for (const origin2 of session[kOriginSet]) {
                  if (origin2 in this.queue[normalizedOptions]) {
                    const { listeners: listeners2 } = this.queue[normalizedOptions][origin2];
                    while (listeners2.length !== 0 && isFree()) {
                      listeners2.shift().resolve(session);
                    }
                    const where = this.queue[normalizedOptions];
                    if (where[origin2].listeners.length === 0) {
                      delete where[origin2];
                      if (Object.keys(where).length === 0) {
                        delete this.queue[normalizedOptions];
                        break;
                      }
                    }
                    if (!isFree()) {
                      break;
                    }
                  }
                }
              };
              session.on("origin", () => {
                session[kOriginSet] = session.originSet;
                if (!isFree()) {
                  return;
                }
                processListeners();
                closeCoveredSessions(this.sessions[normalizedOptions], session);
              });
              session.once("remoteSettings", () => {
                session.ref();
                session.unref();
                this._sessionsCount++;
                if (entry.destroyed) {
                  const error = new Error("Agent has been destroyed");
                  for (const listener of listeners) {
                    listener.reject(error);
                  }
                  session.destroy();
                  return;
                }
                session[kOriginSet] = session.originSet;
                {
                  const where = this.sessions;
                  if (normalizedOptions in where) {
                    const sessions = where[normalizedOptions];
                    sessions.splice(getSortedIndex(sessions, session, compareSessions), 0, session);
                  } else {
                    where[normalizedOptions] = [session];
                  }
                }
                this._freeSessionsCount += 1;
                receivedSettings = true;
                this.emit("session", session);
                processListeners();
                removeFromQueue();
                if (session[kCurrentStreamsCount] === 0 && this._freeSessionsCount > this.maxFreeSessions) {
                  session.close();
                }
                if (listeners.length !== 0) {
                  this.getSession(normalizedOrigin, options, listeners);
                  listeners.length = 0;
                }
                session.on("remoteSettings", () => {
                  processListeners();
                  closeCoveredSessions(this.sessions[normalizedOptions], session);
                });
              });
              session[kRequest] = session.request;
              session.request = (headers, streamOptions) => {
                if (session[kGracefullyClosing]) {
                  throw new Error("The session is gracefully closing. No new streams are allowed.");
                }
                const stream = session[kRequest](headers, streamOptions);
                session.ref();
                ++session[kCurrentStreamsCount];
                if (session[kCurrentStreamsCount] === session.remoteSettings.maxConcurrentStreams) {
                  this._freeSessionsCount--;
                }
                stream.once("close", () => {
                  wasFree = isFree();
                  --session[kCurrentStreamsCount];
                  if (!session.destroyed && !session.closed) {
                    closeSessionIfCovered(this.sessions[normalizedOptions], session);
                    if (isFree() && !session.closed) {
                      if (!wasFree) {
                        this._freeSessionsCount++;
                        wasFree = true;
                      }
                      const isEmpty = session[kCurrentStreamsCount] === 0;
                      if (isEmpty) {
                        session.unref();
                      }
                      if (isEmpty && (this._freeSessionsCount > this.maxFreeSessions || session[kGracefullyClosing])) {
                        session.close();
                      } else {
                        closeCoveredSessions(this.sessions[normalizedOptions], session);
                        processListeners();
                      }
                    }
                  }
                });
                return stream;
              };
            } catch (error) {
              for (const listener of listeners) {
                listener.reject(error);
              }
              removeFromQueue();
            }
          };
          entry.listeners = listeners;
          entry.completed = false;
          entry.destroyed = false;
          this.queue[normalizedOptions][normalizedOrigin] = entry;
          this._tryToCreateNewSession(normalizedOptions, normalizedOrigin);
        });
      }
      request(origin, options, headers, streamOptions) {
        return new Promise((resolve, reject) => {
          this.getSession(origin, options, [{
            reject,
            resolve: (session) => {
              try {
                resolve(session.request(headers, streamOptions));
              } catch (error) {
                reject(error);
              }
            }
          }]);
        });
      }
      createConnection(origin, options) {
        return Agent.connect(origin, options);
      }
      static connect(origin, options) {
        options.ALPNProtocols = ["h2"];
        const port = origin.port || 443;
        const host = origin.hostname || origin.host;
        if (typeof options.servername === "undefined") {
          options.servername = host;
        }
        return tls.connect(port, host, options);
      }
      closeFreeSessions() {
        for (const sessions of Object.values(this.sessions)) {
          for (const session of sessions) {
            if (session[kCurrentStreamsCount] === 0) {
              session.close();
            }
          }
        }
      }
      destroy(reason) {
        for (const sessions of Object.values(this.sessions)) {
          for (const session of sessions) {
            session.destroy(reason);
          }
        }
        for (const entriesOfAuthority of Object.values(this.queue)) {
          for (const entry of Object.values(entriesOfAuthority)) {
            entry.destroyed = true;
          }
        }
        this.queue = {};
      }
      get freeSessions() {
        return getSessions({ agent: this, isFree: true });
      }
      get busySessions() {
        return getSessions({ agent: this, isFree: false });
      }
    };
    Agent.kCurrentStreamsCount = kCurrentStreamsCount;
    Agent.kGracefullyClosing = kGracefullyClosing;
    module2.exports = {
      Agent,
      globalAgent: new Agent()
    };
  }
});

// node_modules/http2-wrapper/source/incoming-message.js
var require_incoming_message = __commonJS({
  "node_modules/http2-wrapper/source/incoming-message.js"(exports2, module2) {
    "use strict";
    var { Readable } = require("stream");
    var IncomingMessage = class extends Readable {
      constructor(socket, highWaterMark) {
        super({
          highWaterMark,
          autoDestroy: false
        });
        this.statusCode = null;
        this.statusMessage = "";
        this.httpVersion = "2.0";
        this.httpVersionMajor = 2;
        this.httpVersionMinor = 0;
        this.headers = {};
        this.trailers = {};
        this.req = null;
        this.aborted = false;
        this.complete = false;
        this.upgrade = null;
        this.rawHeaders = [];
        this.rawTrailers = [];
        this.socket = socket;
        this.connection = socket;
        this._dumped = false;
      }
      _destroy(error) {
        this.req._request.destroy(error);
      }
      setTimeout(ms, callback) {
        this.req.setTimeout(ms, callback);
        return this;
      }
      _dump() {
        if (!this._dumped) {
          this._dumped = true;
          this.removeAllListeners("data");
          this.resume();
        }
      }
      _read() {
        if (this.req) {
          this.req._request.resume();
        }
      }
    };
    module2.exports = IncomingMessage;
  }
});

// node_modules/http2-wrapper/source/utils/url-to-options.js
var require_url_to_options = __commonJS({
  "node_modules/http2-wrapper/source/utils/url-to-options.js"(exports2, module2) {
    "use strict";
    module2.exports = (url) => {
      const options = {
        protocol: url.protocol,
        hostname: typeof url.hostname === "string" && url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname,
        host: url.host,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        href: url.href,
        path: `${url.pathname || ""}${url.search || ""}`
      };
      if (typeof url.port === "string" && url.port.length !== 0) {
        options.port = Number(url.port);
      }
      if (url.username || url.password) {
        options.auth = `${url.username || ""}:${url.password || ""}`;
      }
      return options;
    };
  }
});

// node_modules/http2-wrapper/source/utils/proxy-events.js
var require_proxy_events = __commonJS({
  "node_modules/http2-wrapper/source/utils/proxy-events.js"(exports2, module2) {
    "use strict";
    module2.exports = (from, to, events) => {
      for (const event of events) {
        from.on(event, (...args) => to.emit(event, ...args));
      }
    };
  }
});

// node_modules/http2-wrapper/source/utils/is-request-pseudo-header.js
var require_is_request_pseudo_header = __commonJS({
  "node_modules/http2-wrapper/source/utils/is-request-pseudo-header.js"(exports2, module2) {
    "use strict";
    module2.exports = (header) => {
      switch (header) {
        case ":method":
        case ":scheme":
        case ":authority":
        case ":path":
          return true;
        default:
          return false;
      }
    };
  }
});

// node_modules/http2-wrapper/source/utils/errors.js
var require_errors = __commonJS({
  "node_modules/http2-wrapper/source/utils/errors.js"(exports2, module2) {
    "use strict";
    var makeError = (Base, key, getMessage) => {
      module2.exports[key] = class NodeError extends Base {
        constructor(...args) {
          super(typeof getMessage === "string" ? getMessage : getMessage(args));
          this.name = `${super.name} [${key}]`;
          this.code = key;
        }
      };
    };
    makeError(TypeError, "ERR_INVALID_ARG_TYPE", (args) => {
      const type = args[0].includes(".") ? "property" : "argument";
      let valid = args[1];
      const isManyTypes = Array.isArray(valid);
      if (isManyTypes) {
        valid = `${valid.slice(0, -1).join(", ")} or ${valid.slice(-1)}`;
      }
      return `The "${args[0]}" ${type} must be ${isManyTypes ? "one of" : "of"} type ${valid}. Received ${typeof args[2]}`;
    });
    makeError(TypeError, "ERR_INVALID_PROTOCOL", (args) => {
      return `Protocol "${args[0]}" not supported. Expected "${args[1]}"`;
    });
    makeError(Error, "ERR_HTTP_HEADERS_SENT", (args) => {
      return `Cannot ${args[0]} headers after they are sent to the client`;
    });
    makeError(TypeError, "ERR_INVALID_HTTP_TOKEN", (args) => {
      return `${args[0]} must be a valid HTTP token [${args[1]}]`;
    });
    makeError(TypeError, "ERR_HTTP_INVALID_HEADER_VALUE", (args) => {
      return `Invalid value "${args[0]} for header "${args[1]}"`;
    });
    makeError(TypeError, "ERR_INVALID_CHAR", (args) => {
      return `Invalid character in ${args[0]} [${args[1]}]`;
    });
  }
});

// node_modules/http2-wrapper/source/client-request.js
var require_client_request = __commonJS({
  "node_modules/http2-wrapper/source/client-request.js"(exports2, module2) {
    "use strict";
    var http2 = require("http2");
    var { Writable } = require("stream");
    var { Agent, globalAgent } = require_agent();
    var IncomingMessage = require_incoming_message();
    var urlToOptions = require_url_to_options();
    var proxyEvents = require_proxy_events();
    var isRequestPseudoHeader = require_is_request_pseudo_header();
    var {
      ERR_INVALID_ARG_TYPE,
      ERR_INVALID_PROTOCOL,
      ERR_HTTP_HEADERS_SENT,
      ERR_INVALID_HTTP_TOKEN,
      ERR_HTTP_INVALID_HEADER_VALUE,
      ERR_INVALID_CHAR
    } = require_errors();
    var {
      HTTP2_HEADER_STATUS,
      HTTP2_HEADER_METHOD,
      HTTP2_HEADER_PATH,
      HTTP2_METHOD_CONNECT
    } = http2.constants;
    var kHeaders = Symbol("headers");
    var kOrigin = Symbol("origin");
    var kSession = Symbol("session");
    var kOptions = Symbol("options");
    var kFlushedHeaders = Symbol("flushedHeaders");
    var kJobs = Symbol("jobs");
    var isValidHttpToken = /^[\^`\-\w!#$%&*+.|~]+$/;
    var isInvalidHeaderValue = /[^\t\u0020-\u007E\u0080-\u00FF]/;
    var ClientRequest = class extends Writable {
      constructor(input, options, callback) {
        super({
          autoDestroy: false
        });
        const hasInput = typeof input === "string" || input instanceof URL;
        if (hasInput) {
          input = urlToOptions(input instanceof URL ? input : new URL(input));
        }
        if (typeof options === "function" || options === void 0) {
          callback = options;
          options = hasInput ? input : { ...input };
        } else {
          options = { ...input, ...options };
        }
        if (options.h2session) {
          this[kSession] = options.h2session;
        } else if (options.agent === false) {
          this.agent = new Agent({ maxFreeSessions: 0 });
        } else if (typeof options.agent === "undefined" || options.agent === null) {
          if (typeof options.createConnection === "function") {
            this.agent = new Agent({ maxFreeSessions: 0 });
            this.agent.createConnection = options.createConnection;
          } else {
            this.agent = globalAgent;
          }
        } else if (typeof options.agent.request === "function") {
          this.agent = options.agent;
        } else {
          throw new ERR_INVALID_ARG_TYPE("options.agent", ["Agent-like Object", "undefined", "false"], options.agent);
        }
        if (options.protocol && options.protocol !== "https:") {
          throw new ERR_INVALID_PROTOCOL(options.protocol, "https:");
        }
        const port = options.port || options.defaultPort || this.agent && this.agent.defaultPort || 443;
        const host = options.hostname || options.host || "localhost";
        delete options.hostname;
        delete options.host;
        delete options.port;
        const { timeout } = options;
        options.timeout = void 0;
        this[kHeaders] = /* @__PURE__ */ Object.create(null);
        this[kJobs] = [];
        this.socket = null;
        this.connection = null;
        this.method = options.method || "GET";
        this.path = options.path;
        this.res = null;
        this.aborted = false;
        this.reusedSocket = false;
        if (options.headers) {
          for (const [header, value] of Object.entries(options.headers)) {
            this.setHeader(header, value);
          }
        }
        if (options.auth && !("authorization" in this[kHeaders])) {
          this[kHeaders].authorization = "Basic " + Buffer.from(options.auth).toString("base64");
        }
        options.session = options.tlsSession;
        options.path = options.socketPath;
        this[kOptions] = options;
        if (port === 443) {
          this[kOrigin] = `https://${host}`;
          if (!(":authority" in this[kHeaders])) {
            this[kHeaders][":authority"] = host;
          }
        } else {
          this[kOrigin] = `https://${host}:${port}`;
          if (!(":authority" in this[kHeaders])) {
            this[kHeaders][":authority"] = `${host}:${port}`;
          }
        }
        if (timeout) {
          this.setTimeout(timeout);
        }
        if (callback) {
          this.once("response", callback);
        }
        this[kFlushedHeaders] = false;
      }
      get method() {
        return this[kHeaders][HTTP2_HEADER_METHOD];
      }
      set method(value) {
        if (value) {
          this[kHeaders][HTTP2_HEADER_METHOD] = value.toUpperCase();
        }
      }
      get path() {
        return this[kHeaders][HTTP2_HEADER_PATH];
      }
      set path(value) {
        if (value) {
          this[kHeaders][HTTP2_HEADER_PATH] = value;
        }
      }
      get _mustNotHaveABody() {
        return this.method === "GET" || this.method === "HEAD" || this.method === "DELETE";
      }
      _write(chunk, encoding, callback) {
        if (this._mustNotHaveABody) {
          callback(new Error("The GET, HEAD and DELETE methods must NOT have a body"));
          return;
        }
        this.flushHeaders();
        const callWrite = () => this._request.write(chunk, encoding, callback);
        if (this._request) {
          callWrite();
        } else {
          this[kJobs].push(callWrite);
        }
      }
      _final(callback) {
        if (this.destroyed) {
          return;
        }
        this.flushHeaders();
        const callEnd = () => {
          if (this._mustNotHaveABody) {
            callback();
            return;
          }
          this._request.end(callback);
        };
        if (this._request) {
          callEnd();
        } else {
          this[kJobs].push(callEnd);
        }
      }
      abort() {
        if (this.res && this.res.complete) {
          return;
        }
        if (!this.aborted) {
          process.nextTick(() => this.emit("abort"));
        }
        this.aborted = true;
        this.destroy();
      }
      _destroy(error, callback) {
        if (this.res) {
          this.res._dump();
        }
        if (this._request) {
          this._request.destroy();
        }
        callback(error);
      }
      async flushHeaders() {
        if (this[kFlushedHeaders] || this.destroyed) {
          return;
        }
        this[kFlushedHeaders] = true;
        const isConnectMethod = this.method === HTTP2_METHOD_CONNECT;
        const onStream = (stream) => {
          this._request = stream;
          if (this.destroyed) {
            stream.destroy();
            return;
          }
          if (!isConnectMethod) {
            proxyEvents(stream, this, ["timeout", "continue", "close", "error"]);
          }
          const waitForEnd = (fn) => {
            return (...args) => {
              if (!this.writable && !this.destroyed) {
                fn(...args);
              } else {
                this.once("finish", () => {
                  fn(...args);
                });
              }
            };
          };
          stream.once("response", waitForEnd((headers, flags, rawHeaders) => {
            const response = new IncomingMessage(this.socket, stream.readableHighWaterMark);
            this.res = response;
            response.req = this;
            response.statusCode = headers[HTTP2_HEADER_STATUS];
            response.headers = headers;
            response.rawHeaders = rawHeaders;
            response.once("end", () => {
              if (this.aborted) {
                response.aborted = true;
                response.emit("aborted");
              } else {
                response.complete = true;
                response.socket = null;
                response.connection = null;
              }
            });
            if (isConnectMethod) {
              response.upgrade = true;
              if (this.emit("connect", response, stream, Buffer.alloc(0))) {
                this.emit("close");
              } else {
                stream.destroy();
              }
            } else {
              stream.on("data", (chunk) => {
                if (!response._dumped && !response.push(chunk)) {
                  stream.pause();
                }
              });
              stream.once("end", () => {
                response.push(null);
              });
              if (!this.emit("response", response)) {
                response._dump();
              }
            }
          }));
          stream.once("headers", waitForEnd(
            (headers) => this.emit("information", { statusCode: headers[HTTP2_HEADER_STATUS] })
          ));
          stream.once("trailers", waitForEnd((trailers, flags, rawTrailers) => {
            const { res } = this;
            res.trailers = trailers;
            res.rawTrailers = rawTrailers;
          }));
          const { socket } = stream.session;
          this.socket = socket;
          this.connection = socket;
          for (const job of this[kJobs]) {
            job();
          }
          this.emit("socket", this.socket);
        };
        if (this[kSession]) {
          try {
            onStream(this[kSession].request(this[kHeaders]));
          } catch (error) {
            this.emit("error", error);
          }
        } else {
          this.reusedSocket = true;
          try {
            onStream(await this.agent.request(this[kOrigin], this[kOptions], this[kHeaders]));
          } catch (error) {
            this.emit("error", error);
          }
        }
      }
      getHeader(name) {
        if (typeof name !== "string") {
          throw new ERR_INVALID_ARG_TYPE("name", "string", name);
        }
        return this[kHeaders][name.toLowerCase()];
      }
      get headersSent() {
        return this[kFlushedHeaders];
      }
      removeHeader(name) {
        if (typeof name !== "string") {
          throw new ERR_INVALID_ARG_TYPE("name", "string", name);
        }
        if (this.headersSent) {
          throw new ERR_HTTP_HEADERS_SENT("remove");
        }
        delete this[kHeaders][name.toLowerCase()];
      }
      setHeader(name, value) {
        if (this.headersSent) {
          throw new ERR_HTTP_HEADERS_SENT("set");
        }
        if (typeof name !== "string" || !isValidHttpToken.test(name) && !isRequestPseudoHeader(name)) {
          throw new ERR_INVALID_HTTP_TOKEN("Header name", name);
        }
        if (typeof value === "undefined") {
          throw new ERR_HTTP_INVALID_HEADER_VALUE(value, name);
        }
        if (isInvalidHeaderValue.test(value)) {
          throw new ERR_INVALID_CHAR("header content", name);
        }
        this[kHeaders][name.toLowerCase()] = value;
      }
      setNoDelay() {
      }
      setSocketKeepAlive() {
      }
      setTimeout(ms, callback) {
        const applyTimeout = () => this._request.setTimeout(ms, callback);
        if (this._request) {
          applyTimeout();
        } else {
          this[kJobs].push(applyTimeout);
        }
        return this;
      }
      get maxHeadersCount() {
        if (!this.destroyed && this._request) {
          return this._request.session.localSettings.maxHeaderListSize;
        }
        return void 0;
      }
      set maxHeadersCount(_value) {
      }
    };
    module2.exports = ClientRequest;
  }
});

// node_modules/resolve-alpn/index.js
var require_resolve_alpn = __commonJS({
  "node_modules/resolve-alpn/index.js"(exports2, module2) {
    "use strict";
    var tls = require("tls");
    module2.exports = (options = {}, connect = tls.connect) => new Promise((resolve, reject) => {
      let timeout = false;
      let socket;
      const callback = async () => {
        await socketPromise;
        socket.off("timeout", onTimeout);
        socket.off("error", reject);
        if (options.resolveSocket) {
          resolve({ alpnProtocol: socket.alpnProtocol, socket, timeout });
          if (timeout) {
            await Promise.resolve();
            socket.emit("timeout");
          }
        } else {
          socket.destroy();
          resolve({ alpnProtocol: socket.alpnProtocol, timeout });
        }
      };
      const onTimeout = async () => {
        timeout = true;
        callback();
      };
      const socketPromise = (async () => {
        try {
          socket = await connect(options, callback);
          socket.on("error", reject);
          socket.once("timeout", onTimeout);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
});

// node_modules/http2-wrapper/source/utils/calculate-server-name.js
var require_calculate_server_name = __commonJS({
  "node_modules/http2-wrapper/source/utils/calculate-server-name.js"(exports2, module2) {
    "use strict";
    var net = require("net");
    module2.exports = (options) => {
      let servername = options.host;
      const hostHeader = options.headers && options.headers.host;
      if (hostHeader) {
        if (hostHeader.startsWith("[")) {
          const index = hostHeader.indexOf("]");
          if (index === -1) {
            servername = hostHeader;
          } else {
            servername = hostHeader.slice(1, -1);
          }
        } else {
          servername = hostHeader.split(":", 1)[0];
        }
      }
      if (net.isIP(servername)) {
        return "";
      }
      return servername;
    };
  }
});

// node_modules/http2-wrapper/source/auto.js
var require_auto = __commonJS({
  "node_modules/http2-wrapper/source/auto.js"(exports2, module2) {
    "use strict";
    var http = require("http");
    var https = require("https");
    var resolveALPN = require_resolve_alpn();
    var QuickLRU = require_quick_lru();
    var Http2ClientRequest = require_client_request();
    var calculateServerName = require_calculate_server_name();
    var urlToOptions = require_url_to_options();
    var cache = new QuickLRU({ maxSize: 100 });
    var queue = /* @__PURE__ */ new Map();
    var installSocket = (agent, socket, options) => {
      socket._httpMessage = { shouldKeepAlive: true };
      const onFree = () => {
        agent.emit("free", socket, options);
      };
      socket.on("free", onFree);
      const onClose = () => {
        agent.removeSocket(socket, options);
      };
      socket.on("close", onClose);
      const onRemove = () => {
        agent.removeSocket(socket, options);
        socket.off("close", onClose);
        socket.off("free", onFree);
        socket.off("agentRemove", onRemove);
      };
      socket.on("agentRemove", onRemove);
      agent.emit("free", socket, options);
    };
    var resolveProtocol = async (options) => {
      const name = `${options.host}:${options.port}:${options.ALPNProtocols.sort()}`;
      if (!cache.has(name)) {
        if (queue.has(name)) {
          const result = await queue.get(name);
          return result.alpnProtocol;
        }
        const { path, agent } = options;
        options.path = options.socketPath;
        const resultPromise = resolveALPN(options);
        queue.set(name, resultPromise);
        try {
          const { socket, alpnProtocol } = await resultPromise;
          cache.set(name, alpnProtocol);
          options.path = path;
          if (alpnProtocol === "h2") {
            socket.destroy();
          } else {
            const { globalAgent } = https;
            const defaultCreateConnection = https.Agent.prototype.createConnection;
            if (agent) {
              if (agent.createConnection === defaultCreateConnection) {
                installSocket(agent, socket, options);
              } else {
                socket.destroy();
              }
            } else if (globalAgent.createConnection === defaultCreateConnection) {
              installSocket(globalAgent, socket, options);
            } else {
              socket.destroy();
            }
          }
          queue.delete(name);
          return alpnProtocol;
        } catch (error) {
          queue.delete(name);
          throw error;
        }
      }
      return cache.get(name);
    };
    module2.exports = async (input, options, callback) => {
      if (typeof input === "string" || input instanceof URL) {
        input = urlToOptions(new URL(input));
      }
      if (typeof options === "function") {
        callback = options;
        options = void 0;
      }
      options = {
        ALPNProtocols: ["h2", "http/1.1"],
        ...input,
        ...options,
        resolveSocket: true
      };
      if (!Array.isArray(options.ALPNProtocols) || options.ALPNProtocols.length === 0) {
        throw new Error("The `ALPNProtocols` option must be an Array with at least one entry");
      }
      options.protocol = options.protocol || "https:";
      const isHttps = options.protocol === "https:";
      options.host = options.hostname || options.host || "localhost";
      options.session = options.tlsSession;
      options.servername = options.servername || calculateServerName(options);
      options.port = options.port || (isHttps ? 443 : 80);
      options._defaultAgent = isHttps ? https.globalAgent : http.globalAgent;
      const agents = options.agent;
      if (agents) {
        if (agents.addRequest) {
          throw new Error("The `options.agent` object can contain only `http`, `https` or `http2` properties");
        }
        options.agent = agents[isHttps ? "https" : "http"];
      }
      if (isHttps) {
        const protocol = await resolveProtocol(options);
        if (protocol === "h2") {
          if (agents) {
            options.agent = agents.http2;
          }
          return new Http2ClientRequest(options, callback);
        }
      }
      return http.request(options, callback);
    };
    module2.exports.protocolCache = cache;
  }
});

// node_modules/http2-wrapper/source/index.js
var require_source4 = __commonJS({
  "node_modules/http2-wrapper/source/index.js"(exports2, module2) {
    "use strict";
    var http2 = require("http2");
    var agent = require_agent();
    var ClientRequest = require_client_request();
    var IncomingMessage = require_incoming_message();
    var auto = require_auto();
    var request = (url, options, callback) => {
      return new ClientRequest(url, options, callback);
    };
    var get = (url, options, callback) => {
      const req = new ClientRequest(url, options, callback);
      req.end();
      return req;
    };
    module2.exports = {
      ...http2,
      ClientRequest,
      IncomingMessage,
      ...agent,
      request,
      get,
      auto
    };
  }
});

// node_modules/got/dist/source/core/utils/is-form-data.js
var require_is_form_data = __commonJS({
  "node_modules/got/dist/source/core/utils/is-form-data.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var is_1 = require_dist();
    exports2.default = (body) => is_1.default.nodeStream(body) && is_1.default.function_(body.getBoundary);
  }
});

// node_modules/got/dist/source/core/utils/get-body-size.js
var require_get_body_size = __commonJS({
  "node_modules/got/dist/source/core/utils/get-body-size.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs_1 = require("fs");
    var util_1 = require("util");
    var is_1 = require_dist();
    var is_form_data_1 = require_is_form_data();
    var statAsync = util_1.promisify(fs_1.stat);
    exports2.default = async (body, headers) => {
      if (headers && "content-length" in headers) {
        return Number(headers["content-length"]);
      }
      if (!body) {
        return 0;
      }
      if (is_1.default.string(body)) {
        return Buffer.byteLength(body);
      }
      if (is_1.default.buffer(body)) {
        return body.length;
      }
      if (is_form_data_1.default(body)) {
        return util_1.promisify(body.getLength.bind(body))();
      }
      if (body instanceof fs_1.ReadStream) {
        const { size } = await statAsync(body.path);
        if (size === 0) {
          return void 0;
        }
        return size;
      }
      return void 0;
    };
  }
});

// node_modules/got/dist/source/core/utils/proxy-events.js
var require_proxy_events2 = __commonJS({
  "node_modules/got/dist/source/core/utils/proxy-events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function default_1(from, to, events) {
      const fns = {};
      for (const event of events) {
        fns[event] = (...args) => {
          to.emit(event, ...args);
        };
        from.on(event, fns[event]);
      }
      return () => {
        for (const event of events) {
          from.off(event, fns[event]);
        }
      };
    }
    exports2.default = default_1;
  }
});

// node_modules/got/dist/source/core/utils/unhandle.js
var require_unhandle = __commonJS({
  "node_modules/got/dist/source/core/utils/unhandle.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = () => {
      const handlers = [];
      return {
        once(origin, event, fn) {
          origin.once(event, fn);
          handlers.push({ origin, event, fn });
        },
        unhandleAll() {
          for (const handler of handlers) {
            const { origin, event, fn } = handler;
            origin.removeListener(event, fn);
          }
          handlers.length = 0;
        }
      };
    };
  }
});

// node_modules/got/dist/source/core/utils/timed-out.js
var require_timed_out = __commonJS({
  "node_modules/got/dist/source/core/utils/timed-out.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TimeoutError = void 0;
    var net = require("net");
    var unhandle_1 = require_unhandle();
    var reentry = Symbol("reentry");
    var noop = () => {
    };
    var TimeoutError = class extends Error {
      constructor(threshold, event) {
        super(`Timeout awaiting '${event}' for ${threshold}ms`);
        this.event = event;
        this.name = "TimeoutError";
        this.code = "ETIMEDOUT";
      }
    };
    exports2.TimeoutError = TimeoutError;
    exports2.default = (request, delays, options) => {
      if (reentry in request) {
        return noop;
      }
      request[reentry] = true;
      const cancelers = [];
      const { once, unhandleAll } = unhandle_1.default();
      const addTimeout = (delay, callback, event) => {
        var _a;
        const timeout = setTimeout(callback, delay, delay, event);
        (_a = timeout.unref) === null || _a === void 0 ? void 0 : _a.call(timeout);
        const cancel = () => {
          clearTimeout(timeout);
        };
        cancelers.push(cancel);
        return cancel;
      };
      const { host, hostname } = options;
      const timeoutHandler = (delay, event) => {
        request.destroy(new TimeoutError(delay, event));
      };
      const cancelTimeouts = () => {
        for (const cancel of cancelers) {
          cancel();
        }
        unhandleAll();
      };
      request.once("error", (error) => {
        cancelTimeouts();
        if (request.listenerCount("error") === 0) {
          throw error;
        }
      });
      request.once("close", cancelTimeouts);
      once(request, "response", (response) => {
        once(response, "end", cancelTimeouts);
      });
      if (typeof delays.request !== "undefined") {
        addTimeout(delays.request, timeoutHandler, "request");
      }
      if (typeof delays.socket !== "undefined") {
        const socketTimeoutHandler = () => {
          timeoutHandler(delays.socket, "socket");
        };
        request.setTimeout(delays.socket, socketTimeoutHandler);
        cancelers.push(() => {
          request.removeListener("timeout", socketTimeoutHandler);
        });
      }
      once(request, "socket", (socket) => {
        var _a;
        const { socketPath } = request;
        if (socket.connecting) {
          const hasPath = Boolean(socketPath !== null && socketPath !== void 0 ? socketPath : net.isIP((_a = hostname !== null && hostname !== void 0 ? hostname : host) !== null && _a !== void 0 ? _a : "") !== 0);
          if (typeof delays.lookup !== "undefined" && !hasPath && typeof socket.address().address === "undefined") {
            const cancelTimeout = addTimeout(delays.lookup, timeoutHandler, "lookup");
            once(socket, "lookup", cancelTimeout);
          }
          if (typeof delays.connect !== "undefined") {
            const timeConnect = () => addTimeout(delays.connect, timeoutHandler, "connect");
            if (hasPath) {
              once(socket, "connect", timeConnect());
            } else {
              once(socket, "lookup", (error) => {
                if (error === null) {
                  once(socket, "connect", timeConnect());
                }
              });
            }
          }
          if (typeof delays.secureConnect !== "undefined" && options.protocol === "https:") {
            once(socket, "connect", () => {
              const cancelTimeout = addTimeout(delays.secureConnect, timeoutHandler, "secureConnect");
              once(socket, "secureConnect", cancelTimeout);
            });
          }
        }
        if (typeof delays.send !== "undefined") {
          const timeRequest = () => addTimeout(delays.send, timeoutHandler, "send");
          if (socket.connecting) {
            once(socket, "connect", () => {
              once(request, "upload-complete", timeRequest());
            });
          } else {
            once(request, "upload-complete", timeRequest());
          }
        }
      });
      if (typeof delays.response !== "undefined") {
        once(request, "upload-complete", () => {
          const cancelTimeout = addTimeout(delays.response, timeoutHandler, "response");
          once(request, "response", cancelTimeout);
        });
      }
      return cancelTimeouts;
    };
  }
});

// node_modules/got/dist/source/core/utils/url-to-options.js
var require_url_to_options2 = __commonJS({
  "node_modules/got/dist/source/core/utils/url-to-options.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var is_1 = require_dist();
    exports2.default = (url) => {
      url = url;
      const options = {
        protocol: url.protocol,
        hostname: is_1.default.string(url.hostname) && url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname,
        host: url.host,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        href: url.href,
        path: `${url.pathname || ""}${url.search || ""}`
      };
      if (is_1.default.string(url.port) && url.port.length > 0) {
        options.port = Number(url.port);
      }
      if (url.username || url.password) {
        options.auth = `${url.username || ""}:${url.password || ""}`;
      }
      return options;
    };
  }
});

// node_modules/got/dist/source/core/utils/options-to-url.js
var require_options_to_url = __commonJS({
  "node_modules/got/dist/source/core/utils/options-to-url.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var url_1 = require("url");
    var keys = [
      "protocol",
      "host",
      "hostname",
      "port",
      "pathname",
      "search"
    ];
    exports2.default = (origin, options) => {
      var _a, _b;
      if (options.path) {
        if (options.pathname) {
          throw new TypeError("Parameters `path` and `pathname` are mutually exclusive.");
        }
        if (options.search) {
          throw new TypeError("Parameters `path` and `search` are mutually exclusive.");
        }
        if (options.searchParams) {
          throw new TypeError("Parameters `path` and `searchParams` are mutually exclusive.");
        }
      }
      if (options.search && options.searchParams) {
        throw new TypeError("Parameters `search` and `searchParams` are mutually exclusive.");
      }
      if (!origin) {
        if (!options.protocol) {
          throw new TypeError("No URL protocol specified");
        }
        origin = `${options.protocol}//${(_b = (_a = options.hostname) !== null && _a !== void 0 ? _a : options.host) !== null && _b !== void 0 ? _b : ""}`;
      }
      const url = new url_1.URL(origin);
      if (options.path) {
        const searchIndex = options.path.indexOf("?");
        if (searchIndex === -1) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.slice(0, searchIndex);
          options.search = options.path.slice(searchIndex + 1);
        }
        delete options.path;
      }
      for (const key of keys) {
        if (options[key]) {
          url[key] = options[key].toString();
        }
      }
      return url;
    };
  }
});

// node_modules/got/dist/source/core/utils/weakable-map.js
var require_weakable_map = __commonJS({
  "node_modules/got/dist/source/core/utils/weakable-map.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var WeakableMap = class {
      constructor() {
        this.weakMap = /* @__PURE__ */ new WeakMap();
        this.map = /* @__PURE__ */ new Map();
      }
      set(key, value) {
        if (typeof key === "object") {
          this.weakMap.set(key, value);
        } else {
          this.map.set(key, value);
        }
      }
      get(key) {
        if (typeof key === "object") {
          return this.weakMap.get(key);
        }
        return this.map.get(key);
      }
      has(key) {
        if (typeof key === "object") {
          return this.weakMap.has(key);
        }
        return this.map.has(key);
      }
    };
    exports2.default = WeakableMap;
  }
});

// node_modules/got/dist/source/core/utils/get-buffer.js
var require_get_buffer = __commonJS({
  "node_modules/got/dist/source/core/utils/get-buffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var getBuffer = async (stream) => {
      const chunks = [];
      let length = 0;
      for await (const chunk of stream) {
        chunks.push(chunk);
        length += Buffer.byteLength(chunk);
      }
      if (Buffer.isBuffer(chunks[0])) {
        return Buffer.concat(chunks, length);
      }
      return Buffer.from(chunks.join(""));
    };
    exports2.default = getBuffer;
  }
});

// node_modules/got/dist/source/core/utils/dns-ip-version.js
var require_dns_ip_version = __commonJS({
  "node_modules/got/dist/source/core/utils/dns-ip-version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.dnsLookupIpVersionToFamily = exports2.isDnsLookupIpVersion = void 0;
    var conversionTable = {
      auto: 0,
      ipv4: 4,
      ipv6: 6
    };
    exports2.isDnsLookupIpVersion = (value) => {
      return value in conversionTable;
    };
    exports2.dnsLookupIpVersionToFamily = (dnsLookupIpVersion) => {
      if (exports2.isDnsLookupIpVersion(dnsLookupIpVersion)) {
        return conversionTable[dnsLookupIpVersion];
      }
      throw new Error("Invalid DNS lookup IP version");
    };
  }
});

// node_modules/got/dist/source/core/utils/is-response-ok.js
var require_is_response_ok = __commonJS({
  "node_modules/got/dist/source/core/utils/is-response-ok.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isResponseOk = void 0;
    exports2.isResponseOk = (response) => {
      const { statusCode } = response;
      const limitStatusCode = response.request.options.followRedirect ? 299 : 399;
      return statusCode >= 200 && statusCode <= limitStatusCode || statusCode === 304;
    };
  }
});

// node_modules/got/dist/source/utils/deprecation-warning.js
var require_deprecation_warning = __commonJS({
  "node_modules/got/dist/source/utils/deprecation-warning.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var alreadyWarned = /* @__PURE__ */ new Set();
    exports2.default = (message) => {
      if (alreadyWarned.has(message)) {
        return;
      }
      alreadyWarned.add(message);
      process.emitWarning(`Got: ${message}`, {
        type: "DeprecationWarning"
      });
    };
  }
});

// node_modules/got/dist/source/as-promise/normalize-arguments.js
var require_normalize_arguments = __commonJS({
  "node_modules/got/dist/source/as-promise/normalize-arguments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var is_1 = require_dist();
    var normalizeArguments = (options, defaults) => {
      if (is_1.default.null_(options.encoding)) {
        throw new TypeError("To get a Buffer, set `options.responseType` to `buffer` instead");
      }
      is_1.assert.any([is_1.default.string, is_1.default.undefined], options.encoding);
      is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.resolveBodyOnly);
      is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.methodRewriting);
      is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.isStream);
      is_1.assert.any([is_1.default.string, is_1.default.undefined], options.responseType);
      if (options.responseType === void 0) {
        options.responseType = "text";
      }
      const { retry } = options;
      if (defaults) {
        options.retry = { ...defaults.retry };
      } else {
        options.retry = {
          calculateDelay: (retryObject) => retryObject.computedValue,
          limit: 0,
          methods: [],
          statusCodes: [],
          errorCodes: [],
          maxRetryAfter: void 0
        };
      }
      if (is_1.default.object(retry)) {
        options.retry = {
          ...options.retry,
          ...retry
        };
        options.retry.methods = [...new Set(options.retry.methods.map((method) => method.toUpperCase()))];
        options.retry.statusCodes = [...new Set(options.retry.statusCodes)];
        options.retry.errorCodes = [...new Set(options.retry.errorCodes)];
      } else if (is_1.default.number(retry)) {
        options.retry.limit = retry;
      }
      if (is_1.default.undefined(options.retry.maxRetryAfter)) {
        options.retry.maxRetryAfter = Math.min(
          ...[options.timeout.request, options.timeout.connect].filter(is_1.default.number)
        );
      }
      if (is_1.default.object(options.pagination)) {
        if (defaults) {
          options.pagination = {
            ...defaults.pagination,
            ...options.pagination
          };
        }
        const { pagination } = options;
        if (!is_1.default.function_(pagination.transform)) {
          throw new Error("`options.pagination.transform` must be implemented");
        }
        if (!is_1.default.function_(pagination.shouldContinue)) {
          throw new Error("`options.pagination.shouldContinue` must be implemented");
        }
        if (!is_1.default.function_(pagination.filter)) {
          throw new TypeError("`options.pagination.filter` must be implemented");
        }
        if (!is_1.default.function_(pagination.paginate)) {
          throw new Error("`options.pagination.paginate` must be implemented");
        }
      }
      if (options.responseType === "json" && options.headers.accept === void 0) {
        options.headers.accept = "application/json";
      }
      return options;
    };
    exports2.default = normalizeArguments;
  }
});

// node_modules/got/dist/source/core/calculate-retry-delay.js
var require_calculate_retry_delay = __commonJS({
  "node_modules/got/dist/source/core/calculate-retry-delay.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.retryAfterStatusCodes = void 0;
    exports2.retryAfterStatusCodes = /* @__PURE__ */ new Set([413, 429, 503]);
    var calculateRetryDelay = ({ attemptCount, retryOptions, error, retryAfter }) => {
      if (attemptCount > retryOptions.limit) {
        return 0;
      }
      const hasMethod = retryOptions.methods.includes(error.options.method);
      const hasErrorCode = retryOptions.errorCodes.includes(error.code);
      const hasStatusCode = error.response && retryOptions.statusCodes.includes(error.response.statusCode);
      if (!hasMethod || !hasErrorCode && !hasStatusCode) {
        return 0;
      }
      if (error.response) {
        if (retryAfter) {
          if (retryOptions.maxRetryAfter === void 0 || retryAfter > retryOptions.maxRetryAfter) {
            return 0;
          }
          return retryAfter;
        }
        if (error.response.statusCode === 413) {
          return 0;
        }
      }
      const noise = Math.random() * 100;
      return 2 ** (attemptCount - 1) * 1e3 + noise;
    };
    exports2.default = calculateRetryDelay;
  }
});

// node_modules/got/dist/source/core/index.js
var require_core2 = __commonJS({
  "node_modules/got/dist/source/core/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UnsupportedProtocolError = exports2.ReadError = exports2.TimeoutError = exports2.UploadError = exports2.CacheError = exports2.HTTPError = exports2.MaxRedirectsError = exports2.RequestError = exports2.setNonEnumerableProperties = exports2.knownHookEvents = exports2.withoutBody = exports2.kIsNormalizedAlready = void 0;
    var util_1 = require("util");
    var stream_1 = require("stream");
    var fs_1 = require("fs");
    var url_1 = require("url");
    var http = require("http");
    var http_1 = require("http");
    var https = require("https");
    var http_timer_1 = require_source2();
    var cacheable_lookup_1 = require_source3();
    var CacheableRequest = require_src5();
    var decompressResponse = require_decompress_response();
    var http2wrapper = require_source4();
    var lowercaseKeys = require_lowercase_keys();
    var is_1 = require_dist();
    var get_body_size_1 = require_get_body_size();
    var is_form_data_1 = require_is_form_data();
    var proxy_events_1 = require_proxy_events2();
    var timed_out_1 = require_timed_out();
    var url_to_options_1 = require_url_to_options2();
    var options_to_url_1 = require_options_to_url();
    var weakable_map_1 = require_weakable_map();
    var get_buffer_1 = require_get_buffer();
    var dns_ip_version_1 = require_dns_ip_version();
    var is_response_ok_1 = require_is_response_ok();
    var deprecation_warning_1 = require_deprecation_warning();
    var normalize_arguments_1 = require_normalize_arguments();
    var calculate_retry_delay_1 = require_calculate_retry_delay();
    var globalDnsCache;
    var kRequest = Symbol("request");
    var kResponse = Symbol("response");
    var kResponseSize = Symbol("responseSize");
    var kDownloadedSize = Symbol("downloadedSize");
    var kBodySize = Symbol("bodySize");
    var kUploadedSize = Symbol("uploadedSize");
    var kServerResponsesPiped = Symbol("serverResponsesPiped");
    var kUnproxyEvents = Symbol("unproxyEvents");
    var kIsFromCache = Symbol("isFromCache");
    var kCancelTimeouts = Symbol("cancelTimeouts");
    var kStartedReading = Symbol("startedReading");
    var kStopReading = Symbol("stopReading");
    var kTriggerRead = Symbol("triggerRead");
    var kBody = Symbol("body");
    var kJobs = Symbol("jobs");
    var kOriginalResponse = Symbol("originalResponse");
    var kRetryTimeout = Symbol("retryTimeout");
    exports2.kIsNormalizedAlready = Symbol("isNormalizedAlready");
    var supportsBrotli = is_1.default.string(process.versions.brotli);
    exports2.withoutBody = /* @__PURE__ */ new Set(["GET", "HEAD"]);
    exports2.knownHookEvents = [
      "init",
      "beforeRequest",
      "beforeRedirect",
      "beforeError",
      "beforeRetry",
      "afterResponse"
    ];
    function validateSearchParameters(searchParameters) {
      for (const key in searchParameters) {
        const value = searchParameters[key];
        if (!is_1.default.string(value) && !is_1.default.number(value) && !is_1.default.boolean(value) && !is_1.default.null_(value) && !is_1.default.undefined(value)) {
          throw new TypeError(`The \`searchParams\` value '${String(value)}' must be a string, number, boolean or null`);
        }
      }
    }
    function isClientRequest(clientRequest) {
      return is_1.default.object(clientRequest) && !("statusCode" in clientRequest);
    }
    var cacheableStore = new weakable_map_1.default();
    var waitForOpenFile = async (file) => new Promise((resolve, reject) => {
      const onError = (error) => {
        reject(error);
      };
      if (!file.pending) {
        resolve();
      }
      file.once("error", onError);
      file.once("ready", () => {
        file.off("error", onError);
        resolve();
      });
    });
    var redirectCodes = /* @__PURE__ */ new Set([300, 301, 302, 303, 304, 307, 308]);
    var nonEnumerableProperties = [
      "context",
      "body",
      "json",
      "form"
    ];
    exports2.setNonEnumerableProperties = (sources, to) => {
      const properties = {};
      for (const source of sources) {
        if (!source) {
          continue;
        }
        for (const name of nonEnumerableProperties) {
          if (!(name in source)) {
            continue;
          }
          properties[name] = {
            writable: true,
            configurable: true,
            enumerable: false,
            value: source[name]
          };
        }
      }
      Object.defineProperties(to, properties);
    };
    var RequestError = class extends Error {
      constructor(message, error, self) {
        var _a, _b;
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = "RequestError";
        this.code = (_a = error.code) !== null && _a !== void 0 ? _a : "ERR_GOT_REQUEST_ERROR";
        if (self instanceof Request) {
          Object.defineProperty(this, "request", {
            enumerable: false,
            value: self
          });
          Object.defineProperty(this, "response", {
            enumerable: false,
            value: self[kResponse]
          });
          Object.defineProperty(this, "options", {
            enumerable: false,
            value: self.options
          });
        } else {
          Object.defineProperty(this, "options", {
            enumerable: false,
            value: self
          });
        }
        this.timings = (_b = this.request) === null || _b === void 0 ? void 0 : _b.timings;
        if (is_1.default.string(error.stack) && is_1.default.string(this.stack)) {
          const indexOfMessage = this.stack.indexOf(this.message) + this.message.length;
          const thisStackTrace = this.stack.slice(indexOfMessage).split("\n").reverse();
          const errorStackTrace = error.stack.slice(error.stack.indexOf(error.message) + error.message.length).split("\n").reverse();
          while (errorStackTrace.length !== 0 && errorStackTrace[0] === thisStackTrace[0]) {
            thisStackTrace.shift();
          }
          this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace.reverse().join("\n")}${errorStackTrace.reverse().join("\n")}`;
        }
      }
    };
    exports2.RequestError = RequestError;
    var MaxRedirectsError = class extends RequestError {
      constructor(request) {
        super(`Redirected ${request.options.maxRedirects} times. Aborting.`, {}, request);
        this.name = "MaxRedirectsError";
        this.code = "ERR_TOO_MANY_REDIRECTS";
      }
    };
    exports2.MaxRedirectsError = MaxRedirectsError;
    var HTTPError = class extends RequestError {
      constructor(response) {
        super(`Response code ${response.statusCode} (${response.statusMessage})`, {}, response.request);
        this.name = "HTTPError";
        this.code = "ERR_NON_2XX_3XX_RESPONSE";
      }
    };
    exports2.HTTPError = HTTPError;
    var CacheError = class extends RequestError {
      constructor(error, request) {
        super(error.message, error, request);
        this.name = "CacheError";
        this.code = this.code === "ERR_GOT_REQUEST_ERROR" ? "ERR_CACHE_ACCESS" : this.code;
      }
    };
    exports2.CacheError = CacheError;
    var UploadError = class extends RequestError {
      constructor(error, request) {
        super(error.message, error, request);
        this.name = "UploadError";
        this.code = this.code === "ERR_GOT_REQUEST_ERROR" ? "ERR_UPLOAD" : this.code;
      }
    };
    exports2.UploadError = UploadError;
    var TimeoutError = class extends RequestError {
      constructor(error, timings, request) {
        super(error.message, error, request);
        this.name = "TimeoutError";
        this.event = error.event;
        this.timings = timings;
      }
    };
    exports2.TimeoutError = TimeoutError;
    var ReadError = class extends RequestError {
      constructor(error, request) {
        super(error.message, error, request);
        this.name = "ReadError";
        this.code = this.code === "ERR_GOT_REQUEST_ERROR" ? "ERR_READING_RESPONSE_STREAM" : this.code;
      }
    };
    exports2.ReadError = ReadError;
    var UnsupportedProtocolError = class extends RequestError {
      constructor(options) {
        super(`Unsupported protocol "${options.url.protocol}"`, {}, options);
        this.name = "UnsupportedProtocolError";
        this.code = "ERR_UNSUPPORTED_PROTOCOL";
      }
    };
    exports2.UnsupportedProtocolError = UnsupportedProtocolError;
    var proxiedRequestEvents = [
      "socket",
      "connect",
      "continue",
      "information",
      "upgrade",
      "timeout"
    ];
    var Request = class extends stream_1.Duplex {
      constructor(url, options = {}, defaults) {
        super({
          autoDestroy: false,
          highWaterMark: 0
        });
        this[kDownloadedSize] = 0;
        this[kUploadedSize] = 0;
        this.requestInitialized = false;
        this[kServerResponsesPiped] = /* @__PURE__ */ new Set();
        this.redirects = [];
        this[kStopReading] = false;
        this[kTriggerRead] = false;
        this[kJobs] = [];
        this.retryCount = 0;
        this._progressCallbacks = [];
        const unlockWrite = () => this._unlockWrite();
        const lockWrite = () => this._lockWrite();
        this.on("pipe", (source) => {
          source.prependListener("data", unlockWrite);
          source.on("data", lockWrite);
          source.prependListener("end", unlockWrite);
          source.on("end", lockWrite);
        });
        this.on("unpipe", (source) => {
          source.off("data", unlockWrite);
          source.off("data", lockWrite);
          source.off("end", unlockWrite);
          source.off("end", lockWrite);
        });
        this.on("pipe", (source) => {
          if (source instanceof http_1.IncomingMessage) {
            this.options.headers = {
              ...source.headers,
              ...this.options.headers
            };
          }
        });
        const { json, body, form } = options;
        if (json || body || form) {
          this._lockWrite();
        }
        if (exports2.kIsNormalizedAlready in options) {
          this.options = options;
        } else {
          try {
            this.options = this.constructor.normalizeArguments(url, options, defaults);
          } catch (error) {
            if (is_1.default.nodeStream(options.body)) {
              options.body.destroy();
            }
            this.destroy(error);
            return;
          }
        }
        (async () => {
          var _a;
          try {
            if (this.options.body instanceof fs_1.ReadStream) {
              await waitForOpenFile(this.options.body);
            }
            const { url: normalizedURL } = this.options;
            if (!normalizedURL) {
              throw new TypeError("Missing `url` property");
            }
            this.requestUrl = normalizedURL.toString();
            decodeURI(this.requestUrl);
            await this._finalizeBody();
            await this._makeRequest();
            if (this.destroyed) {
              (_a = this[kRequest]) === null || _a === void 0 ? void 0 : _a.destroy();
              return;
            }
            for (const job of this[kJobs]) {
              job();
            }
            this[kJobs].length = 0;
            this.requestInitialized = true;
          } catch (error) {
            if (error instanceof RequestError) {
              this._beforeError(error);
              return;
            }
            if (!this.destroyed) {
              this.destroy(error);
            }
          }
        })();
      }
      static normalizeArguments(url, options, defaults) {
        var _a, _b, _c, _d, _e;
        const rawOptions = options;
        if (is_1.default.object(url) && !is_1.default.urlInstance(url)) {
          options = { ...defaults, ...url, ...options };
        } else {
          if (url && options && options.url !== void 0) {
            throw new TypeError("The `url` option is mutually exclusive with the `input` argument");
          }
          options = { ...defaults, ...options };
          if (url !== void 0) {
            options.url = url;
          }
          if (is_1.default.urlInstance(options.url)) {
            options.url = new url_1.URL(options.url.toString());
          }
        }
        if (options.cache === false) {
          options.cache = void 0;
        }
        if (options.dnsCache === false) {
          options.dnsCache = void 0;
        }
        is_1.assert.any([is_1.default.string, is_1.default.undefined], options.method);
        is_1.assert.any([is_1.default.object, is_1.default.undefined], options.headers);
        is_1.assert.any([is_1.default.string, is_1.default.urlInstance, is_1.default.undefined], options.prefixUrl);
        is_1.assert.any([is_1.default.object, is_1.default.undefined], options.cookieJar);
        is_1.assert.any([is_1.default.object, is_1.default.string, is_1.default.undefined], options.searchParams);
        is_1.assert.any([is_1.default.object, is_1.default.string, is_1.default.undefined], options.cache);
        is_1.assert.any([is_1.default.object, is_1.default.number, is_1.default.undefined], options.timeout);
        is_1.assert.any([is_1.default.object, is_1.default.undefined], options.context);
        is_1.assert.any([is_1.default.object, is_1.default.undefined], options.hooks);
        is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.decompress);
        is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.ignoreInvalidCookies);
        is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.followRedirect);
        is_1.assert.any([is_1.default.number, is_1.default.undefined], options.maxRedirects);
        is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.throwHttpErrors);
        is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.http2);
        is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.allowGetBody);
        is_1.assert.any([is_1.default.string, is_1.default.undefined], options.localAddress);
        is_1.assert.any([dns_ip_version_1.isDnsLookupIpVersion, is_1.default.undefined], options.dnsLookupIpVersion);
        is_1.assert.any([is_1.default.object, is_1.default.undefined], options.https);
        is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.rejectUnauthorized);
        if (options.https) {
          is_1.assert.any([is_1.default.boolean, is_1.default.undefined], options.https.rejectUnauthorized);
          is_1.assert.any([is_1.default.function_, is_1.default.undefined], options.https.checkServerIdentity);
          is_1.assert.any([is_1.default.string, is_1.default.object, is_1.default.array, is_1.default.undefined], options.https.certificateAuthority);
          is_1.assert.any([is_1.default.string, is_1.default.object, is_1.default.array, is_1.default.undefined], options.https.key);
          is_1.assert.any([is_1.default.string, is_1.default.object, is_1.default.array, is_1.default.undefined], options.https.certificate);
          is_1.assert.any([is_1.default.string, is_1.default.undefined], options.https.passphrase);
          is_1.assert.any([is_1.default.string, is_1.default.buffer, is_1.default.array, is_1.default.undefined], options.https.pfx);
        }
        is_1.assert.any([is_1.default.object, is_1.default.undefined], options.cacheOptions);
        if (is_1.default.string(options.method)) {
          options.method = options.method.toUpperCase();
        } else {
          options.method = "GET";
        }
        if (options.headers === (defaults === null || defaults === void 0 ? void 0 : defaults.headers)) {
          options.headers = { ...options.headers };
        } else {
          options.headers = lowercaseKeys({ ...defaults === null || defaults === void 0 ? void 0 : defaults.headers, ...options.headers });
        }
        if ("slashes" in options) {
          throw new TypeError("The legacy `url.Url` has been deprecated. Use `URL` instead.");
        }
        if ("auth" in options) {
          throw new TypeError("Parameter `auth` is deprecated. Use `username` / `password` instead.");
        }
        if ("searchParams" in options) {
          if (options.searchParams && options.searchParams !== (defaults === null || defaults === void 0 ? void 0 : defaults.searchParams)) {
            let searchParameters;
            if (is_1.default.string(options.searchParams) || options.searchParams instanceof url_1.URLSearchParams) {
              searchParameters = new url_1.URLSearchParams(options.searchParams);
            } else {
              validateSearchParameters(options.searchParams);
              searchParameters = new url_1.URLSearchParams();
              for (const key in options.searchParams) {
                const value = options.searchParams[key];
                if (value === null) {
                  searchParameters.append(key, "");
                } else if (value !== void 0) {
                  searchParameters.append(key, value);
                }
              }
            }
            (_a = defaults === null || defaults === void 0 ? void 0 : defaults.searchParams) === null || _a === void 0 ? void 0 : _a.forEach((value, key) => {
              if (!searchParameters.has(key)) {
                searchParameters.append(key, value);
              }
            });
            options.searchParams = searchParameters;
          }
        }
        options.username = (_b = options.username) !== null && _b !== void 0 ? _b : "";
        options.password = (_c = options.password) !== null && _c !== void 0 ? _c : "";
        if (is_1.default.undefined(options.prefixUrl)) {
          options.prefixUrl = (_d = defaults === null || defaults === void 0 ? void 0 : defaults.prefixUrl) !== null && _d !== void 0 ? _d : "";
        } else {
          options.prefixUrl = options.prefixUrl.toString();
          if (options.prefixUrl !== "" && !options.prefixUrl.endsWith("/")) {
            options.prefixUrl += "/";
          }
        }
        if (is_1.default.string(options.url)) {
          if (options.url.startsWith("/")) {
            throw new Error("`input` must not start with a slash when using `prefixUrl`");
          }
          options.url = options_to_url_1.default(options.prefixUrl + options.url, options);
        } else if (is_1.default.undefined(options.url) && options.prefixUrl !== "" || options.protocol) {
          options.url = options_to_url_1.default(options.prefixUrl, options);
        }
        if (options.url) {
          if ("port" in options) {
            delete options.port;
          }
          let { prefixUrl } = options;
          Object.defineProperty(options, "prefixUrl", {
            set: (value) => {
              const url2 = options.url;
              if (!url2.href.startsWith(value)) {
                throw new Error(`Cannot change \`prefixUrl\` from ${prefixUrl} to ${value}: ${url2.href}`);
              }
              options.url = new url_1.URL(value + url2.href.slice(prefixUrl.length));
              prefixUrl = value;
            },
            get: () => prefixUrl
          });
          let { protocol } = options.url;
          if (protocol === "unix:") {
            protocol = "http:";
            options.url = new url_1.URL(`http://unix${options.url.pathname}${options.url.search}`);
          }
          if (options.searchParams) {
            options.url.search = options.searchParams.toString();
          }
          if (protocol !== "http:" && protocol !== "https:") {
            throw new UnsupportedProtocolError(options);
          }
          if (options.username === "") {
            options.username = options.url.username;
          } else {
            options.url.username = options.username;
          }
          if (options.password === "") {
            options.password = options.url.password;
          } else {
            options.url.password = options.password;
          }
        }
        const { cookieJar } = options;
        if (cookieJar) {
          let { setCookie, getCookieString } = cookieJar;
          is_1.assert.function_(setCookie);
          is_1.assert.function_(getCookieString);
          if (setCookie.length === 4 && getCookieString.length === 0) {
            setCookie = util_1.promisify(setCookie.bind(options.cookieJar));
            getCookieString = util_1.promisify(getCookieString.bind(options.cookieJar));
            options.cookieJar = {
              setCookie,
              getCookieString
            };
          }
        }
        const { cache } = options;
        if (cache) {
          if (!cacheableStore.has(cache)) {
            cacheableStore.set(cache, new CacheableRequest((requestOptions, handler) => {
              const result = requestOptions[kRequest](requestOptions, handler);
              if (is_1.default.promise(result)) {
                result.once = (event, handler2) => {
                  if (event === "error") {
                    result.catch(handler2);
                  } else if (event === "abort") {
                    (async () => {
                      try {
                        const request = await result;
                        request.once("abort", handler2);
                      } catch (_a2) {
                      }
                    })();
                  } else {
                    throw new Error(`Unknown HTTP2 promise event: ${event}`);
                  }
                  return result;
                };
              }
              return result;
            }, cache));
          }
        }
        options.cacheOptions = { ...options.cacheOptions };
        if (options.dnsCache === true) {
          if (!globalDnsCache) {
            globalDnsCache = new cacheable_lookup_1.default();
          }
          options.dnsCache = globalDnsCache;
        } else if (!is_1.default.undefined(options.dnsCache) && !options.dnsCache.lookup) {
          throw new TypeError(`Parameter \`dnsCache\` must be a CacheableLookup instance or a boolean, got ${is_1.default(options.dnsCache)}`);
        }
        if (is_1.default.number(options.timeout)) {
          options.timeout = { request: options.timeout };
        } else if (defaults && options.timeout !== defaults.timeout) {
          options.timeout = {
            ...defaults.timeout,
            ...options.timeout
          };
        } else {
          options.timeout = { ...options.timeout };
        }
        if (!options.context) {
          options.context = {};
        }
        const areHooksDefault = options.hooks === (defaults === null || defaults === void 0 ? void 0 : defaults.hooks);
        options.hooks = { ...options.hooks };
        for (const event of exports2.knownHookEvents) {
          if (event in options.hooks) {
            if (is_1.default.array(options.hooks[event])) {
              options.hooks[event] = [...options.hooks[event]];
            } else {
              throw new TypeError(`Parameter \`${event}\` must be an Array, got ${is_1.default(options.hooks[event])}`);
            }
          } else {
            options.hooks[event] = [];
          }
        }
        if (defaults && !areHooksDefault) {
          for (const event of exports2.knownHookEvents) {
            const defaultHooks = defaults.hooks[event];
            if (defaultHooks.length > 0) {
              options.hooks[event] = [
                ...defaults.hooks[event],
                ...options.hooks[event]
              ];
            }
          }
        }
        if ("family" in options) {
          deprecation_warning_1.default('"options.family" was never documented, please use "options.dnsLookupIpVersion"');
        }
        if (defaults === null || defaults === void 0 ? void 0 : defaults.https) {
          options.https = { ...defaults.https, ...options.https };
        }
        if ("rejectUnauthorized" in options) {
          deprecation_warning_1.default('"options.rejectUnauthorized" is now deprecated, please use "options.https.rejectUnauthorized"');
        }
        if ("checkServerIdentity" in options) {
          deprecation_warning_1.default('"options.checkServerIdentity" was never documented, please use "options.https.checkServerIdentity"');
        }
        if ("ca" in options) {
          deprecation_warning_1.default('"options.ca" was never documented, please use "options.https.certificateAuthority"');
        }
        if ("key" in options) {
          deprecation_warning_1.default('"options.key" was never documented, please use "options.https.key"');
        }
        if ("cert" in options) {
          deprecation_warning_1.default('"options.cert" was never documented, please use "options.https.certificate"');
        }
        if ("passphrase" in options) {
          deprecation_warning_1.default('"options.passphrase" was never documented, please use "options.https.passphrase"');
        }
        if ("pfx" in options) {
          deprecation_warning_1.default('"options.pfx" was never documented, please use "options.https.pfx"');
        }
        if ("followRedirects" in options) {
          throw new TypeError("The `followRedirects` option does not exist. Use `followRedirect` instead.");
        }
        if (options.agent) {
          for (const key in options.agent) {
            if (key !== "http" && key !== "https" && key !== "http2") {
              throw new TypeError(`Expected the \`options.agent\` properties to be \`http\`, \`https\` or \`http2\`, got \`${key}\``);
            }
          }
        }
        options.maxRedirects = (_e = options.maxRedirects) !== null && _e !== void 0 ? _e : 0;
        exports2.setNonEnumerableProperties([defaults, rawOptions], options);
        return normalize_arguments_1.default(options, defaults);
      }
      _lockWrite() {
        const onLockedWrite = () => {
          throw new TypeError("The payload has been already provided");
        };
        this.write = onLockedWrite;
        this.end = onLockedWrite;
      }
      _unlockWrite() {
        this.write = super.write;
        this.end = super.end;
      }
      async _finalizeBody() {
        const { options } = this;
        const { headers } = options;
        const isForm = !is_1.default.undefined(options.form);
        const isJSON = !is_1.default.undefined(options.json);
        const isBody = !is_1.default.undefined(options.body);
        const hasPayload = isForm || isJSON || isBody;
        const cannotHaveBody = exports2.withoutBody.has(options.method) && !(options.method === "GET" && options.allowGetBody);
        this._cannotHaveBody = cannotHaveBody;
        if (hasPayload) {
          if (cannotHaveBody) {
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
          }
          if ([isBody, isForm, isJSON].filter((isTrue) => isTrue).length > 1) {
            throw new TypeError("The `body`, `json` and `form` options are mutually exclusive");
          }
          if (isBody && !(options.body instanceof stream_1.Readable) && !is_1.default.string(options.body) && !is_1.default.buffer(options.body) && !is_form_data_1.default(options.body)) {
            throw new TypeError("The `body` option must be a stream.Readable, string or Buffer");
          }
          if (isForm && !is_1.default.object(options.form)) {
            throw new TypeError("The `form` option must be an Object");
          }
          {
            const noContentType = !is_1.default.string(headers["content-type"]);
            if (isBody) {
              if (is_form_data_1.default(options.body) && noContentType) {
                headers["content-type"] = `multipart/form-data; boundary=${options.body.getBoundary()}`;
              }
              this[kBody] = options.body;
            } else if (isForm) {
              if (noContentType) {
                headers["content-type"] = "application/x-www-form-urlencoded";
              }
              this[kBody] = new url_1.URLSearchParams(options.form).toString();
            } else {
              if (noContentType) {
                headers["content-type"] = "application/json";
              }
              this[kBody] = options.stringifyJson(options.json);
            }
            const uploadBodySize = await get_body_size_1.default(this[kBody], options.headers);
            if (is_1.default.undefined(headers["content-length"]) && is_1.default.undefined(headers["transfer-encoding"])) {
              if (!cannotHaveBody && !is_1.default.undefined(uploadBodySize)) {
                headers["content-length"] = String(uploadBodySize);
              }
            }
          }
        } else if (cannotHaveBody) {
          this._lockWrite();
        } else {
          this._unlockWrite();
        }
        this[kBodySize] = Number(headers["content-length"]) || void 0;
      }
      async _onResponseBase(response) {
        const { options } = this;
        const { url } = options;
        this[kOriginalResponse] = response;
        if (options.decompress) {
          response = decompressResponse(response);
        }
        const statusCode = response.statusCode;
        const typedResponse = response;
        typedResponse.statusMessage = typedResponse.statusMessage ? typedResponse.statusMessage : http.STATUS_CODES[statusCode];
        typedResponse.url = options.url.toString();
        typedResponse.requestUrl = this.requestUrl;
        typedResponse.redirectUrls = this.redirects;
        typedResponse.request = this;
        typedResponse.isFromCache = response.fromCache || false;
        typedResponse.ip = this.ip;
        typedResponse.retryCount = this.retryCount;
        this[kIsFromCache] = typedResponse.isFromCache;
        this[kResponseSize] = Number(response.headers["content-length"]) || void 0;
        this[kResponse] = response;
        response.once("end", () => {
          this[kResponseSize] = this[kDownloadedSize];
          this.emit("downloadProgress", this.downloadProgress);
        });
        response.once("error", (error) => {
          response.destroy();
          this._beforeError(new ReadError(error, this));
        });
        response.once("aborted", () => {
          this._beforeError(new ReadError({
            name: "Error",
            message: "The server aborted pending request",
            code: "ECONNRESET"
          }, this));
        });
        this.emit("downloadProgress", this.downloadProgress);
        const rawCookies = response.headers["set-cookie"];
        if (is_1.default.object(options.cookieJar) && rawCookies) {
          let promises = rawCookies.map(async (rawCookie) => options.cookieJar.setCookie(rawCookie, url.toString()));
          if (options.ignoreInvalidCookies) {
            promises = promises.map(async (p) => p.catch(() => {
            }));
          }
          try {
            await Promise.all(promises);
          } catch (error) {
            this._beforeError(error);
            return;
          }
        }
        if (options.followRedirect && response.headers.location && redirectCodes.has(statusCode)) {
          response.resume();
          if (this[kRequest]) {
            this[kCancelTimeouts]();
            delete this[kRequest];
            this[kUnproxyEvents]();
          }
          const shouldBeGet = statusCode === 303 && options.method !== "GET" && options.method !== "HEAD";
          if (shouldBeGet || !options.methodRewriting) {
            options.method = "GET";
            if ("body" in options) {
              delete options.body;
            }
            if ("json" in options) {
              delete options.json;
            }
            if ("form" in options) {
              delete options.form;
            }
            this[kBody] = void 0;
            delete options.headers["content-length"];
          }
          if (this.redirects.length >= options.maxRedirects) {
            this._beforeError(new MaxRedirectsError(this));
            return;
          }
          try {
            let isUnixSocketURL = function(url2) {
              return url2.protocol === "unix:" || url2.hostname === "unix";
            };
            const redirectBuffer = Buffer.from(response.headers.location, "binary").toString();
            const redirectUrl = new url_1.URL(redirectBuffer, url);
            const redirectString = redirectUrl.toString();
            decodeURI(redirectString);
            if (!isUnixSocketURL(url) && isUnixSocketURL(redirectUrl)) {
              this._beforeError(new RequestError("Cannot redirect to UNIX socket", {}, this));
              return;
            }
            if (redirectUrl.hostname !== url.hostname || redirectUrl.port !== url.port) {
              if ("host" in options.headers) {
                delete options.headers.host;
              }
              if ("cookie" in options.headers) {
                delete options.headers.cookie;
              }
              if ("authorization" in options.headers) {
                delete options.headers.authorization;
              }
              if (options.username || options.password) {
                options.username = "";
                options.password = "";
              }
            } else {
              redirectUrl.username = options.username;
              redirectUrl.password = options.password;
            }
            this.redirects.push(redirectString);
            options.url = redirectUrl;
            for (const hook of options.hooks.beforeRedirect) {
              await hook(options, typedResponse);
            }
            this.emit("redirect", typedResponse, options);
            await this._makeRequest();
          } catch (error) {
            this._beforeError(error);
            return;
          }
          return;
        }
        if (options.isStream && options.throwHttpErrors && !is_response_ok_1.isResponseOk(typedResponse)) {
          this._beforeError(new HTTPError(typedResponse));
          return;
        }
        response.on("readable", () => {
          if (this[kTriggerRead]) {
            this._read();
          }
        });
        this.on("resume", () => {
          response.resume();
        });
        this.on("pause", () => {
          response.pause();
        });
        response.once("end", () => {
          this.push(null);
        });
        this.emit("response", response);
        for (const destination of this[kServerResponsesPiped]) {
          if (destination.headersSent) {
            continue;
          }
          for (const key in response.headers) {
            const isAllowed = options.decompress ? key !== "content-encoding" : true;
            const value = response.headers[key];
            if (isAllowed) {
              destination.setHeader(key, value);
            }
          }
          destination.statusCode = statusCode;
        }
      }
      async _onResponse(response) {
        try {
          await this._onResponseBase(response);
        } catch (error) {
          this._beforeError(error);
        }
      }
      _onRequest(request) {
        const { options } = this;
        const { timeout, url } = options;
        http_timer_1.default(request);
        this[kCancelTimeouts] = timed_out_1.default(request, timeout, url);
        const responseEventName = options.cache ? "cacheableResponse" : "response";
        request.once(responseEventName, (response) => {
          void this._onResponse(response);
        });
        request.once("error", (error) => {
          var _a;
          request.destroy();
          (_a = request.res) === null || _a === void 0 ? void 0 : _a.removeAllListeners("end");
          error = error instanceof timed_out_1.TimeoutError ? new TimeoutError(error, this.timings, this) : new RequestError(error.message, error, this);
          this._beforeError(error);
        });
        this[kUnproxyEvents] = proxy_events_1.default(request, this, proxiedRequestEvents);
        this[kRequest] = request;
        this.emit("uploadProgress", this.uploadProgress);
        const body = this[kBody];
        const currentRequest = this.redirects.length === 0 ? this : request;
        if (is_1.default.nodeStream(body)) {
          body.pipe(currentRequest);
          body.once("error", (error) => {
            this._beforeError(new UploadError(error, this));
          });
        } else {
          this._unlockWrite();
          if (!is_1.default.undefined(body)) {
            this._writeRequest(body, void 0, () => {
            });
            currentRequest.end();
            this._lockWrite();
          } else if (this._cannotHaveBody || this._noPipe) {
            currentRequest.end();
            this._lockWrite();
          }
        }
        this.emit("request", request);
      }
      async _createCacheableRequest(url, options) {
        return new Promise((resolve, reject) => {
          Object.assign(options, url_to_options_1.default(url));
          delete options.url;
          let request;
          const cacheRequest = cacheableStore.get(options.cache)(options, async (response) => {
            response._readableState.autoDestroy = false;
            if (request) {
              (await request).emit("cacheableResponse", response);
            }
            resolve(response);
          });
          options.url = url;
          cacheRequest.once("error", reject);
          cacheRequest.once("request", async (requestOrPromise) => {
            request = requestOrPromise;
            resolve(request);
          });
        });
      }
      async _makeRequest() {
        var _a, _b, _c, _d, _e;
        const { options } = this;
        const { headers } = options;
        for (const key in headers) {
          if (is_1.default.undefined(headers[key])) {
            delete headers[key];
          } else if (is_1.default.null_(headers[key])) {
            throw new TypeError(`Use \`undefined\` instead of \`null\` to delete the \`${key}\` header`);
          }
        }
        if (options.decompress && is_1.default.undefined(headers["accept-encoding"])) {
          headers["accept-encoding"] = supportsBrotli ? "gzip, deflate, br" : "gzip, deflate";
        }
        if (options.cookieJar) {
          const cookieString = await options.cookieJar.getCookieString(options.url.toString());
          if (is_1.default.nonEmptyString(cookieString)) {
            options.headers.cookie = cookieString;
          }
        }
        for (const hook of options.hooks.beforeRequest) {
          const result = await hook(options);
          if (!is_1.default.undefined(result)) {
            options.request = () => result;
            break;
          }
        }
        if (options.body && this[kBody] !== options.body) {
          this[kBody] = options.body;
        }
        const { agent, request, timeout, url } = options;
        if (options.dnsCache && !("lookup" in options)) {
          options.lookup = options.dnsCache.lookup;
        }
        if (url.hostname === "unix") {
          const matches = /(?<socketPath>.+?):(?<path>.+)/.exec(`${url.pathname}${url.search}`);
          if (matches === null || matches === void 0 ? void 0 : matches.groups) {
            const { socketPath, path } = matches.groups;
            Object.assign(options, {
              socketPath,
              path,
              host: ""
            });
          }
        }
        const isHttps = url.protocol === "https:";
        let fallbackFn;
        if (options.http2) {
          fallbackFn = http2wrapper.auto;
        } else {
          fallbackFn = isHttps ? https.request : http.request;
        }
        const realFn = (_a = options.request) !== null && _a !== void 0 ? _a : fallbackFn;
        const fn = options.cache ? this._createCacheableRequest : realFn;
        if (agent && !options.http2) {
          options.agent = agent[isHttps ? "https" : "http"];
        }
        options[kRequest] = realFn;
        delete options.request;
        delete options.timeout;
        const requestOptions = options;
        requestOptions.shared = (_b = options.cacheOptions) === null || _b === void 0 ? void 0 : _b.shared;
        requestOptions.cacheHeuristic = (_c = options.cacheOptions) === null || _c === void 0 ? void 0 : _c.cacheHeuristic;
        requestOptions.immutableMinTimeToLive = (_d = options.cacheOptions) === null || _d === void 0 ? void 0 : _d.immutableMinTimeToLive;
        requestOptions.ignoreCargoCult = (_e = options.cacheOptions) === null || _e === void 0 ? void 0 : _e.ignoreCargoCult;
        if (options.dnsLookupIpVersion !== void 0) {
          try {
            requestOptions.family = dns_ip_version_1.dnsLookupIpVersionToFamily(options.dnsLookupIpVersion);
          } catch (_f) {
            throw new Error("Invalid `dnsLookupIpVersion` option value");
          }
        }
        if (options.https) {
          if ("rejectUnauthorized" in options.https) {
            requestOptions.rejectUnauthorized = options.https.rejectUnauthorized;
          }
          if (options.https.checkServerIdentity) {
            requestOptions.checkServerIdentity = options.https.checkServerIdentity;
          }
          if (options.https.certificateAuthority) {
            requestOptions.ca = options.https.certificateAuthority;
          }
          if (options.https.certificate) {
            requestOptions.cert = options.https.certificate;
          }
          if (options.https.key) {
            requestOptions.key = options.https.key;
          }
          if (options.https.passphrase) {
            requestOptions.passphrase = options.https.passphrase;
          }
          if (options.https.pfx) {
            requestOptions.pfx = options.https.pfx;
          }
        }
        try {
          let requestOrResponse = await fn(url, requestOptions);
          if (is_1.default.undefined(requestOrResponse)) {
            requestOrResponse = fallbackFn(url, requestOptions);
          }
          options.request = request;
          options.timeout = timeout;
          options.agent = agent;
          if (options.https) {
            if ("rejectUnauthorized" in options.https) {
              delete requestOptions.rejectUnauthorized;
            }
            if (options.https.checkServerIdentity) {
              delete requestOptions.checkServerIdentity;
            }
            if (options.https.certificateAuthority) {
              delete requestOptions.ca;
            }
            if (options.https.certificate) {
              delete requestOptions.cert;
            }
            if (options.https.key) {
              delete requestOptions.key;
            }
            if (options.https.passphrase) {
              delete requestOptions.passphrase;
            }
            if (options.https.pfx) {
              delete requestOptions.pfx;
            }
          }
          if (isClientRequest(requestOrResponse)) {
            this._onRequest(requestOrResponse);
          } else if (this.writable) {
            this.once("finish", () => {
              void this._onResponse(requestOrResponse);
            });
            this._unlockWrite();
            this.end();
            this._lockWrite();
          } else {
            void this._onResponse(requestOrResponse);
          }
        } catch (error) {
          if (error instanceof CacheableRequest.CacheError) {
            throw new CacheError(error, this);
          }
          throw new RequestError(error.message, error, this);
        }
      }
      async _error(error) {
        try {
          for (const hook of this.options.hooks.beforeError) {
            error = await hook(error);
          }
        } catch (error_) {
          error = new RequestError(error_.message, error_, this);
        }
        this.destroy(error);
      }
      _beforeError(error) {
        if (this[kStopReading]) {
          return;
        }
        const { options } = this;
        const retryCount = this.retryCount + 1;
        this[kStopReading] = true;
        if (!(error instanceof RequestError)) {
          error = new RequestError(error.message, error, this);
        }
        const typedError = error;
        const { response } = typedError;
        void (async () => {
          if (response && !response.body) {
            response.setEncoding(this._readableState.encoding);
            try {
              response.rawBody = await get_buffer_1.default(response);
              response.body = response.rawBody.toString();
            } catch (_a) {
            }
          }
          if (this.listenerCount("retry") !== 0) {
            let backoff;
            try {
              let retryAfter;
              if (response && "retry-after" in response.headers) {
                retryAfter = Number(response.headers["retry-after"]);
                if (Number.isNaN(retryAfter)) {
                  retryAfter = Date.parse(response.headers["retry-after"]) - Date.now();
                  if (retryAfter <= 0) {
                    retryAfter = 1;
                  }
                } else {
                  retryAfter *= 1e3;
                }
              }
              backoff = await options.retry.calculateDelay({
                attemptCount: retryCount,
                retryOptions: options.retry,
                error: typedError,
                retryAfter,
                computedValue: calculate_retry_delay_1.default({
                  attemptCount: retryCount,
                  retryOptions: options.retry,
                  error: typedError,
                  retryAfter,
                  computedValue: 0
                })
              });
            } catch (error_) {
              void this._error(new RequestError(error_.message, error_, this));
              return;
            }
            if (backoff) {
              const retry = async () => {
                try {
                  for (const hook of this.options.hooks.beforeRetry) {
                    await hook(this.options, typedError, retryCount);
                  }
                } catch (error_) {
                  void this._error(new RequestError(error_.message, error, this));
                  return;
                }
                if (this.destroyed) {
                  return;
                }
                this.destroy();
                this.emit("retry", retryCount, error);
              };
              this[kRetryTimeout] = setTimeout(retry, backoff);
              return;
            }
          }
          void this._error(typedError);
        })();
      }
      _read() {
        this[kTriggerRead] = true;
        const response = this[kResponse];
        if (response && !this[kStopReading]) {
          if (response.readableLength) {
            this[kTriggerRead] = false;
          }
          let data;
          while ((data = response.read()) !== null) {
            this[kDownloadedSize] += data.length;
            this[kStartedReading] = true;
            const progress = this.downloadProgress;
            if (progress.percent < 1) {
              this.emit("downloadProgress", progress);
            }
            this.push(data);
          }
        }
      }
      _write(chunk, encoding, callback) {
        const write = () => {
          this._writeRequest(chunk, encoding, callback);
        };
        if (this.requestInitialized) {
          write();
        } else {
          this[kJobs].push(write);
        }
      }
      _writeRequest(chunk, encoding, callback) {
        if (this[kRequest].destroyed) {
          return;
        }
        this._progressCallbacks.push(() => {
          this[kUploadedSize] += Buffer.byteLength(chunk, encoding);
          const progress = this.uploadProgress;
          if (progress.percent < 1) {
            this.emit("uploadProgress", progress);
          }
        });
        this[kRequest].write(chunk, encoding, (error) => {
          if (!error && this._progressCallbacks.length > 0) {
            this._progressCallbacks.shift()();
          }
          callback(error);
        });
      }
      _final(callback) {
        const endRequest = () => {
          while (this._progressCallbacks.length !== 0) {
            this._progressCallbacks.shift()();
          }
          if (!(kRequest in this)) {
            callback();
            return;
          }
          if (this[kRequest].destroyed) {
            callback();
            return;
          }
          this[kRequest].end((error) => {
            if (!error) {
              this[kBodySize] = this[kUploadedSize];
              this.emit("uploadProgress", this.uploadProgress);
              this[kRequest].emit("upload-complete");
            }
            callback(error);
          });
        };
        if (this.requestInitialized) {
          endRequest();
        } else {
          this[kJobs].push(endRequest);
        }
      }
      _destroy(error, callback) {
        var _a;
        this[kStopReading] = true;
        clearTimeout(this[kRetryTimeout]);
        if (kRequest in this) {
          this[kCancelTimeouts]();
          if (!((_a = this[kResponse]) === null || _a === void 0 ? void 0 : _a.complete)) {
            this[kRequest].destroy();
          }
        }
        if (error !== null && !is_1.default.undefined(error) && !(error instanceof RequestError)) {
          error = new RequestError(error.message, error, this);
        }
        callback(error);
      }
      get _isAboutToError() {
        return this[kStopReading];
      }
      get ip() {
        var _a;
        return (_a = this.socket) === null || _a === void 0 ? void 0 : _a.remoteAddress;
      }
      get aborted() {
        var _a, _b, _c;
        return ((_b = (_a = this[kRequest]) === null || _a === void 0 ? void 0 : _a.destroyed) !== null && _b !== void 0 ? _b : this.destroyed) && !((_c = this[kOriginalResponse]) === null || _c === void 0 ? void 0 : _c.complete);
      }
      get socket() {
        var _a, _b;
        return (_b = (_a = this[kRequest]) === null || _a === void 0 ? void 0 : _a.socket) !== null && _b !== void 0 ? _b : void 0;
      }
      get downloadProgress() {
        let percent;
        if (this[kResponseSize]) {
          percent = this[kDownloadedSize] / this[kResponseSize];
        } else if (this[kResponseSize] === this[kDownloadedSize]) {
          percent = 1;
        } else {
          percent = 0;
        }
        return {
          percent,
          transferred: this[kDownloadedSize],
          total: this[kResponseSize]
        };
      }
      get uploadProgress() {
        let percent;
        if (this[kBodySize]) {
          percent = this[kUploadedSize] / this[kBodySize];
        } else if (this[kBodySize] === this[kUploadedSize]) {
          percent = 1;
        } else {
          percent = 0;
        }
        return {
          percent,
          transferred: this[kUploadedSize],
          total: this[kBodySize]
        };
      }
      get timings() {
        var _a;
        return (_a = this[kRequest]) === null || _a === void 0 ? void 0 : _a.timings;
      }
      get isFromCache() {
        return this[kIsFromCache];
      }
      pipe(destination, options) {
        if (this[kStartedReading]) {
          throw new Error("Failed to pipe. The response has been emitted already.");
        }
        if (destination instanceof http_1.ServerResponse) {
          this[kServerResponsesPiped].add(destination);
        }
        return super.pipe(destination, options);
      }
      unpipe(destination) {
        if (destination instanceof http_1.ServerResponse) {
          this[kServerResponsesPiped].delete(destination);
        }
        super.unpipe(destination);
        return this;
      }
    };
    exports2.default = Request;
  }
});

// node_modules/got/dist/source/as-promise/types.js
var require_types = __commonJS({
  "node_modules/got/dist/source/as-promise/types.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CancelError = exports2.ParseError = void 0;
    var core_1 = require_core2();
    var ParseError = class extends core_1.RequestError {
      constructor(error, response) {
        const { options } = response.request;
        super(`${error.message} in "${options.url.toString()}"`, error, response.request);
        this.name = "ParseError";
        this.code = this.code === "ERR_GOT_REQUEST_ERROR" ? "ERR_BODY_PARSE_FAILURE" : this.code;
      }
    };
    exports2.ParseError = ParseError;
    var CancelError = class extends core_1.RequestError {
      constructor(request) {
        super("Promise was canceled", {}, request);
        this.name = "CancelError";
        this.code = "ERR_CANCELED";
      }
      get isCanceled() {
        return true;
      }
    };
    exports2.CancelError = CancelError;
    __exportStar(require_core2(), exports2);
  }
});

// node_modules/got/dist/source/as-promise/parse-body.js
var require_parse_body = __commonJS({
  "node_modules/got/dist/source/as-promise/parse-body.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var types_1 = require_types();
    var parseBody = (response, responseType, parseJson, encoding) => {
      const { rawBody } = response;
      try {
        if (responseType === "text") {
          return rawBody.toString(encoding);
        }
        if (responseType === "json") {
          return rawBody.length === 0 ? "" : parseJson(rawBody.toString());
        }
        if (responseType === "buffer") {
          return rawBody;
        }
        throw new types_1.ParseError({
          message: `Unknown body type '${responseType}'`,
          name: "Error"
        }, response);
      } catch (error) {
        throw new types_1.ParseError(error, response);
      }
    };
    exports2.default = parseBody;
  }
});

// node_modules/got/dist/source/as-promise/index.js
var require_as_promise = __commonJS({
  "node_modules/got/dist/source/as-promise/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var events_1 = require("events");
    var is_1 = require_dist();
    var PCancelable = require_p_cancelable();
    var types_1 = require_types();
    var parse_body_1 = require_parse_body();
    var core_1 = require_core2();
    var proxy_events_1 = require_proxy_events2();
    var get_buffer_1 = require_get_buffer();
    var is_response_ok_1 = require_is_response_ok();
    var proxiedRequestEvents = [
      "request",
      "response",
      "redirect",
      "uploadProgress",
      "downloadProgress"
    ];
    function asPromise(normalizedOptions) {
      let globalRequest;
      let globalResponse;
      const emitter = new events_1.EventEmitter();
      const promise = new PCancelable((resolve, reject, onCancel) => {
        const makeRequest = (retryCount) => {
          const request = new core_1.default(void 0, normalizedOptions);
          request.retryCount = retryCount;
          request._noPipe = true;
          onCancel(() => request.destroy());
          onCancel.shouldReject = false;
          onCancel(() => reject(new types_1.CancelError(request)));
          globalRequest = request;
          request.once("response", async (response) => {
            var _a;
            response.retryCount = retryCount;
            if (response.request.aborted) {
              return;
            }
            let rawBody;
            try {
              rawBody = await get_buffer_1.default(request);
              response.rawBody = rawBody;
            } catch (_b) {
              return;
            }
            if (request._isAboutToError) {
              return;
            }
            const contentEncoding = ((_a = response.headers["content-encoding"]) !== null && _a !== void 0 ? _a : "").toLowerCase();
            const isCompressed = ["gzip", "deflate", "br"].includes(contentEncoding);
            const { options } = request;
            if (isCompressed && !options.decompress) {
              response.body = rawBody;
            } else {
              try {
                response.body = parse_body_1.default(response, options.responseType, options.parseJson, options.encoding);
              } catch (error) {
                response.body = rawBody.toString();
                if (is_response_ok_1.isResponseOk(response)) {
                  request._beforeError(error);
                  return;
                }
              }
            }
            try {
              for (const [index, hook] of options.hooks.afterResponse.entries()) {
                response = await hook(response, async (updatedOptions) => {
                  const typedOptions = core_1.default.normalizeArguments(void 0, {
                    ...updatedOptions,
                    retry: {
                      calculateDelay: () => 0
                    },
                    throwHttpErrors: false,
                    resolveBodyOnly: false
                  }, options);
                  typedOptions.hooks.afterResponse = typedOptions.hooks.afterResponse.slice(0, index);
                  for (const hook2 of typedOptions.hooks.beforeRetry) {
                    await hook2(typedOptions);
                  }
                  const promise2 = asPromise(typedOptions);
                  onCancel(() => {
                    promise2.catch(() => {
                    });
                    promise2.cancel();
                  });
                  return promise2;
                });
              }
            } catch (error) {
              request._beforeError(new types_1.RequestError(error.message, error, request));
              return;
            }
            globalResponse = response;
            if (!is_response_ok_1.isResponseOk(response)) {
              request._beforeError(new types_1.HTTPError(response));
              return;
            }
            resolve(request.options.resolveBodyOnly ? response.body : response);
          });
          const onError = (error) => {
            if (promise.isCanceled) {
              return;
            }
            const { options } = request;
            if (error instanceof types_1.HTTPError && !options.throwHttpErrors) {
              const { response } = error;
              resolve(request.options.resolveBodyOnly ? response.body : response);
              return;
            }
            reject(error);
          };
          request.once("error", onError);
          const previousBody = request.options.body;
          request.once("retry", (newRetryCount, error) => {
            var _a, _b;
            if (previousBody === ((_a = error.request) === null || _a === void 0 ? void 0 : _a.options.body) && is_1.default.nodeStream((_b = error.request) === null || _b === void 0 ? void 0 : _b.options.body)) {
              onError(error);
              return;
            }
            makeRequest(newRetryCount);
          });
          proxy_events_1.default(request, emitter, proxiedRequestEvents);
        };
        makeRequest(0);
      });
      promise.on = (event, fn) => {
        emitter.on(event, fn);
        return promise;
      };
      const shortcut = (responseType) => {
        const newPromise = (async () => {
          await promise;
          const { options } = globalResponse.request;
          return parse_body_1.default(globalResponse, responseType, options.parseJson, options.encoding);
        })();
        Object.defineProperties(newPromise, Object.getOwnPropertyDescriptors(promise));
        return newPromise;
      };
      promise.json = () => {
        const { headers } = globalRequest.options;
        if (!globalRequest.writableFinished && headers.accept === void 0) {
          headers.accept = "application/json";
        }
        return shortcut("json");
      };
      promise.buffer = () => shortcut("buffer");
      promise.text = () => shortcut("text");
      return promise;
    }
    exports2.default = asPromise;
    __exportStar(require_types(), exports2);
  }
});

// node_modules/got/dist/source/as-promise/create-rejection.js
var require_create_rejection = __commonJS({
  "node_modules/got/dist/source/as-promise/create-rejection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var types_1 = require_types();
    function createRejection(error, ...beforeErrorGroups) {
      const promise = (async () => {
        if (error instanceof types_1.RequestError) {
          try {
            for (const hooks of beforeErrorGroups) {
              if (hooks) {
                for (const hook of hooks) {
                  error = await hook(error);
                }
              }
            }
          } catch (error_) {
            error = error_;
          }
        }
        throw error;
      })();
      const returnPromise = () => promise;
      promise.json = returnPromise;
      promise.text = returnPromise;
      promise.buffer = returnPromise;
      promise.on = returnPromise;
      return promise;
    }
    exports2.default = createRejection;
  }
});

// node_modules/got/dist/source/utils/deep-freeze.js
var require_deep_freeze = __commonJS({
  "node_modules/got/dist/source/utils/deep-freeze.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var is_1 = require_dist();
    function deepFreeze(object) {
      for (const value of Object.values(object)) {
        if (is_1.default.plainObject(value) || is_1.default.array(value)) {
          deepFreeze(value);
        }
      }
      return Object.freeze(object);
    }
    exports2.default = deepFreeze;
  }
});

// node_modules/got/dist/source/types.js
var require_types2 = __commonJS({
  "node_modules/got/dist/source/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/got/dist/source/create.js
var require_create = __commonJS({
  "node_modules/got/dist/source/create.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultHandler = void 0;
    var is_1 = require_dist();
    var as_promise_1 = require_as_promise();
    var create_rejection_1 = require_create_rejection();
    var core_1 = require_core2();
    var deep_freeze_1 = require_deep_freeze();
    var errors = {
      RequestError: as_promise_1.RequestError,
      CacheError: as_promise_1.CacheError,
      ReadError: as_promise_1.ReadError,
      HTTPError: as_promise_1.HTTPError,
      MaxRedirectsError: as_promise_1.MaxRedirectsError,
      TimeoutError: as_promise_1.TimeoutError,
      ParseError: as_promise_1.ParseError,
      CancelError: as_promise_1.CancelError,
      UnsupportedProtocolError: as_promise_1.UnsupportedProtocolError,
      UploadError: as_promise_1.UploadError
    };
    var delay = async (ms) => new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    var { normalizeArguments } = core_1.default;
    var mergeOptions = (...sources) => {
      let mergedOptions;
      for (const source of sources) {
        mergedOptions = normalizeArguments(void 0, source, mergedOptions);
      }
      return mergedOptions;
    };
    var getPromiseOrStream = (options) => options.isStream ? new core_1.default(void 0, options) : as_promise_1.default(options);
    var isGotInstance = (value) => "defaults" in value && "options" in value.defaults;
    var aliases = [
      "get",
      "post",
      "put",
      "patch",
      "head",
      "delete"
    ];
    exports2.defaultHandler = (options, next) => next(options);
    var callInitHooks = (hooks, options) => {
      if (hooks) {
        for (const hook of hooks) {
          hook(options);
        }
      }
    };
    var create = (defaults) => {
      defaults._rawHandlers = defaults.handlers;
      defaults.handlers = defaults.handlers.map((fn) => (options, next) => {
        let root;
        const result = fn(options, (newOptions) => {
          root = next(newOptions);
          return root;
        });
        if (result !== root && !options.isStream && root) {
          const typedResult = result;
          const { then: promiseThen, catch: promiseCatch, finally: promiseFianlly } = typedResult;
          Object.setPrototypeOf(typedResult, Object.getPrototypeOf(root));
          Object.defineProperties(typedResult, Object.getOwnPropertyDescriptors(root));
          typedResult.then = promiseThen;
          typedResult.catch = promiseCatch;
          typedResult.finally = promiseFianlly;
        }
        return result;
      });
      const got2 = (url, options = {}, _defaults) => {
        var _a, _b;
        let iteration = 0;
        const iterateHandlers = (newOptions) => {
          return defaults.handlers[iteration++](newOptions, iteration === defaults.handlers.length ? getPromiseOrStream : iterateHandlers);
        };
        if (is_1.default.plainObject(url)) {
          const mergedOptions = {
            ...url,
            ...options
          };
          core_1.setNonEnumerableProperties([url, options], mergedOptions);
          options = mergedOptions;
          url = void 0;
        }
        try {
          let initHookError;
          try {
            callInitHooks(defaults.options.hooks.init, options);
            callInitHooks((_a = options.hooks) === null || _a === void 0 ? void 0 : _a.init, options);
          } catch (error) {
            initHookError = error;
          }
          const normalizedOptions = normalizeArguments(url, options, _defaults !== null && _defaults !== void 0 ? _defaults : defaults.options);
          normalizedOptions[core_1.kIsNormalizedAlready] = true;
          if (initHookError) {
            throw new as_promise_1.RequestError(initHookError.message, initHookError, normalizedOptions);
          }
          return iterateHandlers(normalizedOptions);
        } catch (error) {
          if (options.isStream) {
            throw error;
          } else {
            return create_rejection_1.default(error, defaults.options.hooks.beforeError, (_b = options.hooks) === null || _b === void 0 ? void 0 : _b.beforeError);
          }
        }
      };
      got2.extend = (...instancesOrOptions) => {
        const optionsArray = [defaults.options];
        let handlers = [...defaults._rawHandlers];
        let isMutableDefaults;
        for (const value of instancesOrOptions) {
          if (isGotInstance(value)) {
            optionsArray.push(value.defaults.options);
            handlers.push(...value.defaults._rawHandlers);
            isMutableDefaults = value.defaults.mutableDefaults;
          } else {
            optionsArray.push(value);
            if ("handlers" in value) {
              handlers.push(...value.handlers);
            }
            isMutableDefaults = value.mutableDefaults;
          }
        }
        handlers = handlers.filter((handler) => handler !== exports2.defaultHandler);
        if (handlers.length === 0) {
          handlers.push(exports2.defaultHandler);
        }
        return create({
          options: mergeOptions(...optionsArray),
          handlers,
          mutableDefaults: Boolean(isMutableDefaults)
        });
      };
      const paginateEach = async function* (url, options) {
        let normalizedOptions = normalizeArguments(url, options, defaults.options);
        normalizedOptions.resolveBodyOnly = false;
        const pagination = normalizedOptions.pagination;
        if (!is_1.default.object(pagination)) {
          throw new TypeError("`options.pagination` must be implemented");
        }
        const all = [];
        let { countLimit } = pagination;
        let numberOfRequests = 0;
        while (numberOfRequests < pagination.requestLimit) {
          if (numberOfRequests !== 0) {
            await delay(pagination.backoff);
          }
          const result = await got2(void 0, void 0, normalizedOptions);
          const parsed = await pagination.transform(result);
          const current = [];
          for (const item of parsed) {
            if (pagination.filter(item, all, current)) {
              if (!pagination.shouldContinue(item, all, current)) {
                return;
              }
              yield item;
              if (pagination.stackAllItems) {
                all.push(item);
              }
              current.push(item);
              if (--countLimit <= 0) {
                return;
              }
            }
          }
          const optionsToMerge = pagination.paginate(result, all, current);
          if (optionsToMerge === false) {
            return;
          }
          if (optionsToMerge === result.request.options) {
            normalizedOptions = result.request.options;
          } else if (optionsToMerge !== void 0) {
            normalizedOptions = normalizeArguments(void 0, optionsToMerge, normalizedOptions);
          }
          numberOfRequests++;
        }
      };
      got2.paginate = paginateEach;
      got2.paginate.all = async (url, options) => {
        const results = [];
        for await (const item of paginateEach(url, options)) {
          results.push(item);
        }
        return results;
      };
      got2.paginate.each = paginateEach;
      got2.stream = (url, options) => got2(url, { ...options, isStream: true });
      for (const method of aliases) {
        got2[method] = (url, options) => got2(url, { ...options, method });
        got2.stream[method] = (url, options) => {
          return got2(url, { ...options, method, isStream: true });
        };
      }
      Object.assign(got2, errors);
      Object.defineProperty(got2, "defaults", {
        value: defaults.mutableDefaults ? defaults : deep_freeze_1.default(defaults),
        writable: defaults.mutableDefaults,
        configurable: defaults.mutableDefaults,
        enumerable: true
      });
      got2.mergeOptions = mergeOptions;
      return got2;
    };
    exports2.default = create;
    __exportStar(require_types2(), exports2);
  }
});

// node_modules/got/dist/source/index.js
var require_source5 = __commonJS({
  "node_modules/got/dist/source/index.js"(exports2, module2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var url_1 = require("url");
    var create_1 = require_create();
    var defaults = {
      options: {
        method: "GET",
        retry: {
          limit: 2,
          methods: [
            "GET",
            "PUT",
            "HEAD",
            "DELETE",
            "OPTIONS",
            "TRACE"
          ],
          statusCodes: [
            408,
            413,
            429,
            500,
            502,
            503,
            504,
            521,
            522,
            524
          ],
          errorCodes: [
            "ETIMEDOUT",
            "ECONNRESET",
            "EADDRINUSE",
            "ECONNREFUSED",
            "EPIPE",
            "ENOTFOUND",
            "ENETUNREACH",
            "EAI_AGAIN"
          ],
          maxRetryAfter: void 0,
          calculateDelay: ({ computedValue }) => computedValue
        },
        timeout: {},
        headers: {
          "user-agent": "got (https://github.com/sindresorhus/got)"
        },
        hooks: {
          init: [],
          beforeRequest: [],
          beforeRedirect: [],
          beforeRetry: [],
          beforeError: [],
          afterResponse: []
        },
        cache: void 0,
        dnsCache: void 0,
        decompress: true,
        throwHttpErrors: true,
        followRedirect: true,
        isStream: false,
        responseType: "text",
        resolveBodyOnly: false,
        maxRedirects: 10,
        prefixUrl: "",
        methodRewriting: true,
        ignoreInvalidCookies: false,
        context: {},
        http2: false,
        allowGetBody: false,
        https: void 0,
        pagination: {
          transform: (response) => {
            if (response.request.options.responseType === "json") {
              return response.body;
            }
            return JSON.parse(response.body);
          },
          paginate: (response) => {
            if (!Reflect.has(response.headers, "link")) {
              return false;
            }
            const items = response.headers.link.split(",");
            let next;
            for (const item of items) {
              const parsed = item.split(";");
              if (parsed[1].includes("next")) {
                next = parsed[0].trimStart().trim();
                next = next.slice(1, -1);
                break;
              }
            }
            if (next) {
              const options = {
                url: new url_1.URL(next)
              };
              return options;
            }
            return false;
          },
          filter: () => true,
          shouldContinue: () => true,
          countLimit: Infinity,
          backoff: 0,
          requestLimit: 1e4,
          stackAllItems: true
        },
        parseJson: (text2) => JSON.parse(text2),
        stringifyJson: (object) => JSON.stringify(object),
        cacheOptions: {}
      },
      handlers: [create_1.defaultHandler],
      mutableDefaults: false
    };
    var got2 = create_1.default(defaults);
    exports2.default = got2;
    module2.exports = got2;
    module2.exports.default = got2;
    module2.exports.__esModule = true;
    __exportStar(require_create(), exports2);
    __exportStar(require_as_promise(), exports2);
  }
});

// src/index.ts
var import_core = __toESM(require_core());

// src/post.ts
var import_got = __toESM(require_source5());
var post = ({ ddApi: ddApi2, ddApiKey: ddApiKey2, service: service2, version: version2, text: text2, tags: tags2 }) => import_got.default.post(ddApi2, {
  json: {
    title: `Deployment: ${service2}@${version2}`,
    text: text2 ? `%%% 
${text2}
 %%%` : "",
    tags: tags2.split(",").filter((t) => t).map((t) => t.trim()),
    source_type_name: "deployment"
  },
  headers: {
    "dd-api-key": ddApiKey2
  }
});

// src/index.ts
var ddApi = (0, import_core.getInput)("dd-api");
var ddApiKey = (0, import_core.getInput)("dd-api-key");
var service = (0, import_core.getInput)("service");
var version = (0, import_core.getInput)("version");
var text = (0, import_core.getInput)("text");
var tags = (0, import_core.getInput)("tags");
post({ service, version, text, tags, ddApi, ddApiKey }).then(() => {
  console.log(`Successfully notified datadog for version: ${version}`);
}).catch((err) => {
  console.error(`Notify datadog failed: ${err.message}`);
  process.exit(1);
});
