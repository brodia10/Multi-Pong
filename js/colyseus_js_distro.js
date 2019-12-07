/*! colyseus.js@0.11.7 */ ! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Colyseus = t() : e.Colyseus = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }
        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var i in e) n.d(r, i, function (t) {
                    return e[t]
                }.bind(null, i));
            return r
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 12)
    }([function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
            return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        });
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9),
            s = n(31),
            a = n(32),
            c = n(1),
            u = n(2),
            h = n(10),
            f = function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return i(t, e), t
            }(Error);

        function l(e, t, n, r) {
            if (!(e instanceof t)) throw new f("a '" + t.name + "' was expected, but '" + e.constructor.name + "' was provided in " + n.constructor.name + "#" + r)
        }

        function p(e, t, n, r, i) {
            ! function (e, t, n, r) {
                var i, o = !1;
                switch (t) {
                    case "number":
                    case "int8":
                    case "uint8":
                    case "int16":
                    case "uint16":
                    case "int32":
                    case "uint32":
                    case "int64":
                    case "uint64":
                    case "float32":
                    case "float64":
                        i = "number", isNaN(e) && console.log('trying to encode "NaN" in ' + n.constructor.name + "#" + r);
                        break;
                    case "string":
                        i = "string", o = !0;
                        break;
                    case "boolean":
                        return
                }
                if (typeof e !== i && (!o || o && null !== e)) {
                    var s = "'" + JSON.stringify(e) + "'" + (e && e.constructor && " (" + e.constructor.name + ")");
                    throw new f("a '" + i + "' was expected, but " + s + " was provided in " + n.constructor.name + "#" + r)
                }
            }(n, e, r, i);
            var o = s[e];
            if (!o) throw new f("a '" + e + "' was expected, but " + n + " was provided in " + r.constructor.name + "#" + i);
            o(t, n)
        }

        function d(e, t, n) {
            return a[e](t, n)
        }
        var v = function () {
            function e() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                Object.defineProperties(this, {
                    $changes: {
                        value: new h.ChangeTree(this._indexes),
                        enumerable: !1,
                        writable: !0
                    }
                });
                var n = this._descriptors;
                n && Object.defineProperties(this, n)
            }
            return e.onError = function (e) {
                console.error(e)
            }, Object.defineProperty(e.prototype, "_schema", {
                get: function () {
                    return this.constructor._schema
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "_descriptors", {
                get: function () {
                    return this.constructor._descriptors
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "_indexes", {
                get: function () {
                    return this.constructor._indexes
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "_fieldsByIndex", {
                get: function () {
                    return this.constructor._fieldsByIndex
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "_filters", {
                get: function () {
                    return this.constructor._filters
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "_deprecated", {
                get: function () {
                    return this.constructor._deprecated
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "$changed", {
                get: function () {
                    return this.$changes.changed
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.decode = function (t, n) {
                void 0 === n && (n = {
                    offset: 0
                });
                var r = [],
                    i = this._schema,
                    s = this._fieldsByIndex,
                    h = t.length;
                t[n.offset] === o.TYPE_ID && (n.offset += 2);
                for (var f = function () {
                        var h = a.nilCheck(t, n) && ++n.offset,
                            f = t[n.offset++];
                        if (f === o.END_OF_STRUCTURE) return "break";
                        var p = s[f],
                            v = "_" + p,
                            y = i[p],
                            g = void 0,
                            _ = void 0,
                            b = !1;
                        if (!p) return "continue";
                        if (h) g = null, b = !0;
                        else if (y._schema)(g = l[v] || l.createTypeInstance(t, n, y)).decode(t, n), b = !0;
                        else if (Array.isArray(y)) {
                            y = y[0], _ = [];
                            var w = l[v] || new c.ArraySchema;
                            g = w.clone(!0);
                            var m = a.number(t, n),
                                O = Math.min(a.number(t, n), m);
                            b = O > 0;
                            var C = !1;
                            g.length > m && Array.prototype.splice.call(g, m).forEach((function (t, n) {
                                if (t && t.onRemove) try {
                                    t.onRemove()
                                } catch (t) {
                                    e.onError(t)
                                }
                                if (w.onRemove) try {
                                    w.onRemove(t, m + n)
                                } catch (t) {
                                    e.onError(t)
                                }
                            }));
                            for (var A = 0; A < O; A++) {
                                var S = a.number(t, n),
                                    k = void 0;
                                a.indexChangeCheck(t, n) && (a.uint8(t, n), k = a.number(t, n), C = !0);
                                var I = !C && void 0 === g[S] || C && void 0 === k;
                                if (y.prototype instanceof e) {
                                    var E = void 0;
                                    (E = I ? l.createTypeInstance(t, n, y) : void 0 !== k ? w[k] : w[S]) || (E = l.createTypeInstance(t, n, y), I = !0), E.decode(t, n), g[S] = E
                                } else g[S] = d(y, t, n);
                                if (I) {
                                    if (w.onAdd) try {
                                        w.onAdd(g[S], S)
                                    } catch (t) {
                                        e.onError(t)
                                    }
                                } else if (w.onChange) try {
                                    w.onChange(g[S], S)
                                } catch (t) {
                                    e.onError(t)
                                }
                                _.push(g[S])
                            }
                        } else if (y.map) {
                            y = y.map;
                            var P = l[v] || new u.MapSchema;
                            g = P.clone(!0);
                            var x = a.number(t, n);
                            b = x > 0;
                            C = !1;
                            var M = Object.keys(P);
                            for (A = 0; A < x && (void 0 !== t[n.offset] && t[n.offset] !== o.END_OF_STRUCTURE); A++) {
                                var j = a.nilCheck(t, n) && ++n.offset,
                                    R = void 0;
                                a.indexChangeCheck(t, n) && (a.uint8(t, n), R = M[a.number(t, n)], C = !0);
                                var T = a.numberCheck(t, n),
                                    N = "string" != typeof y,
                                    U = T ? M[a.number(t, n)] : a.string(t, n);
                                E = void 0;
                                if (E = (I = !C && void 0 === P[U] || C && void 0 === R && T) && N ? l.createTypeInstance(t, n, y) : void 0 !== R ? P[R] : P[U], j) {
                                    if (E && E.onRemove) try {
                                        E.onRemove()
                                    } catch (t) {
                                        e.onError(t)
                                    }
                                    if (P.onRemove) try {
                                        P.onRemove(E, U)
                                    } catch (t) {
                                        e.onError(t)
                                    }
                                    delete g[U]
                                } else if (N ? (E.decode(t, n), g[U] = E) : g[U] = d(y, t, n), I) {
                                    if (P.onAdd) try {
                                        P.onAdd(g[U], U)
                                    } catch (t) {
                                        e.onError(t)
                                    }
                                } else if (P.onChange) try {
                                    P.onChange(g[U], U)
                                } catch (t) {
                                    e.onError(t)
                                }
                            }
                        } else g = d(y, t, n), b = !0;
                        b && l.onChange && r.push({
                            field: p,
                            value: _ || g,
                            previousValue: l[v]
                        }), l[v] = g
                    }, l = this; n.offset < h;) {
                    if ("break" === f()) break
                }
                if (this.onChange && r.length > 0) try {
                    this.onChange(r)
                } catch (t) {
                    e.onError(t)
                }
                return this
            }, e.prototype.encode = function (e, t, n, r) {
                var i = this;
                if (void 0 === e && (e = this), void 0 === t && (t = !1), void 0 === r && (r = []), !this.$changes.changed && !t) return this._encodeEndOfStructure(this, e, r), r;
                for (var a = this._schema, h = this._indexes, f = this._fieldsByIndex, d = this._filters, v = Array.from(t || n ? this.$changes.allChanges : this.$changes.changes).sort(), y = function (y, _) {
                        var b = f[v[y]] || v[y],
                            w = "_" + b,
                            m = a[b],
                            O = d && d[b],
                            C = g[w],
                            A = h[b];
                        if (void 0 === C) s.uint8(r, o.NIL), s.number(r, A);
                        else if (m._schema) {
                            if (n && O && !O.call(g, n, C, e)) return "continue";
                            C ? (s.number(r, A), l(C, m, g, b), g.tryEncodeTypeId(r, m, C.constructor), C.encode(e, t, n, r)) : (s.uint8(r, o.NIL), s.number(r, A))
                        } else if (Array.isArray(m)) {
                            var S = C.$changes;
                            s.number(r, A), s.number(r, C.length);
                            var k = Array.from(t || n ? S.allChanges : S.changes).filter((function (e) {
                                    return void 0 !== i[w][e]
                                })).sort((function (e, t) {
                                    return e - t
                                })),
                                I = k.length;
                            s.number(r, I);
                            var E = "string" != typeof m[0];
                            l(g[w], c.ArraySchema, g, b);
                            for (var P = 0; P < I; P++) {
                                var x = k[P],
                                    M = g[w][x];
                                if (!n || !O || O.call(g, n, M, e))
                                    if (E) {
                                        if (s.number(r, x), !t) void 0 !== ($ = S.getIndexChange(M)) && (s.uint8(r, o.INDEX_CHANGE), s.number(r, $));
                                        l(M, m[0], g, b), g.tryEncodeTypeId(r, m[0], M.constructor), M.encode(e, t, n, r)
                                    } else void 0 !== M && (s.number(r, x), p(m[0], r, M, g, b))
                            }
                            t || S.discard()
                        } else if (m.map) {
                            S = C.$changes;
                            s.number(r, A);
                            var j = Array.from(t || n ? S.allChanges : S.changes);
                            s.number(r, j.length);
                            var R = Array.from(S.allChanges);
                            E = "string" != typeof m.map, I = j.length;
                            l(g[w], u.MapSchema, g, b);
                            for (var T = 0; T < I; T++) {
                                var N = j[T],
                                    U = (M = g[w][N], void 0);
                                if (!n || !O || O.call(g, n, M, e)) {
                                    if (t) {
                                        if (void 0 === M) continue
                                    } else {
                                        var $ = S.getIndexChange(M);
                                        M && void 0 !== $ && (s.uint8(r, o.INDEX_CHANGE), s.number(r, g[w]._indexes.get($))), U = S.isDeleted(N) && M ? void 0 : g[w]._indexes.get(N)
                                    }
                                    var z = void 0 === M;
                                    z && s.uint8(r, o.NIL), void 0 !== U ? s.number(r, U) : s.string(r, N), M && E ? (l(M, m.map, g, b), g.tryEncodeTypeId(r, m.map, M.constructor), M.encode(e, t, n, r)) : z || p(m.map, r, M, g, b)
                                }
                            }
                            t || (S.discard(), n || g[w]._updateIndexes(R))
                        } else {
                            if (n && O && !O.call(g, n, C, e)) return "continue";
                            s.number(r, A), p(m, r, C, g, b)
                        }
                    }, g = this, _ = 0, b = v.length; _ < b; _++) y(_);
                return this._encodeEndOfStructure(this, e, r), t || n || this.$changes.discard(), r
            }, e.prototype.encodeFiltered = function (e, t) {
                return this.encode(this, !1, e, t)
            }, e.prototype.encodeAll = function (e) {
                return this.encode(this, !0, void 0, e)
            }, e.prototype.encodeAllFiltered = function (e, t) {
                return this.encode(this, !0, e, t)
            }, e.prototype.clone = function () {
                var e = new this.constructor,
                    t = this._schema;
                for (var n in t) "object" == typeof this[n] && "function" == typeof this[n].clone ? e[n] = this[n].clone() : e[n] = this[n];
                return e
            }, e.prototype.triggerAll = function () {
                if (this.onChange) {
                    var t = [],
                        n = this._schema;
                    for (var r in n) void 0 !== this[r] && t.push({
                        field: r,
                        value: this[r],
                        previousValue: void 0
                    });
                    try {
                        this.onChange(t)
                    } catch (t) {
                        e.onError(t)
                    }
                }
            }, e.prototype.toJSON = function () {
                var e = this._schema,
                    t = this._deprecated,
                    n = {};
                for (var r in e) t[r] || null === this[r] || void 0 === this[r] || (n[r] = "function" == typeof this[r].toJSON ? this[r].toJSON() : this["_" + r]);
                return n
            }, e.prototype._encodeEndOfStructure = function (e, t, n) {
                e !== t && n.push(o.END_OF_STRUCTURE)
            }, e.prototype.tryEncodeTypeId = function (e, t, n) {
                t._typeid !== n._typeid && (s.uint8(e, o.TYPE_ID), s.uint8(e, n._typeid))
            }, e.prototype.createTypeInstance = function (e, t, n) {
                return e[t.offset] === o.TYPE_ID ? (t.offset++, new(this.constructor._context.get(a.uint8(e, t)))) : new n
            }, e
        }();
        t.Schema = v
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }),
            o = this && this.__spreadArrays || function () {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                var r = Array(e),
                    i = 0;
                for (t = 0; t < n; t++)
                    for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
                return r
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function (e) {
            function t() {
                for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                var i = e.apply(this, n) || this;
                return Object.setPrototypeOf(i, Object.create(t.prototype)), Object.defineProperties(i, {
                    $sorting: {
                        value: void 0,
                        enumerable: !1,
                        writable: !0
                    },
                    $changes: {
                        value: void 0,
                        enumerable: !1,
                        writable: !0
                    },
                    onAdd: {
                        value: void 0,
                        enumerable: !1,
                        writable: !0
                    },
                    onRemove: {
                        value: void 0,
                        enumerable: !1,
                        writable: !0
                    },
                    onChange: {
                        value: void 0,
                        enumerable: !1,
                        writable: !0
                    },
                    triggerAll: {
                        value: function () {
                            if (i.onAdd)
                                for (var e = 0; e < i.length; e++) i.onAdd(i[e], e)
                        }
                    },
                    toJSON: {
                        value: function () {
                            for (var e = [], t = 0; t < i.length; t++) {
                                var n = i[t];
                                e.push("function" == typeof n.toJSON ? n.toJSON() : n)
                            }
                            return e
                        }
                    },
                    clone: {
                        value: function (e) {
                            var n;
                            return e ? ((n = t.of.apply(t, i)).onAdd = i.onAdd, n.onRemove = i.onRemove, n.onChange = i.onChange) : n = new(t.bind.apply(t, o([void 0], i.map((function (e) {
                                return "object" == typeof e ? e.clone() : e
                            }))))), n
                        }
                    }
                }), i
            }
            return i(t, e), Object.defineProperty(t, Symbol.species, {
                get: function () {
                    return t
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.sort = function (t) {
                this.$sorting = !0, e.prototype.sort.call(this, t);
                for (var n = 0, r = Array.from(this.$changes.changes); n < r.length; n++) {
                    var i = r[n],
                        o = this.$changes.getIndex(this[i]);
                    void 0 !== o && this.$changes.mapIndexChange(this[i], o), this.$changes.mapIndex(this[i], i)
                }
                return this.$sorting = !1, this
            }, t.prototype.filter = function (t, n) {
                var r = e.prototype.filter.call(this, t);
                return r.$changes = this.$changes, r
            }, t.prototype.splice = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                var i = Array.prototype.splice.apply(this, arguments),
                    o = Array.prototype.filter.call(this, (function (n, r) {
                        return r >= e + t - 1
                    }));
                return i.map((function (e) {
                    e && e.$changes && (e.$changes.parent.deleteIndex(e), e.$changes.parent.deleteIndexChange(e), delete e.$changes.parent)
                })), o.forEach((function (e) {
                    e && e.$changes && e.$changes.parentField--
                })), i
            }, t
        }(Array);
        t.ArraySchema = s
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function e(t) {
            var n = this;
            for (var r in void 0 === t && (t = {}), t) this[r] = t[r];
            Object.defineProperties(this, {
                $changes: {
                    value: void 0,
                    enumerable: !1,
                    writable: !0
                },
                onAdd: {
                    value: void 0,
                    enumerable: !1,
                    writable: !0
                },
                onRemove: {
                    value: void 0,
                    enumerable: !1,
                    writable: !0
                },
                onChange: {
                    value: void 0,
                    enumerable: !1,
                    writable: !0
                },
                clone: {
                    value: function (t) {
                        var r;
                        if (t)(r = Object.assign(new e, n)).onAdd = n.onAdd, r.onRemove = n.onRemove, r.onChange = n.onChange;
                        else {
                            var i = new e;
                            for (var o in n) "object" == typeof n[o] ? i[o] = n[o].clone() : i[o] = n[o]
                        }
                        return r
                    }
                },
                triggerAll: {
                    value: function () {
                        if (n.onAdd)
                            for (var e in n) n.onAdd(n[e], e)
                    }
                },
                toJSON: {
                    value: function () {
                        var e = {};
                        for (var t in n) e[t] = "function" == typeof n[t].toJSON ? n[t].toJSON() : n[t];
                        return e
                    }
                },
                _indexes: {
                    value: new Map,
                    enumerable: !1,
                    writable: !0
                },
                _updateIndexes: {
                    value: function (e) {
                        for (var t = 0, r = new Map, i = 0, o = e; i < o.length; i++) {
                            var s = o[i];
                            r.set(s, t++)
                        }
                        n._indexes = r
                    }
                }
            })
        };
        t.MapSchema = r
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__importDefault || function (e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(n(15)),
            o = r(n(16));
        t.decode = i.default, t.encode = o.default
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            t.headers = e.headers || {}, t.statusMessage = e.statusText, t.statusCode = e.status, t.data = e.response
        }

        function i(e, t, n) {
            return new Promise((function (i, o) {
                var s, a, c, u;
                n = n || {};
                var h = new XMLHttpRequest,
                    f = n.headers || {};
                for (s in h.timeout = n.timeout, h.ontimeout = h.onerror = function (e) {
                        e.timeout = "timeout" == e.type, o(e)
                    }, h.open(e, t), h.onload = function () {
                        for (u = h.getAllResponseHeaders().trim().split(/[\r\n]+/), r(h, h); c = u.shift();) c = c.split(": "), h.headers[c.shift().toLowerCase()] = c.join(": ");
                        if ((c = h.headers["content-type"]) && ~c.indexOf("application/json")) try {
                            h.data = JSON.parse(h.data, n.reviver)
                        } catch (e) {
                            return r(h, e), o(e)
                        }(h.status >= 400 ? o : i)(h)
                    }, (a = n.body) && /Array|Object/.test(a.constructor) && (f["content-type"] = "application/json", a = JSON.stringify(a)), f) h.setRequestHeader(s, f[s]);
                h.send(a)
            }))
        }
        n.r(t), n.d(t, "send", (function () {
            return i
        })), n.d(t, "get", (function () {
            return o
        })), n.d(t, "post", (function () {
            return s
        })), n.d(t, "patch", (function () {
            return a
        })), n.d(t, "del", (function () {
            return c
        })), n.d(t, "put", (function () {
            return u
        }));
        var o = i.bind(i, "GET"),
            s = i.bind(i, "POST"),
            a = i.bind(i, "PATCH"),
            c = i.bind(i, "DELETE"),
            u = i.bind(i, "PUT")
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(n(3)),
            o = n(17),
            s = n(18),
            a = n(6),
            c = n(7),
            u = function () {
                function e(e, t) {
                    var n = this;
                    this.onJoin = o.createSignal(), this.onStateChange = o.createSignal(), this.onMessage = o.createSignal(), this.onError = o.createSignal(), this.onLeave = o.createSignal(), this.hasJoined = !1, this.id = null, this.name = e, t ? (this.serializer = new(a.getSerializer("schema")), this.rootSchema = t, this.serializer.state = new t) : this.serializer = new(a.getSerializer("fossil-delta")), this.onError((function (e) {
                        return console.error(e)
                    })), this.onLeave((function () {
                        return n.removeAllListeners()
                    }))
                }
                return e.prototype.connect = function (e) {
                    var t = this;
                    this.connection = new s.Connection(e, !1), this.connection.reconnectEnabled = !1, this.connection.onmessage = this.onMessageCallback.bind(this), this.connection.onclose = function (e) {
                        if (!t.hasJoined) return console.error("Room connection was closed unexpectedly (" + e.code + "): " + e.reason), void t.onError.invoke(e.reason);
                        t.onLeave.invoke(e.code)
                    }, this.connection.onerror = function (e) {
                        console.warn("Room, onError (" + e.code + "): " + e.reason), t.onError.invoke(e.reason)
                    }, this.connection.open()
                }, e.prototype.leave = function (e) {
                    void 0 === e && (e = !0), this.connection ? e ? this.connection.send([c.Protocol.LEAVE_ROOM]) : this.connection.close() : this.onLeave.invoke(4e3)
                }, e.prototype.send = function (e) {
                    this.connection.send([c.Protocol.ROOM_DATA, e])
                }, Object.defineProperty(e.prototype, "state", {
                    get: function () {
                        return this.serializer.getState()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.listen = function (e, t, n) {
                    if ("schema" !== this.serializerId) return this.serializerId || console.warn("room.Listen() should be called after room.onJoin has been called (DEPRECATION WARNING)"), this.serializer.api.listen(e, t, n);
                    console.error("'" + this.serializerId + "' serializer doesn't support .listen() method.")
                }, e.prototype.removeListener = function (e) {
                    return this.serializer.api.removeListener(e)
                }, e.prototype.removeAllListeners = function () {
                    this.serializer && this.serializer.teardown(), this.onJoin.clear(), this.onStateChange.clear(), this.onMessage.clear(), this.onError.clear(), this.onLeave.clear()
                }, e.prototype.onMessageCallback = function (e) {
                    if (this.previousCode) this.previousCode === c.Protocol.ROOM_STATE ? this.setState(Array.from(new Uint8Array(e.data))) : this.previousCode === c.Protocol.ROOM_STATE_PATCH ? this.patch(Array.from(new Uint8Array(e.data))) : this.previousCode === c.Protocol.ROOM_DATA && this.onMessage.invoke(i.decode(e.data)), this.previousCode = void 0;
                    else {
                        var t = new DataView(e.data),
                            n = t.getUint8(0);
                        if (n === c.Protocol.JOIN_ROOM) {
                            var r = 1;
                            this.serializerId = c.utf8Read(t, r), r += c.utf8Length(this.serializerId);
                            var o = a.getSerializer(this.serializerId);
                            if (!o) throw new Error("missing serializer: " + this.serializerId);
                            if ("fossil-delta" === this.serializerId || this.rootSchema || (this.serializer = new o), t.buffer.byteLength > r && this.serializer.handshake) {
                                var s = Array.from(new Uint8Array(t.buffer.slice(r)));
                                this.serializer.handshake(s)
                            }
                            this.hasJoined = !0, this.onJoin.invoke()
                        } else if (n === c.Protocol.JOIN_ERROR) this.onError.invoke(c.utf8Read(t, 1));
                        else if (n === c.Protocol.LEAVE_ROOM) this.leave();
                        else if (n === c.Protocol.ROOM_DATA_SCHEMA) {
                            s = Array.from(new Uint8Array(e.data));
                            var u = new(this.serializer.getState().constructor._context.get(s[1]));
                            u.decode(s, {
                                offset: 2
                            }), this.onMessage.invoke(u)
                        } else this.previousCode = n
                    }
                }, e.prototype.setState = function (e) {
                    this.serializer.setState(e), this.onStateChange.invoke(this.serializer.getState())
                }, e.prototype.patch = function (e) {
                    this.serializer.patch(e), this.onStateChange.invoke(this.serializer.getState())
                }, e
            }();
        t.Room = u
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = {};
        t.registerSerializer = function (e, t) {
            r[e] = t
        }, t.getSerializer = function (e) {
            return r[e]
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            function (e) {
                e[e.JOIN_ROOM = 10] = "JOIN_ROOM", e[e.JOIN_ERROR = 11] = "JOIN_ERROR", e[e.LEAVE_ROOM = 12] = "LEAVE_ROOM", e[e.ROOM_DATA = 13] = "ROOM_DATA", e[e.ROOM_STATE = 14] = "ROOM_STATE", e[e.ROOM_STATE_PATCH = 15] = "ROOM_STATE_PATCH", e[e.ROOM_DATA_SCHEMA = 16] = "ROOM_DATA_SCHEMA"
            }(t.Protocol || (t.Protocol = {})), t.utf8Read = function (e, t) {
                for (var n = e.getUint8(t++), r = "", i = 0, o = t, s = t + n; o < s; o++) {
                    var a = e.getUint8(o);
                    if (0 != (128 & a))
                        if (192 != (224 & a))
                            if (224 != (240 & a)) {
                                if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
                                (i = (7 & a) << 18 | (63 & e.getUint8(++o)) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0) >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i)
                            } else r += String.fromCharCode((15 & a) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0);
                    else r += String.fromCharCode((31 & a) << 6 | 63 & e.getUint8(++o));
                    else r += String.fromCharCode(a)
                }
                return r
            }, t.utf8Length = function (e) {
                void 0 === e && (e = "");
                for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++)(t = e.charCodeAt(r)) < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
                return n + 1
            }
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
                return new(n || (n = Promise))((function (i, o) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function c(e) {
                        e.done ? i(e.value) : new n((function (t) {
                            t(e.value)
                        })).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            i = this && this.__generator || function (e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                    return this
                }), o;

                function a(o) {
                    return function (a) {
                        return function (o) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; s;) try {
                                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, r = o[1], o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1], i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2], s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                o = t.call(e, s)
                            } catch (e) {
                                o = [6, e], r = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & o[0]) throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            },
            o = this && this.__importStar || function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = o(n(4)),
            a = n(22),
            c = "colyseus-auth-token";
        ! function (e) {
            e.ios = "ios", e.android = "android"
        }(t.Platform || (t.Platform = {}));
        var u = function () {
            function e(e) {
                var t = this;
                this._id = void 0, this.username = void 0, this.displayName = void 0, this.avatarUrl = void 0, this.isAnonymous = void 0, this.email = void 0, this.lang = void 0, this.location = void 0, this.timezone = void 0, this.metadata = void 0, this.devices = void 0, this.facebookId = void 0, this.twitterId = void 0, this.googleId = void 0, this.gameCenterId = void 0, this.steamId = void 0, this.friendIds = void 0, this.blockedUserIds = void 0, this.createdAt = void 0, this.updatedAt = void 0, this.token = void 0, this.endpoint = e.replace("ws", "http"), a.getItem(c, (function (e) {
                    return t.token = e
                }))
            }
            return Object.defineProperty(e.prototype, "hasToken", {
                get: function () {
                    return !!this.token
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.login = function (e) {
                return void 0 === e && (e = {}), r(this, void 0, void 0, (function () {
                    var t, n, r;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = Object.assign({}, e), this.hasToken && (t.token = this.token), [4, this.request("post", "/auth", t)];
                            case 1:
                                for (r in n = i.sent(), this.token = n.token, a.setItem(c, this.token), n) this.hasOwnProperty(r) && (this[r] = n[r]);
                                return this.registerPingService(), [2, this]
                        }
                    }))
                }))
            }, e.prototype.save = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("put", "/auth", {}, {
                                    username: this.username,
                                    displayName: this.displayName,
                                    avatarUrl: this.avatarUrl,
                                    lang: this.lang,
                                    location: this.location,
                                    timezone: this.timezone
                                })];
                            case 1:
                                return e.sent(), [2, this]
                        }
                    }))
                }))
            }, e.prototype.getFriends = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("get", "/friends/all")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.getOnlineFriends = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("get", "/friends/online")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.getFriendRequests = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("get", "/friends/requests")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.sendFriendRequest = function (e) {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("post", "/friends/requests", {
                                    userId: e
                                })];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.acceptFriendRequest = function (e) {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("put", "/friends/requests", {
                                    userId: e
                                })];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.declineFriendRequest = function (e) {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("del", "/friends/requests", {
                                    userId: e
                                })];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.blockUser = function (e) {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("post", "/friends/block", {
                                    userId: e
                                })];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.unblockUser = function (e) {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("put", "/friends/block", {
                                    userId: e
                                })];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.request = function (e, t, n, o, a) {
                return void 0 === n && (n = {}), void 0 === a && (a = {}), r(this, void 0, void 0, (function () {
                    var r, c, u, h;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                for (c in a.Accept = "application/json", this.hasToken && (a.Authorization = "Bearer " + this.token), r = [], n) r.push(c + "=" + n[c]);
                                return u = r.length > 0 ? "?" + r.join("&") : "", h = {
                                    headers: a
                                }, o && (h.body = o), [4, s[e]("" + this.endpoint + t + u, h)];
                            case 1:
                                return [2, i.sent().data]
                        }
                    }))
                }))
            }, e.prototype.logout = function () {
                this.token = void 0, a.removeItem(c), this.unregisterPingService()
            }, e.prototype.registerPingService = function (e) {
                var t = this;
                void 0 === e && (e = 15e3), this.unregisterPingService(), this.keepOnlineInterval = setInterval((function () {
                    return t.request("get", "/auth")
                }), e)
            }, e.prototype.unregisterPingService = function () {
                clearInterval(this.keepOnlineInterval)
            }, e
        }();
        t.Auth = u
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.END_OF_STRUCTURE = 193, t.NIL = 192, t.INDEX_CHANGE = 212, t.TYPE_ID = 213
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0),
            i = n(1),
            o = n(2),
            s = function () {
                function e(e, t, n) {
                    void 0 === e && (e = {}), void 0 === t && (t = null), this.changed = !1, this.changes = new Set, this.allChanges = new Set, this.deletedKeys = {}, this.fieldIndexes = e, this.parent = n, this.parentField = t
                }
                return e.prototype.change = function (e, t) {
                    void 0 === t && (t = !1);
                    var n = this.fieldIndexes[e],
                        r = "number" == typeof n ? n : e;
                    this.changed = !0, this.changes.add(r), t ? t && this.allChanges.delete(r) : this.allChanges.add(r), this.parent && this.parent.change(this.parentField)
                }, e.prototype.mapIndex = function (e, t) {
                    "object" == typeof e && (this.indexMap || (this.indexMap = new Map, this.indexChange = new Map), this.indexMap.set(e, t))
                }, e.prototype.getIndex = function (e) {
                    return this.indexMap && this.indexMap.get(e)
                }, e.prototype.deleteIndex = function (e) {
                    "object" == typeof e && (this.deletedKeys[this.indexMap.get(e)] = !0, this.indexMap.delete(e))
                }, e.prototype.isDeleted = function (e) {
                    return void 0 !== this.deletedKeys[e]
                }, e.prototype.mapIndexChange = function (e, t) {
                    "object" == typeof e && this.indexChange.set(e, t)
                }, e.prototype.getIndexChange = function (e) {
                    return this.indexChange && this.indexChange.get(e)
                }, e.prototype.deleteIndexChange = function (e) {
                    "object" == typeof e && this.indexChange.delete(e)
                }, e.prototype.changeAll = function (e) {
                    if (e instanceof r.Schema) {
                        var t = e._schema;
                        for (var n in t)(e[n] instanceof r.Schema || e[n] instanceof i.ArraySchema || e[n] instanceof o.MapSchema) && !e[n].$changes.parent.parent && (e[n].$changes.parent = this), void 0 !== e[n] && this.change(n)
                    } else
                        for (var s = 0, a = Object.keys(e); s < a.length; s++) {
                            var c = a[s];
                            void 0 !== e[c] && this.change(c)
                        }
                }, e.prototype.discard = function () {
                    this.changed = !1, this.changes.clear(), this.deletedKeys = {}, this.indexChange && this.indexChange.clear()
                }, e
            }();
        t.ChangeTree = s
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(10),
            i = n(0),
            o = function () {
                function e() {
                    this.types = {}, this.schemas = new Map
                }
                return e.prototype.has = function (e) {
                    return this.schemas.has(e)
                }, e.prototype.get = function (e) {
                    return this.types[e]
                }, e.prototype.add = function (e) {
                    e._typeid = this.schemas.size, this.types[e._typeid] = e, this.schemas.set(e, e._typeid)
                }, e
            }();

        function s(e, n) {
            return void 0 === n && (n = t.globalContext),
                function (t, o) {
                    var s = t.constructor;
                    s._context = n, n.has(s) || (n.add(s), s._schema = Object.assign({}, s._schema || {}), s._indexes = Object.assign({}, s._indexes || {}), s._fieldsByIndex = Object.assign({}, s._fieldsByIndex || {}), s._descriptors = Object.assign({}, s._descriptors || {}), s._deprecated = Object.assign({}, s._deprecated || {}));
                    var a = Object.keys(s._schema).length;
                    if (s._fieldsByIndex[a] = o, s._indexes[o] = a, s._schema[o] = e, !s._descriptors[o]) {
                        var c = Array.isArray(e),
                            u = !c && e.map,
                            h = "function" == typeof s._schema[o],
                            f = "_" + o;
                        s._descriptors[f] = {
                            enumerable: !1,
                            configurable: !1,
                            writable: !0
                        }, s._descriptors[o] = {
                            get: function () {
                                return this[f]
                            },
                            set: function (e) {
                                if ((c || u) && (e = new Proxy(e, {
                                        get: function (e, t) {
                                            return e[t]
                                        },
                                        set: function (e, t, n) {
                                            if ("length" !== t && 0 !== t.indexOf("$")) {
                                                var o = c ? Number(t) : String(t);
                                                if (!e.$sorting) {
                                                    var s = e.$changes.getIndex(n);
                                                    void 0 !== s && e.$changes.mapIndexChange(n, s), e.$changes.mapIndex(n, o)
                                                }
                                                n instanceof i.Schema ? n.$changes.parent || (n.$changes = new r.ChangeTree(n._indexes, o, e.$changes), n.$changes.changeAll(n)) : e[t] = n, e.$changes.change(o)
                                            } else e[t];
                                            return e[t] = n, !0
                                        },
                                        deleteProperty: function (e, t) {
                                            var n = e[t];
                                            u && void 0 !== n && (e.$changes.deleteIndex(n), e.$changes.deleteIndexChange(n), n.$changes && delete n.$changes.parent), delete e[t];
                                            var r = c ? Number(t) : String(t);
                                            return e.$changes.change(r, !0), !0
                                        }
                                    })), e !== this[f])
                                    if (this[f] = e, c) {
                                        this.$changes.change(o), e.$changes = new r.ChangeTree({}, o, this.$changes);
                                        for (var t = 0; t < e.length; t++) e[t] instanceof i.Schema && (e[t].$changes = new r.ChangeTree(e[t]._indexes, t, e.$changes), e[t].$changes.changeAll(e[t])), e.$changes.mapIndex(e[t], t), e.$changes.change(t)
                                    } else if (u)
                                    for (var n in e.$changes = new r.ChangeTree({}, o, this.$changes), this.$changes.change(o), e) e[n] instanceof i.Schema && (e[n].$changes = new r.ChangeTree(e[n]._indexes, n, e.$changes), e[n].$changes.changeAll(e[n])), e.$changes.mapIndex(e[n], n), e.$changes.change(n);
                                else h ? (this.$changes.change(o), e && (e.$changes = new r.ChangeTree(e._indexes, o, this.$changes), e.$changes.changeAll(e))) : this.$changes.change(o)
                            },
                            enumerable: !0,
                            configurable: !0
                        }
                    }
                }
        }
        t.Context = o, t.globalContext = new o, t.type = s, t.filter = function (e) {
            return function (t, n) {
                var r = t.constructor;
                r._filters || (r._filters = {}), r._filters[n] = e
            }
        }, t.deprecated = function (e, n) {
            return void 0 === e && (e = !0), void 0 === n && (n = t.globalContext),
                function (t, n) {
                    var r = t.constructor;
                    r._deprecated[n] = !0, e && (r._descriptors[n] = {
                        get: function () {
                            throw new Error(n + " is deprecated.")
                        },
                        set: function (e) {},
                        enumerable: !1,
                        configurable: !0
                    })
                }
        }, t.defineTypes = function (e, n, r) {
            for (var i in void 0 === r && (r = t.globalContext), n) s(n[i], r)(e.prototype, i);
            return e
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n(13);
        var r = n(14);
        t.Client = r.Client;
        var i = n(7);
        t.Protocol = i.Protocol;
        var o = n(5);
        t.Room = o.Room;
        var s = n(8);
        t.Auth = s.Auth, t.Platform = s.Platform;
        var a = n(24);
        t.FossilDeltaSerializer = a.FossilDeltaSerializer;
        var c = n(29);
        t.SchemaSerializer = c.SchemaSerializer;
        var u = n(6);
        t.registerSerializer = u.registerSerializer, u.registerSerializer("fossil-delta", a.FossilDeltaSerializer), u.registerSerializer("schema", c.SchemaSerializer)
    }, function (e, t) {
        ArrayBuffer.isView || (ArrayBuffer.isView = function (e) {
            return null !== e && "object" == typeof e && e.buffer instanceof ArrayBuffer
        })
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }),
            o = this && this.__awaiter || function (e, t, n, r) {
                return new(n || (n = Promise))((function (i, o) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function c(e) {
                        e.done ? i(e.value) : new n((function (t) {
                            t(e.value)
                        })).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            s = this && this.__generator || function (e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                    return this
                }), o;

                function a(o) {
                    return function (a) {
                        return function (o) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; s;) try {
                                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, r = o[1], o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1], i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2], s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                o = t.call(e, s)
                            } catch (e) {
                                o = [6, e], r = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & o[0]) throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(4),
            c = n(5),
            u = n(8),
            h = n(23),
            f = function (e) {
                function t(n, r) {
                    var i = e.call(this, n) || this;
                    return i.code = r, Object.setPrototypeOf(i, t.prototype), i
                }
                return i(t, e), t
            }(Error);
        t.MatchMakeError = f;
        var l = function () {
            function e(e) {
                void 0 === e && (e = location.protocol.replace("http", "ws") + "//" + location.hostname + (location.port && ":" + location.port)), this.endpoint = e, this.auth = new u.Auth(this.endpoint), this.push = new h.Push(this.endpoint)
            }
            return e.prototype.joinOrCreate = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("joinOrCreate", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.create = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("create", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.join = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("join", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.joinById = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("joinById", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.reconnect = function (e, t, n) {
                return o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("joinById", e, {
                                    sessionId: t
                                }, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.getAvailableRooms = function (e) {
                return void 0 === e && (e = ""), o(this, void 0, void 0, (function () {
                    var t;
                    return s(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return t = this.endpoint.replace("ws", "http") + "/matchmake/" + e, [4, a.get(t, {
                                    headers: {
                                        Accept: "application/json"
                                    }
                                })];
                            case 1:
                                return [2, n.sent().data]
                        }
                    }))
                }))
            }, e.prototype.consumeSeatReservation = function (e, t) {
                return o(this, void 0, void 0, (function () {
                    var n;
                    return s(this, (function (r) {
                        return (n = this.createRoom(e.room.name, t)).id = e.room.roomId, n.sessionId = e.sessionId, n.connect(this.buildEndpoint(e.room, {
                            sessionId: n.sessionId
                        })), [2, new Promise((function (e, t) {
                            var r = function (e) {
                                return t(e)
                            };
                            n.onError.once(r), n.onJoin.once((function () {
                                n.onError.remove(r), e(n)
                            }))
                        }))]
                    }))
                }))
            }, e.prototype.createMatchMakeRequest = function (e, t, n, r) {
                return void 0 === n && (n = {}), o(this, void 0, void 0, (function () {
                    var i, o;
                    return s(this, (function (s) {
                        switch (s.label) {
                            case 0:
                                return i = this.endpoint.replace("ws", "http") + "/matchmake/" + e + "/" + t, this.auth.hasToken && (n.token = this.auth.token), [4, a.post(i, {
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(n)
                                })];
                            case 1:
                                if ((o = s.sent().data).error) throw new f(o.error, o.code);
                                return [2, this.consumeSeatReservation(o, r)]
                        }
                    }))
                }))
            }, e.prototype.createRoom = function (e, t) {
                return new c.Room(e, t)
            }, e.prototype.buildEndpoint = function (e, t) {
                void 0 === t && (t = {});
                var n = [];
                for (var r in t) t.hasOwnProperty(r) && n.push(r + "=" + t[r]);
                return this.endpoint + "/" + e.processId + "/" + e.roomId + "?" + n.join("&")
            }, e
        }();
        t.Client = l
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            if (this._offset = 0, e instanceof ArrayBuffer) this._buffer = e, this._view = new DataView(this._buffer);
            else {
                if (!ArrayBuffer.isView(e)) throw new Error("Invalid argument");
                this._buffer = e.buffer, this._view = new DataView(this._buffer, e.byteOffset, e.byteLength)
            }
        }
        r.prototype._array = function (e) {
            for (var t = new Array(e), n = 0; n < e; n++) t[n] = this._parse();
            return t
        }, r.prototype._map = function (e) {
            for (var t = {}, n = 0; n < e; n++) t[this._parse()] = this._parse();
            return t
        }, r.prototype._str = function (e) {
            var t = function (e, t, n) {
                for (var r = "", i = 0, o = t, s = t + n; o < s; o++) {
                    var a = e.getUint8(o);
                    if (0 != (128 & a))
                        if (192 != (224 & a))
                            if (224 != (240 & a)) {
                                if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
                                (i = (7 & a) << 18 | (63 & e.getUint8(++o)) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0) >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i)
                            } else r += String.fromCharCode((15 & a) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0);
                    else r += String.fromCharCode((31 & a) << 6 | 63 & e.getUint8(++o));
                    else r += String.fromCharCode(a)
                }
                return r
            }(this._view, this._offset, e);
            return this._offset += e, t
        }, r.prototype._bin = function (e) {
            var t = this._buffer.slice(this._offset, this._offset + e);
            return this._offset += e, t
        }, r.prototype._parse = function () {
            var e, t = this._view.getUint8(this._offset++),
                n = 0,
                r = 0,
                i = 0,
                o = 0;
            if (t < 192) return t < 128 ? t : t < 144 ? this._map(15 & t) : t < 160 ? this._array(15 & t) : this._str(31 & t);
            if (t > 223) return -1 * (255 - t + 1);
            switch (t) {
                case 192:
                    return null;
                case 194:
                    return !1;
                case 195:
                    return !0;
                case 196:
                    return n = this._view.getUint8(this._offset), this._offset += 1, this._bin(n);
                case 197:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._bin(n);
                case 198:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._bin(n);
                case 199:
                    return n = this._view.getUint8(this._offset), r = this._view.getInt8(this._offset + 1), this._offset += 2, [r, this._bin(n)];
                case 200:
                    return n = this._view.getUint16(this._offset), r = this._view.getInt8(this._offset + 2), this._offset += 3, [r, this._bin(n)];
                case 201:
                    return n = this._view.getUint32(this._offset), r = this._view.getInt8(this._offset + 4), this._offset += 5, [r, this._bin(n)];
                case 202:
                    return e = this._view.getFloat32(this._offset), this._offset += 4, e;
                case 203:
                    return e = this._view.getFloat64(this._offset), this._offset += 8, e;
                case 204:
                    return e = this._view.getUint8(this._offset), this._offset += 1, e;
                case 205:
                    return e = this._view.getUint16(this._offset), this._offset += 2, e;
                case 206:
                    return e = this._view.getUint32(this._offset), this._offset += 4, e;
                case 207:
                    return i = this._view.getUint32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), this._offset += 8, i + o;
                case 208:
                    return e = this._view.getInt8(this._offset), this._offset += 1, e;
                case 209:
                    return e = this._view.getInt16(this._offset), this._offset += 2, e;
                case 210:
                    return e = this._view.getInt32(this._offset), this._offset += 4, e;
                case 211:
                    return i = this._view.getInt32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), this._offset += 8, i + o;
                case 212:
                    return r = this._view.getInt8(this._offset), this._offset += 1, 0 === r ? void(this._offset += 1) : [r, this._bin(1)];
                case 213:
                    return r = this._view.getInt8(this._offset), this._offset += 1, [r, this._bin(2)];
                case 214:
                    return r = this._view.getInt8(this._offset), this._offset += 1, [r, this._bin(4)];
                case 215:
                    return r = this._view.getInt8(this._offset), this._offset += 1, 0 === r ? (i = this._view.getInt32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), this._offset += 8, new Date(i + o)) : [r, this._bin(8)];
                case 216:
                    return r = this._view.getInt8(this._offset), this._offset += 1, [r, this._bin(16)];
                case 217:
                    return n = this._view.getUint8(this._offset), this._offset += 1, this._str(n);
                case 218:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._str(n);
                case 219:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._str(n);
                case 220:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._array(n);
                case 221:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._array(n);
                case 222:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._map(n);
                case 223:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._map(n)
            }
            throw new Error("Could not parse")
        }, e.exports = function (e) {
            var t = new r(e),
                n = t._parse();
            if (t._offset !== e.byteLength) throw new Error(e.byteLength - t._offset + " trailing bytes");
            return n
        }
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            for (var r = 0, i = 0, o = n.length; i < o; i++)(r = n.charCodeAt(i)) < 128 ? e.setUint8(t++, r) : r < 2048 ? (e.setUint8(t++, 192 | r >> 6), e.setUint8(t++, 128 | 63 & r)) : r < 55296 || r >= 57344 ? (e.setUint8(t++, 224 | r >> 12), e.setUint8(t++, 128 | r >> 6 & 63), e.setUint8(t++, 128 | 63 & r)) : (i++, r = 65536 + ((1023 & r) << 10 | 1023 & n.charCodeAt(i)), e.setUint8(t++, 240 | r >> 18), e.setUint8(t++, 128 | r >> 12 & 63), e.setUint8(t++, 128 | r >> 6 & 63), e.setUint8(t++, 128 | 63 & r))
        }
        e.exports = function (e) {
            var t = [],
                n = [],
                i = function e(t, n, r) {
                    var i = typeof r,
                        o = 0,
                        s = 0,
                        a = 0,
                        c = 0,
                        u = 0,
                        h = 0;
                    if ("string" === i) {
                        if ((u = function (e) {
                                for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++)(t = e.charCodeAt(r)) < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
                                return n
                            }(r)) < 32) t.push(160 | u), h = 1;
                        else if (u < 256) t.push(217, u), h = 2;
                        else if (u < 65536) t.push(218, u >> 8, u), h = 3;
                        else {
                            if (!(u < 4294967296)) throw new Error("String too long");
                            t.push(219, u >> 24, u >> 16, u >> 8, u), h = 5
                        }
                        return n.push({
                            _str: r,
                            _length: u,
                            _offset: t.length
                        }), h + u
                    }
                    if ("number" === i) return Math.floor(r) === r && isFinite(r) ? r >= 0 ? r < 128 ? (t.push(r), 1) : r < 256 ? (t.push(204, r), 2) : r < 65536 ? (t.push(205, r >> 8, r), 3) : r < 4294967296 ? (t.push(206, r >> 24, r >> 16, r >> 8, r), 5) : (a = r / Math.pow(2, 32) >> 0, c = r >>> 0, t.push(207, a >> 24, a >> 16, a >> 8, a, c >> 24, c >> 16, c >> 8, c), 9) : r >= -32 ? (t.push(r), 1) : r >= -128 ? (t.push(208, r), 2) : r >= -32768 ? (t.push(209, r >> 8, r), 3) : r >= -2147483648 ? (t.push(210, r >> 24, r >> 16, r >> 8, r), 5) : (a = Math.floor(r / Math.pow(2, 32)), c = r >>> 0, t.push(211, a >> 24, a >> 16, a >> 8, a, c >> 24, c >> 16, c >> 8, c), 9) : (t.push(203), n.push({
                        _float: r,
                        _length: 8,
                        _offset: t.length
                    }), 9);
                    if ("object" === i) {
                        if (null === r) return t.push(192), 1;
                        if (Array.isArray(r)) {
                            if ((u = r.length) < 16) t.push(144 | u), h = 1;
                            else if (u < 65536) t.push(220, u >> 8, u), h = 3;
                            else {
                                if (!(u < 4294967296)) throw new Error("Array too large");
                                t.push(221, u >> 24, u >> 16, u >> 8, u), h = 5
                            }
                            for (o = 0; o < u; o++) h += e(t, n, r[o]);
                            return h
                        }
                        if (r instanceof Date) {
                            var f = r.getTime();
                            return a = Math.floor(f / Math.pow(2, 32)), c = f >>> 0, t.push(215, 0, a >> 24, a >> 16, a >> 8, a, c >> 24, c >> 16, c >> 8, c), 10
                        }
                        if (r instanceof ArrayBuffer) {
                            if ((u = r.byteLength) < 256) t.push(196, u), h = 2;
                            else if (u < 65536) t.push(197, u >> 8, u), h = 3;
                            else {
                                if (!(u < 4294967296)) throw new Error("Buffer too large");
                                t.push(198, u >> 24, u >> 16, u >> 8, u), h = 5
                            }
                            return n.push({
                                _bin: r,
                                _length: u,
                                _offset: t.length
                            }), h + u
                        }
                        if ("function" == typeof r.toJSON) return e(t, n, r.toJSON());
                        var l = [],
                            p = "",
                            d = Object.keys(r);
                        for (o = 0, s = d.length; o < s; o++) "function" != typeof r[p = d[o]] && l.push(p);
                        if ((u = l.length) < 16) t.push(128 | u), h = 1;
                        else if (u < 65536) t.push(222, u >> 8, u), h = 3;
                        else {
                            if (!(u < 4294967296)) throw new Error("Object too large");
                            t.push(223, u >> 24, u >> 16, u >> 8, u), h = 5
                        }
                        for (o = 0; o < u; o++) h += e(t, n, p = l[o]), h += e(t, n, r[p]);
                        return h
                    }
                    if ("boolean" === i) return t.push(r ? 195 : 194), 1;
                    if ("undefined" === i) return t.push(212, 0, 0), 3;
                    throw new Error("Could not encode")
                }(t, n, e),
                o = new ArrayBuffer(i),
                s = new DataView(o),
                a = 0,
                c = 0,
                u = -1;
            n.length > 0 && (u = n[0]._offset);
            for (var h, f = 0, l = 0, p = 0, d = t.length; p < d; p++)
                if (s.setUint8(c + p, t[p]), p + 1 === u) {
                    if (f = (h = n[a])._length, l = c + u, h._bin)
                        for (var v = new Uint8Array(h._bin), y = 0; y < f; y++) s.setUint8(l + y, v[y]);
                    else h._str ? r(s, l, h._str) : void 0 !== h._float && s.setFloat64(l, h._float);
                    c += f, n[++a] && (u = n[a]._offset)
                } return o
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function () {
            function e() {
                this.handlers = []
            }
            return e.prototype.register = function (e, t) {
                return void 0 === t && (t = !1), this.handlers.push(e), this
            }, e.prototype.invoke = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.handlers.forEach((function (t) {
                    return t.apply(void 0, e)
                }))
            }, e.prototype.invokeAsync = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return Promise.all(this.handlers.map((function (t) {
                    return t.apply(void 0, e)
                })))
            }, e.prototype.remove = function (e) {
                var t = this.handlers.indexOf(e);
                this.handlers[t] = this.handlers[this.handlers.length - 1], this.handlers.pop()
            }, e.prototype.clear = function () {
                this.handlers = []
            }, e
        }();
        t.EventEmitter = r, t.createSignal = function () {
            var e = new r;

            function t(t) {
                return e.register(t, null === this)
            }
            return t.once = function (t) {
                var n = function () {
                    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                    t.apply(void 0, r), e.remove(n)
                };
                e.register(n)
            }, t.remove = function (t) {
                return e.remove(t)
            }, t.invoke = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.invoke.apply(e, t)
            }, t.invokeAsync = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.invokeAsync.apply(e, t)
            }, t.clear = function () {
                return e.clear()
            }, t
        }
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }),
            o = this && this.__importDefault || function (e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            },
            s = this && this.__importStar || function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o(n(19)),
            c = s(n(3)),
            u = function (e) {
                function t(t, n) {
                    void 0 === n && (n = !0);
                    var r = e.call(this, t, void 0, {
                        connect: n
                    }) || this;
                    return r._enqueuedCalls = [], r
                }
                return i(t, e), t.prototype.onOpenCallback = function (t) {
                    if (e.prototype.onOpenCallback.call(this), this.binaryType = "arraybuffer", this._enqueuedCalls.length > 0) {
                        for (var n = 0, r = this._enqueuedCalls; n < r.length; n++) {
                            var i = r[n],
                                o = i[0],
                                s = i[1];
                            this[o].apply(this, s)
                        }
                        this._enqueuedCalls = []
                    }
                }, t.prototype.send = function (t) {
                    if (this.ws.readyState === a.default.OPEN) return e.prototype.send.call(this, c.encode(t));
                    this._enqueuedCalls.push(["send", [t]])
                }, t
            }(a.default);
        t.Connection = u
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();
        var i = n(20).createBackoff,
            o = "undefined" != typeof WebSocket ? WebSocket : n(21),
            s = function () {
                function e(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    ! function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.url = t, this.protocols = n, this.reconnectEnabled = !0, this.listeners = {}, this.backoff = i(r.backoff || "exponential", r), this.backoff.onReady = this.onBackoffReady.bind(this), (void 0 === r.connect || r.connect) && this.open()
                }
                return r(e, [{
                    key: "open",
                    value: function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        this.isReconnect = e;
                        var t = this.ws && this.ws.binaryType;
                        this.ws = new o(this.url, this.protocols), this.ws.onclose = this.onCloseCallback.bind(this), this.ws.onerror = this.onErrorCallback.bind(this), this.ws.onmessage = this.onMessageCallback.bind(this), this.ws.onopen = this.onOpenCallback.bind(this), t && (this.ws.binaryType = t)
                    }
                }, {
                    key: "onBackoffReady",
                    value: function (e, t) {
                        this.open(!0)
                    }
                }, {
                    key: "onCloseCallback",
                    value: function (e) {
                        !this.isReconnect && this.listeners.onclose && this.listeners.onclose.apply(null, arguments), this.reconnectEnabled && e.code < 3e3 && this.backoff.backoff()
                    }
                }, {
                    key: "onErrorCallback",
                    value: function () {
                        this.listeners.onerror && this.listeners.onerror.apply(null, arguments)
                    }
                }, {
                    key: "onMessageCallback",
                    value: function () {
                        this.listeners.onmessage && this.listeners.onmessage.apply(null, arguments)
                    }
                }, {
                    key: "onOpenCallback",
                    value: function () {
                        this.listeners.onopen && this.listeners.onopen.apply(null, arguments), this.isReconnect && this.listeners.onreconnect && this.listeners.onreconnect.apply(null, arguments), this.isReconnect = !1
                    }
                }, {
                    key: "close",
                    value: function (e, t) {
                        void 0 === e && (e = 1e3), this.reconnectEnabled = !1, this.ws.close(e, t)
                    }
                }, {
                    key: "send",
                    value: function (e) {
                        this.ws.send(e)
                    }
                }, {
                    key: "bufferedAmount",
                    get: function () {
                        return this.ws.bufferedAmount
                    }
                }, {
                    key: "readyState",
                    get: function () {
                        return this.ws.readyState
                    }
                }, {
                    key: "binaryType",
                    get: function () {
                        return this.ws.binaryType
                    },
                    set: function (e) {
                        this.ws.binaryType = e
                    }
                }, {
                    key: "extensions",
                    get: function () {
                        return this.ws.extensions
                    },
                    set: function (e) {
                        this.ws.extensions = e
                    }
                }, {
                    key: "protocol",
                    get: function () {
                        return this.ws.protocol
                    },
                    set: function (e) {
                        this.ws.protocol = e
                    }
                }, {
                    key: "onclose",
                    set: function (e) {
                        this.listeners.onclose = e
                    },
                    get: function () {
                        return this.listeners.onclose
                    }
                }, {
                    key: "onerror",
                    set: function (e) {
                        this.listeners.onerror = e
                    },
                    get: function () {
                        return this.listeners.onerror
                    }
                }, {
                    key: "onmessage",
                    set: function (e) {
                        this.listeners.onmessage = e
                    },
                    get: function () {
                        return this.listeners.onmessage
                    }
                }, {
                    key: "onopen",
                    set: function (e) {
                        this.listeners.onopen = e
                    },
                    get: function () {
                        return this.listeners.onopen
                    }
                }, {
                    key: "onreconnect",
                    set: function (e) {
                        this.listeners.onreconnect = e
                    },
                    get: function () {
                        return this.listeners.onreconnect
                    }
                }]), e
            }();
        s.CONNECTING = o.CONNECTING, s.OPEN = o.OPEN, s.CLOSING = o.CLOSING, s.CLOSED = o.CLOSED, t.default = s
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createBackoff = function (e, t) {
            return new i(r[e], t)
        };
        var r = {
            exponential: function (e, t) {
                return Math.floor(Math.random() * Math.pow(2, e) * t)
            },
            fibonacci: function (e, t) {
                if (e > (r = 1))
                    for (var n = 1, r = 2, i = 2; i < e; i++) {
                        var o = n + r;
                        n = r, r = o
                    }
                return Math.floor(Math.random() * r * t)
            }
        };

        function i(e, t) {
            this.func = e, this.attempts = 0, this.delay = void 0 !== t.initialDelay ? t.initialDelay : 100
        }
        i.prototype.backoff = function () {
            setTimeout(this.onReady, this.func(++this.attempts, this.delay))
        }
    }, function (e, t) {}, function (e, t, n) {
        "use strict";
        var r;

        function i() {
            return r || (r = "undefined" != typeof cc && cc.sys && cc.sys.localStorage ? cc.sys.localStorage : "undefined" != typeof window && window.localStorage ? window.localStorage : {
                cache: {},
                setItem: function (e, t) {
                    this.cache[e] = t
                },
                getItem: function (e) {
                    this.cache[e]
                },
                removeItem: function (e) {
                    delete this.cache[e]
                }
            }), r
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.setItem = function (e, t) {
            i().setItem(e, t)
        }, t.removeItem = function (e) {
            i().removeItem(e)
        }, t.getItem = function (e, t) {
            var n = i().getItem(e);
            "undefined" != typeof Promise && n instanceof Promise ? n.then((function (e) {
                return t(e)
            })) : t(n)
        }
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
                return new(n || (n = Promise))((function (i, o) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function c(e) {
                        e.done ? i(e.value) : new n((function (t) {
                            t(e.value)
                        })).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            },
            i = this && this.__generator || function (e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                    return this
                }), o;

                function a(o) {
                    return function (a) {
                        return function (o) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; s;) try {
                                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, r = o[1], o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1], i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2], s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                o = t.call(e, s)
                            } catch (e) {
                                o = [6, e], r = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & o[0]) throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function () {
            function e(e) {
                this.endpoint = e.replace("ws", "http")
            }
            return e.prototype.register = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return this.check(), [4, this.registerServiceWorker()];
                            case 1:
                                return e.sent(), [4, this.requestNotificationPermission()];
                            case 2:
                                return e.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.registerServiceWorker = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, navigator.serviceWorker.register(this.endpoint + "/push")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.requestNotificationPermission = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, window.Notification.requestPermission()];
                            case 1:
                                if ("granted" !== e.sent()) throw new Error("Permission not granted for Notification");
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.check = function () {
                if (!("serviceWorker" in navigator)) throw new Error("No Service Worker support!");
                if (!("PushManager" in window)) throw new Error("No Push API Support!")
            }, e
        }();
        t.Push = o
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(25),
            o = r(n(28)),
            s = r(n(3)),
            a = function () {
                function e() {
                    this.api = new i.StateContainer({})
                }
                return e.prototype.getState = function () {
                    return this.api.state
                }, e.prototype.setState = function (e) {
                    this.previousState = new Uint8Array(e), this.api.set(s.decode(this.previousState))
                }, e.prototype.patch = function (e) {
                    this.previousState = new Uint8Array(o.apply(this.previousState, e)), this.api.set(s.decode(this.previousState))
                }, e.prototype.teardown = function () {
                    this.api.removeAllListeners()
                }, e
            }();
        t.FossilDeltaSerializer = a
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(26);
        t.StateContainer = r.StateContainer
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(27),
            i = function () {
                function e(e) {
                    this.listeners = [], this.matcherPlaceholders = {
                        ":id": /^([a-zA-Z0-9\-_]+)$/,
                        ":number": /^([0-9]+)$/,
                        ":string": /^(\w+)$/,
                        ":axis": /^([xyz])$/,
                        ":*": /(.*)/
                    }, this.state = e, this.reset()
                }
                return e.prototype.set = function (e) {
                    var t = r.compare(this.state, e);
                    return this.state = e, this.checkPatches(t, this.listeners, this.defaultListener), t
                }, e.prototype.registerPlaceholder = function (e, t) {
                    this.matcherPlaceholders[e] = t
                }, e.prototype.listen = function (e, t, n) {
                    var i, o = this;
                    "function" == typeof e ? (i = [], t = e) : i = e.split("/"), t.length > 1 && console.warn(".listen() accepts only one parameter.");
                    var s = {
                        callback: t,
                        rawRules: i,
                        rules: i.map((function (e) {
                            return "string" == typeof e ? 0 === e.indexOf(":") ? o.matcherPlaceholders[e] || o.matcherPlaceholders[":*"] : new RegExp("^" + e + "$") : e
                        }))
                    };
                    return 0 === i.length ? this.defaultListener = s : this.listeners.push(s), n && this.checkPatches(r.compare({}, this.state), [s]), s
                }, e.prototype.removeListener = function (e) {
                    for (var t = this.listeners.length - 1; t >= 0; t--) this.listeners[t] === e && this.listeners.splice(t, 1)
                }, e.prototype.removeAllListeners = function () {
                    this.reset()
                }, e.prototype.checkPatches = function (e, t, n) {
                    for (var r = 0, i = t.length; r < i; r++)
                        for (var o = t[r], s = e.length - 1; s >= 0; s--) {
                            var a = o && this.getPathVariables(e[s], o);
                            a && (o.callback({
                                path: a,
                                rawPath: e[s].path,
                                operation: e[s].operation,
                                value: e[s].value
                            }), e[s].matched = !0)
                        }
                    if (n)
                        for (s = e.length - 1; s >= 0; s--) e[s].matched || n.callback(e[s])
                }, e.prototype.getPathVariables = function (e, t) {
                    if (e.path.length !== t.rules.length) return !1;
                    for (var n = {}, r = 0, i = t.rules.length; r < i; r++) {
                        var o = e.path[r].match(t.rules[r]);
                        if (!o || 0 === o.length || o.length > 2) return !1;
                        ":" === t.rawRules[r].substr(0, 1) && (n[t.rawRules[r].substr(1)] = o[1])
                    }
                    return n
                }, e.prototype.reset = function () {
                    this.listeners = []
                }, e
            }();
        t.StateContainer = i
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            var n = e.slice();
            return n.push(t), n
        }

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = new Array(e.length), n = 0; n < t.length; n++) t[n] = "" + n;
                return t
            }
            if (Object.keys) return Object.keys(e);
            var r = [];
            for (var i in e) e.hasOwnProperty(i) && r.push(i);
            return r
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.compare = function (e, t) {
            var n = [];
            return function e(t, n, o, s) {
                for (var a = i(n), c = i(t), u = !1, h = c.length - 1; h >= 0; h--) {
                    var f = c[h],
                        l = t[f];
                    if (!n.hasOwnProperty(f) || void 0 === n[f] && void 0 !== l && !1 === Array.isArray(n)) o.push({
                        operation: "remove",
                        path: r(s, f)
                    }), u = !0;
                    else {
                        var p = n[f];
                        "object" == typeof l && null != l && "object" == typeof p && null != p ? e(l, p, o, r(s, f)) : l !== p && o.push({
                            operation: "replace",
                            path: r(s, f),
                            value: p,
                            previousValue: l
                        })
                    }
                }
                if (!u && a.length == c.length) return;
                for (h = a.length - 1; h >= 0; h--) {
                    f = a[h];
                    if (!t.hasOwnProperty(f) && void 0 !== n[f]) {
                        p = n[f];
                        var d = r(s, f);
                        "object" == typeof p && null != p && e({}, p, o, d), o.push({
                            operation: "add",
                            path: d,
                            value: p
                        })
                    }
                }
            }(e, t, n, []), n
        }
    }, function (e, t, n) {
        var r, i;
        r = this, i = function () {
            "use strict";
            var e = {},
                t = 16;

            function n() {
                this.a = 0, this.b = 0, this.i = 0, this.z = new Array(t)
            }
            n.prototype.init = function (e, n) {
                var r, i, o = 0,
                    s = 0;
                for (r = 0; r < t; r++) o = o + (i = e[n + r]) & 65535, s = s + (t - r) * i & 65535, this.z[r] = i;
                this.a = 65535 & o, this.b = 65535 & s, this.i = 0
            }, n.prototype.next = function (e) {
                var n = this.z[this.i];
                this.z[this.i] = e, this.i = this.i + 1 & t - 1, this.a = this.a - n + e & 65535, this.b = this.b - t * n + this.a & 65535
            }, n.prototype.value = function () {
                return (65535 & this.a | (65535 & this.b) << 16) >>> 0
            };
            var r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".split("").map((function (e) {
                    return e.charCodeAt(0)
                })),
                i = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, 36, -1, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, -1, -1, -1, 63, -1];

            function o(e) {
                this.a = e, this.pos = 0
            }

            function s() {
                this.a = []
            }

            function a(e) {
                var t, n;
                for (t = 1, n = 64; e >= n; t++, n <<= 6);
                return t
            }

            function c(e) {
                for (var t = 0, n = 0, r = 0, i = 0, o = 0, s = e.length; s >= 16;) t = t + e[o + 0] | 0, n = n + e[o + 1] | 0, r = r + e[o + 2] | 0, i = i + e[o + 3] | 0, t = t + e[o + 4] | 0, n = n + e[o + 5] | 0, r = r + e[o + 6] | 0, i = i + e[o + 7] | 0, t = t + e[o + 8] | 0, n = n + e[o + 9] | 0, r = r + e[o + 10] | 0, i = i + e[o + 11] | 0, t = t + e[o + 12] | 0, n = n + e[o + 13] | 0, r = r + e[o + 14] | 0, i = i + e[o + 15] | 0, o += 16, s -= 16;
                for (; s >= 4;) t = t + e[o + 0] | 0, n = n + e[o + 1] | 0, r = r + e[o + 2] | 0, i = i + e[o + 3] | 0, o += 4, s -= 4;
                switch (i = ((i + (r << 8) | 0) + (n << 16) | 0) + (t << 24) | 0, s) {
                    case 3:
                        i = i + (e[o + 2] << 8) | 0;
                    case 2:
                        i = i + (e[o + 1] << 16) | 0;
                    case 1:
                        i = i + (e[o + 0] << 24) | 0
                }
                return i >>> 0
            }
            return o.prototype.haveBytes = function () {
                return this.pos < this.a.length
            }, o.prototype.getByte = function () {
                var e = this.a[this.pos];
                if (this.pos++, this.pos > this.a.length) throw new RangeError("out of bounds");
                return e
            }, o.prototype.getChar = function () {
                return String.fromCharCode(this.getByte())
            }, o.prototype.getInt = function () {
                for (var e, t = 0; this.haveBytes() && (e = i[127 & this.getByte()]) >= 0;) t = (t << 6) + e;
                return this.pos--, t >>> 0
            }, s.prototype.toArray = function () {
                return this.a
            }, s.prototype.putByte = function (e) {
                this.a.push(255 & e)
            }, s.prototype.putChar = function (e) {
                this.putByte(e.charCodeAt(0))
            }, s.prototype.putInt = function (e) {
                var t, n, i = [];
                if (0 !== e) {
                    for (t = 0; e > 0; t++, e >>>= 6) i.push(r[63 & e]);
                    for (n = t - 1; n >= 0; n--) this.putByte(i[n])
                } else this.putChar("0")
            }, s.prototype.putArray = function (e, t, n) {
                for (var r = t; r < n; r++) this.a.push(e[r])
            }, e.create = function (e, r) {
                var i, o = new s,
                    u = r.length,
                    h = e.length,
                    f = -1;
                if (o.putInt(u), o.putChar("\n"), h <= t) return o.putInt(u), o.putChar(":"), o.putArray(r, 0, u), o.putInt(c(r)), o.putChar(";"), o.toArray();
                var l = Math.ceil(h / t),
                    p = new Array(l),
                    d = new Array(l);
                for (i = 0; i < p.length; i++) p[i] = -1;
                for (i = 0; i < d.length; i++) d[i] = -1;
                var v, y = new n;
                for (i = 0; i < h - t; i += t) y.init(e, i), v = y.value() % l, p[i / t] = d[v], d[v] = i / t;
                for (var g, _, b, w, m, O = 0; O + t < u;)
                    for (w = 0, m = 0, y.init(r, O), i = 0, b = 0;;) {
                        var C = 250;
                        for (_ = d[v = y.value() % l]; _ >= 0 && C-- > 0;) {
                            var A, S, k, I, E, P, x;
                            for (I = 0, P = g = _ * t, x = O + i; P < h && x < u && e[P] === r[x]; I++, P++, x++);
                            for (I--, E = 1; E < g && E <= i && e[g - E] === r[O + i - E]; E++);
                            S = g - --E, k = i - E, (A = I + E + 1) >= a(i - E) + a(A) + a(S) + 3 && A > b && (b = A, w = g - E, m = k), _ = p[_]
                        }
                        if (b > 0) {
                            m > 0 && (o.putInt(m), o.putChar(":"), o.putArray(r, O, O + m), O += m), O += b, o.putInt(b), o.putChar("@"), o.putInt(w), o.putChar(","), w + b - 1 > f && (f = w + b - 1), b = 0;
                            break
                        }
                        if (O + i + t >= u) {
                            o.putInt(u - O), o.putChar(":"), o.putArray(r, O, O + u - O), O = u;
                            break
                        }
                        y.next(r[O + i + t]), i++
                    }
                return O < u && (o.putInt(u - O), o.putChar(":"), o.putArray(r, O, O + u - O)), o.putInt(c(r)), o.putChar(";"), o.toArray()
            }, e.outputSize = function (e) {
                var t = new o(e),
                    n = t.getInt();
                if ("\n" !== t.getChar()) throw new Error("size integer not terminated by '\\n'");
                return n
            }, e.apply = function (e, t, n) {
                var r, i = 0,
                    a = new o(t),
                    u = e.length,
                    h = t.length;
                if (r = a.getInt(), "\n" !== a.getChar()) throw new Error("size integer not terminated by '\\n'");
                for (var f = new s; a.haveBytes();) {
                    var l, p;
                    switch (l = a.getInt(), a.getChar()) {
                        case "@":
                            if (p = a.getInt(), a.haveBytes() && "," !== a.getChar()) throw new Error("copy command not terminated by ','");
                            if ((i += l) > r) throw new Error("copy exceeds output file size");
                            if (p + l > u) throw new Error("copy extends past end of input");
                            f.putArray(e, p, p + l);
                            break;
                        case ":":
                            if ((i += l) > r) throw new Error("insert command gives an output larger than predicted");
                            if (l > h) throw new Error("insert count exceeds size of delta");
                            f.putArray(a.a, a.pos, a.pos + l), a.pos += l;
                            break;
                        case ";":
                            var d = f.toArray();
                            if ((!n || !1 !== n.verifyChecksum) && l !== c(d)) throw new Error("bad checksum");
                            if (i !== r) throw new Error("generated size does not match predicted size");
                            return d;
                        default:
                            throw new Error("unknown delta operator")
                    }
                }
                throw new Error("unterminated delta")
            }, e
        }, e.exports ? e.exports = i() : r.fossilDelta = i()
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(30),
            i = function () {
                function e() {}
                return e.prototype.setState = function (e) {
                    this.state.decode(e)
                }, e.prototype.getState = function () {
                    return this.state
                }, e.prototype.patch = function (e) {
                    this.state.decode(e)
                }, e.prototype.teardown = function () {}, e.prototype.handshake = function (e) {
                    this.state ? (new r.Reflection).decode(e) : this.state = r.Reflection.decode(e)
                }, e
            }();
        t.SchemaSerializer = i
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0);
        t.Schema = r.Schema;
        var i = n(2);
        t.MapSchema = i.MapSchema;
        var o = n(1);
        t.ArraySchema = o.ArraySchema;
        var s = n(33);
        t.Reflection = s.Reflection, t.ReflectionType = s.ReflectionType, t.ReflectionField = s.ReflectionField;
        var a = n(11);
        t.type = a.type, t.deprecated = a.deprecated, t.filter = a.filter, t.defineTypes = a.defineTypes, t.Context = a.Context
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            for (var r = 0, i = 0, o = n.length; i < o; i++)(r = n.charCodeAt(i)) < 128 ? e[t++] = r : r < 2048 ? (e[t++] = 192 | r >> 6, e[t++] = 128 | 63 & r) : r < 55296 || r >= 57344 ? (e[t++] = 224 | r >> 12, e[t++] = 128 | r >> 6 & 63, e[t++] = 128 | 63 & r) : (i++, r = 65536 + ((1023 & r) << 10 | 1023 & n.charCodeAt(i)), e[t++] = 240 | r >> 18, e[t++] = 128 | r >> 12 & 63, e[t++] = 128 | r >> 6 & 63, e[t++] = 128 | 63 & r)
        }

        function i(e, t) {
            e.push(255 & t)
        }

        function o(e, t) {
            e.push(255 & t)
        }

        function s(e, t) {
            e.push(255 & t), e.push(t >> 8 & 255)
        }

        function a(e, t) {
            e.push(255 & t), e.push(t >> 8 & 255)
        }

        function c(e, t) {
            e.push(255 & t), e.push(t >> 8 & 255), e.push(t >> 16 & 255), e.push(t >> 24 & 255)
        }

        function u(e, t) {
            var n = t >> 24,
                r = t >> 16,
                i = t >> 8,
                o = t;
            e.push(255 & o), e.push(255 & i), e.push(255 & r), e.push(255 & n)
        }

        function h(e, t) {
            var n = Math.floor(t / Math.pow(2, 32));
            u(e, t >>> 0), u(e, n)
        }

        function f(e, t) {
            var n = t / Math.pow(2, 32) >> 0;
            u(e, t >>> 0), u(e, n)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.utf8Write = r, t.int8 = i, t.uint8 = o, t.int16 = s, t.uint16 = a, t.int32 = c, t.uint32 = u, t.int64 = h, t.uint64 = f, t.float32 = function (e, t) {
            y(e, t)
        }, t.float64 = function (e, t) {
            g(e, t)
        };
        var l = !0,
            p = new Int32Array(2),
            d = new Float32Array(p.buffer),
            v = new Float64Array(p.buffer);

        function y(e, t) {
            d[0] = t, c(e, p[0])
        }

        function g(e, t) {
            v[0] = t, c(e, p[l ? 0 : 1]), c(e, p[l ? 1 : 0])
        }
        t.writeFloat32 = y, t.writeFloat64 = g, t.boolean = function (e, t) {
            return o(e, t ? 1 : 0)
        }, t.string = function (e, t) {
            t || (t = "");
            var n = function (e) {
                    for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++)(t = e.charCodeAt(r)) < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
                    return n
                }(t),
                i = 0;
            if (n < 32) e.push(160 | n), i = 1;
            else if (n < 256) e.push(217), o(e, n), i = 2;
            else if (n < 65536) e.push(218), a(e, n), i = 3;
            else {
                if (!(n < 4294967296)) throw new Error("String too long");
                e.push(219), u(e, n), i = 5
            }
            return r(e, e.length, t), i + n
        }, t.number = function e(t, n) {
            return isNaN(n) ? e(t, 0) : isFinite(n) ? n !== (0 | n) ? (t.push(203), g(t, n), 9) : n >= 0 ? n < 128 ? (o(t, n), 1) : n < 256 ? (t.push(204), o(t, n), 2) : n < 65536 ? (t.push(205), a(t, n), 3) : n < 4294967296 ? (t.push(206), u(t, n), 5) : (t.push(207), f(t, n), 9) : n >= -32 ? (t.push(n), 1) : n >= -128 ? (t.push(208), i(t, n), 2) : n >= -32768 ? (t.push(209), s(t, n), 3) : n >= -2147483648 ? (t.push(210), c(t, n), 5) : (t.push(211), h(t, n), 9) : e(t, n > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER)
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(9);

        function i(e, t) {
            return o(e, t) << 24 >> 24
        }

        function o(e, t) {
            return e[t.offset++]
        }

        function s(e, t) {
            return a(e, t) << 16 >> 16
        }

        function a(e, t) {
            return e[t.offset++] | e[t.offset++] << 8
        }

        function c(e, t) {
            return e[t.offset++] | e[t.offset++] << 8 | e[t.offset++] << 16 | e[t.offset++] << 24
        }

        function u(e, t) {
            return c(e, t) >>> 0
        }

        function h(e, t) {
            var n = u(e, t);
            return c(e, t) * Math.pow(2, 32) + n
        }

        function f(e, t) {
            var n = u(e, t);
            return u(e, t) * Math.pow(2, 32) + n
        }
        t.int8 = i, t.uint8 = o, t.int16 = s, t.uint16 = a, t.int32 = c, t.uint32 = u, t.float32 = function (e, t) {
            return y(e, t)
        }, t.float64 = function (e, t) {
            return g(e, t)
        }, t.int64 = h, t.uint64 = f;
        var l = !0,
            p = new Int32Array(2),
            d = new Float32Array(p.buffer),
            v = new Float64Array(p.buffer);

        function y(e, t) {
            return p[0] = c(e, t), d[0]
        }

        function g(e, t) {
            return p[l ? 0 : 1] = c(e, t), p[l ? 1 : 0] = c(e, t), v[0]
        }
        t.readFloat32 = y, t.readFloat64 = g, t.boolean = function (e, t) {
            return o(e, t) > 0
        }, t.string = function (e, t) {
            var n, r = e[t.offset++];
            r < 192 ? n = 31 & r : 217 === r ? n = o(e, t) : 218 === r ? n = a(e, t) : 219 === r && (n = u(e, t));
            var i = function (e, t, n) {
                for (var r = "", i = 0, o = t, s = t + n; o < s; o++) {
                    var a = e[o];
                    if (0 != (128 & a))
                        if (192 != (224 & a))
                            if (224 != (240 & a)) {
                                if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
                                (i = (7 & a) << 18 | (63 & e[++o]) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0) >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i)
                            } else r += String.fromCharCode((15 & a) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0);
                    else r += String.fromCharCode((31 & a) << 6 | 63 & e[++o]);
                    else r += String.fromCharCode(a)
                }
                return r
            }(e, t.offset, n);
            return t.offset += n, i
        }, t.stringCheck = function (e, t) {
            var n = e[t.offset];
            return (n < 192 && n > 160 || 217 === n || 218 === n || 219 === n)
        }, t.number = function (e, t) {
            var n = e[t.offset++];
            return n < 128 ? n : 202 === n ? y(e, t) : 203 === n ? g(e, t) : 204 === n ? o(e, t) : 205 === n ? a(e, t) : 206 === n ? u(e, t) : 207 === n ? f(e, t) : 208 === n ? i(e, t) : 209 === n ? s(e, t) : 210 === n ? c(e, t) : 211 === n ? h(e, t) : n > 223 ? -1 * (255 - n + 1) : void 0
        }, t.numberCheck = function (e, t) {
            var n = e[t.offset];
            return n < 128 || n >= 202 && n <= 211
        }, t.arrayCheck = function (e, t) {
            return e[t.offset] < 160
        }, t.nilCheck = function (e, t) {
            return e[t.offset] === r.NIL
        }, t.indexChangeCheck = function (e, t) {
            return e[t.offset] === r.INDEX_CHANGE
        }
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }),
            o = this && this.__decorate || function (e, t, n, r) {
                var i, o = arguments.length,
                    s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
                else
                    for (var a = e.length - 1; a >= 0; a--)(i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                return o > 3 && s && Object.defineProperty(t, n, s), s
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(11),
            a = n(0),
            c = n(1),
            u = n(2),
            h = new s.Context,
            f = function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return i(t, e), o([s.type("string", h)], t.prototype, "name", void 0), o([s.type("string", h)], t.prototype, "type", void 0), o([s.type("uint8", h)], t.prototype, "referencedType", void 0), t
            }(a.Schema);
        t.ReflectionField = f;
        var l = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.fields = new c.ArraySchema, t
            }
            return i(t, e), o([s.type("uint8", h)], t.prototype, "id", void 0), o([s.type([f], h)], t.prototype, "fields", void 0), t
        }(a.Schema);
        t.ReflectionType = l;
        var p = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.types = new c.ArraySchema, t
            }
            return i(t, e), t.encode = function (e) {
                var n = e.constructor,
                    r = new t;
                r.rootType = n._typeid;
                var i = function (e, t) {
                        for (var n in t) {
                            var i = new f;
                            i.name = n;
                            var o = void 0;
                            if ("string" == typeof t[n]) o = t[n];
                            else {
                                var s = "function" == typeof t[n],
                                    a = Array.isArray(t[n]),
                                    c = !a && t[n].map,
                                    u = void 0;
                                s ? (o = "ref", u = t[n]) : a ? (o = "array", "string" == typeof t[n][0] ? o += ":" + t[n][0] : u = t[n][0]) : c && (o = "map", "string" == typeof t[n].map ? o += ":" + t[n].map : u = t[n].map), i.referencedType = u ? u._typeid : 255
                            }
                            i.type = o, e.fields.push(i)
                        }
                        r.types.push(e)
                    },
                    o = n._context.types;
                for (var s in o) {
                    var a = new l;
                    a.id = Number(s), i(a, o[s]._schema)
                }
                return r.encodeAll()
            }, t.decode = function (e) {
                var n = new s.Context,
                    r = new t;
                r.decode(e);
                var o = r.types.reduce((function (e, t) {
                    return e[t.id] = function (e) {
                        function t() {
                            return null !== e && e.apply(this, arguments) || this
                        }
                        return i(t, e), t
                    }(a.Schema), e
                }), {});
                r.types.forEach((function (e, t) {
                    e.fields.forEach((function (t) {
                        var r = o[e.id];
                        if (void 0 !== t.referencedType) {
                            var i = o[t.referencedType];
                            i || (i = t.type.split(":")[1]), 0 === t.type.indexOf("array") ? s.type([i], n)(r.prototype, t.name) : 0 === t.type.indexOf("map") ? s.type({
                                map: i
                            }, n)(r.prototype, t.name) : "ref" === t.type && s.type(i, n)(r.prototype, t.name)
                        } else s.type(t.type, n)(r.prototype, t.name)
                    }))
                }));
                var h = o[r.rootType],
                    f = new h;
                for (var l in h._schema) {
                    var p = h._schema[l];
                    if ("string" != typeof p) {
                        var d = "function" == typeof p,
                            v = Array.isArray(p),
                            y = !v && p.map;
                        f[l] = v ? new c.ArraySchema : y ? new u.MapSchema : d ? new p : void 0
                    }
                }
                return f
            }, o([s.type([l], h)], t.prototype, "types", void 0), o([s.type("uint8", h)], t.prototype, "rootType", void 0), t
        }(a.Schema);
        t.Reflection = p
    }])
}));