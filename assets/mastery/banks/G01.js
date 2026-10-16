/* Group G01 mastery bank: Percentages and change; Costs, revenue and profit. Original questions, not copied from past papers. */
(function () {
  'use strict';
  var B = window.MASTERY_BANKS = window.MASTERY_BANKS || {};
  var R = window.Mastery;   // R.roundDp(x, dp), R.roundSf(x, n): correct half-up rounding

  // ---------- small helpers local to this file ----------
  function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function r2(x) { return R.roundDp(x, 2); }
  function commas(s) { var p = String(s).split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return p.join('.'); }
  function m2(x) { return commas(R.roundDp(x, 2).toFixed(2)); }          // money to 2 dp with separators
  function n0(x) { return commas(String(Math.round(x))); }                // whole number with separators
  function p2(x) { return R.roundDp(x, 2).toFixed(2); }                   // percentage to 2 dp
  function cur() { return pick(['$', '€', '£']); }
  // Options: correct first, then distinct distractors; pads from `spare` if any clash.
  function opts(correct, ds, spare) {
    var out = [correct];
    function add(d) { if (out.length < 5 && out.indexOf(d) < 0) out.push(d); }
    ds.forEach(add);
    (spare || []).forEach(function (d) { if (out.length < 4) add(d); });
    return out;
  }
  function mcq(q, correct, ds, why, spare, extra) {
    var o = opts(correct, ds, spare);
    var res = { kind: 'mcq', q: q, options: o, answer: 0, why: why };
    if (extra) for (var k in extra) res[k] = extra[k];
    return res;
  }
  function moneyNum(q, ans, c, why) { return { kind: 'num', q: q, answer: r2(ans), unit: c, tol: 0.005, display: m2(ans), why: why }; }
  function pctNum(q, ans, why) { return { kind: 'num', q: q, answer: r2(ans), unit: '%', tol: 0.005, display: p2(ans) + '%', why: why }; }
  function table(head, rows) {
    return '<table class="mc-table"><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
  }

  /* ======================================================================
     BUS-CALC-08  Change between two values, absolute or percentage
     ====================================================================== */
  B['BUS-CALC-08'] = { title: 'Change between two values, absolute or percentage', items: [
    { skill: 'absolute change', gen: function () {
      var old = rint(1800, 4800), d = rint(150, 900) * pick([1, -1]), nw = old + d;
      var gym = pick(['FitFold', 'Peak Motion', 'IronLeaf', 'Pulse Hub']);
      return { kind: 'num', q: gym + ', a gym, had ' + n0(old) + ' members in 2024 and ' + n0(nw) + ' members in 2025.<br>Calculate the absolute change in the number of members from 2024 to 2025. Write a fall as a negative number.',
        answer: d, unit: '', display: String(d),
        why: 'Absolute change = new − old = ' + n0(nw) + ' − ' + n0(old) + ' = ' + d + ' members. ' + (d < 0 ? 'The result is negative, so membership fell.' : 'The result is positive, so membership rose.') };
    } },
    { skill: 'absolute change', gen: function () {
      var c1 = rint(520, 880), c3 = c1 - rint(40, 160), c2 = rint(c3 + 5, c1 + 30);
      var r1 = c1 + rint(60, 200), r2v = c2 + rint(60, 200), r3 = c3 + rint(60, 200);
      var c = cur();
      var t = table(['', '2022', '2023', '2024'], [['Revenue (' + c + '000)', r1, r2v, r3], ['Total costs (' + c + '000)', c1, c2, c3]]);
      var ans = (c1 - c3) * 1000;
      return { kind: 'num', q: 'Figure 1 shows data for Brightwave Kitchens, a maker of fitted kitchens.' + t + 'Calculate the fall in total costs from 2022 to 2024. Give your answer in ' + c + ' (not ' + c + '000).',
        answer: ans, unit: c, display: n0(ans),
        why: 'Use the total costs row, not revenue: ' + c1 + ' − ' + c3 + ' = ' + (c1 - c3) + ' thousand, so the fall is ' + c + n0(ans) + '.' };
    } },
    { skill: 'percentage increase', gen: function () {
      var old = rint(40000, 90000), nw = Math.round(old * (1 + rint(250, 1800) / 10000)), c = cur();
      var ans = (nw - old) / old * 100;
      return pctNum('Harbour Tiles had revenue of ' + c + n0(old) + ' in 2023 and ' + c + n0(nw) + ' in 2024.<br>Calculate the percentage increase in revenue from 2023 to 2024. Give your answer to two decimal places.',
        ans, '(' + n0(nw) + ' − ' + n0(old) + ') ÷ ' + n0(old) + ' × 100 = ' + n0(nw - old) + ' ÷ ' + n0(old) + ' × 100 = ' + p2(ans) + '%. Always divide by the original (earlier) value.');
    } },
    { skill: 'percentage decrease', gen: function () {
      var oc = rint(150, 990), nc = oc - rint(8, Math.floor(oc * 0.3)), c = cur();
      var ans = (oc - nc) / oc * 100;
      return pctNum('A snack bar called Crunchmore was priced at ' + c + m2(oc / 100) + '. The price was later cut to ' + c + m2(nc / 100) + '.<br>Calculate the percentage decrease in the price. Give your answer to two decimal places.',
        ans, 'Fall = ' + m2(oc / 100) + ' − ' + m2(nc / 100) + ' = ' + m2((oc - nc) / 100) + '. Then ' + m2((oc - nc) / 100) + ' ÷ ' + m2(oc / 100) + ' × 100 = ' + p2(ans) + '%. A percentage decrease is given as a positive size of fall.');
    } },
    { skill: 'percentage increase', gen: function () {
      var o = rint(28, 60) / 10, n = R.roundDp(o + rint(1, 9) / 10 + (Math.random() < 0.5 ? 0.05 : 0), 2);
      var c = (n - o) / o * 100, d1 = (n - o) / n * 100, d2 = n / o * 100, d3 = (n - o);
      return mcq('The number of app users of StreamNest rose from ' + o.toFixed(1) + ' million in 2024 to ' + n + ' million in 2025.<br>Find the percentage increase. Choose the answer rounded to two decimal places.',
        p2(c) + '%', [p2(d1) + '%', p2(d2) + '%', p2(d3) + '%'],
        'Change = ' + n + ' − ' + o.toFixed(1) + ' = ' + R.roundDp(n - o, 2) + ' million. ' + R.roundDp(n - o, 2) + ' ÷ ' + o.toFixed(1) + ' × 100 = ' + p2(c) + '%. Dividing by the new figure, or not subtracting first, gives the wrong options.',
        [p2(c + 1) + '%']);
    } },
    { skill: 'reading the right figures', gen: function () {
      var u = [rint(300, 500)]; for (var i = 1; i < 4; i++) u.push(u[i - 1] + rint(10, 90));
      var c = (u[3] - u[1]) / u[1] * 100, d1 = (u[3] - u[0]) / u[0] * 100, d2 = (u[2] - u[1]) / u[1] * 100, d3 = (u[3] - u[1]) / u[3] * 100;
      var t = table(['Year', '2021', '2022', '2023', '2024'], [['Electric bikes sold (units)', u[0], u[1], u[2], u[3]]]);
      return mcq('Volta Cycles sells electric bikes.' + t + 'Find the percentage increase in units sold from 2022 to 2024, rounded to two decimal places.',
        p2(c) + '%', [p2(d1) + '%', p2(d2) + '%', p2(d3) + '%'],
        'Use 2022 (' + u[1] + ') as the original and 2024 (' + u[3] + ') as the new value: (' + u[3] + ' − ' + u[1] + ') ÷ ' + u[1] + ' × 100 = ' + p2(c) + '%. Check the years before you calculate.',
        [p2(c + 2) + '%']);
    } },
    { skill: 'percentage decrease', gen: function () {
      var o = rint(95, 180) / 10, n = R.roundDp(o - rint(6, 30) / 10, 1), c = cur();
      var ans = (o - n) / o * 100;
      return pctNum('Operating profit at Coral Bay Hotels fell from ' + c + o.toFixed(1) + ' million in 2023 to ' + c + n.toFixed(1) + ' million in 2024.<br>Calculate the percentage decrease in operating profit. Give your answer to two decimal places.',
        ans, '(' + o.toFixed(1) + ' − ' + n.toFixed(1) + ') ÷ ' + o.toFixed(1) + ' × 100 = ' + p2(ans) + '%. Both figures are in millions, so the unit cancels out.');
    } },
    { skill: 'percentage decrease', gen: function () {
      var old = rint(8, 40) * 25, p = pick([4, 8, 12, 16, 20, 24]), nw = old * (100 - p) / 100;
      return { kind: 'num', q: 'Greystone Logistics employed ' + n0(old) + ' workers last year. After closing one depot it employs ' + n0(nw) + ' workers.<br>Calculate the percentage decrease in the number of workers.',
        answer: p, unit: '%', display: p + '%',
        why: 'Fall = ' + n0(old) + ' − ' + n0(nw) + ' = ' + n0(old - nw) + '. ' + n0(old - nw) + ' ÷ ' + n0(old) + ' × 100 = ' + p + '%.' };
    } },
    { skill: 'reading the right figures', gen: function () {
      var o = rint(300, 900) * 100, up = Math.random() < 0.5, d = rint(500, 4000), n = up ? o + d : o - d, c = cur();
      var ch = (n - o) / o * 100, wrongBase = (n - o) / n * 100;
      var f = function (x) { return (x < 0 ? '−' : '') + p2(Math.abs(x)) + '%'; };
      var t = table(['', '2023–2024', '2024–2025'], [['Cash (' + c + ')', n0(rint(20, 90) * 100), n0(rint(20, 90) * 100)], ['Total assets (' + c + ')', n0(o), n0(n)]]);
      return mcq('Data for Meridian Paints:' + t + 'What is the percentage change in total assets from 2023–2024 to 2024–2025?',
        f(ch), [f(-ch), f(wrongBase), f(-wrongBase)],
        '(' + n0(n) + ' − ' + n0(o) + ') ÷ ' + n0(o) + ' × 100 = ' + f(ch) + '. ' + (up ? 'Total assets rose, so the change is positive.' : 'Total assets fell, so the change is negative.') + ' Divide by the earlier year, not the later one.',
        [f(ch * 2)]);
    } },
    { skill: 'reading the right figures', gen: function () {
      var v = [rint(12000, 25000)]; for (var i = 1; i < 5; i++) v.push(v[i - 1] + rint(1500, 6000));
      var ans = (v[4] - v[0]) / v[0] * 100;
      var t = table(['Year', '2020', '2021', '2022', '2023', '2024'], [['Online orders', n0(v[0]), n0(v[1]), n0(v[2]), n0(v[3]), n0(v[4])]]);
      return pctNum('Figure 1 shows online orders received by Juniper Home Goods.' + t + 'Calculate the percentage increase in online orders from 2020 to 2024. Give your answer to two decimal places.',
        ans, 'Use the first year (2020) and the last year (2024): (' + n0(v[4]) + ' − ' + n0(v[0]) + ') ÷ ' + n0(v[0]) + ' × 100 = ' + p2(ans) + '%. The years in between are not needed.');
    } },
    { skill: 'method', kind: 'mcq', q: 'Which calculation gives the percentage change from an old value to a new value?',
      options: ['(new value − old value) ÷ old value × 100', '(new value − old value) ÷ new value × 100', 'new value ÷ old value × 100', '(new value − old value) × 100'],
      answer: 0, why: 'Find the change first, then divide by the original (old) value and multiply by 100. The other options use the wrong base, skip the subtraction or skip the division.' },
    { skill: 'method', kind: 'mcq', q: 'Sales of a phone case rose from 640 units to 720 units. A student worked out 80 ÷ 720 × 100 = 11.11%. What mistake did the student make?',
      options: ['Divided by the new value instead of the original value', 'Subtracted the values the wrong way round', 'Forgot to multiply by 100', 'Used the wrong difference between the values'],
      answer: 0, why: 'The change of 80 is correct, but it must be divided by the original 640: 80 ÷ 640 × 100 = 12.5%.' },
    { skill: 'interpreting change', kind: 'mcq', q: 'Weekly sales at a florist fell from 500 bunches to 400 bunches, then rose back from 400 to 500 bunches. Which statement is correct?',
      options: ['The fall was 20% and the rise was 25%', 'The fall was 25% and the rise was 20%', 'The fall and the rise were both 20%', 'The fall and the rise were both 25%'],
      answer: 0, why: 'Fall: 100 ÷ 500 × 100 = 20%. Rise: 100 ÷ 400 × 100 = 25%. The same absolute change is a bigger percentage of a smaller original value.' },
    { skill: 'method', kind: 'mcq', q: 'A table shows revenue in $ thousands: 1,250 in one year and 1,400 in the next. What must a student do about the "thousands" to find the percentage increase?',
      options: ['Nothing, because both figures are in the same unit', 'Multiply both figures by 1,000 first or the answer is wrong', 'Multiply the final percentage by 1,000', 'Divide the final percentage by 1,000'],
      answer: 0, why: 'A percentage compares two figures, so a shared unit cancels: 150 ÷ 1,250 × 100 = 12% whether the figures are in dollars or thousands of dollars.' },
    { skill: 'interpreting change', gen: function () {
      var a = rint(15, 30) * 10, ap = pick([20, 30, 40]), an = a * (100 + ap) / 100;
      var b = rint(90, 160) * 10, bInc = rint(Math.ceil((an - a) / 10) + 2, Math.ceil((an - a) / 10) + 10) * 10, bn = b + bInc;
      var bp = bInc / b * 100;
      if (bp >= ap) { b = 2000; bn = b + bInc; bp = bInc / b * 100; }
      var X = pick(['Cedar range', 'Linen range']), Y = X === 'Cedar range' ? 'Oak range' : 'Willow range';
      var t = table(['', 'Last year (units)', 'This year (units)'], [[X, a, an], [Y, n0(b), n0(bn)]]);
      return mcq('A furniture shop sells two product ranges.' + t + 'Which statement is correct?',
        'The ' + X + ' had the larger percentage increase but the smaller absolute increase',
        ['The ' + X + ' had the larger percentage increase and the larger absolute increase', 'The ' + Y + ' had the larger percentage increase because it sold more extra units', 'Both ranges had the same percentage increase'],
        X + ': +' + (an - a) + ' units, ' + ap + '%. ' + Y + ': +' + bInc + ' units, ' + p2(bp) + '%. A small starting value can give a large percentage change from a small absolute change.');
    } },
    { skill: 'absolute change', gen: function () {
      var oc = rint(1600, 3900) * 10, nc = oc - rint(100, 900) * 2, c = cur();
      var d = (oc - nc) / 100;
      return moneyNum('A garden centre reduced the price of a lawnmower from ' + c + m2(oc / 100) + ' to ' + c + m2(nc / 100) + ' in a sale.<br>Calculate the reduction in price. Give your answer in ' + c + '.',
        d, c, 'Absolute change = old − new = ' + m2(oc / 100) + ' − ' + m2(nc / 100) + ' = ' + c + m2(d) + '. This is a change in the original unit (money), not a percentage.');
    } },
    { skill: 'method', gen: function () {
      var old = rint(200, 700) * 10, nw = old + rint(15, 160) * 10;
      var wrong = (nw - old) / nw * 100, ans = (nw - old) / old * 100;
      return pctNum('Visitors to a museum café rose from ' + n0(old) + ' a month to ' + n0(nw) + ' a month. Lena calculated the percentage increase as (' + n0(nw) + ' − ' + n0(old) + ') ÷ ' + n0(nw) + ' × 100 = ' + p2(wrong) + '%.<br>Calculate the correct percentage increase, to two decimal places.',
        ans, 'Lena divided by the new value. Correct: ' + n0(nw - old) + ' ÷ ' + n0(old) + ' × 100 = ' + p2(ans) + '%.');
    } },
    { skill: 'method', kind: 'multi', q: 'Which statements about percentage change are correct?',
      options: ['A negative percentage change shows a decrease', 'The change is always divided by the original value', 'A percentage change can be bigger than 100%', 'The change is divided by the newer value', 'An absolute change is measured in percent'],
      answers: [0, 1, 2], why: 'Negative means a fall, the base is always the original value, and a value that more than doubles rises by over 100%. An absolute change is in the original unit (units, dollars), not percent.' },
    { skill: 'method', kind: 'mcq', q: 'After dividing the change by the original value, a calculator shows 0.0845673. What is the percentage change to two decimal places?',
      options: ['8.46%', '8.45%', '0.08%', '84.57%'],
      answer: 0, why: '0.0845673 × 100 = 8.45673%. The third decimal place is 6, so round up to 8.46%. Forgetting to multiply by 100 gives 0.08%.' },
    { skill: 'percentage increase', gen: function () {
      var oc = rint(10, 40) * 20, p = pick([5, 10, 15, 20, 25, 30]), nc = oc * (100 + p) / 100, c = cur();
      return { kind: 'num', q: 'The cost of delivering one parcel for Swiftpost rose from ' + c + m2(oc / 100) + ' to ' + c + m2(nc / 100) + '.<br>Calculate the percentage increase in the delivery cost.',
        answer: p, unit: '%', display: p + '%',
        why: 'Rise = ' + m2(nc / 100) + ' − ' + m2(oc / 100) + ' = ' + m2((nc - oc) / 100) + '. ' + m2((nc - oc) / 100) + ' ÷ ' + m2(oc / 100) + ' × 100 = ' + p + '%.' };
    } },
    { skill: 'interpreting change', gen: function () {
      var p = pick([20, 25, 40, 50]), o = rint(2, 9) * 20;
      if (o === 100) o = 120;
      var right = 'From ' + o + ' to ' + (o * (100 + p) / 100);
      var rev = 'From ' + (o * (100 + p) / 100) + ' to ' + o;
      var addP = 'From ' + o + ' to ' + (o + p);
      var base = o * (100 - p) / 100;
      var under = 'From ' + base + ' to ' + o;
      return mcq('Which change in daily sales is an increase of exactly ' + p + '%?', right, [rev, addP, under],
        p + '% of ' + o + ' is ' + (o * p / 100) + ', so ' + o + ' rises to ' + (o * (100 + p) / 100) + '. From ' + base + ' to ' + o + ' is an increase of ' + p2((o - base) / base * 100) + '%, because the base is ' + base + '.');
    } },
    { skill: 'interpreting change', kind: 'mcq', q: 'A student calculates the percentage change in a firm\'s exports from 2023 to 2024 and gets −6.25%. What does this show?',
      options: ['Exports fell by 6.25% of the 2023 value', 'Exports rose by 6.25% of the 2023 value', 'Exports fell by 6.25 units', 'Exports fell by 6.25% of the 2024 value'],
      answer: 0, why: 'A negative percentage change is a decrease, and the percentage is always measured against the original (2023) value.' }
  ] };

  /* ======================================================================
     BUS-CALC-10  Find a percentage of an amount
     ====================================================================== */
  B['BUS-CALC-10'] = { title: 'Find a percentage of an amount', items: [
    { skill: 'commission', gen: function () {
      var s = rint(30000, 190000) / 100, r = pick([2, 3, 4, 5, 6, 8, 2.5, 7.5]), c = cur();
      var ans = s * r / 100;
      return moneyNum('Sales staff at Orchid Electronics earn commission of ' + r + '% of the value of the goods they sell. One assistant sells goods worth ' + c + m2(s) + ' in a day.<br>Calculate, to two decimal places, the commission earned. Give your answer in ' + c + '.',
        ans, c, m2(s) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '. The commission is the percentage amount only, not the sales plus commission.');
    } },
    { skill: 'commission', gen: function () {
      var price = rint(40, 260) * 10, n = rint(3, 15), r = pick([2, 3, 4, 5]), c = cur();
      var base = price * n, ans = base * r / 100;
      return moneyNum('A car-audio dealer pays its sales staff ' + r + '% commission on the value of systems sold. Each system sells for ' + c + n0(price) + '. An employee sells ' + n + ' systems this month.<br>Calculate the commission paid to this employee. Give your answer in ' + c + '.',
        ans, c, 'Value of sales = ' + n0(price) + ' × ' + n + ' = ' + n0(base) + '. Commission = ' + n0(base) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'commission', gen: function () {
      var s = rint(40, 120) * 100, r = pick([3, 4, 6, 8]), c = cur();
      var ans = s * r / 100;
      return mcq('A sales representative for a paint supplier earns ' + r + '% commission on the value of the orders she wins. This month she won orders worth ' + c + n0(s) + '. How much commission does she earn?',
        c + n0(ans), [c + n0(s + ans), c + n0(s * r / 10), c + n0(s - r)],
        n0(s) + ' × ' + (r / 100) + ' = ' + c + n0(ans) + '. Adding the commission on gives a new total, and using ' + (r / 10) + ' instead of ' + (r / 100) + ' puts the decimal point in the wrong place.',
        [c + n0(ans * 2)]);
    } },
    { skill: 'interest', gen: function () {
      var loan = rint(20, 300) * 1000, r = pick([3.5, 4, 4.5, 5, 6, 6.5, 7, 8]), c = cur();
      var ans = loan * r / 100;
      return moneyNum('Tallis Engineering takes out a bank loan of ' + c + n0(loan) + '. The bank charges interest of ' + r + '% a year.<br>Calculate the interest for one year. Give your answer in ' + c + '.',
        ans, c, n0(loan) + ' × ' + r + ' ÷ 100 = ' + c + m2(ans) + '. Interest is the charge for borrowing, so it is the percentage amount on its own.');
    } },
    { skill: 'interest', gen: function () {
      var dep = rint(15, 90) * 1000, r = pick([1.5, 2, 2.5, 3, 3.5]), c = cur();
      var ans = dep * r / 100;
      return mcq('A café owner keeps ' + c + n0(dep) + ' in a business savings account paying ' + r + '% interest a year. How much interest will the account earn in one year?',
        c + m2(ans), [c + m2(dep + ans), c + m2(dep * r / 10), c + m2(dep - r)],
        n0(dep) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '. The question asks for the interest, not the new balance.',
        [c + m2(ans * 2)]);
    } },
    { skill: 'interest', gen: function () {
      var od = rint(30, 180) * 100, r = pick([9, 10, 12, 14, 15, 18]), c = cur();
      var ans = od * r / 100;
      return moneyNum('A printing firm uses an overdraft of ' + c + n0(od) + ' for a whole year. The overdraft interest rate is ' + r + '% a year.<br>Calculate the interest the firm pays for the year. Give your answer in ' + c + '.',
        ans, c, n0(od) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'bonus', gen: function () {
      var sal = rint(240000, 690000) / 10, r = pick([2.5, 3, 4, 5, 6.5, 7.5, 10]), c = cur();
      var ans = sal * r / 100;
      return moneyNum('Workers at Northfield Dairy receive a bonus of ' + r + '% of their annual salary. One worker earns ' + c + m2(sal) + ' a year.<br>Calculate, to two decimal places, the bonus this worker receives. Give your answer in ' + c + '.',
        ans, c, m2(sal) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '. A bonus is extra pay on top of salary, but the question asks for the bonus alone.');
    } },
    { skill: 'bonus', gen: function () {
      var sal = rint(25, 60) * 1000, r = pick([4, 5, 6, 8]), c = cur();
      var ans = sal * r / 100;
      return mcq('A software firm pays each employee a bonus of ' + r + '% of salary. Which calculation gives the bonus for an employee earning ' + c + n0(sal) + ' a year?',
        n0(sal) + ' × 0.0' + r, [n0(sal) + ' × 0.' + r, n0(sal) + ' × 1.0' + r, n0(sal) + ' − ' + r],
        r + '% as a decimal is 0.0' + r + ', so the bonus is ' + n0(sal) + ' × 0.0' + r + ' = ' + c + n0(ans) + '. Multiplying by 1.0' + r + ' gives the new total pay instead.');
    } },
    { skill: 'discount or tax amount', gen: function () {
      var price = rint(18000, 95000) / 100, n = rint(4, 12), r = pick([5, 6, 8, 10, 12, 15]), c = cur();
      var base = r2(price * n), ans = base * r / 100;
      return moneyNum('A cookery school charges ' + c + m2(price) + ' per person for a day course. Groups receive a ' + r + '% discount. A company books ' + n + ' employees on the course.<br>Calculate, to two decimal places, the total discount the company receives. Give your answer in ' + c + '.',
        ans, c, 'Full price = ' + m2(price) + ' × ' + n + ' = ' + m2(base) + '. Discount = ' + m2(base) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'discount or tax amount', gen: function () {
      var price = rint(2000, 15000) / 100, r = pick([10, 15, 20, 25, 30, 35]), c = cur();
      var ans = price * r / 100;
      return mcq('A sports shop offers ' + r + '% off a pair of trainers priced at ' + c + m2(price) + '. How much money does a customer save?',
        c + m2(ans), [c + m2(price - ans), c + m2(r), c + m2(price * r / 1000)],
        m2(price) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + ' saved. ' + c + m2(price - ans) + ' is the new price, which is a different question, and ' + c + m2(r) + ' treats the percentage as an amount of money.',
        [c + m2(ans * 2)]);
    } },
    { skill: 'share of a group', gen: function () {
      var staff = rint(12, 90) * 100, r = pick([15, 20, 35, 40, 45, 55, 60, 65]);
      var ans = staff * r / 100;
      return { kind: 'num', q: 'Altamira Retail employs ' + n0(staff) + ' people. ' + r + '% of them work part-time.<br>Calculate the number of part-time employees.',
        answer: ans, unit: '', display: n0(ans), why: n0(staff) + ' × ' + (r / 100) + ' = ' + n0(ans) + ' part-time employees.' };
    } },
    { skill: 'share of a group', gen: function () {
      var n = pick([400, 500, 600, 800, 1200]), r = pick([12, 18, 24, 35, 42, 65]);
      var ans = n * r / 100;
      return mcq('A market research survey asked ' + n0(n) + ' shoppers about a new yoghurt drink. ' + r + '% said they would buy it. How many shoppers said they would buy it?',
        n0(ans), [n0(n - r), n0(n + ans), n0(n * r / 1000)],
        n0(n) + ' × ' + (r / 100) + ' = ' + n0(ans) + ' shoppers. Taking ' + r + ' away from ' + n0(n) + ' treats the percentage as a plain number.',
        [n0(ans * 2)]);
    } },
    { skill: 'share of a group', gen: function () {
      var out = rint(10, 40) * 1000, r = pick([1.5, 2, 2.5, 3, 4]);
      var ans = out * r / 100;
      return { kind: 'num', q: 'A factory makes ' + n0(out) + ' glass bottles a week. Quality checks find that ' + r + '% of bottles are faulty.<br>Calculate the number of faulty bottles made in a week.',
        answer: ans, unit: '', display: n0(ans), why: n0(out) + ' × ' + (r / 100) + ' = ' + n0(ans) + ' faulty bottles.' };
    } },
    { skill: 'method', kind: 'mcq', q: 'A student needs to find 5% of a sales figure. Which decimal should the student multiply by?',
      options: ['0.05', '0.5', '5.0', '1.05'],
      answer: 0, why: '5% means 5 out of 100, and 5 ÷ 100 = 0.05. Using 0.5 finds 50%, and 1.05 gives the total after a 5% increase.' },
    { skill: 'method', kind: 'mcq', q: 'What is commission?',
      options: ['Pay based on a percentage of the value of sales made', 'A fixed payment made every month whatever the sales', 'The charge a bank makes for lending money', 'An extra payment given to all staff at the end of the year'],
      answer: 0, why: 'Commission rises with the value of sales an employee makes. A fixed monthly payment is a salary, and a charge for borrowing is interest.' },
    { skill: 'method', kind: 'mcq', q: 'A salesperson sold goods worth $12,000 and earns 4% commission. A student wrote: commission = 12,000 × 1.04 = $12,480. What is wrong?',
      options: ['The student added the commission on to the sales instead of finding 4% alone', 'The student should have divided 12,000 by 4', 'The student should have used 0.4 instead of 1.04', 'Nothing is wrong; commission includes the sales value'],
      answer: 0, why: '× 1.04 gives the sales plus 4%. The commission is only 12,000 × 0.04 = $480.' },
    { skill: 'method', kind: 'multi', q: 'In which of these questions is the final answer just a percentage of an amount, and NOT a new total?',
      options: ['Calculate the interest charged on a loan of $50,000 at 6%', 'Calculate the commission on sales of $8,000 at 3%', 'Calculate the new price of a $40 shirt after a 10% discount', 'Calculate the new wage after a 4% pay rise', 'Calculate the number of employees who are managers if 8% are managers'],
      answers: [0, 1, 4], why: 'Interest, commission and the number of managers are the percentage amounts themselves. A price after a discount and a wage after a rise are new totals, which is a different type.' },
    { skill: 'commission', gen: function () {
      var pa = rint(30, 90) * 10, na = rint(2, 6), pb = rint(10, 40) * 10, nb = rint(3, 9), r = pick([2, 2.5, 3, 5]), c = cur();
      var base = pa * na + pb * nb, ans = base * r / 100;
      return moneyNum('A bicycle shop pays its sales staff ' + r + '% commission on the value of everything they sell. In one week Tomás sells ' + na + ' road bikes at ' + c + n0(pa) + ' each and ' + nb + ' child bikes at ' + c + n0(pb) + ' each.<br>Calculate his commission for the week. Give your answer in ' + c + '.',
        ans, c, 'Sales = (' + na + ' × ' + n0(pa) + ') + (' + nb + ' × ' + n0(pb) + ') = ' + n0(base) + '. Commission = ' + n0(base) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'discount or tax amount', gen: function () {
      var bill = rint(4000, 25000) / 100, r = pick([5, 7.5, 12.5, 15, 20]), c = cur();
      var ans = R.roundDp(bill * r / 100, 2);
      return moneyNum('A hotel adds a sales tax of ' + r + '% to a guest\'s restaurant bill of ' + c + m2(bill) + '.<br>Calculate, to two decimal places, the amount of sales tax. Give your answer in ' + c + '.',
        bill * r / 100, c, m2(bill) + ' × ' + (r / 100) + ' = ' + c + m2(ans) + '. The question asks for the tax only, not the bill including tax.');
    } },
    { skill: 'part of a price', gen: function () {
      var price = rint(18, 60) * 1000, r = pick([10, 15, 20, 25]), c = cur();
      var ans = price * r / 100;
      return moneyNum('A florist is buying a delivery van priced at ' + c + n0(price) + '. The dealer asks for a deposit of ' + r + '% of the price.<br>Calculate the deposit. Give your answer in ' + c + '.',
        ans, c, n0(price) + ' × ' + (r / 100) + ' = ' + c + n0(ans) + '. The deposit is a part of the price, so the answer is smaller than the price.');
    } },
    { skill: 'interest', gen: function () {
      var loan = rint(5, 40) * 1000, r = pick([5, 6, 8, 9]), n = pick([2, 3]), c = cur();
      var ans = loan * r / 100 * n;
      return mcq('A sole trader borrows ' + c + n0(loan) + '. Interest is ' + r + '% of the amount borrowed for each year, and the loan lasts ' + n + ' years. What is the total interest paid?',
        c + n0(ans), [c + n0(loan * r / 100), c + n0(loan + ans), c + n0(loan * r / 100 + n)],
        'One year: ' + n0(loan) + ' × ' + (r / 100) + ' = ' + n0(loan * r / 100) + '. For ' + n + ' years: ' + n0(loan * r / 100) + ' × ' + n + ' = ' + c + n0(ans) + '.',
        [c + n0(ans * 2)]);
    } },
    { skill: 'method', kind: 'mcq', q: 'Which of these is the interest on a loan?',
      options: ['The charge for borrowing money, usually a percentage of the loan', 'The amount of money first borrowed from the bank', 'The total of the loan plus all charges', 'The money a business saves by paying cash'],
      answer: 0, why: 'Interest is the cost of borrowing. The amount first borrowed is the loan itself, and the loan plus charges is the total repaid.' }
  ] };

  /* ======================================================================
     BUS-CALC-11  Increase or decrease a value by a percentage
     ====================================================================== */
  B['BUS-CALC-11'] = { title: 'Increase or decrease a value by a percentage', items: [
    { skill: 'increase', gen: function () {
      var w = rint(850, 2200) / 100, r = pick([2, 2.5, 3, 3.5, 4, 4.5, 5]), c = cur();
      var amt = w * r / 100, ans = R.roundDp(w + amt, 2);
      return moneyNum('Warehouse staff at Lumen Freight earn ' + c + m2(w) + ' an hour. They are given a pay rise of ' + r + '%.<br>Calculate, to two decimal places, the new hourly wage. Give your answer in ' + c + '.',
        ans, c, 'Rise = ' + m2(w) + ' × ' + (r / 100) + ' = ' + R.roundDp(amt, 4) + '. New wage = ' + m2(w) + ' + ' + R.roundDp(amt, 4) + ' = ' + c + m2(ans) + ' (or ' + m2(w) + ' × ' + (1 + r / 100) + ').');
    } },
    { skill: 'increase', gen: function () {
      var u = rint(30000, 95000), r = pick([4, 6, 7, 9, 11, 13, 15, 18]);
      var ans = Math.round(u * (1 + r / 100));
      return { kind: 'num', q: 'A scooter maker sold ' + n0(u) + ' scooters last year. It forecasts that sales will grow by ' + r + '% this year.<br>Calculate the forecast number of scooters sold this year, to the nearest whole scooter.',
        answer: ans, unit: '', display: n0(ans), why: n0(u) + ' × ' + (1 + r / 100) + ' = ' + commas(String(R.roundDp(u * (1 + r / 100), 2))) + ', which is ' + n0(ans) + ' scooters to the nearest whole number.' };
    } },
    { skill: 'increase', gen: function () {
      var loan = rint(20, 400) * 1000, r = pick([3, 4, 5, 6, 7.5, 8]), c = cur();
      var ans = loan * (1 + r / 100);
      return moneyNum('A dentist borrows ' + c + n0(loan) + ' to buy new equipment. Interest of ' + r + '% is added, and the loan is repaid in one year.<br>Calculate the total amount repaid. Give your answer in ' + c + '.',
        ans, c, 'Interest = ' + n0(loan) + ' × ' + (r / 100) + ' = ' + m2(loan * r / 100) + '. Total = ' + n0(loan) + ' + ' + m2(loan * r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'decrease', gen: function () {
      var p = rint(1500, 24000) / 100, r = pick([10, 12.5, 15, 20, 25, 30, 35]), c = cur();
      var ans = p * (1 - r / 100);
      return moneyNum('A homeware store reduces the price of a table lamp from ' + c + m2(p) + ' by ' + r + '% in a sale.<br>Calculate, to two decimal places, the sale price. Give your answer in ' + c + '.',
        ans, c, 'Discount = ' + m2(p) + ' × ' + (r / 100) + ' = ' + R.roundDp(p * r / 100, 4) + '. Sale price = ' + m2(p) + ' − ' + R.roundDp(p * r / 100, 4) + ' = ' + c + m2(ans) + ' (or ' + m2(p) + ' × ' + (1 - r / 100) + ').');
    } },
    { skill: 'totals before the percentage', gen: function () {
      var p = rint(4500, 18000) / 100, n = rint(5, 20), r = pick([5, 8, 10, 12, 15]), c = cur();
      var base = r2(p * n), ans = base * (1 - r / 100);
      return moneyNum('A climbing centre charges ' + c + m2(p) + ' per person. Groups of five or more receive a ' + r + '% discount on the total. A college books ' + n + ' students.<br>Calculate, to two decimal places, the total the college pays. Give your answer in ' + c + '.',
        ans, c, 'Full total = ' + m2(p) + ' × ' + n + ' = ' + m2(base) + '. After the discount: ' + m2(base) + ' × ' + (1 - r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'increase', gen: function () {
      var p = rint(20, 80) * 5, r = pick([10, 20, 25, 30]), c = cur();
      var amt = p * r / 100, ans = p + amt;
      return mcq('A theme park charges ' + c + p + ' for a family ticket. It raises the price by ' + r + '%. What is the new price?',
        c + m2(ans), [c + m2(amt), c + m2(p + r), c + m2(p * (1 + r / 1000))],
        r + '% of ' + p + ' = ' + m2(amt) + ', so the new price is ' + p + ' + ' + m2(amt) + ' = ' + c + m2(ans) + '. ' + c + m2(amt) + ' is only the increase, and ' + c + m2(p + r) + ' adds the percentage as a plain number.',
        [c + m2(p - amt)]);
    } },
    { skill: 'totals before the percentage', gen: function () {
      var p = rint(12, 60) * 5, n = rint(3, 8), r = pick([10, 15, 20, 25]), c = cur();
      var tot = p * n, ans = tot * (1 - r / 100), one = tot - p * r / 100, dbl = tot * (1 - 2 * r / 100);
      return mcq('An office supplier sells desk chairs at ' + c + p + ' each, with ' + r + '% off orders of three or more. A firm buys ' + n + ' chairs. How much does the firm pay?',
        c + m2(ans), [c + m2(one), c + m2(dbl), c + m2(tot + tot * r / 100)],
        'Total before discount = ' + p + ' × ' + n + ' = ' + n0(tot) + '. ' + n0(tot) + ' × ' + (1 - r / 100) + ' = ' + c + m2(ans) + '. Taking ' + r + '% off only one chair gives ' + c + m2(one) + '.',
        [c + m2(tot * r / 100)]);
    } },
    { skill: 'multipliers', gen: function () {
      var r = pick([2.5, 7.5, 12.5, 15, 22.5, 35]);
      var f = function (x) { return String(R.roundDp(x, 4)); };
      return mcq('Which single multiplier reduces a price by ' + r + '%?', f(1 - r / 100), [f(1 + r / 100), f(r / 100), String(100 - r)],
        'A decrease of ' + r + '% leaves ' + (100 - r) + '% of the value, and ' + (100 - r) + ' ÷ 100 = ' + f(1 - r / 100) + '. ' + f(1 + r / 100) + ' is an increase and ' + f(r / 100) + ' finds the discount alone.',
        [f(1 - r / 1000)]);
    } },
    { skill: 'multipliers', gen: function () {
      var r = pick([1.5, 3.5, 4.5, 6, 8, 12]);
      var f = function (x) { return String(R.roundDp(x, 4)); };
      return mcq('A business expects revenue to grow by ' + r + '%. Which single multiplier gives next year\'s revenue from this year\'s?', f(1 + r / 100), [f(1 + r / 10), f(r / 100), f(1 - r / 100)],
        'An increase of ' + r + '% gives ' + (100 + r) + '% of the value, and ' + (100 + r) + ' ÷ 100 = ' + f(1 + r / 100) + '. ' + f(r / 100) + ' finds only the growth, not the new total.',
        [f(1 + r)]);
    } },
    { skill: 'increase', gen: function () {
      var rev = rint(1200, 9800) * 100, r = pick([2.4, 3.2, 4.5, 5.5, 6.8]), c = cur();
      var ans = rev * (1 + r / 100);
      return moneyNum('Silverline Tours had revenue of ' + c + n0(rev) + ' this year. It predicts revenue will rise by ' + r + '% next year.<br>Calculate the predicted revenue for next year. Give your answer in ' + c + '.',
        ans, c, n0(rev) + ' × ' + (1 + r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'totals before the percentage', gen: function () {
      var cpu = rint(120, 900) / 100, q = rint(4, 20) * 100, r = pick([4, 5, 6, 8, 10]), c = cur();
      var base = r2(cpu * q), ans = base * (1 + r / 100);
      return moneyNum('A soap maker buys ' + n0(q) + ' bottles a month at ' + c + m2(cpu) + ' each. The supplier increases its prices by ' + r + '%.<br>Calculate, to two decimal places, the new monthly cost of the bottles. Give your answer in ' + c + '.',
        ans, c, 'Current cost = ' + m2(cpu) + ' × ' + n0(q) + ' = ' + m2(base) + '. New cost = ' + m2(base) + ' × ' + (1 + r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'decrease', gen: function () {
      var staff = rint(6, 30) * 20, r = pick([5, 10, 15, 20, 25]);
      var ans = staff * (100 - r) / 100;
      return { kind: 'num', q: 'A call centre employs ' + n0(staff) + ' staff. After introducing a chatbot it cuts the number of staff by ' + r + '%.<br>Calculate the number of staff after the cut.',
        answer: ans, unit: '', display: n0(ans), why: r + '% of ' + n0(staff) + ' = ' + n0(staff * r / 100) + '. ' + n0(staff) + ' − ' + n0(staff * r / 100) + ' = ' + n0(ans) + ' staff.' };
    } },
    { skill: 'increase', gen: function () {
      var p = rint(800, 9000) / 100, r = pick([5, 8, 10, 15, 17.5, 20]), c = cur();
      var ans = p * (1 + r / 100);
      return moneyNum('A printer cartridge costs ' + c + m2(p) + ' before sales tax. Sales tax of ' + r + '% is added to the price.<br>Calculate, to two decimal places, the price including sales tax. Give your answer in ' + c + '.',
        ans, c, m2(p) + ' × ' + (1 + r / 100) + ' = ' + c + m2(ans) + '. Tax added to a price is an increase.');
    } },
    { skill: 'method', kind: 'mcq', q: 'A bag costs $80. Its price is cut by 25%, and later the sale price is raised by 25%. What is the final price?',
      options: ['$75', '$80', '$85', '$60'],
      answer: 0, why: 'After the cut: 80 × 0.75 = $60. After the rise: 60 × 1.25 = $75. The second 25% is of a smaller base, so the price does not return to $80.' },
    { skill: 'method', kind: 'mcq', q: 'A student is asked to increase a price of $325 by 25%. The student writes 325 + 25 = $350. What should the answer be?',
      options: ['$406.25', '$350.00', '$81.25', '$243.75'],
      answer: 0, why: 'The student added the percentage as a plain number. 25% of 325 = 81.25, so the new price is 325 + 81.25 = $406.25.' },
    { skill: 'method', kind: 'mcq', q: 'Which method correctly finds a price after a 15% discount?',
      options: ['Find 15% of the price, then subtract it from the price', 'Find 15% of the price; that is the new price', 'Subtract 15 from the price', 'Find 15% of the price, then add it to the price'],
      answer: 0, why: 'A discount is a decrease: work out 15% of the price and take it away (or multiply by 0.85). Adding it would be an increase.' },
    { skill: 'method', kind: 'multi', q: 'Which of these make a value go UP by a percentage?',
      options: ['A 3% pay rise', 'Interest of 6% added to a loan', 'A 10% promotional discount', 'Sales tax of 15% added to a price', 'A 5% cut in staff numbers'],
      answers: [0, 1, 3], why: 'Pay rises, interest added and tax added all increase the value. Discounts and cuts reduce it.' },
    { skill: 'totals before the percentage', gen: function () {
      var rent = rint(9, 40) * 100, r = pick([3, 4, 5, 6, 8]), c = cur();
      var base = rent * 12, ans = base * (1 + r / 100);
      return moneyNum('A dance studio pays rent of ' + c + n0(rent) + ' a month. The landlord says the rent will rise by ' + r + '% from next year.<br>Calculate the total rent for next year. Give your answer in ' + c + '.',
        ans, c, 'This year\'s rent = ' + n0(rent) + ' × 12 = ' + n0(base) + '. Next year = ' + n0(base) + ' × ' + (1 + r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'decrease', gen: function () {
      var out = rint(20, 80) * 100, r = pick([5, 10, 15, 20, 25]);
      var ans = out * (100 - r) / 100;
      return { kind: 'num', q: 'A brick works usually makes ' + n0(out) + ' bricks a day. A machine breakdown reduces daily output by ' + r + '%.<br>Calculate the daily output during the breakdown.',
        answer: ans, unit: '', display: n0(ans), why: n0(out) + ' × ' + (1 - r / 100) + ' = ' + n0(ans) + ' bricks.' };
    } },
    { skill: 'decrease', gen: function () {
      var p = rint(40, 120), r = pick([20, 25, 30]), off = rint(10, 30), c = cur();
      var a = p * (1 - r / 100), b = p - off;
      if (a === b) off += 1, b = p - off;
      var best = a < b ? 'The ' + r + '% discount, which gives a price of ' + c + m2(a) : 'The ' + c + off + ' off offer, which gives a price of ' + c + m2(b);
      var notBest = a < b ? 'The ' + c + off + ' off offer, which gives a price of ' + c + m2(b) : 'The ' + r + '% discount, which gives a price of ' + c + m2(a);
      return mcq('A games shop has two offers on a console game priced at ' + c + p + ': ' + r + '% off, or ' + c + off + ' off. Which offer gives the lower price?',
        best, [notBest, 'Both offers give the same price', 'The ' + r + '% discount, which gives a price of ' + c + m2(p - r)],
        r + '% off: ' + p + ' × ' + (1 - r / 100) + ' = ' + c + m2(a) + '. ' + c + off + ' off: ' + p + ' − ' + off + ' = ' + c + m2(b) + '.');
    } },
    { skill: 'totals before the percentage', gen: function () {
      var cpk = rint(400, 1200) / 100, kg = rint(4, 20) * 50, r = pick([4, 6, 8, 10, 12]), c = cur();
      var base = r2(cpk * kg), ans = base * (1 - r / 100);
      return moneyNum('A coffee roaster buys ' + n0(kg) + ' kg of beans a month at ' + c + m2(cpk) + ' per kg. The world price of beans falls by ' + r + '%.<br>Calculate, to two decimal places, the new monthly cost of the beans. Give your answer in ' + c + '.',
        ans, c, 'Current cost = ' + m2(cpk) + ' × ' + n0(kg) + ' = ' + m2(base) + '. New cost = ' + m2(base) + ' × ' + (1 - r / 100) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'decrease', gen: function () {
      var p = rint(60, 400), r = pick([10, 20, 25, 40]), c = cur();
      var amt = p * r / 100, ans = p - amt;
      return mcq('Staff at a clothing chain get a ' + r + '% employee discount. What does an employee pay for a coat priced at ' + c + p + '?',
        c + m2(ans), [c + m2(amt), c + m2(p - r), c + m2(p + amt)],
        r + '% of ' + p + ' = ' + m2(amt) + '. ' + p + ' − ' + m2(amt) + ' = ' + c + m2(ans) + '. ' + c + m2(amt) + ' is the discount only, not the price paid.',
        [c + m2(p * (1 - r / 1000))]);
    } }
  ] };

  /* ======================================================================
     BUS-S3-15  Fixed and variable costs
     ====================================================================== */
  var COST_SVG = '<svg viewBox="0 0 340 220" role="img" aria-label="Cost lines against output: line A is horizontal, line B starts at zero and rises, line C starts at the level of line A and rises parallel to line B">' +
    '<line x1="50" y1="180" x2="320" y2="180" stroke="#303a4c" stroke-width="2"/><line x1="50" y1="180" x2="50" y2="15" stroke="#303a4c" stroke-width="2"/>' +
    '<text x="185" y="210" font-size="12" fill="#303a4c" text-anchor="middle">Output (units)</text>' +
    '<text x="18" y="100" font-size="12" fill="#303a4c" text-anchor="middle" transform="rotate(-90 18 100)">Costs ($)</text>' +
    '<line x1="50" y1="130" x2="300" y2="130" stroke="#195d9b" stroke-width="3"/><text x="306" y="134" font-size="13" fill="#195d9b">A</text>' +
    '<line x1="50" y1="180" x2="300" y2="80" stroke="#e4464f" stroke-width="3"/><text x="306" y="84" font-size="13" fill="#e4464f">B</text>' +
    '<line x1="50" y1="130" x2="300" y2="30" stroke="#9aa5b8" stroke-width="3"/><text x="306" y="34" font-size="13" fill="#303a4c">C</text></svg>';

  B['BUS-S3-15'] = { title: 'Fixed and variable costs', items: [
    { skill: 'definitions', kind: 'mcq', q: 'Which is the best definition of fixed costs?',
      options: ['Costs that do not change with the level of output', 'Costs that never change at all over time', 'Costs that change directly with the level of output', 'Costs paid only once, when a business starts'],
      answer: 0, why: 'Fixed costs stay the same whatever the output. They can still change over time (rent can go up), so "never change" is wrong.' },
    { skill: 'definitions', kind: 'mcq', q: 'Which is the best definition of variable costs?',
      options: ['Costs that change as the level of output changes', 'Costs that change from month to month for any reason', 'Costs that stay the same whatever the output', 'The total of all the costs a business pays'],
      answer: 0, why: 'Variable costs rise when output rises and fall when output falls. The total of all costs is total cost.' },
    { skill: 'definitions', kind: 'mcq', q: 'A student writes: "Variable costs are costs that vary." Why would this answer not earn the mark?',
      options: ['It does not say that the costs vary with the level of output', 'It should say that variable costs never change', 'It should give the total cost formula', 'It uses the word "costs"'],
      answer: 0, why: 'A definition must link the cost to output. Many costs vary over time, but a variable cost changes because output changes.' },
    { skill: 'definitions', kind: 'mcq', q: 'Which statement about total cost is correct?',
      options: ['Total cost = fixed costs + variable costs', 'Total cost = fixed costs × variable costs', 'Total cost = revenue − fixed costs', 'Total cost = variable costs − fixed costs'],
      answer: 0, why: 'Total cost is every cost added together: the fixed costs plus the variable costs.' },
    { skill: 'classifying costs', kind: 'mcq', q: 'Kiwi Squeeze runs a fresh-juice kiosk in a shopping centre. Which one of these is a fixed cost for Kiwi Squeeze?',
      options: ['Monthly rent for the kiosk', 'Fruit used in the juices', 'Paper cups', 'Straws and lids'],
      answer: 0, why: 'The rent is the same whether the kiosk sells 50 or 500 juices. Fruit, cups and straws are used up in each drink, so they are variable.' },
    { skill: 'classifying costs', kind: 'mcq', q: 'Which one of these is a variable cost for a business that prints designs on hoodies?',
      options: ['Ink used for each design', 'Insurance on the printing machine', 'Rent of the workshop', 'Salary of the office manager'],
      answer: 0, why: 'More hoodies printed means more ink used, so ink changes with output. Insurance, rent and salaries stay the same as output changes.' },
    { skill: 'classifying costs', kind: 'multi', q: 'Spoke & Chain makes bicycles in a small factory. Which of these are fixed costs for the business?',
      options: ['Annual insurance on the factory', 'Salary of the factory manager', 'Business rates on the building', 'Steel tubes used for each frame', 'Tyres fitted to each bicycle'],
      answers: [0, 1, 2], why: 'Insurance, the manager\'s salary and business rates do not change with the number of bicycles made. Steel tubes and tyres are needed for every extra bicycle, so they are variable.' },
    { skill: 'classifying costs', kind: 'multi', q: 'A pizza restaurant is deciding which of its costs are variable. Which of these are variable costs?',
      options: ['Cheese and flour for each pizza', 'Takeaway boxes', 'Rent of the restaurant', 'Licence to sell food', 'Gas used by the pizza oven for each extra pizza baked'],
      answers: [0, 1, 4], why: 'Ingredients, boxes and the gas used for each extra pizza rise with the number of pizzas. Rent and the licence stay the same whatever the output.' },
    { skill: 'applying to a business', kind: 'mcq', q: 'Glowhaus makes scented candles by hand. Which one of these is a variable cost for Glowhaus?',
      options: ['Wax used to make the candles', 'Annual fee for its stall at a weekly craft market', 'Monthly subscription for its online shop', 'Lease payment on its candle-pouring machine'],
      answer: 0, why: 'Each extra candle needs more wax, so wax is a variable cost. The stall fee, online-shop subscription and machine lease are paid whatever the number of candles made, so they are fixed.' },
    { skill: 'applying to a business', kind: 'mcq', q: 'Rapid Ride runs a fleet of taxis. Which one of these is a variable cost for Rapid Ride?',
      options: ['Fuel used on each journey', 'Annual insurance on each taxi', 'Rent of the taxi office', 'The yearly licence for each taxi'],
      answer: 0, why: 'The more journeys the taxis make, the more fuel they use. Insurance, office rent and licences are paid whatever the number of journeys.' },
    { skill: 'applying to a business', kind: 'mcq', q: 'FixIt Mobile repairs cracked phone screens. Which one of these is a variable cost for FixIt Mobile?',
      options: ['Replacement screens fitted to customers\' phones', 'Salary of the shop manager', 'Annual licence for its repair-booking software', 'Monthly lease on its screen-repair equipment'],
      answer: 0, why: 'Every repair uses a new screen, so this cost rises with the number of repairs. The manager\'s salary, the software licence and the equipment lease stay the same however many phones are repaired.' },
    { skill: 'applying to a business', kind: 'mcq', q: 'Seaview Lodge is a small hotel. Which one of these is a fixed cost for the hotel?',
      options: ['Insurance on the hotel building', 'Breakfast ingredients for each guest', 'Toiletries put in each room for every stay', 'Laundry of bedsheets after each stay'],
      answer: 0, why: 'Building insurance is paid whatever the number of guests. Breakfast food, toiletries and laundry all rise with the number of guest stays.' },
    { skill: 'one-more-unit test', kind: 'mcq', q: 'Which question is the best test for deciding whether a cost is fixed or variable?',
      options: ['Would this cost rise if the business made one more unit?', 'Is this cost paid every month?', 'Is this cost more than $1,000?', 'Could this cost go up next year?'],
      answer: 0, why: 'A variable cost rises with each extra unit made; a fixed cost does not. How often a cost is paid, its size, or a future price rise does not decide it.' },
    { skill: 'one-more-unit test', kind: 'mcq', q: 'A furniture maker increases output from 200 chairs to 400 chairs a month. What happens to its fixed costs, such as factory rent?',
      options: ['They stay the same', 'They double', 'They halve', 'They fall to zero'],
      answer: 0, why: 'Fixed costs do not change with output, so the rent is the same at 200 or 400 chairs. The variable costs, such as wood, would roughly double.' },
    { skill: 'one-more-unit test', kind: 'mcq', q: 'A jam maker spends $1.20 on fruit and sugar for each jar. What happens to its total variable cost if output rises from 500 jars to 600 jars?',
      options: ['It rises from $600 to $720', 'It stays at $600', 'It rises from $1.20 to $1.44 per jar', 'It falls because costs are spread over more jars'],
      answer: 0, why: 'Total variable cost = $1.20 × jars: 1.20 × 500 = $600 and 1.20 × 600 = $720. The cost per jar stays at $1.20.' },
    { skill: 'one-more-unit test', kind: 'mcq', q: 'A toy factory closes for a month and makes nothing. Which cost does it still have to pay?',
      options: ['Rent on the factory', 'Plastic used to make toys', 'Packaging for each toy', 'Paint for each toy'],
      answer: 0, why: 'Fixed costs are paid even when output is zero. Plastic, packaging and paint are only bought when toys are made.' },
    { skill: 'one-more-unit test', kind: 'mcq', q: 'Which statement about a business that makes zero output in a month is correct?',
      options: ['Its total variable costs are zero, but it still pays its fixed costs', 'Its fixed costs are zero, but it still pays its variable costs', 'Its total costs are zero', 'Its fixed costs and variable costs are equal'],
      answer: 0, why: 'Variable costs depend on output, so with no output they are zero. Fixed costs such as rent and insurance must still be paid.' },
    { skill: 'cost lines on a graph', kind: 'mcq', q: 'The graph shows three cost lines for a business. Which line shows fixed costs?', svg: COST_SVG,
      options: ['Line A', 'Line B', 'Line C'],
      answer: 0, why: 'Line A is horizontal: the cost stays the same at every level of output, which is what fixed costs do.' },
    { skill: 'cost lines on a graph', kind: 'mcq', q: 'The graph shows three cost lines for a business. Which line shows total variable costs?', svg: COST_SVG,
      options: ['Line A', 'Line B', 'Line C'],
      answer: 1, why: 'Line B starts at zero (no output, no variable cost) and rises as output rises.' },
    { skill: 'cost lines on a graph', kind: 'mcq', q: 'The graph shows three cost lines for a business. Line C starts at the same level as line A and rises at the same slope as line B. What does line C show?', svg: COST_SVG,
      options: ['Total costs', 'Fixed costs', 'Variable cost per unit', 'Revenue'],
      answer: 0, why: 'Total costs = fixed costs + variable costs, so the line starts at the fixed-cost level (A) and rises with the variable costs (B).' },
    { skill: 'common mistakes', kind: 'mcq', q: 'A student says: "The landlord raised our rent by 5% this year, so rent is a variable cost." Why is the student wrong?',
      options: ['Rent did not change because of output, so it is still a fixed cost', 'Rent can never change, so the landlord made a mistake', 'Any cost that changes is a fixed cost', 'Rent is a variable cost only when it rises by more than 10%'],
      answer: 0, why: 'Fixed costs can change over time. A cost is variable only if it changes because the level of output changes.' },
    { skill: 'common mistakes', kind: 'mcq', q: 'A student classes the boxes a cereal maker puts its cereal into as a fixed cost. Why is this wrong?',
      options: ['Each extra packet of cereal needs another box, so packaging is a variable cost', 'Packaging is never a business cost', 'Packaging is a fixed cost only if it is printed', 'Boxes are bought once, so they cannot be a cost'],
      answer: 0, why: 'Packaging is used up with every unit made. Making more packets means buying more boxes, so it varies with output.' },
    { skill: 'common mistakes', kind: 'mcq', q: 'Woodcraft pays its machine operators a piece rate of $2 for every shelf they make. Its office manager is paid a salary of $2,800 a month. Which classification is correct?',
      options: ['Piece-rate pay is variable; the manager\'s salary is fixed', 'Piece-rate pay is fixed; the manager\'s salary is variable', 'Both are fixed costs because they are paid to staff', 'Both are variable costs because they are paid to staff'],
      answer: 0, why: 'Piece-rate pay rises with every shelf made, so it is variable. The salary is the same whatever the output, so it is fixed. Who receives the money does not decide the type.' }
  ] };

  /* ======================================================================
     BUS-CALC-03  Total cost from fixed and variable costs
     ====================================================================== */
  B['BUS-CALC-03'] = { title: 'Total cost from fixed and variable costs', items: [
    { skill: 'cost per unit', gen: function () {
      var fc = rint(30000, 90000) / 100, vc = rint(45, 380) / 100, q = rint(8, 40) * 10, c = cur();
      var tvc = r2(vc * q), ans = fc + tvc;
      return moneyNum('Pebble & Pine makes wooden coasters. Its fixed costs are ' + c + m2(fc) + ' a week and the variable cost is ' + c + m2(vc) + ' per coaster.<br>Calculate the total cost of making ' + q + ' coasters in a week. Give your answer in ' + c + '.',
        ans, c, 'Total cost = ' + m2(fc) + ' + (' + m2(vc) + ' × ' + q + ') = ' + m2(fc) + ' + ' + m2(tvc) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'cost per hour', gen: function () {
      var fc = rint(15000, 60000) / 100, rate = rint(1200, 4500) / 100, h = rint(2, 9), c = cur();
      var tv = r2(rate * h), ans = fc + tv;
      return moneyNum('A carpet-cleaning firm has a fixed cost of ' + c + m2(fc) + ' for setting up each contract, plus a variable cost of ' + c + m2(rate) + ' for every hour of cleaning. A contract takes ' + h + ' hours.<br>Calculate the total cost of the contract. Give your answer in ' + c + '.',
        ans, c, 'Variable cost = ' + m2(rate) + ' × ' + h + ' = ' + m2(tv) + '. Total cost = ' + m2(fc) + ' + ' + m2(tv) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'avoiding common errors', gen: function () {
      var fc = rint(20, 90) * 100, vc = rint(3, 25), q = rint(10, 60) * 50, c = cur();
      var ans = fc + vc * q;
      return mcq('A business making phone stands has fixed costs of ' + c + n0(fc) + ' a month and a variable cost of ' + c + vc + ' per stand. It makes ' + n0(q) + ' stands a month. What is the total monthly cost?',
        c + n0(ans), [c + n0(fc + vc), c + n0(fc + q), c + n0(fc * vc), c + n0((fc + vc) * q)],
        n0(fc) + ' + (' + vc + ' × ' + n0(q) + ') = ' + n0(fc) + ' + ' + n0(vc * q) + ' = ' + c + n0(ans) + '. The wrong options add only one unit\'s cost, add the output, or multiply the costs together.');
    } },
    { skill: 'avoiding common errors', gen: function () {
      var fc = rint(8, 40) * 100, vc = rint(4, 18), price = vc + rint(6, 20), q = rint(4, 30) * 10, c = cur();
      var ans = fc + vc * q;
      return mcq('Data for Sunnyside Soaps for one week:' + table(['Item', 'Amount'], [['Fixed costs', c + n0(fc)], ['Variable cost per bar', c + vc], ['Selling price per bar', c + price], ['Bars made and sold', n0(q)]]) + 'What are the total costs for the week?',
        c + n0(ans), [c + n0(fc + price * q), c + n0(vc * q), c + n0(price * q)],
        'Total cost = ' + n0(fc) + ' + (' + vc + ' × ' + n0(q) + ') = ' + c + n0(ans) + '. The selling price is not a cost, so leave it out: ' + c + n0(price * q) + ' is the revenue.',
        [c + n0(fc + vc)]);
    } },
    { skill: 'total variable cost', gen: function () {
      var vc = rint(85, 690) / 100, q = rint(12, 90) * 25, c = cur();
      var ans = vc * q;
      return moneyNum('A bakery makes ' + n0(q) + ' bread rolls a day. Ingredients cost ' + c + m2(vc) + ' per roll. Its daily fixed costs are ' + c + n0(rint(80, 300)) + '.<br>Calculate the total variable cost per day. Give your answer in ' + c + '.',
        ans, c, 'Total variable cost = ' + m2(vc) + ' × ' + n0(q) + ' = ' + c + m2(ans) + '. The fixed costs are not part of the variable cost.');
    } },
    { skill: 'reading a cost table', gen: function () {
      var fc = rint(40, 150) * 100, mat = rint(150, 900) / 100, pack = rint(20, 120) / 100, q = rint(10, 60) * 20, c = cur();
      var per = r2(mat + pack), ans = fc + per * q;
      return moneyNum('Costs for Tidewater Candles each month:' + table(['Cost', 'Amount'], [['Fixed costs', c + n0(fc)], ['Materials per candle', c + m2(mat)], ['Packaging per candle', c + m2(pack)]]) + 'Calculate the total cost of making ' + n0(q) + ' candles in a month. Give your answer in ' + c + '.',
        ans, c, 'Variable cost per candle = ' + m2(mat) + ' + ' + m2(pack) + ' = ' + m2(per) + '. Total cost = ' + n0(fc) + ' + (' + m2(per) + ' × ' + n0(q) + ') = ' + c + m2(ans) + '.');
    } },
    { skill: 'reading a cost table', gen: function () {
      var rent = rint(12, 40) * 100, ins = rint(10, 60) * 10, sal = rint(20, 45) * 100, vc = rint(5, 30), q = rint(10, 50) * 10, c = cur();
      var fc = rent + ins + sal, ans = fc + vc * q;
      return moneyNum('Monthly costs for Arbor Printing:' + table(['Cost', 'Amount'], [['Rent', c + n0(rent)], ['Insurance', c + n0(ins)], ['Manager\'s salary', c + n0(sal)], ['Paper and ink per order', c + vc]]) + 'Calculate the total cost of completing ' + n0(q) + ' orders in a month. Give your answer in ' + c + '.',
        ans, c, 'Fixed costs = ' + n0(rent) + ' + ' + n0(ins) + ' + ' + n0(sal) + ' = ' + n0(fc) + '. Variable costs = ' + vc + ' × ' + n0(q) + ' = ' + n0(vc * q) + '. Total = ' + c + n0(ans) + '.');
    } },
    { skill: 'cost per unit', gen: function () {
      var fc = rint(30, 120) * 100, vc = rint(150, 800) / 100, perDay = rint(20, 90), days = pick([20, 22, 24, 25, 26]), c = cur();
      var q = perDay * days, ans = fc + r2(vc * q);
      return moneyNum('A sandwich maker has fixed costs of ' + c + n0(fc) + ' a month. Each sandwich has a variable cost of ' + c + m2(vc) + '. It makes ' + perDay + ' sandwiches a day and opens for ' + days + ' days a month.<br>Calculate the total monthly cost. Give your answer in ' + c + '.',
        ans, c, 'Output = ' + perDay + ' × ' + days + ' = ' + n0(q) + ' sandwiches. Total cost = ' + n0(fc) + ' + (' + m2(vc) + ' × ' + n0(q) + ') = ' + c + m2(ans) + '.');
    } },
    { skill: 'total variable cost', gen: function () {
      var fc = rint(20, 80) * 100, vc = rint(3, 15), q1 = rint(10, 40) * 10, extra = rint(5, 30) * 10, c = cur();
      var ans = vc * extra;
      return { kind: 'num', q: 'A pottery has fixed costs of ' + c + n0(fc) + ' a month and a variable cost of ' + c + vc + ' per mug. It raises output from ' + n0(q1) + ' to ' + n0(q1 + extra) + ' mugs a month.<br>By how much does its total cost rise? Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'Fixed costs do not change, so only variable costs rise: ' + vc + ' × ' + extra + ' extra mugs = ' + c + n0(ans) + '.' };
    } },
    { skill: 'method', kind: 'mcq', q: 'Which formula gives total cost?',
      options: ['Fixed costs + (variable cost per unit × output)', '(Fixed costs + variable cost per unit) × output', 'Fixed costs × variable cost per unit', 'Selling price × output − fixed costs'],
      answer: 0, why: 'Multiply the variable cost per unit by output first, then add the fixed costs once. Fixed costs are not multiplied by output.' },
    { skill: 'method', kind: 'mcq', q: 'A business has fixed costs of $4,000 a month. Its output in May is zero. What is its total cost for May?',
      options: ['$4,000', '$0', 'It cannot be worked out without the selling price', '$8,000'],
      answer: 0, why: 'With zero output the variable costs are zero, so total cost = fixed costs = $4,000.' },
    { skill: 'method', kind: 'multi', q: 'Which figures are needed to calculate a business\'s total cost for a month?',
      options: ['Fixed costs for the month', 'Variable cost per unit', 'Number of units made in the month', 'Selling price per unit', 'Profit for the month'],
      answers: [0, 1, 2], why: 'Total cost = fixed costs + variable cost per unit × output. The selling price and profit are about revenue, not cost.' },
    { skill: 'reading a cost table', gen: function () {
      var fc = rint(20, 60) * 100, vc = rint(4, 12), outs = [0, 100, 200, 300], ask = rint(4, 9) * 100, c = cur();
      var rows = outs.map(function (o) { return [n0(o), c + n0(fc + vc * o)]; });
      var ans = fc + vc * ask;
      return { kind: 'num', q: 'The table shows the total costs of a stationery maker.' + table(['Output (packs)', 'Total cost'], rows) + 'Calculate the total cost of making ' + ask + ' packs. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'At zero output total cost is ' + n0(fc) + ', so fixed costs = ' + n0(fc) + '. Each 100 packs adds ' + n0(vc * 100) + ', so the variable cost is ' + c + vc + ' per pack. ' + n0(fc) + ' + (' + vc + ' × ' + ask + ') = ' + c + n0(ans) + '.' };
    } },
    { skill: 'cost per unit', gen: function () {
      var venue = rint(8, 30) * 100, per = rint(1800, 6500) / 100, g = rint(4, 20) * 10, c = cur();
      var ans = venue + r2(per * g);
      return moneyNum('An event planner is organising a dinner. Venue hire is a fixed cost of ' + c + n0(venue) + '. Food and drink cost ' + c + m2(per) + ' per guest. There will be ' + g + ' guests.<br>Calculate the total cost of the dinner. Give your answer in ' + c + '.',
        ans, c, n0(venue) + ' + (' + m2(per) + ' × ' + g + ') = ' + n0(venue) + ' + ' + m2(r2(per * g)) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'cost per hour', gen: function () {
      var lease = rint(6000, 14000) / 100, fuel = rint(18, 45) / 100, km = rint(12, 45) * 10, c = cur();
      var ans = lease + r2(fuel * km);
      return moneyNum('A courier leases a van for ' + c + m2(lease) + ' a day. Fuel and tyre wear cost ' + c + m2(fuel) + ' per kilometre. On Monday the van travels ' + km + ' km.<br>Calculate the total cost of the van for Monday. Give your answer in ' + c + '.',
        ans, c, 'Variable cost = ' + m2(fuel) + ' × ' + km + ' = ' + m2(r2(fuel * km)) + '. Total = ' + m2(lease) + ' + ' + m2(r2(fuel * km)) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'avoiding common errors', gen: function () {
      var fc = rint(20, 80) * 100, vc = rint(3, 12), q = rint(10, 50) * 20, c = cur();
      var wrong = fc + vc, ans = fc + vc * q;
      return mcq('Fixed costs are ' + c + n0(fc) + ' and the variable cost is ' + c + vc + ' per unit. A student says the total cost of ' + n0(q) + ' units is ' + c + n0(wrong) + '. What mistake did the student make, and what is the correct total cost?',
        'Added the cost of only one unit; correct total ' + c + n0(ans),
        ['Forgot the fixed costs; correct total ' + c + n0(vc * q), 'Multiplied the fixed costs by output; correct total ' + c + n0(fc * q), 'No mistake; the total is ' + c + n0(wrong)],
        'The student added ' + c + vc + ' (one unit) to the fixed costs. Variable cost must be multiplied by output: ' + n0(fc) + ' + (' + vc + ' × ' + n0(q) + ') = ' + c + n0(ans) + '.');
    } },
    { skill: 'cost per hour', gen: function () {
      var fc = rint(15, 60) * 100, rate = rint(800, 3500) / 100, hpd = rint(4, 10), days = pick([5, 6]), c = cur();
      var h = hpd * days, ans = fc + r2(rate * h);
      return moneyNum('A laser-cutting workshop has fixed costs of ' + c + n0(fc) + ' a week. Running its laser cutter costs ' + c + m2(rate) + ' an hour. This week the cutter runs ' + hpd + ' hours a day for ' + days + ' days.<br>Calculate the total cost for the week. Give your answer in ' + c + '.',
        ans, c, 'Hours = ' + hpd + ' × ' + days + ' = ' + h + '. Variable cost = ' + m2(rate) + ' × ' + h + ' = ' + m2(r2(rate * h)) + '. Total = ' + n0(fc) + ' + ' + m2(r2(rate * h)) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'reading a cost table', gen: function () {
      var fc = rint(30, 90) * 100, va = rint(4, 15), qa = rint(10, 40) * 10, vb = rint(16, 40), qb = rint(5, 25) * 10, c = cur();
      var ans = fc + va * qa + vb * qb;
      return { kind: 'num', q: 'A leather workshop makes wallets and bags. Its fixed costs are ' + c + n0(fc) + ' a month. The variable cost is ' + c + va + ' per wallet and ' + c + vb + ' per bag. This month it makes ' + qa + ' wallets and ' + qb + ' bags.<br>Calculate the total cost for the month. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: n0(fc) + ' + (' + va + ' × ' + qa + ') + (' + vb + ' × ' + qb + ') = ' + n0(fc) + ' + ' + n0(va * qa) + ' + ' + n0(vb * qb) + ' = ' + c + n0(ans) + '. Fixed costs are added once.' };
    } },
    { skill: 'avoiding common errors', gen: function () {
      var q = rint(10, 40) * 50, fx = rint(10, 30) * 100, vx = rint(6, 12), fy = fx + rint(10, 40) * 100, vy = vx - rint(2, 4), c = cur();
      var tx = fx + vx * q, ty = fy + vy * q;
      if (tx === ty) q += 50, tx = fx + vx * q, ty = fy + vy * q;
      var cheap = tx < ty ? 'Supplier X' : 'Supplier Y', dear = tx < ty ? 'Supplier Y' : 'Supplier X', diff = Math.abs(tx - ty);
      return mcq('A shop can buy its printing from two suppliers.' + table(['', 'Fixed set-up cost', 'Cost per leaflet'], [['Supplier X', c + n0(fx), c + vx], ['Supplier Y', c + n0(fy), c + vy]]) + 'For ' + n0(q) + ' leaflets, which supplier has the lower total cost?',
        cheap + ', by ' + c + n0(diff), [dear + ', by ' + c + n0(diff), cheap + ', by ' + c + n0(Math.abs(fx - fy)), dear + ', by ' + c + n0(Math.abs(fx - fy))],
        'Supplier X: ' + n0(fx) + ' + ' + vx + ' × ' + n0(q) + ' = ' + c + n0(tx) + '. Supplier Y: ' + n0(fy) + ' + ' + vy + ' × ' + n0(q) + ' = ' + c + n0(ty) + '. Compare the full total costs, not just the fixed costs.',
        [cheap + ', by ' + c + n0(diff * 2)]);
    } },
    { skill: 'method', kind: 'mcq', q: 'Why does a business\'s total cost rise when it makes more units?',
      options: ['Because total variable costs rise with output', 'Because fixed costs rise with every unit made', 'Because the selling price is added to costs', 'Because profit is part of total cost'],
      answer: 0, why: 'Only the variable part of total cost changes with output. Fixed costs stay the same, and price and profit are not costs.' },
    { skill: 'total variable cost', gen: function () {
      var fc = rint(20, 70) * 100, vc = rint(4, 20), q = rint(10, 60) * 10, c = cur();
      var tc = fc + vc * q;
      return { kind: 'num', q: 'A business has total costs of ' + c + n0(tc) + ' when it makes ' + n0(q) + ' units. Its fixed costs are ' + c + n0(fc) + '.<br>Calculate the total variable cost. Give your answer in ' + c + '.',
        answer: vc * q, unit: c, display: n0(vc * q),
        why: 'Total cost = fixed + variable, so variable costs = ' + n0(tc) + ' − ' + n0(fc) + ' = ' + c + n0(vc * q) + '.' };
    } },
    { skill: 'method', kind: 'mcq', q: 'A business works out its total cost for a month. Which mistake would make its answer too low?',
      options: ['Forgetting to add the fixed costs', 'Multiplying the variable cost per unit by output', 'Adding rent to the variable costs', 'Using the costs for the same month'],
      answer: 0, why: 'Total cost must include the fixed costs. Leaving them out gives only the variable costs, which is too low. The other options are correct steps.' }
  ] };

  /* ======================================================================
     BUS-CALC-04  Total revenue or total pay: rate times quantity
     ====================================================================== */
  B['BUS-CALC-04'] = { title: 'Total revenue or total pay: rate times quantity', items: [
    { skill: 'revenue', gen: function () {
      var p = rint(250, 650) / 100, q = rint(100, 900), c = cur();
      var ans = p * q;
      return moneyNum('A craft brewery sells ' + n0(q) + ' bottles of ginger beer in a week at ' + c + m2(p) + ' each.<br>Calculate the total revenue for the week. Give your answer in ' + c + '.',
        ans, c, 'Revenue = price × quantity = ' + m2(p) + ' × ' + n0(q) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'time period', gen: function () {
      var p = rint(40, 250), q = rint(3, 12), c = cur();
      var ans = p * q * 12;
      return { kind: 'num', q: 'Brightline Solar sells ' + q + ' home battery units every month at ' + c + p + ' each.<br>Calculate the total revenue from battery units for one year. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'One month: ' + q + ' × ' + p + ' = ' + n0(q * p) + '. One year: ' + n0(q * p) + ' × 12 = ' + c + n0(ans) + '. Do not stop at one month.' };
    } },
    { skill: 'pay', gen: function () {
      var r = rint(950, 2800) / 100, h = rint(12, 40), c = cur();
      var ans = r * h;
      return moneyNum('A part-time chef is paid ' + c + m2(r) + ' an hour. She works ' + h + ' hours this week.<br>Calculate her pay for the week. Give your answer in ' + c + '.',
        ans, c, m2(r) + ' × ' + h + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'pay', gen: function () {
      var base = rint(500, 1600) / 50, h = rint(3, 10), c = cur();
      var ot = R.roundDp(base * 1.5, 2), ans = ot * h;
      return moneyNum('Packers at a warehouse earn ' + c + m2(base) + ' an hour. Overtime is paid at ' + c + m2(ot) + ' an hour. One packer works ' + h + ' hours of overtime.<br>Calculate, to two decimal places, the overtime pay. Give your answer in ' + c + '.',
        ans, c, 'Use the overtime rate, not the normal rate: ' + m2(ot) + ' × ' + h + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'several groups', gen: function () {
      var a = rint(40, 200), b = rint(40, 200), d = rint(40, 200), pay = rint(80, 160), c = cur();
      var tot = a + b + d, ans = tot * pay;
      return { kind: 'num', q: 'Each worker at Orion Textiles is paid ' + c + pay + ' a day. The business has three factories:' + table(['Factory', 'Workers'], [['North', a], ['Central', b], ['South', d]]) + 'Calculate the total daily pay for all three factories. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'Total workers = ' + a + ' + ' + b + ' + ' + d + ' = ' + tot + '. Total pay = ' + tot + ' × ' + pay + ' = ' + c + n0(ans) + '.' };
    } },
    { skill: 'several groups', gen: function () {
      var a = rint(5, 20), b = rint(5, 20), d = rint(5, 20), pay = rint(15, 40) * 100, c = cur();
      var tot = a + b + d, ans = tot * pay;
      return mcq('A dental group has ' + a + ' nurses in its city clinic, ' + b + ' in its harbour clinic and ' + d + ' in its hill clinic. Each nurse is paid ' + c + n0(pay) + ' a month. What is the total monthly pay for all the nurses?',
        c + n0(ans), [c + n0(a * pay), c + n0(b * pay), c + n0(pay * 3)],
        '(' + a + ' + ' + b + ' + ' + d + ') × ' + n0(pay) + ' = ' + tot + ' × ' + n0(pay) + ' = ' + c + n0(ans) + '. Using one clinic only gives too small an answer.',
        [c + n0(d * pay), c + n0(ans * 2)]);
    } },
    { skill: 'revenue', gen: function () {
      var fc = rint(3, 12) * 100, vc = rint(2, 6), p = vc + rint(4, 12), q = rint(10, 40) * 10, c = cur();
      var ans = p * q;
      return mcq('A street-food van has fixed costs of ' + c + n0(fc) + ' a day. Each wrap has a variable cost of ' + c + vc + ' and sells for ' + c + p + '. The van sells ' + q + ' wraps a day. What is the total revenue for a day?',
        c + n0(ans), [c + n0(fc), c + n0(fc * vc), c + n0(fc * p), c + n0(vc * q)],
        'Revenue = selling price × quantity = ' + p + ' × ' + q + ' = ' + c + n0(ans) + '. Costs are not used to work out revenue.');
    } },
    { skill: 'revenue', gen: function () {
      var pa = rint(5, 30), qa = rint(40, 300), pb = rint(31, 80), qb = rint(10, 120), c = cur();
      var ans = pa * qa + pb * qb;
      return { kind: 'num', q: 'A cinema sells ' + qa + ' standard tickets at ' + c + pa + ' each and ' + qb + ' premium tickets at ' + c + pb + ' each on Saturday.<br>Calculate the total ticket revenue for Saturday. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: '(' + qa + ' × ' + pa + ') + (' + qb + ' × ' + pb + ') = ' + n0(pa * qa) + ' + ' + n0(pb * qb) + ' = ' + c + n0(ans) + '.' };
    } },
    { skill: 'time period', gen: function () {
      var sal = rint(18, 55) * 100, n = rint(4, 25), c = cur();
      var ans = sal * n * 12;
      return { kind: 'num', q: 'An architecture firm employs ' + n + ' designers, each paid a salary of ' + c + n0(sal) + ' a month.<br>Calculate the total salary cost of the designers for a year. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: n0(sal) + ' × ' + n + ' designers × 12 months = ' + c + n0(ans) + '.' };
    } },
    { skill: 'pay', gen: function () {
      var r = rint(900, 2400) / 100, hpd = pick([6, 7, 7.5, 8]), days = rint(3, 6), c = cur();
      var h = hpd * days, ans = r * h;
      return moneyNum('A shop assistant is paid ' + c + m2(r) + ' an hour. She works ' + hpd + ' hours a day for ' + days + ' days this week.<br>Calculate her pay for the week. Give your answer in ' + c + '.',
        ans, c, 'Hours = ' + hpd + ' × ' + days + ' = ' + h + '. Pay = ' + m2(r) + ' × ' + h + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'time period', gen: function () {
      var perDay = rint(20, 120), days = pick([5, 6, 7]), p = rint(150, 900) / 100, c = cur();
      var q = perDay * days, ans = p * q;
      return moneyNum('A bakery stall sells ' + perDay + ' loaves a day and opens ' + days + ' days a week. Each loaf sells for ' + c + m2(p) + '.<br>Calculate the weekly revenue from loaves. Give your answer in ' + c + '.',
        ans, c, 'Loaves a week = ' + perDay + ' × ' + days + ' = ' + q + '. Revenue = ' + m2(p) + ' × ' + q + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'meaning', kind: 'mcq', q: 'What is revenue?',
      options: ['The money a business receives from selling its goods or services', 'The money left after all costs have been paid', 'The money a business spends on producing its goods', 'The money owners put into the business'],
      answer: 0, why: 'Revenue is income from sales (price × quantity sold). Money left after costs is profit, and money put in by owners is capital.' },
    { skill: 'meaning', kind: 'mcq', q: 'What does "remuneration" mean in a business question?',
      options: ['The total reward paid to employees for their work', 'The money received from customers for goods sold', 'The cost of materials used in production', 'Interest paid on a bank loan'],
      answer: 0, why: 'Remuneration is the pay and other rewards employees receive, such as wages and salaries. Money from customers is revenue.' },
    { skill: 'meaning', kind: 'mcq', q: 'A business makes garden benches for $45 each in variable costs and sells them for $120 each. To find total revenue from 30 benches, which calculation is correct?',
      options: ['120 × 30', '45 × 30', '(120 − 45) × 30', '120 + 30'],
      answer: 0, why: 'Revenue uses the selling price: 120 × 30 = $3,600. 45 × 30 is the total variable cost, and (120 − 45) × 30 is a profit-type figure.' },
    { skill: 'time period', gen: function () {
      var p = rint(40, 120), q = rint(3, 9), c = cur();
      return mcq('A garage sells ' + q + ' car-care packages every month at ' + c + p + ' each. Which calculation gives the revenue from the packages for a whole year?',
        q + ' × ' + p + ' × 12', [q + ' × ' + p, q + ' × 12', p + ' × 12'],
        'Price × number sold per month × 12 months: ' + q + ' × ' + p + ' × 12 = ' + c + n0(q * p * 12) + '.');
    } },
    { skill: 'time period', gen: function () {
      var subs = rint(120, 900), fee = rint(499, 2999) / 100, c = cur();
      var ans = subs * fee * 12;
      return moneyNum('A meal-kit company has ' + n0(subs) + ' subscribers, each paying ' + c + m2(fee) + ' a month. Assume the number of subscribers stays the same.<br>Calculate the revenue from subscriptions for a year. Give your answer in ' + c + '.',
        ans, c, n0(subs) + ' × ' + m2(fee) + ' = ' + m2(subs * fee) + ' a month. × 12 = ' + c + m2(ans) + ' a year.');
    } },
    { skill: 'pay', gen: function () {
      var n = rint(3, 12), h = rint(20, 40), r = rint(1000, 2200) / 100, c = cur();
      var ans = n * h * r;
      return moneyNum('A cleaning company sends a team of ' + n + ' cleaners to a hospital. Each cleaner works ' + h + ' hours a week and is paid ' + c + m2(r) + ' an hour.<br>Calculate the total weekly pay for the team. Give your answer in ' + c + '.',
        ans, c, n + ' cleaners × ' + h + ' hours × ' + m2(r) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'meaning', kind: 'mcq', q: 'A juice bar keeps its price the same but sells twice as many smoothies this month as last month. What happens to its revenue from smoothies?',
      options: ['It doubles', 'It stays the same', 'It halves', 'It rises by the price of one smoothie'],
      answer: 0, why: 'Revenue = price × quantity. If the price is unchanged and quantity doubles, revenue doubles.' },
    { skill: 'time period', gen: function () {
      var p = rint(20, 90), q = rint(4, 15), c = cur();
      var wrong = p * q, ans = p * q * 12;
      return { kind: 'num', q: 'A pet shop sells ' + q + ' aquarium kits a month at ' + c + p + ' each. A student says the yearly revenue is ' + c + n0(wrong) + '.<br>Calculate the correct revenue for a year. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: c + n0(wrong) + ' is one month only. ' + n0(wrong) + ' × 12 = ' + c + n0(ans) + ' for the year.' };
    } },
    { skill: 'meaning', kind: 'multi', q: 'Which figures are needed to calculate a shop\'s total revenue for a week?',
      options: ['Selling price of each item', 'Number of each item sold in the week', 'Rent paid for the shop', 'Cost of buying the items from suppliers', 'Wages paid to the staff'],
      answers: [0, 1], why: 'Revenue = price × quantity sold. Rent, supplier costs and wages are costs, so they are not needed for revenue.' },
    { skill: 'several groups', gen: function () {
      var sa = rint(3, 9), sb = rint(3, 9), perShop = rint(40, 160), p = rint(3, 15), c = cur();
      var shops = sa + sb, ans = shops * perShop * p;
      return { kind: 'num', q: 'A bubble-tea chain has ' + sa + ' shops in the east of a city and ' + sb + ' shops in the west. Each shop sells about ' + perShop + ' drinks a day at ' + c + p + ' each.<br>Calculate the chain\'s total daily revenue. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'Shops = ' + sa + ' + ' + sb + ' = ' + shops + '. Revenue = ' + shops + ' × ' + perShop + ' × ' + p + ' = ' + c + n0(ans) + '.' };
    } },
    { skill: 'pay', gen: function () {
      var rate = rint(30, 180) / 100, items = rint(30, 90) * 10, c = cur();
      var ans = rate * items;
      return moneyNum('Workers at a sewing workshop are paid ' + c + m2(rate) + ' for every cushion cover they finish. Amira finishes ' + n0(items) + ' covers this month.<br>Calculate her pay for the month. Give your answer in ' + c + '.',
        ans, c, 'Pay = rate per item × items = ' + m2(rate) + ' × ' + n0(items) + ' = ' + c + m2(ans) + '.');
    } },
    { skill: 'several groups', gen: function () {
      var a = rint(20, 60), b = rint(20, 60), pay = rint(9, 18) * 10, c = cur();
      var ans = (a + b) * pay;
      return mcq('A hotel employs ' + a + ' kitchen staff and ' + b + ' cleaning staff. Every one of them is paid ' + c + pay + ' a day. What is the total daily pay?',
        c + n0(ans), [c + n0(a * pay), c + n0(b * pay), c + n0(a + b + pay)],
        '(' + a + ' + ' + b + ') × ' + pay + ' = ' + (a + b) + ' × ' + pay + ' = ' + c + n0(ans) + '.',
        [c + n0(ans * 2)]);
    } }
  ] };

  /* ======================================================================
     BUS-S3-16  Revenue and profit: meaning and how to raise them
     ====================================================================== */
  B['BUS-S3-16'] = { title: 'Revenue and profit: meaning and how to raise them', items: [
    { skill: 'meanings', kind: 'mcq', q: 'Which is the correct definition of profit?',
      options: ['Total revenue minus total costs', 'The money received from selling goods', 'Cash inflows minus cash outflows', 'Selling price multiplied by quantity sold'],
      answer: 0, why: 'Profit is what is left after total costs are taken from total revenue. Price × quantity is revenue, and inflows minus outflows is net cash flow.' },
    { skill: 'meanings', kind: 'mcq', q: 'A student writes: "Revenue is the money a business has left after paying its costs." What is wrong with this definition?',
      options: ['It describes profit, not revenue', 'It describes fixed costs, not revenue', 'It is correct', 'It describes the gross profit margin'],
      answer: 0, why: 'Revenue is the money received from sales before any costs are taken away. Money left after costs is profit.' },
    { skill: 'meanings', kind: 'mcq', q: 'What is gross profit?',
      options: ['Revenue minus cost of sales', 'Revenue minus all costs including expenses', 'Gross profit as a percentage of revenue', 'Cost of sales plus expenses'],
      answer: 0, why: 'Gross profit only takes away the cost of the goods sold. Taking away expenses as well gives operating profit.' },
    { skill: 'meanings', kind: 'mcq', q: 'In one year a business has total revenue of $380,000 and total costs of $410,000. What has it made?',
      options: ['A loss of $30,000, because its costs are greater than its revenue', 'A profit of $30,000, because profit is the gap between the two figures', 'A loss of $410,000, because its total costs were $410,000', 'A profit of $380,000, because revenue is the money it receives'],
      answer: 0, why: 'Profit = revenue − total costs = 380,000 − 410,000 = −$30,000. A negative figure is a loss. $410,000 is the total costs and $380,000 is the revenue, not the result.' },
    { skill: 'meanings', kind: 'mcq', q: 'What does the gross profit margin measure?',
      options: ['Gross profit as a percentage of revenue', 'Revenue as a percentage of gross profit', 'The amount of cash a business holds', 'The difference between revenue and all costs'],
      answer: 0, why: 'Gross profit margin = gross profit ÷ revenue × 100. It shows how much of each unit of revenue is left after cost of sales.' },
    { skill: 'ways to raise profit', kind: 'mcq', q: 'Which action would most directly increase a sandwich shop\'s profit per sandwich, if its price and sales stay the same?',
      options: ['Buying the same quality bread from a cheaper supplier', 'Hiring an extra member of staff to serve customers faster', 'Moving to a bigger shop nearby with a higher rent', 'Giving every customer a free drink with each sandwich'],
      answer: 0, why: 'A cheaper supplier lowers the cost of each sandwich, so the gap between price and cost per unit widens. The other actions raise costs.' },
    { skill: 'ways to raise profit', kind: 'multi', q: 'A small hairdresser wants to increase profit by finding a cheaper supplier of hair products. Select the TWO steps that develop this into a chain of reasoning.',
      options: ['The cost of products used for each appointment falls', 'With the same prices, more of each appointment\'s revenue is left as profit', 'The hairdresser will definitely get more customers', 'Revenue will rise because products cost less', 'The hairdresser must close for a week'],
      answers: [0, 1], why: 'A cheaper supplier lowers costs per appointment, and with prices unchanged the gap between revenue and costs widens. Lower costs do not raise revenue or bring customers by themselves.' },
    { skill: 'ways to raise profit', kind: 'mcq', q: 'Which of these is NOT a way of increasing profit?',
      options: ['Increasing fixed costs while sales stay the same', 'Selling more units at the same price and cost per unit', 'Cutting waste of raw materials', 'Raising the price when customers keep buying'],
      answer: 0, why: 'If costs rise but revenue does not, the gap between revenue and costs shrinks, so profit falls.' },
    { skill: 'ways to raise profit', kind: 'mcq', q: 'Which change would raise a firm\'s gross profit margin?',
      options: ['Cost of sales per unit falls while the price stays the same', 'Cost of sales per unit rises while the price stays the same', 'The firm spends more on advertising', 'The firm sells more units at a lower price with the same cost per unit'],
      answer: 0, why: 'If each unit costs less but sells for the same price, more of each $1 of revenue is gross profit, so the margin rises. Advertising is an expense, not cost of sales.' },
    { skill: 'trade-offs', kind: 'mcq', q: 'A gift shop raises its prices by 20% to increase profit. Which is the main risk?',
      options: ['Customers may buy fewer items or go to rivals, so revenue could fall', 'The cost of each item bought from its suppliers will automatically rise by 20%', 'The shop\'s rent and other fixed costs will rise by 20% as well', 'Revenue is certain to rise by exactly 20%, so profit cannot fall'],
      answer: 0, why: 'A higher price only raises profit if customers keep buying. If enough customers switch to rivals, revenue and profit could fall.' },
    { skill: 'trade-offs', kind: 'mcq', q: 'A burger chain switches to cheaper, lower-grade beef to cut costs. Which is the strongest counter-argument?',
      options: ['Lower quality may disappoint customers, so sales and revenue could fall', 'Cheaper beef lowers the cost of each burger, so the profit on each burger rises', 'Cutting costs never has any effect on the profit a business makes', 'Cost of sales will rise because cheaper beef must be bought more often'],
      answer: 0, why: 'Cutting costs only raises profit if sales hold up. If quality falls and customers leave, the lost revenue may outweigh the saving. Lower cost per burger is the argument for the change, not against it.' },
    { skill: 'trade-offs', kind: 'mcq', q: 'A coffee shop is the only café at a busy railway station, and many customers buy coffee there every morning. Its owner wants to raise prices. The decision most depends on…',
      options: ['how many customers would keep buying at the higher price', 'how many years the owner has been running the café at the station', 'whether the café opened before or after the station was built', 'whether the owner is a sole trader or runs a private limited company'],
      answer: 0, why: 'A price rise increases profit only if most customers keep buying. With no nearby rival this is more likely, but it still depends on how customers respond.' },
    { skill: 'trade-offs', kind: 'mcq', q: 'A clothing brand\'s revenue rose by 10% last year, but its profit fell. Which is the most likely reason?',
      options: ['Its total costs rose by more than its revenue', 'It raised its prices, and higher prices always reduce profit', 'Profit always falls when a business sells more', 'Its total costs fell by more than its revenue rose'],
      answer: 0, why: 'Profit = revenue − costs. If costs rise by more than revenue, profit falls even though sales income grew.' },
    { skill: 'trade-offs', kind: 'mcq', q: 'A phone retailer plans a large advertising campaign. Why might revenue rise but profit fall?',
      options: ['The cost of the campaign may be greater than the extra revenue it brings in', 'Revenue and profit always move in opposite directions, so profit must fall when revenue rises', 'Advertising lowers the cost of sales, so gross profit falls as revenue rises', 'Advertising forces the retailer to cut the price of every phone it sells'],
      answer: 0, why: 'Advertising adds to costs. If the extra revenue is smaller than the campaign\'s cost, profit falls even though revenue rises.' },
    { skill: 'why profit matters', kind: 'mcq', q: 'Orbital Robotics is a public limited company that spends heavily on research into new robots. Why is profit especially important to it?',
      options: ['Profit can be reinvested in research and attracts investors seeking returns', 'Profit is the same as the cash it receives from customers for its robots', 'Profit means it no longer has to pay for research, wages or materials', 'Profit is needed because a public limited company is not allowed to borrow money'],
      answer: 0, why: 'Retained profit funds research into new products, and strong profits make shareholders and new investors more willing to provide finance.' },
    { skill: 'why profit matters', kind: 'mcq', q: 'Why is profit important to a sole trader who runs a mobile car-washing business?',
      options: ['Profit is the owner\'s reward and income for the risk taken', 'Profit is paid out to the shareholders of the business as dividends', 'Profit is needed to pay the salaries of the company\'s directors', 'Profit is the same as the money the owner first put into the business'],
      answer: 0, why: 'A sole trader keeps the profit, so it is their income and reward for risk. A sole trader has no shareholders or directors.' },
    { skill: 'why profit matters', kind: 'mcq', q: 'A family-run hotel applies for a bank loan to build an extension. How does a record of profit help?',
      options: ['It shows the bank the hotel is likely to be able to repay the loan', 'It means the bank is required by law to lend the hotel the money it asks for', 'It means the hotel will not have to pay any interest on the loan', 'It shows the bank that the hotel has no costs to pay each year'],
      answer: 0, why: 'Lenders want evidence that a business earns more than it spends, because that makes repayment more likely. Profit does not guarantee a loan.' },
    { skill: 'why profit matters', kind: 'multi', q: 'Nimbus Games, a fast-growing video-game studio, made a large profit this year. Select the TWO points that best explain why this profit matters to Nimbus Games.',
      options: ['Retained profit can pay for developing its next game without borrowing', 'High profit may persuade investors to buy shares, raising more finance for growth', 'Profit means the studio has no costs to pay next year', 'Profit is the total money received from game sales', 'Profit guarantees its next game will sell well'],
      answers: [0, 1], why: 'Profit can be reinvested to fund new games and can attract investors. Profit is not revenue, does not remove costs and does not guarantee future sales.' },
    { skill: 'why profit matters', kind: 'mcq', q: 'A student writes: "A business with cash inflows of $50,000 this month has made a profit of $50,000." Why is this wrong?',
      options: ['Profit is revenue minus costs; cash inflows are not profit', 'Cash inflows are always smaller than profit, so profit must be higher', 'Profit is cash inflows plus cash outflows for the same month', 'Cash inflows are the same as total costs, so the business broke even'],
      answer: 0, why: 'Cash inflows show money coming in. To find profit, total costs must be taken away from revenue for the same period.' },
    { skill: 'ways to raise profit', kind: 'mcq', q: 'Which answer best explains one method a small bakery could use to increase profit?',
      options: ['Buy flour in bulk at a lower price per kg, which cuts the cost of each loaf, so with the same price each loaf earns more profit', 'Increase sales', 'Increase sales, cut costs, raise prices, advertise on social media and open a second shop, so that the bakery makes much more money', 'Profit will go up because the bakery is good and its customers like it'],
      answer: 0, why: 'A good explanation gives one specific method and shows how it changes costs or revenue and so profit. "Increase sales" alone has no method or chain.' },
    { skill: 'ways to raise profit', kind: 'mcq', q: 'A student explains: "A gym could raise its monthly fee, so profit rises." Which step is missing from the chain?',
      options: ['If most members stay, revenue per member rises while costs stay the same', 'The gym must buy new equipment so that members accept paying the higher fee', 'Profit is revenue minus costs', 'The gym will need to employ more staff to deal with the higher fee'],
      answer: 0, why: 'The chain needs the link between the action and profit: a higher fee raises revenue (if members stay) while costs are unchanged, so the gap widens.' },
    { skill: 'meanings', kind: 'mcq', q: 'Which figure is taken away from gross profit to find operating profit?',
      options: ['Expenses such as rent, salaries and advertising', 'Cost of sales, such as the cost of the goods sold', 'Revenue from all the goods and services sold', 'The gross profit margin for the year'],
      answer: 0, why: 'Operating profit = gross profit − expenses. Cost of sales has already been taken away to find gross profit.' },
    { skill: 'why profit matters', kind: 'mcq', q: 'Bay Ferries carries cars and passengers between two islands. Which point about profit is applied to this business, rather than generic?',
      options: ['Profit could pay for a new, larger ferry so more cars can be carried each crossing', 'Profit is important because every business needs it to survive and grow in the long run', 'Profit is total revenue minus total costs', 'Profit can be used for many different things, such as paying owners and investing'],
      answer: 0, why: 'An applied point uses the business\'s own situation (ferries, cars, crossings). The others would fit any business.' }
  ] };

  /* ======================================================================
     BUS-CALC-05  Work out profit or loss
     ====================================================================== */
  B['BUS-CALC-05'] = { title: 'Work out profit or loss', items: [
    { skill: 'profit from revenue and costs', gen: function () {
      var lab = rint(20, 80) * 1000, mat = rint(15, 60) * 1000, oth = rint(5, 30) * 1000, rev = lab + mat + oth + rint(5, 60) * 1000, c = cur();
      var ans = rev - lab - mat - oth;
      return { kind: 'num', q: 'Data for Copperleaf Garden Design for one year:' + table(['Item', 'Amount'], [['Revenue', c + n0(rev)], ['Labour costs', c + n0(lab)], ['Materials', c + n0(mat)], ['Other costs', c + n0(oth)]]) + 'Calculate the profit for the year. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'Total costs = ' + n0(lab) + ' + ' + n0(mat) + ' + ' + n0(oth) + ' = ' + n0(lab + mat + oth) + '. Profit = ' + n0(rev) + ' − ' + n0(lab + mat + oth) + ' = ' + c + n0(ans) + '.' };
    } },
    { skill: 'gross profit', gen: function () {
      var cost = rint(400, 1800) / 100, p = R.roundDp(cost + rint(150, 900) / 100, 2), q = rint(20, 150) * 100, c = cur();
      var gp = r2(p - cost), ans = gp * q;
      return moneyNum('A sportswear firm buys caps for ' + c + m2(cost) + ' each and sells them for ' + c + m2(p) + ' each. It sells ' + n0(q) + ' caps.<br>Calculate the gross profit. Give your answer in ' + c + '.',
        ans, c, 'Gross profit per cap = ' + m2(p) + ' − ' + m2(cost) + ' = ' + m2(gp) + '. × ' + n0(q) + ' = ' + c + m2(ans) + '. (Or revenue ' + m2(p * q) + ' − cost of sales ' + m2(cost * q) + '.)');
    } },
    { skill: 'operating profit', gen: function () {
      var rent = rint(10, 40) * 1000, wages = rint(30, 90) * 1000, adv = rint(3, 15) * 1000, gp = rent + wages + adv + rint(-20, 60) * 1000, c = cur();
      if (gp === rent + wages + adv) gp += 5000;
      var ans = gp - rent - wages - adv;
      return { kind: 'num', q: 'Silverfin Seafoods had a gross profit of ' + c + n0(gp) + ' last year. Its expenses were:' + table(['Expense', 'Amount'], [['Rent', c + n0(rent)], ['Office wages', c + n0(wages)], ['Advertising', c + n0(adv)]]) + 'Calculate the operating profit. Write a loss as a negative number. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: (ans < 0 ? '−' : '') + n0(Math.abs(ans)),
        why: 'Expenses = ' + n0(rent) + ' + ' + n0(wages) + ' + ' + n0(adv) + ' = ' + n0(rent + wages + adv) + '. Operating profit = ' + n0(gp) + ' − ' + n0(rent + wages + adv) + ' = ' + (ans < 0 ? '−' : '') + c + n0(Math.abs(ans)) + (ans < 0 ? ', an operating loss.' : '.') };
    } },
    { skill: 'operating profit', gen: function () {
      var sales = rint(200, 900) * 1000, cos = Math.round(sales * rint(35, 60) / 100 / 1000) * 1000, exp = rint(20, Math.floor((sales - cos) / 1000) - 10) * 1000, c = cur();
      var ans = sales - cos - exp;
      return { kind: 'num', q: 'Extract from the income statement of Lantern Books:' + table(['', c], [['Sales', n0(sales)], ['Cost of sales', n0(cos)], ['Expenses', n0(exp)]]) + 'Calculate the operating profit. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'Gross profit = ' + n0(sales) + ' − ' + n0(cos) + ' = ' + n0(sales - cos) + '. Operating profit = ' + n0(sales - cos) + ' − ' + n0(exp) + ' = ' + c + n0(ans) + '.' };
    } },
    { skill: 'profit or loss statements', gen: function () {
      var fc = rint(200, 900) * 1000, vc = rint(1000, 4000) * 1000, rev = fc + vc + rint(-300, 300) * 1000, c = cur();
      if (rev === fc + vc) rev += 50000;
      var res = rev - fc - vc, tc = fc + vc;
      var lab = function (x) { return (x >= 0 ? 'Profit of ' : 'Loss of ') + c + n0(Math.abs(x)); };
      return mcq('Data for Ridgeway Motors for one year: revenue ' + c + n0(rev) + ', fixed costs ' + c + n0(fc) + ', variable costs ' + c + n0(vc) + '. Which statement is correct?',
        lab(res), [lab(-res), 'Loss of ' + c + n0(tc), lab(rev - vc)],
        'Total costs = ' + n0(fc) + ' + ' + n0(vc) + ' = ' + n0(tc) + '. ' + n0(rev) + ' − ' + n0(tc) + ' = ' + (res < 0 ? '−' : '') + n0(Math.abs(res)) + ', so it is a ' + (res >= 0 ? 'profit' : 'loss') + '. Subtracting only variable costs, or giving the total costs, is wrong.',
        ['Profit of ' + c + n0(tc)]);
    } },
    { skill: 'operating profit', gen: function () {
      var sales = rint(150, 600) * 1000, cos = rint(40, 70) * sales / 100, exp = rint(10, 30) * sales / 100, c = cur();
      cos = Math.round(cos / 1000) * 1000; exp = Math.round(exp / 1000) * 1000;
      var ans = sales - cos - exp;
      return mcq('Kestrel Hardware had sales of ' + c + n0(sales) + ', cost of sales of ' + c + n0(cos) + ' and expenses of ' + c + n0(exp) + ' in 2025. What was its operating profit?',
        c + n0(ans), [c + n0(cos + exp), c + n0(sales - cos), c + n0(sales - exp)],
        'Operating profit = sales − cost of sales − expenses = ' + n0(sales) + ' − ' + n0(cos) + ' − ' + n0(exp) + ' = ' + c + n0(ans) + '. Sales − cost of sales is only gross profit.',
        [c + n0(ans * 2)]);
    } },
    { skill: 'profit from revenue and costs', gen: function () {
      var p = rint(12, 60), vc = rint(4, p - 5), fc = rint(10, 60) * 100, q = rint(20, 120) * 10, c = cur();
      var rev = p * q, tc = fc + vc * q, ans = rev - tc;
      return { kind: 'num', q: 'A firm making yoga mats sells them for ' + c + p + ' each. Its fixed costs are ' + c + n0(fc) + ' a month and the variable cost is ' + c + vc + ' per mat. It sells ' + n0(q) + ' mats this month.<br>Calculate the profit or loss for the month. Write a loss as a negative number. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: (ans < 0 ? '−' : '') + n0(Math.abs(ans)),
        why: 'Revenue = ' + p + ' × ' + n0(q) + ' = ' + n0(rev) + '. Total costs = ' + n0(fc) + ' + (' + vc + ' × ' + n0(q) + ') = ' + n0(tc) + '. Profit = ' + n0(rev) + ' − ' + n0(tc) + ' = ' + (ans < 0 ? '−' : '') + c + n0(Math.abs(ans)) + (ans < 0 ? ', a loss.' : '.') };
    } },
    { skill: 'losses', gen: function () {
      var rev = rint(40, 200) * 1000, loss = rint(2, 30) * 1000, tc = rev + loss, c = cur();
      return { kind: 'num', q: 'A new escape-room business earned revenue of ' + c + n0(rev) + ' in its first year. Its total costs were ' + c + n0(tc) + '.<br>Calculate the size of the loss. Give your answer in ' + c + ' as a positive number.',
        answer: loss, unit: c, display: n0(loss),
        why: 'Revenue − total costs = ' + n0(rev) + ' − ' + n0(tc) + ' = −' + n0(loss) + '. The negative sign shows a loss of ' + c + n0(loss) + '.' };
    } },
    { skill: 'gross profit', gen: function () {
      var rev = rint(80, 500) * 1000, cos = Math.round(rev * rint(30, 70) / 100 / 100) * 100, c = cur();
      var ans = rev - cos;
      return { kind: 'num', q: 'A tea importer had revenue of ' + c + n0(rev) + ' and cost of sales of ' + c + n0(cos) + '. Its other expenses were ' + c + n0(rint(10, 40) * 1000) + '.<br>Calculate the gross profit. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: n0(ans),
        why: 'Gross profit = revenue − cost of sales = ' + n0(rev) + ' − ' + n0(cos) + ' = ' + c + n0(ans) + '. Expenses are not taken away for gross profit.' };
    } },
    { skill: 'losses', gen: function () {
      var fc = rint(40, 150) * 1000, vc = rint(100, 400) * 1000, loss = rint(5, 40) * 1000, rev = fc + vc - loss, c = cur();
      var tc = fc + vc;
      return mcq('A festival organiser had revenue of ' + c + n0(rev) + ', fixed costs of ' + c + n0(fc) + ' and variable costs of ' + c + n0(vc) + '. Which statement is correct?',
        'It made a loss of ' + c + n0(loss), ['It made a profit of ' + c + n0(loss), 'It made a loss of ' + c + n0(tc), 'It made a profit of ' + c + n0(rev - vc)],
        'Total costs = ' + n0(tc) + ', which is more than revenue of ' + n0(rev) + '. ' + n0(rev) + ' − ' + n0(tc) + ' = −' + n0(loss) + ', a loss.',
        ['It made a profit of ' + c + n0(tc)]);
    } },
    { skill: 'profit from revenue and costs', gen: function () {
      var p = rint(20, 90), vc = rint(5, p - 8), fc = rint(5, 40) * 1000, q = rint(5, 40) * 100, c = cur();
      var per = p - vc, ans = per * q - fc;
      return { kind: 'num', q: 'Each pair of headphones sold by SoundPeak earns ' + c + per + ' after its variable costs (price ' + c + p + ', variable cost ' + c + vc + '). Fixed costs are ' + c + n0(fc) + ' a year. It sells ' + n0(q) + ' pairs a year.<br>Calculate the profit or loss for the year. Write a loss as a negative number. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: (ans < 0 ? '−' : '') + n0(Math.abs(ans)),
        why: per + ' × ' + n0(q) + ' = ' + n0(per * q) + '. Then take away fixed costs: ' + n0(per * q) + ' − ' + n0(fc) + ' = ' + (ans < 0 ? '−' : '') + c + n0(Math.abs(ans)) + '.' };
    } },
    { skill: 'method', kind: 'mcq', q: 'Which formula gives profit?',
      options: ['Total revenue − total costs', 'Total revenue + total costs', 'Total costs − total revenue', 'Total revenue − variable costs only'],
      answer: 0, why: 'Profit takes ALL costs away from revenue. Taking away only variable costs ignores the fixed costs.' },
    { skill: 'method', kind: 'mcq', q: 'How is operating profit calculated?',
      options: ['Gross profit − expenses', 'Sales − expenses', 'Sales − cost of sales', 'Gross profit + expenses'],
      answer: 0, why: 'First find gross profit (sales − cost of sales), then take away expenses such as rent and salaries.' },
    { skill: 'method', kind: 'mcq', q: 'A student calculates revenue − total costs for a business and gets −$12,400. What does this show?',
      options: ['The business made a loss of $12,400', 'The business made a profit of $12,400', 'The business\'s total costs were $12,400', 'The student must have made a mistake, because profit cannot be negative'],
      answer: 0, why: 'A negative result means costs were bigger than revenue, which is a loss.' },
    { skill: 'method', kind: 'multi', q: 'Brightside Fashion runs a clothes shop. Which of these are expenses (taken from gross profit) rather than cost of sales?',
      options: ['Rent of the shop', 'Salaries of the office staff', 'Advertising on social media', 'The cost of the clothes bought from suppliers to resell'],
      answers: [0, 1, 2], why: 'Cost of sales is the cost of the goods actually sold, here the clothes bought for resale. Rent, office salaries and advertising are expenses.' },
    { skill: 'profit or loss statements', gen: function () {
      var lab = rint(20, 60) * 1000, mat = rint(20, 60) * 1000, rev = lab + mat + rint(5, 40) * 1000, c = cur();
      var wrong = rev - lab, ans = rev - lab - mat;
      return mcq('A boat-repair yard had revenue of ' + c + n0(rev) + ', labour costs of ' + c + n0(lab) + ' and materials costs of ' + c + n0(mat) + '. A student says the profit is ' + c + n0(wrong) + '. Which is correct?',
        'The student left out materials; the profit is ' + c + n0(ans),
        ['The student is correct; the profit is ' + c + n0(wrong), 'The student left out materials; the profit is ' + c + n0(lab + mat), 'The student should have added the costs; the profit is ' + c + n0(rev + lab + mat)],
        'Every cost line must be subtracted: ' + n0(rev) + ' − ' + n0(lab) + ' − ' + n0(mat) + ' = ' + c + n0(ans) + '. ' + c + n0(lab + mat) + ' is the total costs, not the profit.');
    } },
    { skill: 'profit from revenue and costs', gen: function () {
      var months = ['January', 'February', 'March'], rev = [], cost = [], tr = 0, tcs = 0, c = cur();
      for (var i = 0; i < 3; i++) { rev.push(rint(30, 90) * 1000); cost.push(rev[i] + rint(-15, 12) * 1000); tr += rev[i]; tcs += cost[i]; }
      if (tr === tcs) { rev[0] += 2000; tr += 2000; }
      var ans = tr - tcs;
      return { kind: 'num', q: 'A food-truck business recorded these figures:' + table(['Month', 'Revenue (' + c + ')', 'Total costs (' + c + ')'], months.map(function (m, i) { return [m, n0(rev[i]), n0(cost[i])]; })) + 'Calculate the profit or loss for the three months together. Write a loss as a negative number. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: (ans < 0 ? '−' : '') + n0(Math.abs(ans)),
        why: 'Total revenue = ' + n0(tr) + '. Total costs = ' + n0(tcs) + '. ' + n0(tr) + ' − ' + n0(tcs) + ' = ' + (ans < 0 ? '−' : '') + c + n0(Math.abs(ans)) + (ans < 0 ? ', a loss.' : ', a profit.') };
    } },
    { skill: 'profit or loss statements', gen: function () {
      var ra = rint(100, 300) * 1000, ca = ra - rint(10, 50) * 1000, rb = rint(301, 600) * 1000, cb = rb - rint(10, 50) * 1000, c = cur();
      var pa = ra - ca, pb = rb - cb;
      if (pa === pb) { ca -= 1000; pa += 1000; }
      var A = 'Café A', Bn = 'Café B', win = pa > pb ? A : Bn, lose = pa > pb ? Bn : A;
      return mcq('Two cafés report their results for a year.' + table(['', 'Revenue', 'Total costs'], [[A, c + n0(ra), c + n0(ca)], [Bn, c + n0(rb), c + n0(cb)]]) + 'Which statement is correct?',
        win + ' made the larger profit, of ' + c + n0(Math.max(pa, pb)), [lose + ' made the larger profit, of ' + c + n0(Math.min(pa, pb)), Bn + ' made the larger profit, of ' + c + n0(rb), win + ' made the larger profit, of ' + c + n0(Math.abs(pa - pb))],
        A + ': ' + n0(ra) + ' − ' + n0(ca) + ' = ' + n0(pa) + '. ' + Bn + ': ' + n0(rb) + ' − ' + n0(cb) + ' = ' + n0(pb) + '. Revenue is not profit, and higher revenue or lower costs alone do not decide which profit is larger.',
        [lose + ' made the larger profit, of ' + c + n0(Math.max(pa, pb))]);
    } },
    { skill: 'method', kind: 'mcq', q: 'A business has a gross profit of $40,000 and an operating profit of −$5,000. What does this show?',
      options: ['Its expenses were $45,000, more than its gross profit', 'Its cost of sales was more than its revenue', 'It made an operating profit of $5,000', 'Its expenses were $35,000'],
      answer: 0, why: 'Operating profit = gross profit − expenses, so 40,000 − expenses = −5,000 and expenses = $45,000. The business made an operating loss.' },
    { skill: 'profit from revenue and costs', gen: function () {
      var t = rint(150, 600), tp = rint(25, 80), venue = rint(15, 60) * 100, per = rint(8, 20), band = rint(5, 30) * 100, c = cur();
      var rev = t * tp, tc = venue + per * t + band, ans = rev - tc;
      return { kind: 'num', q: 'A charity gala sells ' + t + ' tickets at ' + c + tp + ' each. Costs are venue hire ' + c + n0(venue) + ', a band ' + c + n0(band) + ', and catering of ' + c + per + ' per guest.<br>Calculate the profit or loss from the gala. Write a loss as a negative number. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: (ans < 0 ? '−' : '') + n0(Math.abs(ans)),
        why: 'Revenue = ' + t + ' × ' + tp + ' = ' + n0(rev) + '. Costs = ' + n0(venue) + ' + ' + n0(band) + ' + (' + per + ' × ' + t + ') = ' + n0(tc) + '. Profit = ' + (ans < 0 ? '−' : '') + c + n0(Math.abs(ans)) + '.' };
    } },
    { skill: 'operating profit', gen: function () {
      var p = rint(30, 120), cos = rint(10, p - 10), q = rint(5, 40) * 100, exp = rint(20, 200) * 100, c = cur();
      var gp = (p - cos) * q, ans = gp - exp;
      return { kind: 'num', q: 'A lighting shop sells ' + n0(q) + ' desk lamps a year at ' + c + p + ' each. Each lamp costs the shop ' + c + cos + ' to buy from its supplier. The shop\'s expenses are ' + c + n0(exp) + ' a year.<br>Calculate the operating profit or loss. Write a loss as a negative number. Give your answer in ' + c + '.',
        answer: ans, unit: c, display: (ans < 0 ? '−' : '') + n0(Math.abs(ans)),
        why: 'Gross profit = (' + p + ' − ' + cos + ') × ' + n0(q) + ' = ' + n0(gp) + '. Operating profit = ' + n0(gp) + ' − ' + n0(exp) + ' = ' + (ans < 0 ? '−' : '') + c + n0(Math.abs(ans)) + '.' };
    } },
    { skill: 'gross profit', gen: function () {
      var cost = rint(20, 80), p = cost + rint(10, 60), q = rint(10, 80) * 10, c = cur();
      var ans = (p - cost) * q;
      return mcq('A shoe shop buys trainers for ' + c + cost + ' a pair and sells them for ' + c + p + ' a pair. It sells ' + n0(q) + ' pairs. What is its gross profit on the trainers?',
        c + n0(ans), [c + n0(p * q), c + n0(cost * q), c + n0(p - cost)],
        '(' + p + ' − ' + cost + ') × ' + n0(q) + ' = ' + (p - cost) + ' × ' + n0(q) + ' = ' + c + n0(ans) + '. ' + c + n0(p * q) + ' is revenue, not profit.',
        [c + n0(ans * 2)]);
    } }
  ] };
})();
