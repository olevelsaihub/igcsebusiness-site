/* Group G02 mastery bank: Break-even output, charts and usefulness; Markup, margins and the income statement; Sources of finance and cash flow. Original questions, not copied from past papers. */
(function () {
  'use strict';
  var B = window.MASTERY_BANKS = window.MASTERY_BANKS || {};
  var R = window.Mastery;   // R.roundDp(x, dp), R.roundSf(x, n): correct half-up rounding
  // Half-up rounding after first removing binary floating-point noise (e.g. 196.87499999999997 -> 196.875 -> 196.88).
  function rd(x, dp) { return R.roundDp(R.roundDp(x, 9), dp); }

  function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  // Number with thousands separators and a fixed number of decimal places (after correct rounding).
  function fmt(x, dp) {
    dp = dp || 0;
    var v = rd(x, dp);
    var s = Math.abs(v).toFixed(dp).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (v < 0 ? '−' : '') + s.join('.');
  }
  // Money: sym is '$', '€', '£' or a code with a trailing space such as 'AED '.
  function money(x, sym, dp) { return (x < 0 ? '−' : '') + sym + fmt(Math.abs(x), dp || 0); }
  function m2(x, sym) { return money(x, sym, 2); }
  function pct2(x) { return fmt(x, 2) + '%'; }
  function ceilDiv(a, b) { return Math.ceil(rd(a / b, 9)); }
  function table(head, rows) {
    return '<table class="mc-table"><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
  }
  function niceStep(raw) {
    var p = Math.pow(10, Math.floor(Math.log10(raw)));
    var c = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < c.length; i++) if (c[i] * p >= raw - 1e-9) return c[i] * p;
    return 10 * p;
  }

  /* ---------- Break-even chart drawing ----------
     o: { F, V, P, maxQ, xStep, yStep, labels: {fc, tc, tr} (letters or ''), points: [{q, v, label}], mark: q (vertical dashed line), sym } */
  function beChart(o) {
    var X0 = 62, X1 = 300, Y0 = 190, Y1 = 22;
    var maxY = o.yStep * 5;
    function x(q) { return rd(X0 + q / o.maxQ * (X1 - X0), 1); }
    function y(v) { return rd(Y0 - v / maxY * (Y0 - Y1), 1); }
    var s = '<svg viewBox="0 0 330 240" role="img" aria-label="' + (o.aria || 'Break-even chart') + '" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="10">';
    var i;
    for (i = 0; i <= 5; i++) {
      var yy = y(o.yStep * i);
      s += '<line x1="' + X0 + '" y1="' + yy + '" x2="' + X1 + '" y2="' + yy + '" stroke="#9aa5b8" stroke-width="0.4"/>';
      s += '<text x="' + (X0 - 4) + '" y="' + (yy + 3) + '" text-anchor="end" fill="#303a4c">' + fmt(o.yStep * i) + '</text>';
    }
    var nx = Math.round(o.maxQ / o.xStep);
    for (i = 0; i <= nx; i++) {
      var xx = x(o.xStep * i);
      s += '<line x1="' + xx + '" y1="' + Y0 + '" x2="' + xx + '" y2="' + Y1 + '" stroke="#9aa5b8" stroke-width="0.4"/>';
      s += '<text x="' + xx + '" y="' + (Y0 + 12) + '" text-anchor="middle" fill="#303a4c">' + fmt(o.xStep * i) + '</text>';
    }
    s += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#303a4c" stroke-width="1.2"/>';
    s += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#303a4c" stroke-width="1.2"/>';
    s += '<text x="' + ((X0 + X1) / 2) + '" y="' + (Y0 + 28) + '" text-anchor="middle" fill="#303a4c">Output (' + (o.unitName || 'units') + ')</text>';
    s += '<text x="12" y="' + ((Y0 + Y1) / 2) + '" text-anchor="middle" fill="#303a4c" transform="rotate(-90 12 ' + ((Y0 + Y1) / 2) + ')">Costs and revenue (' + (o.sym || '$').trim() + ')</text>';
    var L = o.labels || {};
    var lines = [
      { k: 'fc', a: o.F, b: o.F, col: '#9aa5b8', w: 2 },
      { k: 'tc', a: o.F, b: o.F + o.V * o.maxQ, col: '#303a4c', w: 2 },
      { k: 'tr', a: 0, b: o.P * o.maxQ, col: '#195d9b', w: 2 }
    ];
    lines.forEach(function (ln) {
      s += '<line x1="' + x(0) + '" y1="' + y(ln.a) + '" x2="' + x(o.maxQ) + '" y2="' + y(ln.b) + '" stroke="' + ln.col + '" stroke-width="' + ln.w + '"/>';
      if (L[ln.k]) s += '<text x="' + (X1 + 5) + '" y="' + (y(ln.b) + 4) + '" fill="#303a4c" font-weight="bold" font-size="12">' + L[ln.k] + '</text>';
    });
    if (o.mark != null) s += '<line x1="' + x(o.mark) + '" y1="' + Y0 + '" x2="' + x(o.mark) + '" y2="' + Y1 + '" stroke="#e4464f" stroke-width="1.2" stroke-dasharray="4 3"/>';
    (o.points || []).forEach(function (p) {
      s += '<circle cx="' + x(p.q) + '" cy="' + y(p.v) + '" r="3.5" fill="#e4464f"/>';
      s += '<text x="' + (x(p.q) + (p.dx || 5)) + '" y="' + (y(p.v) + (p.dy || -6)) + '" fill="#e4464f" font-weight="bold" font-size="12">' + p.label + '</text>';
    });
    return s + '</svg>';
  }

  /* =====================================================================
     BUS-CALC-06 Break-even output using contribution
     ===================================================================== */
  B['BUS-CALC-06'] = { title: 'Break-even output using contribution', items: [
    { skill: 'be-units', gen: function () {
      var c = rint(4, 12), q = rint(12, 90) * 10, V = rint(3, 9) + pick([0, 0.5]), P = V + c, F = c * q;
      return { kind: 'num', q: 'Glowhaus makes scented candles. Its fixed costs are ' + money(F, '$') + ' per month. Each candle sells for ' + m2(P, '$') + ' and has variable costs of ' + m2(V, '$') + '.<br>Calculate the number of candles Glowhaus must sell each month to break even.',
        answer: q, unit: 'candles', display: String(q),
        why: 'Contribution per candle = ' + m2(P, '$') + ' − ' + m2(V, '$') + ' = ' + m2(c, '$') + '. Break-even output = ' + money(F, '$') + ' ÷ ' + m2(c, '$') + ' = ' + fmt(q) + ' candles.' };
    } },
    { skill: 'be-units', gen: function () {
      var c = pick([1.25, 1.5, 1.75, 2.25, 2.5]), q = rint(10, 60) * 20, V = pick([0.85, 1.1, 1.3, 1.45, 1.6]);
      var P = rd(V + c, 2), F = rd(c * q, 2);
      return { kind: 'num', q: 'Fuego Foods bottles chilli sauce. Weekly fixed costs are ' + money(F, '€') + '. A bottle sells to shops for ' + m2(P, '€') + ' and its variable cost is ' + m2(V, '€') + '.<br>Calculate how many bottles must be sold each week to break even.',
        answer: q, unit: 'bottles', display: String(q),
        why: 'Contribution per bottle = ' + m2(P, '€') + ' − ' + m2(V, '€') + ' = ' + m2(c, '€') + '. Break-even = ' + money(F, '€') + ' ÷ ' + m2(c, '€') + ' = ' + fmt(q) + ' bottles.' };
    } },
    { skill: 'be-units', gen: function () {
      var c = rint(15, 40), q = rint(8, 30), F = c * q, hire = Math.round(F * pick([0.55, 0.6, 0.65]) / 10) * 10, wage = F - hire;
      var V = rint(3, 8), P = V + c;
      return { kind: 'num', q: 'Coral Bay Tours runs a daily boat trip. Each day it pays ' + money(hire, '$') + ' to hire the boat and ' + money(wage, '$') + ' for the skipper, whatever the number of passengers. A ticket costs ' + money(P, '$') + ' and each passenger receives a snack pack costing ' + money(V, '$') + '.<br>Calculate the number of tickets that must be sold each day to break even.',
        answer: q, unit: 'tickets', display: String(q),
        why: 'Fixed costs per day = ' + money(hire, '$') + ' + ' + money(wage, '$') + ' = ' + money(F, '$') + '. Contribution per ticket = ' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + '. Break-even = ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + q + ' tickets.' };
    } },
    { skill: 'be-period', gen: function () {
      var c = rint(12, 30), q = rint(4, 25) * 10, A = 12 * c * q, V = rint(15, 40), P = V + c;
      return { kind: 'num', q: 'Ebony &amp; Ivory Crafts makes wooden chess sets. Its fixed costs are ' + money(A, '$') + ' per <b>year</b>, spread evenly across the months. Each chess set sells for ' + money(P, '$') + ' and has variable costs of ' + money(V, '$') + '.<br>Calculate how many chess sets must be sold each <b>month</b> to break even.',
        answer: q, unit: 'chess sets', display: String(q),
        why: 'Monthly fixed costs = ' + money(A, '$') + ' ÷ 12 = ' + money(A / 12, '$') + '. Contribution = ' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + '. Break-even per month = ' + money(A / 12, '$') + ' ÷ ' + money(c, '$') + ' = ' + q + ' chess sets.' };
    } },
    { skill: 'be-period', gen: function () {
      var days = pick([5, 6]), c = pick([1.5, 2, 2.5, 3]), q = rint(4, 15) * 10, Fw = rd(days * c * q, 2), V = pick([1.2, 1.4, 1.6, 1.8]), P = rd(V + c, 2);
      return { kind: 'num', q: 'Pulp Juice Bar opens ' + days + ' days a week. Its fixed costs are ' + money(Fw, '$') + ' per week. A cup of juice sells for ' + m2(P, '$') + ' and the fruit and cup cost ' + m2(V, '$') + '.<br>Calculate the number of cups it must sell <b>each day</b> to break even.',
        answer: q, unit: 'cups', display: String(q),
        why: 'Fixed costs per day = ' + money(Fw, '$') + ' ÷ ' + days + ' = ' + money(Fw / days, '$') + '. Contribution per cup = ' + m2(P, '$') + ' − ' + m2(V, '$') + ' = ' + m2(c, '$') + '. Break-even = ' + money(Fw / days, '$') + ' ÷ ' + m2(c, '$') + ' = ' + q + ' cups a day.' };
    } },
    { skill: 'be-roundup', gen: function () {
      var c = rint(3, 9), q = rint(15, 80) * 10 + rint(1, 9), r = rint(1, c - 1), F = c * (q - 1) + r, V = rint(2, 6), P = V + c;
      return { kind: 'num', q: 'Snapcase prints phone cases. Monthly fixed costs are ' + money(F, '$') + '. Each case sells for ' + money(P, '$') + ' and has variable costs of ' + money(V, '$') + '.<br>Calculate the break-even level of output. Give your answer as a whole number of phone cases.',
        answer: q, unit: 'phone cases', display: String(q),
        why: 'Contribution = ' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + '. ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + fmt(F / c, 2) + '. Part of a case cannot be sold, and ' + (q - 1) + ' cases would still leave a small loss, so round UP to ' + q + ' cases.' };
    } },
    { skill: 'be-roundup', gen: function () {
      var c = pick([7, 11, 13, 17]), q = rint(40, 220), r = rint(1, c - 1), F = c * (q - 1) + r, V = rint(9, 25), P = V + c;
      return { kind: 'num', q: 'Trailmark makes leather wallets. Fixed costs are ' + money(F, '£') + ' a month, each wallet sells for ' + money(P, '£') + ' and the variable cost of a wallet is ' + money(V, '£') + '.<br>How many wallets must Trailmark sell each month to <b>at least</b> break even?',
        answer: q, unit: 'wallets', display: String(q),
        why: 'Contribution = ' + money(P, '£') + ' − ' + money(V, '£') + ' = ' + money(c, '£') + '. ' + money(F, '£') + ' ÷ ' + money(c, '£') + ' = ' + fmt(F / c, 2) + ', which is not whole. Selling ' + (q - 1) + ' wallets would not quite cover fixed costs, so the answer rounds up to ' + q + ' wallets.' };
    } },
    { skill: 'be-contribution', gen: function () {
      var a = pick([1.4, 1.8, 2.2, 2.6]), b = pick([0.35, 0.45, 0.6, 0.75]), d = pick([0.5, 0.8, 1.2]), P = pick([9.5, 11, 12.5, 14]);
      var V = rd(a + b + d, 2), c = rd(P - V, 2);
      return { kind: 'num', q: 'Kilnworks sells hand-made ceramic mugs for ' + m2(P, '$') + ' each. For each mug it spends ' + m2(a, '$') + ' on clay, ' + m2(b, '$') + ' on glaze and ' + m2(d, '$') + ' on a gift box. It also pays ' + money(pick([900, 1200, 1500]), '$') + ' a month to rent its studio.<br>Calculate the contribution per mug. Give your answer in $ to 2 decimal places.',
        answer: c, unit: '$', tol: 0.005, display: c.toFixed(2),
        why: 'Variable cost per mug = ' + m2(a, '$') + ' + ' + m2(b, '$') + ' + ' + m2(d, '$') + ' = ' + m2(V, '$') + '. Contribution = price − variable cost = ' + m2(P, '$') + ' − ' + m2(V, '$') + ' = ' + m2(c, '$') + '. The studio rent is a fixed cost, so it is not used here.' };
    } },
    { skill: 'be-contribution', gen: function () {
      var n = pick([200, 250, 400, 500]), V = pick([14, 16, 18, 22, 24]), X = n * V, c = rint(8, 20), q = rint(10, 60) * 10, F = c * q, P = V + c;
      return { kind: 'num', q: 'Packright makes school backpacks. Last month it made ' + n + ' backpacks and its total variable costs were ' + money(X, '$') + '. Fixed costs are ' + money(F, '$') + ' a month and each backpack sells for ' + money(P, '$') + '.<br>Calculate the break-even level of output per month.',
        answer: q, unit: 'backpacks', display: String(q),
        why: 'Variable cost per backpack = ' + money(X, '$') + ' ÷ ' + n + ' = ' + money(V, '$') + '. Contribution = ' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + '. Break-even = ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + q + ' backpacks.' };
    } },
    { skill: 'be-change', gen: function () {
      var c1 = rint(4, 9), rise = rint(1, 4), c2 = c1 + rise, q2 = rint(10, 60) * 10, F = c2 * q2, V = rint(6, 15), P = V + c1;
      return { kind: 'num', q: 'Sunbeam Lights sells solar lanterns for ' + money(P, '$') + ' each. Variable costs are ' + money(V, '$') + ' per lantern and fixed costs are ' + money(F, '$') + ' per month. The owner plans to raise the price by ' + money(rise, '$') + '.<br>Calculate the new break-even output per month.',
        answer: q2, unit: 'lanterns', display: String(q2),
        why: 'New price = ' + money(P + rise, '$') + ', so new contribution = ' + money(P + rise, '$') + ' − ' + money(V, '$') + ' = ' + money(c2, '$') + '. New break-even = ' + money(F, '$') + ' ÷ ' + money(c2, '$') + ' = ' + q2 + ' lanterns.' };
    } },
    { skill: 'be-change', gen: function () {
      var c = rint(10, 25), q1 = rint(20, 60) * 5, F1 = c * q1, k = c * rint(10, 40), q2 = (F1 + k) / c, V = rint(12, 30), P = V + c;
      return { kind: 'num', q: 'Velo Guard makes bicycle helmets. Fixed costs are ' + money(F1, '$') + ' a month, the price is ' + money(P, '$') + ' and variable costs are ' + money(V, '$') + ' per helmet. It leases a new moulding machine, which adds ' + money(k, '$') + ' a month to fixed costs.<br>Calculate the new break-even output per month.',
        answer: q2, unit: 'helmets', display: String(q2),
        why: 'New fixed costs = ' + money(F1, '$') + ' + ' + money(k, '$') + ' = ' + money(F1 + k, '$') + '. Contribution = ' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + '. Break-even = ' + money(F1 + k, '$') + ' ÷ ' + money(c, '$') + ' = ' + q2 + ' helmets.' };
    } },
    { skill: 'be-change', gen: function () {
      var V1 = rint(5, 12), up = pick([1, 2, 3]), V2 = V1 + up, c2 = rint(4, 10), P = V2 + c2, q = rint(20, 90) * 10 + rint(1, 9), r = rint(1, c2 - 1), F = c2 * (q - 1) + r;
      return { kind: 'num', q: 'Brightside Kites sells kites for ' + money(P, '$') + '. Fixed costs are ' + money(F, '$') + ' a month. Its fabric supplier raises prices, so the variable cost of a kite rises from ' + money(V1, '$') + ' to ' + money(V2, '$') + '.<br>Calculate the new break-even output per month as a whole number of kites.',
        answer: q, unit: 'kites', display: String(q),
        why: 'New contribution = ' + money(P, '$') + ' − ' + money(V2, '$') + ' = ' + money(c2, '$') + '. ' + money(F, '$') + ' ÷ ' + money(c2, '$') + ' = ' + fmt(F / c2, 2) + ', rounded up to ' + q + ' kites because part of a kite cannot be sold.' };
    } },
    { skill: 'be-units', gen: function () {
      var c, q, r, F, V, P, N, wp, opts;
      do { c = rint(30, 80); q = rint(15, 45); r = rint(1, c - 1); F = c * (q - 1) + r; V = rint(20, 60); P = V + c; N = q + pick([-4, -1, 3, 8]); wp = ceilDiv(F, P); } while (new Set([q, q - 1, wp]).size < 3);
      var ok = q <= N;
      opts = ['Break-even is ' + q + ' guests, so the retreat can break even with ' + N + ' places', 'Break-even is ' + q + ' guests, so the retreat cannot break even with ' + N + ' places', 'Break-even is ' + wp + ' guests, so the retreat can break even with ' + N + ' places', 'Break-even is ' + (q - 1) + ' guests, so the retreat can break even with ' + N + ' places'];
      return { kind: 'mcq', q: 'Lakeside Yoga plans a weekend retreat. Venue hire and the instructor\'s fee cost ' + money(F, '$') + ' in total, however many guests come. Each guest pays ' + money(P, '$') + ' and meals cost ' + money(V, '$') + ' per guest. The venue holds ' + N + ' guests.<br>Which statement is correct?',
        options: opts, answer: ok ? 0 : 1,
        why: 'Contribution per guest = ' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + '. ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + fmt(F / c, 2) + ', rounded UP to ' + q + ' guests. ' + (ok ? q + ' is not more than the ' + N + ' places, so break-even is possible.' : q + ' is more than the ' + N + ' places, so the retreat would make a loss even when full.') + ' Dividing by the price, or rounding down, gives the wrong figure.' };
    } },
    { skill: 'be-rearrange', gen: function () {
      var c = rint(6, 15), q = rint(20, 80) * 10, F = c * q, V = rint(8, 20), P = V + c, sold = q - rint(5, 30) * 5;
      return { kind: 'num', q: 'Meeple Games sells a board game for ' + money(P, '$') + '. Variable costs are ' + money(V, '$') + ' per game and fixed costs are ' + money(F, '$') + ' this month. Halfway through the month it has sold ' + sold + ' games.<br>Calculate how many <b>more</b> games it must sell this month to break even.',
        answer: q - sold, unit: 'games', display: String(q - sold),
        why: 'Break-even = ' + money(F, '$') + ' ÷ (' + money(P, '$') + ' − ' + money(V, '$') + ') = ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + q + ' games. More needed = ' + q + ' − ' + sold + ' = ' + (q - sold) + ' games.' };
    } },
    { skill: 'be-units', gen: function () {
      var c = rint(15, 40) * 10, q = rint(20, 80) * 100, F = c * q, V = rint(40, 90) * 10, P = V + c;
      return { kind: 'num', q: 'Voltway assembles electric bikes. Its annual fixed costs are ' + money(F, '$') + '. Each bike sells for ' + money(P, '$') + ' and the parts and assembly wages for one bike cost ' + money(V, '$') + '.<br>Calculate the break-even output per year.',
        answer: q, unit: 'bikes', display: String(q),
        why: 'Contribution per bike = ' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + '. Break-even = ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + fmt(q) + ' bikes per year.' };
    } },
    { skill: 'be-revenue', gen: function () {
      var c = rint(6, 14), q = rint(10, 60) * 10, F = c * q, V = rint(8, 18), P = V + c;
      return { kind: 'num', q: 'Indigo Threads sells batik scarves for ' + money(P, '$') + ' each. Variable costs are ' + money(V, '$') + ' a scarf and fixed costs are ' + money(F, '$') + ' a month.<br>Calculate the break-even <b>revenue</b> per month. Give your answer in $.',
        answer: q * P, unit: '$', display: String(q * P),
        why: 'Break-even output = ' + money(F, '$') + ' ÷ (' + money(P, '$') + ' − ' + money(V, '$') + ') = ' + q + ' scarves. Break-even revenue = ' + q + ' × ' + money(P, '$') + ' = ' + money(q * P, '$') + '.' };
    } },
    { skill: 'be-method', gen: function () {
      var c = rint(4, 9), q = rint(20, 70) * 10, F = c * q, V = rint(3, 9), P = V + c;
      var a = q, b = ceilDiv(F, P), d = ceilDiv(F, V), e = ceilDiv(F, P + V);
      var opts = [a, b, d, e];
      if (new Set(opts).size < 4) { V = V + 1; P = V + c; b = ceilDiv(F, P); d = ceilDiv(F, V); e = ceilDiv(F, P + V); opts = [a, b, d, e]; }
      if (new Set(opts).size < 4) opts = [a, b, e, a + 1];
      return { kind: 'mcq', q: 'Tidewater makes bamboo toothbrush packs. Fixed costs are ' + money(F, '$') + ' a month, each pack sells for ' + money(P, '$') + ' and variable costs are ' + money(V, '$') + ' a pack.<br>What is the break-even output per month?',
        options: opts.map(function (n) { return fmt(n) + ' packs'; }), answer: 0,
        why: 'Divide fixed costs by contribution, not by the price or the variable cost: ' + money(F, '$') + ' ÷ (' + money(P, '$') + ' − ' + money(V, '$') + ') = ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + fmt(q) + ' packs.' };
    } },
    { skill: 'be-roundup', gen: function () {
      var c = pick([3, 6, 7, 9]), q = rint(12, 60) * 10 + rint(1, 9), r = rint(1, c - 1), F = c * (q - 1) + r, V = rint(4, 10), P = V + c;
      var dec = fmt(F / c, 2);
      return { kind: 'mcq', q: 'Sleevecraft makes laptop sleeves. Fixed costs are ' + money(F, '$') + ' a month, the price is ' + money(P, '$') + ' and variable costs are ' + money(V, '$') + ' per sleeve.<br>Which is the correct break-even output?',
        options: [fmt(q) + ' sleeves', fmt(q - 1) + ' sleeves', dec + ' sleeves', money(q * P, '$') + ' of sleeves'], answer: 0,
        why: money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + dec + '. Break-even output is a whole number of units and must be rounded UP to ' + q + ', because ' + (q - 1) + ' sleeves would leave a small loss. The money figure is revenue, not output.' };
    } },
    { skill: 'be-change', gen: function () {
      var c = pick([8, 10, 12]), q = pick([300, 400, 600]), F = c * q, V = rint(10, 20), P = V + c;
      var a = pick([2, 4]), b = a === 2 ? 4 : 2, k = Math.round(F * pick([0.1, 0.15, 0.2]) / 10) * 10;
      var be1 = ceilDiv(F, c + a), be2 = ceilDiv(F, c + b), be3 = ceilDiv(F - k, c);
      var vals = [be1, be2, be3];
      var best = vals.indexOf(Math.min.apply(null, vals));
      if (new Set(vals).size < 3) { k = k + c * 5; be3 = ceilDiv(F - k, c); vals = [be1, be2, be3]; best = vals.indexOf(Math.min.apply(null, vals)); }
      var opts = ['Raise the price by ' + money(a, '$'), 'Cut the variable cost by ' + money(b, '$') + ' a unit', 'Cut monthly fixed costs by ' + money(k, '$'), 'Spend ' + money(k, '$') + ' more a month on advertising'];
      return { kind: 'mcq', q: 'Alba Bottles sells steel water bottles for ' + money(P, '$') + '. Variable costs are ' + money(V, '$') + ' per bottle and fixed costs are ' + money(F, '$') + ' a month, so break-even is ' + q + ' bottles.<br>Which single change would lower the break-even output the most?',
        options: opts, answer: best,
        why: 'Price +' + money(a, '$') + ': ' + money(F, '$') + ' ÷ ' + money(c + a, '$') + ' → ' + be1 + '. Variable cost −' + money(b, '$') + ': ' + money(F, '$') + ' ÷ ' + money(c + b, '$') + ' → ' + be2 + '. Fixed costs −' + money(k, '$') + ': ' + money(F - k, '$') + ' ÷ ' + money(c, '$') + ' → ' + be3 + '. Extra advertising raises fixed costs, so break-even rises.' };
    } },
    { skill: 'be-method', gen: function () {
      var c = rint(2, 5), q = rint(30, 90) * 10, F = c * q, V = rint(2, 4), P = V + c, wrong = ceilDiv(F, P);
      return { kind: 'mcq', q: 'Hilltop Preserves sells jars of mango jam for ' + money(P, '$') + '. Each jar has variable costs of ' + money(V, '$') + ' and fixed costs are ' + money(F, '$') + ' a month. A student wrote: <i>"Break-even = ' + money(F, '$') + ' ÷ ' + money(P, '$') + ' = ' + wrong + ' jars."</i><br>What is wrong with the working?',
        options: ['It divides by the price instead of the contribution of ' + money(c, '$'), 'It should multiply the fixed costs by the selling price instead of dividing', 'It should divide the price by the fixed costs', 'It should add the variable cost to the price first'], answer: 0,
        why: 'Each jar only adds its contribution (' + money(P, '$') + ' − ' + money(V, '$') + ' = ' + money(c, '$') + ') towards fixed costs. Correct break-even = ' + money(F, '$') + ' ÷ ' + money(c, '$') + ' = ' + q + ' jars.' };
    } },
    { skill: 'be-method', kind: 'mcq', q: 'Which calculation gives the contribution per unit?', options: ['Selling price − variable cost per unit', 'Selling price − total fixed costs of the business', 'Total revenue − total costs', 'Fixed costs ÷ selling price'], answer: 0,
      why: 'Contribution per unit is what one unit adds towards fixed costs: the selling price minus the variable cost of making that unit. Total revenue − total costs is profit.' },
    { skill: 'be-roundup', kind: 'mcq', q: 'A break-even calculation gives 412.3 units. Why should the business round the answer to 413 rather than 412?', options: ['Selling 412 units would still leave a small loss', '413 is the nearest whole number to 412.3', 'Selling 412 units would give a small profit, so 413 is safer', 'Fixed costs must be rounded up before dividing by contribution'], answer: 0,
      why: 'At 412 units the total contribution is just short of the fixed costs, so there is a small loss. Only at 413 units are fixed costs fully covered. A part unit cannot be sold.' },
    { skill: 'be-units', kind: 'mcq', q: 'A furniture workshop works out that its break-even output is 250 tables a month. What does this figure mean?', options: ['Total revenue equals total costs at 250 tables', 'The workshop makes $250 profit each month', 'The workshop can make at most 250 tables a month with its current staff', 'Each table adds $250 towards the fixed costs'], answer: 0,
      why: 'Break-even output is a number of units. At that output, total revenue exactly equals total costs. More than 250 tables gives a profit; fewer gives a loss.' },
    { skill: 'be-method', kind: 'multi', q: 'A business wants to calculate its break-even output. Which <b>three</b> pieces of information does it need?', options: ['Total fixed costs', 'Selling price per unit', 'Variable cost per unit', 'Profit made last year', 'Number of employees'], answers: [0, 1, 2],
      why: 'Break-even output = fixed costs ÷ (selling price − variable cost per unit). Last year\'s profit and the number of staff are not part of the formula.' }
  ] };

  /* =====================================================================
     BUS-S3-20 Break-even: meaning, charts and usefulness
     ===================================================================== */
  // A chart whose break-even output falls exactly on a gridline.
  function beSetup() {
    var s = pick([50, 100, 200, 500]), m = pick([2, 3]), qBE = s * m, maxQ = 5 * s;
    var c = pick([2, 4, 5, 10]), F = c * qBE, V = c * pick([0.5, 1, 1.5, 2]), P = V + c;
    var yStep = niceStep(P * maxQ / 5);
    return { s: s, qBE: qBE, maxQ: maxQ, c: c, F: F, V: V, P: P, yStep: yStep };
  }
  function shuffleLetters(letters) {
    var a = letters.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  B['BUS-S3-20'] = { title: 'Break-even: meaning, charts and usefulness', items: [
    { skill: 'chart-read', gen: function () {
      var o = beSetup(), L = shuffleLetters(['A', 'B', 'C']);
      var ask = pick(['tr', 'tc', 'fc']), names = { tr: 'total revenue', tc: 'total costs', fc: 'fixed costs' };
      var svg = beChart({ F: o.F, V: o.V, P: o.P, maxQ: o.maxQ, xStep: o.s, yStep: o.yStep, labels: { fc: L[0], tc: L[1], tr: L[2] }, aria: 'Break-even chart with three lines labelled A, B and C' });
      var key = { fc: L[0], tc: L[1], tr: L[2] };
      var reason = { tr: 'Total revenue starts at zero (no sales, no revenue) and rises with output.', tc: 'Total costs start at the fixed-cost level on the vertical axis and rise as variable costs are added.', fc: 'Fixed costs do not change with output, so their line is horizontal.' };
      return { kind: 'mcq', svg: svg, q: 'The chart shows a break-even chart for a small manufacturer. Which line shows <b>' + names[ask] + '</b>?',
        options: ['Line A', 'Line B', 'Line C'], answer: ['A', 'B', 'C'].indexOf(key[ask]),
        why: 'Line ' + key[ask] + ' shows ' + names[ask] + '. ' + reason[ask] };
    } },
    { skill: 'chart-read', gen: function () {
      var o = beSetup(), L = shuffleLetters(['W', 'X', 'Y', 'Z']);
      var pts = [
        { q: o.qBE, v: o.P * o.qBE, label: L[0], dx: -4, dy: -9 },
        { q: 0, v: o.F, label: L[1], dx: 6, dy: -6 },
        { q: o.F / o.P, v: o.F, label: L[2], dx: 4, dy: 14 },
        { q: o.maxQ, v: o.P * o.maxQ, label: L[3], dx: -14, dy: 2 }
      ];
      var svg = beChart({ F: o.F, V: o.V, P: o.P, maxQ: o.maxQ, xStep: o.s, yStep: o.yStep, points: pts, aria: 'Break-even chart with four points labelled W, X, Y and Z' });
      return { kind: 'mcq', svg: svg, q: 'On this break-even chart the flat line is fixed costs, the line starting at zero is total revenue and the other line is total costs. Which point shows the break-even point?',
        options: ['Point W', 'Point X', 'Point Y', 'Point Z'], answer: ['W', 'X', 'Y', 'Z'].indexOf(L[0]),
        why: 'Break-even is where total revenue crosses total costs (point ' + L[0] + '). Point ' + L[2] + ' is where revenue only meets fixed costs, so variable costs are not yet covered there.' };
    } },
    { skill: 'chart-read', gen: function () {
      var o = beSetup();
      var svg = beChart({ F: o.F, V: o.V, P: o.P, maxQ: o.maxQ, xStep: o.s, yStep: o.yStep, labels: { fc: 'FC', tc: 'TC', tr: 'TR' }, aria: 'Break-even chart with fixed cost, total cost and total revenue lines' });
      return { kind: 'num', svg: svg, q: 'The chart shows fixed costs (FC), total costs (TC) and total revenue (TR) for a business making garden chairs. Use the chart to find the break-even level of output.',
        answer: o.qBE, unit: 'units', display: String(o.qBE),
        why: 'The TR and TC lines cross directly above ' + fmt(o.qBE) + ' units on the output axis. At that output, revenue and total costs are both ' + money(o.P * o.qBE, '$') + ', so there is no profit and no loss.' };
    } },
    { skill: 'chart-read', gen: function () {
      var s = pick([100, 200]), maxQ = 5 * s, yStep = pick([2000, 5000, 10000]), P = yStep / s, k = pick([1, 2]);
      var f = k === 2 ? pick([0.4, 0.5]) : pick([0.4, 0.5, 0.6]), V = P * f, F = yStep * k;
      var svg = beChart({ F: F, V: V, P: P, maxQ: maxQ, xStep: s, yStep: yStep, labels: { fc: 'FC', tc: 'TC', tr: 'TR' }, aria: 'Break-even chart with fixed cost, total cost and total revenue lines' });
      return { kind: 'num', svg: svg, q: 'Use the break-even chart to find the business\'s fixed costs. Give your answer in $.',
        answer: F, unit: '$', display: String(F),
        why: 'Fixed costs are shown by the flat FC line, which is at ' + money(F, '$') + '. The TC line also starts at ' + money(F, '$') + ' when output is zero, because fixed costs are paid even if nothing is made.' };
    } },
    { skill: 'profit-loss', gen: function () {
      var o = beSetup(), above = Math.random() < 0.5, q0 = above ? o.qBE + o.s : o.qBE - o.s;
      var svg = beChart({ F: o.F, V: o.V, P: o.P, maxQ: o.maxQ, xStep: o.s, yStep: o.yStep, labels: { fc: 'FC', tc: 'TC', tr: 'TR' }, mark: q0, aria: 'Break-even chart with a dashed line marking one level of output' });
      return { kind: 'mcq', svg: svg, q: 'The dashed line marks the business\'s planned output of ' + fmt(q0) + ' units. What will the business make at this output?',
        options: ['A profit, because total revenue is above total costs', 'A loss, because total costs are above total revenue', 'Neither, because this output is the break-even point', 'A profit, because revenue is above the fixed costs'], answer: above ? 0 : 1,
        why: 'Break-even on the chart is ' + fmt(o.qBE) + ' units. At ' + fmt(q0) + ' units the TR line is ' + (above ? 'above' : 'below') + ' the TC line, so the business makes a ' + (above ? 'profit' : 'loss') + '. Comparing revenue with fixed costs alone ignores variable costs.' };
    } },
    { skill: 'profit-loss', gen: function () {
      var o = beSetup();
      var svg = beChart({ F: o.F, V: o.V, P: o.P, maxQ: o.maxQ, xStep: o.s, yStep: o.yStep, labels: { fc: 'FC', tc: 'TC', tr: 'TR' }, aria: 'Break-even chart with fixed cost, total cost and total revenue lines' });
      return { kind: 'mcq', svg: svg, q: 'Using the chart, over which range of output does the business make a <b>loss</b>?',
        options: ['From 0 up to ' + fmt(o.qBE) + ' units', 'From ' + fmt(o.qBE) + ' up to ' + fmt(o.maxQ) + ' units', 'At every output, because fixed costs are always paid', 'Only at an output of exactly ' + fmt(o.qBE) + ' units'], answer: 0,
        why: 'Below the break-even output of ' + fmt(o.qBE) + ' units the TC line is above the TR line, so costs exceed revenue. Above ' + fmt(o.qBE) + ' units the gap is a profit.' };
    } },
    { skill: 'meaning', kind: 'mcq', q: 'Which of the following is the best definition of <b>break-even</b>?', options: ['The level of output at which total revenue equals total costs', 'The level of output at which fixed costs equal variable costs', 'The selling price that gives a business its highest profit', 'The level of output at which revenue covers the fixed costs'], answer: 0,
      why: 'At break-even, total revenue = total costs (fixed + variable), so the business makes neither a profit nor a loss.' },
    { skill: 'meaning', kind: 'mcq', q: 'A student marks the break-even point on a chart where the total revenue line meets the <i>fixed cost</i> line. Why is this wrong?', options: ['At that output revenue has not yet covered the variable costs', 'Break-even should be where fixed costs equal variable costs', 'Break-even should be where the total cost line starts on the vertical axis', 'Total revenue should be compared with variable costs only'], answer: 0,
      why: 'To break even, revenue must cover ALL costs. The correct point is where total revenue crosses total costs (fixed + variable), which is at a higher output.' },
    { skill: 'meaning', kind: 'mcq', q: 'On a break-even chart, why does the total cost line start part of the way up the vertical axis instead of at zero?', options: ['Fixed costs must be paid even when output is zero', 'Variable costs are at their highest level when output is zero', 'Revenue is needed before any costs can be paid', 'The business makes a profit on its first unit'], answer: 0,
      why: 'At zero output there are no variable costs, but costs such as rent and salaries still have to be paid, so total costs equal fixed costs at the start.' },
    { skill: 'meaning', kind: 'mcq', q: 'Why is the fixed cost line horizontal on a break-even chart?', options: ['Fixed costs stay the same whatever the level of output', 'Fixed costs fall as the business sells more units', 'Fixed costs are only paid once output passes break-even', 'Fixed costs rise by the same amount for each unit made'], answer: 0,
      why: 'Fixed costs such as rent do not change with output in the short run, so the line is flat. Costs that rise with each unit are variable costs.' },
    { skill: 'changes', kind: 'mcq', q: 'Seaview Bakery raises the price of its loaves. What happens on its break-even chart?', options: ['The total revenue line becomes steeper and break-even output falls', 'The total cost line becomes steeper and break-even output rises', 'The total revenue line becomes less steep and break-even output rises', 'The fixed cost line moves up and break-even output rises'], answer: 0,
      why: 'A higher price means more revenue per loaf, so the revenue line rises more steeply and crosses total costs sooner. Each loaf adds more contribution, so fewer are needed to break even.' },
    { skill: 'changes', kind: 'mcq', q: 'The landlord of a printing firm increases its monthly rent. What happens to the firm\'s break-even chart?', options: ['The fixed cost and total cost lines both move up, so break-even output rises', 'Only the total revenue line moves down, because rent reduces revenue, so break-even output rises', 'The total cost line becomes less steep, so break-even output falls', 'The fixed cost line moves up but break-even output stays the same'], answer: 0,
      why: 'Rent is a fixed cost. Higher fixed costs lift the fixed cost line and the whole total cost line, so total revenue only catches up at a higher output.' },
    { skill: 'changes', kind: 'mcq', q: 'A furniture maker finds a cheaper supplier of timber, its main raw material. What is the effect on its break-even point?', options: ['The total cost line becomes less steep, so break-even output falls', 'The fixed cost line moves down, so break-even output falls', 'The total revenue line becomes steeper, so break-even output falls', 'The total cost line becomes steeper, so break-even output rises'], answer: 0,
      why: 'Timber is a variable cost. A lower variable cost per unit makes total costs rise more slowly, so the revenue line crosses it at a lower output.' },
    { skill: 'changes', kind: 'multi', q: 'Which <b>three</b> of these changes would <b>lower</b> a business\'s break-even output?', options: ['Raising the selling price', 'Moving to cheaper premises', 'Buying cheaper packaging for each unit', 'Giving salaried managers a pay rise', 'Cutting the selling price to win customers', 'Paying more for each unit\'s raw materials'], answers: [0, 1, 2],
      why: 'A higher price or a lower variable cost increases contribution per unit, and cheaper premises cut fixed costs: all three lower break-even. A salary rise adds to fixed costs, and a lower price or dearer materials cut contribution, so those raise it.' },
    { skill: 'changes', kind: 'mcq', q: 'FitZone gym cuts its monthly membership fee to compete with a new rival. Its costs do not change. What does this mean for FitZone?', options: ['It needs more members than before to break even', 'It needs fewer members than before to break even', 'Its break-even point stays the same because costs are unchanged', 'It will make a loss whatever the number of members'], answer: 0,
      why: 'A lower fee cuts the contribution from each member, so more members are needed to cover the same fixed costs. Break-even depends on price as well as costs.' },
    { skill: 'uses', kind: 'mcq', q: 'Ravi wants a bank loan to open a phone-repair kiosk. How could a break-even chart help him?', options: ['It shows the bank how many repairs are needed before the kiosk makes a profit', 'It shows the bank that the kiosk will be able to repay the loan', 'It shows the bank how much cash the kiosk will have each month', 'It shows the bank how many repairs customers will want each month'], answer: 0,
      why: 'The chart shows the sales needed to cover costs, so the bank can judge whether that target looks achievable. It cannot prove repayment or predict demand, and it does not show cash flow.' },
    { skill: 'uses', kind: 'mcq', q: 'The owner of a taco food truck asks: "What if I raise prices by $1 but sell 10% fewer tacos?" Why is break-even analysis useful here?', options: ['She can redraw the chart to see how break-even and profit change before deciding', 'It tells her how many customers will stop buying tacos after the price rise', 'It means she no longer needs to estimate how many tacos she will sell', 'It shows her how rival food trucks will change their prices'], answer: 0,
      why: 'Break-even analysis lets managers test "what if" changes to price or costs and see the effect on the break-even point and profit before acting. It cannot predict customer or rival behaviour.' },
    { skill: 'uses', kind: 'mcq', q: 'A toy maker\'s break-even output is 3,000 units a month. Which is the most developed explanation of how this helps the business?', options: ['Managers can set a sales target above 3,000, so staff know the minimum to aim for, which helps the business avoid a loss', 'Managers know the break-even output is 3,000 units, which is the point where revenue equals total costs', 'Break-even is useful because it shows break-even and helps the business plan its sales', 'The business will make a profit of 3,000 because it has calculated its break-even point'], answer: 0,
      why: 'A developed answer states a use (setting a sales target) and links it through steps to an effect (staff know the minimum, so losses are avoided). Repeating the definition is not an explanation.' },
    { skill: 'limits', kind: 'mcq', q: 'Daily Crust bakes fresh bread that cannot be sold the next day. Which limitation of break-even analysis matters most for this business?', options: ['It assumes all output is sold, but unsold loaves are wasted, so profit may be lower than the chart shows', 'It assumes fixed costs change every day, but the bakery\'s rent is the same each month', 'It ignores fixed costs such as the rent of the bakery', 'It assumes each loaf is sold at a different price'], answer: 0,
      why: 'The chart assumes everything produced is sold. Bread that is not sold by the end of the day earns no revenue but still has costs, so real profit can be below the chart\'s figure.' },
    { skill: 'limits', kind: 'mcq', q: 'A drinks company gets bulk discounts on bottles when it buys in large quantities. Why does this make its break-even chart less accurate?', options: ['Variable cost per unit falls at high output, so the total cost line is not really straight', 'Bulk buying raises the fixed costs every month, which a break-even chart is unable to show', 'The total revenue line must start above zero when bulk discounts are used', 'Bulk discounts raise the selling price, so the revenue line becomes steeper'], answer: 0,
      why: 'Break-even charts draw costs and revenue as straight lines. With bulk discounts the variable cost per bottle falls as output rises, so the true cost line curves and the real break-even point differs.' },
    { skill: 'limits', kind: 'mcq', q: 'Amara is about to open a new nail salon and has drawn a break-even chart using her estimates of prices and costs. What is the main limitation of her chart?', options: ['Her figures are only predictions, so the real break-even point may be different', 'A break-even chart cannot include costs for a business that has not opened yet', 'Her chart cannot show the profit she would make above break-even', 'Break-even charts cannot be used by service businesses such as salons'], answer: 0,
      why: 'A new business has no past data, so every line on the chart is based on estimates. If costs rise or customers pay less than expected, the real break-even output will be different.' },
    { skill: 'limits', kind: 'multi', q: 'A student starts an answer: <i>"One limitation of a break-even chart is that it assumes every unit produced is sold."</i> Which <b>two</b> statements best develop this point into a chain of reasoning?', options: ['In reality some stock may stay unsold or be wasted', 'So actual revenue may be lower than the chart shows and the business could make a loss when it expected a profit', 'Break-even is where total revenue equals total costs', 'The fixed cost line is drawn as a horizontal line', 'Break-even charts are also useful for getting a bank loan'], answers: [0, 1],
      why: 'A developed limitation shows what really happens (stock unsold) and the consequence (lower revenue, a possible loss and a poor decision). A definition, a chart feature or a use does not develop the limitation.' },
    { skill: 'limits', kind: 'mcq', q: 'A manager says: <i>"Our break-even chart shows we pass break-even at 800 units and we expect to sell 1,200, so we are certain to make a profit next year."</i> What is the main flaw in this judgement?', options: ['The chart uses forecast figures, so sales or costs may differ and a profit is not certain', 'The chart shows a loss at 1,200 units because it is above break-even', 'A break-even chart cannot show what happens above the break-even point', 'Profit can only be measured from a cash-flow forecast, not a chart'], answer: 0,
      why: 'Selling above break-even gives a profit only if the forecasts are right. If sales are lower or costs rise, the business may not reach break-even, so the conclusion is too certain.' },
    { skill: 'limits', kind: 'mcq', q: 'Which of these is <b>not</b> an assumption made when drawing a simple break-even chart?', options: ['Customers will pay different prices depending on how many they buy', 'Every unit produced is sold', 'Total costs rise in a straight line as output rises', 'Fixed costs stay the same at every level of output'], answer: 0,
      why: 'A simple break-even chart assumes one selling price for every unit, so revenue is a straight line. It also assumes all output is sold, straight-line costs and constant fixed costs.' }
  ] };

  /* =====================================================================
     BUS-CALC-14 Calculate the gross profit margin
     ===================================================================== */
  function gpm(gp, rev) { return rd(gp / rev * 100, 2); }
  function pctNum(ans, why, q, dp) {
    dp = dp == null ? 2 : dp;
    return { kind: 'num', q: q, answer: ans, unit: '%', tol: dp === 2 ? 0.005 : 0.05, display: ans.toFixed(dp), why: why };
  }

  B['BUS-CALC-14'] = { title: 'Calculate the gross profit margin', items: [
    { skill: 'gp-given', gen: function () {
      var rev = rint(400, 4000) * 100, gp = Math.round(rev * (rint(20, 60) / 100 + rint(1, 9) / 1000) / 10) * 10, a = gpm(gp, rev);
      return pctNum(a, 'Gross profit margin = gross profit ÷ revenue × 100 = ' + money(gp, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + a.toFixed(2) + '%.',
        'Inkwell Online sells stationery. Last year its revenue was ' + money(rev, '$') + ' and its gross profit was ' + money(gp, '$') + '.<br>Calculate the gross profit margin. Give your answer to 2 decimal places.');
    } },
    { skill: 'gp-first', gen: function () {
      var rev = rint(150, 900) * 1000 + rint(1, 9) * 100, cos = Math.round(rev * rint(45, 75) / 100 / 100) * 100, gp = rev - cos, a = gpm(gp, rev);
      return pctNum(a, 'Gross profit = ' + money(rev, '$') + ' − ' + money(cos, '$') + ' = ' + money(gp, '$') + '. Margin = ' + money(gp, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + a.toFixed(2) + '%.',
        'Oakline Furniture had revenue of ' + money(rev, '$') + ' and cost of sales of ' + money(cos, '$') + ' last year.<br>Calculate its gross profit margin, giving your answer to 2 decimal places.');
    } },
    { skill: 'table', gen: function () {
      var rev = rint(200, 800) * 1000, cos = Math.round(rev * rint(40, 70) / 100 / 500) * 500, gp = rev - cos, exp = Math.round(gp * rint(40, 75) / 100 / 500) * 500, op = gp - exp, a = gpm(gp, rev);
      var t = table(['Statement of comprehensive income (extract)', '$'], [['Revenue', fmt(rev)], ['Cost of sales', fmt(cos)], ['Gross profit', fmt(gp)], ['Expenses', fmt(exp)], ['Operating profit', fmt(op)]]);
      return pctNum(a, 'Use gross profit, not operating profit: ' + fmt(gp) + ' ÷ ' + fmt(rev) + ' × 100 = ' + a.toFixed(2) + '%.',
        'Figure 1 shows an extract from the income statement of Peak Gear, an outdoor clothing retailer.<br>' + t + 'Work out Peak Gear\'s gross profit margin, to 2 decimal places.');
    } },
    { skill: 'table', gen: function () {
      var r1 = rint(300, 600) * 1000, r2 = r1 + rint(-50, 120) * 1000, c1 = Math.round(r1 * rint(50, 65) / 100 / 1000) * 1000, c2 = Math.round(r2 * rint(50, 68) / 100 / 1000) * 1000;
      var yr = pick([2024, 2025]), rev = yr === 2024 ? r1 : r2, cos = yr === 2024 ? c1 : c2, a = gpm(rev - cos, rev);
      var t = table(['', '2024 ($)', '2025 ($)'], [['Revenue', fmt(r1), fmt(r2)], ['Cost of sales', fmt(c1), fmt(c2)], ['Gross profit', fmt(r1 - c1), fmt(r2 - c2)]]);
      return pctNum(a, 'Use only the ' + yr + ' column: ' + fmt(rev - cos) + ' ÷ ' + fmt(rev) + ' × 100 = ' + a.toFixed(2) + '%.',
        'The table shows figures for Nimbus Cycles.<br>' + t + 'Calculate the gross profit margin for <b>' + yr + '</b> to 2 decimal places.');
    } },
    { skill: 'gp-first', gen: function () {
      var rev = rd(rint(200, 900) / 10, 1), cos = rd(rev * rint(40, 70) / 100, 1), gp = rd(rev - cos, 1), a = gpm(gp, rev);
      return pctNum(a, 'Gross profit = $' + rev.toFixed(1) + 'm − $' + cos.toFixed(1) + 'm = $' + gp.toFixed(1) + 'm. Margin = ' + gp.toFixed(1) + ' ÷ ' + rev.toFixed(1) + ' × 100 = ' + a.toFixed(2) + '%. Both figures are in millions, so the units cancel.',
        'Harbour Telecom reported revenue of $' + rev.toFixed(1) + ' million and cost of sales of $' + cos.toFixed(1) + ' million.<br>Calculate the gross profit margin, giving your answer to 2 decimal places.');
    } },
    { skill: 'table', gen: function () {
      var rev = rint(1200, 9000), cos = Math.round(rev * rint(35, 65) / 100), gp = rev - cos, exp = Math.round(gp * rint(50, 80) / 100), a = gpm(gp, rev);
      var t = table(['', '$000'], [['Sales revenue', fmt(rev)], ['Cost of sales', fmt(cos)], ['Expenses', fmt(exp)]]);
      return pctNum(a, 'Gross profit = ' + fmt(rev) + ' − ' + fmt(cos) + ' = ' + fmt(gp) + ' ($000). Margin = ' + fmt(gp) + ' ÷ ' + fmt(rev) + ' × 100 = ' + a.toFixed(2) + '%. Expenses are not used for gross profit.',
        'The table shows figures for Quarry Stone Ltd, in thousands of dollars.<br>' + t + 'Calculate the gross profit margin, giving your answer to 2 decimal places.');
    } },
    { skill: 'gp-first', gen: function () {
      var n = rint(12, 60) * 100, p = rint(12, 40), c = rd(p * rint(35, 70) / 100, 2), rev = n * p, cos = rd(n * c, 2), gp = rd(rev - cos, 2), a = gpm(gp, rev);
      return pctNum(a, 'Revenue = ' + fmt(n) + ' × ' + money(p, '$') + ' = ' + money(rev, '$') + '. Cost of sales = ' + fmt(n) + ' × ' + m2(c, '$') + ' = ' + m2(cos, '$') + '. Gross profit = ' + m2(gp, '$') + '. Margin = ' + m2(gp, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + a.toFixed(2) + '%.',
        'Lotus Lamps sold ' + fmt(n) + ' desk lamps in a year at ' + money(p, '$') + ' each. Each lamp cost Lotus Lamps ' + m2(c, '$') + ' to buy from its supplier.<br>Calculate the gross profit margin, giving your answer to 2 decimal places.');
    } },
    { skill: 'gp-first', gen: function () {
      var rev = rint(150, 400) * 1000, ing = Math.round(rev * rint(25, 40) / 100 / 100) * 100, pack = Math.round(rev * rint(3, 8) / 100 / 100) * 100, rent = rint(20, 60) * 1000, cos = ing + pack, gp = rev - cos, a = gpm(gp, rev);
      return pctNum(a, 'Cost of sales = ingredients + packaging = ' + money(ing, '$') + ' + ' + money(pack, '$') + ' = ' + money(cos, '$') + '. Gross profit = ' + money(rev, '$') + ' − ' + money(cos, '$') + ' = ' + money(gp, '$') + '. Margin = ' + money(gp, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + a.toFixed(2) + '%. Rent is an expense, so it is not part of cost of sales.',
        'Harbourside Café had revenue of ' + money(rev, '$') + ' last year. The food and drink ingredients for the items it sold cost ' + money(ing, '$') + ', takeaway packaging for those items cost ' + money(pack, '$') + ' and rent was ' + money(rent, '$') + '.<br>Calculate the gross profit margin, giving your answer to 2 decimal places.');
    } },
    { skill: 'method', gen: function () {
      var rev, cos, gp, a, w;
      do { rev = rint(120, 600) * 1000; cos = Math.round(rev * rint(45, 70) / 100 / 1000) * 1000; gp = rev - cos; a = gpm(gp, rev); w = gpm(gp, cos); } while (Math.abs(a - w) < 5);
      return pctNum(a, 'The student divided by cost of sales, which gives a markup, not a margin. Gross profit margin = gross profit ÷ revenue × 100 = ' + fmt(gp) + ' ÷ ' + fmt(rev) + ' × 100 = ' + a.toFixed(2) + '%.',
        'Corvid Cameras had revenue of ' + money(rev, '$') + ' and cost of sales of ' + money(cos, '$') + '. A student wrote: <i>"Gross profit margin = ' + fmt(gp) + ' ÷ ' + fmt(cos) + ' × 100 = ' + w.toFixed(2) + '%."</i><br>Calculate the correct gross profit margin, to 2 decimal places.');
    } },
    { skill: 'method', gen: function () {
      var rev, cos, gp, a, w1, w2, w3;
      do { rev = rint(100, 600) * 1000; cos = Math.round(rev * rint(45, 70) / 100 / 1000) * 1000; gp = rev - cos;
        a = gpm(gp, rev); w1 = gpm(gp, cos); w2 = rd(rev / gp * 100, 2); w3 = gpm(cos, rev); } while (new Set([a, w1, w2, w3]).size < 4);
      return { kind: 'mcq', q: 'Tern Travel Goods had revenue of ' + money(rev, '$') + ' and cost of sales of ' + money(cos, '$') + '. What is its gross profit margin?',
        options: [pct2(a), pct2(w1), pct2(w2), pct2(w3)], answer: 0,
        why: 'Gross profit = ' + money(rev, '$') + ' − ' + money(cos, '$') + ' = ' + money(gp, '$') + '. Margin = ' + money(gp, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + pct2(a) + '. Dividing by cost of sales, turning the fraction upside down, or using cost of sales as the top line gives the wrong options.' };
    } },
    { skill: 'method', gen: function () {
      var ra, rb, ga, gb, ma, mb;
      do { ra = rint(80, 300) * 1000; rb = rint(80, 300) * 1000; ga = Math.round(ra * rint(25, 60) / 100 / 100) * 100; gb = Math.round(rb * rint(25, 60) / 100 / 100) * 100; ma = gpm(ga, ra); mb = gpm(gb, rb); } while (Math.abs(ma - mb) < 2 || (ga > gb) === (ma > mb));
      var aHigh = ma > mb;
      var t = table(['', 'Shop A ($)', 'Shop B ($)'], [['Revenue', fmt(ra), fmt(rb)], ['Gross profit', fmt(ga), fmt(gb)]]);
      return { kind: 'mcq', q: 'A florist chain owns two shops.<br>' + t + 'Which statement is correct?',
        options: ['Shop A has the higher gross profit margin, at ' + pct2(ma), 'Shop B has the higher gross profit margin, at ' + pct2(mb), 'Shop ' + (ga > gb ? 'A' : 'B') + ' has the higher margin because its gross profit is larger', 'Both shops have the same margin because they sell the same products'], answer: aHigh ? 0 : 1,
        why: 'Shop A: ' + fmt(ga) + ' ÷ ' + fmt(ra) + ' × 100 = ' + pct2(ma) + '. Shop B: ' + fmt(gb) + ' ÷ ' + fmt(rb) + ' × 100 = ' + pct2(mb) + '. The larger gross profit does not mean the larger margin; you must divide by revenue.' };
    } },
    { skill: 'method', kind: 'mcq', q: 'Which formula gives the gross profit margin?', options: ['Gross profit ÷ revenue × 100', 'Gross profit ÷ cost of sales × 100', 'Revenue ÷ gross profit × 100', 'Operating profit ÷ revenue × 100'], answer: 0,
      why: 'Gross profit margin compares gross profit with sales revenue. Dividing by cost of sales gives the markup, and using operating profit gives the operating profit margin.' },
    { skill: 'method', kind: 'mcq', q: 'A shoe-polish maker has a gross profit margin of 40%. What does this tell you?', options: ['For every $1 of sales, 40 cents is left after paying the cost of sales', 'For every $1 of sales, 40 cents is left after paying all expenses', 'Its cost of sales is 40% of its revenue', 'Its revenue grew by 40% compared with last year'], answer: 0,
      why: 'Gross profit is revenue minus cost of sales, so a 40% margin means 40 cents of each $1 of sales remains after the direct cost of the goods. Other expenses have not yet been taken off. Cost of sales would be 60%.' },
    { skill: 'gp-first', kind: 'mcq', q: 'Which of these would be included in <b>cost of sales</b> for a shop that sells televisions?', options: ['The price the shop paid its supplier for the televisions it sold', 'The rent of the shop', 'The salaries paid each month to the shop manager and the sales assistants', 'Interest on the shop\'s bank loan'], answer: 0,
      why: 'Cost of sales is the direct cost of the goods sold, here the cost of buying the televisions. Rent, salaries and interest are expenses, which are taken off later to find operating profit.' },
    { skill: 'gp-given', gen: function () {
      var rev = rint(60, 500) * 1000 + rint(1, 9) * 10, gp = Math.round(rev * rint(18, 55) / 100 / 10) * 10 + rint(1, 9), a = rd(gp / rev * 100, 1);
      return pctNum(a, 'Margin = ' + money(gp, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + fmt(gp / rev * 100, 3) + '…%, which is ' + a.toFixed(1) + '% to 1 decimal place.',
        'Zephyr Fans made a gross profit of ' + money(gp, '$') + ' on revenue of ' + money(rev, '$') + '.<br>Calculate the gross profit margin. Give your answer to <b>1 decimal place</b>.', 1);
    } },
    { skill: 'table', gen: function () {
      var r1 = rint(80, 250) * 1000, r2 = rint(60, 200) * 1000, c1 = Math.round(r1 * rint(45, 65) / 100 / 100) * 100, c2 = Math.round(r2 * rint(45, 65) / 100 / 100) * 100;
      var rev = r1 + r2, cos = c1 + c2, a = gpm(rev - cos, rev);
      var t = table(['', 'City branch ($)', 'Airport branch ($)'], [['Revenue', fmt(r1), fmt(r2)], ['Cost of sales', fmt(c1), fmt(c2)]]);
      return pctNum(a, 'Total revenue = ' + fmt(rev) + '; total cost of sales = ' + fmt(cos) + '; gross profit = ' + fmt(rev - cos) + '. Margin = ' + fmt(rev - cos) + ' ÷ ' + fmt(rev) + ' × 100 = ' + a.toFixed(2) + '%.',
        'Mosaic Books has two branches.<br>' + t + 'Calculate the gross profit margin for the business <b>as a whole</b>, to 2 decimal places.');
    } },
    { skill: 'method', gen: function () {
      var rev, gp, exact, a;
      do { rev = rint(50, 400) * 1000 + rint(1, 99) * 10; gp = Math.round(rev * rint(20, 60) / 100) + rint(1, 9); exact = gp / rev * 100; a = rd(exact, 2); } while (Math.floor(exact * 100) / 100 === a || rd(exact, 1).toFixed(2) === a.toFixed(2));
      var trunc = Math.floor(exact * 100) / 100;
      return { kind: 'mcq', q: 'Coastline Kayaks had gross profit of ' + money(gp, '$') + ' and revenue of ' + money(rev, '$') + '. Which is its gross profit margin to 2 decimal places?',
        options: [a.toFixed(2) + '%', trunc.toFixed(2) + '%', rd(exact, 1).toFixed(1) + '%', Math.round(exact) + '%'], answer: 0,
        why: money(gp, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + fmt(exact, 4) + '…%. To 2 decimal places look at the third decimal place, which gives ' + a.toFixed(2) + '%. The other options are cut off or rounded to the wrong number of places.' };
    } },
    { skill: 'table', gen: function () {
      var rev = rint(300, 900) * 1000, cos = Math.round(rev * rint(40, 70) / 100 / 1000) * 1000, exp = Math.round((rev - cos) * rint(40, 80) / 100 / 1000) * 1000, a = gpm(rev - cos, rev);
      return pctNum(a, 'Gross profit = revenue − cost of sales = ' + money(rev, '$') + ' − ' + money(cos, '$') + ' = ' + money(rev - cos, '$') + '. Margin = ' + money(rev - cos, '$') + ' ÷ ' + money(rev, '$') + ' × 100 = ' + a.toFixed(2) + '%. The expenses of ' + money(exp, '$') + ' are only needed for operating profit.',
        'Bluefin Seafoods had sales revenue of ' + money(rev, '$') + ', cost of sales of ' + money(cos, '$') + ' and expenses of ' + money(exp, '$') + '.<br>Calculate the gross profit margin, giving your answer to 2 decimal places.');
    } },
    { skill: 'gp-first', gen: function () {
      var p = pick([4.8, 5.2, 6.4, 7.5, 8.9, 9.6]), c = rd(p * rint(35, 65) / 100, 2), a = gpm(rd(p - c, 2), p);
      return pctNum(a, 'Gross profit per bar = ' + m2(p, '€') + ' − ' + m2(c, '€') + ' = ' + m2(p - c, '€') + '. Margin = ' + m2(p - c, '€') + ' ÷ ' + m2(p, '€') + ' × 100 = ' + a.toFixed(2) + '%. The margin is the same per unit as for total sales because every bar has the same price and cost.',
        'Cacao Collective sells chocolate bars for ' + m2(p, '€') + ' each. Each bar costs it ' + m2(c, '€') + ' to buy from its maker.<br>Calculate the gross profit margin on a bar, to 2 decimal places.');
    } },
    { skill: 'table', gen: function () {
      var r = [], g = [], i;
      for (i = 0; i < 4; i++) { r.push(rint(40, 120) * 1000); g.push(Math.round(r[i] * rint(25, 45) / 100 / 100) * 100); }
      var rt = r.reduce(function (a, b) { return a + b; }), gt = g.reduce(function (a, b) { return a + b; }), a = gpm(gt, rt);
      var t = table(['Quarter', 'Revenue ($)', 'Gross profit ($)'], [['Q1', fmt(r[0]), fmt(g[0])], ['Q2', fmt(r[1]), fmt(g[1])], ['Q3', fmt(r[2]), fmt(g[2])], ['Q4', fmt(r[3]), fmt(g[3])]]);
      return pctNum(a, 'Add the four quarters: revenue = ' + fmt(rt) + ', gross profit = ' + fmt(gt) + '. Margin for the year = ' + fmt(gt) + ' ÷ ' + fmt(rt) + ' × 100 = ' + a.toFixed(2) + '%.',
        'The table shows quarterly figures for Ridgeback Pet Supplies.<br>' + t + 'Calculate the gross profit margin for the <b>whole year</b>, to 2 decimal places.');
    } },
    { skill: 'method', kind: 'mcq', q: 'Which pair of figures from an income statement do you put into the gross profit margin formula?', options: ['Gross profit and revenue', 'Gross profit and cost of sales', 'Operating profit and revenue', 'Revenue and expenses'], answer: 0,
      why: 'Gross profit margin = gross profit ÷ revenue × 100. Operating profit belongs to the operating profit margin, and cost of sales is not the denominator.' },
    { skill: 'gp-given', kind: 'mcq', q: 'A retailer\'s revenue rose last year but its gross profit margin fell. Which is the most likely reason?', options: ['Its cost of sales rose by a bigger percentage than its revenue', 'Its rent and salaries rose by a much bigger percentage than its revenue', 'It sold more units at the same price and cost per unit', 'It paid more interest on a bank loan'], answer: 0,
      why: 'Gross profit margin depends only on revenue and cost of sales. If cost of sales grows faster than revenue, gross profit becomes a smaller share of sales. Rent, salaries and interest affect operating profit, not gross profit.' }
  ] };

  /* =====================================================================
     BUS-CALC-13 Markup: percentage, selling price or cost
     ===================================================================== */
  function mk(p, c) { return rd((p - c) / c * 100, 2); }
  B['BUS-CALC-13'] = { title: 'Markup: percentage, selling price or cost', items: [
    { skill: 'markup-pct', gen: function () {
      var c = rint(18, 60), p = c + rint(5, 40) + pick([0, 0.5, 0.99]), a = mk(p, c);
      return pctNum(a, 'Profit per speaker = ' + m2(p, '$') + ' − ' + m2(c, '$') + ' = ' + m2(p - c, '$') + '. Markup = ' + m2(p - c, '$') + ' ÷ ' + m2(c, '$') + ' × 100 = ' + a.toFixed(2) + '%.',
        'SoundBay buys portable speakers for ' + m2(c, '$') + ' each and sells them for ' + m2(p, '$') + '.<br>Calculate the markup on a speaker, to 2 decimal places.');
    } },
    { skill: 'markup-pct', gen: function () {
      var c = pick([1.2, 1.4, 1.6, 1.8, 2.1]), p = pick([3.95, 4.5, 4.75, 5.25, 5.5]), a = mk(p, c);
      return pctNum(a, 'Profit per bar = ' + m2(p, '$') + ' − ' + m2(c, '$') + ' = ' + m2(p - c, '$') + '. Markup = ' + m2(p - c, '$') + ' ÷ ' + m2(c, '$') + ' × 100 = ' + a.toFixed(2) + '%. A markup can be over 100% when the price is more than double the cost.',
        'It costs Lather &amp; Leaf ' + m2(c, '$') + ' to make each bar of hand-made soap, and it sells the bars for ' + m2(p, '$') + ' each.<br>Calculate the markup, to 2 decimal places.');
    } },
    { skill: 'markup-pct', gen: function () {
      var c = rint(6, 30), pr = rd(c * rint(15, 90) / 100 + pick([0, 0.25, 0.5]), 2), a = rd(pr / c * 100, 2);
      return pctNum(a, 'Markup = profit per unit ÷ cost × 100 = ' + m2(pr, '$') + ' ÷ ' + money(c, '$') + ' × 100 = ' + a.toFixed(2) + '%. The profit per unit is already given, so there is nothing to subtract.',
        'A market trader buys umbrellas for ' + money(c, '$') + ' each and makes a profit of ' + m2(pr, '$') + ' on every umbrella she sells.<br>Calculate her markup on an umbrella, to 2 decimal places.');
    } },
    { skill: 'markup-pct', gen: function () {
      var mat = rint(20, 60), lab = rint(15, 45), c = mat + lab, p = c + rint(20, 70) + pick([0, 5]), a = mk(p, c);
      return pctNum(a, 'Cost per stool = ' + money(mat, '$') + ' + ' + money(lab, '$') + ' = ' + money(c, '$') + '. Markup = (' + money(p, '$') + ' − ' + money(c, '$') + ') ÷ ' + money(c, '$') + ' × 100 = ' + a.toFixed(2) + '%.',
        'Grainwood makes bar stools. Each stool uses ' + money(mat, '$') + ' of materials and ' + money(lab, '$') + ' of labour. It sells each stool for ' + money(p, '$') + '.<br>Calculate the markup on a stool, to 2 decimal places.');
    } },
    { skill: 'markup-pct', gen: function () {
      var n = pick([24, 36, 40, 48, 60]), unit = rd(rint(30, 120) / 4, 2), tot = rd(n * unit, 2), p = rd(unit + rint(3, 15) + pick([0, 0.5]), 2), a = mk(p, unit);
      return pctNum(a, 'Cost per board = ' + m2(tot, '$') + ' ÷ ' + n + ' = ' + m2(unit, '$') + '. Markup = (' + m2(p, '$') + ' − ' + m2(unit, '$') + ') ÷ ' + m2(unit, '$') + ' × 100 = ' + a.toFixed(2) + '%.',
        'A surf shop buys a batch of ' + n + ' bodyboards for a total of ' + m2(tot, '$') + ' and sells each board for ' + m2(p, '$') + '.<br>Calculate the markup on a bodyboard, to 2 decimal places.');
    } },
    { skill: 'price', gen: function () {
      var c = rd(rint(30, 160) / 2, 2), m = pick([15, 18, 22, 35, 45, 65]), p = rd(c * (1 + m / 100), 2);
      return { kind: 'num', q: 'Sunspot buys sunglasses for ' + m2(c, '$') + ' a pair and adds a markup of ' + m + '%.<br>Calculate the selling price of a pair. Give your answer in $ to 2 decimal places.',
        answer: p, unit: '$', tol: 0.005, display: p.toFixed(2),
        why: 'Selling price = cost × (1 + markup) = ' + m2(c, '$') + ' × ' + (1 + m / 100) + ' = ' + m2(p, '$') + '. (Or add ' + m + '% of ' + m2(c, '$') + ', which is ' + m2(c * m / 100, '$') + ', to the cost.)' };
    } },
    { skill: 'price', gen: function () {
      var c = rint(40, 400), m = pick([12, 16, 24, 28, 32, 55]), p = rd(c * (1 + m / 100), 2);
      return { kind: 'num', q: 'A Dubai electronics shop buys smartwatches for AED ' + c + ' each. It sets prices using a markup of ' + m + '%.<br>Calculate the selling price of a smartwatch, in AED to 2 decimal places.',
        answer: p, unit: 'AED', tol: 0.005, display: p.toFixed(2),
        why: 'Markup amount = ' + m + '% × AED ' + c + ' = AED ' + fmt(c * m / 100, 2) + '. Selling price = AED ' + c + ' + AED ' + fmt(c * m / 100, 2) + ' = AED ' + fmt(p, 2) + '.' };
    } },
    { skill: 'cost', gen: function () {
      var m = pick([20, 25, 40, 50, 60, 80]), c = rint(8, 90), p = rd(c * (1 + m / 100), 2);
      return { kind: 'num', q: 'Fernhill Garden Centre sells a plant pot for ' + m2(p, '$') + '. It uses a markup of ' + m + '% on cost.<br>Calculate the cost of the pot to the garden centre. Give your answer in $.',
        answer: c, unit: '$', tol: 0.005, display: c.toFixed(2),
        why: 'Price = cost × ' + (1 + m / 100) + ', so cost = ' + m2(p, '$') + ' ÷ ' + (1 + m / 100) + ' = ' + m2(c, '$') + '. Taking ' + m + '% off the price would be wrong, because the markup is a percentage of the cost, not of the price.' };
    } },
    { skill: 'cost', gen: function () {
      var m = pick([100, 120, 150, 200, 250]), c = rd(rint(4, 40) / 2, 2), p = rd(c * (1 + m / 100), 2);
      return { kind: 'num', q: 'A gift shop sells a box of incense sticks for ' + m2(p, '€') + '. Its markup is ' + m + '%.<br>Calculate how much the shop paid for the box. Give your answer in € to 2 decimal places.',
        answer: c, unit: '€', tol: 0.005, display: c.toFixed(2),
        why: 'A ' + m + '% markup means price = cost × ' + (1 + m / 100) + '. Cost = ' + m2(p, '€') + ' ÷ ' + (1 + m / 100) + ' = ' + m2(c, '€') + '.' };
    } },
    { skill: 'profit-unit', gen: function () {
      var c = rint(12, 80), m = pick([15, 20, 30, 35, 45, 70]), pr = rd(c * m / 100, 2);
      return { kind: 'num', q: 'Stride Sportswear buys running jackets for ' + money(c, '$') + ' and uses a markup of ' + m + '%.<br>Calculate the profit Stride makes on each jacket, in $ to 2 decimal places.',
        answer: pr, unit: '$', tol: 0.005, display: pr.toFixed(2),
        why: 'Profit per unit = markup % × cost = ' + m + ' ÷ 100 × ' + money(c, '$') + ' = ' + m2(pr, '$') + '. The selling price would be ' + m2(c + pr, '$') + '.' };
    } },
    { skill: 'method', gen: function () {
      var c, p, a, w1, w2, w3;
      do { c = rint(20, 200); p = c + rint(8, Math.round(c * 0.9)); a = mk(p, c); w1 = rd((p - c) / p * 100, 2); w2 = rd(p / c * 100, 2); w3 = rd(c / (p - c) * 100, 2); } while (new Set([a, w1, w2, w3]).size < 4);
      return { kind: 'mcq', q: 'A bookshop buys a cookbook for ' + money(c, '$') + ' and sells it for ' + money(p, '$') + '. What is the markup?',
        options: [pct2(a), pct2(w1), pct2(w2), pct2(w3)], answer: 0,
        why: 'Markup = (' + money(p, '$') + ' − ' + money(c, '$') + ') ÷ ' + money(c, '$') + ' × 100 = ' + pct2(a) + '. Dividing by the price gives ' + pct2(w1) + ' (a margin); price ÷ cost gives ' + pct2(w2) + '; cost ÷ profit gives ' + pct2(w3) + '.' };
    } },
    { skill: 'cost', gen: function () {
      var m = pick([20, 25, 40, 50]), c = rint(10, 80), p = rd(c * (1 + m / 100), 2), w1 = rd(p * (1 - m / 100), 2), w2 = rd(p / (1 - m / 100), 2), w3 = rd(p * (1 + m / 100), 2);
      return { kind: 'mcq', q: 'A toy shop sells a puzzle for ' + m2(p, '$') + ' using a markup of ' + m + '%. What did the puzzle cost the shop?',
        options: [m2(c, '$'), m2(w1, '$'), m2(w2, '$'), m2(w3, '$')], answer: 0,
        why: 'Cost = price ÷ (1 + markup) = ' + m2(p, '$') + ' ÷ ' + (1 + m / 100) + ' = ' + m2(c, '$') + '. Taking ' + m + '% off the price gives ' + m2(w1, '$') + ', which is too low, because the markup was worked out on the smaller cost figure.' };
    } },
    { skill: 'method', kind: 'mcq', q: 'Which is the correct meaning of <b>markup</b>?', options: ['The profit added to the cost of a product, shown as a percentage of the cost', 'The profit on a product shown as a percentage of its selling price', 'The selling price of a product shown as a percentage of its cost', 'The difference between revenue and all of a business\'s costs'], answer: 0,
      why: 'Markup = (selling price − cost) ÷ cost × 100. Profit as a percentage of the selling price is a margin, not a markup.' },
    { skill: 'method', kind: 'mcq', q: 'A retailer sells a blender for exactly twice what it paid for it. What is the markup?', options: ['100%', '50%', '200%', '150%'], answer: 0,
      why: 'If cost is $x and price is $2x, profit is $x. Markup = x ÷ x × 100 = 100%. 200% is price ÷ cost, and 50% is profit ÷ price.' },
    { skill: 'markup-pct', gen: function () {
      var ca, pa, cb, pb, ma, mb;
      do { ca = rint(10, 60); pa = ca + rint(4, 50); cb = rint(10, 60); pb = cb + rint(4, 50); ma = mk(pa, ca); mb = mk(pb, cb); } while (Math.abs(ma - mb) < 5 || (pa - ca > pb - cb) === (ma > mb));
      var t = table(['', 'Cost ($)', 'Selling price ($)'], [['Rucksack', fmt(ca), fmt(pa)], ['Tent pegs set', fmt(cb), fmt(pb)]]);
      return { kind: 'mcq', q: 'A camping store sells two products.<br>' + t + 'Which statement is correct?',
        options: ['The rucksack has the higher markup, at ' + pct2(ma), 'The tent pegs set has the higher markup, at ' + pct2(mb), 'The ' + (pa - ca > pb - cb ? 'rucksack' : 'tent pegs set') + ' has the higher markup because it makes more profit per item', 'Both have the same markup because both make a profit'], answer: ma > mb ? 0 : 1,
        why: 'Rucksack: ' + (pa - ca) + ' ÷ ' + ca + ' × 100 = ' + pct2(ma) + '. Tent pegs: ' + (pb - cb) + ' ÷ ' + cb + ' × 100 = ' + pct2(mb) + '. More profit per item does not mean a higher markup; it depends on the cost.' };
    } },
    { skill: 'price', gen: function () {
      var c = rint(10, 80), m1 = pick([20, 25, 30, 40]), m2v = m1 + pick([10, 15, 20]), p1 = rd(c * (1 + m1 / 100), 2), p2 = rd(c * (1 + m2v / 100), 2);
      return { kind: 'num', q: 'A pharmacy sells a vitamin pack for ' + m2(p1, '$') + ', which includes a markup of ' + m1 + '%. It decides to raise its markup to ' + m2v + '%.<br>Calculate the new selling price, in $ to 2 decimal places.',
        answer: p2, unit: '$', tol: 0.005, display: p2.toFixed(2),
        why: 'First find the cost: ' + m2(p1, '$') + ' ÷ ' + (1 + m1 / 100) + ' = ' + m2(c, '$') + '. New price = ' + m2(c, '$') + ' × ' + (1 + m2v / 100) + ' = ' + m2(p2, '$') + '.' };
    } },
    { skill: 'method', gen: function () {
      var c = rint(20, 90), p = c + rint(10, 60), wrong = rd((p - c) / p * 100, 2), right = mk(p, c);
      return { kind: 'mcq', q: 'A phone shop buys a charger for ' + money(c, '$') + ' and sells it for ' + money(p, '$') + '. A student wrote: <i>"Markup = ' + (p - c) + ' ÷ ' + p + ' × 100 = ' + pct2(wrong) + '."</i> What mistake did the student make?',
        options: ['Divided the profit by the selling price instead of the cost', 'Forgot to subtract the cost from the selling price', 'Divided the cost by the profit instead of the profit by the cost', 'Should have added the cost to the selling price first'], answer: 0,
        why: 'Markup is profit as a percentage of COST: ' + (p - c) + ' ÷ ' + c + ' × 100 = ' + pct2(right) + '. Dividing by the price gives the margin instead.' };
    } },
    { skill: 'markup-pct', gen: function () {
      var c = rd(rint(30, 90) / 100, 2), p = rd(6 * c + rint(1, 4) + pick([0, 0.5]), 2), cost6 = rd(6 * c, 2), a = mk(p, cost6);
      return pctNum(a, 'Cost of a pack = 6 × ' + m2(c, '$') + ' = ' + m2(cost6, '$') + '. Markup = (' + m2(p, '$') + ' − ' + m2(cost6, '$') + ') ÷ ' + m2(cost6, '$') + ' × 100 = ' + a.toFixed(2) + '%.',
        'Brightbite buys single doughnuts from a bakery for ' + m2(c, '$') + ' each and sells them in packs of 6 for ' + m2(p, '$') + ' a pack.<br>Calculate the markup on a pack, to 2 decimal places.');
    } },
    { skill: 'method', kind: 'mcq', q: 'A product costs $80 and sells for $100. Why is its markup (25%) higher than its profit as a percentage of the price (20%)?', options: ['Markup divides the same $20 profit by the cost, which is the smaller figure', 'Markup includes the business\'s fixed costs as well as the product cost', 'Markup is worked out before tax and the other figure after tax', 'Markup adds the cost and the price together before dividing'], answer: 0,
      why: 'Both measures use the $20 profit. Markup divides it by the $80 cost (25%); the margin divides it by the $100 price (20%). Dividing by a smaller number gives a bigger percentage.' },
    { skill: 'markup-pct', gen: function () {
      var c = rint(25, 300), p = c + rint(5, Math.round(c * 1.2)) + pick([0.4, 0.8, 0.35]), exact = (p - c) / c * 100, a = rd(exact, 1);
      return pctNum(a, 'Markup = (' + m2(p, '$') + ' − ' + money(c, '$') + ') ÷ ' + money(c, '$') + ' × 100 = ' + fmt(exact, 3) + '…%, which is ' + a.toFixed(1) + '% to 1 decimal place.',
        'An e-scooter dealer buys a helmet for ' + money(c, '$') + ' and sells it for ' + m2(p, '$') + '.<br>Calculate the markup. Give your answer to <b>1 decimal place</b>.', 1);
    } },
    { skill: 'method', kind: 'multi', q: 'Which <b>two</b> statements about markup are correct?', options: ['A markup can be more than 100%', 'Markup is calculated by dividing profit per unit by the cost', 'Markup is calculated by dividing profit per unit by the selling price', 'A 50% markup means the cost is half of the selling price', 'Markup and gross profit margin are the same measure'], answers: [0, 1],
      why: 'Markup = profit ÷ cost × 100, and it exceeds 100% whenever the price is more than double the cost. A 50% markup means price = 1.5 × cost, so cost is two-thirds of the price, not half.' },
    { skill: 'price', gen: function () {
      var c1 = rint(10, 60), rise = pick([2, 3, 4, 5, 6]), c2 = c1 + rise, m = pick([25, 30, 40, 60, 75]), p2 = rd(c2 * (1 + m / 100), 2);
      return { kind: 'num', q: 'A craft shop buys picture frames for ' + money(c1, '$') + ' and always uses a markup of ' + m + '%. Its supplier raises the cost of a frame by ' + money(rise, '$') + '.<br>Calculate the new selling price that keeps the same markup, in $ to 2 decimal places.',
        answer: p2, unit: '$', tol: 0.005, display: p2.toFixed(2),
        why: 'New cost = ' + money(c1, '$') + ' + ' + money(rise, '$') + ' = ' + money(c2, '$') + '. New price = ' + money(c2, '$') + ' × ' + (1 + m / 100) + ' = ' + m2(p2, '$') + '.' };
    } }
  ] };

  /* =====================================================================
     BUS-S3-25 Using income statements and financial documents to decide
     ===================================================================== */
  B['BUS-S3-25'] = { title: 'Using income statements and financial documents to decide', items: [
    { skill: 'features', kind: 'mcq', q: 'Which item below is one of the main features of a statement of comprehensive income?', options: ['Expenses', 'Inventories', 'Bank loans', 'Share capital'], answer: 0,
      why: 'The income statement shows sales, cost of sales, gross profit, expenses and operating profit for a period. Inventories, loans and share capital are assets, liabilities or equity, shown on the statement of financial position.' },
    { skill: 'features', kind: 'multi', q: 'Which <b>three</b> of these items appear on a statement of comprehensive income?', options: ['Sales revenue', 'Cost of sales', 'Operating profit', 'Trade receivables', 'Non-current assets'], answers: [0, 1, 2],
      why: 'Sales, cost of sales and operating profit are main features of the income statement. Trade receivables and non-current assets are assets, which belong on the statement of financial position.' },
    { skill: 'features', kind: 'mcq', q: 'How is <b>gross profit</b> found on an income statement?', options: ['Sales revenue minus cost of sales', 'Sales revenue minus all expenses', 'Operating profit minus cost of sales', 'Cost of sales minus expenses'], answer: 0,
      why: 'Gross profit = sales − cost of sales. Operating profit is then found by taking expenses away from gross profit.' },
    { skill: 'features', kind: 'mcq', q: 'A hair salon\'s income statement shows gross profit of $90,000. What else is needed to find its operating profit?', options: ['Its expenses, such as rent, wages and electricity', 'Its cost of sales for the year', 'The total value of all the salon\'s equipment, chairs and furniture', 'The amount owed on its bank overdraft'], answer: 0,
      why: 'Operating profit = gross profit − expenses. Cost of sales has already been taken off to reach gross profit, and the value of equipment or debts owed are not on the income statement.' },
    { skill: 'features', gen: function () {
      var s, cos, exp, gp, op;
      do { s = rint(200, 600) * 1000; cos = Math.round(s * rint(40, 60) / 100 / 1000) * 1000; exp = Math.round((s - cos) * rint(50, 80) / 100 / 1000) * 1000; gp = s - cos; op = gp - exp; } while (cos === exp);
      var t = table(['', '$'], [['Sales', fmt(s)], ['Cost of sales', fmt(cos)], ['Expenses', fmt(exp)]]);
      return { kind: 'mcq', q: 'The table shows figures from the income statement of Marigold Events.<br>' + t + 'What is Marigold Events\' operating profit?',
        options: [money(op, '$'), money(gp, '$'), money(s - exp, '$'), money(s + cos - exp, '$')], answer: 0,
        why: 'Gross profit = ' + fmt(s) + ' − ' + fmt(cos) + ' = ' + fmt(gp) + '. Operating profit = ' + fmt(gp) + ' − ' + fmt(exp) + ' = ' + money(op, '$') + '. ' + money(gp, '$') + ' is only gross profit, and ' + money(s - exp, '$') + ' forgets the cost of sales.' };
    } },
    { skill: 'features', kind: 'mcq', q: 'What time does a statement of comprehensive income cover?', options: ['A period of trading, usually one year', 'A single date, such as the last day of the year', 'Only the months in which a profit was made', 'The expected trading for the next twelve months'], answer: 0,
      why: 'The income statement records revenue, costs and profit over a period of trading, usually a year. Its figures are actual past results, not forecasts.' },
    { skill: 'users', kind: 'mcq', q: 'Kestrel Logistics asks its bank for a loan to buy two new lorries. Why would the bank want to see Kestrel\'s income statements?', options: ['To judge whether Kestrel makes enough profit to pay interest and repay the loan', 'To find out how many lorries Kestrel\'s main rivals own and how old each of their fleets is', 'To check the names of the people who work for Kestrel', 'To decide what price Kestrel should charge its customers'], answer: 0,
      why: 'A lender wants evidence that the business earns enough profit to cover interest and repayments. Steady or rising operating profit makes the loan less risky.' },
    { skill: 'users', kind: 'mcq', q: 'Why would a shareholder in a listed company look at its income statement?', options: ['To judge the company\'s profit, which affects the dividends they may receive', 'To find out the exact value of the company\'s factories and machinery', 'To see the cash inflows and outflows the company expects in each month of next year', 'To check that the company has paid all of its suppliers on time'], answer: 0,
      why: 'Shareholders want a return on their investment. Profit figures show whether dividends are likely and whether to buy more shares or sell. Asset values and cash forecasts are in other documents.' },
    { skill: 'users', kind: 'mcq', q: 'The manager of a restaurant group sees that one of its five restaurants has made an operating loss for three years in a row. Which decision is the income statement most likely to support?', options: ['Review that restaurant\'s costs and consider closing it if they cannot be cut', 'Open two more restaurants exactly like the loss-making one to win market share', 'Raise prices in all five restaurants by the same amount', 'Ignore the figures, because losses are normal for restaurants'], answer: 0,
      why: 'Income statements show which parts of a business are profitable. Repeated losses suggest the manager should cut that restaurant\'s costs or close it, so the group\'s overall profit improves.' },
    { skill: 'interpret', kind: 'mcq', q: 'Over two years, a bicycle shop\'s revenue rose from $400,000 to $460,000, but its operating profit fell from $60,000 to $45,000. What does this suggest?', options: ['Its costs rose faster than its revenue, so it should look at where costs grew', 'It sold fewer bicycles, so it should spend more on advertising', 'It is now more successful, because revenue is the best measure of success', 'Its cost of sales must have fallen, which lowered its operating profit'], answer: 0,
      why: 'Revenue went up by $60,000 but operating profit fell, so total costs grew by more than revenue. Higher revenue does not mean higher profit; the shop needs to find which costs grew.' },
    { skill: 'interpret', gen: function () {
      var yrs = ['2022', '2023', '2024'], rows = [], ops = [], i, best;
      do {
        rows = []; ops = [];
        for (i = 0; i < 3; i++) { var s = rint(30, 60) * 10000, c = Math.round(s * rint(45, 60) / 100 / 1000) * 1000, e = Math.round((s - c) * rint(40, 85) / 100 / 1000) * 1000; rows.push([s, c, e]); ops.push(s - c - e); }
        best = ops.indexOf(Math.max.apply(null, ops));
      } while (new Set(ops).size < 3 || rows.map(function (r) { return r[0]; }).indexOf(Math.max.apply(null, rows.map(function (r) { return r[0]; }))) === best);
      var t = table(['', yrs[0] + ' ($)', yrs[1] + ' ($)', yrs[2] + ' ($)'], [['Revenue', fmt(rows[0][0]), fmt(rows[1][0]), fmt(rows[2][0])], ['Cost of sales', fmt(rows[0][1]), fmt(rows[1][1]), fmt(rows[2][1])], ['Expenses', fmt(rows[0][2]), fmt(rows[1][2]), fmt(rows[2][2])]]);
      return { kind: 'mcq', q: 'The table shows figures for Polaris Print Ltd.<br>' + t + 'In which year was Polaris Print\'s operating profit highest?', options: yrs, answer: best, keepOrder: true,
        why: 'Operating profit = revenue − cost of sales − expenses: ' + yrs.map(function (y, j) { return y + ': ' + money(ops[j], '$'); }).join('; ') + '. The year with the highest revenue is not the year with the highest profit.' };
    } },
    { skill: 'interpret', kind: 'mcq', q: 'Two clothing shops of similar size each made an operating profit of $50,000 last year. Shop P had revenue of $250,000 and Shop Q had revenue of $500,000. What is the best conclusion?', options: ['Shop P performed better, because it kept a larger share of each $1 of sales as profit', 'Shop Q performed better, because its sales revenue was twice as large as Shop P\'s revenue', 'Both performed equally well, because their profits are the same', 'Neither can be judged, because income statements cannot be compared'], answer: 0,
      why: 'Comparing profit with revenue shows performance: Shop P\'s operating profit margin is 20%, Shop Q\'s only 10%. Equal profit figures do not mean equal performance.' },
    { skill: 'interpret', kind: 'mcq', q: 'A small airline wants to judge whether its performance last year was good. Which comparison would be most useful?', options: ['Its profit and margins compared with earlier years and with similar airlines', 'Its revenue compared with the revenue of a large supermarket chain in the same city', 'Its profit compared with the number of seats on one aircraft', 'This year\'s profit on its own, without any other figures'], answer: 0,
      why: 'A single figure means little on its own. Financial documents are most useful when compared over time (is it improving?) and with similar businesses (is it doing as well as rivals?).' },
    { skill: 'evaluate', kind: 'mcq', q: 'What is the main limitation of using last year\'s income statement to decide whether to open a new branch?', options: ['It shows past results, which may not show how the new branch will perform', 'It does not show the business\'s revenue or costs', 'It shows the value of the business\'s assets rather than its profit', 'It shows forecasts of next year\'s sales rather than actual results'], answer: 0,
      why: 'Income statements are historical. Market conditions, costs and competition at the new location may be different, so past profit is no guarantee of future success.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A food manufacturer\'s income statement shows a large operating profit. Which important information would it <b>not</b> show the managers?', options: ['Whether the business has enough cash to pay its bills next month', 'How much revenue the business earned last year', 'How much the business spent on its cost of sales', 'Whether expenses rose compared with gross profit'], answer: 0,
      why: 'Profit is not cash. A profitable business can still be short of cash, which the income statement does not show; a cash-flow forecast would. Revenue, cost of sales and expenses are all on the income statement.' },
    { skill: 'evaluate', kind: 'mcq', q: 'Tariq says: <i>"Our operating profit has risen every year for three years, so opening a second gym will definitely be a success."</i> What is the main weakness in his judgement?', options: ['Past profits do not guarantee future results; demand at the new site may be different', 'Rising profit means the gym has plenty of cash to pay for the second site', 'Operating profit cannot be compared from one year to the next', 'He should judge success by revenue, which matters more than profit'], answer: 0,
      why: 'Financial documents show what has happened, not what will happen. Tariq should also research demand, rivals and costs at the new site before deciding.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A bakery\'s income statement shows rising profits, and the owner is deciding whether to open a second shop. Besides the financial documents, what else should she check?', options: ['Market research on demand and competition near the new location', 'The gross profit shown on last year\'s income statement', 'Last year\'s operating profit compared with the year before', 'The cost of sales shown on her income statement'], answer: 0,
      why: 'Gross profit, operating profit and cost of sales are already in the financial documents, which show past performance. Whether a second shop will succeed also depends on things outside them, such as local demand and rival bakeries.' },
    { skill: 'chain', kind: 'multi', q: 'A student starts an answer: <i>"Shareholders look at the income statement to see whether the company is making a profit."</i> Which <b>two</b> statements best develop this into a chain of reasoning?', options: ['Higher profits mean the company can pay larger dividends', 'So shareholders can decide whether to buy more shares or sell the ones they hold', 'The income statement shows sales, cost of sales and expenses', 'Gross profit is sales revenue minus cost of sales', 'The income statement is usually prepared once a year'], answers: [0, 1],
      why: 'A developed point links the profit figure to the shareholder\'s return (dividends) and then to a decision (buy or sell shares). Describing what is on the statement or how gross profit is found does not develop the reason.' },
    { skill: 'chain', kind: 'mcq', q: 'Which is the best developed explanation of why a business might compare its income statement with a rival\'s?', options: ['If its gross profit margin is lower than the rival\'s, it may be paying too much for supplies, so it could look for cheaper suppliers to raise profit', 'An income statement shows the sales, cost of sales, gross profit, expenses and operating profit of a business', 'It is useful to compare income statements because comparing them helps businesses to compare things', 'The rival might have a larger revenue, which means it is a bigger business than the first one'], answer: 0,
      why: 'The best answer gives a reason (lower margin than the rival), a consequence (paying too much for supplies) and an action (find cheaper suppliers to raise profit). The others describe or repeat.' },
    { skill: 'users', kind: 'mcq', q: 'Which user is correctly matched with the decision they would use the income statement for?', options: ['A bank: whether to lend money to the business', 'A customer: how much tax the business must pay', 'A competitor: whether to lend the business money', 'An employee: what price the business should charge customers'], answer: 0,
      why: 'Banks use profit figures to judge whether a borrower can repay. Tax is set by the government, competitors do not lend to rivals, and prices are set by managers, not employees.' },
    { skill: 'interpret', kind: 'mcq', q: 'Why is profit important to a small business owner?', options: ['It rewards the owner for taking risks and can be kept in the business to pay for growth', 'It is exactly the same as the cash that the business holds in its bank account at the year end', 'It is the total money received from customers before any costs', 'It shows how much the business would be worth if it were sold'], answer: 0,
      why: 'Profit is the reward for risk-taking and a source of finance: retained profit can fund expansion. Profit is not cash, and money received from customers is revenue.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A start-up is raising money through crowdfunding. Why might potential investors want to see its financial documents?', options: ['To judge how well the business is performing before they decide to invest', 'Because crowdfunding investors become the managers of the business', 'To find out which bank the business uses for its overdraft', 'To find out how much the owners have in personal savings'], answer: 0,
      why: 'People putting money into a business want evidence of its performance, such as revenue growth and profit, to judge the risk and likely return before investing.' },
    { skill: 'interpret', kind: 'mcq', q: 'A phone retailer\'s revenue rose by 30% last year while its market share and profit both fell. Which statement about measuring its success is most accurate?', options: ['Looking only at revenue would overstate its success, so several measures should be checked', 'It was clearly more successful, because a 30% rise in revenue is the best sign of business success', 'Market share does not matter if revenue is rising', 'Profit is not a measure of success for a retailer'], answer: 0,
      why: 'Success can be measured by revenue, market share, profit and other measures. Here they disagree, so judging on revenue alone would give a misleading picture.' }
  ] };

  /* =====================================================================
     BUS-S3-08 Why cash matters and how to improve cash flow
     ===================================================================== */
  B['BUS-S3-08'] = { title: 'Why cash matters and how to improve cash flow', items: [
    { skill: 'meaning', kind: 'mcq', q: 'What is meant by <b>insolvency</b>?', options: ['Being unable to pay debts when they are due', 'Making a loss for one year of trading', 'Having more inventory than can be sold', 'Owing money to a bank on a long-term loan for equipment'], answer: 0,
      why: 'Insolvency is when a business cannot pay what it owes as the payments fall due. It can make a profit and still be insolvent if it lacks cash; owing a loan is normal as long as repayments can be made.' },
    { skill: 'meaning', kind: 'mcq', q: 'For a business, what does <b>cash</b> mean?', options: ['Money available to spend now, in the bank or in hand', 'The value of everything the business owns', 'The profit the business made last year', 'Money that customers have promised to pay the business next year'], answer: 0,
      why: 'Cash is money the business actually holds now and can use to pay bills. Assets, profit and money still owed by customers are not cash yet.' },
    { skill: 'meaning', kind: 'mcq', q: 'Which of these is an <b>overhead</b> that a business must pay in cash?', options: ['Monthly electricity bill for the office', 'Raw materials used in each product', 'A loan received from the bank', 'Payments received from customers'], answer: 0,
      why: 'Overheads are regular running costs such as rent and electricity that are paid whatever the output. Raw materials are direct costs, and the loan and customer payments are cash inflows.' },
    { skill: 'improve', kind: 'mcq', q: 'Which action would improve a business\'s cash flow most quickly?', options: ['Asking customers to pay on delivery instead of after 60 days', 'Offering customers 90 days to pay their invoices instead of 30 days', 'Buying a larger stock of raw materials in advance', 'Paying its suppliers as soon as each invoice arrives'], answer: 0,
      why: 'Getting customers to pay sooner brings cash in earlier. Longer credit for customers, buying extra stock and paying suppliers earlier all reduce the cash the business holds now.' },
    { skill: 'improve', kind: 'mcq', q: 'Which of these would make a business\'s cash flow <b>worse</b> in the short term?', options: ['Paying wages a week earlier than usual', 'Selling off old stock at a discount', 'Agreeing 60 days\' credit with a supplier', 'Leasing a van instead of buying it outright'], answer: 0,
      why: 'Paying wages earlier sends cash out sooner. Selling old stock brings cash in, supplier credit delays cash going out, and leasing spreads the payment instead of one large outflow.' },
    { skill: 'improve', kind: 'multi', q: 'A toy wholesaler is short of cash. Which <b>three</b> actions would improve its cash flow in the short term?', options: ['Chase customers who are late paying their invoices', 'Negotiate longer credit terms with its suppliers', 'Reduce the amount of inventory it holds', 'Let shops pay for orders three months after delivery', 'Pay the year\'s warehouse rent in one advance payment'], answers: [0, 1, 2],
      why: 'Chasing debtors brings cash in sooner, longer supplier credit delays cash out, and lower inventory means less cash tied up in stock. Longer credit for shops and paying rent early do the opposite.' },
    { skill: 'improve', kind: 'mcq', q: 'How does holding less inventory improve a business\'s cash flow?', options: ['Less cash is tied up in goods waiting to be sold', 'It increases the price that customers are willing to pay for each item', 'It turns inventory into profit straight away', 'It reduces the amount of tax the business pays'], answer: 0,
      why: 'Money spent on stock sitting in a warehouse cannot be used to pay bills. Buying less stock, or selling surplus stock, keeps more cash available.' },
    { skill: 'cash-v-profit', kind: 'mcq', q: 'Jade\'s design studio made a profit last year but cannot pay this month\'s rent. Which is the most likely reason?', options: ['Its clients have not yet paid for work already completed', 'Its revenue for the year was greater than all of its total costs', 'It sold its services for more than they cost', 'It has no fixed costs to pay this month'], answer: 0,
      why: 'Profit is counted when work is sold, but cash only arrives when clients pay. If clients pay late, a profitable business can still run short of cash.' },
    { skill: 'cash-v-profit', kind: 'mcq', q: 'A business delays paying its suppliers by an extra 30 days. What is the effect?', options: ['Cash flow improves this month but profit is unchanged', 'Profit rises because the cost of the supplies has been cut', 'Both cash flow and profit fall', 'Cash flow gets worse but profit rises'], answer: 0,
      why: 'Paying later keeps cash in the business for longer, but the cost is still the same, so profit does not change. Delaying a payment is not the same as reducing a cost.' },
    { skill: 'cash-v-profit', kind: 'mcq', q: 'What is the key difference between cash and profit?', options: ['Profit is revenue minus costs over a period; cash is the money actually held at a point in time', 'Cash is revenue minus costs over a period; profit is the money actually held in the bank account', 'Profit includes only cash sales, while cash includes credit sales', 'There is no difference; both measure money coming into the business'], answer: 0,
      why: 'Profit compares revenue with costs over a period, whether or not money has been received. Cash is the money the business actually has available to spend.' },
    { skill: 'chain', kind: 'multi', q: 'A student writes: <i>"Cash is important so that a business can pay its suppliers on time."</i> Which <b>two</b> statements best develop this point?', options: ['Suppliers then trust the business and keep delivering materials', 'This may lead to better credit terms or discounts, lowering costs', 'Cash is the money a business holds in the bank or in hand', 'Suppliers are an example of a stakeholder group', 'Profit is revenue minus total costs'], answers: [0, 1],
      why: 'A developed point follows the consequences: paying on time builds trust and reliable supply, which can lead to better terms that lower costs. A definition or a fact about stakeholders does not develop it.' },
    { skill: 'chain', kind: 'mcq', q: 'Which sequence correctly shows how a cash shortage can lead to business failure?', options: ['Bills cannot be paid → suppliers stop deliveries and creditors take legal action → the business becomes insolvent and may close', 'The business makes a profit → it has too much cash → it becomes insolvent and closes', 'Customers pay early → cash rises → suppliers refuse to deliver → the business closes', 'Wages are paid on time → staff work harder → the business becomes insolvent'], answer: 0,
      why: 'If a business cannot pay its bills, suppliers stop supplying and creditors may take legal action. Being unable to pay debts when due is insolvency, which can force the business to close.' },
    { skill: 'chain', kind: 'mcq', q: 'A builder cannot pay its workers\' wages on time. What is the most likely chain of effects?', options: ['Workers lose motivation or leave, so jobs are finished late and customers may go elsewhere', 'Workers work harder to make sure they earn their wages, so jobs are finished earlier than planned', 'The builder\'s profit rises because its wage costs have disappeared', 'Customers pay the builder sooner, so the cash problem is solved'], answer: 0,
      why: 'Unpaid staff become demotivated or quit. Work slows, deadlines are missed and the business\'s reputation suffers, which can cut future sales. The wages are still owed, so costs have not disappeared.' },
    { skill: 'applied', kind: 'mcq', q: 'Bloom Catering supplies food for weddings. It buys ingredients a week before each wedding but is paid by clients a month afterwards. Why is cash especially important to Bloom Catering?', options: ['It must pay for ingredients for upcoming weddings before clients pay for past ones', 'It needs cash so that clients can choose their wedding menus', 'Cash is important to every business because cash is the money a business holds now to spend', 'It needs cash to calculate its profit at the end of each year'], answer: 0,
      why: 'The applied answer uses the case: ingredients must be paid for before client money arrives, so without enough cash Bloom could not buy food for its next events. The generic answer does not use the case.' },
    { skill: 'applied', kind: 'mcq', q: 'Peak Fitness rents a large gym building and must pay the landlord at the start of every month. Its members pay their fees at the end of the month. What is the main risk if Peak Fitness runs short of cash?', options: ['It may be unable to pay the rent on time and could lose its building', 'Its members will stop paying their fees at the end of the month', 'Its profit will fall because rent is a variable cost', 'It will have to raise its membership fees straight away'], answer: 0,
      why: 'Rent is due before members\' fees arrive. If cash runs short, the landlord may not be paid, which could end the lease and force the gym to close.' },
    { skill: 'applied', kind: 'mcq', q: 'Which answer best <b>outlines</b> why cash is important to Ridgeway Farm, which pays workers weekly but sells its apples once a year at harvest?', options: ['Ridgeway needs cash to pay its pickers every week, even though apple income only arrives at harvest', 'Cash is important because it lets any business pay all of its suppliers, its overheads and its employees on time', 'Cash is the money a farm has in the bank or in hand at any time', 'Farms need cash because they can make a profit from selling apples'], answer: 0,
      why: 'An Outline answer gives a reason and links it to the case: weekly wages must be paid while income comes only once a year. A generic reason or a definition does not earn the application mark.' },
    { skill: 'cash-v-profit', kind: 'mcq', q: 'A manager says: <i>"We made a profit of $80,000 last year, so we cannot become insolvent."</i> What is wrong with this statement?', options: ['A profitable business can still run out of cash if money comes in later than bills are due', 'Insolvency only happens to businesses that make a profit and then spend all of it on growth', 'Profit and cash are the same thing, so the manager is right', 'Insolvency depends on the number of employees, not on cash'], answer: 0,
      why: 'Insolvency is about cash, not profit. If customers pay late or cash is tied up in stock, a profitable business may not be able to pay debts when they fall due.' },
    { skill: 'meaning', kind: 'mcq', q: 'Which of these is a common reason for business failure?', options: ['Cash-flow problems that leave the business unable to pay its debts', 'Paying all of its suppliers in full within the agreed credit period', 'Keeping inventory at a level that matches demand', 'Holding a cash reserve for unexpected bills'], answer: 0,
      why: 'Running out of cash is one of the main reasons businesses fail: if debts cannot be paid when due, creditors can force the business to close. The other options help a business survive.' },
    { skill: 'improve', kind: 'mcq', q: 'What is a drawback of a business improving its cash flow by paying suppliers later?', options: ['Suppliers may lose trust and offer worse terms or stop supplying', 'The business\'s cash balance will fall immediately because more cash flows out', 'The business\'s profit will fall because costs are higher', 'Customers will have to pay for their goods sooner'], answer: 0,
      why: 'Late payment helps cash in the short term, but suppliers may stop offering credit, remove discounts or put the business last in line for deliveries.' },
    { skill: 'applied', gen: function () {
      var rows = [], i, names = ['Firm J', 'Firm K', 'Firm L'], risky;
      var profits = [rint(20, 60) * 1000, rint(20, 60) * 1000, rint(-20, -5) * 1000];
      var cash = [rint(15, 40) * 1000, -rint(5, 25) * 1000, rint(30, 60) * 1000];
      var bills = [rint(5, 12) * 1000, rint(10, 20) * 1000, rint(5, 15) * 1000];
      var order = [0, 1, 2].sort(function () { return Math.random() - 0.5; });
      for (i = 0; i < 3; i++) rows.push([names[i], money(profits[order[i]], '$'), money(cash[order[i]], '$'), money(bills[order[i]], '$')]);
      risky = order.indexOf(1);
      return { kind: 'mcq', q: 'The table shows three small firms.<br>' + table(['', 'Profit last year', 'Cash in bank now', 'Bills due this week'], rows) + 'Which firm is at the greatest immediate risk of insolvency?', options: names, answer: risky, keepOrder: true,
        why: names[risky] + ' has an overdrawn bank balance and bills due this week, so it cannot pay its debts as they fall due, even though it made a profit. A loss-making firm with plenty of cash can still pay its bills for now.' };
    } },
    { skill: 'meaning', kind: 'mcq', q: 'What does <b>cash flow</b> describe?', options: ['The movement of money into and out of a business', 'The profit a business makes each month', 'The value of a business\'s assets minus its liabilities', 'The total amount a business owes to its suppliers'], answer: 0,
      why: 'Cash flow is the money coming in (inflows, e.g. from customers) and going out (outflows, e.g. to suppliers and staff) over time.' },
    { skill: 'applied', kind: 'mcq', q: 'Volta Electrics, a small electrical retailer, offers customers interest-free credit, so most pay six months after buying. The owner wants to improve cash flow quickly. Which action best fits Volta\'s situation?', options: ['Offer a small discount to customers who pay in full at the time of purchase', 'Extend the interest-free credit period from six months to twelve', 'Spend more on advertising the interest-free credit offer', 'Buy a larger range of stock to attract more customers'], answer: 0,
      why: 'Volta\'s problem is cash arriving months after a sale. A discount for paying up front brings cash in sooner. Longer credit, more advertising of credit and more stock would all tie up more cash.' }
  ] };

  /* =====================================================================
     BUS-S3-09 Cash-flow forecasts: terms, uses and limits
     ===================================================================== */
  B['BUS-S3-09'] = { title: 'Cash-flow forecasts: terms, uses and limits', items: [
    { skill: 'terms', kind: 'mcq', q: 'What is meant by <b>net cash flow</b>?', options: ['Cash inflows minus cash outflows for a period', 'Cash outflows minus cash inflows for a period', 'The cash a business holds at the start of a month', 'Revenue minus total costs for a year'], answer: 0,
      why: 'Net cash flow = inflows − outflows over a set period. The cash at the start of a month is the opening balance, and revenue minus costs is profit.' },
    { skill: 'terms', kind: 'mcq', q: 'In a cash-flow forecast, what is the <b>opening balance</b>?', options: ['The cash the business expects to have at the start of the month', 'The cash the business expects to have at the end of the month', 'The total cash the business expects to receive during the month', 'The difference between this month\'s inflows and outflows'], answer: 0,
      why: 'The opening balance is the cash at the start of a period. Adding net cash flow to it gives the closing balance at the end.' },
    { skill: 'terms', kind: 'mcq', q: 'A cash-flow forecast shows a closing balance of $6,500 for May. What will the opening balance be for June?', options: ['$6,500', '$0', 'May\'s net cash flow', 'June\'s cash inflows'], answer: 0,
      why: 'The cash at the end of one month is the cash at the start of the next, so May\'s closing balance becomes June\'s opening balance.' },
    { skill: 'terms', kind: 'multi', q: 'Which <b>three</b> of these are cash <b>inflows</b> for a business?', options: ['Payments from customers for goods sold', 'A bank loan paid into the business account', 'Money the owner puts into the business', 'Wages paid to staff', 'Rent paid for the shop'], answers: [0, 1, 2],
      why: 'Inflows are money coming in: customer payments, loans received and the owner\'s capital. Wages and rent are money going out, so they are outflows.' },
    { skill: 'terms', kind: 'mcq', q: 'A business forecasts a <b>negative</b> net cash flow for October. What does this mean?', options: ['Its cash outflows are expected to be larger than its cash inflows', 'It is expected to make a loss for the year', 'Its closing balance must be below zero', 'Its costs are expected to be larger than its profits for the month of October'], answer: 0,
      why: 'Negative net cash flow means more money going out than coming in that month. The closing balance can still be positive if the opening balance is large enough, and cash is not the same as profit.' },
    { skill: 'terms', kind: 'mcq', q: 'What does a cash-flow forecast show?', options: ['The cash a business expects to come in and go out in each future period', 'The money a business owes to its suppliers and other creditors at the end of the year', 'The profit a business made over the last twelve months', 'The value of the assets the business owns today'], answer: 0,
      why: 'A cash-flow forecast is a plan estimating future inflows and outflows, usually month by month. Debts, past profit and asset values are shown in other documents.' },
    { skill: 'terms', kind: 'mcq', q: 'Which of these would be shown as a cash <b>outflow</b> on a cash-flow forecast?', options: ['Buying a new delivery van', 'Receiving a bank loan', 'Cash sales to customers', 'The owner putting in savings'], answer: 0,
      why: 'Paying for a van sends money out of the business. A loan received, cash sales and the owner\'s savings all bring money in.' },
    { skill: 'interpret', kind: 'mcq', q: 'The table shows part of a cash-flow forecast for Hanami Sushi Bar.<br><table class="mc-table"><tr><th></th><th>Jan ($)</th><th>Feb ($)</th><th>Mar ($)</th><th>Apr ($)</th></tr><tr><td>Net cash flow</td><td>2,000</td><td>(5,000)</td><td>(1,500)</td><td>4,000</td></tr><tr><td>Closing balance</td><td>6,000</td><td>1,000</td><td>(500)</td><td>3,500</td></tr></table>Figures in brackets are negative. In which month should Hanami arrange an overdraft?', options: ['January', 'February', 'March', 'April'], answer: 2, keepOrder: true,
      why: 'The closing balance falls below zero only in March (−$500), so that is when the business would run out of cash. February has negative net cash flow, but its closing balance is still positive.' },
    { skill: 'interpret', kind: 'mcq', q: 'A shop\'s forecast shows a net cash flow of −$3,000 for July but an opening balance of $10,000. What does this tell the owner?', options: ['Cash will fall to $7,000 but the shop can still pay its bills that month', 'The shop will become insolvent in July', 'The shop must have made a loss in July', 'The shop must arrange an overdraft before July because its net cash flow is negative'], answer: 0,
      why: 'Closing balance = $10,000 + (−$3,000) = $7,000. Cash falls, but it stays positive, so the shop can still meet its payments. A negative net cash flow is not the same as a loss.' },
    { skill: 'interpret', gen: function () {
      var months = ['May', 'Jun', 'Jul', 'Aug', 'Sep'], open = rint(3, 8) * 1000, nets, bal, first, i, tries = 0;
      do {
        nets = []; bal = open; first = -1;
        for (i = 0; i < 5; i++) { var n = (Math.random() < 0.45 ? 1 : -1) * rint(1, 6) * 1000; nets.push(n); bal += n; if (bal < 0 && first < 0) first = i; }
        tries++;
      } while (first < 1 || first > 4 || nets[first] >= 0);
      var show = nets.map(function (n) { return n < 0 ? '(' + fmt(-n) + ')' : fmt(n); });
      var run = open, steps = [];
      for (i = 0; i <= first; i++) { run += nets[i]; steps.push(months[i] + ' ' + money(run, '$')); }
      return { kind: 'mcq', q: 'Lumo Kids Clothing has an opening balance of ' + money(open, '$') + ' at the start of May. Its forecast net cash flows are shown below (brackets mean negative).<br>' + table(['', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], [['Net cash flow ($)'].concat(show)]) + 'In which month is its closing balance first expected to be negative?',
        options: ['May', 'June', 'July', 'August', 'September'], answer: first, keepOrder: true,
        why: 'Add each month\'s net cash flow to the balance: ' + steps.join(', ') + '. The balance first drops below zero in ' + ['May', 'June', 'July', 'August', 'September'][first] + ', so that is when extra finance would be needed.' };
    } },
    { skill: 'interpret', kind: 'mcq', q: 'A business forecasts positive net cash flow every month next year. Which conclusion is correct?', options: ['More cash is expected to come in than go out each month, but this does not prove it will make a profit', 'It is certain to make a profit next year', 'It does not need to keep any records of its costs', 'Its forecast must be accurate because the figures are positive'], answer: 0,
      why: 'Cash and profit are different: for example, a loan received is a cash inflow but not revenue. A forecast is also only an estimate, so positive figures are not guaranteed.' },
    { skill: 'uses', kind: 'mcq', q: 'Why is a cash-flow forecast useful to a business that expects a cash shortage in three months\' time?', options: ['It can arrange an overdraft or cut spending in advance instead of running out of cash', 'It can stop the shortage happening by printing a new forecast', 'It proves to suppliers and lenders that the business will make a profit in every month', 'It means the business no longer needs to pay its bills on time'], answer: 0,
      why: 'Seeing a shortfall early lets the business plan, for example arrange an overdraft, delay a purchase or chase customers, so it can keep paying its bills and avoid insolvency.' },
    { skill: 'uses', kind: 'mcq', q: 'Why might a bank ask to see a cash-flow forecast before lending money to a new business?', options: ['To judge whether the business will have enough cash to make the repayments', 'Because a forecast guarantees the business will be a success in its first years', 'To find out the value of the business\'s shares on the stock market', 'Because all businesses must publish a forecast by law'], answer: 0,
      why: 'The bank wants to see when cash comes in and goes out, so it can judge whether loan repayments can be met. A forecast is not a guarantee or a legal requirement.' },
    { skill: 'uses', kind: 'mcq', q: 'Pixel Studio wants to buy $15,000 of new computers this year. Its forecast shows low cash in March and high cash in September. How does the forecast help?', options: ['It shows the studio should time the purchase for when cash is high, such as September', 'It shows the computers will pay for themselves by March', 'It shows the studio\'s profit will be $15,000 higher in September', 'It shows the studio should buy the computers in March to save money'], answer: 0,
      why: 'A forecast helps a business time big payments for months when it has enough cash, so it does not run short and need costly borrowing.' },
    { skill: 'uses', kind: 'multi', q: 'A student starts: <i>"A cash-flow forecast helps a business identify months when it may run short of cash."</i> Which <b>two</b> statements best develop this into a chain of reasoning?', options: ['The business can then arrange an overdraft before the shortfall arrives', 'So it can keep paying suppliers and staff on time and avoid insolvency', 'A cash-flow forecast lists inflows and outflows', 'Net cash flow is inflows minus outflows', 'The closing balance becomes the next opening balance'], answers: [0, 1],
      why: 'The chain goes: spot the shortfall → arrange finance in advance → keep paying bills and avoid failure. The other options only define terms, which does not develop the reason.' },
    { skill: 'uses', kind: 'mcq', q: 'A forecast shows that a plumbing business will be short of cash in August. Which action would best deal with this?', options: ['Delay buying a new van until September', 'Offer customers longer to pay in August', 'Pay next year\'s insurance early in August', 'Order extra stock of pipes in July'], answer: 0,
      why: 'Putting off a large outflow until cash is higher eases the shortage. Giving customers longer to pay, paying insurance early or buying extra stock would all make August\'s cash position worse.' },
    { skill: 'limits', kind: 'mcq', q: 'Sandy Shack sells cold drinks on a beach. Why might its cash-flow forecast be inaccurate?', options: ['Sales depend on the weather, so actual inflows may differ from the estimates', 'Cash-flow forecasts show only outflows, not sales', 'Its forecast will include the value of its fridges and stock', 'Its forecast only shows the profit it expects to make, not the cash it will receive'], answer: 0,
      why: 'A forecast is only an estimate. A cool, wet summer could cut sales well below the forecast, leaving less cash than planned.' },
    { skill: 'limits', kind: 'mcq', q: 'Why is a cash-flow forecast especially difficult for a brand-new business to prepare?', options: ['It has no past figures to base its estimates of sales and costs on', 'It must show the profit for the year, which a new business does not know', 'A new business has no outflows until it starts trading', 'It must be approved by a bank before it can be used'], answer: 0,
      why: 'Established firms can use past sales and cost records. A new business must guess, so its forecast is more likely to be wrong.' },
    { skill: 'limits', kind: 'mcq', q: 'A printing firm\'s forecast was accurate until a key machine broke down and needed a $4,000 repair. What limitation of forecasts does this show?', options: ['Unexpected costs can make the actual figures differ from the forecast', 'A forecast is a record of past cash, so it cannot be changed', 'Forecasts show only inflows, so the repair could not be included', 'The repair is a fixed cost, so it does not affect cash'], answer: 0,
      why: 'Forecasts are based on what is expected. Unplanned events, such as breakdowns, price rises or late-paying customers, make the real cash position different.' },
    { skill: 'evaluate', kind: 'mcq', q: 'Ali says: <i>"Our cash-flow forecast shows positive closing balances all year, so we will never have a cash problem."</i> What is the main weakness in his judgement?', options: ['The forecast is an estimate; if sales fall or costs rise, cash could still run short', 'Positive closing balances mean the business is making a loss, so it will need an overdraft', 'A forecast cannot show closing balances for a whole year', 'Positive closing balances prove the business is making a profit'], answer: 0,
      why: 'A forecast is only as good as its estimates. Ali should keep checking actual figures against it and plan for things going worse than expected.' },
    { skill: 'evaluate', kind: 'mcq', q: 'Which of these would make a cash-flow forecast <b>more reliable</b>?', options: ['Basing it on market research and past figures, and updating it each month', 'Using the most optimistic sales figures the owner can imagine', 'Preparing it once and never changing it during the year', 'Leaving out any costs that are hard to predict, so that the forecast looks simpler'], answer: 0,
      why: 'Estimates based on evidence, and regularly compared with actual results, are more likely to be accurate. Optimistic sales or missing costs make a forecast misleading.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A student is evaluating how useful a cash-flow forecast is to a new ice-cream van business. Which is the best supported conclusion?', options: ['It is useful for spotting quiet winter months and arranging finance, but only if the sales estimates are realistic, so it should be updated regularly', 'It is completely useless, because all forecasts contain estimates', 'It is essential, because it guarantees the business will not run out of cash', 'It is useful because a forecast shows inflows and outflows'], answer: 0,
      why: 'A good conclusion weighs the use (seeing seasonal shortfalls) against the limit (estimates may be wrong) and says what the usefulness depends on. The others are one-sided or only describe.' }
  ] };

  /* =====================================================================
     BUS-CALC-07 Net cash flow and closing balance
     ===================================================================== */
  function cashNum(ans, sym, q, why) { return { kind: 'num', q: q, answer: ans, unit: sym.trim(), display: String(ans), why: why }; }
  function br(n) { return n < 0 ? '(' + fmt(-n) + ')' : fmt(n); }
  // A signed term inside working: negative values get brackets, positive ones do not (brackets mean negative in cash-flow tables).
  function sg(n, sym) { return n < 0 ? '(' + money(n, sym) + ')' : money(n, sym); }
  function sgn(n) { return n < 0 ? '(' + fmt(n) + ')' : fmt(n); }
  B['BUS-CALC-07'] = { title: 'Net cash flow and closing balance', items: [
    { skill: 'net', gen: function () {
      var out = rint(20, 90) * 100, inn = out + rint(5, 40) * 100;
      return cashNum(inn - out, '$', 'In April, Petal &amp; Pot garden shop expects cash inflows of ' + money(inn, '$') + ' and cash outflows of ' + money(out, '$') + '.<br>Calculate the net cash flow for April. Give your answer in $.',
        'Net cash flow = inflows − outflows = ' + money(inn, '$') + ' − ' + money(out, '$') + ' = ' + money(inn - out, '$') + '.');
    } },
    { skill: 'net', gen: function () {
      var inn = rint(20, 80) * 100, out = inn + rint(5, 30) * 100, n = inn - out;
      return cashNum(n, '£', 'In November, Thornbury Joinery expects to receive ' + money(inn, '£') + ' and to pay out ' + money(out, '£') + '.<br>Calculate the net cash flow for November. Give your answer in £, using a minus sign if it is negative.',
        'Net cash flow = ' + money(inn, '£') + ' − ' + money(out, '£') + ' = ' + money(n, '£') + '. It is negative because more cash goes out than comes in.');
    } },
    { skill: 'closing', gen: function () {
      var op = rint(5, 40) * 100, inn = rint(30, 90) * 100, out = rint(30, 90) * 100, n = inn - out, cl = op + n;
      return cashNum(cl, '$', 'Quill Copy Centre\'s forecast for June: opening balance ' + money(op, '$') + ', cash inflows ' + money(inn, '$') + ', cash outflows ' + money(out, '$') + '.<br>Calculate the closing balance for June. Give your answer in $, using a minus sign if it is negative.',
        'Net cash flow = ' + money(inn, '$') + ' − ' + money(out, '$') + ' = ' + money(n, '$') + '. Closing balance = ' + money(op, '$') + ' + ' + sg(n, '$') + ' = ' + money(cl, '$') + '.');
    } },
    { skill: 'closing', gen: function () {
      var op = -rint(5, 30) * 100, inn = rint(40, 90) * 100, out = rint(20, 60) * 100, n = inn - out, cl = op + n;
      return cashNum(cl, '$', 'Harlow Auto Repairs starts March with an overdraft, so its opening balance is ' + money(op, '$') + '. In March it expects inflows of ' + money(inn, '$') + ' and outflows of ' + money(out, '$') + '.<br>Calculate the closing balance for March. Give your answer in $, using a minus sign if it is negative.',
        'Net cash flow = ' + money(inn, '$') + ' − ' + money(out, '$') + ' = ' + money(n, '$') + '. Closing = ' + money(op, '$') + ' + ' + sg(n, '$') + ' = ' + money(cl, '$') + '.');
    } },
    { skill: 'net', gen: function () {
      var s = rint(80, 200) * 100, o = rint(5, 30) * 100, w = rint(30, 80) * 100, sup = rint(20, 70) * 100, rent = rint(10, 30) * 100;
      var ti = s + o, to = w + sup + rent, n = ti - to;
      var t = table(['August', '$'], [['<b>Inflows</b>', ''], ['Sales receipts', fmt(s)], ['Other income', fmt(o)], ['<b>Outflows</b>', ''], ['Wages', fmt(w)], ['Supplies', fmt(sup)], ['Rent', fmt(rent)]]);
      return cashNum(n, '$', 'The table shows the cash-flow forecast for Saltmarsh Surf School in August.<br>' + t + 'Calculate the net cash flow for August. Give your answer in $, using a minus sign if it is negative.',
        'Total inflows = ' + fmt(s) + ' + ' + fmt(o) + ' = ' + fmt(ti) + '. Total outflows = ' + fmt(w) + ' + ' + fmt(sup) + ' + ' + fmt(rent) + ' = ' + fmt(to) + '. Net cash flow = ' + fmt(ti) + ' − ' + fmt(to) + ' = ' + money(n, '$') + '.');
    } },
    { skill: 'closing', gen: function () {
      var op = rint(10, 60) * 100, s = rint(100, 250) * 100, loan = pick([4000, 5000, 8000, 10000]), w = rint(40, 90) * 100, mat = rint(30, 80) * 100, ad = rint(5, 20) * 100;
      var ti = s + loan, to = w + mat + ad, n = ti - to, cl = op + n;
      var t = table(['September', '€'], [['Opening balance', fmt(op)], ['Sales receipts', fmt(s)], ['Bank loan received', fmt(loan)], ['Wages', fmt(w)], ['Materials', fmt(mat)], ['Advertising', fmt(ad)]]);
      return cashNum(cl, '€', 'Velvet Upholstery\'s cash-flow forecast for September is shown below.<br>' + t + 'Calculate the closing balance for September. Give your answer in €, using a minus sign if it is negative.',
        'Inflows = ' + fmt(s) + ' + ' + fmt(loan) + ' = ' + fmt(ti) + '. Outflows = ' + fmt(w) + ' + ' + fmt(mat) + ' + ' + fmt(ad) + ' = ' + fmt(to) + '. Net = ' + fmt(n) + '. Closing = ' + fmt(op) + ' + ' + sgn(n) + ' = ' + money(cl, '€') + '.');
    } },
    { skill: 'months', gen: function () {
      var op = rint(5, 30) * 100, i1 = rint(30, 80) * 100, o1 = rint(30, 80) * 100, i2 = rint(30, 80) * 100, o2 = rint(30, 80) * 100;
      var c1 = op + i1 - o1, c2 = c1 + i2 - o2;
      var t = table(['', 'July ($)', 'August ($)'], [['Opening balance', fmt(op), '?'], ['Cash inflows', fmt(i1), fmt(i2)], ['Cash outflows', fmt(o1), fmt(o2)]]);
      return cashNum(c2, '$', 'Brookside Dog Grooming\'s forecast is shown below.<br>' + t + 'Calculate the closing balance for <b>August</b>. Give your answer in $, using a minus sign if it is negative.',
        'July closing = ' + fmt(op) + ' + (' + fmt(i1) + ' − ' + fmt(o1) + ') = ' + money(c1, '$') + ', which is August\'s opening balance. August closing = ' + money(c1, '$') + ' + (' + fmt(i2) + ' − ' + fmt(o2) + ') = ' + money(c2, '$') + '.');
    } },
    { skill: 'missing', gen: function () {
      var inn = rint(50, 150) * 100, n = (Math.random() < 0.5 ? 1 : -1) * rint(5, 30) * 100, out = inn - n;
      return cashNum(out, '$', 'Juniper Bikes expects cash inflows of ' + money(inn, '$') + ' in May and a net cash flow of ' + money(n, '$') + '.<br>Calculate its total cash outflows for May. Give your answer in $.',
        'Net cash flow = inflows − outflows, so outflows = inflows − net cash flow = ' + money(inn, '$') + ' − ' + sg(n, '$') + ' = ' + money(out, '$') + '.');
    } },
    { skill: 'missing', gen: function () {
      var out = rint(50, 150) * 100, n = (Math.random() < 0.5 ? 1 : -1) * rint(5, 30) * 100, inn = out + n;
      return cashNum(inn, '$', 'In October, Cobalt Tiling expects cash outflows of ' + money(out, '$') + ' and a net cash flow of ' + money(n, '$') + '.<br>Calculate its cash inflows for October. Give your answer in $.',
        'Inflows − outflows = net cash flow, so inflows = outflows + net cash flow = ' + money(out, '$') + ' + ' + sg(n, '$') + ' = ' + money(inn, '$') + '.');
    } },
    { skill: 'missing', gen: function () {
      var op = rint(-20, 40) * 100, n = (Math.random() < 0.5 ? 1 : -1) * rint(5, 40) * 100, cl = op + n;
      return cashNum(op, '$', 'Maple Leaf Bakery\'s forecast shows a net cash flow of ' + money(n, '$') + ' for February and a closing balance of ' + money(cl, '$') + '.<br>Calculate its opening balance for February. Give your answer in $, using a minus sign if it is negative.',
        'Closing = opening + net cash flow, so opening = closing − net cash flow = ' + money(cl, '$') + ' − ' + sg(n, '$') + ' = ' + money(op, '$') + '.');
    } },
    { skill: 'missing', gen: function () {
      var rent = rint(15, 30) * 100, mat = rint(30, 70) * 100, w = rint(40, 90) * 100, other = rint(5, 15) * 100, tot = rent + mat + w + other;
      var t = table(['Cash outflows (December)', '$'], [['Rent', fmt(rent)], ['Materials', fmt(mat)], ['Wages', '?'], ['Utilities', fmt(other)], ['<b>Total cash outflows</b>', '<b>' + fmt(tot) + '</b>']]);
      return cashNum(w, '$', 'Part of the cash-flow forecast for Orbit Signs is shown below.<br>' + t + 'Calculate the missing figure for wages. Give your answer in $.',
        'Wages = total outflows − the other outflows = ' + fmt(tot) + ' − (' + fmt(rent) + ' + ' + fmt(mat) + ' + ' + fmt(other) + ') = ' + money(w, '$') + '.');
    } },
    { skill: 'method', gen: function () {
      var op = rint(10, 50) * 1000, inn = rint(20, 60) * 1000, out = rint(20, 70) * 1000, n, cl, opts;
      do { inn = rint(20, 60) * 1000; out = rint(20, 70) * 1000; n = inn - out; cl = op + n; opts = [cl, n, op + inn + out, op - n]; } while (n === 0 || new Set(opts).size < 4);
      return { kind: 'mcq', q: 'A furniture importer has an opening balance of ' + money(op, '$') + '. In the month it expects cash inflows of ' + money(inn, '$') + ' and cash outflows of ' + money(out, '$') + '. What is the closing balance?',
        options: opts.map(function (v) { return money(v, '$'); }), answer: 0,
        why: 'Net cash flow = ' + money(inn, '$') + ' − ' + money(out, '$') + ' = ' + money(n, '$') + '. Closing = ' + money(op, '$') + ' + ' + sg(n, '$') + ' = ' + money(cl, '$') + '. ' + money(n, '$') + ' stops at net cash flow, and the other options add the outflows or subtract the net figure.' };
    } },
    { skill: 'method', gen: function () {
      var inn = rint(20, 60) * 100, out = inn + rint(3, 25) * 100, n = inn - out;
      return { kind: 'mcq', q: 'A dance school expects cash inflows of ' + money(inn, '$') + ' and cash outflows of ' + money(out, '$') + ' in January. What is its net cash flow?',
        options: [money(n, '$'), money(-n, '$'), money(inn + out, '$'), money(out, '$')], answer: 0,
        why: 'Net cash flow = inflows − outflows = ' + money(inn, '$') + ' − ' + money(out, '$') + ' = ' + money(n, '$') + '. It is negative, so the minus sign matters; ' + money(-n, '$') + ' has subtracted the wrong way round.' };
    } },
    { skill: 'method', kind: 'mcq', q: 'Which calculation gives the closing balance in a cash-flow forecast?', options: ['Opening balance + net cash flow', 'Opening balance − net cash flow', 'Cash inflows + cash outflows', 'Net cash flow − opening balance'], answer: 0,
      why: 'Start with the cash at the beginning of the month and add the net cash flow (which may be negative) to get the cash at the end.' },
    { skill: 'months', kind: 'mcq', q: 'A cash-flow forecast shows a closing balance of −$1,200 for March. Which statement is correct?', options: ['April\'s opening balance will be −$1,200', 'April\'s opening balance will be $0', 'April\'s opening balance will be $1,200', 'April\'s net cash flow will be −$1,200'], answer: 0,
      why: 'Each month\'s closing balance is carried forward as the next month\'s opening balance, including when it is negative (an overdraft).' },
    { skill: 'closing', gen: function () {
      var op = rint(50, 400), inn = rint(200, 900), out = rint(200, 900), cl = op + inn - out;
      var t = table(['', '$000'], [['Opening balance', fmt(op)], ['Cash inflows', fmt(inn)], ['Cash outflows', fmt(out)]]);
      return cashNum(cl, '$000', 'Tundra Freight\'s forecast for one month is shown in thousands of dollars ($000).<br>' + t + 'Calculate the closing balance in $000, using a minus sign if it is negative.',
        'Net cash flow = ' + fmt(inn) + ' − ' + fmt(out) + ' = ' + fmt(inn - out) + '. Closing balance = ' + fmt(op) + ' + ' + sgn(inn - out) + ' = ' + fmt(cl) + ' ($000), which is ' + money(cl * 1000, '$') + '.');
    } },
    { skill: 'months', gen: function () {
      var op = rint(10, 40) * 100, ins = [], outs = [], i, bal = op;
      for (i = 0; i < 3; i++) { ins.push(rint(30, 80) * 100); outs.push(rint(30, 80) * 100); bal += ins[i] - outs[i]; }
      var t = table(['', 'Jan ($)', 'Feb ($)', 'Mar ($)'], [['Cash inflows', fmt(ins[0]), fmt(ins[1]), fmt(ins[2])], ['Cash outflows', fmt(outs[0]), fmt(outs[1]), fmt(outs[2])]]);
      var b1 = op + ins[0] - outs[0], b2 = b1 + ins[1] - outs[1];
      return cashNum(bal, '$', 'Echo Music Lessons has an opening balance of ' + money(op, '$') + ' on 1 January.<br>' + t + 'Calculate the closing balance at the end of <b>March</b>. Give your answer in $, using a minus sign if it is negative.',
        'January closing = ' + money(b1, '$') + '; February closing = ' + money(b2, '$') + '; March closing = ' + money(b2, '$') + ' + (' + fmt(ins[2]) + ' − ' + fmt(outs[2]) + ') = ' + money(bal, '$') + '.');
    } },
    { skill: 'net', gen: function () {
      var ins = [], outs = [], i;
      for (i = 0; i < 3; i++) { ins.push(rint(20, 70) * 100); outs.push(rint(20, 70) * 100); }
      var ti = ins[0] + ins[1] + ins[2], to = outs[0] + outs[1] + outs[2];
      var t = table(['', 'Apr ($)', 'May ($)', 'Jun ($)'], [['Cash inflows', fmt(ins[0]), fmt(ins[1]), fmt(ins[2])], ['Cash outflows', fmt(outs[0]), fmt(outs[1]), fmt(outs[2])]]);
      return cashNum(ti - to, '$', 'The table shows the forecast for Ivy Lane Florist for April to June.<br>' + t + 'Calculate the total net cash flow for the three months. Give your answer in $, using a minus sign if it is negative.',
        'Total inflows = ' + fmt(ti) + '; total outflows = ' + fmt(to) + '. Net cash flow for the three months = ' + fmt(ti) + ' − ' + fmt(to) + ' = ' + money(ti - to, '$') + '.');
    } },
    { skill: 'months', gen: function () {
      var op = rint(5, 20) * 1000, nets, bals, i, low;
      do { nets = []; bals = []; var b = op; for (i = 0; i < 4; i++) { var n = rint(-8, 6) * 1000; nets.push(n); b += n; bals.push(b); } low = bals.indexOf(Math.min.apply(null, bals)); } while (new Set(bals).size < 4 || nets.indexOf(Math.min.apply(null, nets)) === low);
      var t = table(['', 'Jan', 'Feb', 'Mar', 'Apr'], [['Net cash flow ($)'].concat(nets.map(br))]);
      return { kind: 'mcq', q: 'Granite Gym has an opening balance of ' + money(op, '$') + ' on 1 January. Its forecast net cash flows are shown (brackets mean negative).<br>' + t + 'In which month is its closing balance lowest?',
        options: ['January', 'February', 'March', 'April'], answer: low, keepOrder: true,
        why: 'Closing balances: January ' + money(bals[0], '$') + ', February ' + money(bals[1], '$') + ', March ' + money(bals[2], '$') + ', April ' + money(bals[3], '$') + '. The lowest is in ' + ['January', 'February', 'March', 'April'][low] + '. The month with the most negative net cash flow is not always the month with the lowest balance.' };
    } },
    { skill: 'months', gen: function () {
      var op = rint(5, 40) * 100, inn = rint(30, 90) * 100, out = rint(30, 90) * 100, cl = op + inn - out;
      return cashNum(cl, '£', 'Rowan Pottery\'s forecast for October shows an opening balance of ' + money(op, '£') + ', cash inflows of ' + money(inn, '£') + ' and cash outflows of ' + money(out, '£') + '.<br>What will its opening balance be for <b>November</b>? Give your answer in £, using a minus sign if it is negative.',
        'October closing = ' + money(op, '£') + ' + (' + money(inn, '£') + ' − ' + money(out, '£') + ') = ' + money(cl, '£') + '. This becomes November\'s opening balance.');
    } },
    { skill: 'closing', gen: function () {
      var op = rint(5, 30) * 100, inn = rint(60, 120) * 100, out = rint(40, 90) * 100, late = rint(10, 30) * 100, cl = op + (inn - late) - out;
      return cashNum(cl, '$', 'Summit Scaffolding forecast an opening balance of ' + money(op, '$') + ', inflows of ' + money(inn, '$') + ' and outflows of ' + money(out, '$') + ' for May. A customer then says it will pay ' + money(late, '$') + ' of that inflow in June instead.<br>Calculate the new closing balance for May. Give your answer in $, using a minus sign if it is negative.',
        'New inflows = ' + money(inn, '$') + ' − ' + money(late, '$') + ' = ' + money(inn - late, '$') + '. Net cash flow = ' + money(inn - late, '$') + ' − ' + money(out, '$') + ' = ' + money(inn - late - out, '$') + '. Closing = ' + money(op, '$') + ' + ' + sg(inn - late - out, '$') + ' = ' + money(cl, '$') + '.');
    } },
    { skill: 'closing', gen: function () {
      var op = rint(5, 20) * 100, inn = rint(30, 60) * 100, out = op + inn + rint(5, 30) * 100, cl = op + inn - out;
      return cashNum(-cl, '$', 'Nova Tech Repairs has an opening balance of ' + money(op, '$') + ' for July, expected inflows of ' + money(inn, '$') + ' and expected outflows of ' + money(out, '$') + '.<br>How large an overdraft will it need by the end of July to avoid running out of cash? Give your answer in $.',
        'Closing balance = ' + money(op, '$') + ' + (' + money(inn, '$') + ' − ' + money(out, '$') + ') = ' + money(cl, '$') + '. The business is ' + money(-cl, '$') + ' short, so it needs an overdraft of at least ' + money(-cl, '$') + '.');
    } }
  ] };

  /* =====================================================================
     BUS-S3-03 Sources of finance and why businesses need finance
     ===================================================================== */
  B['BUS-S3-03'] = { title: 'Sources of finance and why businesses need finance', items: [
    { skill: 'classify', kind: 'multi', q: 'Which <b>three</b> of these are <b>internal</b> sources of finance?', options: ['Retained profit', 'Selling assets the business no longer needs', 'The owner\'s personal savings', 'A bank loan', 'Trade credit from suppliers', 'Crowdfunding'], answers: [0, 1, 2],
      why: 'Internal sources come from inside the business or its owner: retained profit, selling unwanted assets and personal savings. Loans, trade credit and crowdfunding come from outside, so they are external.' },
    { skill: 'classify', kind: 'mcq', q: 'Which item below is an <b>external</b> source of finance?', options: ['Venture capital', 'Retained profit', 'Selling unused machinery', 'The owner\'s savings'], answer: 0,
      why: 'Venture capital comes from specialist investors outside the business. The other three come from within the business or its owner.' },
    { skill: 'classify', kind: 'mcq', q: 'How is a bank overdraft best classified?', options: ['External and short-term', 'Internal and short-term', 'External and long-term', 'Internal and long-term'], answer: 0,
      why: 'An overdraft comes from a bank (external) and is used to cover short gaps in cash, usually for less than a year (short-term).' },
    { skill: 'classify', kind: 'mcq', q: 'Which of these is <b>not</b> a source of finance?', options: ['Revenue from the day-to-day sale of products', 'Selling a building the business no longer uses', 'Money raised by issuing new shares', 'A loan from a bank'], answer: 0,
      why: 'Normal sales revenue is income from trading, not a way of raising finance. Selling an unused asset, issuing shares and borrowing are all sources of finance.' },
    { skill: 'meaning', kind: 'mcq', q: 'What is <b>retained profit</b>?', options: ['Profit kept in the business from earlier years instead of being paid out to owners', 'Money borrowed from a bank that is then repaid out of the profits of future years', 'Profit paid out to shareholders as a dividend each year', 'The total revenue a business has earned since it started'], answer: 0,
      why: 'Retained profit is profit the owners choose to keep in the business. It is an internal source, so there is no interest to pay and nothing to repay.' },
    { skill: 'meaning', kind: 'mcq', q: 'What is an <b>overdraft</b>?', options: ['Permission from a bank to take out more money than is in the account', 'A loan from many people, each giving a small amount through a website', 'A fixed sum borrowed and repaid in instalments over five years', 'Money given by investors in return for part of the business'], answer: 0,
      why: 'An overdraft lets the account go below zero up to an agreed limit. The other options describe crowdfunding, a bank loan and venture capital or share capital.' },
    { skill: 'meaning', kind: 'mcq', q: 'What is <b>trade credit</b>?', options: ['Buying goods from a supplier now and paying for them later', 'Selling goods to customers and receiving payment immediately', 'Borrowing money from a bank to buy raw materials', 'Paying a supplier in advance to secure a discount'], answer: 0,
      why: 'Trade credit (trade payables) means the supplier lets the business pay later, often 30–60 days. It keeps cash in the business for longer.' },
    { skill: 'meaning', kind: 'mcq', q: 'What is <b>venture capital</b>?', options: ['Money from specialist investors in new or risky businesses, in return for a share of ownership', 'Money borrowed from a bank that must be repaid with interest in monthly instalments over several years', 'Small amounts of money given by many members of the public on a website', 'Money raised by selling shares to the general public on the stock market'], answer: 0,
      why: 'Venture capitalists invest in risky businesses with growth potential and take a share of ownership, often giving advice too. The others are a loan, crowdfunding and a share issue.' },
    { skill: 'meaning', kind: 'mcq', q: 'What is <b>crowdfunding</b>?', options: ['Raising money from a large number of people, each giving a small amount, usually online', 'Raising money from one specialist investor who takes a large share of the business', 'Raising money by selling shares on the stock market to large financial institutions', 'Raising money by asking existing suppliers to wait longer before being paid'], answer: 0,
      why: 'Crowdfunding collects many small contributions, usually through a website. The other options describe venture capital, a stock-market share issue and trade credit.' },
    { skill: 'features', kind: 'mcq', q: 'Lina runs a bakery as a sole trader. Why can she <b>not</b> raise finance through share capital?', options: ['Only companies can issue shares', 'Sole traders are not allowed to borrow money', 'Share capital is short-term finance meant for paying bills', 'Shares would give the bank control of the bakery'], answer: 0,
      why: 'Shares are parts of ownership in a company. A sole trader is not a company, so she would need other sources such as savings, a loan or an overdraft.' },
    { skill: 'features', kind: 'mcq', q: 'What is the main advantage of using personal savings to start a business?', options: ['There is no interest to pay and no lender to repay', 'It spreads the risk of the business across many investors', 'Savings bring expert advice from outside investors', 'Using savings means the owner takes no personal risk'], answer: 0,
      why: 'Savings are the owner\'s own money, so there is no interest or repayment. However, the owner risks losing the savings, and the amount may be limited.' },
    { skill: 'features', kind: 'mcq', q: 'What is the main drawback for the owners of using venture capital?', options: ['They give up part of the ownership and some control', 'They must pay interest on the money, which raises costs', 'It must be repaid in full within twelve months', 'The business must offer its premises as security'], answer: 0,
      why: 'Venture capitalists take a share of the business in return for their money, so the owners lose some control and a share of future profits. It is not a loan, so there is no interest.' },
    { skill: 'features', kind: 'mcq', q: 'What is a drawback of a bank loan compared with retained profit?', options: ['Interest must be paid, which adds to the business\'s costs', 'The owners must give the bank a share of ownership in the business', 'It must be repaid within 30 days, like trade credit', 'It is an internal source, so it takes longer to arrange'], answer: 0,
      why: 'A loan must be repaid with interest, raising costs and committing future cash. Retained profit has no interest or repayment, and a bank does not take ownership.' },
    { skill: 'need', kind: 'mcq', q: 'A shoe shop needs extra cash for six weeks each year to buy stock before the festive season. Which source is most suitable?', options: ['An overdraft', 'Issuing new shares', 'Venture capital', 'A ten-year bank loan'], answer: 0,
      why: 'The need is small and short-term. An overdraft is flexible and only costs interest on the amount used. Shares, venture capital and a ten-year loan suit long-term needs.' },
    { skill: 'need', kind: 'mcq', q: 'A manufacturer needs $2 million to build a new factory that it will use for 30 years. Which type of finance best matches this need?', options: ['Long-term finance such as a bank loan or share capital', 'Short-term finance such as an overdraft', 'Trade credit from its raw material suppliers for 30 to 60 days', 'The cash in the tills from this week\'s sales'], answer: 0,
      why: 'A factory is a large, long-lasting asset, so it needs long-term finance. Overdrafts and trade credit are short-term and far too small and expensive for this.' },
    { skill: 'need', kind: 'mcq', q: 'A large public limited company wants to raise $50 million to expand overseas without taking on more debt. Which source is most suitable?', options: ['Issuing new shares on the stock market', 'An overdraft from its bank', 'Crowdfunding from its customers', 'The managers\' personal savings'], answer: 0,
      why: 'A plc can sell shares to the public on the stock market, raising very large sums that do not have to be repaid. The other sources are too small or are debt.' },
    { skill: 'need', kind: 'mcq', q: 'Two graduates have a new idea for a medical app. They have no profits yet, few assets to offer a bank, and would welcome expert business advice. Which source is most suitable?', options: ['Venture capital', 'Retained profit', 'An overdraft', 'Trade credit'], answer: 0,
      why: 'Venture capitalists fund risky new businesses with growth potential and often provide advice. The founders have no retained profit, and an overdraft or trade credit would not fund development.' },
    { skill: 'need', kind: 'mcq', q: 'A community group wants $20,000 to open a bike-repair workshop that will train young people. Many local people support the idea. Which source fits best?', options: ['Crowdfunding from local supporters', 'Issuing shares on the stock market', 'Retained profit from previous years', 'A long-term loan secured on its building'], answer: 0,
      why: 'Crowdfunding works well when many people support a cause and each can give a small amount. A new group has no retained profit, cannot list shares and may have no building to secure a loan.' },
    { skill: 'need', kind: 'mcq', q: 'A furniture shop owns a second warehouse it stopped using last year. It needs $80,000 to refit its showroom. Which internal source could it use?', options: ['Selling the unused warehouse', 'Borrowing from its bank', 'Asking suppliers for longer credit', 'Raising money through crowdfunding'], answer: 0,
      why: 'Selling an asset the business no longer needs turns it into cash without borrowing. The other three are external sources.' },
    { skill: 'justify', kind: 'multi', q: 'A student starts: <i>"A drawback of a bank loan is that interest must be paid."</i> Which <b>two</b> statements best develop this point?', options: ['This increases the business\'s costs each month', 'So profit is lower and less is left to reinvest in growth', 'A bank loan is an external source of finance', 'Retained profit is an internal source of finance', 'Loans are usually long-term finance'], answers: [0, 1],
      why: 'The chain links the feature (interest) to its effect (higher costs) and the consequence (lower profit, less to reinvest). Classifying the source does not develop the drawback.' },
    { skill: 'justify', kind: 'mcq', q: 'Kumar & Sons, a family-owned private limited company, needs $300,000 to expand. The family wants to keep full control. Which is the best justified choice?', options: ['A bank loan, because the family keeps full ownership, although interest will raise costs', 'Selling shares to outside investors, because the money never has to be repaid', 'Venture capital, because the investors will leave all decisions to the family', 'An overdraft, because it is the cheapest way to fund a long-term expansion'], answer: 0,
      why: 'Keeping control is the family\'s priority, and a loan does not give away ownership. Selling shares or venture capital would bring in new owners, and an overdraft is short-term and expensive for a large expansion.' },
    { skill: 'justify', kind: 'mcq', q: 'A shop owner plans to use retained profit to open a second branch. Which is the strongest counter-argument?', options: ['Using it all may leave too little to cover unexpected costs at the first shop', 'Retained profit must be repaid to the bank with interest once the new branch is open', 'Retained profit gives part of the business away to investors', 'Retained profit is an external source, so a lender must approve the plan'], answer: 0,
      why: 'Retained profit is free of interest and repayment, but it is limited. Spending it all on expansion could leave the business without a cushion for emergencies.' },
    { skill: 'justify', kind: 'mcq', q: 'Zara says: <i>"Crowdfunding is free money, so it is always the best source of finance."</i> What is the main flaw in her judgement?', options: ['Campaigns can fail to reach their target and backers often expect rewards or a share', 'Crowdfunding is internal finance because the money comes from customers', 'Crowdfunding is short-term finance that must be repaid within a year', 'Crowdfunding backers take full control of the business'], answer: 0,
      why: 'Crowdfunding is not guaranteed: many campaigns miss their target, and backers may expect products, rewards or equity. The idea must also be shared publicly, so rivals could copy it.' },
    { skill: 'need', kind: 'mcq', q: 'Which of these is a reason a business needs <b>long-term</b> finance?', options: ['To buy new machinery that will be used for many years', 'To pay this month\'s electricity bill', 'To cover wages during a quiet fortnight', 'To buy stock for a weekend sale'], answer: 0,
      why: 'Long-term finance pays for large items that last a long time, such as machinery, or for expansion. Bills, wages and stock for a short period are short-term needs.' },
    { skill: 'features', kind: 'multi', q: 'Ben is a sole trader running a window-cleaning business. Which <b>three</b> sources of finance could he use?', options: ['His personal savings', 'A bank loan', 'A bank overdraft', 'Issuing shares on the stock market', 'Selling shares to friends and family'], answers: [0, 1, 2],
      why: 'A sole trader can use savings, loans and overdrafts. A sole trader is not a company, so he cannot sell shares to anyone, whether on the stock market or to friends and family.' },
    { skill: 'justify', kind: 'mcq', q: 'A student is deciding between an overdraft and a bank loan for a bookshop owner. Which statement shows what the choice should <b>depend on</b>?', options: ['How much money is needed and for how long, since overdrafts suit short gaps and loans suit larger long-term needs', 'Which has the lower interest rate, whatever the amount or time needed', 'Whether the owner wants to keep control, since a loan gives the bank part of the business', 'Which is internal finance, since both come from the owner\'s own bank account'], answer: 0,
      why: 'The right source depends on the amount, the length of time it is needed, the cost and the effect on control. Interest rate alone ignores the time needed, a loan does not give the bank ownership, and both are external.' }
  ] };
})();
