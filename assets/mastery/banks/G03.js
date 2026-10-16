/* Group G03 mastery bank: Statement of financial position and ratio calculations; Judging ratios, exchange rates, failure and market change. Original questions, not copied from past papers. */
(function () {
  'use strict';
  var B = window.MASTERY_BANKS = window.MASTERY_BANKS || {};
  var R = window.Mastery;   // R.roundDp(x, dp), R.roundSf(x, n): correct half-up rounding

  function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function money(n) {
    var s = String(Math.abs(n)).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (n < 0 ? '-' : '') + s.join('.');
  }
  function d2(x) { return R.roundDp(x, 2).toFixed(2); }
  function d1(x) { return R.roundDp(x, 1).toFixed(1); }
  function tbl(head, rows) {
    var h = '<table class="mc-table">';
    if (head) h += '<tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>';
    rows.forEach(function (r) { h += '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; });
    return h + '</table>';
  }
  function retry(f) { for (var i = 0; i < 500; i++) { var q = f(); if (q) return q; } throw new Error('generator could not find clean values'); }
  function distinct(a) { var s = {}; for (var i = 0; i < a.length; i++) { var k = String(a[i]); if (s[k]) return false; s[k] = 1; } return true; }
  function ratioNum(q, val, why) { return { kind: 'num', q: q, answer: R.roundDp(val, 2), unit: ':1', tol: 0.005, display: d2(val) + ':1', why: why }; }
  function pctNum(q, val, why) { return { kind: 'num', q: q, answer: R.roundDp(val, 2), unit: '%', tol: 0.005, display: d2(val) + '%', why: why }; }
  // A ratio x (0.4 to 3.4) that is never close to 1, so upside-down answers are clearly different.
  function ratioVal(lo, hi) { var r; do { r = rint(lo * 100, hi * 100) / 100; } while (Math.abs(r - 1) < 0.12); return r; }

  var SHOPS = ['Kestrel Cycles', 'Amberly Bakes', 'Novaline Print', 'Tidewater Kayaks', 'Orchid Lane Florists', 'Brightforge Tools',
    'Selva Coffee Roasters', 'Halden Furniture', 'Pinecrest Pet Supplies', 'Marlow Garden Centre', 'Zephyr Scooters', 'Lumen Lighting',
    'Quarry Hill Ceramics', 'Bluewing Drones', 'Harbour Fresh Fish', 'Indigo Textiles', 'Copperleaf Tea House', 'Northgate Opticians'];
  function biz() { return pick(SHOPS); }
  function twoBiz() { var a = biz(), b; do { b = biz(); } while (b === a); return [a, b]; }
  // Current liabilities between 2,000 and 60,000, in steps of 50.
  function clVal() { return rint(40, 1200) * 50; }
  function round10(x) { return Math.round(x / 10) * 10; }

  /* ===================================================== BUS-CALC-17 current ratio */
  B['BUS-CALC-17'] = { title: 'Calculate the current ratio', items: [
    { skill: 'direct', gen: function () {
      var cl = clVal(), ca = round10(cl * ratioVal(0.6, 3.2)), n = biz(), v = ca / cl;
      return ratioNum(n + ' has current assets of $' + money(ca) + ' and current liabilities of $' + money(cl) + '.<br>Calculate the current ratio. Give your answer to 2 decimal places.',
        v, 'Current ratio = current assets ÷ current liabilities = ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1 to 2 decimal places.');
    } },
    { skill: 'direct', gen: function () {
      var cl = rint(80, 900), ca = Math.round(cl * ratioVal(0.7, 2.8)), v = ca / cl;
      return ratioNum('The figures below come from the statement of financial position of ' + biz() + '.' +
        tbl(['', '$000'], [['Current assets', money(ca)], ['Current liabilities', money(cl)]]) + 'Calculate the current ratio, to 2 decimal places.',
        v, 'Both figures are in $000, so the units cancel: ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'direct', gen: function () {
      var cl = rint(12, 75) / 10, ca = R.roundDp(cl * ratioVal(0.6, 2.6), 1), v = ca / cl;
      return ratioNum('A clothing chain reports current assets of $' + ca.toFixed(1) + ' million and current liabilities of $' + cl.toFixed(1) + ' million.<br>Calculate its current ratio to 2 decimal places.',
        v, 'Divide current assets by current liabilities. Millions cancel out: ' + ca.toFixed(1) + ' ÷ ' + cl.toFixed(1) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'direct', gen: function () {
      var cl = clVal(), ca = round10(cl * rint(42, 88) / 100), v = ca / cl;
      return ratioNum(biz() + ' owes $' + money(cl) + ' in current liabilities. Its current assets total $' + money(ca) + '.<br>Calculate the current ratio. Give your answer to 2 decimal places.',
        v, money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1. The ratio is below 1, so current assets would not cover the short-term debts.');
    } },
    { skill: 'components', gen: function () {
      var cl = clVal(), ca = round10(cl * ratioVal(0.7, 3)), inv = round10(ca * rint(25, 50) / 100), rec = round10(ca * rint(15, 35) / 100), cash = ca - inv - rec, v = ca / cl;
      return ratioNum('At the year end ' + biz() + ' held inventory of $' + money(inv) + ', was owed $' + money(rec) + ' by customers and had cash of $' + money(cash) + '. Its current liabilities were $' + money(cl) + '.<br>Calculate the current ratio to 2 decimal places.',
        v, 'Current assets = ' + money(inv) + ' + ' + money(rec) + ' + ' + money(cash) + ' = ' + money(ca) + '. Current ratio = ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1. Inventory stays in for the current ratio.');
    } },
    { skill: 'components', gen: function () {
      var cl = clVal(), od = round10(cl * rint(20, 45) / 100), tp = cl - od, ca = round10(cl * ratioVal(0.6, 2.8)), v = ca / cl;
      return ratioNum(biz() + ' has current assets of $' + money(ca) + '. It owes suppliers $' + money(tp) + ' (due within 60 days) and has a bank overdraft of $' + money(od) + '.<br>Calculate the current ratio to 2 decimal places.',
        v, 'Current liabilities = ' + money(tp) + ' + ' + money(od) + ' = ' + money(cl) + '. Current ratio = ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'components', gen: function () {
      var cl = clVal(), od = round10(cl * rint(25, 50) / 100), tp = cl - od, ca = round10(cl * ratioVal(0.7, 2.6)), inv = round10(ca * rint(30, 55) / 100), cash = ca - inv,
        loan = rint(4, 20) * 5000, v = ca / cl;
      return ratioNum(biz() + ' has inventory of $' + money(inv) + ' and cash of $' + money(cash) + '. It owes suppliers $' + money(tp) + ', has an overdraft of $' + money(od) + ' and a bank loan of $' + money(loan) + ' repayable in 6 years.<br>Calculate the current ratio to 2 decimal places.',
        v, 'Current assets = ' + money(inv) + ' + ' + money(cash) + ' = ' + money(ca) + '. Current liabilities = ' + money(tp) + ' + ' + money(od) + ' = ' + money(cl) + '. The 6-year loan is non-current, so it is left out. ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'from-statement', gen: function () {
      var cl = rint(60, 700), ca = Math.round(cl * ratioVal(0.6, 2.9)), nca = rint(4, 30) * 50, ncl = rint(2, 20) * 25, v = ca / cl;
      return ratioNum('Extract from the statement of financial position of ' + biz() + ':' +
        tbl(['', '$000'], [['Non-current assets', money(nca)], ['Current assets', money(ca)], ['Current liabilities', money(cl)], ['Non-current liabilities', money(ncl)]]) +
        'Calculate the current ratio, to 2 decimal places.',
        v, 'Use only the current lines: ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1. Non-current assets and liabilities are not part of this ratio.');
    } },
    { skill: 'from-statement', gen: function () {
      var y = rint(2022, 2024), cl1 = rint(60, 500), ca1 = Math.round(cl1 * ratioVal(0.7, 2.6)), cl2 = rint(60, 500), ca2 = Math.round(cl2 * ratioVal(0.7, 2.6)),
        ask = pick([0, 1]), ca = ask ? ca2 : ca1, cl = ask ? cl2 : cl1, v = ca / cl;
      return ratioNum('Selected figures for ' + biz() + ':' +
        tbl(['', y + ' ($000)', (y + 1) + ' ($000)'], [['Current assets', money(ca1), money(ca2)], ['Current liabilities', money(cl1), money(cl2)]]) +
        'Calculate the current ratio for ' + (y + ask) + '. Give your answer to 2 decimal places.',
        v, 'Use the ' + (y + ask) + ' column: ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'from-statement', gen: function () {
      var cl = rint(50, 600), ca = Math.round(cl * ratioVal(0.6, 2.8)), rev = rint(8, 40) * 100, gp = Math.round(rev * rint(30, 55) / 100), v = ca / cl;
      return ratioNum('Financial information for ' + biz() + ':' +
        tbl(['', '$000'], [['Revenue', money(rev)], ['Gross profit', money(gp)], ['Current assets', money(ca)], ['Current liabilities', money(cl)]]) +
        'Calculate the current ratio to 2 decimal places.',
        v, 'Revenue and gross profit belong to the income statement and are not needed. ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'rounding', gen: function () {
      var cl = clVal(), ca = round10(cl * ratioVal(0.6, 3.2)), v = ca / cl;
      return { kind: 'num', q: biz() + ' has current assets of $' + money(ca) + ' and current liabilities of $' + money(cl) + '.<br>Calculate the current ratio. Give your answer to <b>1 decimal place</b>.',
        answer: R.roundDp(v, 1), unit: ':1', tol: 0.05, display: d1(v) + ':1',
        why: money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ' to 2 decimal places, which is ' + d1(v) + ':1 to 1 decimal place. Always follow the rounding the question asks for.' };
    } },
    { skill: 'rounding', gen: function () {
      var cl = clVal(), ca = round10(cl * ratioVal(0.45, 3.2)), v = ca / cl, a = R.roundSf(v, 2), dp = v < 1 ? 2 : 1;
      return { kind: 'num', q: 'A dental practice has current assets of $' + money(ca) + ' and current liabilities of $' + money(cl) + '.<br>Calculate its current ratio to <b>2 significant figures</b>.',
        answer: a, unit: ':1', tol: dp === 2 ? 0.005 : 0.05, display: a.toFixed(dp) + ':1',
        why: money(ca) + ' ÷ ' + money(cl) + ' = ' + R.roundDp(v, 3).toFixed(3) + ' to 3 decimal places, so the ratio is ' + a.toFixed(dp) + ':1 to 2 significant figures.' };
    } },
    { skill: 'rounding', gen: function () {
      var ca = rint(11, 39) * 100000, cl = round10(ca / ratioVal(0.7, 2.8)), v = ca / cl;
      return ratioNum('A small airline’s current assets are $' + R.roundDp(ca / 1e6, 1).toFixed(1) + ' million. Its current liabilities are $' + money(cl) + '.<br>Calculate the current ratio to 2 decimal places.',
        v, 'Put both figures in the same units first: $' + R.roundDp(ca / 1e6, 1).toFixed(1) + ' million = $' + money(ca) + '. Then ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'error-spot', gen: function () {
      return retry(function () {
        var cl = clVal(), ca = round10(cl * ratioVal(1.3, 3)), inv = round10(ca * rint(30, 50) / 100), err = rint(0, 2), shown;
        if (err === 0) shown = d2(cl / ca); else if (err === 1) shown = d2((ca - inv) / cl); else shown = '$' + money(ca - cl);
        if (shown === d2(ca / cl)) return null;
        var opts = ['Divided current liabilities by current assets', 'Took inventory away from current assets first', 'Subtracted current liabilities from current assets', 'Added inventory to current liabilities'];
        return { kind: 'mcq', q: biz() + ' has current assets of $' + money(ca) + ' (including inventory of $' + money(inv) + ') and current liabilities of $' + money(cl) + '. A student gave the current ratio as <b>' + shown + '</b>.<br>What mistake did the student make?',
          options: opts, answer: err,
          why: 'The correct current ratio is ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(ca / cl) + ':1. ' + ['Dividing ' + money(cl) + ' by ' + money(ca) + ' gives ' + shown + ', the ratio upside down.', 'Removing inventory gives ' + shown + ', which is the acid test ratio, not the current ratio.', money(ca) + ' − ' + money(cl) + ' = ' + money(ca - cl) + ' is a subtraction, not a ratio.'][err] };
      });
    } },
    { skill: 'set-up', gen: function () {
      var cl = clVal(), ca = round10(cl * ratioVal(1.2, 3)), inv = round10(ca * rint(25, 45) / 100);
      return { kind: 'mcq', q: biz() + ' has current assets of $' + money(ca) + ', inventory of $' + money(inv) + ' and current liabilities of $' + money(cl) + '. Which working gives its current ratio?',
        options: [money(ca) + ' ÷ ' + money(cl), money(cl) + ' ÷ ' + money(ca), '(' + money(ca) + ' − ' + money(inv) + ') ÷ ' + money(cl), money(ca) + ' − ' + money(cl)], answer: 0,
        why: 'Current ratio = current assets ÷ current liabilities, so ' + money(ca) + ' ÷ ' + money(cl) + ' = ' + d2(ca / cl) + ':1. Removing inventory would give the acid test ratio instead.' };
    } },
    { skill: 'set-up', kind: 'mcq', q: 'Which formula gives the current ratio?',
      options: ['Current assets ÷ current liabilities', 'Current liabilities ÷ current assets', '(Current assets − inventory) ÷ current liabilities', 'Current assets − current liabilities'], answer: 0,
      why: 'The current ratio compares everything the business will turn into cash within a year with the debts it must pay within a year: current assets ÷ current liabilities, written as x:1.' },
    { skill: 'meaning', kind: 'mcq', q: 'A florist calculates a current ratio of 0.80:1. What does this show?',
      options: ['It has $0.80 of current assets for every $1 of current liabilities', 'It makes $0.80 of profit for every $1 of sales', 'It has $0.80 of current liabilities for every $1 of current assets', 'Its current assets are 80% higher than its current liabilities'], answer: 0,
      why: 'The ratio is current assets ÷ current liabilities, so 0.80:1 means only 80 cents of current assets for each $1 owed in the short term. The current assets would not cover its short-term debts.' },
    { skill: 'meaning', kind: 'multi', q: 'A sports shop is calculating its current ratio. Which items should it include in <b>current assets</b>?',
      options: ['Trainers and football kits held for sale', 'Cash in the shop’s bank account', 'Money owed by a school that bought kits on credit', 'The shop’s display stands and tills', 'Money owed to a sportswear supplier'], answers: [0, 1, 2],
      why: 'Inventory, cash and money owed by customers will all turn into cash within a year, so they are current assets. Display stands and tills are non-current assets, and money owed to a supplier is a current liability.' },
    { skill: 'reverse', gen: function () {
      var r = pick([1.25, 1.5, 1.75, 2, 2.25, 2.5, 0.75, 0.8]), cl = rint(10, 150) * 400, ca = Math.round(cl * r);
      return { kind: 'num', q: biz() + ' has a current ratio of ' + d2(r) + ':1 and current liabilities of $' + money(cl) + '.<br>Calculate its current assets in $.',
        answer: ca, unit: '$', display: money(ca),
        why: 'Current assets ÷ current liabilities = ' + d2(r) + ', so current assets = ' + d2(r) + ' × ' + money(cl) + ' = $' + money(ca) + '.' };
    } },
    { skill: 'reverse', gen: function () {
      var r = pick([1.25, 1.6, 2, 2.5, 3.2, 0.8]), cl = rint(10, 150) * 500, ca = Math.round(cl * r);
      return { kind: 'num', q: 'A printing firm has current assets of $' + money(ca) + '. Its current ratio is ' + d2(r) + ':1.<br>Calculate its current liabilities in $.',
        answer: cl, unit: '$', display: money(cl),
        why: 'Current liabilities = current assets ÷ current ratio = ' + money(ca) + ' ÷ ' + d2(r) + ' = $' + money(cl) + '.' };
    } },
    { skill: 'compare', gen: function () {
      return retry(function () {
        var n = twoBiz(), clA = clVal(), clB = clVal(), caA = round10(clA * ratioVal(0.6, 3)), caB = round10(clB * ratioVal(0.6, 3)), rA = R.roundDp(caA / clA, 2), rB = R.roundDp(caB / clB, 2);
        if (Math.abs(rA - rB) < 0.1) return null;
        if ((caA > caB) === (rA > rB)) return null;   // the business with more current assets has the lower ratio
        return { kind: 'mcq', q: tbl(['', n[0], n[1]], [['Current assets ($)', money(caA), money(caB)], ['Current liabilities ($)', money(clA), money(clB)]]) + 'Which business has the higher current ratio?',
          options: [n[0], n[1], 'Both have the same current ratio'], answer: rA > rB ? 0 : 1,
          why: n[0] + ': ' + money(caA) + ' ÷ ' + money(clA) + ' = ' + d2(rA) + ':1. ' + n[1] + ': ' + money(caB) + ' ÷ ' + money(clB) + ' = ' + d2(rB) + ':1. The business with more current assets does not always have the higher ratio; you must divide.' };
      });
    } },
    { skill: 'compare', gen: function () {
      return retry(function () {
        var cl1 = clVal(), cl2 = clVal(), ca1 = round10(cl1 * ratioVal(0.6, 3)), ca2 = round10(cl2 * ratioVal(0.6, 3)), r1 = R.roundDp(ca1 / cl1, 2), r2 = R.roundDp(ca2 / cl2, 2), diff = R.roundDp(Math.abs(r2 - r1), 2);
        if (diff < 0.15 || diff > 1) return null;
        return { kind: 'num', q: 'A builders’ merchant had current assets of $' + money(ca1) + ' and current liabilities of $' + money(cl1) + ' last year. This year the figures are $' + money(ca2) + ' and $' + money(cl2) + '.<br>Calculate each year’s current ratio to 2 decimal places. By how much has the ratio ' + (r2 > r1 ? 'risen' : 'fallen') + '?',
          answer: diff, unit: '', tol: 0.0101, display: d2(diff),
          why: 'Last year: ' + money(ca1) + ' ÷ ' + money(cl1) + ' = ' + d2(r1) + ':1. This year: ' + money(ca2) + ' ÷ ' + money(cl2) + ' = ' + d2(r2) + ':1. The change is ' + d2(Math.max(r1, r2)) + ' − ' + d2(Math.min(r1, r2)) + ' = ' + d2(diff) + '.' };
      });
    } },
    { skill: 'effect', gen: function () {
      var cl = clVal() + 4000, ca = round10(cl * ratioVal(1.3, 2.8)), x = round10(cl * rint(15, 40) / 100), v = (ca - x) / (cl - x);
      return ratioNum(biz() + ' has current assets of $' + money(ca) + ' and current liabilities of $' + money(cl) + '. It then pays a supplier $' + money(x) + ' in cash.<br>Calculate the new current ratio to 2 decimal places.',
        v, 'Paying the supplier reduces cash (a current asset) and money owed to suppliers (a current liability) by $' + money(x) + '. New ratio = ' + money(ca - x) + ' ÷ ' + money(cl - x) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'effect', gen: function () {
      var cl = clVal(), ca = round10(cl * ratioVal(0.6, 2.6)), x = round10(cl * rint(10, 35) / 100), v = (ca + x) / (cl + x);
      return ratioNum('A toy shop has current assets of $' + money(ca) + ' and current liabilities of $' + money(cl) + '. It buys $' + money(x) + ' of extra stock on 30 days’ credit.<br>Calculate the new current ratio to 2 decimal places.',
        v, 'The new stock adds $' + money(x) + ' to inventory (current assets) and $' + money(x) + ' to money owed to suppliers (current liabilities). ' + money(ca + x) + ' ÷ ' + money(cl + x) + ' = ' + d2(v) + ':1.');
    } }
  ] };

  /* ===================================================== BUS-CALC-18 acid test ratio */
  function atVals(lo, hi) {   // quick assets, inventory, current liabilities, current assets
    var cl = clVal(), qa = round10(cl * ratioVal(lo, hi)), inv = round10(cl * rint(20, 120) / 100);
    return { cl: cl, qa: qa, inv: inv, ca: qa + inv };
  }
  B['BUS-CALC-18'] = { title: 'Calculate the acid test ratio', items: [
    { skill: 'direct', gen: function () {
      var t = atVals(0.4, 2.2), v = t.qa / t.cl;
      return ratioNum(biz() + ' has current assets of $' + money(t.ca) + ', of which $' + money(t.inv) + ' is inventory. Its current liabilities are $' + money(t.cl) + '.<br>Calculate the acid test ratio. Give your answer to 2 decimal places.',
        v, 'Acid test ratio = (current assets − inventory) ÷ current liabilities = (' + money(t.ca) + ' − ' + money(t.inv) + ') ÷ ' + money(t.cl) + ' = ' + money(t.qa) + ' ÷ ' + money(t.cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'direct', gen: function () {
      var cl = rint(60, 800), qa = Math.round(cl * ratioVal(0.4, 2)), inv = Math.round(cl * rint(20, 110) / 100), ca = qa + inv, v = qa / cl;
      return ratioNum('Figures for ' + biz() + ':' + tbl(['', '$000'], [['Current assets', money(ca)], ['Inventory', money(inv)], ['Current liabilities', money(cl)]]) + 'Calculate the acid test ratio to 2 decimal places.',
        v, '(' + money(ca) + ' − ' + money(inv) + ') ÷ ' + money(cl) + ' = ' + money(qa) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1. All three figures are in $000, so the units cancel.');
    } },
    { skill: 'direct', gen: function () {
      var cl = rint(15, 80) / 10, qa = R.roundDp(cl * ratioVal(0.4, 2), 1), inv = rint(5, 60) / 10, ca = R.roundDp(qa + inv, 1), v = qa / cl;
      return ratioNum('A furniture manufacturer has current assets of $' + ca.toFixed(1) + 'm, inventory of $' + inv.toFixed(1) + 'm and current liabilities of $' + cl.toFixed(1) + 'm.<br>Calculate its acid test ratio to 2 decimal places.',
        v, '(' + ca.toFixed(1) + ' − ' + inv.toFixed(1) + ') ÷ ' + cl.toFixed(1) + ' = ' + qa.toFixed(1) + ' ÷ ' + cl.toFixed(1) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'direct', gen: function () {
      var cl = clVal(), qa = round10(cl * rint(30, 85) / 100), inv = round10(cl * rint(40, 120) / 100), ca = qa + inv, v = qa / cl;
      return ratioNum('A garden centre holds a lot of plants as stock. Its current assets are $' + money(ca) + ', including inventory of $' + money(inv) + '. Current liabilities are $' + money(cl) + '.<br>Calculate the acid test ratio to 2 decimal places.',
        v, '(' + money(ca) + ' − ' + money(inv) + ') ÷ ' + money(cl) + ' = ' + money(qa) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1, which is below 1.');
    } },
    { skill: 'components', gen: function () {
      var cl = clVal(), qa = round10(cl * ratioVal(0.4, 2.2)), rec = round10(qa * rint(30, 70) / 100), cash = qa - rec, inv = round10(cl * rint(25, 100) / 100), v = qa / cl;
      return ratioNum(biz() + ' has cash of $' + money(cash) + ', money owed by customers of $' + money(rec) + ' and inventory of $' + money(inv) + '. Its current liabilities are $' + money(cl) + '.<br>Calculate the acid test ratio to 2 decimal places.',
        v, 'Current assets without inventory are cash plus receivables: ' + money(cash) + ' + ' + money(rec) + ' = ' + money(qa) + '. ' + money(qa) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'components', gen: function () {
      var t = atVals(0.4, 2), od = round10(t.cl * rint(20, 50) / 100), tp = t.cl - od, v = t.qa / t.cl;
      return ratioNum('A bicycle repair shop has current assets of $' + money(t.ca) + ' including spare parts in stock worth $' + money(t.inv) + '. It owes suppliers $' + money(tp) + ' and has an overdraft of $' + money(od) + '.<br>Calculate the acid test ratio to 2 decimal places.',
        v, 'Current liabilities = ' + money(tp) + ' + ' + money(od) + ' = ' + money(t.cl) + '. Acid test = (' + money(t.ca) + ' − ' + money(t.inv) + ') ÷ ' + money(t.cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'from-statement', gen: function () {
      var cl = rint(60, 600), qa = Math.round(cl * ratioVal(0.4, 2)), inv = Math.round(cl * rint(25, 110) / 100), ca = qa + inv, nca = rint(6, 40) * 50, ncl = rint(4, 30) * 25, v = qa / cl;
      return ratioNum('Extract from the statement of financial position of ' + biz() + ':' +
        tbl(['', '$000'], [['Non-current assets', money(nca)], ['Inventory', money(inv)], ['Total current assets', money(ca)], ['Current liabilities', money(cl)], ['Non-current liabilities', money(ncl)]]) +
        'Calculate the acid test ratio to 2 decimal places.',
        v, '(' + money(ca) + ' − ' + money(inv) + ') ÷ ' + money(cl) + ' = ' + d2(v) + ':1. Non-current items are not used.');
    } },
    { skill: 'from-statement', gen: function () {
      var y = rint(2022, 2024), a = atVals(0.4, 2), b = atVals(0.4, 2), ask = pick([0, 1]), t = ask ? b : a, v = t.qa / t.cl;
      return ratioNum('Selected figures for ' + biz() + ':' +
        tbl(['', y + ' ($)', (y + 1) + ' ($)'], [['Current assets', money(a.ca), money(b.ca)], ['Inventory', money(a.inv), money(b.inv)], ['Current liabilities', money(a.cl), money(b.cl)]]) +
        'Calculate the acid test ratio for ' + (y + ask) + ', to 2 decimal places.',
        v, 'Using ' + (y + ask) + ': (' + money(t.ca) + ' − ' + money(t.inv) + ') ÷ ' + money(t.cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'from-statement', gen: function () {
      var cl = rint(60, 600), qa = Math.round(cl * ratioVal(0.4, 2)), inv = Math.round(cl * rint(25, 110) / 100), ca = qa + inv, ce = rint(10, 60) * 50, gp = rint(10, 90) * 10, v = qa / cl;
      return ratioNum('Financial information for ' + biz() + ' ($000):' +
        tbl(['Item', '$000'], [['Gross profit', money(gp)], ['Capital employed', money(ce)], ['Current assets', money(ca)], ['of which inventory', money(inv)], ['Current liabilities', money(cl)]]) +
        'Calculate the acid test ratio to 2 decimal places.',
        v, 'Only three lines are needed: (' + money(ca) + ' − ' + money(inv) + ') ÷ ' + money(cl) + ' = ' + d2(v) + ':1. Gross profit and capital employed are used in other ratios.');
    } },
    { skill: 'rounding', gen: function () {
      var t = atVals(0.7, 2.2), v = t.qa / t.cl;
      return { kind: 'num', q: biz() + ' has current assets of $' + money(t.ca) + ', inventory of $' + money(t.inv) + ' and current liabilities of $' + money(t.cl) + '.<br>Calculate the acid test ratio to <b>1 decimal place</b>.',
        answer: R.roundDp(v, 1), unit: ':1', tol: 0.05, display: d1(v) + ':1',
        why: '(' + money(t.ca) + ' − ' + money(t.inv) + ') ÷ ' + money(t.cl) + ' = ' + d2(v) + ' to 2 decimal places, so ' + d1(v) + ':1 to 1 decimal place.' };
    } },
    { skill: 'rounding', gen: function () {
      var cl = rint(30, 90) * 10000, qa = round10(cl * ratioVal(0.4, 2)), inv = rint(2, 9) * 100000, ca = qa + inv, v = qa / cl;
      return ratioNum('A wholesaler’s current assets are $' + money(ca) + ', including inventory of $' + (inv / 1e6).toFixed(1) + ' million. Its current liabilities are $' + money(cl) + '.<br>Calculate the acid test ratio to 2 decimal places.',
        v, 'Put inventory in dollars first: $' + (inv / 1e6).toFixed(1) + ' million = $' + money(inv) + '. (' + money(ca) + ' − ' + money(inv) + ') ÷ ' + money(cl) + ' = ' + money(qa) + ' ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'error-spot', gen: function () {
      return retry(function () {
        var t = atVals(0.5, 2), err = rint(0, 2), shown;
        if (err === 0) shown = d2(t.ca / t.cl); else if (err === 1) shown = d2(t.ca / (t.cl - t.inv)); else shown = d2(t.ca - t.inv / t.cl);
        if (t.cl - t.inv <= 0 || shown === d2(t.qa / t.cl)) return null;
        var opts = ['Forgot to take away the inventory', 'Took the inventory away from current liabilities', 'Divided before subtracting, leaving out the brackets', 'Divided current liabilities by current assets'];
        return { kind: 'mcq', q: 'A shop has current assets of $' + money(t.ca) + ', inventory of $' + money(t.inv) + ' and current liabilities of $' + money(t.cl) + '. A student gave the acid test ratio as <b>' + shown + '</b>.<br>What mistake did the student make?',
          options: opts, answer: err,
          why: 'The correct answer is (' + money(t.ca) + ' − ' + money(t.inv) + ') ÷ ' + money(t.cl) + ' = ' + d2(t.qa / t.cl) + ':1. ' + ['The student’s ' + shown + ' is ' + money(t.ca) + ' ÷ ' + money(t.cl) + ', the current ratio.', 'The student worked out ' + money(t.ca) + ' ÷ (' + money(t.cl) + ' − ' + money(t.inv) + '). Inventory must come off current assets.', 'The student worked out ' + money(t.inv) + ' ÷ ' + money(t.cl) + ' first and took that from ' + money(t.ca) + '. Subtract inside the brackets first.'][err] };
      });
    } },
    { skill: 'set-up', gen: function () {
      var t = atVals(0.5, 2);
      return { kind: 'mcq', q: 'A pharmacy has current assets of $' + money(t.ca) + ', inventory of $' + money(t.inv) + ' and current liabilities of $' + money(t.cl) + '. Which working gives its acid test ratio?',
        options: ['(' + money(t.ca) + ' − ' + money(t.inv) + ') ÷ ' + money(t.cl), money(t.ca) + ' ÷ ' + money(t.cl), money(t.ca) + ' ÷ (' + money(t.cl) + ' − ' + money(t.inv) + ')', '(' + money(t.ca) + ' + ' + money(t.inv) + ') ÷ ' + money(t.cl)], answer: 0,
        why: 'Acid test ratio = (current assets − inventory) ÷ current liabilities. Here that is ' + money(t.qa) + ' ÷ ' + money(t.cl) + ' = ' + d2(t.qa / t.cl) + ':1.' };
    } },
    { skill: 'set-up', kind: 'mcq', q: 'A student types <b>45000 − 18000 ÷ 30000</b> into a calculator to find an acid test ratio. Why is the answer wrong?',
      options: ['The calculator divides first, so brackets are needed around the subtraction', 'Inventory should be added to current assets, because stock is something the business owns', 'Current liabilities should be on the top of the fraction', 'The figures must first be changed into thousands'], answer: 0,
      why: 'A calculator divides before it subtracts. It should be (45,000 − 18,000) ÷ 30,000 = 27,000 ÷ 30,000 = 0.90:1.' },
    { skill: 'reverse', gen: function () {
      var cl = rint(10, 120) * 500, r = pick([0.6, 0.75, 0.8, 1.2, 1.4, 1.5]), qa = Math.round(cl * r), inv = rint(5, 60) * 500, ca = qa + inv;
      return { kind: 'num', q: biz() + ' has current assets of $' + money(ca) + ' and current liabilities of $' + money(cl) + '. Its acid test ratio is ' + d2(r) + ':1.<br>Calculate the value of its inventory in $.',
        answer: inv, unit: '$', display: money(inv),
        why: 'Current assets − inventory = ' + d2(r) + ' × ' + money(cl) + ' = ' + money(qa) + '. So inventory = ' + money(ca) + ' − ' + money(qa) + ' = $' + money(inv) + '.' };
    } },
    { skill: 'reverse', gen: function () {
      var cl = rint(10, 120) * 500, cr = pick([1.5, 1.8, 2, 2.4, 2.5]), ca = Math.round(cl * cr), inv = Math.round(ca * pick([0.2, 0.3, 0.4, 0.5])), v = (ca - inv) / cl;
      return ratioNum('A computer retailer has a current ratio of ' + d2(cr) + ':1 and current liabilities of $' + money(cl) + '. Inventory is $' + money(inv) + '.<br>Calculate its acid test ratio to 2 decimal places.',
        v, 'Current assets = ' + d2(cr) + ' × ' + money(cl) + ' = ' + money(ca) + '. Acid test = (' + money(ca) + ' − ' + money(inv) + ') ÷ ' + money(cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'compare', gen: function () {
      return retry(function () {
        var n = twoBiz(), a = atVals(0.4, 2), b = atVals(0.4, 2), crA = a.ca / a.cl, crB = b.ca / b.cl, atA = R.roundDp(a.qa / a.cl, 2), atB = R.roundDp(b.qa / b.cl, 2);
        if (Math.abs(atA - atB) < 0.1 || (crA > crB) === (atA > atB)) return null;   // the current ratio points the other way
        return { kind: 'mcq', q: tbl(['', n[0] + ' ($)', n[1] + ' ($)'], [['Current assets', money(a.ca), money(b.ca)], ['Inventory', money(a.inv), money(b.inv)], ['Current liabilities', money(a.cl), money(b.cl)]]) + 'Which business has the higher acid test ratio?',
          options: [n[0], n[1], 'Both have the same acid test ratio'], answer: atA > atB ? 0 : 1,
          why: n[0] + ': ' + money(a.qa) + ' ÷ ' + money(a.cl) + ' = ' + d2(atA) + ':1. ' + n[1] + ': ' + money(b.qa) + ' ÷ ' + money(b.cl) + ' = ' + d2(atB) + ':1. Here the business with the higher current ratio has the lower acid test ratio because more of its current assets are inventory.' };
      });
    } },
    { skill: 'compare', gen: function () {
      var t = atVals(0.5, 2), cr = R.roundDp(t.ca / t.cl, 2), at = R.roundDp(t.qa / t.cl, 2), gap = R.roundDp(cr - at, 2);
      return { kind: 'num', q: biz() + ' has current assets of $' + money(t.ca) + ', inventory of $' + money(t.inv) + ' and current liabilities of $' + money(t.cl) + '.<br>Calculate the current ratio and the acid test ratio, each to 2 decimal places. What is the difference between them?',
        answer: gap, unit: '', tol: 0.0101, display: d2(gap),
        why: 'Current ratio = ' + money(t.ca) + ' ÷ ' + money(t.cl) + ' = ' + d2(cr) + '. Acid test = ' + money(t.qa) + ' ÷ ' + money(t.cl) + ' = ' + d2(at) + '. Difference = ' + d2(cr) + ' − ' + d2(at) + ' = ' + d2(gap) + '. The gap comes from the inventory.' };
    } },
    { skill: 'effect', gen: function () {
      var t = atVals(0.4, 1.6), x = round10(t.inv * rint(20, 60) / 100), v = (t.qa + x) / t.cl;
      return ratioNum(biz() + ' has current assets of $' + money(t.ca) + ', inventory of $' + money(t.inv) + ' and current liabilities of $' + money(t.cl) + '. It sells $' + money(x) + ' of its inventory for cash at cost price.<br>Calculate the new acid test ratio to 2 decimal places.',
        v, 'Inventory falls by ' + money(x) + ' and cash rises by ' + money(x) + ', so quick assets become ' + money(t.qa) + ' + ' + money(x) + ' = ' + money(t.qa + x) + '. ' + money(t.qa + x) + ' ÷ ' + money(t.cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'effect', gen: function () {
      var t = atVals(0.9, 2.2), x = round10(t.qa * rint(15, 40) / 100), v = (t.qa - x) / t.cl;
      return ratioNum('A bakery has current assets of $' + money(t.ca) + ', inventory of $' + money(t.inv) + ' and current liabilities of $' + money(t.cl) + '. It spends $' + money(x) + ' of its cash on extra flour and sugar.<br>Calculate the new acid test ratio to 2 decimal places.',
        v, 'Cash falls by ' + money(x) + ' and inventory rises by ' + money(x) + '. Total current assets do not change, but quick assets fall to ' + money(t.qa) + ' − ' + money(x) + ' = ' + money(t.qa - x) + '. ' + money(t.qa - x) + ' ÷ ' + money(t.cl) + ' = ' + d2(v) + ':1.');
    } },
    { skill: 'meaning', kind: 'mcq', q: 'Why is inventory taken away from current assets in the acid test ratio?',
      options: ['Inventory may take time to sell, so it cannot be relied on to pay debts quickly', 'Inventory is a non-current asset, because most businesses keep their stock for more than a year', 'Inventory is a liability because suppliers must be paid for it', 'Inventory is already counted in the business’s gross profit'], answer: 0,
      why: 'Stock has to be sold before it becomes cash, and that can take time. Leaving it out gives a stricter test of whether short-term debts can be paid.' },
    { skill: 'meaning', kind: 'multi', q: 'A café works out its acid test ratio. Which of its items are included in the top line, current assets minus inventory?',
      options: ['Cash in the till and the bank', 'Money owed by an office that pays for catering monthly', 'Coffee beans and milk in the storeroom', 'The espresso machine', 'An unpaid bill from the dairy'], answers: [0, 1],
      why: 'Cash and money owed by customers are quick assets. The coffee and milk are inventory, so they are removed. The machine is a non-current asset and the dairy bill is a current liability.' },
    { skill: 'meaning', kind: 'mcq', q: 'A business holds some inventory. How does its acid test ratio compare with its current ratio?',
      options: ['The acid test ratio is lower, because inventory is removed from the top line', 'The acid test ratio is higher, because inventory is also taken away from current liabilities', 'The two ratios are always equal', 'It depends on whether the business made a profit'], answer: 0,
      why: 'Both ratios divide by the same current liabilities, but the acid test uses a smaller top line (current assets minus inventory), so it is lower whenever there is any inventory.' },
    { skill: 'meaning', kind: 'mcq', q: 'A hardware shop has an acid test ratio of 0.55:1. What does this mean?',
      options: ['For every $1 of current liabilities it has $0.55 of current assets excluding inventory', 'For every $1 of inventory it holds, the shop has $0.55 of current liabilities still to pay', 'It has 55% more current assets than current liabilities', 'It makes $0.55 of operating profit for each $1 of sales'], answer: 0,
      why: 'The acid test is (current assets − inventory) ÷ current liabilities, so 0.55:1 means only 55 cents of quick assets for each $1 owed in the short term.' }
  ] };

  /* ===================================================== BUS-CALC-15 operating profit margin */
  function opVals() {
    var rev = rint(150, 950) * 1000, gp = Math.round(rev * rint(30, 65) / 100 / 100) * 100, exp = Math.round(gp * rint(25, 80) / 100 / 100) * 100;
    return { rev: rev, gp: gp, exp: exp, op: gp - exp, cos: rev - gp };
  }
  B['BUS-CALC-15'] = { title: 'Calculate the operating profit margin', items: [
    { skill: 'direct', gen: function () {
      var t = opVals(), v = t.op / t.rev * 100;
      return pctNum(biz() + ' made an operating profit of $' + money(t.op) + ' on revenue of $' + money(t.rev) + '.<br>Calculate its operating profit margin. Give your answer to 2 decimal places.',
        v, 'Operating profit margin = operating profit ÷ revenue × 100 = ' + money(t.op) + ' ÷ ' + money(t.rev) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'direct', gen: function () {
      var pct = rint(6, 38), rev = rint(12, 95) * 1000, op = rev * pct / 100;
      return { kind: 'num', q: 'A driving school had revenue of $' + money(rev) + ' and an operating profit of $' + money(op) + ' last year.<br>Calculate its operating profit margin as a percentage.',
        answer: pct, unit: '%', display: pct + '%',
        why: money(op) + ' ÷ ' + money(rev) + ' × 100 = ' + pct + '%. This one divides exactly, so no rounding is needed.' };
    } },
    { skill: 'direct', gen: function () {
      var rev = rint(20, 400) / 10, op = R.roundDp(rev * rint(4, 30) / 100, 2), v = op / rev * 100;
      return pctNum('A hotel group reports revenue of $' + rev.toFixed(1) + ' million and operating profit of $' + op.toFixed(2) + ' million.<br>Calculate the operating profit margin to 2 decimal places.',
        v, op.toFixed(2) + ' ÷ ' + rev.toFixed(1) + ' × 100 = ' + d2(v) + '%. Both figures are in millions, so they can be divided directly.');
    } },
    { skill: 'derive', gen: function () {
      var t = opVals(), v = t.op / t.rev * 100;
      return pctNum(biz() + ' had revenue of $' + money(t.rev) + ', gross profit of $' + money(t.gp) + ' and other operating expenses of $' + money(t.exp) + '.<br>Calculate the operating profit margin to 2 decimal places.',
        v, 'Operating profit = gross profit − expenses = ' + money(t.gp) + ' − ' + money(t.exp) + ' = ' + money(t.op) + '. Margin = ' + money(t.op) + ' ÷ ' + money(t.rev) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'derive', gen: function () {
      var t = opVals(), v = t.op / t.rev * 100;
      return pctNum('A kitchen fitter’s revenue was $' + money(t.rev) + ' and its cost of sales was $' + money(t.cos) + '. Its other operating expenses were $' + money(t.exp) + '.<br>Calculate the operating profit margin to 2 decimal places.',
        v, 'Gross profit = ' + money(t.rev) + ' − ' + money(t.cos) + ' = ' + money(t.gp) + '. Operating profit = ' + money(t.gp) + ' − ' + money(t.exp) + ' = ' + money(t.op) + '. Margin = ' + money(t.op) + ' ÷ ' + money(t.rev) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'derive', gen: function () {
      var t = opVals(), rent = Math.round(t.exp * rint(30, 45) / 100 / 100) * 100, sal = Math.round(t.exp * rint(30, 45) / 100 / 100) * 100, adv = t.exp - rent - sal, v = t.op / t.rev * 100;
      return pctNum('Income statement extract for ' + biz() + ':' +
        tbl(['', '$'], [['Revenue', money(t.rev)], ['Cost of sales', money(t.cos)], ['Gross profit', money(t.gp)], ['Rent', money(rent)], ['Salaries', money(sal)], ['Advertising', money(adv)]]) +
        'Calculate the operating profit margin to 2 decimal places.',
        v, 'Expenses = ' + money(rent) + ' + ' + money(sal) + ' + ' + money(adv) + ' = ' + money(t.exp) + '. Operating profit = ' + money(t.gp) + ' − ' + money(t.exp) + ' = ' + money(t.op) + '. ' + money(t.op) + ' ÷ ' + money(t.rev) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'derive', gen: function () {
      var rev = rint(200, 900) * 1000, gpm = pick([30, 35, 40, 45, 50, 55, 60]), gp = rev * gpm / 100, exp = Math.round(gp * rint(30, 75) / 100 / 100) * 100, op = gp - exp, v = op / rev * 100;
      return pctNum('A craft brewery had revenue of $' + money(rev) + ' and a gross profit margin of ' + gpm + '%. Its other operating expenses were $' + money(exp) + '.<br>Calculate the operating profit margin to 2 decimal places.',
        v, 'Gross profit = ' + gpm + '% × ' + money(rev) + ' = ' + money(gp) + '. Operating profit = ' + money(gp) + ' − ' + money(exp) + ' = ' + money(op) + '. ' + money(op) + ' ÷ ' + money(rev) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'from-statement', gen: function () {
      var rev = rint(300, 2000), op = Math.round(rev * rint(4, 30) / 100), ce = rint(400, 3000), ca = rint(100, 600), v = op / rev * 100;
      return pctNum('Financial information for ' + biz() + ':' + tbl(['', '$000'], [['Revenue', money(rev)], ['Operating profit', money(op)], ['Capital employed', money(ce)], ['Current assets', money(ca)]]) +
        'Calculate the operating profit margin to 2 decimal places.',
        v, 'Use operating profit and revenue only: ' + money(op) + ' ÷ ' + money(rev) + ' × 100 = ' + d2(v) + '%. Capital employed is used for ROCE, not for a margin.');
    } },
    { skill: 'from-statement', gen: function () {
      var y = rint(2022, 2024), a = opVals(), b = opVals(), ask = pick([0, 1]), t = ask ? b : a, v = t.op / t.rev * 100;
      return pctNum('Figures for ' + biz() + ':' + tbl(['', y + ' ($)', (y + 1) + ' ($)'], [['Revenue', money(a.rev), money(b.rev)], ['Gross profit', money(a.gp), money(b.gp)], ['Other operating expenses', money(a.exp), money(b.exp)]]) +
        'Calculate the operating profit margin for ' + (y + ask) + ' to 2 decimal places.',
        v, (y + ask) + ': operating profit = ' + money(t.gp) + ' − ' + money(t.exp) + ' = ' + money(t.op) + '. ' + money(t.op) + ' ÷ ' + money(t.rev) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'rounding', gen: function () {
      var t = opVals(), v = t.op / t.rev * 100;
      return { kind: 'num', q: biz() + ' had revenue of $' + money(t.rev) + ' and operating profit of $' + money(t.op) + '.<br>Calculate the operating profit margin to <b>1 decimal place</b>.',
        answer: R.roundDp(v, 1), unit: '%', tol: 0.05, display: d1(v) + '%',
        why: money(t.op) + ' ÷ ' + money(t.rev) + ' × 100 = ' + d2(v) + '% to 2 decimal places, which is ' + d1(v) + '% to 1 decimal place.' };
    } },
    { skill: 'error-spot', gen: function () {
      return retry(function () {
        var t = opVals(), err = rint(0, 2), shown;
        if (err === 0) shown = d2(t.gp / t.rev * 100); else if (err === 1) shown = d2(t.op / t.gp * 100); else shown = d2((t.rev - t.exp) / t.rev * 100);
        if (shown === d2(t.op / t.rev * 100)) return null;
        return { kind: 'mcq', q: 'A shop had revenue of $' + money(t.rev) + ', gross profit of $' + money(t.gp) + ' and other operating expenses of $' + money(t.exp) + '. A student gave the operating profit margin as <b>' + shown + '%</b>.<br>What mistake did the student make?',
          options: ['Used gross profit instead of operating profit', 'Divided by gross profit instead of by revenue', 'Took the expenses away from revenue instead of from gross profit', 'Divided revenue by operating profit, which turns the ratio upside down'], answer: err,
          why: 'Correct: (' + money(t.gp) + ' − ' + money(t.exp) + ') ÷ ' + money(t.rev) + ' × 100 = ' + d2(t.op / t.rev * 100) + '%. ' + ['The student’s ' + shown + '% is the gross profit margin.', 'The student divided ' + money(t.op) + ' by ' + money(t.gp) + '; the margin must be over revenue.', 'The student used ' + money(t.rev) + ' − ' + money(t.exp) + ', which skips the cost of sales.'][err] };
      });
    } },
    { skill: 'error-spot', gen: function () {
      var t = opVals();
      return { kind: 'mcq', q: 'A gym had revenue of $' + money(t.rev) + ', gross profit of $' + money(t.gp) + ' and other operating expenses of $' + money(t.exp) + '. Which working gives its operating profit margin?',
        options: ['(' + money(t.gp) + ' − ' + money(t.exp) + ') ÷ ' + money(t.rev) + ' × 100', money(t.gp) + ' ÷ ' + money(t.rev) + ' × 100', '(' + money(t.gp) + ' − ' + money(t.exp) + ') ÷ ' + money(t.gp) + ' × 100', '(' + money(t.rev) + ' − ' + money(t.exp) + ') ÷ ' + money(t.rev) + ' × 100'], answer: 0,
        why: 'Operating profit = gross profit − other operating expenses = ' + money(t.op) + '. Then divide by revenue and multiply by 100: ' + d2(t.op / t.rev * 100) + '%.' };
    } },
    { skill: 'reverse', gen: function () {
      var pct = pick([8, 12, 15, 18, 20, 24, 25, 30]), rev = rint(10, 90) * 5000, op = rev * pct / 100;
      return { kind: 'num', q: biz() + ' had revenue of $' + money(rev) + ' and an operating profit margin of ' + pct + '%.<br>Calculate its operating profit in $.',
        answer: op, unit: '$', display: money(op),
        why: 'Operating profit = margin × revenue = ' + pct + '% × ' + money(rev) + ' = ' + pct + ' ÷ 100 × ' + money(rev) + ' = $' + money(op) + '.' };
    } },
    { skill: 'reverse', gen: function () {
      var pct = pick([5, 8, 10, 12.5, 16, 20, 25, 40]), rev = rint(8, 80) * 10000, op = rev * pct / 100;
      return { kind: 'num', q: 'A taxi firm made an operating profit of $' + money(op) + '. Its operating profit margin was ' + pct + '%.<br>Calculate its revenue in $.',
        answer: rev, unit: '$', display: money(rev),
        why: 'Revenue = operating profit ÷ margin × 100 = ' + money(op) + ' ÷ ' + pct + ' × 100 = $' + money(rev) + '.' };
    } },
    { skill: 'reverse', gen: function () {
      var pct = pick([10, 12, 15, 20, 25]), rev = rint(10, 80) * 10000, op = rev * pct / 100, gp = op + rint(5, 60) * 1000, exp = gp - op;
      return { kind: 'num', q: 'A printing company had revenue of $' + money(rev) + ' and gross profit of $' + money(gp) + '. Its operating profit margin was ' + pct + '%.<br>Calculate its other operating expenses in $.',
        answer: exp, unit: '$', display: money(exp),
        why: 'Operating profit = ' + pct + '% × ' + money(rev) + ' = ' + money(op) + '. Expenses = gross profit − operating profit = ' + money(gp) + ' − ' + money(op) + ' = $' + money(exp) + '.' };
    } },
    { skill: 'compare', gen: function () {
      return retry(function () {
        var n = twoBiz(), a = opVals(), b = opVals(), mA = a.op / a.rev * 100, mB = b.op / b.rev * 100;
        if (Math.abs(mA - mB) < 1.5 || (a.op > b.op) === (mA > mB)) return null;   // higher profit, lower margin
        return { kind: 'mcq', q: tbl(['', n[0] + ' ($)', n[1] + ' ($)'], [['Revenue', money(a.rev), money(b.rev)], ['Operating profit', money(a.op), money(b.op)]]) + 'Which business has the higher operating profit margin?',
          options: [n[0], n[1], 'Both have the same margin'], answer: mA > mB ? 0 : 1,
          why: n[0] + ': ' + money(a.op) + ' ÷ ' + money(a.rev) + ' × 100 = ' + d2(mA) + '%. ' + n[1] + ': ' + money(b.op) + ' ÷ ' + money(b.rev) + ' × 100 = ' + d2(mB) + '%. The larger operating profit does not always mean the larger margin.' };
      });
    } },
    { skill: 'compare', gen: function () {
      return retry(function () {
        var a = opVals(), b = opVals(), m1 = R.roundDp(a.op / a.rev * 100, 2), m2 = R.roundDp(b.op / b.rev * 100, 2), diff = R.roundDp(Math.abs(m2 - m1), 2);
        if (diff < 1 || diff > 8) return null;
        return { kind: 'num', q: 'Last year a car wash had revenue of $' + money(a.rev) + ' and operating profit of $' + money(a.op) + '. This year revenue was $' + money(b.rev) + ' and operating profit $' + money(b.op) + '.<br>Calculate each year’s operating profit margin to 2 decimal places. By how many percentage points has the margin ' + (m2 > m1 ? 'risen' : 'fallen') + '?',
          answer: diff, unit: '', tol: 0.0101, display: d2(diff),
          why: 'Last year: ' + money(a.op) + ' ÷ ' + money(a.rev) + ' × 100 = ' + d2(m1) + '%. This year: ' + money(b.op) + ' ÷ ' + money(b.rev) + ' × 100 = ' + d2(m2) + '%. Change = ' + d2(diff) + ' percentage points.' };
      });
    } },
    { skill: 'effect', gen: function () {
      var t = opVals(), x = Math.round(t.op * rint(15, 50) / 100 / 100) * 100, v = (t.op - x) / t.rev * 100;
      return pctNum(biz() + ' had revenue of $' + money(t.rev) + ', gross profit of $' + money(t.gp) + ' and other operating expenses of $' + money(t.exp) + '. Next year its rent rises by $' + money(x) + '. Revenue and gross profit stay the same.<br>Calculate the new operating profit margin to 2 decimal places.',
        v, 'New expenses = ' + money(t.exp) + ' + ' + money(x) + ' = ' + money(t.exp + x) + '. Operating profit = ' + money(t.gp) + ' − ' + money(t.exp + x) + ' = ' + money(t.op - x) + '. ' + money(t.op - x) + ' ÷ ' + money(t.rev) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'meaning', kind: 'mcq', q: 'Why is a business’s operating profit margin lower than its gross profit margin?',
      options: ['Other operating expenses such as rent and salaries have also been taken away', 'Operating profit is divided by capital employed instead of by the revenue figure', 'Cost of sales is added back before the margin is found', 'Gross profit includes money borrowed from the bank'], answer: 0,
      why: 'Both margins divide by revenue, but operating profit is gross profit minus overheads, so the top line is smaller and the margin is lower.' },
    { skill: 'meaning', kind: 'multi', q: 'An online clothes seller is working out its operating profit. Which of these are <b>other operating expenses</b> taken away from gross profit?',
      options: ['Salaries of office staff', 'Rent for its warehouse', 'Social media advertising', 'Money received from customers', 'A new long-term bank loan'], answers: [0, 1, 2],
      why: 'Salaries, rent and advertising are overheads, so they are taken away from gross profit. Money from customers is revenue and a loan is a liability, not an expense.' },
    { skill: 'meaning', kind: 'mcq', q: 'A furniture maker has an operating profit margin of 14%. What does this mean?',
      options: ['It keeps 14 cents of operating profit from every $1 of revenue', 'It earns 14 cents of operating profit for every $1 of capital invested in it', 'It adds 14% to its costs to set its prices', 'Its overheads are 14% of its cost of sales'], answer: 0,
      why: 'Operating profit margin = operating profit ÷ revenue × 100, so 14% means 14 cents of operating profit per $1 of sales after all operating costs.' },
    { skill: 'set-up', kind: 'mcq', q: 'Which formula gives the operating profit margin?',
      options: ['Operating profit ÷ revenue × 100', 'Gross profit ÷ revenue × 100', 'Operating profit ÷ capital employed × 100', 'Operating profit ÷ gross profit × 100'], answer: 0,
      why: 'The operating profit margin puts operating profit over revenue. Gross profit over revenue is the gross profit margin, and operating profit over capital employed is ROCE.' }
  ] };

  /* ===================================================== BUS-CALC-16 ROCE */
  function roceVals() {
    var ce = rint(100, 950) * 1000, op = Math.round(ce * rint(400, 3800) / 10000 / 100) * 100;
    return { ce: ce, op: op };
  }
  B['BUS-CALC-16'] = { title: 'Return on capital employed (ROCE)', items: [
    { skill: 'direct', gen: function () {
      var t = roceVals(), v = t.op / t.ce * 100;
      return pctNum(biz() + ' made an operating profit of $' + money(t.op) + '. Its capital employed was $' + money(t.ce) + '.<br>Calculate its return on capital employed (ROCE). Give your answer to 2 decimal places.',
        v, 'ROCE = operating profit ÷ capital employed × 100 = ' + money(t.op) + ' ÷ ' + money(t.ce) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'direct', gen: function () {
      var pct = rint(5, 45), ce = rint(10, 120) * 2000, op = ce * pct / 100;
      return { kind: 'num', q: 'A recording studio has capital employed of $' + money(ce) + ' and made an operating profit of $' + money(op) + '.<br>Calculate its ROCE as a percentage.',
        answer: pct, unit: '%', display: pct + '%',
        why: money(op) + ' ÷ ' + money(ce) + ' × 100 = ' + pct + '%. It divides exactly, so no rounding is needed.' };
    } },
    { skill: 'direct', gen: function () {
      var ce = rint(30, 600) / 10, op = R.roundDp(ce * rint(5, 35) / 100, 2), v = op / ce * 100;
      return pctNum('A ferry company has capital employed of $' + ce.toFixed(1) + ' million and an operating profit of $' + op.toFixed(2) + ' million.<br>Calculate its ROCE to 2 decimal places.',
        v, op.toFixed(2) + ' ÷ ' + ce.toFixed(1) + ' × 100 = ' + d2(v) + '%. Both are in millions, so they divide directly.');
    } },
    { skill: 'derive', gen: function () {
      var ce = rint(100, 900) * 1000, gp = Math.round(ce * rint(20, 55) / 100 / 100) * 100, exp = Math.round(gp * rint(30, 75) / 100 / 100) * 100, op = gp - exp, v = op / ce * 100;
      return pctNum(biz() + ' had gross profit of $' + money(gp) + ' and other operating expenses of $' + money(exp) + '. Its capital employed was $' + money(ce) + '.<br>Calculate its ROCE to 2 decimal places.',
        v, 'Operating profit = ' + money(gp) + ' − ' + money(exp) + ' = ' + money(op) + '. ROCE = ' + money(op) + ' ÷ ' + money(ce) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'derive', gen: function () {
      var ce = rint(100, 900) * 1000, rev = Math.round(ce * rint(80, 150) / 100 / 1000) * 1000, cos = Math.round(rev * rint(40, 65) / 100 / 100) * 100, gp = rev - cos,
        exp = Math.round(gp * rint(55, 85) / 100 / 100) * 100, op = gp - exp, v = op / ce * 100;
      return pctNum('A bus operator had revenue of $' + money(rev) + ', cost of sales of $' + money(cos) + ' and other operating expenses of $' + money(exp) + '. Capital employed was $' + money(ce) + '.<br>Calculate the ROCE to 2 decimal places.',
        v, 'Gross profit = ' + money(rev) + ' − ' + money(cos) + ' = ' + money(gp) + '. Operating profit = ' + money(gp) + ' − ' + money(exp) + ' = ' + money(op) + '. ROCE = ' + money(op) + ' ÷ ' + money(ce) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'derive', gen: function () {
      var eq = rint(40, 500) * 1000, loan = rint(10, 300) * 1000, ce = eq + loan, op = Math.round(ce * rint(5, 35) / 100 / 100) * 100, v = op / ce * 100;
      return pctNum(biz() + ' has owners’ capital of $' + money(eq) + ' and long-term loans of $' + money(loan) + '. Its operating profit was $' + money(op) + '.<br>Calculate the ROCE to 2 decimal places.',
        v, 'Capital employed = owners’ capital + long-term loans = ' + money(eq) + ' + ' + money(loan) + ' = ' + money(ce) + '. ROCE = ' + money(op) + ' ÷ ' + money(ce) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'from-statement', gen: function () {
      var ce = rint(200, 3000), op = Math.round(ce * rint(4, 35) / 100), rev = Math.round(ce * rint(80, 250) / 100), ca = rint(100, 800), cl = rint(60, 500), v = op / ce * 100;
      return pctNum('Financial information for ' + biz() + ':' + tbl(['', '$000'], [['Revenue', money(rev)], ['Operating profit', money(op)], ['Current assets', money(ca)], ['Current liabilities', money(cl)], ['Capital employed', money(ce)]]) +
        'Calculate the return on capital employed to 2 decimal places.',
        v, 'Use only operating profit and capital employed: ' + money(op) + ' ÷ ' + money(ce) + ' × 100 = ' + d2(v) + '%. The other lines are distractors.');
    } },
    { skill: 'from-statement', gen: function () {
      var y = rint(2022, 2024), a = roceVals(), b = roceVals(), ask = pick([0, 1]), t = ask ? b : a, v = t.op / t.ce * 100;
      return pctNum('Figures for ' + biz() + ':' + tbl(['', y + ' ($)', (y + 1) + ' ($)'], [['Operating profit', money(a.op), money(b.op)], ['Capital employed', money(a.ce), money(b.ce)]]) +
        'Calculate the ROCE for ' + (y + ask) + ' to 2 decimal places.',
        v, (y + ask) + ': ' + money(t.op) + ' ÷ ' + money(t.ce) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'rounding', gen: function () {
      var t = roceVals(), v = t.op / t.ce * 100;
      return { kind: 'num', q: biz() + ' made an operating profit of $' + money(t.op) + ' with capital employed of $' + money(t.ce) + '.<br>Calculate the ROCE to <b>1 decimal place</b>.',
        answer: R.roundDp(v, 1), unit: '%', tol: 0.05, display: d1(v) + '%',
        why: money(t.op) + ' ÷ ' + money(t.ce) + ' × 100 = ' + d2(v) + '% to 2 decimal places, so ' + d1(v) + '% to 1 decimal place.' };
    } },
    { skill: 'rounding', gen: function () {
      var ce = rint(12, 60) * 100000, op = Math.round(ce * rint(300, 3500) / 10000 / 1000) * 1000, v = op / ce * 100;
      return pctNum('A marina has capital employed of $' + (ce / 1e6).toFixed(1) + ' million and an operating profit of $' + money(op) + '.<br>Calculate its ROCE to 2 decimal places.',
        v, 'Use the same units: $' + (ce / 1e6).toFixed(1) + ' million = $' + money(ce) + '. ROCE = ' + money(op) + ' ÷ ' + money(ce) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'error-spot', gen: function () {
      return retry(function () {
        var ce = rint(100, 900) * 1000, gp = Math.round(ce * rint(20, 70) / 100 / 100) * 100, exp = Math.round(gp * rint(30, 70) / 100 / 100) * 100, op = gp - exp,
          ca = Math.round(ce * rint(20, 60) / 100 / 100) * 100, err = rint(0, 2), shown;
        if (err === 0) shown = d2(gp / ce * 100); else if (err === 1) shown = d2(ce / op * 100); else shown = d2(op / ca * 100);
        if (shown === d2(op / ce * 100)) return null;
        return { kind: 'mcq', q: 'A business had gross profit of $' + money(gp) + ', operating expenses of $' + money(exp) + ', current assets of $' + money(ca) + ' and capital employed of $' + money(ce) + '. A student gave its ROCE as <b>' + shown + '%</b>.<br>What mistake did the student make?',
          options: ['Used gross profit instead of operating profit', 'Put the ratio upside down', 'Divided by current assets instead of capital employed', 'Divided operating profit by revenue instead of by capital employed'], answer: err,
          why: 'Correct: (' + money(gp) + ' − ' + money(exp) + ') ÷ ' + money(ce) + ' × 100 = ' + money(op) + ' ÷ ' + money(ce) + ' × 100 = ' + d2(op / ce * 100) + '%. ' + ['The student’s figure is ' + money(gp) + ' ÷ ' + money(ce) + ' × 100, using gross profit.', 'The student divided ' + money(ce) + ' by ' + money(op) + ', the wrong way round.', 'The student divided by current assets of ' + money(ca) + '.'][err] };
      });
    } },
    { skill: 'error-spot', gen: function () {
      var t = roceVals(), rev = Math.round(t.ce * rint(120, 220) / 100 / 1000) * 1000;
      return { kind: 'mcq', q: 'A dairy has revenue of $' + money(rev) + ', operating profit of $' + money(t.op) + ' and capital employed of $' + money(t.ce) + '. Which working gives its ROCE?',
        options: [money(t.op) + ' ÷ ' + money(t.ce) + ' × 100', money(t.op) + ' ÷ ' + money(rev) + ' × 100', money(t.ce) + ' ÷ ' + money(t.op) + ' × 100', money(rev) + ' ÷ ' + money(t.ce) + ' × 100'], answer: 0,
        why: 'ROCE = operating profit ÷ capital employed × 100 = ' + d2(t.op / t.ce * 100) + '%. Operating profit over revenue would be the operating profit margin.' };
    } },
    { skill: 'reverse', gen: function () {
      var pct = pick([8, 10, 12, 15, 18, 20, 25]), ce = rint(10, 100) * 5000, op = ce * pct / 100;
      return { kind: 'num', q: biz() + ' has capital employed of $' + money(ce) + ' and a ROCE of ' + pct + '%.<br>Calculate its operating profit in $.',
        answer: op, unit: '$', display: money(op),
        why: 'Operating profit = ROCE × capital employed = ' + pct + ' ÷ 100 × ' + money(ce) + ' = $' + money(op) + '.' };
    } },
    { skill: 'reverse', gen: function () {
      var pct = pick([5, 8, 10, 12.5, 16, 20, 25]), ce = rint(8, 90) * 10000, op = ce * pct / 100;
      return { kind: 'num', q: 'A quarry made an operating profit of $' + money(op) + ' and its ROCE was ' + pct + '%.<br>Calculate its capital employed in $.',
        answer: ce, unit: '$', display: money(ce),
        why: 'Capital employed = operating profit ÷ ROCE × 100 = ' + money(op) + ' ÷ ' + pct + ' × 100 = $' + money(ce) + '.' };
    } },
    { skill: 'compare', gen: function () {
      return retry(function () {
        var n = twoBiz(), a = roceVals(), b = roceVals(), rA = a.op / a.ce * 100, rB = b.op / b.ce * 100;
        if (Math.abs(rA - rB) < 2 || (a.op > b.op) === (rA > rB)) return null;
        return { kind: 'mcq', q: tbl(['', n[0] + ' ($)', n[1] + ' ($)'], [['Operating profit', money(a.op), money(b.op)], ['Capital employed', money(a.ce), money(b.ce)]]) + 'Which business makes better use of the capital invested in it, measured by ROCE?',
          options: [n[0], n[1], 'Both have the same ROCE'], answer: rA > rB ? 0 : 1,
          why: n[0] + ': ' + money(a.op) + ' ÷ ' + money(a.ce) + ' × 100 = ' + d2(rA) + '%. ' + n[1] + ': ' + money(b.op) + ' ÷ ' + money(b.ce) + ' × 100 = ' + d2(rB) + '%. The higher ROCE is better, even though it has the smaller operating profit.' };
      });
    } },
    { skill: 'compare', gen: function () {
      return retry(function () {
        var a = roceVals(), b = roceVals(), r1 = R.roundDp(a.op / a.ce * 100, 2), r2 = R.roundDp(b.op / b.ce * 100, 2), diff = R.roundDp(Math.abs(r2 - r1), 2);
        if (diff < 1 || diff > 8) return null;
        return { kind: 'num', q: 'Last year a cinema chain made an operating profit of $' + money(a.op) + ' on capital employed of $' + money(a.ce) + '. This year the figures were $' + money(b.op) + ' and $' + money(b.ce) + '.<br>Calculate each year’s ROCE to 2 decimal places. By how many percentage points has ROCE ' + (r2 > r1 ? 'risen' : 'fallen') + '?',
          answer: diff, unit: '', tol: 0.0101, display: d2(diff),
          why: 'Last year: ' + money(a.op) + ' ÷ ' + money(a.ce) + ' × 100 = ' + d2(r1) + '%. This year: ' + money(b.op) + ' ÷ ' + money(b.ce) + ' × 100 = ' + d2(r2) + '%. Change = ' + d2(diff) + ' percentage points.' };
      });
    } },
    { skill: 'effect', gen: function () {
      var t = roceVals(), inv = rint(5, 40) * 5000, extra = Math.round(inv * rint(4, 30) / 100 / 100) * 100, v = (t.op + extra) / (t.ce + inv) * 100;
      return pctNum(biz() + ' has capital employed of $' + money(t.ce) + ' and an operating profit of $' + money(t.op) + '. It takes out a long-term loan of $' + money(inv) + ' to buy new equipment, which adds $' + money(extra) + ' to operating profit.<br>Calculate the new ROCE to 2 decimal places.',
        v, 'A long-term loan is part of capital employed, so it rises to ' + money(t.ce + inv) + '. Operating profit becomes ' + money(t.op + extra) + '. ROCE = ' + money(t.op + extra) + ' ÷ ' + money(t.ce + inv) + ' × 100 = ' + d2(v) + '%.');
    } },
    { skill: 'effect', gen: function () {
      var t = roceVals(), v = t.op / t.ce * 100, per = R.roundDp(v, 2);
      return { kind: 'num', q: 'A boat-hire business made an operating profit of $' + money(t.op) + ' on capital employed of $' + money(t.ce) + '.<br>How many dollars of operating profit does it make for every $100 of capital employed? Give your answer to 2 decimal places.',
        answer: per, unit: '$', tol: 0.005, display: d2(per),
        why: 'This is the ROCE: ' + money(t.op) + ' ÷ ' + money(t.ce) + ' × 100 = ' + d2(v) + '%, so $' + d2(v) + ' of operating profit for every $100 invested.' };
    } },
    { skill: 'meaning', kind: 'mcq', q: 'Which formula gives the return on capital employed?',
      options: ['Operating profit ÷ capital employed × 100', 'Gross profit ÷ capital employed × 100', 'Capital employed ÷ operating profit × 100', 'Operating profit ÷ revenue × 100'], answer: 0,
      why: 'ROCE compares operating profit with the long-term money invested in the business, then multiplies by 100 to give a percentage.' },
    { skill: 'meaning', kind: 'mcq', q: 'A food factory’s ROCE is 18%. What does this show?',
      options: ['It makes $18 of operating profit for every $100 of capital employed', 'It makes $18 of operating profit for every $100 of sales revenue it earns', 'Its capital employed grew by 18% this year', 'It pays 18% interest on its long-term loans'], answer: 0,
      why: 'ROCE = operating profit ÷ capital employed × 100. 18% means $18 of operating profit is earned for each $100 of long-term money invested.' },
    { skill: 'meaning', kind: 'multi', q: 'A student is given a firm’s revenue, gross profit, operating profit, current assets, inventory and capital employed. Which figures does the student need to calculate ROCE?',
      options: ['Operating profit', 'Capital employed', 'Revenue', 'Gross profit', 'Current assets'], answers: [0, 1],
      why: 'ROCE only needs operating profit and capital employed. Revenue is for margins, gross profit is not the right profit, and current assets are for liquidity ratios.' },
    { skill: 'meaning', kind: 'mcq', q: 'Why does ROCE use operating profit rather than gross profit?',
      options: ['Operating profit takes account of all running costs, including overheads', 'Gross profit is only shown on the statement of financial position, not in the income statement', 'Operating profit always equals the cash the business holds', 'Gross profit cannot be compared between years'], answer: 0,
      why: 'Operating profit is what is left after both cost of sales and overheads, so it gives a fuller view of how well the invested capital is being used.' }
  ] };

  /* ===================================================== BUS-S3-23 statement of financial position */
  var SFP_CATS = ['Non-current asset', 'Current asset', 'Current liability', 'Non-current liability'];
  var SFP_ITEMS = [
    ['a vet clinic', 'its X-ray machine', 0], ['a removals firm', 'its fleet of lorries', 0], ['a hotel', 'the hotel building it owns', 0], ['a printing firm', 'its printing presses', 0],
    ['a bookshop', 'books on its shelves waiting to be sold', 1], ['a builder', 'money a customer owes for a finished extension', 1], ['a café', 'cash in its bank account', 1], ['a jeweller', 'gold rings held for sale', 1],
    ['a bakery', 'an unpaid flour bill due next month', 2], ['a garage', 'its bank overdraft', 2], ['a florist', 'money owed to a flower grower, due in 30 days', 2], ['a gym', 'wages owed to staff for last week', 2],
    ['a farm', 'a bank loan repayable over 10 years', 3], ['a dental practice', 'a mortgage on its surgery, repayable over 20 years', 3], ['a factory', 'a loan from the owner’s family, due in 5 years', 3], ['a school uniform shop', 'a 4-year loan used to buy its shop fittings', 3]];
  B['BUS-S3-23'] = { title: 'Statement of financial position: assets and liabilities', items: [
    { skill: 'classify', gen: function () {
      var it = pick(SFP_ITEMS);
      return { kind: 'mcq', q: 'How should ' + it[0] + ' show <b>' + it[1] + '</b> on its statement of financial position?', options: SFP_CATS.slice(), answer: it[2],
        why: ['The business owns it and keeps it for more than a year, so it is a non-current asset.', 'The business owns it and it will be cash, or turn into cash, within twelve months, so it is a current asset.', 'The business owes it and must pay within twelve months, so it is a current liability.', 'The business owes it but repays it over more than twelve months, so it is a non-current liability.'][it[2]] };
    } },
    { skill: 'classify', kind: 'mcq', q: 'A courier company owns six delivery vans that it expects to use for the next five years. How are the vans classified?',
      options: ['Non-current assets', 'Current assets', 'Inventory', 'Current liabilities'], answer: 0,
      why: 'The vans are owned and kept for more than a year to run the business, so they are non-current assets. They are not stock for sale, so they are not inventory.' },
    { skill: 'classify', kind: 'mcq', q: 'A restaurant has agreed an overdraft with its bank and is currently using $4,000 of it. Where does this appear?',
      options: ['Current liabilities', 'Non-current liabilities', 'Current assets', 'Capital employed'], answer: 0,
      why: 'An overdraft is money owed to the bank that can be called in at short notice, so it is a debt due within twelve months: a current liability.' },
    { skill: 'classify', kind: 'multi', q: 'A bakery is preparing its statement of financial position. Which of these are <b>non-current assets</b>?',
      options: ['Its bread ovens', 'The shop premises it owns', 'Bags of flour in the storeroom', 'Cash in the till', 'Money owed to the flour supplier'], answers: [0, 1],
      why: 'Ovens and premises are owned and used for many years, so they are non-current assets. Flour and cash are current assets, and money owed to the supplier is a current liability.' },
    { skill: 'classify', kind: 'multi', q: 'Which of these are <b>current liabilities</b> for a clothing retailer?',
      options: ['A bill from a fabric supplier due in 60 days', 'Its bank overdraft', 'A mortgage on its warehouse repayable over 15 years', 'Jackets in stock waiting to be sold', 'Its delivery van'], answers: [0, 1],
      why: 'Current liabilities are debts due within twelve months, such as the supplier bill and the overdraft. The mortgage is due over many years (non-current), the jackets are inventory and the van is a non-current asset.' },
    { skill: 'classify', kind: 'mcq', q: 'A student wrote: “A factory building is a current asset because the business uses it every day.” What is wrong with this?',
      options: ['A building is kept for more than a year, so it is a non-current asset', 'A building is usually paid for with a bank loan, so it is shown as a liability', 'A building is inventory because it can be sold', 'A building only appears in the income statement'], answer: 0,
      why: 'How often an asset is used does not matter. A building is owned and kept for many years, so it is a non-current asset.' },
    { skill: 'define', kind: 'mcq', q: 'Which is the correct definition of <b>current liabilities</b>?',
      options: ['Debts a business must pay within twelve months', 'Debts a business must pay after more than twelve months', 'Items a business owns that will become cash within twelve months', 'The money spent by a business during the year'], answer: 0,
      why: 'Liabilities are what a business owes. “Current” means they must be paid within twelve months, for example an overdraft or money owed to suppliers.' },
    { skill: 'define', kind: 'mcq', q: 'Which is the correct definition of <b>non-current assets</b>?',
      options: ['Items a business owns and keeps for more than a year', 'Items a business owns that will be turned into cash within a year', 'Debts a business will repay over more than a year', 'Goods a business holds in order to sell them'], answer: 0,
      why: 'Non-current assets are owned and used for more than a year, such as buildings, machinery and vehicles.' },
    { skill: 'define', kind: 'mcq', q: 'What is meant by <b>inventory</b>?',
      options: ['The stock of goods or materials a business holds to sell or use in production', 'The money that customers owe the business for goods bought on credit', 'The machinery, tools and equipment that the business uses to make its products', 'The list of all debts the business owes to suppliers'], answer: 0,
      why: 'Inventory is stock: raw materials, part-finished goods or finished goods waiting to be sold. It is a current asset.' },
    { skill: 'define', kind: 'mcq', q: 'Which is the best definition of <b>non-current liabilities</b>?',
      options: ['Debts that a business does not have to repay for more than twelve months', 'Debts that a business must repay within the next twelve months', 'Assets that a business owns and expects to keep for more than twelve months', 'Money the owners have taken out of the business'], answer: 0,
      why: 'Non-current liabilities are debts due after twelve months, for example a long-term bank loan or a mortgage.' },
    { skill: 'define', kind: 'mcq', q: 'What is meant by <b>capital employed</b>?',
      options: ['The long-term money invested in the business', 'The cash the business holds at the end of the year', 'The total value of the business’s inventory', 'The money the business owes within twelve months'], answer: 0,
      why: 'Capital employed is the long-term finance invested in the business: the owners’ capital plus long-term borrowing.' },
    { skill: 'sfp-vs-income', kind: 'mcq', q: 'Which of these would <b>not</b> appear on a statement of financial position?',
      options: ['Gross profit', 'Trade receivables', 'A bank overdraft', 'Machinery'], answer: 0,
      why: 'Gross profit is part of the income statement, which shows revenue and costs over a period. Receivables, overdrafts and machinery are assets or liabilities, so they appear on the statement of financial position.' },
    { skill: 'sfp-vs-income', kind: 'multi', q: 'Which of these belong on the statement of financial position rather than the income statement?',
      options: ['A long-term bank loan', 'Cash at the bank', 'Delivery vehicles', 'Revenue from sales', 'Rent paid for the year'], answers: [0, 1, 2],
      why: 'The loan, cash and vehicles are things owed or owned on a date, so they go on the statement of financial position. Revenue and rent are income and expenses for the year, which go in the income statement.' },
    { skill: 'sfp-vs-income', kind: 'mcq', q: 'What does a statement of financial position show?',
      options: ['What a business owns and owes on a particular date', 'The revenue and costs of a business over a year', 'The expected cash inflows and outflows for each month', 'The share of the market held by a business'], answer: 0,
      why: 'It is a snapshot on one date of assets (owned) and liabilities (owed). Revenue and costs over a year are in the income statement, and monthly cash flows are in a cash-flow forecast.' },
    { skill: 'purpose', kind: 'mcq', q: 'Which answer best explains one purpose of the statement of financial position for a small manufacturer?',
      options: ['It compares current assets with current liabilities, so the owner can see if short-term debts can be paid and arrange an overdraft early if not', 'It is a financial statement that lists assets, liabilities and capital employed at the end of the year', 'It shows the revenue and profit made from each product line, so the owner can decide to stop selling the least popular one and focus on the best sellers', 'It is useful because all businesses must produce one and it contains lots of information'], answer: 0,
      why: 'A purpose needs to say what the statement shows and what decision it leads to. Simply describing the statement earns nothing, and revenue by product belongs to the income statement.' },
    { skill: 'purpose', kind: 'mcq', q: 'A student was asked to explain one purpose of the statement of financial position. Which answer would earn <b>no</b> marks?',
      options: ['It is a document showing the assets and liabilities of a business at a point in time', 'It shows the debts owed, so managers can plan how to reduce borrowing before taking on more', 'It shows the assets owned, so the owner can see if there are funds available to expand', 'It shows inventory levels, so managers can decide whether too much money is tied up in stock'], answer: 0,
      why: 'Defining the statement is not a purpose. Each of the other answers links what the statement shows to a decision, which is what the question asks for.' },
    { skill: 'purpose', kind: 'mcq', q: 'A bank is deciding whether to lend $50,000 to a printing firm. What could it learn from the firm’s statement of financial position?',
      options: ['How much the firm already owes and which assets it owns that could secure the loan', 'How much revenue the firm made from each of its customers last year, and which customers buy the most', 'Whether the firm’s prices are lower than those of its competitors', 'How many workers the firm employs and how much they are paid'], answer: 0,
      why: 'The statement shows existing liabilities and the assets owned, which helps the bank judge whether the firm can take on and repay more debt.' },
    { skill: 'interpret', gen: function () {
      var inv = rint(20, 90) * 100, rec = rint(10, 60) * 100, cash = rint(5, 50) * 100, nca = rint(40, 200) * 1000, tp = rint(10, 60) * 100;
      return { kind: 'num', q: 'Extract from the statement of financial position of ' + biz() + ':' +
        tbl(['', '$'], [['Machinery', money(nca)], ['Inventory', money(inv)], ['Trade receivables', money(rec)], ['Cash', money(cash)], ['Trade payables', money(tp)]]) + 'What is the value of its <b>current assets</b>? Give your answer in $.',
        answer: inv + rec + cash, unit: '$', display: money(inv + rec + cash),
        why: 'Current assets are inventory, receivables and cash: ' + money(inv) + ' + ' + money(rec) + ' + ' + money(cash) + ' = $' + money(inv + rec + cash) + '. Machinery is a non-current asset and trade payables are a current liability.' };
    } },
    { skill: 'interpret', gen: function () {
      var eq = rint(20, 300) * 1000, loan = rint(10, 150) * 1000, od = rint(2, 20) * 1000;
      return { kind: 'num', q: 'A ski-hire business has owners’ capital of $' + money(eq) + ', a bank loan of $' + money(loan) + ' repayable over 7 years and an overdraft of $' + money(od) + '.<br>Calculate its capital employed in $.',
        answer: eq + loan, unit: '$', display: money(eq + loan),
        why: 'Capital employed is long-term money: owners’ capital plus long-term loans = ' + money(eq) + ' + ' + money(loan) + ' = $' + money(eq + loan) + '. The overdraft is a current liability, so it is not included.' };
    } },
    { skill: 'interpret', kind: 'mcq', q: 'Over one year a shoe shop’s inventory rose from $20,000 to $45,000 while its cash fell from $18,000 to $3,000. What is the most reasonable conclusion?',
      options: ['More of its money is now tied up in stock, leaving less cash to pay short-term debts', 'It must have made a large profit this year, because the total value of its current assets has risen', 'Its non-current assets have increased, so it has expanded', 'Its current liabilities must have fallen by the same amount'], answer: 0,
      why: 'Cash has been turned into stock. Stock must be sold before it becomes cash again, so the shop has less cash available to pay bills.' },
    { skill: 'applied-state', kind: 'mcq', q: 'Which of these is a non-current asset that a taxi firm is likely to own?',
      options: ['The cars it uses to carry passengers', 'Fares owed by a business that pays monthly', 'Fuel bought this week for the cars', 'Its agreed bank overdraft'], answer: 0,
      why: 'The cars are owned and used for several years to provide the service. Fares owed and fuel are current assets, and an overdraft is a current liability.' },
    { skill: 'applied-state', kind: 'mcq', q: 'Which item is an example of inventory for a hair salon?',
      options: ['Bottles of shampoo and hair colour', 'The salon’s styling chairs', 'Rent owed to the landlord this month', 'A 3-year loan for the salon fit-out'], answer: 0,
      why: 'Shampoo and colour are materials held for use and sale, so they are inventory, a current asset. Chairs are non-current assets; rent owed and the loan are liabilities.' },
    { skill: 'applied-state', kind: 'mcq', q: 'Which of these would be a non-current liability for a fruit farm?',
      options: ['A loan to buy a tractor, repayable over eight years', 'The tractor itself', 'Seeds stored for next month’s planting', 'Wages owed to fruit pickers for the work they did last week'], answer: 0,
      why: 'The loan is owed and repaid over more than twelve months. The tractor is a non-current asset, the seeds are inventory and the wages owed are a current liability.' },
    { skill: 'applied-state', kind: 'mcq', q: 'A software company’s statement of financial position shows large “trade receivables”. What does this item represent?',
      options: ['Money owed to the company by customers who have not paid yet', 'Money the company owes to its suppliers', 'Computers the company owns and uses', 'Software packages that the company holds in stock ready for sale'], answer: 0,
      why: 'Receivables are amounts customers owe the business. They will normally be paid within a year, so they are a current asset.' }
  ] };

  /* ===================================================== BUS-S1-32 reasons for business failure */
  B['BUS-S1-32'] = { title: 'Reasons why businesses fail', items: [
    { skill: 'cause-identify', kind: 'mcq', q: 'A family-run sandwich bar closed six months after a large chain opened next door, selling similar sandwiches for 30% less. Which reason for failure does this show?',
      options: ['The business was not competitive', 'Customers paid the business too slowly', 'The bank refused a loan to start the business', 'The owners failed to keep any inventory'], answer: 0,
      why: 'The rival offered a lower price, so customers went elsewhere. Losing customers to cheaper or better rivals means the business was not competitive.' },
    { skill: 'cause-identify', kind: 'mcq', q: 'For years a shop printed photos from film. When almost everyone moved to taking pictures on smartphones, the owner kept offering only film printing, and sales fell until the shop closed. Which reason for failure fits best?',
      options: ['Failure to adapt to changes in the market', 'Cash-flow problems caused by slow-paying customers', 'Lack of finance to buy the shop at the start', 'Too much money spent on wages'], answer: 0,
      why: 'Technology and customer habits changed, but the shop did not change its services. That is a failure to adapt to changes in the market.' },
    { skill: 'cause-identify', kind: 'mcq', q: 'A building contractor pays its workers every week, but its customers usually take 90 days to pay. Its overdraft is at its limit and a timber supplier is threatening legal action. Which reason for failure is shown?',
      options: ['Cash-flow problems', 'Failure to adapt to new technology', 'Not being competitive on price', 'Too few customers wanting the service'], answer: 0,
      why: 'Cash is going out (wages) long before it comes in (customer payments), so the contractor cannot pay its bills on time. That is a cash-flow problem.' },
    { skill: 'cause-identify', kind: 'mcq', q: 'A new food-delivery start-up used all the owner’s savings. It needed $40,000 more for vehicles, but banks and investors refused to provide it, so it stopped trading. Which reason for failure is this?',
      options: ['Lack of finance', 'Failure to adapt to changing tastes', 'Not being competitive on quality', 'Paying suppliers too quickly'], answer: 0,
      why: 'The business could not raise the money it needed to keep going. That is lack of finance.' },
    { skill: 'cause-identify', kind: 'multi', q: 'Which of these are reasons why businesses can fail?',
      options: ['Cash-flow problems', 'Not being competitive', 'Failing to adapt to changes in the market', 'Having a large share of the market', 'Having loyal repeat customers'], answers: [0, 1, 2],
      why: 'Cash-flow problems or lack of finance, not being competitive and failing to adapt are the main causes of failure. A large market share and loyal customers make failure less likely.' },
    { skill: 'cash-vs-profit', kind: 'mcq', q: 'How can a business that is making a profit still fail?',
      options: ['Its customers pay late, so it runs out of cash to pay wages and suppliers on time', 'Profit is the same as cash, so a profitable business can pay all its bills on time', 'Its revenue is higher than its costs, which causes debts to rise', 'Making a profit means it must pay all its debts immediately'], answer: 0,
      why: 'Profit is not the same as cash. If cash comes in too late, the business cannot pay bills when they are due, even though its sales are higher than its costs.' },
    { skill: 'cash-vs-profit', kind: 'mcq', q: 'An events company made a profit of $40,000 last year. However, clients still owe it $65,000 and its bank account is empty. Why could it still fail?',
      options: ['It may not have the cash to pay its debts when they are due', 'Its profit means it is not allowed to borrow money', 'Clients who owe money are a liability for the company', 'A profit of $40,000 is too small for an events company to keep trading'], answer: 0,
      why: 'Much of the profit is tied up in money owed by clients. Without cash in the bank it cannot pay suppliers or staff on time, so creditors could force it to close.' },
    { skill: 'cash-vs-profit', kind: 'mcq', q: 'What is meant by <b>insolvency</b>?',
      options: ['A business cannot pay its debts when they are due', 'A business has made a loss for one year', 'A business has more customers than it can possibly serve', 'A business has paid off all of its loans'], answer: 0,
      why: 'Insolvency means being unable to pay debts on time. It often leads to the business having to stop trading.' },
    { skill: 'cash-vs-profit', kind: 'mcq', q: 'A student wrote: “This business cannot fail because it made a profit last year.” What is the main flaw?',
      options: ['It ignores that the business could run out of cash even when profitable', 'It is correct, because profitable businesses never close', 'It ignores that profit is always higher than cash', 'It ignores that making a profit always increases the business’s liabilities'], answer: 0,
      why: 'Profit and cash are different. A profitable business with slow-paying customers or high spending can still be unable to pay its debts and fail.' },
    { skill: 'chain', kind: 'multi', q: 'A student starts an answer: “One reason a business may fail is cash-flow problems.” Which <b>two</b> statements develop this into a chain that ends with failure?',
      options: ['Suppliers are not paid on time, so they refuse to deliver more stock', 'Without stock to sell, revenue falls further until the business cannot pay its debts and closes', 'Cash flow is the money that flows into and out of a business', 'The owner might decide to open a second branch next year', 'Profit is revenue minus total costs'], answers: [0, 1],
      why: 'A good chain shows what the cause does (suppliers stop deliveries) and follows it to the end point (falling revenue, unpaid debts, closure). Definitions and unrelated ideas do not develop the point.' },
    { skill: 'chain', kind: 'mcq', q: 'Complete the chain: “A rival opens with lower prices → <b>?</b> → revenue falls → the business cannot cover its fixed costs → it closes.”',
      options: ['Customers switch to the cheaper rival', 'The business’s costs fall', 'The rival goes out of business', 'The business’s suppliers raise their prices'], answer: 0,
      why: 'Lower prices elsewhere make customers switch. That is the step that explains why revenue then falls.' },
    { skill: 'chain', kind: 'mcq', q: 'Which answer gives the best developed explanation of one reason why a business might fail?',
      options: ['If a business does not change its products when tastes change, customers buy elsewhere, so sales fall until it cannot cover its costs and must close', 'Businesses fail because of cash-flow problems, strong competition, a lack of finance, poor management, high costs and not adapting to changes in the market', 'A business may fail if it does not adapt to changes in the market', 'Businesses fail when they make a profit but do not have enough customers to buy their stock'], answer: 0,
      why: 'The best answer gives one cause and follows it through linked steps to the end point. A list of causes earns only one mark, and stopping after the cause gives no development.' },
    { skill: 'chain', kind: 'mcq', q: 'A student wrote: “Businesses fail because of cash flow, competition and not adapting.” Why would this earn few marks in an Explain question?',
      options: ['It lists causes but explains none of them', 'It names causes that are not linked to failure', 'It should only mention profit, not cash flow', 'It is too long for an Explain question'], answer: 0,
      why: 'An Explain answer needs one cause developed with linked steps, such as what happens to sales or cash and why the business then closes. A list earns only one mark.' },
    { skill: 'chain', kind: 'mcq', q: 'A chain reads: “The cinema did not offer online booking when rivals did → younger customers went to the rivals → ticket sales fell → <b>?</b>”. Which ending completes the chain best?',
      options: ['It could no longer cover its costs or pay its debts, so it had to close', 'It decided to sell more popcorn and drinks to the customers who still came', 'The rival cinemas had to raise their ticket prices', 'Its non-current assets became current assets'], answer: 0,
      why: 'A failure chain should finish at the end point: the business cannot pay its debts or cover costs, so it stops trading.' },
    { skill: 'chain', kind: 'mcq', q: 'Which step does <b>not</b> belong in a chain explaining failure caused by lack of finance?',
      options: ['The business’s main rival lowers its prices', 'The bank refuses to extend the business’s loan', 'The business cannot replace its broken machinery', 'Production stops, so orders cannot be met and it closes'], answer: 0,
      why: 'A rival lowering prices is a competition point, not a finance point. The other steps follow from being unable to raise money.' },
    { skill: 'applied', kind: 'mcq', q: '<i>Oakridge Joinery makes furniture for hotels. It gives hotels 60 days to pay, and its overdraft is already at its limit. Its timber supplier wants payment within 14 days.</i><br>Which is the best <b>applied</b> reason why Oakridge Joinery could fail?',
      options: ['Hotels take 60 days to pay but the timber supplier wants paying in 14, so Oakridge may run out of cash to pay for timber', 'Businesses can fail because they have cash-flow problems or a lack of finance', 'Oakridge may fail because its furniture is more expensive than that of its rivals, so hotels will choose cheaper suppliers instead', 'Oakridge may fail because hotels no longer want to buy furniture'], answer: 0,
      why: 'The best answer uses evidence from the case: the gap between 60-day customer payments and 14-day supplier payments, with no overdraft left. The generic answer does not use the case, and the others are not supported by it.' },
    { skill: 'applied', kind: 'multi', q: '<i>Page Turner is an independent bookshop. Online sellers now offer the same books for much less, and many customers now prefer to buy e-books, but the owner refuses to sell online or offer e-books.</i><br>Which <b>two</b> reasons for possible failure are supported by the case?',
      options: ['It is not competitive on price against online sellers', 'It is failing to adapt to customers moving to e-books and online buying', 'It cannot raise finance because the bank has refused a loan', 'Its customers are taking too long to pay their bills', 'It holds too little inventory to meet demand'], answers: [0, 1],
      why: 'The case shows cheaper online rivals (not competitive) and a refusal to change with customer habits (failure to adapt). Nothing in the case mentions bank loans, late payment or too little stock.' },
    { skill: 'applied', kind: 'mcq', q: '<i>A phone-repair shop’s customers now find it cheaper to replace a broken phone than to repair it. The owner has not changed the services he offers, and repair jobs have halved.</i><br>Which point is best supported by this case?',
      options: ['The shop has not adapted its services to the change in what customers want, so its sales are falling', 'The shop’s main problem is that customers pay too slowly for repairs, so it is short of cash to pay its bills', 'The shop is failing because the bank will not lend it money', 'The shop is failing because it charges more than rival repair shops'], answer: 0,
      why: 'The evidence is a change in customer behaviour with no response from the owner, which is a failure to adapt. The case gives no evidence of slow payment, bank problems or rival prices.' },
    { skill: 'applied', kind: 'mcq', q: '<i>A dance studio’s roof needs urgent repairs costing $25,000. The owner has no savings left, and two banks have refused a loan because the studio already owes a lot.</i><br>Which reason for possible failure is best supported by the case?',
      options: ['Lack of finance to pay for the repairs it needs', 'Not being competitive against other dance studios', 'Failing to adapt to new styles of dance', 'Holding too much inventory'], answer: 0,
      why: 'The studio needs money it cannot raise from savings or banks. Without the repairs it may have to stop trading, so lack of finance is the cause shown.' },
    { skill: 'judgement', kind: 'mcq', q: '<i>A packaging firm’s sales are steady and it made a profit last year. However, three large customers owe it $90,000 between them, and a supplier is demanding immediate payment.</i><br>What is the most likely main threat to the firm’s survival?',
      options: ['A cash-flow problem caused by unpaid customer debts', 'Losing many of its customers to cheaper competitors', 'Failing to adapt to changes in customer tastes', 'A fall in demand for packaging'], answer: 0,
      why: 'Sales are steady and it is profitable, so competition and demand are not the issue. The danger is cash: money is owed to it but it must pay its supplier now.' },
    { skill: 'judgement', kind: 'mcq', q: 'A student wrote: “The new rival restaurant opening nearby means our restaurant will definitely fail.” What is the main weakness in this judgement?',
      options: ['It ignores that the result depends on how the restaurant responds and how loyal its customers are', 'It is correct, because new competition always causes failure', 'It confuses cash flow with competition', 'It ignores that restaurants are part of the tertiary sector of the economy'], answer: 0,
      why: 'Competition increases the risk of failure, but the outcome depends on things like customer loyalty and whether the business improves its prices, quality or service.' },
    { skill: 'judgement', kind: 'mcq', q: '<i>A bakery chain grew from two shops to nine in one year, paying for each new shop from its cash. Sales rose quickly, but it soon could not pay its flour suppliers on time.</i><br>Which reason for possible failure does this show?',
      options: ['Cash-flow problems caused by growing too quickly', 'Not being competitive because its prices were too high', 'Failure to adapt to customers’ changing tastes', 'Falling demand for bread in its market'], answer: 0,
      why: 'Sales were rising, so demand and competitiveness were fine. Spending cash on new shops faster than cash came in left it unable to pay suppliers: a cash-flow problem.' }
  ] };

  /* ===================================================== BUS-S4-14 responding to changes in the market */
  var MKT = [
    ['A bike shop', 'more customers now want electric bikes', 'Stock electric bikes and offer an e-bike servicing plan'],
    ['A cinema', 'more people now watch films at home on streaming services', 'Offer reclining seats and a dine-in menu to give an experience home viewing cannot'],
    ['A family restaurant', 'a recession has made local families cut spending on eating out', 'Introduce a lower-priced weekday family meal deal'],
    ['An independent bakery', 'a supermarket has opened an in-store bakery next door', 'Promote its hand-made, locally sourced bread to show how it differs'],
    ['A clothes shop', 'younger customers increasingly buy clothes online', 'Launch its own website with free delivery and returns'],
    ['A coffee shop', 'many customers now want plant-based milk', 'Add oat and soya milk options to every drink']];
  B['BUS-S4-14'] = { title: 'Responding to changes in the market', items: [
    { skill: 'identify-change', kind: 'mcq', q: 'More and more customers at a burger restaurant are asking for meat-free options. Which type of market change is this?',
      options: ['Changing customer needs', 'Increased competition', 'A rise in interest rates', 'A change in the business’s ownership'], answer: 0,
      why: 'Customers want something different from before, so their needs and tastes have changed.' },
    { skill: 'identify-change', kind: 'mcq', q: 'After a rise in unemployment, people in a town are spending less on holidays and more on home entertainment. Which market change is this?',
      options: ['A change in consumer spending patterns', 'Increased competition from new travel agents', 'A change in the business’s production methods', 'A fall in the number of suppliers'], answer: 0,
      why: 'A spending pattern is how much customers spend and on what. Spending moving away from holidays towards home entertainment is a change in spending patterns.' },
    { skill: 'identify-change', kind: 'mcq', q: 'Two new gyms have opened within a mile of an existing gym in the last year. Which market change does the existing gym face?',
      options: ['Increased competition', 'A change in spending patterns', 'Changing customer needs', 'Falling production costs'], answer: 0,
      why: 'New businesses selling the same service nearby give customers more choice, which is increased competition.' },
    { skill: 'identify-change', kind: 'multi', q: 'Which of these are <b>changes in the market</b> that a business may need to respond to?',
      options: ['A new rival opens offering a similar product', 'Customers start choosing healthier snacks', 'Customers cut spending on luxuries as incomes fall', 'A machine in the factory breaks down', 'The owner decides to retire'], answers: [0, 1, 2],
      why: 'Competition, changing tastes and changing spending are market changes. A broken machine or the owner retiring are internal events, not changes in the market.' },
    { skill: 'identify-change', kind: 'mcq', q: 'What is meant by a customer <b>spending pattern</b>?',
      options: ['How much customers spend and what they spend it on', 'The order in which a business pays its suppliers', 'The way a business spreads its advertising over the year', 'The prices that competitors charge for similar products'], answer: 0,
      why: 'Spending patterns describe how much people spend and on which goods and services. They change with incomes and trends.' },
    { skill: 'applied-response', gen: function () {
      var i = rint(0, MKT.length - 1), s = MKT[i], others = MKT.filter(function (_, j) { return j !== i; }), opts = [s[2]];
      while (opts.length < 4) { var o = pick(others)[2]; if (opts.indexOf(o) < 0) opts.push(o); }
      return { kind: 'mcq', q: s[0] + ' finds that ' + s[1] + '. Which response best fits this business and this change?', options: opts, answer: 0,
        why: 'The response should tackle the change in the case: ' + s[1] + '. “' + s[2] + '” does that directly, which should help it keep customers and protect sales. The other responses belong to different businesses.' };
    } },
    { skill: 'applied-response', kind: 'mcq', q: '<i>Greenleaf is a small organic grocer. A large supermarket nearby has started selling organic vegetables at lower prices.</i><br>Which method would best help Greenleaf respond to this greater competition?',
      options: ['Advertise that its vegetables come from farms within 20 miles and offer a weekly veg-box delivery', 'Increase its prices to show customers that its organic vegetables are better quality than the supermarket’s', 'Do nothing, because the supermarket sells many other products as well', 'Advertise more, because advertising always increases sales'], answer: 0,
      why: 'The best answer is applied to Greenleaf: it stresses what the supermarket cannot easily match (local farms, delivery). “Advertise more” is generic, and raising prices or doing nothing would push customers away.' },
    { skill: 'applied-response', kind: 'mcq', q: 'In a State question, a student is asked for one way a seaside ice-cream parlour could respond to a new rival. Which answer is best?',
      options: ['Open on winter weekends with hot desserts so it trades when the rival is closed', 'Improve the marketing mix', 'Respond to the new rival by improving the business so that more customers choose it', 'Lower costs'], answer: 0,
      why: 'The answer needs a clear method that fits this business. Opening in winter with hot desserts is specific to an ice-cream parlour; the others are too vague to show application.' },
    { skill: 'applied-response', kind: 'mcq', q: '<i>A furniture store finds that, as local incomes have risen, customers are spending more on high-quality, designer items.</i><br>Which response best fits this change?',
      options: ['Add a premium range of designer furniture', 'Cut prices on its cheapest furniture range', 'Close one of its showrooms to cut costs', 'Stop offering home delivery'], answer: 0,
      why: 'Spending has shifted towards higher-quality items, so a premium range lets the store win this extra spending. Cutting prices on cheap items does not match the change.' },
    { skill: 'chain', kind: 'multi', q: 'A student writes: “A town-centre newsagent could extend its opening hours to 9 pm.” Which <b>two</b> statements develop this into a chain of reasoning?',
      options: ['Commuters returning late from work can then buy from the shop', 'This leads to more sales and stops these customers going to the 24-hour garage', 'Opening hours are part of the service a business offers', 'The newsagent sells newspapers and sweets', 'Some shops in other towns already open late'], answers: [0, 1],
      why: 'The chain links the response to a group of customers and then to sales and keeping customers from a rival. The other statements are descriptions that do not develop the point.' },
    { skill: 'chain', kind: 'mcq', q: 'Complete the chain: “A café starts offering vegan meals → <b>?</b> → more customers visit → sales and market share rise.”',
      options: ['It now meets the needs of customers who avoid animal products', 'Its costs of ingredients fall sharply', 'Rival cafés in the area are all forced to close down straight away', 'It no longer needs to advertise'], answer: 0,
      why: 'Offering vegan meals matters because it meets a changed customer need, which is why more customers then visit.' },
    { skill: 'chain', kind: 'mcq', q: 'Which statement best explains why it is important for a business to respond to changes in the market?',
      options: ['If it keeps offering what customers no longer want, they switch to rivals, so sales fall and it may even fail', 'Changes in the market happen every year in all industries', 'Responding to change is part of the marketing mix', 'Businesses respond to change mainly so that they look the same as their competitors'], answer: 0,
      why: 'The best answer gives a full chain: no response, customers switch, sales fall, possible failure. The others describe change without explaining its effect.' },
    { skill: 'chain', kind: 'mcq', q: 'Which is the most likely <b>first</b> effect of increased competition on an existing business?',
      options: ['Customers have more choice, so some may switch to the new rivals', 'The business’s costs of production rise because it must buy more materials', 'The business’s inventory automatically falls', 'The business must change its legal structure'], answer: 0,
      why: 'More rivals give customers more choice. Some switch, which can then reduce the business’s sales and market share.' },
    { skill: 'evaluate', kind: 'mcq', q: '<i>A violin maker has made instruments by hand in the same way for 40 years. Professional musicians travel from abroad to buy them because of its reputation for traditional craft.</i><br>Which is the strongest argument that it does <b>not</b> need to change much?',
      options: ['Its customers buy because of its traditional methods, so big changes could weaken its unique image', 'All businesses should avoid change because it is expensive', 'Professional musicians do not care about the quality of their violins, only about the price they pay', 'The market for violins never changes'], answer: 0,
      why: 'A business with a strong, unique image may need only small changes, because its customers value exactly what makes it different. The other statements are generalisations that are not true.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A local bookshop is deciding whether to cut its prices to match an online rival. The decision mainly <b>depends on</b>:',
      options: ['whether it can still cover its costs at the lower price and whether customers would switch back', 'whether the online rival has a well-known brand name', 'how many books the bookshop sold ten years ago', 'how many books the shop’s own staff buy from it each month'], answer: 0,
      why: 'Cutting prices only helps if it wins customers back and the shop still covers its costs. Otherwise it may lose profit without gaining sales.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A student wrote: “A business must always respond to every market change straight away.” What is the main flaw?',
      options: ['It ignores the cost of change and the chance that the response will not work', 'It is correct, because responding never has any drawbacks', 'It confuses market changes with changes in the law', 'It ignores that only large businesses face market changes'], answer: 0,
      why: 'Responding costs money and is risky. A good evaluation weighs the benefit of responding against its cost, and considers whether the change is lasting.' },
    { skill: 'evaluate', kind: 'mcq', q: '<i>A pizza takeaway surveys customers: 70% say they would order more if it delivered. Two nearby rivals already deliver. A delivery scooter costs $3,000, which it can afford from its savings.</i><br>Which conclusion is best justified?',
      options: ['It should start delivering, because demand is clear, rivals already deliver and the cost is affordable', 'It should not deliver, because any new spending is a risk', 'It should cut its prices instead, because the survey clearly shows that most customers mainly want lower prices', 'It should wait until all of its rivals stop delivering'], answer: 0,
      why: 'The evidence supports delivery: strong customer demand, competitive pressure and an affordable cost. The survey says nothing about prices.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A toy maker plans to launch a range of educational coding toys because tastes are changing. Which is a valid drawback of this response?',
      options: ['Developing the new range costs money and it may not sell as well as hoped', 'It will definitely increase the toy maker’s market share and its profits', 'Customers never change their tastes in toys', 'New products cannot be advertised'], answer: 0,
      why: 'Responding has costs and risks: development spending is needed and success is not guaranteed. A balanced answer weighs this against the benefit.' },
    { skill: 'evaluate', kind: 'multi', q: '<i>A hotel finds that business travellers now hold more meetings online, so fewer of them stay overnight.</i><br>Which <b>two</b> points would help a balanced evaluation of whether the hotel should convert some rooms for leisure guests?',
      options: ['Leisure guests could fill rooms that business travellers no longer book', 'The conversion has a cost, and leisure bookings may be lower in term time', 'Hotels are part of the tertiary sector', 'Business travellers used to stay in hotels', 'All hotels in the world are converting rooms'], answers: [0, 1],
      why: 'A balanced evaluation weighs a benefit (filling empty rooms) against a cost or risk (spending and uncertain leisure demand). The other points are facts or claims that do not help the judgement.' },
    { skill: 'evaluate', kind: 'mcq', q: 'Which is the most likely result if a business does <b>not</b> respond when customer tastes change?',
      options: ['Sales fall as customers buy from businesses that offer what they now want', 'Its costs fall because it no longer needs to spend money on changing anything', 'It gains market share because rivals waste money changing', 'Customers stay loyal because they dislike change'], answer: 0,
      why: 'If the business keeps selling what customers no longer want, they switch to rivals. Sales and market share fall, and in the end the business could fail.' },
    { skill: 'evaluate', kind: 'mcq', q: 'An electronics shop faces a new discount rival. Which response is most likely to protect its sales <b>without</b> starting a price war?',
      options: ['Offer free set-up and an extended warranty with every purchase', 'Cut all of its prices below the discount rival’s prices straight away', 'Reduce its opening hours to save costs', 'Stop stocking the products the rival sells'], answer: 0,
      why: 'Adding service gives customers a reason to choose the shop while keeping prices, so it competes on value rather than starting a price war it may not afford.' },
    { skill: 'applied-response', kind: 'mcq', q: '<i>A town’s only bowling alley has seen fewer visits since a trampoline park opened nearby.</i><br>Which is the best <b>outline</b> of one response?',
      options: ['Offer birthday-party packages with food, so families choose it over the trampoline park for parties', 'Change its marketing mix, so that more people in the town visit the bowling alley instead of other places', 'Respond to competition, because competition affects every business', 'Sell the bowling alley to the trampoline park'], answer: 0,
      why: 'An Outline needs a response applied to the business plus a linked effect. Party packages fit a bowling alley, and the effect is winning family parties back from the rival.' }
  ] };

  /* ===================================================== BUS-S1-18 effects of exchange rate changes */
  // [home country, home currency, partner country, partner currency, home plural, partner plural, roughly how many home units buy 1 partner unit]
  var FX = [['Kenya', 'shilling', 'Germany', 'euro', 'shillings', 'euros', 140], ['India', 'rupee', 'the USA', 'US dollar', 'rupees', 'US dollars', 84], ['Japan', 'yen', 'Australia', 'Australian dollar', 'yen', 'Australian dollars', 96],
    ['Brazil', 'real', 'the UK', 'pound', 'reais', 'pounds', 6.8], ['South Africa', 'rand', 'China', 'yuan', 'rand', 'yuan', 2.5], ['the UK', 'pound', 'Canada', 'Canadian dollar', 'pounds', 'Canadian dollars', 0.55],
    ['Mexico', 'peso', 'Spain', 'euro', 'pesos', 'euros', 19], ['Malaysia', 'ringgit', 'Singapore', 'Singapore dollar', 'ringgit', 'Singapore dollars', 3.4]];
  // Two realistic rates (home units per 1 partner unit). If the home currency appreciates, fewer home units are needed.
  function fxPair(c, up) {
    var dp = c[6] >= 50 ? 0 : 2, r1 = R.roundDp(c[6] * rint(92, 108) / 100, dp), r2 = R.roundDp(r1 * (up ? rint(80, 92) : rint(110, 125)) / 100, dp);
    return [r1.toFixed(dp), r2.toFixed(dp)];
  }
  var GOODS = ['furniture', 'tea', 'machine parts', 'cotton shirts', 'coffee', 'leather bags', 'spices', 'electric fans'];
  B['BUS-S1-18'] = { title: 'Effects of exchange rate changes', items: [
    { skill: 'direction', kind: 'mcq', q: 'What is meant by an <b>appreciation</b> of a currency?',
      options: ['The currency becomes stronger, so it buys more foreign currency', 'The currency becomes weaker, so each unit buys less foreign currency', 'The government stops the currency being exchanged', 'Prices in the country rise faster than in other countries'], answer: 0,
      why: 'Appreciation means a rise in the value of a currency against others: each unit buys more foreign currency.' },
    { skill: 'direction', kind: 'mcq', q: 'What is meant by a <b>depreciation</b> of a currency?',
      options: ['A fall in its value, so it buys less foreign currency', 'A rise in its value, so it buys more foreign currency', 'A fall in the value of a business’s machinery', 'A rise in the interest rate on loans in that currency'], answer: 0,
      why: 'Depreciation of a currency is a fall in its value against other currencies. Each unit buys less foreign currency.' },
    { skill: 'direction', gen: function () {
      var c = pick(FX), g = pick(GOODS), up = Math.random() < 0.5;
      return { kind: 'mcq', q: 'A business in ' + c[0] + ' imports ' + g + ' from ' + c[2] + ', paying in ' + c[5] + '. The ' + c[1] + ' ' + (up ? 'appreciates' : 'depreciates') + ' against the ' + c[3] + '. What happens to the cost of the ' + g + ' in ' + c[4] + '?',
        options: ['The cost rises', 'The cost falls', 'The cost stays the same, because the supplier’s price has not changed'], answer: up ? 1 : 0,
        why: up ? 'A stronger ' + c[1] + ' buys more ' + c[5] + ', so fewer ' + c[4] + ' are needed to pay the same ' + c[3] + ' price. Imports become cheaper.' : 'A weaker ' + c[1] + ' buys fewer ' + c[5] + ', so more ' + c[4] + ' are needed to pay the same ' + c[3] + ' price. Imports become dearer.' };
    } },
    { skill: 'direction', gen: function () {
      var c = pick(FX), g = pick(GOODS), up = Math.random() < 0.5;
      return { kind: 'mcq', q: 'A business in ' + c[0] + ' exports ' + g + ' to ' + c[2] + '. It keeps its price in ' + c[4] + ' the same. The ' + c[1] + ' ' + (up ? 'appreciates' : 'depreciates') + ' against the ' + c[3] + '. What happens to the price customers in ' + c[2] + ' pay in ' + c[5] + '?',
        options: ['The price rises', 'The price falls', 'The price is unchanged'], answer: up ? 0 : 1,
        why: up ? 'Customers in ' + c[2] + ' must now give up more ' + c[5] + ' to buy each ' + c[1] + ', so its exports cost them more. Exports become dearer and less competitive.' : 'Each ' + c[1] + ' now costs fewer ' + c[5] + ', so its exports are cheaper for customers in ' + c[2] + '. Exports become more competitive.' };
    } },
    { skill: 'direction', gen: function () {
      var c = pick(FX), up = Math.random() < 0.5, r = fxPair(c, up);
      return { kind: 'mcq', q: 'The exchange rate changes from 1 ' + c[3] + ' = ' + r[0] + ' ' + c[4] + ' to 1 ' + c[3] + ' = ' + r[1] + ' ' + c[4] + '. What has happened to the ' + c[1] + '?',
        options: ['It has appreciated against the ' + c[3], 'It has depreciated against the ' + c[3], 'Its value has not changed against the ' + c[3]], answer: up ? 0 : 1,
        why: 'Buying 1 ' + c[3] + ' now takes ' + r[1] + ' ' + c[4] + ' instead of ' + r[0] + '. ' + (up ? 'Fewer ' + c[4] + ' are needed, so each ' + c[1] + ' buys more: it has appreciated (become stronger).' : 'More ' + c[4] + ' are needed, so each ' + c[1] + ' buys less: it has depreciated (become weaker).') };
    } },
    { skill: 'direction', gen: function () {
      var c = pick(FX), g = pick(GOODS), up = Math.random() < 0.5, r = fxPair(c, up);
      return { kind: 'mcq', q: 'A firm in ' + c[0] + ' buys ' + g + ' from ' + c[2] + ' at a fixed price in ' + c[5] + '. The rate moves from 1 ' + c[3] + ' = ' + r[0] + ' ' + c[4] + ' to 1 ' + c[3] + ' = ' + r[1] + ' ' + c[4] + '. What is the effect on the firm?',
        options: ['Its import costs in ' + c[4] + ' fall', 'Its import costs in ' + c[4] + ' rise', 'Its import costs do not change'], answer: up ? 0 : 1,
        why: up ? 'Each ' + c[3] + ' now costs fewer ' + c[4] + ' (' + r[1] + ' instead of ' + r[0] + '), so the same bill in ' + c[5] + ' needs fewer ' + c[4] + '. Import costs and cash outflows fall.' : 'Each ' + c[3] + ' now costs more ' + c[4] + ' (' + r[1] + ' instead of ' + r[0] + '), so the same bill in ' + c[5] + ' needs more ' + c[4] + '. Import costs and cash outflows rise.' };
    } },
    { skill: 'direction', kind: 'mcq', q: 'Which pair of effects follows from a <b>stronger</b> home currency?',
      options: ['Imports become cheaper and exports become dearer for foreign buyers', 'Imports become dearer and exports become cheaper for foreign buyers', 'Imports and exports both become cheaper', 'Imports and exports both become dearer'], answer: 0,
      why: 'A strong currency buys more foreign currency, so imports cost less at home, while foreign buyers need more of their currency to buy exports.' },
    { skill: 'importer-exporter', kind: 'mcq', q: 'What is meant by an <b>exporter</b>?',
      options: ['A business that sells goods or services to customers in another country', 'A business that buys goods or materials from another country', 'A business that only sells its goods and services to customers in its own country', 'A government body that sets the exchange rate'], answer: 0,
      why: 'Exporters sell abroad. Importers buy from abroad.' },
    { skill: 'importer-exporter', kind: 'mcq', q: 'What is meant by an <b>importer</b>?',
      options: ['A business that buys goods or materials from another country', 'A business that sells its products to buyers in another country', 'A business owned by people from another country', 'A business that makes all its products at home'], answer: 0,
      why: 'Importers buy goods or materials from other countries. Exporters sell goods or services to customers in other countries.' },
    { skill: 'importer-exporter', kind: 'mcq', q: 'A rice farm in Thailand sells most of its harvest to food companies in Japan and buys its tractors from the USA. Which statement is correct?',
      options: ['It is an exporter of rice and an importer of tractors', 'It is an importer of rice and an exporter of tractors', 'It is only an importer, because it buys from the USA', 'It is neither, because it is based in Thailand'], answer: 0,
      why: 'Selling rice to buyers in another country makes it an exporter; buying tractors from another country makes it an importer. Many businesses are both.' },
    { skill: 'importer-exporter', kind: 'multi', q: 'The home currency of a country <b>depreciates</b>. Which of these businesses in that country are likely to benefit?',
      options: ['A firm selling machinery to buyers abroad', 'A beach resort that relies on foreign tourists', 'A shop selling only imported wine', 'A factory that imports most of its components', 'A car dealer that sells imported cars'], answers: [0, 1],
      why: 'A weaker currency makes the country’s goods and services cheaper for foreigners, helping exporters and tourism. Businesses buying from abroad face higher import costs.' },
    { skill: 'importer-exporter', kind: 'multi', q: 'The home currency <b>appreciates</b>. Which of these businesses are likely to be <b>harmed</b>?',
      options: ['A farm exporting most of its fruit', 'A software firm with most of its customers overseas', 'A retailer that imports all of its toys', 'A café buying imported coffee beans', 'A clothing shop selling imported jeans'], answers: [0, 1],
      why: 'A stronger currency makes exports dearer for foreign buyers, so exporters may lose sales. Importers benefit because their supplies become cheaper.' },
    { skill: 'importer-exporter', kind: 'mcq', q: 'A home currency becomes weaker. What happens to the <b>international competitiveness</b> of the country’s exporters?',
      options: ['It improves, because their prices fall in foreign currency', 'It gets worse, because their prices rise in foreign currency', 'It is not affected, because exporters set their own prices', 'It improves, because their imported materials become cheaper'], answer: 0,
      why: 'A weaker currency makes exports cheaper for foreign buyers, so the exporters become more price competitive.' },
    { skill: 'applied-chain', kind: 'mcq', q: '<i>Thandi’s Textiles in South Africa imports fabric from Italy and sells its clothes only in South Africa. The rand depreciates against the euro.</i><br>Which is the best analysis?',
      options: ['Fabric now costs more rand, so either prices rise and some customers may buy less, or profit per item falls', 'Its clothes become cheaper for Italian customers, so its export sales to Italy will rise and its revenue will increase', 'Fabric now costs fewer rand, so it can cut its prices and win customers', 'The change has no effect, because it sells only in South Africa'], answer: 0,
      why: 'The business imports but does not export, so the key effect is dearer fabric. That raises costs, leading to higher prices (lower demand) or a lower profit margin.' },
    { skill: 'applied-chain', kind: 'mcq', q: 'Complete the chain for a furniture exporter whose home currency depreciates: “Its prices in foreign currency fall → <b>?</b> → export sales rise → revenue increases.”',
      options: ['It becomes more price competitive against foreign rivals', 'Its imported wood becomes cheaper', 'Its foreign customers pay later', 'Its fixed costs fall'], answer: 0,
      why: 'Lower foreign prices make it more competitive, which explains why more foreign buyers choose its furniture.' },
    { skill: 'applied-chain', kind: 'mcq', q: '<i>A Japanese company imports rubber to make tyres and sells most of its tyres in Europe. The yen depreciates.</i><br>Which answer considers <b>both</b> sides of its business?',
      options: ['Rubber costs more yen, but tyres are cheaper for Europeans, so the effect on profit depends on which change is larger', 'Rubber costs more yen, so its costs rise and its profit will fall, as its tyre sales in Europe are not affected', 'Tyres are cheaper for Europeans, so its profit must rise', 'The yen depreciating makes both rubber and tyres cheaper'], answer: 0,
      why: 'A business that imports and exports is affected both ways. Higher import costs may be offset by more export sales, so the overall effect depends on their size.' },
    { skill: 'applied-chain', kind: 'mcq', q: '<i>A Canadian bookshop pays a US publisher in US dollars each month. The Canadian dollar appreciates against the US dollar.</i><br>What is the most likely effect on the bookshop?',
      options: ['It pays fewer Canadian dollars for each order, so its cash outflows fall', 'It pays more Canadian dollars for each order, so its cash outflows rise', 'Its revenue from Canadian customers falls', 'It must now pay the publisher in Canadian dollars'], answer: 0,
      why: 'A stronger Canadian dollar buys more US dollars, so each order costs fewer Canadian dollars. The bookshop’s costs and cash outflows fall.' },
    { skill: 'applied-chain', kind: 'mcq', q: 'An Indian exporter of cotton shirts sees the rupee depreciate. It decides to keep its US dollar prices the same. What is the effect?',
      options: ['Each dollar of sales converts into more rupees, so its profit per shirt rises', 'Its sales volume rises because its shirts are now cheaper for customers in the USA', 'Each dollar of sales converts into fewer rupees, so its profit falls', 'Its imported materials become cheaper'], answer: 0,
      why: 'With unchanged dollar prices, US customers see no change, but each dollar received buys more rupees, so revenue in rupees and profit per shirt rise.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A depreciation should help an exporter sell more abroad. This mainly <b>depends on</b>:',
      options: ['how sensitive foreign customers are to the price of its product', 'whether the exporter sells its products through its own company website', 'how many workers the exporter employs', 'whether the exporter is a sole trader'], answer: 0,
      why: 'The lower foreign price only boosts sales if customers respond to price. If they buy mainly on quality or brand, sales may change little.' },
    { skill: 'evaluate', kind: 'mcq', q: 'A student wrote: “A weaker currency is always good for businesses.” What is the main flaw?',
      options: ['Businesses that import materials or goods face higher costs', 'A weaker currency makes exports dearer for foreigners', 'Exchange rates do not affect businesses that trade abroad', 'A weaker currency always reduces the demand for exports'], answer: 0,
      why: 'A weaker currency helps exporters but makes imports dearer. Importers, and exporters who rely on imported inputs, may be worse off.' },
    { skill: 'evaluate', kind: 'mcq', q: '<i>A UK car-parts maker buys 80% of its components from abroad and sells only 10% of its output overseas. The pound depreciates.</i><br>Which judgement is best supported?',
      options: ['It is likely to be worse off, because higher import costs affect far more of its business than cheaper exports', 'It is likely to be better off, because its exports become cheaper for foreign buyers and so its export sales rise', 'It will be unaffected, because most of its sales are in the UK', 'It will be better off, because its components become cheaper'], answer: 0,
      why: 'Most of its components are imported, so costs rise a lot, while only a small share of sales gains from cheaper exports. On balance it is likely to lose out.' },
    { skill: 'evaluate', kind: 'multi', q: 'A clothing retailer imports all its stock, and its home currency has depreciated. Which are realistic responses or effects?',
      options: ['Raise prices, which may reduce the number of items sold', 'Accept a lower profit margin to keep prices the same', 'Look for suppliers in its own country', 'Expect its stock to become cheaper to buy', 'Expect more foreign customers to buy its imported stock'], answers: [0, 1, 2],
      why: 'Dearer imports squeeze the retailer: it can raise prices (risking sales), absorb the cost (lower margin) or switch to home suppliers. Its imports become dearer, not cheaper, and it does not export.' }
  ] };

  /* ===================================================== BUS-S3-27 liquidity and usefulness of ratios */
  B['BUS-S3-27'] = { title: 'Liquidity and how useful accounting ratios are', items: [
    { skill: 'define', kind: 'mcq', q: 'What is meant by <b>liquidity</b>?',
      options: ['How easily a business can turn its assets into cash to pay its short-term debts', 'The total amount of cash a business holds in its bank account at the end of the year', 'The amount of profit a business makes from its sales', 'The long-term money invested in a business'], answer: 0,
      why: 'Liquidity is about turning assets into cash to meet short-term debts, not just the amount of cash held or the profit made.' },
    { skill: 'define', kind: 'mcq', q: 'Why is good liquidity important to a business?',
      options: ['It can pay suppliers, wages and other short-term debts on time', 'It guarantees that the business makes a profit at the end of the year', 'It means the business has no long-term loans', 'It means the business holds a lot of inventory'], answer: 0,
      why: 'With good liquidity the business can meet its short-term debts when due, which keeps suppliers willing to deliver and avoids insolvency.' },
    { skill: 'define', kind: 'mcq', q: 'Which statement about profit and liquidity is correct?',
      options: ['A profitable business can still have poor liquidity', 'A business with good liquidity must be profitable', 'Liquidity and profitability are measured by the same ratios', 'A business that makes a loss cannot have any cash'], answer: 0,
      why: 'Profit and liquidity are different. A business can make a profit but have its money tied up in stock or owed by customers, leaving it short of cash.' },
    { skill: 'classify-ratio', kind: 'multi', q: 'Which of these are <b>liquidity</b> ratios?',
      options: ['Current ratio', 'Acid test ratio', 'Gross profit margin', 'Operating profit margin', 'Return on capital employed'], answers: [0, 1],
      why: 'The current ratio and acid test ratio compare current assets with current liabilities. The margins and ROCE measure profitability.' },
    { skill: 'classify-ratio', kind: 'mcq', q: 'A supplier is deciding whether to give a new customer 60 days to pay. Which ratio would be most useful to the supplier?',
      options: ['Acid test ratio', 'Gross profit margin', 'Return on capital employed', 'Markup'], answer: 0,
      why: 'The supplier wants to know whether the customer can pay short-term debts, which is a liquidity question. The acid test ratio measures that.' },
    { skill: 'classify-ratio', kind: 'mcq', q: 'A café owner raised her prices and wants to know whether she now keeps more profit from each $1 of sales after paying for food and drink. Which ratio should she look at?',
      options: ['Gross profit margin', 'Current ratio', 'Acid test ratio', 'Return on capital employed'], answer: 0,
      why: 'Gross profit margin shows gross profit (sales minus cost of sales) as a percentage of revenue, so it shows the effect of the price rise on profit per $1 of sales.' },
    { skill: 'interpret', gen: function () {
      var a = rint(35, 60) / 100, b = R.roundDp(a + rint(8, 15) / 100, 2), c = R.roundDp(b + rint(8, 15) / 100, 2), y = rint(2021, 2023);
      if (c >= 0.95) c = 0.92;
      return { kind: 'mcq', q: 'Acid test ratio of a garden-furniture business:' + tbl(['Year', String(y), String(y + 1), String(y + 2)], [['Acid test ratio', d2(a) + ':1', d2(b) + ':1', d2(c) + ':1']]) + 'Which is the best interpretation?',
        options: ['Liquidity is improving, but it still has less than $1 of quick assets for every $1 of short-term debt', 'Liquidity is now good, because the ratio has risen every year, so short-term debts are fully covered', 'The business is becoming more profitable each year', 'The business is holding less inventory each year'], answer: 0,
        why: 'The ratio rose from ' + d2(a) + ' to ' + d2(c) + ', so liquidity is improving, but it is still below 1. The acid test says nothing about profit, and inventory is left out of it.' };
    } },
    { skill: 'interpret', gen: function () {
      var cr = rint(180, 280) / 100, at = rint(40, 75) / 100;
      return { kind: 'mcq', q: 'A furniture showroom has a current ratio of ' + d2(cr) + ':1 but an acid test ratio of only ' + d2(at) + ':1. What does the gap between the two ratios suggest?',
        options: ['Much of its current assets is inventory, so it relies on selling stock to pay its debts', 'It has very high non-current liabilities, such as long-term bank loans and mortgages that must be repaid', 'Its gross profit margin is falling', 'It has more cash than it needs'], answer: 0,
        why: 'The only difference between the two ratios is inventory. A big gap means a large part of current assets is stock, which may be slow to sell.' };
    } },
    { skill: 'interpret', gen: function () {
      var y = rint(2022, 2024), r1 = rint(200, 500) * 1000, r2 = Math.round(r1 * rint(110, 135) / 100 / 1000) * 1000, g1 = rint(40, 55), g2 = g1 - rint(4, 10);
      return { kind: 'mcq', q: tbl(['', String(y), String(y + 1)], [['Revenue ($)', money(r1), money(r2)], ['Gross profit margin', g1 + '%', g2 + '%']]) + 'What is the best interpretation of these figures for a sportswear shop?',
        options: ['Sales have grown, but the shop keeps less gross profit from each $1 of sales', 'The shop’s liquidity has worsened, so it will find it harder to pay its suppliers', 'The shop’s current assets have fallen', 'The shop’s overheads have risen'], answer: 0,
        why: 'Revenue rose, but the gross profit margin fell from ' + g1 + '% to ' + g2 + '%, so less gross profit is kept per $1 of sales, perhaps from price cuts or dearer supplies. The margin says nothing about liquidity, and overheads are not part of gross profit.' };
    } },
    { skill: 'interpret', gen: function () {
      var own = rint(70, 140) / 100, avg = R.roundDp(own + pick([-1, 1]) * rint(40, 80) / 100, 2);
      if (avg < 0.5) avg = R.roundDp(own + 0.6, 2);
      var below = own < avg;
      return { kind: 'mcq', q: 'A hardware chain has a current ratio of ' + d2(own) + ':1. The average for similar hardware chains is ' + d2(avg) + ':1. What does this comparison suggest?',
        options: [below ? 'Its liquidity is weaker than that of similar businesses' : 'Its liquidity is stronger than that of similar businesses',
          below ? 'Its liquidity is stronger than that of similar businesses' : 'Its liquidity is weaker than that of similar businesses',
          'It is less profitable than similar businesses', 'Its capital employed is higher than the average'], answer: 0,
        why: 'The current ratio measures liquidity. ' + d2(own) + ' is ' + (below ? 'below' : 'above') + ' the average of ' + d2(avg) + ', so it has ' + (below ? 'fewer' : 'more') + ' current assets per $1 of current liabilities than similar firms. It says nothing directly about profit.' };
    } },
    { skill: 'interpret', gen: function () {
      var y = rint(2022, 2024), g = rint(42, 60), o1 = rint(14, 22), o2 = o1 - rint(4, 9);
      return { kind: 'mcq', q: 'A printing firm’s gross profit margin stayed at ' + g + '% in both ' + y + ' and ' + (y + 1) + ', but its operating profit margin fell from ' + o1 + '% to ' + o2 + '%. What is the most likely explanation?',
        options: ['Its overheads, such as rent or salaries, rose compared with its revenue', 'Its cost of sales rose compared with its revenue', 'Its selling prices fell compared with its costs of materials', 'Its current liabilities rose compared with its current assets'], answer: 0,
        why: 'The gross margin did not change, so prices and cost of sales are in the same proportion. The fall must come from the step between gross and operating profit: the overheads.' };
    } },
    { skill: 'interpret', kind: 'mcq', q: 'A shoe shop has an acid test ratio of 0.60:1. What does this mean?',
      options: ['It has 60 cents of current assets, excluding inventory, for every $1 of current liabilities', 'It makes 60 cents of profit for every $1 of sales', 'Its inventory is 60% of its current assets', 'It has 60 cents of current liabilities for every $1 of current assets, including its inventory of shoes'], answer: 0,
      why: 'The acid test is (current assets − inventory) ÷ current liabilities, so 0.60:1 means only 60 cents of quick assets for each $1 it owes in the short term.' },
    { skill: 'decision-link', kind: 'mcq', q: 'A wholesaler’s acid test ratio has fallen from 1.10:1 to 0.70:1. Which decision follows most logically?',
      options: ['Chase customers who owe money and arrange an overdraft in case bills cannot be paid', 'Buy more inventory, because the fall in the ratio shows that its sales are rising quickly', 'Cut its selling prices, because profit margins have fallen', 'Take no action, because the ratio is still above zero'], answer: 0,
      why: 'Below 1, it has fewer quick assets than short-term debts. Getting cash in from customers and arranging short-term finance helps it pay bills on time.' },
    { skill: 'decision-link', kind: 'mcq', q: 'How could a bank use a business’s current ratio when deciding on a loan?',
      options: ['A healthy ratio suggests the business can meet its short-term debts, so it is less risky to lend to', 'A high ratio shows the business made a large profit last year, so it can afford the loan repayments', 'The ratio shows how much interest the business should pay', 'The ratio shows the value of the business’s buildings'], answer: 0,
      why: 'The current ratio shows whether short-term debts are covered by current assets. A business with good liquidity is more likely to keep up loan repayments.' },
    { skill: 'decision-link', kind: 'mcq', q: 'A restaurant’s operating profit margin has fallen for three years while its gross profit margin has stayed the same. What should the owner most usefully review?',
      options: ['Overheads such as rent, salaries and advertising', 'The prices paid for food and drink', 'The amount of cash held in the bank', 'The level of current liabilities'], answer: 0,
      why: 'A steady gross margin means food costs and prices are in proportion. The falling operating margin points to rising overheads, so those should be reviewed.' },
    { skill: 'decision-link', kind: 'multi', q: 'A student is analysing the usefulness of the acid test ratio to a toy retailer whose ratio has fallen to 0.65:1. Which <b>two</b> statements best develop the analysis?',
      options: ['At 0.65:1 it has only 65 cents of quick assets per $1 of short-term debt, so it may struggle to pay suppliers', 'This warns the managers to cut stock orders or chase debtors before suppliers stop deliveries', 'The acid test ratio is a ratio that uses current assets and liabilities', 'Toys are popular with children of all ages', 'Ratios are calculated by dividing one figure by another'], answers: [0, 1],
      why: 'Good analysis uses the figure, explains what it shows about paying debts and links it to a decision. Definitions and general facts do not develop the point.' },
    { skill: 'limitations', kind: 'mcq', q: 'Which is a limitation of using accounting ratios to judge a business?',
      options: ['They are based on past figures and do not explain why a change happened', 'They can only be calculated by an accountant', 'They cannot be compared with the same ratios from previous years or other firms', 'They use figures that are not in the financial statements'], answer: 0,
      why: 'Ratios use historical data, so the position may have changed, and they show what happened but not why. Managers need other information to find the cause.' },
    { skill: 'limitations', kind: 'mcq', q: 'A supermarket has a current ratio of 0.8:1 and a jewellery shop has one of 3.0:1. Why might comparing them be misleading?',
      options: ['They are in different industries, where normal ratios differ', 'The current ratio cannot be calculated for a supermarket', 'A current ratio above 1 always means a business is badly run', 'Ratios can only be compared within the same business'], answer: 0,
      why: 'Ratios are most useful when compared with similar businesses. Supermarkets sell stock quickly for cash, while jewellers hold slow-selling stock, so their normal ratios differ.' },
    { skill: 'limitations', kind: 'mcq', q: 'A student wrote: “The acid test ratio rose from 0.5:1 to 0.8:1, so the business has no liquidity problems.” What is wrong with this judgement?',
      options: ['The ratio is still below 1, so quick assets do not yet cover short-term debts', 'A rising acid test ratio shows that the business’s liquidity is getting worse', 'The acid test ratio measures profitability, not liquidity', 'The acid test ratio should always be above 5:1'], answer: 0,
      why: 'The trend is improving, but at 0.8:1 the business still has only 80 cents of quick assets for every $1 of current liabilities.' },
    { skill: 'limitations', kind: 'mcq', q: 'A student wrote: “The gross profit margin is 55%, so the business has good liquidity.” What is the flaw?',
      options: ['Gross profit margin measures profitability, not the ability to pay short-term debts', 'A gross profit margin of 55% is too low to be useful', 'Gross profit margin is calculated from the statement of financial position, not from the income statement', 'Liquidity can only be measured by the gross profit margin'], answer: 0,
      why: 'Profitability and liquidity are different. A high margin says nothing about whether the business has enough current assets to pay its short-term debts.' },
    { skill: 'limitations', kind: 'mcq', q: 'A business calculates a current ratio of 1.4:1 for this year only. Why is this figure of limited use on its own?',
      options: ['Ratios are most useful when compared with previous years or similar businesses', 'A current ratio of 1.4:1 cannot be correct', 'One year’s ratio shows the business’s profit, not its liquidity', 'A current ratio must be calculated every month to be valid'], answer: 0,
      why: 'Without a comparison there is no way to tell whether 1.4:1 is improving, worsening, or normal for that industry.' },
    { skill: 'limitations', kind: 'mcq', q: 'A manufacturer has a current ratio of 6:1, mainly because of very large stocks of finished goods. What might this suggest?',
      options: ['Money may be tied up in stock that could be used more productively', 'It is certain to have no difficulty paying any of its debts', 'Its operating profit margin must be very high', 'It has too many non-current liabilities'], answer: 0,
      why: 'A very high current ratio caused by large stocks may mean cash is tied up in unsold goods instead of being used elsewhere, and the stock may be slow to sell.' }
  ] };
})();
