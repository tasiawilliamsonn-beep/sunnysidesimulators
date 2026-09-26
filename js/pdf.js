/*
 * Tiny dependency-free PDF writer used for exit tickets and facilitation guides.
 * Supports Helvetica / Helvetica-Bold text, word wrapping, lines, boxes and page breaks.
 */
(function (global) {
  // Helvetica advance widths (1/1000 em) for printable ASCII 32..126
  var W = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
  var WIN = { '’': 146, '‘': 145, '“': 147, '”': 148, '–': 150, '—': 151, '•': 149, '…': 133, '×': 215, '÷': 247, '°': 176, '½': 189, '¼': 188, '¾': 190, 'é': 233, 'ñ': 241, 'í': 237, 'á': 225, 'ó': 243, 'ú': 250, '²': 178, '³': 179, '±': 177, '·': 183, '≈': 126, '≤': 60, '≥': 62, '→': 62, '−': 45 };

  function clean(s) {
    return String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<sup>(.*?)<\/sup>/gi, '^$1').replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ').trim();
  }
  function charCode(ch) {
    var c = ch.charCodeAt(0);
    if (c >= 32 && c <= 126) return c;
    if (WIN[ch] != null) return WIN[ch];
    if (c >= 160 && c <= 255) return c;
    return 63; // ?
  }
  function width(str, size, bold) {
    var w = 0;
    for (var i = 0; i < str.length; i++) {
      var c = charCode(str[i]);
      w += (c >= 32 && c <= 126) ? W[c - 32] : 556;
    }
    return w * size / 1000 * (bold ? 1.06 : 1);
  }
  function encode(str) {
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var c = charCode(str[i]);
      var ch = String.fromCharCode(c);
      if (ch === '(' || ch === ')' || ch === '\\') out += '\\' + ch;
      else out += ch;
    }
    return out;
  }

  function Doc() {
    this.pages = [];
    this.pageW = 612; this.pageH = 792; this.margin = 54;
    this.newPage();
  }
  Doc.prototype.newPage = function () {
    this.ops = [];
    this.pages.push(this.ops);
    this.y = this.pageH - this.margin;
  };
  Doc.prototype.ensure = function (h) { if (this.y - h < this.margin) this.newPage(); };
  Doc.prototype.raw = function (s) { this.ops.push(s); };
  Doc.prototype.textAt = function (x, y, str, size, bold, gray) {
    this.raw((gray != null ? gray + ' g ' : '0 g ') + 'BT /' + (bold ? 'F2' : 'F1') + ' ' + size + ' Tf ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' Td (' + encode(str) + ') Tj ET');
  };
  Doc.prototype.wrap = function (str, size, bold, maxW) {
    var words = clean(str).split(' '), lines = [], line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (width(test, size, bold) > maxW && line) { lines.push(line); line = words[i]; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  };
  // paragraph: {size, bold, indent, gap, gray}
  Doc.prototype.para = function (str, o) {
    o = o || {};
    var size = o.size || 11, lead = size * 1.35, indent = o.indent || 0;
    var maxW = this.pageW - this.margin * 2 - indent;
    var lines = this.wrap(str, size, o.bold, maxW);
    for (var i = 0; i < lines.length; i++) {
      this.ensure(lead);
      this.y -= lead;
      this.textAt(this.margin + indent, this.y, lines[i], size, o.bold, o.gray);
    }
    this.y -= (o.gap != null ? o.gap : 4);
  };
  Doc.prototype.line = function (x1, y1, x2, y2, w, gray) {
    this.raw((gray != null ? gray : 0) + ' G ' + (w || 0.75) + ' w ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' m ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + ' l S');
  };
  Doc.prototype.rule = function (gap) {
    this.y -= (gap || 6);
    this.line(this.margin, this.y, this.pageW - this.margin, this.y, 0.75, 0.6);
    this.y -= (gap || 6);
  };
  Doc.prototype.writeLines = function (n, indent) {
    indent = indent || 0;
    for (var i = 0; i < n; i++) {
      this.ensure(24);
      this.y -= 24;
      this.line(this.margin + indent, this.y, this.pageW - this.margin, this.y, 0.5, 0.55);
    }
    this.y -= 6;
  };
  Doc.prototype.box = function (x, y, w, h, gray) {
    this.raw((gray != null ? gray : 0) + ' G 0.8 w ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ' + w.toFixed(2) + ' ' + h.toFixed(2) + ' re S');
  };
  Doc.prototype.fillBox = function (x, y, w, h, gray) {
    this.raw(gray + ' g ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ' + w.toFixed(2) + ' ' + h.toFixed(2) + ' re f');
  };
  Doc.prototype.footer = function (text) {
    for (var p = 0; p < this.pages.length; p++) {
      var s = text + '   ·   Page ' + (p + 1) + ' of ' + this.pages.length;
      this.pages[p].push('0.45 g BT /F1 8 Tf ' + this.margin + ' 30 Td (' + encode(s) + ') Tj ET');
    }
  };
  Doc.prototype.bytes = function () {
    var objs = [];
    objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    objs[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    objs[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
    var kids = [], n = 5;
    for (var p = 0; p < this.pages.length; p++) {
      var content = this.pages[p].join('\n');
      objs[n] = '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream';
      objs[n + 1] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + this.pageW + ' ' + this.pageH + '] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' + n + ' 0 R >>';
      kids.push((n + 1) + ' 0 R');
      n += 2;
    }
    objs[2] = '<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + kids.length + ' >>';
    var out = '%PDF-1.4\n%âãÏÓ\n', offsets = [];
    for (var i = 1; i < objs.length; i++) {
      offsets[i] = out.length;
      out += i + ' 0 obj\n' + objs[i] + '\nendobj\n';
    }
    var xref = out.length;
    out += 'xref\n0 ' + objs.length + '\n0000000000 65535 f \n';
    for (var k = 1; k < objs.length; k++) out += ('0000000000' + offsets[k]).slice(-10) + ' 00000 n \n';
    out += 'trailer\n<< /Size ' + objs.length + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    var bytes = new Uint8Array(out.length);
    for (var b = 0; b < out.length; b++) bytes[b] = out.charCodeAt(b) & 255;
    return bytes;
  };

  var LET = 'ABCDEFGH';

  function header(d, kicker, title, sub) {
    d.fillBox(d.margin, d.y - 4, d.pageW - d.margin * 2, 4, 0.15);
    d.y -= 12;
    d.para(kicker, { size: 9, bold: true, gray: 0.35, gap: 0 });
    d.para(title, { size: 18, bold: true, gap: 2 });
    if (sub) d.para(sub, { size: 10, gray: 0.3, gap: 4 });
  }

  function exitTicket(room, std) {
    var d = new Doc();
    header(d, 'EXIT TICKET  ·  GRADE ' + room.grade + '  ·  ' + room.standard, room.title, std ? std.title + ': ' + std.text : '');
    d.y -= 8;
    var x = d.margin, y = d.y - 16;
    d.textAt(x, y, 'Name:', 11, true); d.line(x + 38, y - 2, x + 290, y - 2, 0.6, 0.4);
    d.textAt(x + 310, y, 'Date:', 11, true); d.line(x + 344, y - 2, d.pageW - d.margin, y - 2, 0.6, 0.4);
    d.y = y - 16;
    d.rule(4);
    room.exit.forEach(function (q, i) {
      d.ensure(90);
      d.para((i + 1) + '.  ' + q.q, { size: 11.5, bold: true, gap: 4 });
      if (q.choices) {
        q.choices.forEach(function (c, k) { d.para('(' + LET[k] + ')  ' + c, { size: 11, indent: 18, gap: 1 }); });
        d.y -= 8;
      } else {
        d.writeLines(q.lines || 3, 18);
      }
    });
    d.ensure(80);
    d.rule(6);
    d.para('How confident do you feel about this skill?  (circle one)', { size: 11, bold: true, gap: 6 });
    var labels = ['1  Not yet', '2  Getting there', '3  I got it', '4  I can teach it'];
    var bx = d.margin, bw = (d.pageW - d.margin * 2 - 30) / 4;
    d.ensure(40);
    labels.forEach(function (l, k) {
      var xx = bx + k * (bw + 10);
      d.box(xx, d.y - 28, bw, 26, 0.5);
      d.textAt(xx + 10, d.y - 19, l, 10.5, false);
    });
    d.y -= 40;
    // Teacher key on its own page
    d.newPage();
    header(d, 'TEACHER ANSWER KEY  ·  ' + room.standard, room.title + ' — Exit Ticket Key', 'Remove this page before copying for students.');
    d.y -= 6;
    room.exit.forEach(function (q, i) {
      d.para((i + 1) + '.  ' + q.q, { size: 11, bold: true, gap: 2 });
      var ans = q.choices ? '(' + LET[q.answer] + ')  ' + q.choices[q.answer] : q.answer;
      d.para('Answer: ' + ans, { size: 11, indent: 18, gap: 8 });
    });
    d.para('Scoring suggestion: ' + (room.exit.length) + ' of ' + room.exit.length + ' = mastered · ' + (room.exit.length - 1) + ' = nearly there (quick reteach) · fewer = small-group reteach using the mini-lesson.', { size: 10, gray: 0.3 });
    d.footer('Crossroads Escapes · ' + room.title + ' · Exit Ticket');
    return d.bytes();
  }

  function guide(room, std, answerLines) {
    var d = new Doc();
    header(d, 'FACILITATION GUIDE  ·  GRADE ' + room.grade + '  ·  ' + room.standard, room.title, std.title + ': ' + std.text);
    function h(t) { d.ensure(40); d.y -= 8; d.para(t, { size: 13, bold: true, gap: 3 }); }
    function list(items) { items.forEach(function (t) { d.para('•  ' + t, { size: 10.5, indent: 10, gap: 2 }); }); d.y -= 4; }
    var L = std.lesson;
    h('At a glance');
    list(['Format: ' + room.formatLabel, 'Timing: 10–15 min mini-lesson, ' + (room.minutes || '25–30') + ' min activity, 5 min exit ticket', 'Materials: student devices only. No printing or supplies needed.', 'Learning target: ' + L.target]);
    h('Key vocabulary');
    list(L.vocab.map(function (v) { return v[0] + ' — ' + v[1]; }));
    h('Mini-lesson (teach before the activity)');
    d.para('Hook (2 min): ' + (room.hook || L.hook), { size: 10.5, gap: 4 });
    d.para('Teach (5 min):', { size: 10.5, bold: true, gap: 2 });
    list(L.teach);
    d.para('Model it (3 min): ' + L.model, { size: 10.5, gap: 4 });
    d.para('Check for understanding (2 min): ' + L.check, { size: 10.5, gap: 4 });
    h('Watch for these misconceptions');
    list(L.misconceptions);
    h('Running the activity');
    list(room.runTips);
    h('Debrief questions');
    list(L.debrief);
    h('Answer key');
    answerLines.forEach(function (a) { d.para(a, { size: 10, indent: 6, gap: 1 }); });
    d.para('Final code: ' + room.finalCode, { size: 10.5, bold: true, gap: 6 });
    d.footer('Crossroads Escapes · ' + room.title + ' · Facilitation Guide');
    return d.bytes();
  }

  global.CrossroadsPDF = { Doc: Doc, exitTicket: exitTicket, guide: guide, clean: clean };
  if (typeof module !== 'undefined') module.exports = global.CrossroadsPDF;
})(typeof window !== 'undefined' ? window : globalThis);
