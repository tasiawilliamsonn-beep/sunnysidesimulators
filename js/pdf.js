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
.replace(/→/g, '->').replace(/←/g, '<-').replace(/✓/g, '(correct)').replace(/[−–]/g, '-').replace(/≈/g, '~').replace(/≥/g, '>=').replace(/≤/g, '<=')
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
  var SUBJ = { science: [0.12, 0.49, 0.36], social: [0.78, 0.40, 0.13], ela: [0.47, 0.30, 0.70], math: [0.16, 0.42, 0.78] };
  function col(c) { return c[0].toFixed(3) + ' ' + c[1].toFixed(3) + ' ' + c[2].toFixed(3); }
  function tint(c, t) { return [c[0] + (1 - c[0]) * t, c[1] + (1 - c[1]) * t, c[2] + (1 - c[2]) * t]; }
  Doc.prototype.fillRGB = function (x, y, w, h, c) { this.raw(col(c) + ' rg ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ' + w.toFixed(2) + ' ' + h.toFixed(2) + ' re f'); };
  Doc.prototype.strokeRGB = function (x, y, w, h, c, lw) { this.raw(col(c) + ' RG ' + (lw || 1) + ' w ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ' + w.toFixed(2) + ' ' + h.toFixed(2) + ' re S'); };
  Doc.prototype.textRGB = function (x, y, str, size, bold, c) { this.raw(col(c) + ' rg BT /' + (bold ? 'F2' : 'F1') + ' ' + size + ' Tf ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' Td (' + encode(str) + ') Tj ET'); };
  Doc.prototype.inner = function () { return this.pageW - this.margin * 2; };
  // colored section banner
  Doc.prototype.banner = function (title, c, right) {
    this.ensure(60); this.y -= 10;
    this.fillRGB(this.margin, this.y - 22, this.inner(), 24, c);
    this.textRGB(this.margin + 10, this.y - 15.5, title.toUpperCase(), 11.5, true, [1, 1, 1]);
    if (right) { var wr = width(right, 9.5, true); this.textRGB(this.pageW - this.margin - 10 - wr, this.y - 15.5, right, 9.5, true, [1, 1, 1]); }
    this.y -= 32;
  };
  Doc.prototype.sub = function (t, c) { this.ensure(90); this.y -= 4; this.para(t, { size: 11.5, bold: true, gap: 3 }); };
  // tinted box with wrapped paragraphs: items = [{label, text}] or strings
  Doc.prototype.callout = function (items, c, o) {
    o = o || {}; var self = this, pad = 9, size = o.size || 10.5, lead = size * 1.35, maxW = this.inner() - pad * 2 - 6;
    var lines = [];
    [].concat(items).forEach(function (it) {
      var label = it.label ? it.label + ' ' : '', text = typeof it === 'string' ? it : it.text;
      var ws = self.wrap(label + text, size, false, maxW);
      ws.forEach(function (l, k) { lines.push({ s: l, bold: k === 0 && !!it.label, label: k === 0 ? label : '' }); });
      lines.push(null);
    });
    lines.pop();
    var h = lines.reduce(function (a, l) { return a + (l ? lead : 4); }, 0) + pad * 2;
    if (h < 700) this.ensure(h + 6);
    this.fillRGB(this.margin, this.y - h, this.inner(), h, tint(c, 0.88));
    this.fillRGB(this.margin, this.y - h, 4, h, c);
    var yy = this.y - pad;
    lines.forEach(function (l) {
      if (!l) { yy -= 4; return; }
      yy -= lead;
      if (l.label) {
        self.textAt(self.margin + pad + 6, yy + 3, l.label.trim(), size, true);
        self.textAt(self.margin + pad + 9 + width(l.label, size, true), yy + 3, l.s.slice(l.label.length), size, false);
      } else self.textAt(self.margin + pad + 6, yy + 3, l.s, size, false);
    });
    this.y -= h + 8;
  };
  // table: cols = [{w (fraction), h (header)}], rows = [[cell strings]]
  Doc.prototype.table = function (cols, rows, c, o) {
    o = o || {}; var self = this, size = o.size || 9.5, lead = size * 1.3, pad = 5, W = this.inner();
    var ws = cols.map(function (k) { return k.w * W; });
    function rowH(cells, bold, minH) {
      var n = 1; cells.forEach(function (t, i) { n = Math.max(n, self.wrap(String(t == null ? '' : t), size, bold, ws[i] - pad * 2).length); });
      return Math.max(minH || 0, n * lead + pad * 2);
    }
    function draw(cells, bold, fill, minH) {
      var h = rowH(cells, bold, minH);
      if (self.y - h < self.margin) { self.newPage(); if (!bold && o.repeat !== false) draw(cols.map(function (k) { return k.h; }), true, c); }
      var x = self.margin;
      cells.forEach(function (t, i) {
        if (fill) self.fillRGB(x, self.y - h, ws[i], h, fill);
        self.strokeRGB(x, self.y - h, ws[i], h, [0.62, 0.66, 0.72], 0.6);
        var ls = self.wrap(String(t == null ? '' : t), size, bold, ws[i] - pad * 2);
        ls.forEach(function (l, k) { if (bold && fill === c) self.textRGB(x + pad, self.y - pad - lead * (k + 1) + 3, l, size, true, [1, 1, 1]); else self.textAt(x + pad, self.y - pad - lead * (k + 1) + 3, l, size, bold); });
        x += ws[i];
      });
      self.y -= h;
    }
    var hasHead = cols.some(function (k) { return k.h; });
    var need = (hasHead ? rowH(cols.map(function (k) { return k.h; }), true) : 0) + (rows.length ? rowH(rows[0], false, o.minH) : 0);
    if (this.y - need < this.margin) this.newPage();
    if (hasHead) draw(cols.map(function (k) { return k.h; }), true, c);
    rows.forEach(function (r, i) { draw(r, false, i % 2 ? tint(c, 0.94) : null, o.minH); });
    this.y -= 10;
  };
  Doc.prototype.checkbox = function (x, y) { this.box(x, y, 9, 9, 0.35); };
  Doc.prototype.nameDate = function () {
    var x = this.margin, y = this.y - 16;
    this.textAt(x, y, 'Name:', 11, true); this.line(x + 38, y - 2, x + 290, y - 2, 0.6, 0.4);
    this.textAt(x + 310, y, 'Date:', 11, true); this.line(x + 344, y - 2, this.pageW - this.margin, y - 2, 0.6, 0.4);
    this.y = y - 14;
  };

  function header(d, kicker, title, sub, c) {
    c = c || [0.15, 0.15, 0.15];
    d.fillRGB(d.margin, d.y - 6, d.inner(), 6, c);
    d.y -= 16;
    d.para(kicker, { size: 9, bold: true, gray: 0.35, gap: 0 });
    d.para(title, { size: 19, bold: true, gap: 2 });
    if (sub) d.para(sub, { size: 10, gray: 0.3, gap: 4 });
  }
  function blanks(note, show) { return note.replace(/\[([^\]]+)\]/g, function (_, w) { return show ? w.toUpperCase() : '_______________'; }); }
  var FRAMES = {
    CER: [['Claim', 'Answer the question in one sentence.', 2], ['Evidence', 'Give data or quote the text.', 3], ['Reasoning', 'Explain WHY the evidence supports your claim using a science idea.', 3]],
    RACE: [['Restate', 'Turn the question into a statement.', 1], ['Answer', 'Answer every part of the question.', 2], ['Cite', 'Quote the text in quotation marks.', 2], ['Explain', 'Explain how the evidence proves your answer.', 3]],
    SOURCE: [['Claim', 'Answer the question in one sentence.', 2], ['Evidence', 'Quote or cite facts from the source.', 2], ['Source check', 'Who made it, when, why? Can we trust it?', 2], ['Explain', 'Why does the evidence prove your claim?', 2]],
    MATH: [['Solve', 'Final answer with units.', 1], ['Show', 'Equation or steps with numbers and operations.', 3], ['Explain', 'Explain your strategy using math words.', 3]]
  };
  var FRAME_NAME = { CER: 'Claim-Evidence-Reasoning', RACE: 'RACE', SOURCE: 'Historian\'s Claim (Claim, Evidence, Source, Explain)', MATH: 'Solve-Show-Explain' };
  var NOTEBOOK = ['Write the date and "Warm-Up" at the top of a new notebook page (or use the worksheet).', 'Number each answer to match the question.', 'Answer in complete sentences. For math, show your work.', 'Work silently for 5 minutes, then share with a partner for 2 minutes.', 'Be ready to share one answer with the class.'];
  function exitPoints(room, lesson) { var mc = room.exit.filter(function (q) { return q.choices; }).length, cr = room.exit.length - mc; return { mc: mc, cr: cr, total: mc * 2 + cr * 2 + (lesson && lesson.exit ? 4 : 0) }; }

  function exitTicket(room, std, lesson) {
    var d = new Doc(), c = SUBJ[room.subject] || [0.2, 0.2, 0.2], ex = lesson && lesson.exit, pts = exitPoints(room, lesson);
    header(d, 'EXIT TICKET  ·  GRADE ' + room.grade + '  ·  ' + room.standard, room.title, std ? std.title : '', c);
    d.nameDate();
    d.callout([{ label: 'Show your evidence.', text: 'For every answer, explain HOW you know. Answers without evidence earn partial credit.' }], c, { size: 10 });
    var mcs = room.exit.filter(function (q) { return q.choices; }), crs = room.exit.filter(function (q) { return !q.choices; }), n = 0;
    if (mcs.length) {
      d.banner('Part A: Choose and justify', c, (mcs.length * 2) + ' points');
      mcs.forEach(function (q) {
        d.ensure(120); n++;
        d.para(n + '.  ' + q.q, { size: 11, bold: true, gap: 3 });
        q.choices.forEach(function (ch, k) { d.para('(' + LET[k] + ')  ' + ch, { size: 10.5, indent: 18, gap: 1 }); });
        d.y -= 2; d.para('I know because (use a fact, rule, or evidence):', { size: 9.5, indent: 18, gray: 0.35, gap: 0 });
        d.writeLines(2, 18);
      });
    }
    if (crs.length) {
      d.banner('Part B: Explain with evidence', c, (crs.length * 2) + ' points');
      crs.forEach(function (q) { d.ensure(110); n++; d.para(n + '.  ' + q.q, { size: 11, bold: true, gap: 3 }); d.writeLines(q.lines || 3, 18); });
    }
    if (ex) {
      d.banner('Part C: Apply it to something new (' + FRAME_NAME[ex.frame].split(' (')[0] + ')', c, '4 points');
      n++;
      d.callout([{ label: 'Read:', text: ex.stim }], c, { size: 10.5 });
      d.para(n + '.  ' + ex.q, { size: 11, bold: true, gap: 4 });
      (FRAMES[ex.frame] || FRAMES.CER).forEach(function (f) { d.ensure(30 + f[2] * 24); d.para(f[0] + ': ', { size: 10.5, bold: true, gap: 0, indent: 6 }); d.para(f[1], { size: 9, gray: 0.4, indent: 6, gap: 0 }); d.writeLines(f[2], 6); });
    }
    // Teacher key
    d.newPage();
    header(d, 'TEACHER KEY AND MASTERY GUIDE  ·  ' + room.standard, room.title + ': Exit Ticket', 'Remove this page before copying. Total: ' + pts.total + ' points.', c);
    var rows = [], k = 0;
    mcs.forEach(function (q) { k++; rows.push([String(k), q.q, '(' + LET[q.answer] + ') ' + q.choices[q.answer], '1 pt correct choice + 1 pt reason that uses the key idea (not "I guessed" or "it sounds right").']); });
    crs.forEach(function (q) { k++; rows.push([String(k), q.q, q.answer, '2 = accurate and supported with a reason or example; 1 = partly accurate or no support; 0 = inaccurate.']); });
    if (ex) { k++; rows.push([String(k), ex.q, ex.model + (ex.answer ? ' (Answer: ' + [].concat(ex.answer)[0] + (ex.unit ? ' ' + ex.unit : '') + ')' : ''), 'Score with the rubric below (0–4).']); }
    d.table([{ w: 0.05, h: '#' }, { w: 0.27, h: 'Question' }, { w: 0.4, h: 'Answer / what to look for' }, { w: 0.28, h: 'Scoring' }], rows, c);
    if (ex) {
      d.sub('Part C rubric (' + FRAME_NAME[ex.frame] + ')');
      d.table([{ w: 0.25, h: 'Score' }, { w: 0.75, h: 'What it looks like' }], [
        ['4: Mastered', 'Correct and complete. ' + ex.look.join('; ') + '. Clear, precise language.'],
        ['3: Nearly there', 'Correct claim/answer with evidence, but the reasoning or explanation is thin or missing one piece.'],
        ['2: Approaching', 'Partly correct; evidence is general, or reasoning does not connect to the claim.'],
        ['1: Beginning', 'Answer attempted but inaccurate or unsupported.'],
        ['0', 'No response.']], c);
    }
    d.sub('Sort students for tomorrow');
    var m = Math.ceil(pts.total * 0.8), a = Math.ceil(pts.total * 0.5);
    d.table([{ w: 0.22, h: 'Score' }, { w: 0.2, h: 'Level' }, { w: 0.58, h: 'Next step' }], [
      [m + '–' + pts.total + ' pts', 'Mastered', 'Extension: replay the room at the Legend level or write a second evidence response. Can serve as a peer helper.'],
      [a + '–' + (m - 1) + ' pts', 'Approaching', 'Quick reteach (5–10 min): replay the mini-lesson presenter steps tied to the missed items, then 2 similar practice questions.'],
      ['0–' + (a - 1) + ' pts', 'Beginning', 'Small group: guided notes review, then replay the room at the Explorer level with the teacher. Recheck with a new exit ticket.']], c);
    d.para('Evidence to look for: Did the student use vocabulary correctly, cite specific data or text, and explain the connection? A correct choice without a reason shows recognition, not yet mastery.', { size: 10, gap: 4 });
    d.footer('Crossroads Escapes · ' + room.title + ' · Exit Ticket');
    return d.bytes();
  }

  function warmup(room, std, lesson) {
    var d = new Doc(), c = SUBJ[room.subject] || [0.2, 0.2, 0.2];
    header(d, 'WARM-UP  ·  GRADE ' + room.grade + '  ·  ' + room.standard, std.title, 'Use this sheet or copy the questions into your notebook.', c);
    d.nameDate();
    d.banner('Notebook expectations', c, '5 min silent + 2 min share');
    NOTEBOOK.forEach(function (t, i) { d.para((i + 1) + '.  ' + t, { size: 10.5, indent: 6, gap: 2 }); });
    d.banner('Warm-up questions', c);
    lesson.warmup.forEach(function (w, i) { d.ensure(40 + w[2] * 24); d.para((i + 1) + '.  ' + w[0], { size: 11.5, bold: true, gap: 2 }); d.writeLines(w[2] + 1, 18); });
    d.callout([{ label: 'Today\'s target:', text: std.lesson.target }], c);
    d.newPage();
    header(d, 'TEACHER KEY  ·  WARM-UP', std.title, 'What to look for in student notebooks.', c);
    d.table([{ w: 0.06, h: '#' }, { w: 0.44, h: 'Question' }, { w: 0.5, h: 'Look for' }], lesson.warmup.map(function (w, i) { return [String(i + 1), w[0], w[1]]; }), c);
    d.para('Use the warm-up to activate prior knowledge. Call on 2–3 students, and write one strong answer on the board as a model. Question 3 previews today\'s lesson, so do not correct it yet; come back to it in the debrief.', { size: 10.5 });
    d.footer('Crossroads Escapes · ' + std.code + ' · Warm-Up');
    return d.bytes();
  }

  function notes(room, std, lesson, key) {
    var d = new Doc(), c = SUBJ[room.subject] || [0.2, 0.2, 0.2], L = std.lesson;
    header(d, (key ? 'TEACHER KEY  ·  ' : '') + 'GUIDED NOTES  ·  GRADE ' + room.grade + '  ·  ' + room.standard, std.title, 'Fill in these notes as your teacher presents each step of the mini-lesson.', c);
    if (!key) d.nameDate();
    d.callout([{ label: 'I can:', text: L.target.replace(/^I can\s*/i, '') }], c);
    d.banner('Key vocabulary', c);
    d.table([{ w: 0.24, h: 'Word' }, { w: 0.46, h: 'What it means (in my own words)' }, { w: 0.3, h: 'Example or sketch' }], L.vocab.map(function (v) { return [v[0], key ? v[1] : '', '']; }), c, { minH: 40 });
    lesson.steps.forEach(function (st, i) {
      d.banner('Step ' + (i + 1) + ': ' + st.t, c);
      d.para(blanks(st.note, key), { size: 11, gap: 4, indent: 4 });
      d.para('Do: ' + st.do, { size: 10, gray: 0.3, indent: 4, gap: 4 });
      var ck = st.check;
      d.ensure(70);
      d.para('Try it: ' + ck.q, { size: 10.5, bold: true, indent: 4, gap: 2 });
      if (ck.type === 'mc') ck.choices.forEach(function (ch, k) { d.para('(' + LET[k] + ')  ' + ch + (key && k === ck.answer ? '   <- answer' : ''), { size: 10, indent: 20, gap: 0 }); });
      else if (ck.type === 'order') d.para(key ? ck.items.join(' → ') : ck.items.slice().reverse().join('   |   '), { size: 10, indent: 20, gap: 0 });
      else if (ck.type === 'highlight') d.para(ck.segments.map(function (sg, k) { return key && ck.answer.indexOf(k) >= 0 ? '[' + sg + ']' : sg; }).join(' '), { size: 10, indent: 20, gap: 0 });
      else if (key) d.para('Answer: ' + ck.answer[0] + (ck.unit ? ' ' + ck.unit : ''), { size: 10, indent: 20, gap: 0 });
      if (key && ck.explain) d.para('Why: ' + ck.explain, { size: 9.5, gray: 0.35, indent: 20, gap: 0 });
      if (!key) d.writeLines(1, 20);
    });
    d.banner('Sum it up', c);
    d.para('In my own words, the most important idea from today is...', { size: 10.5, gap: 2 });
    if (key) d.para(L.target, { size: 10.5, gray: 0.3 }); else d.writeLines(3);
    d.footer('Crossroads Escapes · ' + std.code + ' · Guided Notes' + (key ? ' (Key)' : ''));
    return d.bytes();
  }

  function guide(room, std, answerLines, lesson) {
    var d = new Doc(), c = SUBJ[room.subject] || [0.2, 0.2, 0.2], L = std.lesson, X = lesson || {};
    header(d, 'FACILITATION GUIDE  ·  60-MINUTE LESSON  ·  GRADE ' + room.grade + '  ·  ' + room.standard, room.title, std.title + ': ' + std.text, c);
    d.callout([{ label: 'Learning target:', text: L.target }, { label: 'Success looks like:', text: 'Students use the vocabulary correctly, complete the ' + room.formatLabel.toLowerCase() + ', and score 80% or higher on the evidence-based exit ticket.' }, { label: 'Materials:', text: 'Student devices, notebooks (or the printed warm-up and guided notes), projector for the mini-lesson presenter.' }], c);
    d.banner('Lesson at a glance', c, '60 minutes');
    d.table([{ w: 0.13, h: 'Time' }, { w: 0.17, h: 'Part' }, { w: 0.4, h: 'Teacher does' }, { w: 0.3, h: 'Students do' }], [
      ['0:00–0:08', 'Warm-up', 'Project the warm-up. Circulate, then call on 2–3 students. Save question 3 for the debrief.', 'Answer 3 questions in notebooks or on the worksheet; share with a partner.'],
      ['0:08–0:20', 'Mini-lesson', 'Teach with the 4-step presenter. Run each quick check with the whole class.', 'Fill in guided notes; answer quick checks (whiteboards, fingers, or aloud).'],
      ['0:20–0:48', room.formatLabel, 'Launch ' + room.title + '. Assign mission levels; circulate with the answer key.', 'Play solo or in pairs; record code pieces; complete any written evidence task.'],
      ['0:48–0:52', 'Debrief', 'Ask 2 debrief questions and revisit warm-up question 3.', 'Discuss and correct their notes.'],
      ['0:52–1:00', 'Exit ticket', 'Hand out the exit ticket. Collect and sort with the mastery guide.', 'Answer with evidence independently.']], c);
    d.sub('Key vocabulary');
    d.table([{ w: 0.25, h: 'Word' }, { w: 0.75, h: 'Student-friendly definition' }], L.vocab, c);
    if (X.warmup) {
      d.banner('1. Warm-up', c, '0:00–0:08 · 8 min');
      d.callout([{ label: 'Notebook expectations (post these):', text: NOTEBOOK.join(' ') }], c, { size: 10 });
      d.table([{ w: 0.06, h: '#' }, { w: 0.47, h: 'Question' }, { w: 0.47, h: 'Look for' }], X.warmup.map(function (w, i) { return [String(i + 1), w[0], w[1]]; }), c);
    }
    d.banner('2. Mini-lesson', c, '0:08–0:20 · 12 min');
    d.para('Open the Mini-lesson presenter on the room page and project it. Each step has a teacher script, an interactive tool, and a quick check. Students fill in the matching guided notes.', { size: 10.5, gap: 4 });
    d.callout([{ label: 'Hook (1 min):', text: room.hook || L.hook }], c, { size: 10 });
    (X.steps || []).forEach(function (st, i) {
      var tool = st.tool ? (st.tool.sim ? 'Simulation: ' + st.tool.sim.title : Array.isArray(st.tool) ? 'Visual models' : 'Visual: ' + (st.tool.caption || st.tool.kind)) : st.cards ? 'Flip cards: ' + st.cards.map(function (x) { return x[0]; }).join(', ') : 'Board and notes';
      var ck = st.check, ans = ck.type === 'mc' ? '(' + LET[ck.answer] + ') ' + ck.choices[ck.answer] : ck.type === 'order' ? ck.items.join(' → ') : ck.type === 'highlight' ? ck.answer.map(function (k) { return ck.segments[k]; }).join(' + ') : ck.answer[0];
      d.sub('Step ' + (i + 1) + ' (3 min): ' + st.t);
      d.table([{ w: 0.2 }, { w: 0.8 }], [['Teach', st.say], ['Interactive tool', tool], ['Students do', st.do], ['Guided notes', blanks(st.note, true)], ['Quick check', ck.q + '  Answer: ' + ans]], c, { repeat: false });
    });
    d.sub('Model it');
    d.para(L.model, { size: 10.5 });
    d.callout(L.misconceptions.map(function (m) { return { label: 'Misconception:', text: m }; }), [0.8, 0.45, 0.1], { size: 10 });
    d.banner('3. ' + room.formatLabel + ': ' + room.title, c, '0:20–0:48 · 28 min');
    d.para('Launch: project the start screen, read the story aloud, and assign mission levels (Explorer = extra support, Agent = on level, Legend = challenge). Students can open Supports any time for read-aloud, bigger text, a word bank, and a scratch pad.', { size: 10.5, gap: 4 });
    (room.runTips || []).forEach(function (t) { d.para('•  ' + t, { size: 10.5, indent: 10, gap: 2 }); });
    d.y -= 4;
    d.para('Students turn in: the completion code plus their copied "turn in your work" block (Canvas Text Entry).', { size: 10.5, bold: true, gap: 4 });
    d.banner('4. Debrief', c, '0:48–0:52 · 4 min');
    L.debrief.forEach(function (t, i) { d.para((i + 1) + '.  ' + t, { size: 10.5, indent: 6, gap: 2 }); });
    if (X.warmup) d.para('Close the loop: return to warm-up question 3. Answer: ' + X.warmup[2][1], { size: 10.5, gap: 4 });
    d.banner('5. Exit ticket', c, '0:52–1:00 · 8 min');
    d.para('Print the exit ticket PDF (page 2 is the key and mastery guide). Every item requires evidence: Part A asks students to justify each choice, Part B asks for an explanation, and Part C applies the standard to a new situation using ' + (X.exit ? FRAME_NAME[X.exit.frame] : 'a written response') + '. Sort results into Mastered, Approaching, and Beginning to plan tomorrow\'s groups.', { size: 10.5, gap: 4 });
    d.banner('Lesson resources', c);
    d.table([{ w: 0.3, h: 'Resource' }, { w: 0.7, h: 'How it fits the lesson' }], [
      ['Warm-up worksheet (PDF)', 'Printable version of the warm-up with notebook expectations and a key.'],
      ['Mini-lesson presenter', 'Projectable, step-by-step interactive lesson with tools and quick checks (room page).'],
      ['Guided notes (PDF + key)', 'Students fill in blanks, vocabulary, and "try it" problems that match each presenter step.'],
      [room.title + ' (.html)', 'The ' + room.formatLabel.toLowerCase() + ' for Canvas, with differentiated levels, supports, and a turn-in.'],
      ['Exit ticket (PDF + key)', 'Evidence-based check with a rubric and a mastery sorting guide.']].concat((std.resources || []).slice(0, 4).map(function (x) { return [x.name + ' (extra)', x.note + ' ' + x.url]; })), c);
    d.banner('Answer key: ' + room.title, c);
    answerLines.forEach(function (a) { d.para(a, { size: 9.5, indent: 6, gap: 1 }); });
    d.para('Final code: ' + room.finalCode, { size: 11, bold: true, gap: 6 });
    d.footer('Crossroads Escapes · ' + room.title + ' · Facilitation Guide');
    return d.bytes();
  }

  global.CrossroadsPDF = { Doc: Doc, exitTicket: exitTicket, guide: guide, warmup: warmup, notes: notes, clean: clean };
  if (typeof module !== 'undefined') module.exports = global.CrossroadsPDF;
})(typeof window !== 'undefined' ? window : globalThis);
