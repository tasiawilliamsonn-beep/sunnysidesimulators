/*
 * Crossroads Escapes: visual kit.
 * EscapeKit() returns { V: diagram renderers, SIMS: hands-on simulations }.
 * Self-contained so its source can be copied into exported rooms.
 */
function EscapeKit() {
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function svg(w, h, body, label, max) {
    return '<svg class="ep-svg" viewBox="0 0 ' + w + ' ' + h + '" style="max-width:' + (max || w) + 'px" role="img" aria-label="' + esc(label || 'Diagram') + '">' + body + '</svg>';
  }
  function f1(n) { return Math.round(n * 10) / 10; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function fracText(num, den) {
    if (den === 1) return String(num);
    var g = gcd(num, den); num /= g; den /= g;
    if (den === 1) return String(num);
    var w = Math.floor(num / den), r = num % den;
    return (w ? w + ' ' : '') + r + '/' + den;
  }
  function tgt(o, id, label) {
    return o && o.interactive && id != null ? ' class="ep-t" data-t="' + esc(id) + '" tabindex="0" role="button" aria-label="' + esc(label || id) + '"' : '';
  }
  var INK = '#1d2433', SOFT = '#6b7280', PAPER = '#ffffff';
  var V = {};

  /* ---------- fraction models ---------- */
  V.pie = function (sp, o) {
    o = o || {}; var n = sp.n, r = 86, cx = 100, cy = 100, s = '', pizza = sp.style === 'pizza';
    for (var i = 0; i < n; i++) {
      var on = o.sel ? !!o.sel[i] : i < (sp.shaded || 0);
      var a1 = i / n * 2 * Math.PI - Math.PI / 2, a2 = (i + 1) / n * 2 * Math.PI - Math.PI / 2;
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      var fill = pizza ? (on ? '#F7D774' : '#ffffff') : (on ? '' : '#ffffff');
      var cls = !pizza && on ? ' class="ep-fa1"' : '';
      var stroke = pizza ? (on ? '#E9B45C' : '#bbbbbb') : INK;
      var d = n === 1 ? 'M' + cx + ',' + (cy - r) + ' A' + r + ',' + r + ' 0 1 1 ' + (cx - 0.01) + ',' + (cy - r) + ' Z' :
        'M' + cx + ',' + cy + ' L' + f1(x1) + ',' + f1(y1) + ' A' + r + ',' + r + ' 0 ' + (a2 - a1 > Math.PI ? 1 : 0) + ' 1 ' + f1(x2) + ',' + f1(y2) + ' Z';
      var dp = o.interactive ? ' data-part="' + i + '" class="ep-part' + (on && !pizza ? ' ep-fa1' : '') + '" tabindex="0" role="button" aria-pressed="' + on + '" aria-label="Slice ' + (i + 1) + '"' : cls;
      s += '<path d="' + d + '"' + (fill ? ' fill="' + fill + '"' : '') + ' stroke="' + stroke + '" stroke-width="' + (pizza ? (on ? 5 : 2) : 2.5) + '"' + (pizza && !on ? ' stroke-dasharray="6 5"' : '') + dp + '/>';
      if (pizza && on) {
        var am = (a1 + a2) / 2, pr = n > 1 ? r * .56 : 0;
        s += '<circle cx="' + f1(cx + pr * Math.cos(am)) + '" cy="' + f1(cy + pr * Math.sin(am)) + '" r="' + Math.max(5, Math.min(10, 60 / n)) + '" fill="#C8272D" pointer-events="none"/>';
      }
    }
    if (pizza) s = '<circle cx="100" cy="100" r="94" fill="#E9B45C" opacity=".35"/>' + s;
    return svg(200, 200, s, sp.label || ('A circle cut into ' + n + ' equal parts'), sp.size || 220);
  };
  V.bar = function (sp, o) {
    o = o || {}; var n = sp.n, W = 480, H = 64, x0 = 10, w = (W - 20) / n, s = '';
    for (var i = 0; i < n; i++) {
      var on = o.sel ? !!o.sel[i] : i < (sp.shaded || 0);
      s += '<rect x="' + f1(x0 + i * w) + '" y="8" width="' + f1(w) + '" height="' + (H - 16) + '" stroke="' + INK + '" stroke-width="2.5" fill="' + (on ? '' : PAPER) + '"' +
        (o.interactive ? ' data-part="' + i + '" class="ep-part' + (on ? ' ep-fa1' : '') + '" tabindex="0" role="button" aria-pressed="' + on + '" aria-label="Part ' + (i + 1) + '"' : (on ? ' class="ep-fa1"' : '')) + '/>';
    }
    if (sp.label) s += '<text x="' + W / 2 + '" y="' + (H + 16) + '" text-anchor="middle" font-size="16" fill="' + INK + '">' + esc(sp.label) + '</text>';
    return svg(W, H + (sp.label ? 24 : 0), s, sp.label || ('A bar split into ' + n + ' equal parts'), 520);
  };
  V.grid100 = function (sp, o) {
    o = o || {}; var s = '', c = 28, n = sp.cells || 100, cols = n === 10 ? 10 : 10, rows = n / cols;
    for (var i = 0; i < n; i++) {
      var on = o.sel ? !!o.sel[i] : i < (sp.shaded || 0), x = 6 + (i % cols) * c, y = 6 + Math.floor(i / cols) * c;
      s += '<rect x="' + x + '" y="' + y + '" width="' + c + '" height="' + c + '" stroke="' + INK + '" stroke-width="1.5" fill="' + (on ? '' : PAPER) + '"' +
        (o.interactive ? ' data-part="' + i + '" class="ep-part' + (on ? ' ep-fa1' : '') + '"' : (on ? ' class="ep-fa1"' : '')) + '/>';
    }
    return svg(cols * c + 12, rows * c + 12, s, sp.label || ('A grid of ' + n + ' squares'), cols * c + 12);
  };
  V.blocks = function (sp) {
    var s = '', x = 6, u = 7;
    for (var f = 0; f < (sp.flats || 0); f++) {
      for (var i = 0; i < 100; i++) s += '<rect x="' + (x + (i % 10) * u) + '" y="' + (6 + Math.floor(i / 10) * u) + '" width="' + u + '" height="' + u + '" fill="#8FD3F4" stroke="#1d5f86" stroke-width=".8"/>';
      x += 10 * u + 14;
    }
    for (var r = 0; r < (sp.rods || 0); r++) {
      for (var j = 0; j < 10; j++) s += '<rect x="' + x + '" y="' + (6 + j * u) + '" width="' + u + '" height="' + u + '" fill="#9BE39B" stroke="#2f7a33" stroke-width=".8"/>';
      x += u + 8;
    }
    for (var k = 0; k < (sp.units || 0); k++) {
      s += '<rect x="' + (x + (k % 3) * (u + 4)) + '" y="' + (6 + 10 * u - u - Math.floor(k / 3) * (u + 4)) + '" width="' + u + '" height="' + u + '" fill="#FFD166" stroke="#a37400" stroke-width=".8"/>';
    }
    x += 3 * (u + 4) + 6;
    return svg(Math.max(x, 60), 10 * u + 14, s, sp.label || 'Base-ten blocks', Math.max(x, 60) * 2);
  };
  /* isometric rectangular prisms: boxes [{l,w,h,x,y,z,color}] */
  V.prism = function (sp) {
    var boxes = sp.boxes || [{ l: sp.l, w: sp.w, h: sp.h }], S = sp.unit || 22, c = 0.866;
    function P(x, y, z) { return [(x - y) * S * c, (x + y) * S * 0.5 - z * S]; }
    var pts = [];
    boxes.forEach(function (b) {
      var X = b.x || 0, Y = b.y || 0, Z = b.z || 0;
      [[0, 0, 0], [b.l, 0, 0], [0, b.w, 0], [b.l, b.w, 0], [0, 0, b.h], [b.l, 0, b.h], [0, b.w, b.h], [b.l, b.w, b.h]].forEach(function (q) { pts.push(P(X + q[0], Y + q[1], Z + q[2])); });
    });
    var minx = Math.min.apply(null, pts.map(function (p) { return p[0]; })) - 50, maxx = Math.max.apply(null, pts.map(function (p) { return p[0]; })) + 44;
    var miny = Math.min.apply(null, pts.map(function (p) { return p[1]; })) - 12, maxy = Math.max.apply(null, pts.map(function (p) { return p[1]; })) + 28;
    function pt(x, y, z) { var p = P(x, y, z); return f1(p[0] - minx) + ',' + f1(p[1] - miny); }
    var s = '', order = boxes.slice().sort(function (a, b) { return ((a.x || 0) + (a.y || 0)) - ((b.x || 0) + (b.y || 0)) || (a.z || 0) - (b.z || 0); });
    var palette = [['#FFE08A', '#F2B84B', '#D18F1E'], ['#9ED3F7', '#5DAEE0', '#2D7EB3'], ['#B7E4A5', '#7CC46A', '#4E9A3E']];
    order.forEach(function (b, bi) {
      var X = b.x || 0, Y = b.y || 0, Z = b.z || 0, l = b.l, w = b.w, h = b.h, col = palette[(b.color != null ? b.color : bi) % 3], grid = '';
      var top = 'M' + pt(X, Y, Z + h) + ' L' + pt(X + l, Y, Z + h) + ' L' + pt(X + l, Y + w, Z + h) + ' L' + pt(X, Y + w, Z + h) + ' Z';
      var right = 'M' + pt(X + l, Y, Z) + ' L' + pt(X + l, Y + w, Z) + ' L' + pt(X + l, Y + w, Z + h) + ' L' + pt(X + l, Y, Z + h) + ' Z';
      var front = 'M' + pt(X, Y + w, Z) + ' L' + pt(X + l, Y + w, Z) + ' L' + pt(X + l, Y + w, Z + h) + ' L' + pt(X, Y + w, Z + h) + ' Z';
      if (sp.grid !== false) {
        for (var i = 1; i < l; i++) grid += 'M' + pt(X + i, Y, Z + h) + ' L' + pt(X + i, Y + w, Z + h) + ' M' + pt(X + i, Y + w, Z) + ' L' + pt(X + i, Y + w, Z + h) + ' ';
        for (var j = 1; j < w; j++) grid += 'M' + pt(X, Y + j, Z + h) + ' L' + pt(X + l, Y + j, Z + h) + ' M' + pt(X + l, Y + j, Z) + ' L' + pt(X + l, Y + j, Z + h) + ' ';
        for (var k = 1; k < h; k++) grid += 'M' + pt(X + l, Y, Z + k) + ' L' + pt(X + l, Y + w, Z + k) + ' M' + pt(X, Y + w, Z + k) + ' L' + pt(X + l, Y + w, Z + k) + ' ';
      }
      s += '<path d="' + top + '" fill="' + col[0] + '" stroke="' + INK + '" stroke-width="2"/><path d="' + right + '" fill="' + col[1] + '" stroke="' + INK + '" stroke-width="2"/><path d="' + front + '" fill="' + col[2] + '" stroke="' + INK + '" stroke-width="2"/>';
      if (grid) s += '<path d="' + grid + '" stroke="' + INK + '" stroke-width="1" opacity=".55" fill="none"/>';
      if (sp.labels !== false && b.lab !== false) {
        var lp = P(X + l / 2, Y + w, Z), wp = P(X + l, Y + w / 2, Z), hp = P(X, Y + w, Z + h / 2), hr = bi > 0 && order.length > 1;
        if (hr) hp = P(X + l, Y, Z + h / 2);
        var u = sp.u ? ' ' + sp.u : '';
        s += '<text x="' + f1(lp[0] - minx - 8) + '" y="' + f1(lp[1] - miny + 22) + '" font-size="15" font-weight="700" text-anchor="middle" fill="' + INK + '">' + (b.ll != null ? b.ll : l + u) + '</text>';
        s += '<text x="' + f1(wp[0] - minx + 12) + '" y="' + f1(wp[1] - miny + 20) + '" font-size="15" font-weight="700" text-anchor="middle" fill="' + INK + '">' + (b.wl != null ? b.wl : w + u) + '</text>';
        s += '<text x="' + f1(hp[0] - minx + (hr ? 10 : -10)) + '" y="' + f1(hp[1] - miny + 5) + '" font-size="15" font-weight="700" text-anchor="' + (hr ? 'start' : 'end') + '" fill="' + INK + '">' + (b.hl != null ? b.hl : h + u) + '</text>';
      }
    });
    var W = f1(maxx - minx), H = f1(maxy - miny);
    return svg(W, H, s, sp.label || 'A rectangular prism', Math.min(460, W * 1.4));
  };
  V.cylinder = function (sp) {
    var max = sp.max || 100, step = sp.step || 10, H = 240, top = 20, bot = 220, x = 70, w = 70, s = '';
    var y = function (ml) { return bot - (ml / max) * (bot - top); };
    var lv = y(sp.ml);
    s += '<rect x="' + x + '" y="' + f1(lv) + '" width="' + w + '" height="' + f1(bot - lv) + '" fill="#8FD3F4" opacity=".85"/>';
    s += '<path d="M' + x + ',' + f1(lv) + ' Q' + (x + w / 2) + ',' + f1(lv + 8) + ' ' + (x + w) + ',' + f1(lv) + '" fill="none" stroke="#1d5f86" stroke-width="2"/>';
    if (sp.rock) s += '<path d="M' + (x + 16) + ',' + (bot - 4) + ' Q' + (x + 12) + ',' + (bot - 26) + ' ' + (x + 34) + ',' + (bot - 30) + ' Q' + (x + 58) + ',' + (bot - 26) + ' ' + (x + 54) + ',' + (bot - 4) + ' Z" fill="#8a7e6b" stroke="' + INK + '" stroke-width="1.5"/>';
    s += '<path d="M' + x + ',' + (top - 8) + ' V' + bot + ' Q' + x + ',' + (bot + 10) + ' ' + (x + 10) + ',' + (bot + 10) + ' H' + (x + w - 10) + ' Q' + (x + w) + ',' + (bot + 10) + ' ' + (x + w) + ',' + bot + ' V' + (top - 8) + '" fill="none" stroke="' + INK + '" stroke-width="3"/>';
    for (var m = 0; m <= max; m += step / 2) {
      var yy = f1(y(m)), major = m % step === 0;
      s += '<path d="M' + (x + w) + ',' + yy + ' h-' + (major ? 16 : 8) + '" stroke="' + INK + '" stroke-width="1.5"/>';
      if (major) s += '<text x="' + (x + w + 8) + '" y="' + (+yy + 5) + '" font-size="14" fill="' + INK + '">' + m + '</text>';
    }
    s += '<text x="' + (x + w + 8) + '" y="' + (top - 10) + '" font-size="13" fill="' + SOFT + '">mL</text>';
    return svg(200, H + 12, s, sp.label || 'A graduated cylinder', 200);
  };
  /* static number line */
  function tickLabel(v, sp, i) {
    if (sp.fmt === 'frac') return fracText(Math.round((v - sp.min) * sp.den + sp.min * sp.den), sp.den);
    if (sp.fmt === 'dec') return v.toFixed(sp.dp == null ? 1 : sp.dp);
    if (sp.fmt === 'neg') return String(Math.round(v)).replace('-', '−');
    return String(Math.round(v * 1000) / 1000).replace('-', '−');
  }
  function numberLine(sp, o) {
    o = o || {};
    var vert = !!sp.vertical, W = vert ? 220 : 620, H = vert ? 360 : 120, L = vert ? 30 : 40, R = vert ? 330 : 580, s = '';
    var ticks = sp.ticks || 10, minor = sp.minor || 1;
    function pos(v) { var t = (v - sp.min) / (sp.max - sp.min); return vert ? R - t * (R - L) : L + t * (R - L); }
    var axis = vert ? 'M70,' + (L - 10) + ' V' + (R + 10) : 'M' + (L - 16) + ',60 H' + (R + 16);
    s += '<path d="' + axis + '" stroke="' + INK + '" stroke-width="3"/>';
    s += vert ? '<path d="M64,' + (L - 6) + ' L70,' + (L - 18) + ' L76,' + (L - 6) + ' M64,' + (R + 6) + ' L70,' + (R + 18) + ' L76,' + (R + 6) + '" fill="none" stroke="' + INK + '" stroke-width="3"/>'
      : '<path d="M' + (L - 10) + ',54 L' + (L - 22) + ',60 L' + (L - 10) + ',66 M' + (R + 10) + ',54 L' + (R + 22) + ',60 L' + (R + 10) + ',66" fill="none" stroke="' + INK + '" stroke-width="3"/>';
    var labels = sp.labels || 'all';
    for (var i = 0; i <= ticks * minor; i++) {
      var v = sp.min + i * (sp.max - sp.min) / (ticks * minor), p = f1(pos(v)), major = i % minor === 0, mi = i / minor;
      s += vert ? '<path d="M' + (major ? 58 : 63) + ',' + p + ' H' + (major ? 82 : 77) + '" stroke="' + INK + '" stroke-width="' + (major ? 2.5 : 1.5) + '"/>'
        : '<path d="M' + p + ',' + (major ? 48 : 53) + ' V' + (major ? 72 : 67) + '" stroke="' + INK + '" stroke-width="' + (major ? 2.5 : 1.5) + '"/>';
      var show = major && (labels === 'all' || (labels === 'ends' && (mi === 0 || mi === ticks)) || (Array.isArray(labels) && labels.indexOf(mi) >= 0));
      if (show) s += vert ? '<text x="90" y="' + (+p + 5) + '" font-size="15" fill="' + INK + '">' + esc(tickLabel(v, sp, mi)) + (sp.unit ? ' ' + esc(sp.unit) : '') + '</text>'
        : '<text x="' + p + '" y="96" font-size="16" text-anchor="middle" fill="' + INK + '">' + esc(tickLabel(v, sp, mi)) + '</text>';
    }
    (sp.points || []).forEach(function (pt) {
      var p = f1(pos(pt.v));
      s += vert ? '<circle cx="70" cy="' + p + '" r="8" fill="' + (pt.color || '#C8272D') + '" stroke="#fff" stroke-width="2"/><text x="40" y="' + (+p + 5) + '" font-size="14" font-weight="700" text-anchor="end" fill="' + INK + '">' + esc(pt.label || '') + '</text>'
        : '<circle cx="' + p + '" cy="60" r="8" fill="' + (pt.color || '#C8272D') + '" stroke="#fff" stroke-width="2"/><text x="' + p + '" y="36" font-size="14" font-weight="700" text-anchor="middle" fill="' + INK + '">' + esc(pt.label || '') + '</text>';
    });
    if (o.marker != null) {
      var mp = f1(pos(o.marker));
      s += vert ? '<g class="ep-marker"><path d="M' + 28 + ',' + (mp - 12) + ' L52,' + mp + ' L28,' + (+mp + 12) + ' Z" class="ep-fa2" stroke="' + INK + '" stroke-width="2"/><circle cx="70" cy="' + mp + '" r="9" class="ep-fa2" stroke="' + INK + '" stroke-width="2.5"/></g>'
        : '<g class="ep-marker"><path d="M' + (mp - 12) + ',20 L' + (+mp + 12) + ',20 L' + mp + ',44 Z" class="ep-fa2" stroke="' + INK + '" stroke-width="2"/><circle cx="' + mp + '" cy="60" r="9" class="ep-fa2" stroke="' + INK + '" stroke-width="2.5"/></g>';
    }
    if (o.interactive) s = '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="transparent" class="ep-hit"/>' + s;
    return { html: svg(W, H, s, sp.label || 'A number line from ' + sp.min + ' to ' + sp.max, vert ? 260 : 640), W: W, H: H, L: L, R: R, vert: vert };
  }
  V.nline = function (sp, o) { return numberLine(sp, o).html; };
  V._numberLine = numberLine;

  /* coordinate plane */
  function coordPlane(sp, o) {
    o = o || {};
    var xmin = sp.xmin, xmax = sp.xmax, ymin = sp.ymin, ymax = sp.ymax, step = sp.step || 1;
    var W = 420, H = 420, pad = 36, cw = (W - 2 * pad) / (xmax - xmin), ch = (H - 2 * pad) / (ymax - ymin);
    function X(x) { return pad + (x - xmin) * cw; }
    function Y(y) { return H - pad - (y - ymin) * ch; }
    var s = '', every = sp.every || ((xmax - xmin) > 14 ? 2 : 1);
    for (var x = xmin; x <= xmax; x += step) s += '<path d="M' + f1(X(x)) + ',' + f1(Y(ymin)) + ' V' + f1(Y(ymax)) + '" stroke="#cfd6e2" stroke-width="1"/>';
    for (var y = ymin; y <= ymax; y += step) s += '<path d="M' + f1(X(xmin)) + ',' + f1(Y(y)) + ' H' + f1(X(xmax)) + '" stroke="#cfd6e2" stroke-width="1"/>';
    var ax = Math.min(Math.max(0, xmin), xmax), ay = Math.min(Math.max(0, ymin), ymax);
    s += '<path d="M' + f1(X(xmin) - 8) + ',' + f1(Y(ay)) + ' H' + f1(X(xmax) + 8) + ' M' + f1(X(ax)) + ',' + f1(Y(ymin) + 8) + ' V' + f1(Y(ymax) - 8) + '" stroke="' + INK + '" stroke-width="2.5"/>';
    function lab(v, kind) {
      if (kind === 'lon') return v === 0 ? '0°' : Math.abs(v) + '°' + (v < 0 ? 'W' : 'E');
      if (kind === 'lat') return v === 0 ? '0°' : Math.abs(v) + '°' + (v < 0 ? 'S' : 'N');
      return String(v).replace('-', '−');
    }
    for (x = xmin; x <= xmax; x += step) if (x !== ax && ((x - xmin) / step) % every === 0) s += '<text x="' + f1(X(x)) + '" y="' + f1(Y(ay) + 18) + '" font-size="12" text-anchor="middle" fill="' + INK + '">' + lab(x, sp.xfmt) + '</text>';
    for (y = ymin; y <= ymax; y += step) if (y !== ay && ((y - ymin) / step) % every === 0) s += '<text x="' + f1(X(ax) - 6) + '" y="' + f1(Y(y) + 4) + '" font-size="12" text-anchor="end" fill="' + INK + '">' + lab(y, sp.yfmt) + '</text>';
    if (sp.xlabel) s += '<text x="' + f1(X(xmax)) + '" y="' + f1(Y(ay) - 8) + '" font-size="13" font-weight="700" text-anchor="end" fill="' + SOFT + '">' + esc(sp.xlabel) + '</text>';
    if (sp.ylabel) s += '<text x="' + f1(X(ax) + 8) + '" y="' + f1(Y(ymax) + 4) + '" font-size="13" font-weight="700" fill="' + SOFT + '">' + esc(sp.ylabel) + '</text>';
    if (sp.poly) s += '<polygon points="' + sp.poly.map(function (p) { return f1(X(p[0])) + ',' + f1(Y(p[1])); }).join(' ') + '" fill="rgba(255,196,61,.35)" stroke="#C8272D" stroke-width="2.5"/>';
    (sp.points || []).forEach(function (p) {
      s += '<circle cx="' + f1(X(p.x)) + '" cy="' + f1(Y(p.y)) + '" r="6" fill="' + (p.color || '#1F6FD1') + '" stroke="#fff" stroke-width="2"/>';
      if (p.label) s += '<text x="' + f1(X(p.x) + 9) + '" y="' + f1(Y(p.y) - 8) + '" font-size="13" font-weight="700" fill="' + INK + '">' + esc(p.label) + '</text>';
    });
    if (o.marker) s += '<g class="ep-marker"><circle cx="' + f1(X(o.marker[0])) + '" cy="' + f1(Y(o.marker[1])) + '" r="10" class="ep-fa2" stroke="' + INK + '" stroke-width="3"/><path d="M' + f1(X(o.marker[0]) - 5) + ',' + f1(Y(o.marker[1])) + ' h10 M' + f1(X(o.marker[0])) + ',' + f1(Y(o.marker[1]) - 5) + ' v10" stroke="' + INK + '" stroke-width="2"/></g>';
    if (o.interactive) s = '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="transparent" class="ep-hit"/>' + s;
    return { html: svg(W, H, s, sp.label || 'A coordinate plane', 440), W: W, H: H, pad: pad, cw: cw, ch: ch };
  }
  V.coord = function (sp, o) { return coordPlane(sp, o).html; };
  V._coordPlane = coordPlane;

  /* balance scale picture: left/right arrays of {x:'x'} or numbers */
  V.balance = function (sp) {
    var s = '', tilt = sp.tilt || 0;
    s += '<path d="M190,250 L210,250 L204,90 L196,90 Z" fill="#8a6a3a"/><rect x="140" y="250" width="120" height="14" rx="4" fill="#5c4428"/>';
    s += '<g transform="rotate(' + tilt + ' 200 90)"><rect x="40" y="84" width="320" height="10" rx="5" fill="#5c4428"/>';
    function pan(cx, items) {
      var g = '<path d="M' + (cx - 70) + ',170 L' + cx + ',94 L' + (cx + 70) + ',170" stroke="#5c4428" stroke-width="2" fill="none"/><path d="M' + (cx - 76) + ',170 H' + (cx + 76) + ' Q' + cx + ',196 ' + (cx - 76) + ',170 Z" fill="#c9a66b" stroke="#5c4428" stroke-width="2"/>';
      var n = items.length, bw = 30, gap = 4, per = Math.min(n, 4), startX = cx - (per * (bw + gap) - gap) / 2;
      items.forEach(function (it, i) {
        var col = i % 4, row = Math.floor(i / 4), x = startX + col * (bw + gap), y = 136 - row * (bw + gap);
        var isX = typeof it === 'string';
        g += '<rect x="' + f1(x) + '" y="' + y + '" width="' + bw + '" height="' + bw + '" rx="4" fill="' + (isX ? '#6C63FF' : '#FFD166') + '" stroke="' + INK + '" stroke-width="2"/><text x="' + f1(x + bw / 2) + '" y="' + (y + 21) + '" font-size="16" font-weight="700" text-anchor="middle" fill="' + (isX ? '#fff' : INK) + '">' + esc(isX ? it : it) + '</text>';
      });
      return g;
    }
    s += pan(110, sp.left || []) + pan(290, sp.right || []) + '</g>';
    return svg(400, 270, s, sp.label || 'A balance scale', 420);
  };
  V.thermo = function (sp) {
    var min = sp.min, max = sp.max, top = 20, bot = 240, x = 60, s = '';
    var y = function (v) { return bot - (v - min) / (max - min) * (bot - top); };
    s += '<rect x="' + (x - 12) + '" y="' + (top - 10) + '" width="24" height="' + (bot - top + 20) + '" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="3"/>';
    s += '<circle cx="' + x + '" cy="' + (bot + 24) + '" r="22" fill="#E63946" stroke="' + INK + '" stroke-width="3"/>';
    s += '<rect x="' + (x - 6) + '" y="' + f1(y(sp.value)) + '" width="12" height="' + f1(bot + 10 - y(sp.value)) + '" fill="#E63946"/>';
    var st = sp.step || (max - min) / 10;
    for (var v = min; v <= max + 1e-9; v += st) s += '<path d="M' + (x + 12) + ',' + f1(y(v)) + ' h10" stroke="' + INK + '" stroke-width="2"/><text x="' + (x + 28) + '" y="' + f1(y(v) + 5) + '" font-size="14" fill="' + INK + '">' + String(Math.round(v)).replace('-', '−') + (sp.unit || '') + '</text>';
    return svg(160, 280, s, sp.label || 'A thermometer', 160);
  };

  /* ---------- space ---------- */
  function moonDisc(cx, cy, r, deg) {
    var t = ((deg % 360) + 360) % 360, k = Math.cos(t * Math.PI / 180), rx = f1(Math.abs(k) * r);
    var s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#2B2F3A" stroke="#6b7280" stroke-width="1.5"/>';
    if (t < 3 || t > 357) return s;
    if (Math.abs(t - 180) < 3) return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#F4F1DE"/>';
    var top = cx + ',' + (cy - r), bot = cx + ',' + (cy + r), d;
    if (t < 180) d = 'M' + top + ' A' + r + ' ' + r + ' 0 0 1 ' + bot + ' A' + rx + ' ' + r + ' 0 0 ' + (t < 90 ? 0 : 1) + ' ' + top;
    else d = 'M' + top + ' A' + r + ' ' + r + ' 0 0 0 ' + bot + ' A' + rx + ' ' + r + ' 0 0 ' + (t > 270 ? 1 : 0) + ' ' + top;
    return s + '<path d="' + d + '" fill="#F4F1DE"/>';
  }
  var PHASES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Third quarter', 'Waning crescent'];
  function phaseName(deg) { var t = ((deg % 360) + 360) % 360; return PHASES[Math.round(t / 45) % 8]; }
  V.moon = function (sp) {
    var deg = sp.angle != null ? sp.angle : sp.phase * 45;
    return svg(120, 120, '<rect width="120" height="120" rx="12" fill="#0B1026"/>' + moonDisc(60, 60, 44, deg), sp.label || phaseName(deg), sp.size || 130);
  };
  V.moons = function (sp) {
    var s = '<rect width="' + (sp.list.length * 110) + '" height="130" rx="12" fill="#0B1026"/>';
    sp.list.forEach(function (d, i) { s += moonDisc(55 + i * 110, 55, 40, d * 45) + (sp.labels ? '<text x="' + (55 + i * 110) + '" y="120" font-size="14" text-anchor="middle" fill="#fff">' + esc(sp.labels[i]) + '</text>' : ''); });
    return svg(sp.list.length * 110, 130, s, sp.label || 'Moon phases', sp.list.length * 120);
  };
  V.orbit8 = function (sp, o) {
    var W = 460, H = 360, cx = 270, cy = 180, R = 125, s = '';
    s += '<rect width="' + W + '" height="' + H + '" rx="14" fill="#0B1026"/>';
    for (var r = 0; r < 7; r++) s += '<path d="M0,' + (40 + r * 46) + ' H70" stroke="#FFD166" stroke-width="2" stroke-dasharray="6 6" opacity=".7"/>';
    s += '<text x="10" y="24" font-size="14" font-weight="700" fill="#FFD166">Sunlight →</text>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#56608a" stroke-width="1.5" stroke-dasharray="4 6"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="30" fill="#2f7ad1"/><path d="M' + cx + ',' + (cy - 30) + ' A30,30 0 0 0 ' + cx + ',' + (cy + 30) + ' Z" fill="#6fb2ff"/><path d="M' + (cx - 14) + ',' + (cy - 16) + ' q10,-6 16,4 q-6,10 -16,6 z" fill="#5fbf6a"/>';
    s += '<text x="' + cx + '" y="' + (cy + 50) + '" font-size="13" text-anchor="middle" fill="#dfe6ff">Earth</text>';
    for (var k = 0; k < 8; k++) {
      var phi = (180 + k * 45) * Math.PI / 180, mx = f1(cx + R * Math.cos(phi)), my = f1(cy - R * Math.sin(phi));
      var lbl = sp.names ? PHASES[k] : 'Position ' + String.fromCharCode(65 + k);
      s += '<g' + tgt(o, 'p' + k, lbl) + '><circle cx="' + mx + '" cy="' + my + '" r="22" fill="#2B2F3A" stroke="#9aa3c7" stroke-width="1.5"/><path d="M' + mx + ',' + (my - 22) + ' A22,22 0 0 0 ' + mx + ',' + (+my + 22) + ' Z" fill="#F4F1DE"/>' +
        (sp.letters !== false ? '<text x="' + mx + '" y="' + (+my + 40) + '" font-size="14" font-weight="700" text-anchor="middle" fill="#FFD166">' + (sp.names ? '' : String.fromCharCode(65 + k)) + '</text>' : '') + '</g>';
    }
    return svg(W, H, s, sp.label || 'The Moon at eight positions around Earth', 480);
  };
  V.solar = function (sp, o) {
    var P = [['Mercury', 5, '#b5a58f'], ['Venus', 9, '#e8c27a'], ['Earth', 9.5, '#3f8fe0'], ['Mars', 7, '#d0643a'], ['Jupiter', 26, '#d9a36a'], ['Saturn', 22, '#e6cf8f'], ['Uranus', 15, '#8fd7e0'], ['Neptune', 14.5, '#4f6fe0']];
    var W = 760, H = 200, s = '<rect width="' + W + '" height="' + H + '" rx="14" fill="#0B1026"/><circle cx="-40" cy="100" r="110" fill="#FFB020"/><circle cx="-40" cy="100" r="96" fill="#FFD166"/>';
    var xs = [102, 142, 186, 230, 318, 430, 540, 640];
    if (sp.belt !== false) for (var b = 0; b < 26; b++) s += '<circle cx="' + (254 + (b * 37) % 34) + '" cy="' + (30 + (b * 53) % 140) + '" r="' + (1 + b % 2) + '" fill="#8a7e6b"/>';
    P.forEach(function (p, i) {
      var x = xs[i];
      s += '<g' + tgt(o, p[0], p[0]) + '>' + (p[0] === 'Saturn' ? '<ellipse cx="' + x + '" cy="100" rx="' + (p[1] + 14) + '" ry="7" fill="none" stroke="#cdb77a" stroke-width="4"/>' : '') +
        '<circle cx="' + x + '" cy="100" r="' + p[1] + '" fill="' + p[2] + '"/>' +
        (sp.names !== false ? '<text x="' + x + '" y="' + (100 + p[1] + 26) + '" font-size="13" text-anchor="middle" fill="#dfe6ff">' + p[0] + '</text>' : '<text x="' + x + '" y="' + (100 + p[1] + 26) + '" font-size="14" font-weight="700" text-anchor="middle" fill="#FFD166">' + (i + 1) + '</text>') + '</g>';
    });
    s += '<text x="12" y="190" font-size="12" fill="#9aa3c7">Sizes and distances are not to scale</text>';
    return svg(W, H, s, sp.label || 'The eight planets in order from the Sun', 760);
  };

  /* ---------- generic scene / charts ---------- */
  V.scene = function (sp, o) {
    var s = '<defs><marker id="ep-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + INK + '"/></marker></defs>';
    if (sp.bg) s += '<rect width="' + sp.w + '" height="' + sp.h + '" rx="14" fill="' + sp.bg + '"/>';
    (sp.shapes || []).forEach(function (h) {
      var open = '<g' + tgt(o, h.id, h.label) + '>', body = '', cx = 0, cy = 0;
      var st = ' fill="' + (h.fill || 'none') + '" stroke="' + (h.stroke || (h.fill ? INK : INK)) + '" stroke-width="' + (h.sw != null ? h.sw : 2) + '"' + (h.dash ? ' stroke-dasharray="' + h.dash + '"' : '') + (h.op ? ' opacity="' + h.op + '"' : '');
      if (h.t === 'rect') { body = '<rect x="' + h.x + '" y="' + h.y + '" width="' + h.w + '" height="' + h.h + '" rx="' + (h.rx || 0) + '"' + st + '/>'; cx = h.x + h.w / 2; cy = h.y + h.h / 2; }
      else if (h.t === 'circle') { body = '<circle cx="' + h.cx + '" cy="' + h.cy + '" r="' + h.r + '"' + st + '/>'; cx = h.cx; cy = h.cy; }
      else if (h.t === 'ellipse') { body = '<ellipse cx="' + h.cx + '" cy="' + h.cy + '" rx="' + h.rx + '" ry="' + h.ry + '"' + st + '/>'; cx = h.cx; cy = h.cy; }
      else if (h.t === 'poly') { body = '<polygon points="' + h.points + '"' + st + '/>'; var ps = h.points.split(/\s+/).map(function (p) { return p.split(',').map(Number); }); cx = ps.reduce(function (a, p) { return a + p[0]; }, 0) / ps.length; cy = ps.reduce(function (a, p) { return a + p[1]; }, 0) / ps.length; }
      else if (h.t === 'path') { body = '<path d="' + h.d + '"' + st + '/>'; cx = h.lx || 0; cy = h.ly || 0; }
      else if (h.t === 'line') { body = '<path d="M' + h.x1 + ',' + h.y1 + ' L' + h.x2 + ',' + h.y2 + '" fill="none" stroke="' + (h.stroke || INK) + '" stroke-width="' + (h.sw || 3) + '"' + (h.dash ? ' stroke-dasharray="' + h.dash + '"' : '') + (h.arrow ? ' marker-end="url(#ep-arrow)"' : '') + '/>'; cx = (h.x1 + h.x2) / 2; cy = (h.y1 + h.y2) / 2; }
      else if (h.t === 'text') { body = '<text x="' + h.x + '" y="' + h.y + '" font-size="' + (h.size || 15) + '" font-weight="' + (h.bold === false ? 400 : 700) + '" text-anchor="' + (h.anchor || 'middle') + '" fill="' + (h.fill || INK) + '" pointer-events="none">' + esc(h.s) + '</text>'; }
      if (h.label && h.t !== 'text' && h.showLabel !== false) {
        var lx = h.lx != null ? h.lx : cx, ly = h.ly != null ? h.ly : cy + 5;
        body += '<text x="' + f1(lx) + '" y="' + f1(ly) + '" font-size="' + (h.lsize || 14) + '" font-weight="700" text-anchor="middle" fill="' + (h.lc || INK) + '" pointer-events="none">' + esc(h.label) + '</text>';
      }
      s += open + body + '</g>';
    });
    return svg(sp.w, sp.h, s, sp.label || 'Diagram', sp.max || sp.w);
  };
  V.chart = function (sp, o) {
    var W = sp.w || 540, H = sp.h || 280, l = 56, r = W - 16, t = 20, b = H - 44, s = '';
    var ymin = sp.ymin || 0, ymax = sp.ymax, Y = function (v) { return b - (v - ymin) / (ymax - ymin) * (b - t); };
    var yst = sp.ystep || (ymax - ymin) / 5;
    for (var v = ymin; v <= ymax + 1e-9; v += yst) s += '<path d="M' + l + ',' + f1(Y(v)) + ' H' + r + '" stroke="#e3e7ee" stroke-width="1"/><text x="' + (l - 8) + '" y="' + f1(Y(v) + 4) + '" font-size="12" text-anchor="end" fill="' + SOFT + '">' + String(Math.round(v * 100) / 100).replace('-', '−') + (sp.unit || '') + '</text>';
    s += '<path d="M' + l + ',' + t + ' V' + b + ' H' + r + '" stroke="' + INK + '" stroke-width="2" fill="none"/>';
    if (sp.type === 'line') {
      var xs = sp.xmin != null ? sp : { xmin: 0, xmax: sp.points.length - 1 };
      var X = function (x) { return l + (x - xs.xmin) / (xs.xmax - xs.xmin) * (r - l - 10); };
      for (var i = 0; i < sp.points.length - 1; i++) {
        var p1 = sp.points[i], p2 = sp.points[i + 1];
        s += '<g' + tgt(o, 's' + i, (sp.segLabels && sp.segLabels[i]) || ('Segment ' + (i + 1))) + '><path d="M' + f1(X(p1[0])) + ',' + f1(Y(p1[1])) + ' L' + f1(X(p2[0])) + ',' + f1(Y(p2[1])) + '" stroke="transparent" stroke-width="22"/><path d="M' + f1(X(p1[0])) + ',' + f1(Y(p1[1])) + ' L' + f1(X(p2[0])) + ',' + f1(Y(p2[1])) + '" stroke="#C8272D" stroke-width="4" stroke-linecap="round"/></g>';
      }
      (sp.xticks || []).forEach(function (xt) { s += '<text x="' + f1(X(xt[0])) + '" y="' + (b + 18) + '" font-size="12" text-anchor="middle" fill="' + SOFT + '">' + esc(xt[1]) + '</text>'; });
    } else {
      var n = sp.data.length, bw = (r - l) / n;
      sp.data.forEach(function (d, i) {
        var x = l + i * bw + bw * 0.18, w = bw * 0.64, y = Y(d[1]);
        s += '<g' + tgt(o, 'b' + i, d[0]) + '><rect x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(w) + '" height="' + f1(b - y) + '" rx="4" fill="' + (d[2] || '#1F6FD1') + '" stroke="' + INK + '" stroke-width="1.5"/>' +
          '<text x="' + f1(x + w / 2) + '" y="' + f1(y - 6) + '" font-size="13" font-weight="700" text-anchor="middle" fill="' + INK + '">' + esc(d[3] != null ? d[3] : String(d[1]).replace('-', '−')) + '</text></g>' +
          '<text x="' + f1(x + w / 2) + '" y="' + (b + 18) + '" font-size="12" text-anchor="middle" fill="' + INK + '">' + esc(d[0]) + '</text>';
      });
    }
    if (sp.xlabel) s += '<text x="' + ((l + r) / 2) + '" y="' + (H - 6) + '" font-size="13" font-weight="700" text-anchor="middle" fill="' + SOFT + '">' + esc(sp.xlabel) + '</text>';
    if (sp.ylabel) s += '<text x="14" y="' + ((t + b) / 2) + '" font-size="13" font-weight="700" text-anchor="middle" fill="' + SOFT + '" transform="rotate(-90 14 ' + ((t + b) / 2) + ')">' + esc(sp.ylabel) + '</text>';
    return svg(W, H, s, sp.label || 'Chart', W);
  };
  V.tape = function (sp) {
    var total = sp.parts.reduce(function (a, p) { return a + p.n; }, 0), W = 560, x = 10, u = (W - 20) / total, s = '';
    sp.parts.forEach(function (p) {
      for (var i = 0; i < p.n; i++) {
        s += '<rect x="' + f1(x) + '" y="30" width="' + f1(u) + '" height="44" fill="' + (p.fill || '#FFD166') + '" stroke="' + INK + '" stroke-width="2"/>';
        if (p.each) s += '<text x="' + f1(x + u / 2) + '" y="58" font-size="15" font-weight="700" text-anchor="middle" fill="' + INK + '">' + esc(p.each) + '</text>';
        x += u;
      }
      s += '<text x="' + f1(x - p.n * u / 2) + '" y="20" font-size="15" font-weight="700" text-anchor="middle" fill="' + INK + '">' + esc(p.label) + '</text>';
    });
    if (sp.total) s += '<path d="M10,86 V94 H' + (W - 10) + ' V86" fill="none" stroke="' + INK + '" stroke-width="2"/><text x="' + W / 2 + '" y="114" font-size="15" font-weight="700" text-anchor="middle" fill="' + INK + '">' + esc(sp.total) + '</text>';
    return svg(W, sp.total ? 122 : 84, s, sp.label || 'Tape diagram', 580);
  };
  V.dnl = function (sp) {
    var W = 600, s = '', n = sp.top.values.length, x = function (i) { return 110 + i * (W - 140) / (n - 1); };
    s += '<path d="M100,40 H' + (W - 20) + ' M100,110 H' + (W - 20) + '" stroke="' + INK + '" stroke-width="3"/>';
    s += '<text x="90" y="46" font-size="14" font-weight="700" text-anchor="end" fill="' + INK + '">' + esc(sp.top.label) + '</text><text x="90" y="116" font-size="14" font-weight="700" text-anchor="end" fill="' + INK + '">' + esc(sp.bottom.label) + '</text>';
    for (var i = 0; i < n; i++) {
      s += '<path d="M' + f1(x(i)) + ',32 V48 M' + f1(x(i)) + ',102 V118" stroke="' + INK + '" stroke-width="2.5"/>';
      s += '<text x="' + f1(x(i)) + '" y="24" font-size="16" font-weight="700" text-anchor="middle" fill="' + (sp.top.values[i] === '?' ? '#C8272D' : INK) + '">' + esc(sp.top.values[i]) + '</text>';
      s += '<text x="' + f1(x(i)) + '" y="140" font-size="16" font-weight="700" text-anchor="middle" fill="' + (sp.bottom.values[i] === '?' ? '#C8272D' : INK) + '">' + esc(sp.bottom.values[i]) + '</text>';
    }
    return svg(W, 150, s, sp.label || 'Double number line', 620);
  };
  function mayaGlyph(n, x, y, scale) {
    scale = scale || 1; var s = '', bars = Math.floor(n / 5), dots = n % 5;
    if (n === 0) return '<ellipse cx="' + (x + 40 * scale) + '" cy="' + (y + 50 * scale) + '" rx="' + 32 * scale + '" ry="' + 16 * scale + '" fill="#F2E3C0" stroke="' + INK + '" stroke-width="2.5"/><path d="M' + (x + 16 * scale) + ',' + (y + 50 * scale) + ' Q' + (x + 40 * scale) + ',' + (y + 36 * scale) + ' ' + (x + 64 * scale) + ',' + (y + 50 * scale) + ' M' + (x + 20 * scale) + ',' + (y + 56 * scale) + ' Q' + (x + 40 * scale) + ',' + (y + 66 * scale) + ' ' + (x + 60 * scale) + ',' + (y + 56 * scale) + '" stroke="' + INK + '" stroke-width="2" fill="none"/>';
    for (var b = 0; b < bars; b++) s += '<rect x="' + x + '" y="' + (y + (84 - b * 20) * scale) + '" width="' + 80 * scale + '" height="' + 13 * scale + '" rx="' + 5 * scale + '" fill="#1F7A5C" stroke="' + INK + '" stroke-width="2"/>';
    var dy = y + (84 - bars * 20 + 2) * scale, sx = x + 40 * scale - (dots * 18 * scale) / 2 + 9 * scale;
    for (var d = 0; d < dots; d++) s += '<circle cx="' + f1(sx + d * 18 * scale) + '" cy="' + f1(dy) + '" r="' + 6.5 * scale + '" fill="#1F7A5C" stroke="' + INK + '" stroke-width="2"/>';
    return s;
  }
  V.maya = function (sp) {
    var list = [].concat(sp.n), s = '';
    list.forEach(function (n, i) { s += '<rect x="' + (6 + i * 110) + '" y="4" width="100" height="112" rx="10" fill="#F8EED8" stroke="#3B3223" stroke-width="2"/>' + mayaGlyph(n, 16 + i * 110, 8, 1); });
    return svg(list.length * 110 + 2, 122, s, sp.label || 'Maya numerals', list.length * 130);
  };
  V._mayaGlyph = mayaGlyph;
  V.quipu = function (sp) {
    var s = '<path d="M20,20 H300" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/>', cords = sp.cords || [[sp.t || 0, sp.o || 0]];
    cords.forEach(function (c, i) {
      var x = 60 + i * 90, col = ['#C8272D', '#1F6FD1', '#E9A23B'][i % 3];
      s += '<path d="M' + x + ',20 V220" stroke="' + col + '" stroke-width="5"/>';
      for (var t = 0; t < c[0]; t++) s += '<ellipse cx="' + x + '" cy="' + (70 + t * 14) + '" rx="9" ry="6" fill="#4a2e1c"/>';
      for (var o = 0; o < c[1]; o++) s += '<ellipse cx="' + x + '" cy="' + (160 + o * 13) + '" rx="9" ry="6" fill="#4a2e1c"/>';
      if (sp.guides !== false) s += '';
    });
    s += '<text x="310" y="84" font-size="13" fill="' + SOFT + '">tens</text><text x="310" y="176" font-size="13" fill="' + SOFT + '">ones</text>';
    return svg(360, 230, s, sp.label || 'A quipu with knotted cords', 360);
  };
  V.pyramid = function (sp, o) {
    var n = sp.levels.length, W = 520, H = n * 58 + 20, s = '';
    sp.levels.forEach(function (lv, i) {
      var y = 10 + i * 58, top = (W / 2) * (i / n), bot = (W / 2) * ((i + 1) / n), cx = W / 2;
      var pts = f1(cx - top) + ',' + y + ' ' + f1(cx + top) + ',' + y + ' ' + f1(cx + bot) + ',' + (y + 54) + ' ' + f1(cx - bot) + ',' + (y + 54);
      if (i === 0) pts = cx + ',' + y + ' ' + f1(cx + bot) + ',' + (y + 54) + ' ' + f1(cx - bot) + ',' + (y + 54);
      var col = (sp.colors || ['#D6A93A', '#C0603F', '#7A1E2B', '#2E4A7A', '#3F7D3A', '#6B5646'])[i % 6];
      s += '<g' + tgt(o, 'L' + i, lv) + '><polygon points="' + pts + '" fill="' + col + '" stroke="' + INK + '" stroke-width="2"/><text x="' + cx + '" y="' + (y + (i === 0 ? 42 : 33)) + '" font-size="' + (i === 0 ? 13 : 15) + '" font-weight="700" text-anchor="middle" fill="#fff">' + esc(lv) + '</text></g>';
    });
    return svg(W, H, s, sp.label || 'Pyramid diagram', 540);
  };
  /* flow chain (HTML, wraps on small screens) */
  V.chain = function (sp) {
    return '<div class="ep-chain">' + sp.items.map(function (it, i) {
      return (i ? '<span class="ep-chain-arrow" aria-hidden="true">' + (sp.arrow || '→') + '</span>' : '') + '<span class="ep-chain-item">' + esc(it) + '</span>';
    }).join('') + '</div>';
  };
  V.coins = function (sp) {
    return '<div class="ep-coinrow">' + (sp.list || []).map(function (c) { return coinHTML(c); }).join('') + '</div>';
  };
  var COINS = { b1: { v: 100, label: '$1', cls: 'bill' }, q: { v: 25, label: '25¢', cls: 'quarter' }, d: { v: 10, label: '10¢', cls: 'dime' }, n: { v: 5, label: '5¢', cls: 'nickel' }, p: { v: 1, label: '1¢', cls: 'penny' } };
  function coinHTML(c) { var k = COINS[c]; return '<span class="ep-coin ep-coin-' + k.cls + '">' + k.label + '</span>'; }
  V._COINS = COINS; V._coinHTML = coinHTML;

  /* ---------- simulations ---------- */
  var SIMS = {};
  function loop(el, fn) {
    var last = performance.now();
    function f(now) { if (!el.isConnected) return; var dt = Math.min(50, now - last); last = now; fn(dt, now); requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  var reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  SIMS.particles = function (el, sp) {
    var sub = sp.substance || 'water', melt = sp.melt != null ? sp.melt : 0, boil = sp.boil != null ? sp.boil : 100;
    el.innerHTML = '<canvas width="600" height="280" class="ep-canvas" aria-label="Particles in a sealed container"></canvas>' +
      '<div class="ep-simctl"><label for="ep-sim-t">Temperature: <b data-o="t"></b></label><input type="range" id="ep-sim-t" min="' + (sp.min || -40) + '" max="' + (sp.max || 140) + '" step="1" value="' + (sp.start != null ? sp.start : -20) + '"></div>' +
      '<div class="ep-simread" data-o="r" aria-live="polite"></div>';
    var cv = el.querySelector('canvas'), cx = cv.getContext('2d'), inp = el.querySelector('input'), N = 42, ps = [];
    for (var i = 0; i < N; i++) { var col = i % 7, row = Math.floor(i / 7); ps.push({ hx: 234 + col * 22, hy: 262 - row * 22, x: 234 + col * 22, y: 262 - row * 22, vx: 0, vy: 0, ph: Math.random() * 6.28 }); }
    var mode = '';
    function state(T) { return T < melt ? 'solid' : T < boil ? 'liquid' : 'gas'; }
    function upd() {
      var T = +inp.value, st = state(T);
      el.querySelector('[data-o=t]').textContent = T + ' °C';
      var words = { solid: 'SOLID (ice). Particles are packed in a pattern and vibrate in place.', liquid: 'LIQUID (water). Particles stay close but slide past each other.', gas: 'GAS (water vapor). Particles are far apart and zoom in all directions.' };
      el.querySelector('[data-o=r]').innerHTML = '<b>' + words[st] + '</b> Adding energy makes particles move faster.';
    }
    inp.addEventListener('input', upd); upd();
    loop(el, function (dt, now) {
      var T = +inp.value, st = state(T), sp2 = 0.4 + (T - (sp.min || -40)) / 60;
      if (st !== mode) { ps.forEach(function (p) { var a = Math.random() * 6.28; p.vx = Math.cos(a) * sp2; p.vy = Math.sin(a) * sp2; }); mode = st; }
      cx.clearRect(0, 0, 600, 280);
      cx.fillStyle = '#eef7fb'; cx.fillRect(10, 10, 580, 262);
      cx.strokeStyle = '#1d2433'; cx.lineWidth = 4; cx.strokeRect(10, 10, 580, 262);
      var hue = Math.max(0, Math.min(220, 220 - (T - (sp.min || -40)) * 1.2));
      ps.forEach(function (p) {
        if (st === 'solid') {
          var amp = reduce ? 0 : 0.6 + (T - (sp.min || -40)) / 25;
          p.x += (p.hx - p.x) * 0.2; p.y += (p.hy - p.y) * 0.2;
          var jx = Math.sin(now / 60 + p.ph) * amp, jy = Math.cos(now / 53 + p.ph * 1.3) * amp;
          draw(p.x + jx, p.y + jy);
        } else {
          var k = reduce ? 0.2 : 1;
          if (st === 'liquid') { p.vx += (Math.random() - .5) * 0.25; p.vy += (Math.random() - .5) * 0.25 + 0.03; var m = Math.hypot(p.vx, p.vy) || 1, tgtv = sp2 * 0.8; p.vx *= tgtv / m; p.vy *= tgtv / m; }
          else { var m2 = Math.hypot(p.vx, p.vy) || 1, tv = sp2 * 1.8; p.vx *= tv / m2; p.vy *= tv / m2; }
          p.x += p.vx * k * dt / 16; p.y += p.vy * k * dt / 16;
          var topY = st === 'liquid' ? 150 : 22;
          if (p.x < 22) { p.x = 22; p.vx = Math.abs(p.vx); } if (p.x > 578) { p.x = 578; p.vx = -Math.abs(p.vx); }
          if (p.y < topY) { p.y = topY; p.vy = Math.abs(p.vy); } if (p.y > 262) { p.y = 262; p.vy = -Math.abs(p.vy); }
          draw(p.x, p.y);
        }
      });
      function draw(x, y) { cx.beginPath(); cx.arc(x, y, 9, 0, 6.29); cx.fillStyle = 'hsl(' + hue + ',75%,55%)'; cx.fill(); cx.lineWidth = 1.5; cx.strokeStyle = '#1d2433'; cx.stroke(); }
      cx.fillStyle = '#1d2433'; cx.font = 'bold 15px sans-serif'; cx.fillText(sub === 'water' ? 'Sealed container of water' : 'Sealed container', 22, 32);
    });
  };

  SIMS.mix = function (el, sp) {
    var EXP = {
      dissolve: { name: 'Dissolve sugar in water', a: 'Water 200 g', b: 'Sugar 30 g', before: 230, after: 230, open: 230, note: 'The sugar dissolved and spread out, but every particle is still in the jar.' },
      melt: { name: 'Melt an ice cube', a: 'Ice 150 g', b: '', before: 150, after: 150, open: 150, note: 'Melting is a physical change. Same particles, same mass.' },
      fizz: { name: 'Baking soda + vinegar', a: 'Vinegar 100 g', b: 'Baking soda 10 g', before: 110, after: 110, open: 106, note: 'The fizzing made carbon dioxide gas. In an open container, 4 g of gas escaped into the air. Sealed, the gas stays and the mass stays 110 g.' }
    };
    var st = { exp: sp.start || 'fizz', sealed: false, done: false };
    el.innerHTML = '<div class="ep-simctl ep-simbtns" role="group" aria-label="Choose an experiment">' + Object.keys(EXP).map(function (k) { return '<button type="button" class="ep-chipbtn" data-e="' + k + '">' + EXP[k].name + '</button>'; }).join('') + '</div>' +
      '<div class="ep-simview" data-o="v"></div><div class="ep-simctl"><label class="ep-check"><input type="checkbox" data-o="seal"> Seal the container with a lid and balloon</label><button type="button" class="ep-btn small" data-o="run">Run the experiment</button></div><div class="ep-simread" data-o="r" aria-live="polite"></div>';
    function draw() {
      var e = EXP[st.exp], val = st.done ? (st.sealed ? e.after : e.open) : e.before, s = '';
      s += '<rect width="520" height="260" rx="14" fill="#f4f8fb"/>';
      s += '<rect x="120" y="210" width="280" height="26" rx="6" fill="#6b7280"/><rect x="200" y="216" width="120" height="14" rx="3" fill="#0f172a"/><text x="260" y="228" font-size="13" font-family="monospace" text-anchor="middle" fill="#7CFFB2">' + val + '.0 g</text>';
      s += '<path d="M190,90 V200 Q190,208 198,208 H322 Q330,208 330,200 V90" fill="rgba(255,255,255,.7)" stroke="#1d2433" stroke-width="3"/>';
      var liquidTop = 130, liquid = st.exp === 'melt' ? (st.done ? '#8FD3F4' : '') : (st.exp === 'dissolve' ? (st.done ? '#b9e3f5' : '#8FD3F4') : '#e8e2c8');
      if (liquid) s += '<rect x="193" y="' + liquidTop + '" width="134" height="75" fill="' + liquid + '"/>';
      if (st.exp === 'melt' && !st.done) s += '<rect x="215" y="150" width="40" height="40" rx="6" fill="#dff4ff" stroke="#6fb2d9" stroke-width="2"/><rect x="262" y="160" width="36" height="36" rx="6" fill="#dff4ff" stroke="#6fb2d9" stroke-width="2"/>';
      if (st.exp === 'dissolve' && !st.done) s += '<path d="M230,205 Q260,175 290,205 Z" fill="#fff" stroke="#bbb"/>';
      if (st.exp === 'fizz') {
        if (!st.done) s += '<path d="M236,205 Q260,188 284,205 Z" fill="#fff" stroke="#bbb"/>';
        else for (var i = 0; i < 14; i++) s += '<circle cx="' + (200 + (i * 37) % 120) + '" cy="' + (135 + (i * 23) % 65) + '" r="' + (3 + i % 3) + '" fill="#fff" stroke="#9aa"/>';
        if (st.done && !st.sealed) for (var j = 0; j < 8; j++) s += '<circle class="ep-rise" style="animation-delay:' + (j * .25) + 's" cx="' + (205 + j * 15) + '" cy="80" r="' + (4 + j % 3) + '" fill="#fff" stroke="#9aa"/>';
      }
      if (st.sealed) { s += '<rect x="186" y="82" width="148" height="10" rx="3" fill="#1d2433"/>'; if (st.exp === 'fizz') s += '<ellipse cx="260" cy="' + (st.done ? 48 : 70) + '" rx="' + (st.done ? 34 : 12) + '" ry="' + (st.done ? 32 : 12) + '" fill="#E63946" stroke="#9E1F29" stroke-width="2"/>'; }
      s += '<text x="20" y="34" font-size="15" font-weight="700" fill="#1d2433">' + e.a + '</text>' + (e.b ? '<text x="20" y="56" font-size="15" font-weight="700" fill="#1d2433">+ ' + e.b + '</text>' : '');
      s += '<text x="500" y="34" font-size="15" font-weight="700" text-anchor="end" fill="#1d2433">' + (st.sealed ? 'Sealed (closed system)' : 'Open container') + '</text>';
      el.querySelector('[data-o=v]').innerHTML = svg(520, 260, s, 'Beaker on a digital scale', 540);
      el.querySelectorAll('[data-e]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-e') === st.exp); b.setAttribute('aria-pressed', b.getAttribute('data-e') === st.exp); });
      el.querySelector('[data-o=r]').innerHTML = st.done ? '<b>Before: ' + e.before + ' g → After: ' + val + ' g.</b> ' + (st.exp === 'fizz' && !st.sealed ? e.note.split('. Sealed')[0] + '.' : e.note) : 'Scale reads <b>' + e.before + ' g</b>. Press <b>Run the experiment</b> and watch the scale.';
      el.querySelector('[data-o=run]').textContent = st.done ? 'Reset' : 'Run the experiment';
    }
    el.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-e]'); if (b) { st.exp = b.getAttribute('data-e'); st.done = false; draw(); }
      if (ev.target.closest('[data-o=run]')) { st.done = !st.done; draw(); }
    });
    el.querySelector('[data-o=seal]').addEventListener('change', function (ev) { st.sealed = ev.target.checked; st.done = false; draw(); });
    draw();
  };

  SIMS.moonphase = function (el, sp) {
    el.innerHTML = '<div class="ep-simview ep-simpair" data-o="v"></div><div class="ep-simctl"><label for="ep-sim-m">Move the Moon along its orbit</label><input type="range" id="ep-sim-m" min="0" max="359" step="1" value="' + (sp.start || 45) + '"></div><div class="ep-simread" data-o="r" aria-live="polite"></div>';
    var inp = el.querySelector('input');
    function draw() {
      var t = +inp.value, phi = (180 + t) * Math.PI / 180, cx = 230, cy = 170, R = 110, mx = f1(cx + R * Math.cos(phi)), my = f1(cy - R * Math.sin(phi)), s = '';
      s += '<rect width="400" height="340" rx="14" fill="#0B1026"/>';
      for (var r = 0; r < 7; r++) s += '<path d="M0,' + (30 + r * 46) + ' H60" stroke="#FFD166" stroke-width="2" stroke-dasharray="6 6" opacity=".7"/>';
      s += '<text x="8" y="18" font-size="12" font-weight="700" fill="#FFD166">Sunlight →</text><circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#56608a" stroke-dasharray="4 6"/>';
      var ecl = '';
      if (sp.eclipse) {
        if (t < 7 || t > 353) { s += '<path d="M' + mx + ',' + (my - 14) + ' L' + (cx - 28) + ',' + (cy - 6) + ' L' + (cx - 28) + ',' + (cy + 6) + ' L' + mx + ',' + (+my + 14) + ' Z" fill="rgba(0,0,0,.65)"/>'; ecl = 'SOLAR ECLIPSE: the Moon is exactly between the Sun and Earth, and its shadow falls on Earth.'; }
        if (Math.abs(t - 180) < 7) { s += '<path d="M' + (cx + 20) + ',' + (cy - 28) + ' L' + (+mx + 30) + ',' + (my - 18) + ' L' + (+mx + 30) + ',' + (+my + 18) + ' L' + (cx + 20) + ',' + (cy + 28) + ' Z" fill="rgba(0,0,0,.55)"/>'; ecl = 'LUNAR ECLIPSE: Earth is exactly between the Sun and the Moon, and Earth\'s shadow falls on the Moon.'; }
      }
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="28" fill="#2f7ad1"/><path d="M' + cx + ',' + (cy - 28) + ' A28,28 0 0 0 ' + cx + ',' + (cy + 28) + ' Z" fill="#6fb2ff"/>';
      var red = ecl && Math.abs(t - 180) < 7;
      s += '<circle cx="' + mx + '" cy="' + my + '" r="18" fill="#2B2F3A"/><path d="M' + mx + ',' + (my - 18) + ' A18,18 0 0 0 ' + mx + ',' + (+my + 18) + ' Z" fill="' + (red ? '#b5523a' : '#F4F1DE') + '"/>';
      var view = '<rect width="220" height="340" rx="14" fill="#0B1026"/><text x="110" y="30" font-size="14" font-weight="700" text-anchor="middle" fill="#dfe6ff">View from Earth</text>' + moonDisc(110, 170, 80, t);
      if (red) view += '<circle cx="110" cy="170" r="80" fill="#b5523a" opacity=".75"/>';
      el.querySelector('[data-o=v]').innerHTML = svg(400, 340, s, 'The Moon orbiting Earth', 420) + svg(220, 340, view, phaseName(t), 230);
      var day = (t / 360 * 29.5).toFixed(1);
      el.querySelector('[data-o=r]').innerHTML = '<b>' + phaseName(t) + '</b> · about day ' + day + ' of the 29.5-day cycle.' + (ecl ? ' <b class="ep-hl">' + ecl + '</b> (The Moon\'s orbit is tilted about 5°, so most months it passes just above or below the line and there is no eclipse.)' : ' The Sun always lights half of the Moon; we see a different amount of that half as it orbits.');
    }
    inp.addEventListener('input', draw); draw();
  };

  SIMS.shadow = function (el, sp) {
    el.innerHTML = '<div class="ep-simview" data-o="v"></div><div class="ep-simctl"><label for="ep-sim-h">Time of day: <b data-o="t"></b></label><input type="range" id="ep-sim-h" min="6.5" max="19.5" step="0.25" value="8"></div><div class="ep-simread" data-o="r" aria-live="polite"></div>';
    var inp = el.querySelector('input');
    function draw() {
      var h = +inp.value, t = (h - 6.5) / 13, sx = 300 - 250 * Math.cos(Math.PI * t), sy = 230 - 190 * Math.sin(Math.PI * t);
      var alt = Math.max(6, 65 * Math.sin(Math.PI * t)) * Math.PI / 180, L = Math.min(270, 90 / Math.tan(alt)), dir = sx < 300 ? 1 : -1;
      var s = '<defs><linearGradient id="ep-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + (t < .12 || t > .88 ? '#f6b27a' : '#8fd0ff') + '"/><stop offset="1" stop-color="#eaf6ff"/></linearGradient></defs>';
      s += '<rect width="600" height="300" rx="14" fill="url(#ep-sky)"/><rect y="230" width="600" height="70" fill="#9bcf7a"/>';
      s += '<path d="M50,230 A250,190 0 0 1 550,230" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="5 7"/>';
      s += '<circle cx="' + f1(sx) + '" cy="' + f1(sy) + '" r="22" fill="#FFD166" stroke="#F4A300" stroke-width="4"/>';
      s += '<polygon points="297,230 303,230 ' + f1(300 + dir * L) + ',236 ' + f1(300 + dir * L) + ',240" fill="rgba(0,0,0,.45)"/>';
      s += '<rect x="296" y="140" width="8" height="90" fill="#6b4a2b"/><path d="M304,142 h40 v26 h-40" fill="#C8272D"/>';
      s += '<text x="20" y="286" font-size="18" font-weight="700" fill="#1d2433">EAST</text><text x="580" y="286" font-size="18" font-weight="700" text-anchor="end" fill="#1d2433">WEST</text><text x="300" y="286" font-size="13" text-anchor="middle" fill="#1d2433">(facing south)</text>';
      el.querySelector('[data-o=v]').innerHTML = svg(600, 300, s, 'A flagpole and its shadow', 620);
      var hh = Math.floor(h), mm = Math.round((h - hh) * 60), ap = hh >= 12 ? 'p.m.' : 'a.m.', h12 = hh > 12 ? hh - 12 : hh;
      el.querySelector('[data-o=t]').textContent = h12 + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ap;
      var len = L > 170 ? 'long' : L > 70 ? 'medium' : 'short';
      el.querySelector('[data-o=r]').innerHTML = 'The Sun is in the <b>' + (Math.abs(sx - 300) < 25 ? 'highest part of the sky' : sx < 300 ? 'east' : 'west') + '</b>. The shadow is <b>' + len + '</b> and points <b>' + (Math.abs(sx - 300) < 25 ? 'almost straight down (very short)' : dir > 0 ? 'west' : 'east') + '</b>, away from the Sun.';
    }
    inp.addEventListener('input', draw); draw();
  };

  SIMS.orbit = function (el, sp) {
    el.innerHTML = '<canvas width="600" height="420" class="ep-canvas" aria-label="Newton\'s cannon"></canvas><div class="ep-simctl"><label for="ep-sim-v">Launch speed: <b data-o="v"></b></label><input type="range" id="ep-sim-v" min="1" max="12" step="1" value="5"><button type="button" class="ep-btn small" data-o="go">Launch</button></div><div class="ep-simread" data-o="r" aria-live="polite">Choose a speed and press Launch. Gravity always pulls toward the planet\'s center.</div>';
    var cv = el.querySelector('canvas'), cx = cv.getContext('2d'), inp = el.querySelector('input'), C = [300, 220], R = 80, r0 = 92, vc = 2.2, GM = vc * vc * r0, obj = null, trail = [];
    function lbl() { el.querySelector('[data-o=v]').textContent = inp.value + ' of 12'; }
    inp.addEventListener('input', lbl); lbl();
    function outcome(s) { var q = (s / 8) * (s / 8); if (q >= 2) return 'escape'; var rp = r0 * q / (2 - q); return rp < R ? 'crash' : 'orbit'; }
    el.querySelector('[data-o=go]').addEventListener('click', function () {
      var s = +inp.value; obj = { x: C[0], y: C[1] - r0, vx: vc * s / 8, vy: 0, s: s, t: 0, done: false }; trail = [];
      el.querySelector('[data-o=r]').textContent = 'Launching...';
    });
    loop(el, function () {
      cx.clearRect(0, 0, 600, 420); cx.fillStyle = '#0B1026'; cx.fillRect(0, 0, 600, 420);
      cx.beginPath(); cx.arc(C[0], C[1], R, 0, 6.29); cx.fillStyle = '#2f7ad1'; cx.fill();
      cx.beginPath(); cx.moveTo(C[0] - 16, C[1] - R + 4); cx.lineTo(C[0], C[1] - r0 - 2); cx.lineTo(C[0] + 16, C[1] - R + 4); cx.fillStyle = '#7a6a55'; cx.fill();
      cx.fillStyle = '#dfe6ff'; cx.font = 'bold 14px sans-serif'; cx.fillText('Planet', C[0] - 22, C[1] + 5);
      if (obj && !obj.done) {
        for (var k = 0; k < 4; k++) {
          var dx = C[0] - obj.x, dy = C[1] - obj.y, d = Math.hypot(dx, dy), a = GM / (d * d);
          obj.vx += a * dx / d; obj.vy += a * dy / d; obj.x += obj.vx; obj.y += obj.vy; obj.t++;
          if (obj.t % 2 === 0) trail.push([obj.x, obj.y]);
          if (d < R + 2) { obj.done = true; el.querySelector('[data-o=r]').innerHTML = '<b>Crashed.</b> Too slow: gravity pulled it back down before it could fall around the planet.'; break; }
          if (d > 900 || obj.t > 5000) { obj.done = true; var oc = outcome(obj.s); el.querySelector('[data-o=r]').innerHTML = oc === 'escape' ? '<b>Escaped!</b> So fast that gravity could not bend its path into a closed loop.' : '<b>Still in orbit</b>, on a very stretched path that goes off the screen.'; break; }
          if (obj.t > 520 && outcome(obj.s) === 'orbit' && d < r0 + 3 && obj.y < C[1]) { obj.done = true; el.querySelector('[data-o=r]').innerHTML = '<b>In orbit!</b> It keeps falling toward the planet but moves sideways fast enough to keep missing it.'; break; }
        }
      }
      if (trail.length) { cx.beginPath(); cx.moveTo(trail[0][0], trail[0][1]); trail.forEach(function (p) { cx.lineTo(p[0], p[1]); }); cx.strokeStyle = '#FFD166'; cx.lineWidth = 2.5; cx.stroke(); }
      if (obj) { cx.beginPath(); cx.arc(obj.x, obj.y, 6, 0, 6.29); cx.fillStyle = '#FF4F4F'; cx.fill(); }
    });
  };

  SIMS.coaster = function (el, sp) {
    el.innerHTML = '<div class="ep-simview" data-o="v"></div><div class="ep-simctl"><label for="ep-sim-c">Move the car along the track</label><input type="range" id="ep-sim-c" min="0" max="100" step="1" value="0"><label class="ep-check"><input type="checkbox" data-o="f" checked> Include friction</label></div>' +
      '<div class="ep-bars"><div><span>Potential</span><i data-o="pe"></i><b data-o="pev"></b></div><div><span>Kinetic</span><i data-o="ke"></i><b data-o="kev"></b></div><div><span>Thermal + sound</span><i data-o="th"></i><b data-o="thv"></b></div></div><div class="ep-simread" data-o="r" aria-live="polite"></div>';
    var K = [[30, 60], [175, 252], [320, 130], [455, 252], [570, 205]];
    function yAt(x) {
      for (var i = 0; i < K.length - 1; i++) if (x <= K[i + 1][0]) { var a = K[i], b = K[i + 1], t = (x - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * (1 - Math.cos(Math.PI * t)) / 2; }
      return K[K.length - 1][1];
    }
    var path = ''; for (var x = 30; x <= 570; x += 5) path += (x === 30 ? 'M' : 'L') + x + ',' + f1(yAt(x));
    var inp = el.querySelector('input[type=range]'), fr = el.querySelector('[data-o=f]');
    function draw() {
      var v = +inp.value, x = 30 + v * 5.4, y = yAt(x), h = Math.max(0, (252 - y) / 192 * 100);
      var E = fr.checked ? 100 - 18 * v / 100 : 100; if (v >= 92) E = h;
      var pe = h, ke = Math.max(0, E - pe), th = 100 - pe - ke;
      var s = '<rect width="600" height="290" rx="14" fill="#eaf6ff"/><path d="' + path + ' L570,280 L30,280 Z" fill="#cfe9d8"/><path d="' + path + '" fill="none" stroke="#E63946" stroke-width="6" stroke-linecap="round"/>';
      for (var px = 40; px < 570; px += 30) s += '<path d="M' + px + ',' + f1(yAt(px)) + ' V280" stroke="#2A9D8F" stroke-width="2" opacity=".6"/>';
      var bp = ''; for (var bx = 527; bx <= 570; bx += 4) bp += (bx === 527 ? 'M' : 'L') + bx + ',' + f1(yAt(bx));
      s += '<path d="' + bp + '" fill="none" stroke="#1d2433" stroke-width="10" opacity=".55" stroke-linecap="round"/><text x="548" y="' + f1(yAt(548) + 26) + '" font-size="12" text-anchor="middle" fill="#1d2433">brakes</text>';
      s += '<g transform="translate(' + f1(x) + ',' + f1(y - 14) + ')"><rect x="-18" y="-12" width="36" height="20" rx="5" fill="#FFD166" stroke="#1d2433" stroke-width="2.5"/><circle cx="-10" cy="10" r="5" fill="#1d2433"/><circle cx="10" cy="10" r="5" fill="#1d2433"/></g>';
      el.querySelector('[data-o=v]').innerHTML = svg(600, 290, s, 'A roller coaster track', 620);
      function bar(k, val) { el.querySelector('[data-o=' + k + ']').style.width = Math.max(0, val) + '%'; el.querySelector('[data-o=' + k + 'v]').textContent = Math.round(Math.max(0, val)) + '%'; }
      bar('pe', pe); bar('ke', ke); bar('th', th);
      el.querySelector('[data-o=r]').innerHTML = v < 3 ? 'At the top, the car has the most <b>potential energy</b>.' : v >= 92 ? 'The brakes turn the car\'s kinetic energy into <b>thermal energy</b> and sound.' : (ke > pe ? 'Low on the track: most of the energy is <b>kinetic</b> (motion).' : 'Higher on the track: more of the energy is <b>potential</b> (stored).') + ' The total always adds up to 100%.';
    }
    inp.addEventListener('input', draw); fr.addEventListener('change', draw); draw();
  };

  SIMS.populations = function (el, sp) {
    el.innerHTML = '<div class="ep-simview" data-o="v"></div><div class="ep-simctl"><label for="ep-sim-p">Invasive fish released: <b data-o="n"></b></label><input type="range" id="ep-sim-p" min="0" max="100" step="5" value="0"></div><div class="ep-simread" data-o="r" aria-live="polite"></div>';
    var inp = el.querySelector('input');
    function draw() {
      var v = +inp.value / 100, zoo = 100 * (1 - 0.75 * v), algae = Math.min(100, 30 + 70 * v * 1.1), blue = 80 * zoo / 100 + 4, bass = blue * 0.8, osprey = bass * 0.75;
      var base = [30, 100, 84, 67, 50], now = [algae, zoo, blue, bass, osprey];
      var data = [['Algae', algae, '#6FA23A'], ['Zooplankton', zoo, '#8FD3F4'], ['Bluegill', blue, '#1F6FD1'], ['Bass', bass, '#0B3148'], ['Ospreys', osprey, '#8a5a2b']].map(function (d, i) { var ch = now[i] - base[i]; return [d[0], Math.round(d[1]), d[2], (Math.abs(ch) < 2 ? '' : ch > 0 ? '▲ ' : '▼ ') + Math.round(d[1])]; });
      el.querySelector('[data-o=v]').innerHTML = V.chart({ type: 'bar', data: data, ymax: 100, ystep: 25, ylabel: 'Population (relative)', label: 'Lake Monroe populations' });
      el.querySelector('[data-o=n]').textContent = inp.value === '0' ? 'none' : inp.value + ' buckets';
      el.querySelector('[data-o=r]').innerHTML = v === 0 ? 'The food web is in balance. Slide to release invasive fish and watch what changes.' : 'Invasive fish eat zooplankton, so zooplankton <b>drop</b>. With fewer grazers, algae <b>grow</b>. Bluegill lose food and <b>drop</b>, and so do the bass and ospreys that eat them.';
    }
    inp.addEventListener('input', draw); draw();
  };

  SIMS.diffusion = function (el, sp) {
    el.innerHTML = '<canvas width="600" height="300" class="ep-canvas" aria-label="Dye spreading in cold and hot water"></canvas><div class="ep-simctl"><button type="button" class="ep-btn small" data-o="go">Add a drop of dye to both</button><span class="ep-simread" data-o="t"></span></div>';
    var cv = el.querySelector('canvas'), cx = cv.getContext('2d'), dyes = null, t0 = 0;
    el.querySelector('[data-o=go]').addEventListener('click', function () {
      dyes = [[], []]; t0 = performance.now();
      for (var b = 0; b < 2; b++) for (var i = 0; i < 160; i++) dyes[b].push([150 + b * 300 + (Math.random() - .5) * 10, 60 + Math.random() * 8]);
    });
    loop(el, function (dt, now) {
      cx.clearRect(0, 0, 600, 300);
      [['COLD water · 5 °C', '#dff1ff', 0.35], ['HOT water · 80 °C', '#ffe3dc', 2.1]].forEach(function (b, i) {
        var x0 = 30 + i * 300;
        cx.fillStyle = b[1]; cx.fillRect(x0, 40, 240, 230); cx.strokeStyle = '#1d2433'; cx.lineWidth = 3; cx.strokeRect(x0, 40, 240, 230);
        cx.fillStyle = '#1d2433'; cx.font = 'bold 15px sans-serif'; cx.fillText(b[0], x0 + 6, 30);
        if (dyes) dyes[i].forEach(function (p) {
          p[0] += (Math.random() - .5) * b[2] * 3; p[1] += (Math.random() - .45) * b[2] * 3;
          p[0] = Math.max(x0 + 4, Math.min(x0 + 236, p[0])); p[1] = Math.max(44, Math.min(266, p[1]));
          cx.fillStyle = 'rgba(122,40,160,.55)'; cx.beginPath(); cx.arc(p[0], p[1], 3.2, 0, 6.29); cx.fill();
        });
      });
      if (dyes) el.querySelector('[data-o=t]').textContent = 'Time: ' + ((now - t0) / 1000).toFixed(0) + ' s';
    });
  };

  return { V: V, SIMS: SIMS, moonDisc: moonDisc, phaseName: phaseName, fracText: fracText };
}
if (typeof module !== 'undefined') module.exports = EscapeKit;
