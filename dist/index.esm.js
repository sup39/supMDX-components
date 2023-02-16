import React from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var hx = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var anchoredHx = Object.fromEntries(hx.map(function (H) { return [
    H,
    function (_a) {
        var children = _a.children, id = _a.id, props = __rest(_a, ["children", "id"]);
        return (React.createElement(H, __assign({}, __assign({ id: id }, props)),
            id && React.createElement("a", { className: "anchor", href: '#' + encodeURIComponent(id) }),
            children));
    },
]; }));

var AttrProxyHandler = {
    get: function (_a, modifier) {
        var _b;
        var tagName = _a.tagName, attrs = _a.attrs;
        var extra;
        if (typeof modifier === 'symbol') {
            extra = {};
        }
        else if (modifier.startsWith('#')) {
            // #id
            extra = { id: modifier.slice(1) };
        }
        else if (modifier.includes('=')) {
            // attr=value
            var idx = modifier.indexOf('=');
            extra = (_b = {}, _b[modifier.slice(0, idx)] = modifier.slice(idx + 1), _b);
        }
        else {
            // .class
            extra = { class: attrs.class ? attrs.class + ' ' + modifier : modifier };
        }
        // apply
        return new Proxy(Object.assign(function () { }, { tagName: tagName, attrs: __assign(__assign({}, attrs), extra) }), AttrProxyHandler);
    },
    apply: function (_a, thisArg, args) {
        var tagName = _a.tagName, _b = _a.attrs, className = _b.class, htmlFor = _b.for, style = _b.style, attrs = __rest(_b, ["class", "for", "style"]);
        var s = args[0], argv = args.slice(1);
        var children = s instanceof Array ?
            s[0] + argv.map(function (e, i) { return "".concat(e).concat(s[i + 1]); }).join('') : s;
        return React.createElement(tagName, __assign(__assign({ className: className, htmlFor: htmlFor }, (style == null ? {} : {
            style: Object.fromEntries(style.split(';').flatMap(function (line) {
                var idx = line.indexOf(':');
                if (idx < 0)
                    return [];
                var key0 = line.slice(0, idx);
                var value = line.slice(idx + 1);
                // kebab-case to camelCase
                var ktoks = key0.split('-');
                var key = ktoks[0] + ktoks.slice(1).map(function (s) { return s[0].toUpperCase() + s.slice(1); }).join('');
                return [[key, value]];
            })),
        })), attrs), children);
    },
};
var TagProxyHandler = {
    get: function (self, arg) {
        var tagName = arg.toString();
        return new Proxy(Object.assign(function () { }, { tagName: tagName, attrs: {} }), AttrProxyHandler);
    },
};
var T = new Proxy({}, TagProxyHandler);
var S = T.span;
var C = T.code;
var tags = { T: T, S: S, C: C };

var components = __assign({}, anchoredHx);

export { AttrProxyHandler, C, S, T, TagProxyHandler, anchoredHx, components, tags };
//# sourceMappingURL=index.esm.js.map
