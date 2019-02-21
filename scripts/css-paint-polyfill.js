!(function() {
  function e(e, t) {
    var n = new XMLHttpRequest();
    (n.onreadystatechange = function() {
      4 === n.readyState && t(n.responseText);
    }),
      n.open('GET', e, !0),
      n.send();
  }
  function t(e, t, n) {
    Object.defineProperty ? Object.defineProperty(e, t, n) : (e[t] = n.get());
  }
  var n;
  window.CSS || (window.CSS = {}),
    'paintWorklet' in window.CSS ||
      t(window.CSS, 'paintWorklet', {
        get: function() {
          return n || (n = new q());
        }
      });
  var r = 'css-paint-polyfill',
    i = document.createElement(r);
  (i.style.cssText = 'display: none;'), document.documentElement.appendChild(i);
  var o = document.createElement('style');
  (o.id = r), (o.$$isPaint = !0), i.appendChild(o);
  var a = o.sheet,
    s = i.style,
    l = [],
    c = /(paint\(|-moz-element\(#paint-|-webkit-canvas\(paint-|[('"]blob:[^'"#]+#paint=|[('"]data:image\/paint-)/,
    u = 'getCSSCanvasContext' in document,
    p = (s.backgroundImage = '-moz-element(#' + r + ')') === s.backgroundImage;
  s.cssText = '';
  var d = window.requestAnimationFrame || setTimeout,
    v =
      'function' == typeof Promise
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout,
    h = function() {
      return window.devicePixelRatio || 1;
    },
    f = {},
    g = {},
    m = 0;
  function y(e) {
    var t = (e.bit ^= 1);
    return e.instances[t] || (e.instances[t] = new e.Painter());
  }
  function b(e, t) {
    var n = e.cssText;
    !0 === t.isNew && c.test(n) && n !== (n = T(n)) && (e = x(e, n));
    var r,
      i,
      o,
      a = e.selectorText,
      s = V(e.style);
    if (
      ((r = null == t.counters[a] ? (t.counters[a] = 1) : ++t.counters[a]),
      null != g[(i = 'sheet' + t.sheetId + '\n' + a + '\n' + r)])
    ) {
      if ((o = g[i]).selector === a)
        return (o.rule = e), void (o.cssText !== s && t.toProcess.push(o));
      t.toRemove.push(o);
    } else
      (o = g[i] = {key: i, selector: a, cssText: s, properties: {}, rule: e}),
        t.toProcess.push(o.selector);
  }
  function $(e, t) {
    t(e);
    for (var n = e.firstElementChild; n; ) $(n, t), (n = n.nextElementSibling);
  }
  function P() {
    for (
      var e = [].slice.call(document.styleSheets),
        t = {
          toProcess: [],
          toRemove: [],
          counters: {},
          isNew: !1,
          sheetId: null
        },
        n = 0;
      n < e.length;
      n++
    ) {
      var r = e[n].ownerNode;
      r.$$isPaint ||
        ((t.sheetId = r.$$paintid),
        (t.isNew = null == t.sheetId),
        (t.isNew && ((t.sheetId = r.$$paintid = ++m), !1 === S(r))) ||
          w(r.sheet, b, t));
    }
    for (var i = t.toRemove.length; i--; ) delete g[t.toRemove[i].key];
    t.toProcess.length > 0 &&
      (function(e) {
        for (var t = document.querySelectorAll(e), n = 0; n < t.length; n++)
          I(t[n]);
      })(t.toProcess.join(', '));
  }
  function w(e, t, n) {
    var r = [[0, e.cssRules]],
      i = r[0],
      o = i[1];
    if (o)
      for (var a = 0; r.length > 0; a++)
        if (a >= o.length) {
          r.pop();
          var s = r.length;
          s > 0 && ((o = (i = r[s - 1])[1]), (a = i[0]));
        } else {
          i[0] = a;
          var l = o[a];
          if (1 === l.type) {
            var c = t(l, n);
            void 0 !== c && (n = c);
          } else l.cssRules && l.cssRules.length > 0 && r.push([0, l.cssRules]);
        }
    return n;
  }
  function x(e, t) {
    for (
      var n = e.parentStyleSheet,
        r = e.parentRule,
        i = (r || n).cssRules,
        o = i.length - 1,
        a = 0;
      a <= o;
      a++
    )
      if (i[a] === e) {
        (r || n).deleteRule(a), (o = a);
        break;
      }
    if (null != t) {
      if (r) {
        var s = r.appendRule(t);
        return r.cssRules[s];
      }
      return n.insertRule(t, o), n.cssRules[o];
    }
  }
  function S(t) {
    if (!t.$$isPaint) {
      if (t.href) return e(t.href, C), !1;
      for (var n = t.childNodes.length; n--; ) {
        var r = t.childNodes[n].nodeValue,
          i = T(r);
        i !== r && (t.childNodes[n].nodeValue = i);
      }
    }
  }
  function C(e) {
    var t = document.createElement('style');
    (t.disabled = !0),
      (t.$$paintid = ++m),
      t.appendChild(document.createTextNode(T(e))),
      (document.head || document.createElement('head')).appendChild(t);
    var n,
      r = [];
    for (w(t.sheet, R, r); (n = r.pop()); ) x(n, null);
    P(), (t.disabled = !1);
  }
  function R(e, t) {
    c.test(e.cssText) || t.push(e);
  }
  function T(e) {
    return e.replace(
      /(;|,|\b)paint\s*\(\s*(['"]?)(.+?)\2\s*\)(;|,|!|\b)/,
      '$1url(data:image/paint-$3,=)$4'
    );
  }
  var E,
    k,
    O = [];
  function I(e) {
    !0 !== e.$$paintPending &&
      ((e.$$paintPending = !0), -1 === O.indexOf(e) && 1 === O.push(e) && v(N));
  }
  function N() {
    for (var e; (e = O.pop()); ) A(e);
  }
  function L(e, t, n) {
    for (
      var r = e.length,
        i = function() {
          --r || t.apply(null, n || l);
        },
        o = 0;
      o < e.length;
      o++
    ) {
      var a = new Image();
      (a.onload = i), (a.onerror = onerror), (a.src = e[o]);
    }
  }
  function j(e) {
    var t = e.$$paintId;
    return null == t && (t = e.$$paintId = ++U), t;
  }
  function D(e) {
    var t = e.$$paintRule,
      n = j(e);
    if (null == t) {
      e.hasAttribute('data-css-paint') || e.setAttribute('data-css-paint', n);
      var r = a.insertRule(
        '[data-css-paint="' + U + '"] {}',
        a.cssRules.length
      );
      t = e.$$paintRule = a.cssRules[r];
    }
    return t;
  }
  function V(e) {
    var t = e.cssText;
    if (t) return t;
    t = '';
    for (var n = 0, r = void 0; n < e.length; n++)
      (r = e[n]),
        0 !== n && (t += ' '),
        (t += r),
        (t += ':'),
        (t += e.getPropertyValue(r)),
        (t += ';');
    return t;
  }
  function A(e) {
    var t = getComputedStyle(e);
    if (e.$$paintObservedProperties)
      for (var n = 0; n < e.$$paintObservedProperties.length; n++) {
        var r = e.$$paintObservedProperties[n];
        if (
          t.getPropertyValue(r).trim() !== e.$$paintedPropertyValues[r].trim()
        ) {
          z(e, t);
          break;
        }
      }
    else if (e.$$paintId || c.test(V(t))) return void z(e, t);
    e.$$paintPending = !1;
  }
  var M = {
      get: function(e) {
        return e in k ? k[e] : (k[e] = E.getPropertyValue(e));
      }
    },
    U = 0;
  function z(e, t) {
    o.disabled = !0;
    var n,
      r = (E = null == t ? getComputedStyle(e) : t);
    k = {};
    var a = [];
    e.$$paintPending = !1;
    for (
      var s = {width: e.clientWidth, height: e.clientHeight},
        l = h(),
        c = e.$$paintedProperties,
        d = 0;
      d < r.length;
      d++
    ) {
      for (
        var v = r[d],
          g = M.get(v),
          m = /(,|\b|^)url\((['"]?)((?:-moz-element\(#|-webkit-canvas\()paint-\d+-([^;,]+)\)|(?:data:image\/paint-|blob:[^'"#]+#paint=)([^"';, ]+)[;,].*?)\2\)(,|\b|$)/g,
          b = '',
          $ = 0,
          P = [],
          w = !1,
          x = !1,
          S = void 0,
          C = void 0;
        (C = m.exec(g));

      ) {
        !1 === x && (S = j(e)), (x = !0), (b += g.substring(0, C.index));
        var R = C[4] || C[5],
          T = C[3],
          O = f[R],
          I = (O && O.Painter.contextOptions) || {},
          N = !1 === I.scaling ? 1 : l,
          V = void 0;
        O &&
          (O.Painter.inputProperties &&
            a.push.apply(a, O.Painter.inputProperties),
          (V = y(O))),
          !0 === I.nativePixels && ((s.width *= l), (s.height *= l), (N = 1));
        var A = N * s.width,
          U = N * s.height,
          z = e.$$paintContext,
          q = 'paint-' + S + '-' + R;
        if (z && z.canvas && z.canvas.width == A && z.canvas.height == U)
          z.clearRect(0, 0, A, U);
        else {
          if (!0 === u) z = document.getCSSCanvasContext('2d', q, A, U);
          else {
            var B = document.createElement('canvas');
            (B.id = q),
              (B.width = A),
              (B.height = U),
              !0 === p && ((B.style.display = 'none'), i.appendChild(B)),
              (z = B.getContext('2d'));
          }
          (e.$$paintContext = z),
            (z.imageSmoothingEnabled = !1),
            1 !== N && z.scale(N, N);
        }
        if (
          (V &&
            (z.save(),
            z.beginPath(),
            V.paint(z, s, M),
            z.closePath(),
            z.restore(),
            !1 === u && 'resetTransform' in z && z.resetTransform()),
          (b += C[1]),
          !0 === u)
        )
          (b += '-webkit-canvas(' + q + ')'), (w = null == C[4]);
        else if (!0 === p)
          (b += '-moz-element(#' + q + ')'), (w = null == C[4]);
        else {
          var F = z.canvas
            .toDataURL('image/png')
            .replace('/png', '/paint-' + R);
          if (
            ('function' == typeof MSBlobBuilder && (F = H(F, R)),
            P.push(F),
            (b += 'url("' + F + '")'),
            F !== T || !n)
          ) {
            var G = T ? T.indexOf('#') : -1;
            ~G && URL.revokeObjectURL(T.substring(0, G)), (w = !0);
          }
          T = F;
        }
        (b += C[6]), ($ = C.index + C[0].length);
      }
      !1 !== x || null == c || null == c[v]
        ? ((b += g.substring($)),
          w &&
            (n || (n = D(e)),
            null == c && (c = e.$$paintedProperties = {}),
            (c[v] = !0),
            'background' === v.substring(0, 10) &&
              1 !== l &&
              W(n.style, 'background-size', s.width + 'px ' + s.height + 'px'),
            0 === P.length ? W(n.style, v, b) : L(P, W, [n.style, v, b])))
        : (n || (n = D(e)), n.style.removeProperty(v));
    }
    e.$$paintObservedProperties = 0 === a.length ? null : a;
    for (var X = (e.$$paintedPropertyValues = {}), J = 0; J < a.length; J++) {
      var K = a[J];
      X[K] = M.get(K);
    }
    o.disabled = !1;
  }
  function H(e, t) {
    for (
      var n = atob(e.split(',')[1]), r = new Uint8Array(n.length), i = 0;
      i < n.length;
      i++
    )
      r[i] = n.charCodeAt(i);
    return URL.createObjectURL(new Blob([r])) + '#paint=' + t;
  }
  function W(e, t, n) {
    e.setProperty(t, n, 'important');
  }
  var q = function() {
    d(P);
    var e = document.createElement('x-a');
    document.body.appendChild(e);
    var n = !1,
      r = !1;
    new MutationObserver(function(t) {
      if (!0 !== r) {
        r = !0;
        for (var i = 0; i < t.length; i++) {
          var o = t[i],
            a = void 0;
          if ('childList' === o.type && (a = o.addedNodes))
            for (var s = 0; s < a.length; s++) 1 === a[s].nodeType && I(a[s]);
          else
            'attributes' === o.type &&
              1 === o.target.nodeType &&
              (o.target === e ? (n = !0) : $(o.target, I));
        }
        r = !1;
      }
    }).observe(document.body, {childList: !0, attributes: !0, subtree: !0}),
      (e.style.cssText = 'color: red;'),
      setTimeout(function() {
        if ((document.body.removeChild(e), !n)) {
          var r = Object.getOwnPropertyDescriptor(
              HTMLElement.prototype,
              'style'
            ),
            i = r.get;
          (r.get = function() {
            var e = i.call(this);
            return (e.ownerElement = this), e;
          }),
            t(HTMLElement.prototype, 'style', r);
          var o = Object.getOwnPropertyDescriptor(
              CSSStyleDeclaration.prototype,
              'cssText'
            ),
            a = o.set;
          (o.set = function(e) {
            return this.ownerElement && I(this.ownerElement), a.call(this, e);
          }),
            t(CSSStyleDeclaration.prototype, 'cssText', o);
          var s = Object.getOwnPropertyDescriptor(
              CSSStyleDeclaration.prototype,
              'setProperty'
            ),
            l = s.value;
          (s.value = function(e, t, n) {
            this.ownerElement && I(this.ownerElement), l.call(this, e, t, n);
          }),
            t(CSSStyleDeclaration.prototype, 'setProperty', s);
        }
      });
  };
  q.prototype.addModule = function(n) {
    var r = this;
    e(n, function(e) {
      var n = {
        registerPaint: function(e, t) {
          !(function(e, t, n) {
            (f[e] = {
              worklet: n,
              Painter: t,
              properties: t.inputProperties
                ? [].slice.call(t.inputProperties)
                : [],
              bit: 0,
              instances: []
            }),
              P();
          })(e, t, {context: n, realm: o});
        }
      };
      t(n, 'devicePixelRatio', {get: h}), (n.self = n);
      var o = new function(e, t) {
        var n = document.createElement('iframe');
        (n.style.cssText =
          'position:absolute; left:0; top:-999px; width:1px; height:1px;'),
          t.appendChild(n);
        var r = n.contentWindow,
          i = r.document,
          o = 'var window,$hook';
        for (var a in r) a in e || 'eval' === a || ((o += ','), (o += a));
        for (var s in e) (o += ','), (o += s), (o += '=self.'), (o += s);
        var l = i.createElement('script');
        l.appendChild(
          i.createTextNode(
            'function $hook(self,console) {"use strict";\n\t\t' +
              o +
              ';return function() {return eval(arguments[0])}}'
          )
        ),
          i.body.appendChild(l),
          (this.exec = r.$hook(e, console));
      }(n, i);
      (e = (r.transpile || String)(e)), o.exec(e);
    });
  };
})();
