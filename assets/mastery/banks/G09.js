/* Group G09 mastery bank: Research data, segments and targeting; Product portfolio and place; Branding and public relations. Original questions, not copied from past papers. */
(function () {
  'use strict';
  var B = window.MASTERY_BANKS = window.MASTERY_BANKS || {};
  var R = window.Mastery;   // R.roundDp(x, dp), R.roundSf(x, n): correct half-up rounding

  function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffled(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // Thousands separators for whole numbers and for already-rounded decimals.
  function fmt(n) { var s = String(n).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return s.join('.'); }
  function d1(x) { return fmt(R.roundDp(x, 1).toFixed(1)); }
  function d2(x) { return fmt(R.roundDp(x, 2).toFixed(2)); }
  function pct(part, total) { return R.roundDp(part / total * 100, 2); }
  function sum(a) { return a.reduce(function (s, x) { return s + x; }, 0); }
  function table(head, rows) {
    return '<table class="mc-table"><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
  }
  function numPct(q, p, why) { return { kind: 'num', q: q, answer: p, unit: '%', tol: 0.005, display: d2(p) + '%', why: why }; }
  // Static question helpers: the correct option(s) are written first; the engine shuffles them.
  function mc(skill, q, options, why, family) { var o = { skill: skill, kind: 'mcq', q: q, options: options, answer: 0, why: why }; if (family) o.family = family; return o; }
  function ms(skill, q, right, wrong, why, family) {
    var o = { skill: skill, kind: 'multi', q: q, options: right.concat(wrong), answers: right.map(function (_, i) { return i; }), why: why };
    if (family) o.family = family; return o;
  }
  // Distinct random integers in [a, b].
  function distinct(n, a, b) { var out = []; while (out.length < n) { var x = rint(a, b); if (out.indexOf(x) < 0) out.push(x); } return out; }
  var TWO = 'Give your answer to 2 decimal places.';

  /* ---------------------------------------------------------------- BUS-CALC-09 */
  B['BUS-CALC-09'] = { title: 'One part as a percentage of a total', items: [
    { skill: 'part-of-given-total', gen: function () {
      var m = pick([['bottled water', 'Clearspring'], ['instant noodles', 'Hanami Foods'], ['sun cream', 'Solenne'], ['pet food', 'Barkwell'], ['fruit juice', 'Orchard Lane']]);
      var T = rint(1800, 6400) / 10, P = R.roundDp(T * rint(60, 340) / 1000, 1), p = pct(P, T);
      return numPct('Total sales in the ' + m[0] + ' market in one country last year were $' + d1(T) + ' million. ' + m[1] + ' had sales of $' + d1(P) + ' million.<br>Calculate the market share of ' + m[1] + '. ' + TWO, p,
        'Market share = business sales ÷ total market sales × 100 = ' + d1(P) + ' ÷ ' + d1(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'part-of-given-total', gen: function () {
      var c = pick([['Ravello Kitchens', 'built-in ovens'], ['Tessaro Sports', 'running shoes'], ['Kinbridge Toys', 'construction sets'], ['Amberlight Homeware', 'scented candles']]);
      var T = rint(120, 980) * 10000, P = Math.round(T * rint(80, 420) / 1000 / 1000) * 1000, p = pct(P, T);
      return numPct(c[0] + ' had total revenue of $' + fmt(T) + ' last year. Revenue from its ' + c[1] + ' was $' + fmt(P) + '.<br>Calculate the percentage of total revenue that came from ' + c[1] + '. ' + TWO, p,
        'Part ÷ total × 100 = ' + fmt(P) + ' ÷ ' + fmt(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'part-of-given-total', gen: function () {
      var N = rint(140, 960), d = pick(['production', 'sales', 'customer service', 'warehouse']), m = rint(Math.ceil(N * 0.08), Math.floor(N * 0.4));
      if (m * 4 === N || m * 5 === N) m += 1;
      var p = pct(m, N);
      return numPct('A furniture manufacturer employs ' + N + ' people. ' + m + ' of them work in the ' + d + ' department.<br>Calculate the percentage of the workforce in the ' + d + ' department. ' + TWO, p,
        m + ' ÷ ' + N + ' × 100 = ' + d2(p) + '%. The part (the department) goes on top and the whole workforce goes underneath.');
    } },
    { skill: 'part-of-given-total', gen: function () {
      var n = rint(180, 750), k = rint(Math.ceil(n * 0.15), Math.floor(n * 0.7)), item = pick(['a reusable coffee cup', 'a meal-kit subscription', 'an electric toothbrush', 'a smart water bottle']);
      var p = pct(k, n);
      return numPct('A business surveyed ' + n + ' people about ' + item + '. ' + k + ' said they would buy it.<br>Calculate the percentage of people surveyed who said they would buy it. ' + TWO, p,
        k + ' ÷ ' + n + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'add-up-total', gen: function () {
      var names = shuffled(['Velto', 'Marisco', 'Quill & Co', 'Northgate', 'Sabra', 'Dunmore']).slice(0, 5);
      var s = names.map(function () { return rint(120, 980) / 10; }), k = rint(0, 4), T = R.roundDp(sum(s), 1), p = pct(s[k], T);
      return numPct('The table shows annual sales of the five businesses in a country’s paint market.' +
        table(['Business', 'Sales ($ million)'], names.map(function (nm, i) { return [nm, d1(s[i])]; })) +
        'Calculate the market share of ' + names[k] + '. ' + TWO, p,
        'Total = ' + s.map(d1).join(' + ') + ' = $' + d1(T) + ' million. Market share = ' + d1(s[k]) + ' ÷ ' + d1(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'add-up-total', gen: function () {
      var cities = shuffled(['Lagos', 'Nairobi', 'Accra', 'Kampala', 'Lusaka']).slice(0, 4), c = cities.map(function () { return rint(3, 38); }), k = rint(0, 3), T = sum(c), p = pct(c[k], T);
      return numPct('Brightsmile Dental runs clinics in four cities.' + table(['City', 'Number of clinics'], cities.map(function (x, i) { return [x, c[i]]; })) +
        'Calculate the percentage of Brightsmile’s clinics that are in ' + cities[k] + '. ' + TWO, p,
        'Total clinics = ' + c.join(' + ') + ' = ' + T + '. ' + c[k] + ' ÷ ' + T + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'add-up-total', gen: function () {
      var reg = ['North region', 'Central region', 'South region'], v = reg.map(function () { return rint(140, 890) * 1000; }), k = rint(0, 2), T = sum(v), p = pct(v[k], T);
      return numPct('Coralia Ceramics sells tiles in three regions. Revenue last year was: ' + reg.map(function (r, i) { return r + ' $' + fmt(v[i]); }).join(', ') + '.<br>Calculate the percentage of Coralia’s total revenue that came from the ' + reg[k] + '. ' + TWO, p,
        'Total revenue = $' + fmt(T) + '. ' + fmt(v[k]) + ' ÷ ' + fmt(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'add-up-total', gen: function () {
      var w = rint(180, 420) * 100, r = rint(60, 180) * 100, m = rint(90, 260) * 100, o = rint(15, 70) * 100, T = w + r + m + o, p = pct(w, T);
      return numPct('A small printing business had these monthly costs.' + table(['Cost', '$'], [['Wages', fmt(w)], ['Rent', fmt(r)], ['Paper and ink', fmt(m)], ['Other costs', fmt(o)]]) +
        'Calculate wages as a percentage of total monthly costs. ' + TWO, p,
        'Total costs = ' + [w, r, m, o].map(fmt).join(' + ') + ' = $' + fmt(T) + '. ' + fmt(w) + ' ÷ ' + fmt(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'choose-the-share', gen: function () {
      var names, s, opts, T, k;
      do {
        names = shuffled(['Zenfone Retail', 'Pixelpoint', 'Callisto', 'Ringo Mobile', 'Tandem Tech']).slice(0, 4);
        s = names.map(function () { return rint(20, 150); }); T = sum(s); k = rint(0, 3);
        opts = s.map(function (x) { return d2(pct(x, T)) + '%'; });
      } while (new Set(opts).size < 4);
      return { kind: 'mcq', q: 'The table shows annual sales of the four smartphone retailers in a city.' + table(['Retailer', 'Sales ($ million)'], names.map(function (nm, i) { return [nm, s[i]]; })) + 'What is the market share of ' + names[k] + '?',
        options: opts, answer: k,
        why: 'Total = ' + s.join(' + ') + ' = $' + T + ' million. ' + s[k] + ' ÷ ' + T + ' × 100 = ' + d2(pct(s[k], T)) + '%. The other options are the shares of the other retailers.' };
    } },
    { skill: 'choose-the-share', gen: function () {
      var names = ['Hilltop Dairy', 'Creamfield', 'Pure Pasture', 'Milkway'], s, T, k, j, other, vals;
      do {
        s = names.map(function () { return rint(15, 90) * 10; }); T = sum(s); k = rint(0, 3); j = (k + rint(1, 3)) % 4; other = (k + 1 + rint(0, 2)) % 4;
        if (other === k) other = (k + 2) % 4;
        vals = [pct(s[k], T), pct(s[k], T - s[j]), pct(s[k], T - s[k]), pct(s[other], T)].map(d2);
      } while (new Set(vals).size < 4 || pct(s[k], T - s[k]) > 95);
      return { kind: 'mcq', q: 'The table shows the number of litres of yoghurt (thousands) sold by four dairies in one region last month.' + table(['Dairy', 'Litres sold (000s)'], names.map(function (nm, i) { return [nm, s[i]]; })) + 'What percentage of the total was sold by ' + names[k] + '?',
        options: vals.map(function (v) { return v + '%'; }), answer: 0,
        why: 'Add all four dairies: ' + s.join(' + ') + ' = ' + fmt(T) + '. Then ' + s[k] + ' ÷ ' + fmt(T) + ' × 100 = ' + vals[0] + '%. Wrong options come from leaving a dairy out of the total, dividing by the other dairies only, or using another dairy’s figure.' };
    } },
    { skill: 'combined-and-remaining', gen: function () {
      var T = rint(300, 900), a = rint(Math.round(T * 0.1), Math.round(T * 0.3)), b = rint(Math.round(T * 0.05), Math.round(T * 0.2)), p = pct(a + b, T);
      return numPct('Two airlines, Skyvale and Corran Air, plan to merge. Last year the domestic airline market in their country was worth $' + fmt(T) + ' million. Skyvale had sales of $' + a + ' million and Corran Air $' + b + ' million.<br>Calculate the combined market share of the merged airline. ' + TWO, p,
        'Combined sales = ' + a + ' + ' + b + ' = $' + (a + b) + ' million. ' + (a + b) + ' ÷ ' + fmt(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'combined-and-remaining', gen: function () {
      var brands = ['Glimmer', 'Fresca', 'Purely', 'Sudsy', 'Brisa'], s = brands.map(function () { return rint(40, 260) / 10; }), T = R.roundDp(sum(s), 1), own = [0, 3], ownS = R.roundDp(s[0] + s[3], 1), p = pct(ownS, T);
      return numPct('Halcyon Household owns two of the five washing-up liquid brands sold in a country: Glimmer and Sudsy.' + table(['Brand', 'Sales ($ million)'], brands.map(function (b, i) { return [b, d1(s[i])]; })) +
        'Calculate Halcyon Household’s total market share. ' + TWO, p,
        'Halcyon’s sales = ' + d1(s[own[0]]) + ' + ' + d1(s[own[1]]) + ' = $' + d1(ownS) + ' million. Market total = $' + d1(T) + ' million. ' + d1(ownS) + ' ÷ ' + d1(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'units-and-comparison', gen: function () {
      var Tm = rint(45, 190) / 10, x = Math.round(Tm * 1000 * rint(30, 220) / 1000) , p = pct(x, Tm * 1000);
      return numPct('Pellucid Optics sold glasses worth $' + fmt(x) + ' thousand last year. The total market for glasses in its country was worth $' + d1(Tm) + ' million.<br>Calculate Pellucid Optics’ market share. ' + TWO, p,
        'Put both figures in the same unit: $' + d1(Tm) + ' million = $' + fmt(R.roundDp(Tm * 1000, 0)) + ' thousand. ' + fmt(x) + ' ÷ ' + fmt(R.roundDp(Tm * 1000, 0)) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'units-and-comparison', gen: function () {
      var TA, TB, a, b, sA, sB;
      do {
        TA = rint(20, 60) * 1000; a = Math.round(TA * rint(180, 350) / 1000);
        TB = rint(110, 300) * 1000; b = Math.round(TB * rint(80, 150) / 1000);
        sA = pct(a, TA); sB = pct(b, TB);
      } while (!(b > a && sA > sB + 2));
      return { kind: 'mcq', q: 'Ferro Bikes sold ' + fmt(a) + ' bicycles in a market where ' + fmt(TA) + ' bicycles were sold in total. Rydell Cycles sold ' + fmt(b) + ' bicycles in a different market where ' + fmt(TB) + ' were sold in total.<br>Which business has the larger market share in its own market?',
        options: ['Ferro Bikes, with ' + d2(sA) + '%', 'Rydell Cycles, with ' + d2(sB) + '%', 'Rydell Cycles, because it sold more bicycles', 'Both have the same share of their markets'], answer: 0,
        why: 'Ferro: ' + fmt(a) + ' ÷ ' + fmt(TA) + ' × 100 = ' + d2(sA) + '%. Rydell: ' + fmt(b) + ' ÷ ' + fmt(TB) + ' × 100 = ' + d2(sB) + '%. Selling more units does not mean a bigger share when the markets are different sizes.' };
    } },
    { skill: 'units-and-comparison', gen: function () {
      var names = ['Lumen Hotels', 'Stayzy', 'Harbour Inns', 'Palma Suites'], s, T, i, j;
      do { s = names.map(function () { return rint(18, 120); }); T = sum(s); i = rint(0, 3); j = (i + rint(1, 3)) % 4; } while ((s[i] - s[j]) / T * 100 < 3);
      var g = R.roundDp((s[i] - s[j]) / T * 100, 2);
      return { kind: 'num', q: 'The table shows revenue for the four hotel groups in a holiday island’s market.' + table(['Hotel group', 'Revenue ($ million)'], names.map(function (n, k) { return [n, s[k]]; })) +
        'Calculate how many percentage points higher the market share of ' + names[i] + ' is than the market share of ' + names[j] + ' (subtract one share from the other). ' + TWO, answer: g, unit: 'points', tol: 0.015, display: d2(g),
        why: 'Total = $' + T + ' million. Each share is sales ÷ ' + T + ' × 100, so the gap = (' + s[i] + ' − ' + s[j] + ') ÷ ' + T + ' × 100 = ' + d2(g) + ' percentage points.' };
    } },
    { skill: 'add-up-total', gen: function () {
      var opts = ['Faster delivery', 'Lower prices', 'Wider choice', 'Better packaging'], v = opts.map(function () { return rint(24, 190); }), k = rint(0, 3), T = sum(v), p = pct(v[k], T);
      return numPct('An online grocer asked customers which one improvement they wanted most.' + table(['Improvement', 'Number of customers'], opts.map(function (o, i) { return [o, v[i]]; })) +
        'Calculate the percentage of customers who chose “' + opts[k].toLowerCase() + '”. ' + TWO, p,
        'Total customers = ' + v.join(' + ') + ' = ' + T + '. ' + v[k] + ' ÷ ' + T + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'add-up-total', gen: function () {
      var prods = ['Mango smoothie', 'Green juice', 'Berry shake', 'Iced lemon tea'], v = prods.map(function () { return rint(140, 980); }), k = rint(0, 3), T = sum(v), p = pct(v[k], T);
      return numPct('Squeeze Street, a juice bar, recorded the drinks it sold in one month.' + table(['Drink', 'Units sold'], prods.map(function (o, i) { return [o, fmt(v[i])]; })) +
        'Calculate ' + prods[k].toLowerCase() + ' sales as a percentage of all drinks sold. ' + TWO, p,
        'Total = ' + v.map(fmt).join(' + ') + ' = ' + fmt(T) + '. ' + fmt(v[k]) + ' ÷ ' + fmt(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'method-choice', gen: function () {
      var T = rint(40, 95) * 10, P = rint(Math.round(T * 0.12), Math.round(T * 0.4));
      return { kind: 'mcq', q: 'The total market for school uniforms in a city is worth $' + T + ' million. Tailorwise has sales of $' + P + ' million. Which calculation gives Tailorwise’s market share?',
        options: [P + ' ÷ ' + T + ' × 100', T + ' ÷ ' + P + ' × 100', P + ' ÷ ' + (T - P) + ' × 100', '(' + T + ' − ' + P + ') ÷ ' + T + ' × 100'], answer: 0,
        why: 'Market share = the business’s sales ÷ total market sales × 100, so ' + P + ' ÷ ' + T + ' × 100 = ' + d2(pct(P, T)) + '%. Dividing by ' + (T - P) + ' leaves Tailorwise out of the total; (' + T + ' − ' + P + ') gives everyone else’s share.' };
    } },
    { skill: 'find-the-part', gen: function () {
      var T = rint(300, 900) * 1000, a = Math.round(T * rint(25, 45) / 100 / 1000) * 1000, b = Math.round(T * rint(20, 35) / 100 / 1000) * 1000, c = T - a - b, p = pct(c, T);
      return numPct('Westholm Garden Centre had total revenue of $' + fmt(T) + '. Plants earned $' + fmt(a) + ' and garden furniture earned $' + fmt(b) + '. All the remaining revenue came from its café.<br>Calculate the percentage of total revenue that came from the café. ' + TWO, p,
        'Café revenue = ' + fmt(T) + ' − ' + fmt(a) + ' − ' + fmt(b) + ' = $' + fmt(c) + '. ' + fmt(c) + ' ÷ ' + fmt(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    { skill: 'part-of-given-total', gen: function () {
      var T = rint(2400, 9800), k = rint(Math.round(T * 0.2), Math.round(T * 0.75)), p = pct(k, T);
      return numPct('Basilio’s Pizza received ' + fmt(T) + ' orders last month. ' + fmt(k) + ' of these were placed through its app; the rest were made by phone or in person.<br>Calculate the percentage of orders placed through the app. ' + TWO, p,
        fmt(k) + ' ÷ ' + fmt(T) + ' × 100 = ' + d2(p) + '%. The total is all orders, not only the phone and in-person ones.');
    } },
    { skill: 'add-up-total', gen: function () {
      var f = rint(30, 160), pt = rint(12, 120), T = f + pt, p = pct(pt, T);
      return numPct('A cinema chain employs ' + f + ' full-time staff and ' + pt + ' part-time staff.<br>Calculate part-time staff as a percentage of all staff. ' + TWO, p,
        'Total staff = ' + f + ' + ' + pt + ' = ' + T + '. ' + pt + ' ÷ ' + T + ' × 100 = ' + d2(p) + '%. Dividing by ' + f + ' instead would compare part-time with full-time staff, not with the total.');
    } },
    { skill: 'find-the-part', gen: function () {
      var T = rint(400, 1200) / 10, s = [rint(200, 320), rint(120, 200), rint(80, 150)].map(function (x) { return R.roundDp(T * x / 1000, 1); }), o = R.roundDp(T - sum(s), 1), p = pct(o, T);
      return numPct('The market for flour in one country is worth $' + d1(T) + ' million a year. Three large millers have sales of $' + s.map(d1).join(' million, $') + ' million. All other sales are made by small local mills.<br>Calculate the market share of the small local mills taken together. ' + TWO, p,
        'Local mills = ' + d1(T) + ' − ' + s.map(d1).join(' − ') + ' = $' + d1(o) + ' million. ' + d1(o) + ' ÷ ' + d1(T) + ' × 100 = ' + d2(p) + '%.');
    } },
    mc('method-choice', 'Which statement best describes market share?', [
      'One business’s sales as a percentage of the total sales in its market',
      'The total value of sales made by all the businesses in a market',
      'The increase in a business’s sales compared with the previous year',
      'The percentage of a business’s revenue that is left as profit'],
      'Market share compares one business with the whole market: its sales ÷ total market sales × 100. The other options describe market size, sales growth and a profit margin.'),
    mc('method-choice', 'A table lists the sales of every business in a market but does not show the total. What should you do first to find one business’s market share?', [
      'Add the sales of all the businesses to find the total',
      'Divide the largest business’s sales by the smallest',
      'Take the named business’s sales away from the largest',
      'Multiply the named business’s sales by 100 and stop'],
      'The share needs the whole market underneath the fraction, so add every business first, then divide the named business’s sales by that total and multiply by 100.'),
    mc('method-choice', 'A business’s sales are given in $ thousands and the market total in $ millions. What must be done before calculating its market share?', [
      'Convert both figures into the same unit',
      'Divide the market total by 100 first',
      'Ignore the units because they cancel out',
      'Round both figures to the nearest whole number'],
      'Part and total must be in the same unit, for example $2.5 million = $2,500 thousand, otherwise the answer is 1,000 times too large or too small.')
  ] };

  /* ---------------------------------------------------------------- BUS-S4-11 */
  B['BUS-S4-11'] = { title: 'Market segmentation and targeting', items: [
    mc('meaning', 'Which statement best describes market segmentation?', [
      'Dividing a market into groups of customers with similar characteristics',
      'Collecting customers’ opinions through surveys, interviews and focus groups',
      'Selling one standard product to every customer in the whole market',
      'Deciding the shops and websites through which a product will be sold'],
      'Segmentation splits the market into groups with similar features. Surveys are market research, one product for everyone is mass marketing, and choosing outlets is place.'),
    mc('meaning', 'What does the term demographics mean?', [
      'The characteristics of a population, such as age, gender and family type',
      'The number of businesses that compete with each other in one market or industry',
      'The opinions customers give about a product’s quality and value',
      'The share of total market sales made by the largest business'],
      'Demographics describe who the people in a population are, for example their age, gender or family type. It says nothing about competitors or opinions.'),
    mc('meaning', 'In marketing, what does targeting mean?', [
      'Choosing which segment or segments to aim products and promotion at',
      'Splitting customers into groups by age, income, lifestyle or location',
      'Setting a price that is lower than the prices of competitors',
      'Asking a sample of customers what they think of a product'],
      'Segmentation divides the market into groups; targeting is the next step, choosing which of those groups to serve with a suitable product, price and promotion.'),
    mc('meaning', 'Which of these is the best description of a market segment?', [
      'A group of customers within a market who have similar needs or features',
      'The percentage of a market’s total sales made by one business',
      'One stage in the life of a product, such as growth or decline',
      'An area of a shop or website where a business displays one type of product'],
      'A segment is a group of similar customers, for example retired people or students. Market share and life-cycle stages are different ideas.'),
    mc('identify-basis', 'Trailhead Travel sells hiking and climbing trips to people who love outdoor adventure, and calm spa breaks to people who want to relax. Which basis of segmentation is it using?', [
      'Lifestyle', 'Location', 'Income', 'Age'],
      'The groups are based on how people like to spend their time and what interests them, which is lifestyle, not where they live, what they earn or how old they are.'),
    mc('identify-basis', 'Doughbright Bakeries sells spicier breads in its northern stores and sweeter breads in its southern stores, matching regional tastes. Which basis of segmentation is it using?', [
      'Location', 'Lifestyle', 'Income', 'Age'],
      'Customers are grouped by where they live, and each region gets products suited to local tastes. This is segmentation by location.'),
    mc('identify-basis', 'Motoria sells a basic small car for under $15,000 and a luxury saloon for over $60,000, advertised in different places. Which basis of segmentation is this mainly using?', [
      'Income', 'Location', 'Lifestyle', 'Age'],
      'The two models are priced for buyers with very different amounts to spend, so the main basis is income.'),
    mc('identify-basis', 'Tumbletots designs soft rattles for babies and strategy board games for 10 to 14-year-olds. Which basis of segmentation is it using?', [
      'Age', 'Income', 'Location', 'Lifestyle'],
      'The products are designed for children at different ages and stages, so the market is segmented by age.'),
    mc('identify-basis', 'Stridewell designs separate running-shoe ranges for women and for men, with different fits and colours. Which basis of segmentation is this?', [
      'Demographics', 'Lifestyle', 'Location', 'Income'],
      'Gender is a demographic characteristic of the population, so splitting customers into women and men is demographic segmentation.'),
    ms('identify-basis', 'Which of these are examples of segmenting a market by lifestyle?', [
      'Plant-based ready meals for people who avoid animal products',
      'Lightweight tents for people who go camping at weekends'], [
      'A cheaper phone contract for customers on low incomes',
      'Heavy winter coats stocked only in shops in cold northern towns',
      'Large-button mobile phones promoted to people over 70'],
      'Lifestyle is about habits, values and interests, such as diet choices or hobbies. The other options segment by income, location and age.'),
    mc('applied-reason', 'Lumo Lighting sells a budget range of lamps through supermarkets and a designer range in its own showroom. Which reason for segmenting by income is applied to Lumo?', [
      'It can charge wealthier buyers more for designer lamps and still sell budget lamps to others',
      'Segmentation helps any business to understand its customers better and meet their needs',
      'It can close its showroom and sell every lamp through supermarkets to cut its fixed costs such as rent',
      'It can make sure every customer pays exactly the same price for each lamp it sells'],
      'An applied answer uses Lumo’s own facts: two lamp ranges, two outlets and two income groups. The generic option is true for any business, so it would not earn the application mark.'),
    mc('applied-reason', 'Pulse Point is a gym in a city with many offices and a large university. Which decision shows Pulse Point targeting a segment?', [
      'Offering cheaper daytime memberships to students, who are free when office workers are at work',
      'Charging every member the same monthly fee whatever time they use the gym',
      'Asking members to fill in a questionnaire about the gym’s changing rooms',
      'Paying for national television adverts that reach people of every age all over the country'],
      'Targeting means fitting the offer to a chosen group. Students have lower incomes and free daytime hours, so a cheaper off-peak deal suits them. A questionnaire is research, not targeting.'),
    mc('applied-reason', 'Ridgeway Pet Foods finds that owners of older dogs want softer, lower-calorie food. Which action is an example of targeting this segment?', [
      'Launching a soft “senior dog” recipe and promoting it in vets’ surgeries',
      'Selling the same dog food recipe to every dog owner in the country at one price',
      'Cutting the price of all its products by 10% for one month',
      'Measuring how much of the dog-food market Ridgeway controls'],
      'Ridgeway has found a group with shared needs and designs a product and promotion for them. This fits the product to the segment, which should raise sales to those owners.'),
    mc('applied-reason', 'Coral Scoops makes ice cream in a seaside town. Why might it segment its market by location?', [
      'Beach tourists and town-centre residents want different flavours and pack sizes, so each outlet can stock what sells there',
      'Segmenting by location shows Coral Scoops which rival ice-cream makers sell in the town',
      'It can then make one standard flavour and pack size for both of its outlets',
      'Every customer has the same needs wherever they buy ice cream, so location makes no difference'],
      'Location matters because the two groups in different places buy differently. Stocking each outlet to suit its customers should raise sales and reduce waste.'),
    mc('benefit-chain', 'Which answer gives the best-developed explanation of one benefit of market segmentation?', [
      'Customers in a segment have similar needs, so the business can design a product they value, leading to more sales and repeat buying',
      'Market segmentation is when a business divides its whole market into groups, for example by age, income, lifestyle or location',
      'Segmentation gives a business more sales, more profit, more loyal customers and a higher market share',
      'Segmentation is a good idea because all customers are different from each other in many ways'],
      'A developed explanation names a benefit and then links it step by step to a result. The others give only a definition, a list without links, or a bare assertion.'),
    ms('benefit-chain', 'A hotel segments its market by income and offers both standard rooms and luxury suites. Which two statements develop this point into a chain of reasoning?', [
      'Wealthier guests will pay more for suites with extra space and services',
      'so the hotel earns more revenue per room from that group'], [
      'Income data can be found in published government statistics',
      'Hotels are businesses that operate in the tertiary sector',
      'All guests want exactly the same type of room and service'],
      'The chain goes: income segment → a product they value and will pay more for → higher revenue. The other statements are true or false facts that do not develop the point.'),
    mc('benefit-chain', 'A cycle shop targets commuters. Its chain of reasoning is: “Commuters need a bike that fits on a train → ______ → sales of folding bikes rise.” Which step is missing?', [
      'It stocks folding bikes and promotes them near the railway station',
      'It segments its market by dividing customers into several groups',
      'It sells bikes to every age group through a large national retail chain',
      'It carries out secondary research using government statistics'],
      'The missing step links the segment’s need to a targeted product and promotion. Only that step explains why sales of folding bikes would rise.'),
    mc('benefit-chain', 'Why can targeting a segment help a business avoid wasting money on promotion?', [
      'Promotion is aimed at people likely to buy, so each dollar spent brings more sales',
      'Adverts can then be shown to the whole market more often for the same budget',
      'Targeting lets the business pay lower prices to its suppliers',
      'Targeting means the business can carry out less market research'],
      'If adverts reach only people who are interested, fewer are wasted on people who will never buy, so promotion is more cost-effective.'),
    mc('evaluate', 'Which is the main drawback of a business trying to serve several different segments?', [
      'It may need different product versions and campaigns, which raises costs',
      'Customers within each segment have similar needs, so they are easier to satisfy',
      'It has to charge the same price to every segment it serves',
      'Its total market shrinks to the size of a single niche market'],
      'Each segment may need its own product, price and promotion. Running several mixes costs more, which must be weighed against the extra sales.'),
    mc('evaluate', 'Kaya Cosmetics targets only women aged 18 to 25. Which is the strongest argument against the claim that this targeting guarantees success?', [
      'Other groups are ignored, so sales may suffer if this segment shrinks or rivals target it',
      'Young women buy cosmetics often, so Kaya’s chosen segment is a large one',
      'Targeting one age group costs more in promotion than mass marketing does',
      'Choosing an age group is market research, so it does not affect Kaya’s sales'],
      'A balanced judgement notes the risk of depending on one group: older customers and men are not served, and competition in the chosen segment could cut Kaya’s sales.'),
    mc('evaluate', 'A bookshop is deciding whether to segment its customers by age. What does the benefit most depend on?', [
      'Whether readers of different ages want clearly different books and can be reached separately',
      'Whether the owner of the bookshop is younger or older than most of the customers who visit the shop',
      'The interest rate the bookshop pays on its bank loan for new shelves',
      'Whether the bookshop already has a logo on its shop sign and bags'],
      'Segmentation is worthwhile only if the groups really differ in what they want and the business can serve each group in a different way.'),
    mc('evaluate', 'A student evaluates segmentation for a sportswear business by writing: “Segmentation is always the best choice for every business.” What is the main weakness?', [
      'It is one-sided and not applied to this business’s customers or costs',
      'It should have started by defining the word demographics in full first',
      'It uses too many business terms for a short written answer',
      'It should have concluded that segmentation is never useful'],
      'Evaluation needs both sides and a judgement for the named business, for example weighing better-fitted products against the cost of running several marketing mixes.'),
    mc('evaluate', 'Which activity is market segmentation rather than market research?', [
      'Grouping a café’s customers into students, office workers and families',
      'Sending a questionnaire about opening hours to 200 of the café’s regular customers',
      'Reading government statistics on the population of the town',
      'Holding a focus group to test ideas for a new breakfast menu'],
      'Questionnaires, statistics and focus groups collect information (research). Sorting customers into groups with similar features is segmentation.'),
    mc('evaluate', 'Which statement describes segmentation rather than niche marketing?', [
      'Splitting the whole market into several groups, each of which could be targeted',
      'Making one specialised product for a single small group of customers with special needs',
      'Selling one standard product to as many customers as possible',
      'Measuring one business’s sales as a percentage of the market'],
      'Segmentation is the process of dividing the market into groups. Niche marketing is choosing one small, specialised group; mass marketing ignores segments.')
  ] };

  /* ---------------------------------------------------------------- BUS-S4-24 */
  B['BUS-S4-24'] = { title: 'Mass marketing and niche marketing', items: [
    mc('meaning', 'What is niche marketing?', [
      'Targeting a small, specialised segment of a market with a product made for it',
      'Selling the same product across the whole market to as many people as possible',
      'Calculating one business’s sales as a percentage of all sales in a market',
      'Studying the size, trends and competitors of a market before entering it'],
      'Niche marketing aims at a small specialised group. The other options describe mass marketing, market share and market analysis.'),
    mc('meaning', 'What is mass marketing?', [
      'Selling the same product to the whole market, aiming at as many customers as possible',
      'Spending a very large budget on television advertising for a product so that it becomes well known',
      'Making a specialised product for a small group with particular needs',
      'Selling products only through the business’s own website and app'],
      'Mass marketing is about reaching the whole market with one product. Big advertising budgets often go with it, but “lots of advertising” is not the meaning.'),
    mc('meaning', 'Which pair is correctly matched?', [
      'Niche: a small specialised segment. Mass: the whole market',
      'Niche: the whole market. Mass: a small specialised segment',
      'Niche: a measure of market share. Mass: a market analysis',
      'Niche: no advertising at all. Mass: only online advertising'],
      'Niche marketing serves one small specialised segment; mass marketing aims at the whole market. Swapping these is the most common error.'),
    mc('classify', 'Which business is using niche marketing?', [
      'A workshop making handmade left-handed guitars for professional players',
      'A firm selling a standard white toothpaste in every supermarket',
      'A soft-drinks company selling one cola recipe in many countries',
      'A bakery supplying plain sliced loaves to grocers and supermarkets across the country'],
      'Left-handed professional guitarists are a small group with special needs, so this is niche. The others sell a standard product to almost everyone.'),
    mc('classify', 'Which business is using mass marketing?', [
      'A detergent sold in every supermarket and advertised on national television',
      'A bakery making cakes only for people who cannot eat gluten',
      'A tailor who makes suits only for men over two metres tall',
      'A company running cookery holidays for professional vegan chefs who want to learn new skills'],
      'One standard detergent aimed at all households and sold everywhere is mass marketing. The others serve small, specialised groups.'),
    ms('classify', 'Which of these products are aimed at a niche market?', [
      'Saddles designed for competitive show-jumping riders',
      'Large-print puzzle books for people with poor eyesight'], [
      'Standard AA batteries sold in every corner shop',
      'A plain cheese pizza from a national fast-food chain',
      'White printer paper sold to offices and homes'],
      'Show-jumpers and people with poor eyesight are small groups with specialised needs. Batteries, pizza and printer paper are standard products for almost everyone.'),
    mc('mass-benefits', 'Which is an advantage of mass marketing?', [
      'High sales volumes can bring economies of scale, lowering the average cost of each unit',
      'There are few competitors, so the business can usually charge a premium price',
      'Customers are very loyal because the product is made for their particular, specialised needs',
      'Promotion is cheap because the business only needs to reach a small group'],
      'Selling to the whole market means producing on a large scale, which can lower unit costs. Few rivals, premium prices and specialised loyalty are niche advantages.'),
    mc('mass-benefits', 'Which gives the best-developed explanation of an advantage of mass marketing?', [
      'Aiming at the whole market gives many potential buyers, so sales volume is high, raising revenue and spreading fixed costs',
      'Mass marketing means selling the same product to the whole market rather than to one small group of customers',
      'Mass marketing gives a business more customers, more sales, more revenue and more profit than any other approach to marketing',
      'Mass marketing allows a business to charge higher prices because there are very few competitors in the market'],
      'The best answer gives a reason and links it to a result. The others are only a definition, an unlinked list, or a niche advantage.'),
    mc('mass-benefits', 'Penwell sells pens and notebooks to schoolchildren, offices and households. Why might selling to all these groups help Penwell?', [
      'If school sales drop during holidays, office and household sales continue, so its income is more stable',
      'Selling to many groups lets Penwell charge a premium price for specialised products',
      'Selling to many groups means Penwell needs a smaller promotion budget than a niche firm',
      'Selling to many groups means each customer’s particular needs are met more closely'],
      'Reaching many groups spreads risk: a fall in demand from one group can be balanced by sales to others.'),
    mc('niche-benefits', 'Which is an advantage of niche marketing?', [
      'Customers with special needs may pay a higher price, giving more profit per unit',
      'Very large sales volumes give the business large economies of scale and low unit costs',
      'The business reaches every possible customer in the whole market',
      'The business no longer needs to understand its customers’ needs'],
      'A niche product fits a group’s needs closely and has fewer rivals, so customers often accept a higher price. Economies of scale are a mass-market benefit.'),
    mc('niche-benefits', 'Crumbfree is a bakery that makes only gluten-free bread. Which chain best explains why its customers may stay loyal?', [
      'Its customers find it hard to buy safe bread elsewhere, so they return regularly, giving steady repeat sales',
      'Its bread is sold in every supermarket, so customers see it more often than rival brands of ordinary bread',
      'Its small output gives it lower unit costs than large bakeries, so its prices are lowest',
      'It targets the whole market, so every shopper in the country is a possible customer'],
      'In a niche, few rivals meet the group’s need, so satisfied customers keep coming back. This loyalty gives steadier sales.'),
    ms('niche-benefits', 'Tidewell makes thick wetsuits for people who surf in very cold water. Which two are benefits to Tidewell of niche marketing?', [
      'Surfers may trust a specialist brand and stay loyal to it',
      'With fewer rivals, Tidewell may be able to charge a higher price'], [
      'Tidewell will gain large economies of scale from huge sales',
      'Tidewell will sell to every swimmer in the country',
      'Tidewell’s sales will never fall, whatever happens to surfing'],
      'Specialist products bring loyalty and room for higher prices. Huge volumes and whole-market reach belong to mass marketing, and no business is safe from falling demand.'),
    mc('drawbacks', 'Which is a disadvantage of niche marketing?', [
      'The market is small, so total sales are limited and depend on one group',
      'It needs very large national advertising budgets to reach customers',
      'Prices must always be lower than those charged by mass-market rivals selling similar goods',
      'Customers in the niche have needs that are far too varied to meet'],
      'A niche is by definition small, so the business has a limited number of customers and is exposed if that group’s demand falls.'),
    mc('drawbacks', 'Which is a disadvantage of mass marketing?', [
      'It faces many competitors and usually needs a large promotion budget',
      'Total sales are limited because it serves only one small group',
      'Its output is usually too low to gain economies of scale',
      'It depends on one group staying loyal to a specialist product'],
      'In a mass market many businesses compete for the same customers, so a business must spend heavily on promotion to stand out.'),
    mc('drawbacks', 'Tidewell sells nearly all its wetsuits to cold-water surfers. What is the most likely effect if cold-water surfing becomes less popular?', [
      'Tidewell’s sales would fall sharply because nearly all its customers come from one small group',
      'Tidewell’s sales would rise because it could raise its prices further',
      'Tidewell would not be affected because niche businesses have no competitors at all in their markets',
      'Tidewell would gain economies of scale as its output fell'],
      'Depending on one small segment is the main risk of niche marketing: if that group shrinks, there are few other customers to replace the lost sales.'),
    mc('applied', 'Marlo Foods sells plain white rice in one standard 5 kg bag through almost every supermarket in its country. Which approach is Marlo using, and why?', [
      'Mass marketing, because one standard product is sold to almost all households',
      'Niche marketing, because rice is a food product that people eat every day',
      'Niche marketing, because it sells its rice in only one size of bag',
      'Mass marketing, because it carries out market research before launching products'],
      'The test is who the product is aimed at. One standard bag for nearly every household is mass marketing; a single pack size does not make it niche.'),
    mc('applied', 'A niche maker of specialist hiking boots is considering moving into the mass market. What does the decision depend on most?', [
      'Whether it can produce at a large enough scale and low enough cost to compete with established rivals',
      'Whether its logo is easier to recognise than the logos of other specialist boot makers in the market',
      'Whether it can also sell its boots through its own website',
      'Whether its current customers would like the boots in more colours'],
      'Mass markets need high volumes, low unit costs and big promotion budgets. If the firm cannot match rivals on cost, the move could fail.'),
    mc('applied', 'A student writes: “Mass marketing means the business does lots of advertising.” What is wrong with this answer?', [
      'It misses the key idea of aiming one product at the whole market',
      'It should say mass marketing means targeting a small, specialised segment of customers',
      'It should say mass marketing uses no advertising at all',
      'It confuses mass marketing with market share'],
      'Mass marketing is defined by its target, the whole market. Heavy advertising often goes with it, but on its own that is not the meaning.'),
    mc('applied', 'Which of these is NOT usually an advantage of niche marketing?', [
      'Lower average costs from very large-scale production',
      'The chance to charge a higher price',
      'Strong loyalty from customers whose special needs are well met',
      'Facing fewer direct competitors'],
      'Niche markets are small, so output is usually too low for big economies of scale. Higher prices, loyalty and fewer rivals are typical niche benefits.'),
    mc('applied', 'A new business with a small budget is choosing between mass and niche marketing. Which conclusion is best justified?', [
      'Niche, because it can win on specialism without the huge promotion budget a whole market needs',
      'Mass, because the whole market gives it the largest number of possible customers',
      'Mass, because a new business can match large rivals’ low unit costs from the start',
      'Niche, because niche products can be sold at lower prices than mass-market rivals'],
      'With a small budget it cannot match the costs and promotion of big mass-market firms, so the whole market’s size does not help it. It can win loyal customers by meeting a specialised need well, usually at a higher price, not a lower one.'),
    ms('applied', 'Which two statements develop the point “A niche business can charge higher prices” into a chain of reasoning?', [
      'Its product is designed for a need that standard products do not meet well',
      'so customers value it more and accept a premium, raising profit per sale'], [
      'Niche marketing means targeting a small segment of a market',
      'Mass-market products are usually sold through supermarkets',
      'Its average costs will be lower than those of a mass marketer'],
      'The chain is: specialised product → customers value it more → higher price and profit per sale. A definition does not develop the point, and niche firms usually have higher unit costs.'),
    mc('applied', 'Grainfield, a mass-market cereal maker, launches a high-protein cereal aimed only at serious athletes. What is Grainfield doing?', [
      'Adding a niche product to target a small, specialised segment',
      'Giving up mass marketing for all its existing cereals',
      'Increasing its market share by selling one standard cereal to the whole market',
      'Moving its cereals from retailers to selling only online'],
      'A large business can keep mass-market products and also launch a niche product for a specialised group, spreading its risk across both.')
  ] };

  /* ---------------------------------------------------------------- BUS-S4-03 */
  B['BUS-S4-03'] = { title: 'Market research data: types and reliability', items: [
    mc('classify-data', 'Which of these is quantitative data?', [
      '72% of customers said they would pay $4 for a large smoothie',
      'Customers said the smoothie tasted “too sweet and artificial”',
      'Shoppers explained that they trust local brands more than imports',
      'A focus group felt the packaging looked old-fashioned and dull'],
      'Quantitative data is in the form of numbers, such as a percentage or a price. The other options are opinions, feelings and reasons, which are qualitative.'),
    mc('classify-data', 'Which of these is qualitative data?', [
      'Comments from diners explaining why they prefer the new menu',
      'The number of diners who visited the restaurant each evening',
      'The average amount each diner spent on a main course',
      'The percentage of diners who ordered a dessert last month'],
      'Qualitative data is about opinions, attitudes and reasons, such as why diners prefer something. Counts, averages and percentages are quantitative.'),
    ms('classify-data', 'Which of these are examples of quantitative data?', [
      'The number of visitors to a website each day',
      'The average price customers would pay for a concert ticket'], [
      'Comments explaining why customers stopped using a service',
      'How shoppers say they feel about a new logo',
      'Reasons given in interviews for choosing a rival brand'],
      'Numbers of visitors and average prices are numerical, so they are quantitative. Comments, feelings and reasons are qualitative.'),
    mc('classify-data', 'A leisure centre asks: “How many times did you visit us last month?” What type of data will this produce?', [
      'Quantitative, because the answers are numbers',
      'Qualitative, because the answers come from customers',
      'Qualitative, because it is a question in a survey',
      'Quantitative, because the survey was carried out online'],
      'The type depends on the form of the answer, not on who gives it or how it is collected. Answers such as 3 or 8 visits are numbers, so the data is quantitative.'),
    mc('classify-data', 'A bus company asks passengers: “Why do you choose our buses instead of the train?” What type of data will this produce?', [
      'Qualitative, because passengers give reasons and opinions',
      'Quantitative, because many passengers will answer it',
      'Quantitative, because it can be asked in a survey',
      'Qualitative, because it is collected by the business itself'],
      'A “why” question produces reasons and opinions, which is qualitative data. The number of people asked does not change the type of data.'),
    mc('meaning', 'Which is the best definition of quantitative data?', [
      'Information in the form of numbers that can be counted or measured',
      'Information about customers’ opinions, feelings and reasons',
      'Information that has already been collected by someone else for another purpose',
      'Information gathered only from a business’s own customers'],
      'Quantitative data is numerical. Opinions are qualitative, and data collected by someone else is secondary, which is a different idea.'),
    mc('meaning', 'Which is the best definition of qualitative data?', [
      'Information about people’s opinions, attitudes and reasons',
      'Information expressed as figures such as totals and percentages',
      'Information collected from a large sample of customers',
      'Information that is accurate and can be fully trusted'],
      'Qualitative data tells a business what people think and why. It is not defined by the size of the sample or by how reliable it is.'),
    mc('meaning', 'Which is an advantage of quantitative data compared with qualitative data?', [
      'It is easy to compare and to show in charts and tables',
      'It explains in depth why customers feel the way they do',
      'It needs no sample, so it is quicker to collect',
      'It is more reliable because numbers cannot be biased'],
      'Numbers can be totalled, compared and graphed quickly. Explaining why people feel as they do is the strength of qualitative data, and any data can be biased.'),
    mc('meaning', 'Which is an advantage of qualitative data compared with quantitative data?', [
      'It gives deeper insight into the reasons behind customers’ choices',
      'It is quicker to turn into graphs, averages and percentages for a report',
      'It usually comes from larger samples than numerical surveys',
      'It uses only numbers, so it is completely objective'],
      'Qualitative data reveals why people behave as they do, which helps a business decide what to change. It is harder to summarise in numbers.'),
    mc('social-media', 'Which is a benefit to a business of using social media to collect market research data?', [
      'Polls and comments can gather the views of many people quickly and cheaply',
      'Responses come only from people who already buy from the business',
      'It lets the business advertise its products to millions of people',
      'The results are free from bias because people answer anonymously'],
      'Social media lets a business ask large numbers of people at low cost and see results fast. Advertising is promotion, not collecting research data.'),
    ms('social-media', 'Which of these are ways of using social media to collect market research data?', [
      'Running a poll asking followers to vote for a new flavour',
      'Reading comments under a post to see what people think of a new product'], [
      'Paying an influencer to show the product to followers',
      'Posting a discount code for followers to use online',
      'Sharing a funny video so it spreads to new viewers'],
      'Polls and comments gather people’s views, so they produce research data. Influencers, discount codes and viral videos are ways of promoting the product.'),
    mc('social-media', 'What is a limitation of market research data collected through social media?', [
      'Followers may not represent all customers, so the results may be biased',
      'Social media can only ever collect numerical data, not opinions',
      'It is usually slower than posting printed questionnaires to homes and waiting for replies',
      'Only very large businesses are allowed to collect data this way'],
      'People who follow or comment are a self-selected group, often younger or more enthusiastic, so their views may not match the whole market.'),
    mc('social-media', 'Crunchley, a crisp maker, posts a poll asking followers to choose its next flavour, and 8,000 people vote. Which chain best explains the benefit to Crunchley?', [
      'It quickly sees which flavour is most popular, so it can launch the one most likely to sell and reduce the risk of failure',
      'It can show the poll to millions of people, so the new flavour becomes famous across the country before it is launched',
      'It no longer needs to test the flavour, because social media data is always completely accurate',
      'It can sell the crisps directly through the poll, so it saves the cost of using retailers'],
      'The research benefit is better information for a decision: knowing which flavour people prefer lowers the risk of launching one that will not sell.'),
    mc('reliability', 'What does it mean to say market research data is reliable?', [
      'It is accurate and trustworthy, giving a true picture of the market',
      'It was collected by the business itself rather than by another organisation',
      'It is in the form of numbers rather than opinions',
      'It agrees with what the managers already expected'],
      'Reliable data can be trusted to reflect the market. Data can be numerical or collected first-hand and still be unreliable, for example if the sample is tiny or biased.'),
    ms('reliability', 'Which of these would make market research data less reliable?', [
      'Asking only 12 people, all of them friends of the owner',
      'Using a survey from eight years ago in a fast-changing market'], [
      'Asking a large random sample of target customers',
      'Checking survey results against actual sales records',
      'Using clear questions that do not lead to an answer'],
      'Small, biased samples and out-of-date data may not reflect today’s market. Large random samples, cross-checks and clear questions all improve reliability.'),
    mc('reliability', 'Why does the reliability of market research data matter to a business?', [
      'Decisions based on unreliable data, such as the wrong price, can waste money and lose sales',
      'Reliable data must be qualitative, so it explains customers’ reasons',
      'Reliability only matters after a product has been launched',
      'Reliability only matters for qualitative data, not for numerical data such as sales figures'],
      'Businesses use research to reduce risk. If the data is wrong, a price, product or target group could be chosen badly, costing money.'),
    mc('reliability', 'A restaurant judges a new dish using 15 online reviews. Most were written by friends of the staff. What is the main problem with this data?', [
      'The sample is small and likely to be biased, so it may not show what typical customers think',
      'Online reviews are quantitative data, so they cannot tell the restaurant anything useful',
      'The reviews are qualitative, so they must be turned into percentages before use',
      'There is no problem, because people who know the staff know the dish best'],
      'Friends of staff are likely to be positive, and 15 people is very few. Decisions based on this could mislead the restaurant about real customers’ views.'),
    mc('reliability', 'A bus company is planning a new route across a city. Which data is likely to be the most reliable guide to demand?', [
      'A survey of 1,500 randomly chosen commuters who travel along the route',
      'The opinions of the company’s five directors in a short meeting',
      'A poll on the company’s social media page that 40 people answered last week',
      'A traffic survey of the same streets carried out twelve years ago'],
      'A large, random and up-to-date sample of the people who would use the route gives the truest picture. The others are small, biased or out of date.'),
    mc('applied-use', 'Velora Vans hires out campervans. Which use of quantitative data is linked to a decision for Velora?', [
      'Data on the number of bookings each month could show when Velora needs more vans available',
      'Comments from hirers about how comfortable the beds feel could improve the vans',
      'Velora could use data to help improve its business and attract more customers in the future',
      'Velora could post photos of its vans on social media to attract new customers'],
      'A good answer names numerical data and links it to a specific decision in the case. Comments are qualitative, the generic option is not applied, and posting photos is promotion.'),
    mc('applied-use', 'Linguabridge runs evening language classes. Interviews show many students find the three-hour classes too tiring. How could Linguabridge use this qualitative data?', [
      'Offer shorter classes on more evenings, so students stay engaged and keep enrolling',
      'Count the number of students in each class to set the price for next year’s courses',
      'Advertise its classes on the radio to reach more people in the city',
      'Ignore the comments, as opinions cannot be used to make decisions'],
      'Qualitative data explains why students are unhappy, which points to a specific change. That change should help keep students and protect revenue.'),
    mc('applied-use', 'Which pair correctly links research data to a business decision?', [
      'The average price customers say they would pay → setting a price that sells well',
      'Customers’ opinions of a logo → working out the market share of the business',
      'The number of daily website visitors → choosing the colour of the packaging',
      'Reasons customers give for leaving → calculating the business’s break-even output'],
      'Price data helps set a price. In the other pairs the data does not answer the decision it is linked to.'),
    mc('applied-use', 'A student writes: “Qualitative data is data in the form of numbers, such as percentages.” What is wrong with this definition?', [
      'It describes quantitative data; qualitative data is about opinions and reasons',
      'It should say qualitative data is collected only from secondary sources such as reports',
      'It should say qualitative data is more reliable than numerical data',
      'It describes secondary data; qualitative data is collected first-hand'],
      'The two definitions have been swapped. Numbers are quantitative; opinions, attitudes and reasons are qualitative.'),
    mc('applied-use', 'A student is asked to analyse the benefits of using social media to collect research data. They write: “Social media lets the business advertise to more people.” Why does this earn little credit?', [
      'It treats social media as promotion instead of a way to collect customers’ views',
      'It should have said that social media data is always quantitative',
      'It should have said that social media is too expensive for research',
      'It should have defined the term social media before giving any benefits to the business'],
      'The question is about gathering data, such as polls and comments that show what customers think, not about advertising the product.'),
    mc('applied-use', 'How can reliable market research data reduce the risk of launching a new product?', [
      'It shows whether enough people will buy at a price that covers costs, before money is spent',
      'It means the new product will gain a larger market share than its rivals',
      'It lets the business skip testing the product before the launch',
      'It lowers the cost of making each unit of the new product'],
      'Research cannot guarantee success, but accurate data on demand and prices lets the business avoid launches that are unlikely to sell.')
  ] };

  /* ---------------------------------------------------------------- BUS-S4-05 */
  var BCG_SVG = '<svg viewBox="0 0 340 280" role="img" aria-label="Boston matrix with four quadrants labelled A to D. Vertical axis market growth, high at top. Horizontal axis market share, high on the left, low on the right.">' +
    '<rect x="70" y="20" width="250" height="210" fill="none" stroke="#303a4c" stroke-width="2"/>' +
    '<line x1="195" y1="20" x2="195" y2="230" stroke="#303a4c" stroke-width="1.5"/><line x1="70" y1="125" x2="320" y2="125" stroke="#303a4c" stroke-width="1.5"/>' +
    '<text x="132" y="80" font-size="28" text-anchor="middle" fill="#195d9b" font-weight="bold">A</text><text x="257" y="80" font-size="28" text-anchor="middle" fill="#195d9b" font-weight="bold">B</text>' +
    '<text x="132" y="185" font-size="28" text-anchor="middle" fill="#195d9b" font-weight="bold">C</text><text x="257" y="185" font-size="28" text-anchor="middle" fill="#195d9b" font-weight="bold">D</text>' +
    '<text x="132" y="250" font-size="13" text-anchor="middle" fill="#303a4c">High</text><text x="257" y="250" font-size="13" text-anchor="middle" fill="#303a4c">Low</text>' +
    '<text x="195" y="272" font-size="13" text-anchor="middle" fill="#303a4c">Market share</text>' +
    '<text x="58" y="76" font-size="13" text-anchor="end" fill="#303a4c">High</text><text x="58" y="181" font-size="13" text-anchor="end" fill="#303a4c">Low</text>' +
    '<text x="18" y="125" font-size="13" text-anchor="middle" fill="#303a4c" transform="rotate(-90 18 125)">Market growth</text></svg>';
  function bcgFig(skill, q, ans, why) {
    var opts = ['A', 'B', 'C', 'D'];
    return { skill: skill, kind: 'mcq', q: q, options: opts, answer: opts.indexOf(ans), svg: BCG_SVG, family: 'bcg-figure', why: why };
  }
  B['BUS-S4-05'] = { title: 'Boston matrix and the product portfolio', items: [
    mc('categories', 'In the Boston matrix, which combination places a product in the cash cow category?', [
      'Low market growth, high market share', 'High market growth, high market share', 'High market growth, low market share', 'Low market growth, low market share'],
      'A cash cow has a large share of a market that is no longer growing much. High/high is a star, high growth/low share is a question mark, and low/low is a dog.'),
    mc('categories', 'In the Boston matrix, which combination describes a question mark (problem child)?', [
      'High market growth, low market share', 'High market growth, high market share', 'Low market growth, high market share', 'Low market growth, low market share'],
      'A question mark is in a fast-growing market but has only a small share of it, so its future is uncertain.'),
    mc('categories', 'In the Boston matrix, which combination describes a dog?', [
      'Low market growth, low market share', 'Low market growth, high market share', 'High market growth, low market share', 'High market growth, high market share'],
      'A dog has a small share of a slow-growing market, so it usually earns little and has poor prospects.'),
    mc('categories', 'A product has a large share of a market that is growing quickly. Which category of the Boston matrix is it in?', [
      'Star', 'Cash cow', 'Question mark', 'Dog'],
      'High market share and high market growth make a star. A cash cow also has high share, but its market is growing slowly.'),
    mc('categories', 'Which two measures does the Boston matrix use to place a product?', [
      'Market growth and market share', 'Sales revenue and profit', 'Price and cost per unit', 'Age of the product and its sales'],
      'The matrix plots how fast the market is growing against how much of that market the product holds. It does not measure profit directly.'),
    ms('categories', 'Which of these terms belong to the Boston matrix?', [
      'Cash cow', 'Question mark'], [
      'Extension strategy', 'Maturity', 'Brand image'],
      'Stars, cash cows, question marks and dogs are the matrix categories. Extension strategies and maturity belong to the product life cycle, and brand image to branding.'),
    bcgFig('categories', 'The diagram shows the Boston matrix. Read the axis labels: market share is high on the left. Which quadrant contains cash cows?', 'C',
      'Cash cows have high market share (left column) and low market growth (bottom row), which is quadrant C. A is stars, B question marks and D dogs.'),
    bcgFig('categories', 'The diagram shows the Boston matrix. Read the axis labels: market share is high on the left. Which quadrant contains question marks?', 'B',
      'Question marks have high market growth (top row) but low market share (right column), which is quadrant B.'),
    { skill: 'classify-products', gen: function () {
      var names = shuffled(['Zest', 'Fizzle', 'Glow', 'Nectar', 'Breeze', 'Cove']).slice(0, 4);
      var cats = shuffled([['star', 1, 1], ['cash cow', 0, 1], ['question mark', 1, 0], ['dog', 0, 0]]);
      var rows = cats.map(function (c, i) {
        var g = c[1] ? rint(9, 22) : rint(0, 2), s = c[2] ? rint(28, 46) : rint(2, 8);
        return [names[i], g + '%', s + '%'];
      });
      var k = rint(0, 3);
      return { kind: 'mcq', q: 'The table shows four soft drinks made by Tidepool Beverages. High market growth is above 5% a year; a high market share is above 20%.' +
        table(['Drink', 'Market growth per year', 'Market share'], rows) + 'Which drink is a ' + cats[k][0] + '?',
        options: names.slice(), answer: k,
        why: names[k] + ' has market growth of ' + rows[k][1] + ' (' + (cats[k][1] ? 'high' : 'low') + ') and market share of ' + rows[k][2] + ' (' + (cats[k][2] ? 'high' : 'low') + '), which makes it a ' + cats[k][0] + '.' };
    } },
    mc('classify-products', 'Brightwash is a washing powder with 40% of a market that grows by about 1% a year. Which category is Brightwash?', [
      'Cash cow', 'Star', 'Question mark', 'Dog'],
      'A large share (40%) of a slow-growing market (1%) is a cash cow. It should bring in steady income without heavy investment.'),
    mc('classify-products', 'Voltglide has just launched an electric scooter. It has 3% of a market that is growing by 25% a year. Which category is it?', [
      'Question mark', 'Star', 'Cash cow', 'Dog'],
      'The market is growing fast but Voltglide holds only a small share, so the scooter is a question mark: it may become a star or fail.'),
    mc('decisions', 'What is the usual decision for a product in the dog category?', [
      'Consider dropping or replacing it, as it uses resources but earns little',
      'Invest heavily in it, because it will soon become a star',
      'Use its large profits to fund the business’s new products and question marks',
      'Raise its price, because customers are very loyal to it'],
      'A dog has low share in a slow market, so heavy spending is unlikely to pay back. Money is often better used elsewhere in the portfolio.'),
    mc('decisions', 'How is a cash cow usually used by a business?', [
      'Its steady profits are used to fund question marks and new products',
      'It is dropped because its market is no longer growing quickly',
      'Its price is cut sharply to win back market share from rivals in its slow-growing market',
      'Large sums are spent on it to make its market grow faster'],
      'A cash cow earns reliable income with little investment, so the cash can support products that need money to grow.'),
    mc('decisions', 'What decision does a business usually face with a question mark product?', [
      'Whether to invest to build its share or to withdraw it, as its future is uncertain',
      'Whether to use its large, steady profits to support other products in the portfolio',
      'Whether to stop all promotion because it already leads the market',
      'Whether to lower its quality because its market is in decline'],
      'A question mark is in a growing market but has a small share. With investment it might become a star; without it, it may become a dog.'),
    mc('decisions', 'Why does a business usually keep investing in a star product?', [
      'To keep its high share while the market grows, so it can become a future cash cow',
      'Because stars bring in the most spare cash of any product in the portfolio',
      'Because its market is shrinking and it needs support to survive',
      'Because its low share means it cannot survive without new funds'],
      'Stars operate in growing markets where rivals compete hard, so promotion and development are needed to protect share. When growth slows, they can become cash cows.'),
    mc('portfolio', 'What is a product portfolio?', [
      'The full range of products that a business sells',
      'The single best-selling product made by a business',
      'The list of shops that stock a business’s products',
      'The stages a product passes through from launch to decline'],
      'The portfolio is all the products a business offers. The Boston matrix is a way to review and balance that range.'),
    mc('portfolio', 'Which gives the best-developed explanation of one benefit of using the Boston matrix?', [
      'It shows if there are too many dogs and too few stars, so new products can be planned before cash cows decline, keeping income steady',
      'The Boston matrix puts products into four groups called stars, cash cows, question marks and dogs, using market growth and market share',
      'It helps a business to make better decisions, increase sales, raise profit and beat its competitors in the market',
      'It shows the exact profit each product will make next year, so the business can set prices for every product'],
      'A developed answer gives a benefit (seeing the balance of the portfolio), how it helps (planning new products) and the result (steady future income).'),
    mc('portfolio', 'What is meant by a balanced product portfolio?', [
      'Products in several categories, so cash cows can fund stars and question marks',
      'Most products are cash cows, as they bring in the steadiest income',
      'All products are at the same stage of the product life cycle',
      'Sales revenue is shared equally between all its products'],
      'Balance means having products at different positions, so income from mature products supports newer ones and the business is not exposed when one product declines.'),
    mc('portfolio', 'Ostrava Appliances finds that all its products are cash cows or dogs, with no stars or question marks. What is the main risk?', [
      'Little future growth, as nothing is ready to replace the cash cows when their markets decline',
      'Its income will be too high, so it will have to pay more tax on its profit',
      'Its products are in fast-growing markets, so competition will become very strong and prices will fall',
      'It will have too many new products and not enough cash to support them all'],
      'Cash cows and dogs are in slow-growing markets. Without stars or question marks, there is nothing to take over when today’s cash cows fade.'),
    ms('portfolio', 'Which two statements develop the point “The Boston matrix helps a business balance its portfolio” into a chain?', [
      'Cash from cash cows can be moved to promising question marks',
      'so the business has new products growing as older ones decline'], [
      'A star has high market growth and high market share',
      'The matrix was developed by a firm of consultants',
      'A dog is always the oldest product in the range'],
      'The chain shows how the matrix guides decisions (move cash to question marks) and the result (future products to replace declining ones). A definition alone does not develop the point.'),
    mc('portfolio', 'Hollow Oak Bakery sells many types of cake. Which is an applied use of the Boston matrix for Hollow Oak?', [
      'Spotting cakes that are dogs, such as a plain sponge selling little in a flat market, and stopping them',
      'Helping any business to see which of its products are stars, cash cows, question marks or dogs in its markets',
      'Deciding the opening hours of the bakery by comparing them with nearby cafés and shops',
      'Measuring how many customers visit the bakery each day to plan staff rotas'],
      'An applied use names how this business would act on its own products. The second option is true of any business, so it is not applied to Hollow Oak.'),
    mc('misconceptions', 'A student writes: “A cash cow has high market growth and high market share.” What is wrong?', [
      'That describes a star; a cash cow has low market growth and high share',
      'That describes a dog; a cash cow has high growth and low share',
      'Nothing is wrong, because cash cows are the fastest-growing products in any portfolio',
      'Cash cows are measured by profit, not by growth and share'],
      'Students often swap the star and cash cow. Both have high share, but only the star’s market is growing fast.'),
    mc('misconceptions', 'Which is a limitation of the Boston matrix?', [
      'It uses only market share and growth, so it does not show each product’s actual profit',
      'It cannot be used by a business that sells more than one product',
      'It only works for services and cannot be used for physical goods',
      'It shows the stages of the product life cycle rather than market share and market growth'],
      'A product with high share may still make little profit, and a dog might be profitable. The matrix is a guide to share and growth, not a profit statement.'),
    mc('misconceptions', 'Tidemark Foods has three products: Zestor (40% share, market growth 1%), Fizzo (4% share, market growth 18%) and Glint (3% share, market growth 0%). Which conclusion is justified?', [
      'Profits from Zestor could fund promotion to build Fizzo’s share',
      'Glint should get most investment, as its market is growing fast',
      'Zestor should be dropped because its market is growing slowly',
      'Fizzo is a star because its market is growing quickly'],
      'Zestor is a cash cow, Fizzo a question mark and Glint a dog. Using cash cow income to support a question mark is the classic portfolio decision.')
  ] };

  /* ---------------------------------------------------------------- BUS-S4-12 */
  B['BUS-S4-12'] = { title: 'Place: distribution channels and e-commerce', items: [
    mc('meaning', 'In the marketing mix, what does place refer to?', [
      'How and where customers are able to buy the product',
      'The address of the business’s head office and nothing else',
      'The price customers pay for the product',
      'The way the product is advertised to customers'],
      'Place covers the channels that get the product to customers, such as shops, other retailers, websites and apps, not just a building’s address.'),
    mc('meaning', 'What is a distribution channel?', [
      'The route a product takes from the producer to the final customer',
      'The television channel a business uses for its adverts',
      'The department of a business that manages its staff',
      'The process of turning raw materials into finished goods ready for sale'],
      'A channel might be producer → customer, or producer → retailer → customer. It describes how the product reaches the buyer.'),
    mc('meaning', 'What is an e-tailer?', [
      'A business that sells to customers online, through a website or app',
      'A shop that sells only from premises on a high street',
      'A business that buys in bulk from producers to resell in smaller amounts to shops',
      'A business that promotes its products on social media'],
      'An e-tailer is an online retailer. Promoting on social media is promotion, not a way of selling, and a bulk buyer is a wholesaler.'),
    mc('meaning', 'What does e-commerce mean?', [
      'Buying and selling goods and services using the internet, websites or apps',
      'Sending emails to customers to tell them about special offers',
      'Selling products only to customers who live in other countries through agents',
      'Paying suppliers in cash when goods are delivered to a shop'],
      'E-commerce is the trading itself, carried out online. Emailing offers is a promotion method.'),
    mc('meaning', 'What is a retailer?', [
      'A business that sells products to the final customer',
      'A business that makes products from raw materials',
      'A business that only sells to other businesses in bulk',
      'A business that transports goods between countries'],
      'Retailers, such as shops and supermarkets, are the last step in the channel: they sell to the people who use the product.'),
    mc('channels', 'Greenacre Farm sells its jams only in its own farm shop. Which distribution channel is this?', [
      'Producer → customer', 'Producer → retailer → customer', 'Producer → wholesaler → retailer → customer', 'Producer → e-tailer → customer'],
      'The farm makes the jam and sells it straight to the people who buy it, with no business in between.'),
    mc('channels', 'Morning Oats makes breakfast cereal and sells it through supermarket chains. Which distribution channel is this?', [
      'Producer → retailer → customer', 'Producer → customer', 'Producer → e-tailer → customer', 'Customer → retailer → producer'],
      'The supermarkets are retailers: they buy from Morning Oats and sell to shoppers.'),
    ms('channels', 'Which of these are examples of e-commerce?', [
      'A florist taking orders and payments through its own app',
      'A bookshop selling through its website with home delivery'], [
      'A florist putting a poster about roses in its window',
      'A bookshop posting printed leaflets to local homes',
      'A bakery opening a second shop on the high street'],
      'E-commerce means buying and selling online. Posters and leaflets are promotion, and a second shop is a physical outlet.'),
    mc('advantages', 'Why might a small food producer sell through other retailers rather than only through its own shop?', [
      'Retailers have many outlets, so the products reach far more customers than one shop could',
      'Retailers pay the producer more per item than shoppers pay in its own shop',
      'Using retailers lets the producer keep the whole selling price of each item',
      'Using retailers gives the producer more control over how products are displayed'],
      'Other retailers widen the market: more people in more places can buy, which can raise sales. The retailer does take a share of the price.'),
    mc('advantages', 'Which of these is an advantage of selling products through e-commerce?', [
      'It can reach customers anywhere at any time without paying for many shops',
      'Customers can touch and try the products in person before they decide to buy',
      'It removes all delivery costs for the business',
      'It means the business will have no competitors'],
      'Selling online opens the business to customers beyond its local area, 24 hours a day, and avoids the rent of many shops.'),
    mc('advantages', 'Which answer best explains one advantage of e-commerce?', [
      'A website is open all day and night, so customers can order when shops are shut, increasing sales and revenue',
      'E-commerce is when a business sells its goods and services to customers using a website, an online marketplace or an app',
      'E-commerce gives the business more sales, more customers, more profit and a bigger market share',
      'E-commerce is good for a business because a lot of people use the internet nowadays'],
      'The best answer gives an advantage, explains why it helps, and ends with the effect on sales. The others are a definition, a list, or an assertion without a chain.'),
    ms('advantages', 'Willowcraft makes wooden toys in a small rural village. Which two are advantages to Willowcraft of selling online?', [
      'Customers in other cities and countries can buy without visiting the village',
      'It can sell without paying rent for a shop in a town centre'], [
      'Customers can pick up and test the toys before they pay',
      'Delivery costs disappear once the toys are sold online',
      'It will no longer face any competition from other toy makers'],
      'Online selling widens Willowcraft’s reach and saves shop costs. Online buyers cannot handle the toys, delivery still costs money, and rivals also sell online.'),
    mc('concerns', 'A dental practice is thinking about launching an app for booking appointments. Which is a valid concern?', [
      'Patients may not want to download another app, so few bookings may come through it',
      'An app would mean the practice must close its surgery premises',
      'An app would make it impossible for patients to pay for their treatment at the practice',
      'An app would stop the practice from using a telephone line'],
      'A booking app costs money to build and maintain; if customers are reluctant to download it, the cost may not be covered by extra bookings.'),
    ms('concerns', 'Snip & Style, a family-run hair salon, is considering a booking app. Which two are valid concerns?', [
      'Paying a developer to build and update the app will add to costs',
      'Older regular clients may prefer to phone rather than use an app'], [
      'Clients could book at any time, even when the salon is closed',
      'The salon would have to close its existing premises',
      'More clients could see and fill the salon’s free appointment slots'],
      'The main concerns are the set-up and maintenance cost, the technical skills needed, and customers who will not use the app. Booking at any time and filling free slots are advantages of an app, not concerns.'),
    mc('concerns', 'Which is a disadvantage of e-commerce for a clothing business?', [
      'Customers cannot try clothes on first, so more items may be returned, adding costs',
      'Customers can only buy during the business’s normal opening hours on weekdays',
      'The business can only sell to people who live close to its shop',
      'The business must pay rent for many more shops in town centres'],
      'Online shoppers cannot check fit and feel, so returns tend to be higher. Handling returns and re-delivering costs money.'),
    mc('concerns', 'Village Larder delivers groceries in a rural area. Most of its customers are elderly and internet access in the area is poor. Which concern about moving to online-only ordering is most relevant?', [
      'Many customers may lack the internet access or skills to order online, so sales could fall',
      'Customers could compare its prices with those of rivals more easily',
      'Customers could place orders at night when the shop is closed',
      'Online ordering would mean the business could not employ drivers'],
      'Place must suit how the customers actually buy. If they cannot get online, moving only to e-commerce could lose most of the business’s sales.'),
    mc('applied', 'Meridian Tea sells loose tea from one shop in an old market. Many tourists ask how they can reorder after returning home. Which decision about place fits this case best?', [
      'Add an online shop so tourists can reorder from home, increasing repeat sales',
      'Move the shop to a quieter street where the rent is lower',
      'Stop selling to tourists and focus only on local residents who visit the market every week',
      'Sell tea only through the market shop to keep it exclusive'],
      'The case shows demand from customers who cannot visit again. An online channel lets them keep buying, adding sales without another shop.'),
    mc('applied', 'Meridian Tea is considering selling online. Which point is applied to Meridian’s case rather than generic?', [
      'Tourists who enjoyed its tea in the market could keep buying after they fly home',
      'E-commerce lets any business reach more customers and increase its sales and profit over time',
      'E-commerce means buying and selling using the internet, websites or apps',
      'Online selling is popular because most people now own a smartphone'],
      'An applied point uses the case facts: a market shop, tourists and requests to reorder. The other options would fit any business.'),
    mc('applied', 'Asked to analyse the advantages of e-commerce for a shoe shop, a student writes about posting adverts on social media. Why does this earn little credit?', [
      'It is about online promotion, not about selling products online',
      'It should have defined e-commerce before giving any advantages to the shop',
      'Social media cannot be used by shoe shops in any way',
      'It should have discussed the shop’s choice of logo instead'],
      'E-commerce is about where and how customers buy. Advertising online belongs to promotion, a different part of the marketing mix.'),
    mc('applied', 'Oakhurst makes large handmade sofas. It is deciding whether to sell only online. What does the decision depend on most?', [
      'Whether customers will buy large, costly items without sitting on them first',
      'Whether its logo looks modern on a computer screen',
      'Whether the business that owns its workshop is a sole trader or a partnership',
      'Whether wood prices rose last year'],
      'For expensive items that people like to try, many customers want to see them first. If they will not buy unseen, closing the showroom could cut sales.'),
    mc('applied', 'A homeware business closes its shops and becomes an e-tailer. Which change in costs is most likely?', [
      'Shop rent falls, but website, delivery and returns costs rise',
      'Shop rent rises, and website and delivery costs fall',
      'All of its costs fall, including delivery and packaging',
      'Its costs stay the same because only the distribution channel changes'],
      'Moving online removes premises costs but brings new ones: running the website, packing and delivering orders, and handling returns.'),
    mc('applied', 'A student is asked to explain one advantage of e-commerce. Which opening sentence is the best start?', [
      'Selling online lets the business reach customers far beyond its local area…',
      'E-commerce is the buying and selling of goods and services using the internet, websites or apps…',
      'There are many advantages and disadvantages of e-commerce…',
      'Place is one of the four Ps of the marketing mix…'],
      'An Explain answer earns marks for an advantage and its development, so start straight away with the advantage. A definition gains nothing in this question.'),
    mc('applied', 'Pottery maker Clayhaven sells through a large online marketplace instead of building its own website. What is the main advantage?', [
      'It reaches the marketplace’s many existing shoppers without the cost of building its own site',
      'It avoids paying any fees or commission on the items it sells through the marketplace',
      'It removes the need to pack and send the pottery to customers',
      'It guarantees Clayhaven will be the cheapest seller of pottery'],
      'A marketplace already attracts large numbers of buyers, so a small producer gains reach quickly, although it pays fees on each sale.')
  ] };

  /* ---------------------------------------------------------------- BUS-S4-09 */
  B['BUS-S4-09'] = { title: 'Branding and why it matters', items: [
    mc('meaning', 'Which is the best definition of a brand?', [
      'A name, logo, symbol or design that identifies a product and makes it different from rivals’ products',
      'Any paid advertisement for a product that is shown on television, radio or online',
      'The price a business charges compared with the prices charged by its competitors',
      'Building a good public image of the business through press releases, charity work and community events'],
      'A brand is the identity that marks out a product. Advertising is paid promotion, and managing image through press releases and charity is public relations.'),
    ms('meaning', 'Which of these are part of a product’s brand?', [
      'A distinctive logo', 'A memorable product name', 'A recognisable colour scheme on the packaging'], [
      'The rent paid for the factory', 'The interest rate on a bank loan'],
      'A brand is made up of the features that identify the product: its name, logo, colours and design. Rent and interest are costs.'),
    mc('meaning', 'Which statement correctly separates branding from advertising?', [
      'Branding gives a product its identity; advertising is paid communication to inform or persuade',
      'Branding is paid communication on television; advertising is the product’s name, logo and design',
      'Branding and advertising both mean exactly the same thing in business',
      'Branding is only used by services; advertising is only used for goods'],
      'Adverts may show the brand, but the brand itself is the name, logo and image that identify the product.'),
    mc('benefits', 'How does branding help customers in a busy supermarket?', [
      'They can recognise the product quickly among many similar ones',
      'It lowers the price of the product below that of rivals',
      'It means there are no other products of that type on sale in the supermarket',
      'It shows the exact amount of profit the product makes'],
      'A clear name, logo and packaging make the product easy to spot and remember, which helps it stand out from rival products.'),
    mc('benefits', 'Which is a benefit to a business of having a strong brand?', [
      'Customers keep choosing it, which builds loyalty and repeat sales',
      'It lowers the cost of making each unit of the product',
      'It means the business can spend less on product quality',
      'It lets the business sell to every segment with one product'],
      'Customers who trust a brand return to it, giving the business more regular sales. A brand does not cut production costs, and customers still expect good quality.'),
    mc('benefits', 'Why can a strong brand allow a business to charge a higher price?', [
      'Customers trust its quality, so they will pay more than for unknown products',
      'Customers do not notice prices when a product has a logo',
      'A business with a brand is allowed by law to set any price it likes for its products',
      'A strong brand means the product costs less to make'],
      'Trust and image add value in customers’ eyes, so they accept a premium price, which can raise profit per unit.'),
    mc('benefits', 'Why is it easier for a business with a well-known brand to launch a new product?', [
      'Customers who trust the brand are more willing to try a new product with the same name',
      'A well-known brand lowers the cost of making the new product',
      'A well-known brand means the new product needs fewer shops to stock it',
      'A well-known brand lets the new product be priced below its rivals'],
      'Existing trust carries over to the new product, so customers are more likely to try it and the launch is less risky.'),
    ms('benefits', 'Which of these are benefits of a strong brand?', [
      'It can support a higher price', 'It encourages repeat purchases'], [
      'It guarantees the business will never make a loss',
      'It removes all competitors from the market',
      'It reduces the tax the business must pay'],
      'Strong brands build loyalty and allow premium prices. They cannot remove competition, guarantee profit or change tax.'),
    mc('chains', 'Which answer best explains why branding is important to a business?', [
      'A clear logo makes the product easy to recognise, so customers pick it over unknown rivals, raising sales',
      'Branding is a name, logo or design that identifies a product and makes it different from competitors’ products',
      'Branding helps sales, profit, loyalty, image and market share for any business',
      'Branding is important because it makes the product popular with people'],
      'The best answer gives a reason, explains how customers respond, and ends with the result. The others are a definition, a list, or an unexplained claim.'),
    mc('chains', 'A chain of reasoning reads: “A drinks brand has a famous logo → ______ → its sales are higher than those of rivals.” Which step is missing?', [
      'Shoppers recognise and trust it, so they choose it over unfamiliar drinks',
      'The brand pays a lower rate of tax than rival drinks businesses in the country',
      'The logo is printed using cheaper inks than rival drinks',
      'The brand sells its drinks only in one region of the country'],
      'The missing link explains how the logo changes customer behaviour. Recognition and trust lead customers to choose the brand.'),
    ms('chains', 'Which two statements develop the point “A strong brand allows a higher price” into a chain?', [
      'Customers associate the brand with reliable quality',
      'so they accept a premium price, raising profit on each sale'], [
      'A brand is a name, logo or design',
      'Rival products are sold in different shops',
      'A brand always reduces the cost of making the product'],
      'The chain goes: trusted quality → customers pay more → higher profit per sale. A definition alone does not develop the point.'),
    mc('chains', 'A student writes: “Branding is important because it makes the product popular.” What is the main weakness?', [
      'It does not explain how branding makes people buy or what happens to sales',
      'It should have said branding is a type of public relations',
      'It should have started with a definition of a brand',
      'It should have said branding is only important for large firms with big budgets'],
      'For credit the point needs a chain, for example: customers recognise and trust the name, so they choose it again, raising repeat sales.'),
    mc('applied', 'Kinetica repairs bicycles in a town that has three other repair shops. Which reason why branding matters is applied to Kinetica?', [
      'A memorable name and logo on its vans help residents remember Kinetica rather than its three rivals',
      'Branding helps any business to stand out from competitors and to win more customers',
      'Branding lets Kinetica repair more bicycles each day with the same staff',
      'Branding means Kinetica can charge the lowest prices of the four repair shops'],
      'An applied answer uses Kinetica’s situation: a town with three competing repair shops. The generic option could be written about any business.'),
    mc('applied', 'Hivewood is a new honey producer selling at weekend markets beside several other honey stalls. Why might branding be especially important to Hivewood?', [
      'A distinctive jar and label help shoppers find Hivewood again among similar stalls',
      'Branding will let Hivewood stop paying the rent for its stall at the weekend markets',
      'Branding will mean the other honey stalls must close',
      'Branding will reduce the cost of keeping bees'],
      'When several stalls sell similar products, a clear identity helps customers remember and return to Hivewood, building repeat sales.'),
    mc('applied', 'Aldana Leather has made handbags for 40 years and its name is linked with high quality. How does the brand most help Aldana?', [
      'Customers trust the name, so Aldana can charge more than newer, unknown makers',
      'The brand means Aldana pays less for leather than other handbag makers in the country',
      'The brand lets Aldana sell more handbags at lower prices than rivals',
      'The brand means Aldana should sell through more retailers'],
      'Years of reputation have built trust in the name, allowing a premium price and loyal customers.'),
    mc('applied', 'Why can a brand become very valuable to a business over time?', [
      'Trust built over many years brings steady future sales that new rivals cannot quickly copy',
      'A brand can be sold for exactly what it cost to design the original name and logo',
      'An older brand never needs any promotion to keep its sales',
      'A brand automatically increases in value every year by law'],
      'A well-known, trusted brand keeps customers coming back. Rivals can copy a product more easily than years of reputation.'),
    mc('evaluate', 'Which is a limitation of relying on a strong brand?', [
      'Building a brand takes time and money, and bad publicity can quickly damage it',
      'A strong brand always forces the business to charge lower prices than its competitors charge',
      'A strong brand means customers will not recognise the product',
      'A strong brand stops the business from launching new products'],
      'Brands are expensive to build and fragile: one scandal or faulty product can harm trust in every product carrying the name.'),
    mc('evaluate', 'A café chain is deciding whether to spend $200,000 on a new brand name and logo. What does the decision depend on most?', [
      'Whether customers value the new identity enough to add more in sales than it costs',
      'Whether the new logo uses more colours than the old one',
      'Whether the café chain is a private limited company or a public limited company',
      'Whether the café chain’s staff like the new name'],
      'Rebranding is worthwhile only if the extra sales or higher prices it brings are greater than the cost, and loyal customers still recognise the business.'),
    mc('evaluate', 'Which activity is public relations rather than branding?', [
      'Issuing a press release about a donation to a local hospital',
      'Designing a new logo for the business’s products',
      'Choosing a short, memorable name for a new product',
      'Using the same colours on all the business’s packaging and shop signs'],
      'Branding creates the identity (name, logo, colours). A press release about a donation aims to improve public image, which is public relations.'),
    mc('evaluate', 'A student defines branding as “advertising a product on television”. What is wrong with this?', [
      'Branding is the identity that marks out a product, not a type of advertising',
      'Branding only applies to products sold online, not on television',
      'Branding is the price a business charges for its product',
      'Nothing is wrong, as branding and TV advertising are the same thing in business'],
      'A brand is the name, logo, symbol or design that identifies a product and distinguishes it from rivals. Adverts may show the brand, but they are not the brand.'),
    mc('evaluate', 'Hivewood claims a strong brand will guarantee higher sales. Which is the strongest counter-argument?', [
      'Sales also depend on quality and price; if the honey disappoints, the brand will not keep buyers',
      'Branding only helps businesses that sell through supermarkets, not market stalls',
      'A small producer cannot afford to design a label and logo',
      'A strong brand forces Hivewood to charge less than other stalls'],
      'A brand helps recognition and trust, but customers will only stay loyal if the product meets their expectations at a fair price.'),
    mc('evaluate', 'Two firms sell bottled water. One has a famous brand; the other sells unbranded bottles. Which is the most likely difference?', [
      'The branded water can sell at a higher price because customers recognise and trust it',
      'The unbranded water will have more loyal customers',
      'The branded water must be sold at a lower price to cover the cost of building the brand',
      'There will be no difference, because water is the same product'],
      'Even for similar products, a trusted brand adds value in customers’ minds, allowing a higher price and more loyal buyers.')
  ] };

  /* ---------------------------------------------------------------- BUS-S4-22 */
  B['BUS-S4-22'] = { title: 'Public relations and company image', items: [
    mc('meaning', 'What is public relations (PR)?', [
      'Building and keeping a good image of a business and its products with the public',
      'Paying for adverts on television, radio and websites',
      'Selling products directly to customers in the business’s own shops and on its website',
      'Designing a logo and name for a new product'],
      'PR is about managing how the public sees the business. Paid adverts are advertising, and a logo and name are branding.'),
    ms('meaning', 'Which of these are public relations activities?', [
      'Donating money to a local children’s hospital',
      'Sending a press release to newspapers about a new recycling scheme'], [
      'Running a buy-one-get-one-free offer',
      'Placing a paid advert in a magazine',
      'Cutting the price of its products by 10%'],
      'Donations and press releases aim to improve how people see the business. Special offers, paid adverts and price cuts are other promotion and pricing decisions.'),
    mc('meaning', 'Which of these is NOT a public relations activity?', [
      'A 20% discount on all products for one weekend',
      'Staff planting trees in the town park as volunteers',
      'Inviting journalists to see a new low-energy factory',
      'Donating unsold food to a local homeless shelter'],
      'A discount is a sales promotion aimed at selling more now. The others shape the public’s view of the business, which is PR.'),
    mc('meaning', 'What is a press release?', [
      'A written statement given to the media to share news about the business',
      'A paid advert placed on the front page of a newspaper',
      'A legal document that releases a business from a contract with a supplier',
      'A report showing the business’s profit for the year'],
      'Press releases give journalists stories about the business, aiming for favourable coverage that the business does not pay for directly.'),
    mc('benefits', 'Why can good public relations lead to higher sales?', [
      'A good image makes customers trust the business, so they are more willing to buy from it',
      'Good PR lets the business raise prices without customers noticing or buying any less',
      'Good PR removes the need for the business to have a good product',
      'Good PR means rival businesses have to stop selling'],
      'PR works through image: a respected business wins trust, and trust makes people more likely to buy.'),
    mc('benefits', 'How can good public relations help a business recruit staff?', [
      'People want to work for a respected business, so more good applicants may apply',
      'Good PR means the business does not have to pay the minimum wage to its new staff',
      'Good PR means staff do not need any training',
      'Good PR lets the business choose staff without interviews'],
      'A good reputation makes the business an attractive employer, which can improve the quality of applicants and help keep staff.'),
    mc('benefits', 'How can good public relations help a business attract investors?', [
      'Investors prefer a respected business, as its good image lowers the risk of losing sales',
      'Good PR lowers the business’s share price, so shares are cheaper to buy',
      'Good PR lowers the business’s costs, so investors’ risk falls',
      'Good PR gives investors control over how the business is run'],
      'A strong reputation suggests steady future sales and fewer scandals, making the business look a safer place to invest.'),
    mc('benefits', 'Which answer best explains why good public relations is important to a business?', [
      'Supporting local charities improves its image, so people trust it and choose it over rivals, raising sales',
      'Public relations means building and keeping a favourable image of the business with the public and the media',
      'Good PR gives more customers, more sales, more profit and more staff to any business',
      'PR is important because every business wants people to think it is good'],
      'The developed answer gives an action, how the public reacts, and the effect on sales. The others are a definition, a list, or an unexplained statement.'),
    ms('benefits', 'Which two statements develop the point “Good PR improves a business’s image” into a chain?', [
      'Customers see the business as caring and trustworthy',
      'so they are more likely to buy from it again, raising sales'], [
      'PR includes press releases and charity donations',
      'Advertising is paid communication with customers',
      'PR always costs less than advertising'],
      'The chain is: better image → customers trust the business → more repeat sales. Listing PR activities does not develop the point.'),
    mc('benefits', 'A chain of reasoning reads: “A bakery gives its unsold bread to a food bank → ______ → more local people shop there.” Which step is missing?', [
      'Local newspapers report it and people see the bakery as caring',
      'The bakery’s variable costs per loaf fall',
      'The bakery changes its logo and shop sign to a new, more modern design',
      'The bakery raises the price of its bread'],
      'The missing step explains how the action changes the public’s view, which then leads to more customers.'),
    mc('costs-risks', 'Which is a drawback of public relations activities?', [
      'They cost money and there is no guarantee they will lead to more sales',
      'They make customers think the business is less caring',
      'They can only be used by businesses that sell services rather than physical goods',
      'They stop the business using paid advertising at the same time'],
      'Money spent on donations or events reduces profit unless it brings in enough extra sales, and that is uncertain.'),
    mc('costs-risks', 'Pureflow, a juice brand, has to recall bottles after glass is found in some of them. What is the most likely effect on the business?', [
      'Customers may lose trust and switch to rival juices, cutting sales',
      'Sales are certain to rise because people are talking about the brand',
      'Nothing, as customers rarely notice product recalls',
      'Its costs will fall because it will sell fewer bottles'],
      'Bad publicity harms image and trust. Pureflow would need quick, honest PR, such as explaining what it is doing to fix the problem, to limit the damage.'),
    mc('costs-risks', 'Which of these news stories would damage a business’s image most?', [
      'Its factory is found to have dumped waste into a river',
      'It opens a new branch and creates 50 local jobs for young people',
      'It wins a national award for customer service',
      'It raises the wages of its lowest-paid staff'],
      'Harming the environment creates bad publicity that can turn customers, staff and investors away. The others are likely to improve the image.'),
    mc('costs-risks', 'After a faulty product causes bad publicity, which PR response is most likely to limit the damage?', [
      'Apologising quickly, explaining the fix and offering refunds',
      'Saying nothing and hoping customers forget about it',
      'Raising the price of the product to cover the sales lost after the news',
      'Changing the colour of the product’s packaging'],
      'An open, fast response shows the business takes the problem seriously, which helps rebuild trust.'),
    mc('evaluate', 'A manager claims: “Spending on community projects will definitely raise our profit.” Which is the strongest counter-argument?', [
      'The cost may be greater than any extra sales, and customers may not notice the projects',
      'Customers dislike businesses that give to charity, so sales will fall',
      'Community projects only help businesses that sell to other firms',
      'Customers never care how businesses behave in their local area'],
      'PR benefits are real but uncertain and hard to measure, so a balanced judgement weighs the cost against possible gains.'),
    mc('evaluate', 'A clothing business is deciding whether to fund a beach clean-up as a PR activity. What does the benefit depend on most?', [
      'Whether its customers care about the cause and hear about the clean-up',
      'Whether the clean-up costs less than a television advert',
      'Whether its own staff or a charity organises the clean-up',
      'Whether it sells mainly online or mainly in shops'],
      'PR only improves image if the public learns about the action and values it. If customers do not hear about it, the cost brings little return.'),
    mc('evaluate', 'A student evaluates PR for a car maker by listing four benefits, then concludes “PR is very important.” What is the main weakness?', [
      'It is one-sided: it ignores the cost and uncertainty of PR, so it is not balanced',
      'It should have defined public relations at the start of the answer before any benefits',
      'It should have discussed the car maker’s logo instead',
      'It should have said PR is never important for car makers'],
      'An evaluation needs the other side, such as cost and the lack of a guarantee, before a judgement applied to the business.'),
    mc('evaluate', 'Bayline Hotels spent $40,000 on beach clean-ups and publicised them. Bookings rose and revenue increased by $180,000 that year. Which conclusion is best justified?', [
      'Probably worthwhile: the revenue rise is far above the cost, though other causes may have helped',
      'Not worthwhile, because the $40,000 could have been spent on advertising instead',
      'Worthwhile, because the whole $180,000 rise in revenue is extra profit from PR',
      'It proves PR caused the rise, so Bayline should double its clean-up spending'],
      'Revenue rose by $180,000 against a cost of $40,000, so the PR looks worthwhile. But revenue is not profit (extra guests add costs), and other causes, such as better weather or a rival closing, may explain some of the rise, so it does not prove the PR caused it.'),
    mc('applied', 'Greystone Cement’s works is near a town, and residents complain about dust. Which PR action is most suitable?', [
      'Fitting dust filters and inviting the local press to see them',
      'Cutting the price of its cement by 5% for three months to win back customers',
      'Running television adverts that show its new logo',
      'Moving its head office to a different city'],
      'The PR response should tackle the cause of the poor image and let people know about it. Price cuts and logos do not address residents’ concerns.'),
    mc('applied', 'Tamarisk Tours runs safaris in a national park. It employs local guides and funds wildlife protection. Which point applies these PR actions to Tamarisk?', [
      'Visitors who care about wildlife may choose Tamarisk over rivals because it protects the park they come to see',
      'Good public relations helps any business to improve its image and increase its sales and profit over the long term',
      'Public relations means building a favourable image of a business and its products',
      'Tamarisk could reduce its prices to attract more visitors from abroad'],
      'An applied point links Tamarisk’s own actions to its own customers. The generic and definition options could be written without reading the case.'),
    mc('distinguish', 'Which statement correctly separates PR from advertising?', [
      'PR aims for favourable publicity, often unpaid; advertising is paid-for promotion',
      'PR is always paid for; advertising is always free',
      'PR and advertising are two names for the same activity',
      'PR is only used by charities; advertising only by businesses that want to make a profit'],
      'Advertising buys space to send a message. PR tries to earn good coverage and goodwill, for example through press releases and community work.'),
    mc('distinguish', 'Which statement correctly separates PR from branding?', [
      'Branding creates an identity such as a name and logo; PR manages how the public views the business',
      'Branding is the business’s charity work; PR is designing its logo, product names and packaging colours',
      'Branding is about price; PR is about where products are sold',
      'Branding and PR both mean paying for television adverts'],
      'A brand is the identity; PR is the ongoing work to keep the public’s view of that business and brand favourable.'),
    mc('distinguish', 'A student defines public relations as “advertising products to sell more”. What is wrong with this?', [
      'PR is about building a good public image, not paid advertising',
      'PR is about setting prices lower than competitors',
      'PR is only about the relationship between managers and staff inside the business',
      'Nothing is wrong, as PR and advertising are the same'],
      'PR means building and maintaining a favourable image of the business with the public. Selling more may follow, but it is not the definition.'),
    mc('distinguish', 'Freshmart, a supermarket, stops giving out plastic bags and tells local newspapers about it. What is Freshmart mainly trying to do?', [
      'Improve its image as an environmentally responsible business',
      'Lower the price of its food to beat rivals',
      'Change its main distribution channel from shops to e-commerce',
      'Collect quantitative data about its customers'],
      'Publicising an environmental action is PR: it aims to make the public see Freshmart more favourably, which may attract customers.')
  ] };
})();
