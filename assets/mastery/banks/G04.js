/* Group G04 mastery bank: Business activity, objectives, stakeholders and ownership; Location, going global, currencies and interest rates. Original questions, not copied from past papers. */
(function () {
  'use strict';
  var B = window.MASTERY_BANKS = window.MASTERY_BANKS || {};
  var R = window.Mastery;   // R.roundDp(x, dp), R.roundSf(x, n): correct half-up rounding

  // ---------- small helpers ----------
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function fmt(x, dp) {
    dp = dp == null ? 2 : dp;
    var s = R.roundDp(x, dp).toFixed(dp);
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  // single-answer MCQ: the first option is correct (the engine shuffles options)
  function M1(skill, q, options, why, family) {
    var o = { skill: skill, kind: 'mcq', q: q, options: options, answer: 0, why: why };
    if (family) o.family = family;
    return o;
  }
  // select-all MCQ: the options in `right` are correct, those in `wrong` are not
  function MU(skill, q, right, wrong, why, family) {
    var opts = right.concat(wrong), ans = [];
    for (var i = 0; i < right.length; i++) ans.push(i);
    var o = { skill: skill, kind: 'multi', q: q, options: opts, answers: ans, why: why };
    if (family) o.family = family;
    return o;
  }
  // shuffle-free uniqueness guard for generated numeric options
  function distinct(list) {
    var seen = {};
    for (var i = 0; i < list.length; i++) { if (seen[list[i]]) return false; seen[list[i]] = 1; }
    return true;
  }

  // ---------- currencies (realistic 2026-style rates) ----------
  var CUR = {
    GBP: { s: '£', pre: true, adj: 'British' }, USD: { s: '$', pre: true, adj: 'American' }, EUR: { s: '€', pre: true, adj: 'Spanish' },
    MYR: { s: 'MYR', adj: 'Malaysian' }, INR: { s: 'INR', adj: 'Indian' }, CNY: { s: 'CNY', adj: 'Chinese' }, JPY: { s: 'JPY', adj: 'Japanese' },
    PKR: { s: 'PKR', adj: 'Pakistani' }, KES: { s: 'KES', adj: 'Kenyan' }, ZAR: { s: 'ZAR', adj: 'South African' }, MXN: { s: 'MXN', adj: 'Mexican' },
    SGD: { s: 'SGD', adj: 'Singaporean' }, AED: { s: 'AED', adj: 'Emirati' }, CHF: { s: 'CHF', adj: 'Swiss' }
  };
  var RANGE = {
    'GBP-EUR': [1.12, 1.20], 'USD-EUR': [0.88, 0.95], 'GBP-USD': [1.24, 1.36], 'EUR-MYR': [4.80, 5.20], 'USD-INR': [82, 84.5],
    'GBP-CNY': [9.05, 9.45], 'USD-JPY': [140, 155], 'GBP-PKR': [345, 372], 'USD-KES': [127, 134], 'EUR-ZAR': [19.2, 20.8],
    'USD-MXN': [16.8, 19.2], 'USD-SGD': [1.31, 1.37], 'GBP-INR': [104, 110], 'EUR-CHF': [0.92, 0.97], 'USD-CHF': [0.86, 0.92]
  };
  function rateFor(a, b) { var r = RANGE[a + '-' + b]; return R.roundDp(r[0] + Math.random() * (r[1] - r[0]), 2); }
  function amt(code, x, dp) { var c = CUR[code]; var t = fmt(x, dp == null ? 2 : dp); return c.pre ? c.s + t : t + ' ' + c.s; }
  function line(a, b, r) { return amt(a, 1, 0) + ' = ' + amt(b, r, 2); }          // "£1 = €1.17"
  function rline(a, b, r) { return amt(b, r, 2) + ' = ' + amt(a, 1, 0); }         // "5.03 MYR = €1"
  function an(word) { return /^[aeiou]/i.test(word) ? 'an ' + word : 'a ' + word; }

  // =====================================================================
  B['BUS-S1-05'] = { title: 'Meaning of stakeholder and shareholder', items: [
    M1('define-stakeholder', 'What does the term <b>stakeholder</b> mean?',
      ['A person or group affected by, or interested in, what a business does',
       'A person or organisation that owns one or more shares in a company',
       'A person or bank that lends money to a business in return for interest',
       'A person who buys goods or services from a business for their own use'],
      'A stakeholder is anyone with an interest in the business or affected by its actions. Owning shares makes you a shareholder; lenders and customers are only examples of stakeholders.'),
    M1('define-shareholder', 'What does the term <b>shareholder</b> mean?',
      ['A person or organisation that owns shares in a limited company',
       'Any group that is affected by the decisions a company makes',
       'A bank that has lent money to a company and receives interest',
       'A manager who runs the day-to-day operations of a company'],
      'A shareholder owns shares, so is a part-owner of a company. Being affected by decisions describes any stakeholder, and a lender or manager need not own shares.'),
    M1('define-stakeholder', 'A student is asked to define the term stakeholder. Which answer would earn the mark?',
      ['An individual or group with an interest in, or affected by, a business',
       'Customers, employees, suppliers, lenders and the local community of a business',
       'The person who owns a business and makes all of the main decisions',
       'Someone who has put money into a company and owns part of it'],
      'A definition must give the meaning. Listing groups only gives examples, owning and deciding describes an owner, and owning part of a company describes a shareholder.'),
    M1('define-shareholder', 'A student is asked to define the term shareholder. Which answer would earn the mark?',
      ['Someone who owns part of a company by holding its shares',
       'Someone who invests in a business and hopes to make money from it',
       'A person who is affected by the decisions that a company makes',
       'An employee who is given a share of the profit as a yearly bonus'],
      '"Invests in a business" is too vague: a lender also invests. The key idea is owning shares in a company, which makes the person a part-owner.'),
    M1('relationship', 'Which statement about stakeholders and shareholders is correct?',
      ['All shareholders are stakeholders, but not all stakeholders are shareholders',
       'All stakeholders are shareholders, but not all shareholders are stakeholders',
       'Shareholders and stakeholders are always exactly the same group of people',
       'Shareholders are not stakeholders because they do not work in the business'],
      'Shareholders own part of the company, so they clearly have an interest in it and are stakeholders. Many other stakeholders, such as customers and suppliers, own no shares.'),
    MU('identify-group', 'Marlow Kitchenware Ltd is owned by its founder Ines Varga, her cousin Pavel, and an investment firm called Halden Capital, who all hold shares. The company has a loan from Northgate Bank, employs 35 staff and buys steel from a local mill. Select <b>all</b> the shareholders of Marlow Kitchenware Ltd.',
      ['Ines Varga', 'Pavel, Ines\'s cousin', 'Halden Capital'],
      ['Northgate Bank', 'The 35 employees', 'The local steel mill'],
      'Only the three who hold shares are shareholders. The bank, the staff and the mill are stakeholders because they are affected by the company, but they do not own any of it.'),
    M1('stakeholder-interests', 'Brightwater Bakery Ltd buys all of its flour from one mill. What is the mill\'s <b>main</b> interest in the bakery?',
      ['Being paid on time and receiving regular, large orders',
       'Receiving a dividend from the bakery\'s yearly profit',
       'Buying the bakery\'s bread at the lowest possible price',
       'Collecting tax on the profit that the bakery makes'],
      'The mill is a supplier. Suppliers want reliable orders and prompt payment. Dividends go to shareholders, low prices interest customers and tax interests the government.'),
    M1('stakeholder-interests', 'Staff at Lumen Call Centres work in shifts answering customer calls. What are these employees <b>most</b> likely to want from the business?',
      ['Secure jobs, fair pay and good working conditions',
       'A large dividend paid from the company\'s profit',
       'Low prices for the services the company sells',
       'Their bank loan to the company repaid with interest'],
      'Employees depend on the business for their income, so job security, pay and conditions matter most to them. The other interests belong to shareholders, customers and lenders.'),
    M1('stakeholder-interests', 'Coldfield Logistics plans to open a 24-hour warehouse beside a small village. What are the village residents <b>most</b> likely to want from the business?',
      ['New local jobs, with little night-time noise and traffic',
       'A high share price so that the value of their shares rises',
       'Prompt payment of invoices for the goods they supply',
       'Higher profits so that more corporation tax is collected'],
      'The residents are the local community. They gain from jobs but suffer from noise and lorries. Share prices interest shareholders, invoices interest suppliers and tax interests the government.'),
    M1('stakeholder-interests', 'Why is the government a stakeholder in Tavira Solar plc?',
      ['It wants the company to pay its taxes, obey the law and create jobs',
       'It owns most of the shares and receives most of the dividends',
       'It supplies the company with the panels that it installs',
       'It buys the company\'s products for use in people\'s homes'],
      'The government collects tax from businesses and sets laws they must follow, and it wants jobs in the economy. A plc is owned by private shareholders, not the government.'),
    M1('stakeholder-interests', 'Quayside Marine borrowed $80,000 from a bank to buy a new boat lift. What is the bank\'s main interest in Quayside Marine?',
      ['That the loan and the interest are repaid in full and on time',
       'That Quayside Marine pays its workers above the minimum wage',
       'That Quayside Marine charges customers the lowest prices in the area',
       'That Quayside Marine buys its boats from local suppliers'],
      'A lender is a stakeholder because it will lose money if the business cannot repay. Its interest is getting the loan and interest back on time.'),
    M1('stakeholder-interests', 'A family buys a fridge from Arcadia Appliances. As customers, what are they most interested in?',
      ['Good quality products at a fair price, with good service',
       'The business making high profits so it can pay out large dividends',
       'Being paid on time for the parts they sold to the business',
       'The business staying small so that it does not need more staff'],
      'Customers are affected by the price, quality and service they receive. Dividends interest shareholders and prompt payment interests suppliers.'),
    M1('stakeholder-interests', 'What do shareholders in Orchard Lane Foods plc usually want most from the company?',
      ['A share of the profit paid as dividends and a rising share price',
       'Steady wages and safe working conditions in the factories',
       'A guaranteed rate of interest on the money they lent',
       'Cheaper food in the shops where the company\'s brands are sold'],
      'Shareholders own the company, so they gain when profits are paid out as dividends and when their shares become worth more. Wages interest employees and fixed interest belongs to lenders.'),
    M1('relationship', 'Why does a sole trader such as a self-employed electrician have stakeholders but <b>no</b> shareholders?',
      ['Only companies issue shares, and a sole trader is not a company',
       'A sole trader is too small to be affected by anyone outside the business',
       'Shareholders only exist in businesses that are owned by the government',
       'A sole trader keeps all its profit, so nobody else has an interest in it'],
      'Customers, suppliers and lenders are still affected by a sole trader, so it has stakeholders. But only a company issues shares, so a sole trader has no shareholders.'),
    M1('identify-group', 'Stonebridge Quarries Ltd wants to double the number of lorries using the narrow road through a nearby town. Which stakeholder group is <b>most directly</b> affected by this decision?',
      ['The local community living in the town', 'The company\'s shareholders', 'The company\'s bank', 'The company\'s customers'],
      'Extra lorries cause noise, congestion and danger on local roads, which affects people living in the town most directly.'),
    M1('relationship', 'In a limited company, which stakeholder group are also the <b>owners</b> of the business?',
      ['Shareholders', 'Employees', 'Customers', 'Lenders'],
      'Shareholders own the shares, so together they own the company. Employees, customers and lenders are stakeholders but not owners.'),
    MU('define-shareholder', 'Select <b>all</b> the statements that correctly describe a shareholder in a company.',
      ['They own part of the company', 'They may receive a dividend from the company\'s profit', 'They are also stakeholders in the company'],
      ['They must be employed by the company', 'They are paid a fixed rate of interest each year', 'They run the company\'s daily operations'],
      'A shareholder is a part-owner who may get dividends, so is also a stakeholder. Shareholders do not have to work for the company, and fixed interest is paid to lenders, not owners.'),
    M1('identify-group', 'Cacao Rica Ltd, a chocolate maker, plans to cut the price it pays for cocoa beans by 15%. Which stakeholder group is <b>most directly</b> affected?',
      ['Its suppliers', 'Its shareholders', 'The government', 'Its customers'],
      'The cocoa growers who sell beans to the company are its suppliers. A lower price paid for beans directly reduces their income.'),
    M1('identify-group', 'Pinecrest Dairy Ltd processes milk at a plant in a small Welsh town. Which one of the following is <b>not</b> a stakeholder in Pinecrest Dairy?',
      ['A cattle farmer in Brazil with no links to the business', 'A local farmer who sells milk to Pinecrest', 'A family living next to the processing plant', 'The bank that lent Pinecrest money for new tanks'],
      'A stakeholder must have an interest in, or be affected by, the business. The supplier, the neighbours and the lender all are. A farmer with no links to Pinecrest is not affected by what it does.'),
    M1('relationship', 'A pension fund buys 4% of the shares in Velora Telecom plc. How should the pension fund be described?',
      ['As a shareholder, and so also a stakeholder',
       'As a lender, because it has given money to Velora Telecom',
       'As neither, because it is an organisation rather than a person',
       'As a supplier, because it supplies capital to Velora Telecom'],
      'An organisation can own shares just like a person. Buying shares makes the fund a part-owner, so it is a shareholder, and every shareholder is a stakeholder.'),
    M1('relationship', 'Which person is a stakeholder in Orla Shipping plc but is <b>not</b> a shareholder?',
      ['A dock worker employed by Orla who owns no shares',
       'A retired teacher who bought 200 Orla shares',
       'An investment fund holding 3% of Orla\'s shares',
       'A director who owns 10% of Orla\'s shares'],
      'The dock worker is affected by Orla through their job, so is a stakeholder, but owns no shares. Everyone else listed holds shares, so they are shareholders as well as stakeholders.'),
    M1('define-stakeholder', 'Why are customers counted as stakeholders of a business?',
      ['They are affected by the price, quality and service they get',
       'They own part of the business when they buy its products',
       'They are paid a share of the profit each time they make a purchase',
       'They decide how the business is managed from day to day'],
      'A stakeholder is anyone affected by or interested in a business. Customers are affected by what they pay and what they receive. Buying a product does not make them owners.'),
    M1('define-shareholder', 'Which one of the following is a benefit that a shareholder can receive from a company?',
      ['A share of the profit paid as a dividend', 'A fixed monthly wage', 'Interest at an agreed rate on a loan', 'A discount for supplying raw materials'],
      'Shareholders are owners, so when the directors pay out part of the profit they receive dividends. Wages go to employees and agreed interest goes to lenders.')
  ] };

  // =====================================================================
  B['BUS-S1-11'] = { title: 'Primary, secondary and tertiary sectors', items: [
    M1('classify-business', 'Sealoch Salmon breeds and raises fish in sea pens off the coast. Which sector does it operate in?',
      ['Primary', 'Secondary', 'Tertiary'],
      'Fish farming takes natural resources from the sea, which is extracting raw materials. That is the primary sector.'),
    M1('classify-business', 'Ridgeback Timber cuts down trees in a managed forest and sells the logs to sawmills. Which sector does it operate in?',
      ['Primary', 'Secondary', 'Tertiary'],
      'Forestry extracts a raw material (wood) from the earth, so it is primary. The sawmills that process the logs would be secondary.'),
    M1('classify-business', 'Oakhurst Furniture buys planks of wood and turns them into chairs and wardrobes. Which sector does it operate in?',
      ['Secondary', 'Primary', 'Tertiary'],
      'It converts raw materials (wood) into finished goods (furniture). That is manufacturing, which is the secondary sector.'),
    M1('classify-business', 'Pagelight Books sells new books to customers through its website and delivers them by post. Which sector does it operate in?',
      ['Tertiary', 'Secondary', 'Primary'],
      'It does not make the books; it provides the service of selling and delivering them. Retailing, online or in a shop, is tertiary.'),
    M1('classify-business', 'Harrow Homes builds new houses on land it has bought. Which sector does it operate in?',
      ['Secondary', 'Tertiary', 'Primary'],
      'Construction turns materials such as bricks, cement and timber into a finished product (a house), so it is in the secondary sector.'),
    M1('classify-business', 'A steel mill turns iron ore into steel sheets, which it sells to car makers. Which sector is the steel mill in?',
      ['Secondary, because it converts raw materials into semi-finished goods',
       'Primary, because iron ore is a raw material that is dug out of the earth',
       'Tertiary, because it provides steel to other businesses',
       'Primary, because the steel is not yet a finished product'],
      'The mill does not dig the ore out of the ground; it processes it. Converting raw materials into semi-finished goods such as steel sheets is still secondary.'),
    MU('classify-job', 'Select <b>all</b> the jobs that are in the <b>tertiary</b> sector.',
      ['Bank cashier', 'Hotel receptionist', 'Insurance adviser'],
      ['Copper miner', 'Factory machine operator', 'Trawler fisherman'],
      'Cashiers, receptionists and insurance advisers all provide services, so they are tertiary. Mining and fishing extract resources (primary) and machine operators make goods (secondary).'),
    MU('classify-job', 'Select <b>all</b> the jobs that are in the <b>primary</b> sector.',
      ['Cotton farmer', 'Gold miner', 'Deep-sea fisherman'],
      ['Worker in an oil refinery', 'Assistant in a jewellery shop', 'Weaver in a textile mill'],
      'Farming, mining and fishing take raw materials from the earth or sea, so they are primary. Refining oil and weaving cloth are secondary, and shop work is tertiary.'),
    M1('classify-job', 'In which sector does a worker on a car assembly line operate?',
      ['Secondary', 'Primary', 'Tertiary'],
      'An assembly line worker helps to make a finished product (a car) from parts and materials, so the job is in the secondary sector.'),
    M1('classify-job', 'Which one of the following jobs is in the <b>secondary</b> sector?',
      ['A baker making bread in a factory that supplies supermarkets', 'A lorry driver delivering bread to supermarkets', 'A farmer growing the wheat used to make flour', 'A supermarket worker stacking loaves on shelves'],
      'Baking turns flour into bread, so it is manufacturing (secondary). Growing wheat is primary, while driving and shelf-stacking are services (tertiary).'),
    M1('define-sector', 'What is meant by the <b>primary sector</b>?',
      ['Businesses that extract raw materials from the earth or sea',
       'Businesses that convert raw materials into finished goods',
       'Businesses that provide services to consumers and firms',
       'Businesses that are owned and run by the government'],
      'Primary activity is extraction: farming, fishing, mining and forestry. Converting materials is secondary and services are tertiary. Government ownership is the public sector, a different idea.'),
    M1('define-sector', 'What is meant by the <b>secondary sector</b>?',
      ['Converting raw materials into finished or semi-finished goods',
       'Taking natural resources such as minerals out of the ground',
       'Selling goods to customers through shops and websites',
       'Providing services such as banking, transport and insurance'],
      'The secondary sector is manufacturing and construction: it turns raw materials into products. Extraction is primary; selling and other services are tertiary.'),
    M1('define-sector', 'What is meant by the <b>tertiary sector</b>?',
      ['Businesses that provide services', 'Businesses that grow crops and raise animals', 'Businesses that assemble products from parts', 'Businesses that refine raw materials such as oil'],
      'Tertiary means services, for example retail, banking, transport, hotels and healthcare. Farming is primary; assembling and refining are secondary.'),
    M1('define-sector', 'A student is asked to define the term primary sector. Which answer would earn the mark?',
      ['The part of the economy that extracts natural resources from the earth',
       'The part of the economy that includes farming and fishing',
       'The part of the economy that is most important to a country',
       'The part of the economy that comes first in the chain of production and is the cheapest'],
      'A definition must state the activity, which is extraction of raw materials. Naming farming and fishing only gives examples, and the other answers are not what "primary" means.'),
    M1('misconception', 'A student says a supermarket is in the secondary sector "because it sells goods such as food and clothes". Why is the student wrong?',
      ['The supermarket does not make the goods; it provides the service of selling them',
       'The supermarket is primary, because much of the food it sells comes straight from farms',
       'The supermarket is in no sector, because it only buys and sells goods',
       'The supermarket is secondary only if it sells more goods than services'],
      'Sectors depend on what the business itself does. A retailer does not manufacture anything; it provides a service by making goods available, so it is tertiary.'),
    M1('chain-of-production', 'Which list shows a cocoa farm, a chocolate factory and a sweet shop in the order primary, secondary, tertiary?',
      ['Cocoa farm, chocolate factory, sweet shop', 'Chocolate factory, cocoa farm, sweet shop', 'Cocoa farm, sweet shop, chocolate factory', 'Sweet shop, chocolate factory, cocoa farm'],
      'The farm grows the raw material (primary), the factory turns cocoa into chocolate (secondary) and the shop sells it to customers (tertiary).'),
    M1('chain-of-production', 'In the wool industry, which one of these businesses is in the <b>secondary</b> sector?',
      ['A spinning mill that turns raw wool into yarn', 'A sheep farm that shears its flock for wool', 'A clothes shop that sells wool jumpers', 'A haulage firm that carries wool to the coast'],
      'The mill processes raw wool into yarn, which is manufacturing (secondary). Sheep farming is primary; selling and transport are services (tertiary).'),
    M1('outline-applied', 'Pinewood Joinery buys oak planks and turns them into dining tables. A question asks: "Outline why Pinewood Joinery operates in the secondary sector." Which answer would earn <b>both</b> marks?',
      ['It converts raw materials into finished goods, as it turns oak planks into dining tables',
       'It is a manufacturing business that makes products to sell to its customers',
       'It sells its tables to customers, which means it is providing a service',
       'It uses wood, which is a natural raw material that comes from the forest'],
      'An Outline needs the reason (converting raw materials into products) and a detail from the case (oak planks into tables). The second answer has no case detail; the others give the wrong reason.'),
    M1('outline-applied', 'Harbourview Hotel offers rooms, meals and a spa to tourists. Which answer best outlines why it operates in the tertiary sector?',
      ['It provides services rather than goods, such as accommodation and spa treatments for tourists',
       'It is in the tertiary sector because it is a business that has many customers',
       'It makes meals from raw food, so it turns raw materials into products',
       'It is a large business that employs many staff in the local area'],
      'Tertiary means providing services. The best answer states that and then names the hotel\'s actual services. Having customers or employing staff does not decide the sector.'),
    M1('chain-of-production', 'Vale Ridge Estate grows grapes, makes wine in its own winery and runs a shop where visitors buy bottles. Which of its activities is in the <b>secondary</b> sector?',
      ['Making the wine in the winery', 'Growing the grapes in the vineyard', 'Selling bottles in the visitor shop', 'Running guided tours of the estate'],
      'One business can work in several sectors. Growing grapes is primary, turning them into wine is secondary, and selling or running tours are services (tertiary).'),
    M1('classify-business', 'Which one of the following activities is <b>not</b> in the secondary sector?',
      ['Repairing customers\' broken laptops', 'Assembling laptops from components', 'Moulding plastic cases for laptops', 'Making circuit boards for laptops'],
      'Repairing a customer\'s laptop is a service, so it is tertiary. Assembling, moulding and making components all produce goods, so they are secondary.'),
    { skill: 'classify-business', gen: function () {
      var list = [
        ['A company that drills for natural gas under the sea', 0], ['A coffee plantation in the highlands', 0], ['A quarry that digs limestone', 0], ['A cattle ranch that raises beef cattle', 0],
        ['A factory that bottles fruit juice', 1], ['A shipyard that builds ferries', 1], ['A brewery that makes beer', 1], ['A plant that turns sugar cane into refined sugar', 1],
        ['A dental practice', 2], ['A taxi firm', 2], ['A mobile phone shop', 2], ['An insurance company', 2], ['A hairdressing salon', 2]
      ];
      var it = pick(list), names = ['Primary', 'Secondary', 'Tertiary'];
      var reason = ['it extracts raw materials from the earth or sea', 'it converts raw materials into finished or semi-finished goods', 'it provides a service rather than extracting or making goods'][it[1]];
      var opts = [names[it[1]]].concat(names.filter(function (n, i) { return i !== it[1]; }));
      return { kind: 'mcq', q: 'Which sector does this business operate in?<br><b>' + it[0] + '</b>', options: opts, answer: 0,
        why: 'It is ' + names[it[1]].toLowerCase() + ' because ' + reason + '. Always ask what the business actually does: extract, make or serve.' };
    } }
  ] };

  // =====================================================================
  B['BUS-S1-01'] = { title: 'Business objectives: financial, non-financial and social', items: [
    MU('classify-objective', 'Select <b>all</b> the <b>financial</b> objectives.',
      ['Survival', 'Increasing market share', 'Increasing profit'],
      ['Personal satisfaction', 'Independence', 'Cutting plastic waste'],
      'Survival, profit, sales, market share and financial security are financial objectives. Personal satisfaction and independence are non-financial, and cutting waste is a social (non-financial) objective.'),
    MU('classify-objective', 'Select <b>all</b> the <b>non-financial</b> objectives.',
      ['Challenge', 'Control', 'Independence'],
      ['Increase sales revenue by 10%', 'Survive the first year of trading', 'Achieve financial security'],
      'Challenge, control and independence are about what the owner wants personally, not money. Sales, survival and financial security are all financial objectives.'),
    M1('classify-objective', 'Which of these is a <b>non-financial</b> objective for the owner of a new graphic design business?',
      ['To be her own boss and make her own decisions', 'To break even by the end of her first year', 'To win 15% of the local design market', 'To raise her yearly sales revenue to $40,000 or more'],
      'Being her own boss is independence, which is non-financial. Breaking even (survival), market share and revenue are all financial objectives.'),
    M1('classify-objective', 'The owner of a café that has just opened says: "This year I just want to keep the business going." What type of objective is this?',
      ['Survival, which is a financial objective', 'Survival, which is a non-financial objective', 'Personal satisfaction, which is non-financial', 'Market share, which is a financial objective'],
      'Keeping the business going is survival. Survival is about having enough money to keep trading, so it counts as a financial objective.'),
    M1('classify-objective', 'Greenleaf Laundry aims to cut the water it uses by 30% within two years. What type of objective is this?',
      ['A social objective, which is non-financial', 'A financial objective, because water costs money', 'A market share objective', 'A personal satisfaction objective'],
      'An aim to help the environment is a social objective. Even if it saves some money, its purpose is to reduce harm to society, so it is classed as non-financial.'),
    M1('classify-objective', 'A student says "increase market share" is a non-financial objective because it is not measured in dollars. Is the student right?',
      ['No, market share is treated as a financial objective', 'Yes, because it is measured as a percentage', 'Yes, because it is about customers, not money', 'No, market share is a social objective'],
      'Market share is the business\'s sales as a percentage of all sales in the market, so it is about sales. In 4BS1 it is listed with the financial objectives.'),
    M1('classify-objective', 'Juma\'s removals business has built up savings that would cover six months of costs if work dried up. Which objective has he been working towards?',
      ['Financial security', 'Personal satisfaction', 'Market share', 'Independence'],
      'Building up reserves so the business is safe from a bad spell is financial security, one of the financial objectives.'),
    M1('classify-objective', 'Arlo left a well-paid job to start a drone-filming business because he wanted to test whether he could succeed in a new field. Which objective is this?',
      ['Challenge', 'Survival', 'Profit', 'Financial security'],
      'Wanting to test yourself in something new is challenge, a non-financial objective. The other three are financial.'),
    M1('why-set-objectives', 'Why do businesses set objectives? Choose the valid reason.',
      ['To give staff a clear direction and a target to check progress against', 'To guarantee that the business will make a profit', 'To remove the need for any other planning', 'To meet a legal rule that says all businesses must publish their objectives'],
      'Objectives tell everyone what the business is aiming for and let managers measure progress. Setting a target does not guarantee it will be met, and there is no such legal rule.'),
    MU('why-set-objectives', 'Select <b>all</b> the valid reasons why a business sets objectives.',
      ['They give the business a clear direction', 'They can motivate employees to work towards a target', 'They give a target to measure performance against'],
      ['They guarantee the business will survive', 'They reduce the tax the business must pay'],
      'Objectives guide decisions, motivate staff and act as a benchmark. They cannot guarantee survival and have no effect on tax.'),
    M1('why-objectives-change', 'A large rival opens next door to Nadia\'s bakery and takes many of her customers. Nadia changes her objective from growth to survival. What has caused the change?',
      ['Market conditions', 'New technology', 'New legislation', 'An internal reason'],
      'The change in competition is a change in market conditions. With fewer customers, Nadia must focus on keeping the bakery going rather than growing.'),
    M1('why-objectives-change', 'A print shop sets a new objective to take 60% of its orders online after customers start using a new mobile ordering app. What has caused the change?',
      ['Technology', 'Legislation', 'Performance', 'Market share'],
      'A new app is a change in technology. It opens a new way to sell, so the shop changes its objective to match.'),
    M1('why-objectives-change', 'A new law bans shops from giving out single-use plastic bags. A grocer sets an objective to switch all bags to paper by June. Why has the objective changed?',
      ['Because of new legislation', 'Because of better performance', 'Because of an internal reason', 'Because of new technology'],
      'A change in the law (legislation) forces the grocer to act, so its objectives change to make sure it obeys the new rule.'),
    M1('why-objectives-change', 'After two years of strong profits, the owner of a gym chain sets a new objective to open three more branches. What has caused the change?',
      ['Performance', 'Legislation', 'Market conditions getting worse', 'New technology'],
      'Good results (performance) give the owner the money and confidence to aim higher, so the objective moves from survival or profit towards growth.'),
    M1('why-objectives-change', 'The founder of a family-run printing firm retires and her son takes over. He sets a new objective to sell to schools across the country. What is the most likely cause?',
      ['An internal reason: a new owner with different aims', 'Legislation: a new law about printing', 'Technology: a faster printing machine', 'Market conditions: falling demand for printing'],
      'A change of owner or manager is an internal reason. New leaders often bring their own ambitions, such as growth.'),
    M1('why-objectives-change', 'Seren started a candle business five years ago with the objective of survival. It now has steady profits and loyal customers. Which change in objective is most likely?',
      ['From survival towards growth, such as more sales or a larger market share', 'From profit back towards survival, because the business is still quite new', 'From growth towards survival, because of rising competition', 'From financial security towards personal satisfaction only'],
      'As a business becomes established and survival is no longer in doubt, owners usually aim for growth or a bigger market share.'),
    M1('social-objective-effect', 'Which answer is the best developed explanation of how a social objective can benefit a business?',
      ['Using recycled packaging can improve its reputation with eco-minded customers, so more of them choose its products, raising sales revenue',
       'Using recycled packaging is good for the environment because there is less waste',
       'A social objective is an aim that helps society or the environment rather than making profit',
       'A social objective always cuts costs because recycled materials are cheaper than new ones'],
      'The best answer gives the point (better reputation) and then two linked steps (more customers, more revenue). The second has only one step, the third is a definition, and the fourth is not always true.'),
    MU('social-objective-effect', 'Sunvale Juices pays local fruit farmers a fair, guaranteed price. Select the <b>two</b> statements that develop this into a chain showing an <b>advantage</b> for Sunvale.',
      ['The farmers stay loyal and keep supplying Sunvale with top-quality fruit', 'So the quality of Sunvale\'s juice stays high and customers keep buying it'],
      ['Paying more for fruit raises Sunvale\'s costs per bottle', 'A social objective is an aim that is not about money', 'Sunvale must therefore become a social enterprise'],
      'Loyal suppliers mean reliable, good fruit, which keeps product quality and repeat sales high. Higher costs is a drawback, not an advantage, and the other options do not explain an effect.'),
    M1('social-objective-effect', 'Tidewell Plastics sets an objective to make all its products from recycled plastic. What is the most likely <b>drawback</b> for Tidewell?',
      ['Recycled material may cost more, cutting its profit margin', 'Customers will stop buying because recycled products are illegal', 'It will have to change from a company into a partnership', 'Its employees will lose their limited liability'],
      'A social objective often raises costs, for example dearer materials or extra processing, so unless prices rise, profit per item falls.'),
    M1('social-objective-effect', 'Fenwick Fashions, a small clothes maker with very little spare cash, is thinking about switching to organic cotton that costs 40% more. Which factor will the decision <b>most</b> depend on?',
      ['Whether its customers will pay higher prices for organic clothes', 'Whether its owner prefers organic cotton', 'Whether other businesses have social objectives', 'Whether organic cotton is a primary product'],
      'The extra cost only makes sense if customers value the change enough to pay more or buy more. With little spare cash, Fenwick cannot afford a cost rise that customers will not cover.'),
    M1('objective-vs-measure', 'A question asks for one financial objective for Orbit Cycles. Which answer is <b>not</b> an objective?',
      ['Carry out a customer satisfaction survey', 'Increase bicycle sales by 20% next year', 'Become the cycle shop with the largest share of the town\'s market', 'Make a profit of $25,000 next year'],
      'A survey is a way to measure performance, not a target the business wants to reach. The other three are financial objectives.'),
    M1('applied-objective', 'Kaya left her office job to make handmade pottery because she loves creative work. Which answer gives a non-financial objective <b>written for Kaya\'s business</b>?',
      ['Personal satisfaction from designing and making her own pottery', 'Making as much profit as possible from her pottery business', 'Personal satisfaction, because this is a non-financial objective', 'Increasing her market share of pottery sales in her town'],
      'A State answer should apply the objective to the case. The first answer names a non-financial objective and links it to Kaya\'s pottery. The third is not applied, and the others are financial.'),
    M1('applied-objective', 'Amaru Tours runs walking holidays in the mountains and wants to protect the trails its customers use. Which is the best social objective for Amaru Tours?',
      ['To repair and maintain the trails used on its tours', 'To increase the number of tours it sells by 25%', 'To keep full control over decisions in the business', 'To earn enough to cover all costs in its first year'],
      'A social objective helps society or the environment. Looking after the trails protects the environment and fits this business. The others are financial or about control.')
  ] };

  // =====================================================================
  B['BUS-S1-04'] = { title: 'Forms of business ownership and limited liability', items: [
    M1('features-of-form', 'What is meant by a <b>sole trader</b>?',
      ['A business owned by one person, who has unlimited liability', 'A business with only one shareholder, who has limited liability', 'A business owned by two people who share the profit', 'A business owned and run by the government'],
      'A sole trader is owned by one individual. The owner keeps all the profit but has unlimited liability for the business\'s debts.'),
    M1('liability', 'What is meant by <b>unlimited liability</b>?',
      ['The owner can lose personal possessions to pay the business\'s debts', 'The owner can lose only the money invested in the business', 'The business can borrow as much money as it needs', 'The owner is not personally responsible for any of the business\'s debts'],
      'With unlimited liability, there is no limit to what the owner may have to pay: savings, a car or even a house could be used to settle business debts.'),
    M1('liability', 'What is meant by <b>limited liability</b>?',
      ['Owners can lose only the money they invested in the business', 'Owners can lose their personal possessions if the business fails', 'The business is limited to a maximum number of shareholders', 'The business can only borrow a limited amount of money'],
      'Limited liability protects owners\' personal assets. If the company fails, a shareholder loses at most the money they paid for their shares.'),
    M1('liability', 'Rafael is a sole trader who runs a car repair garage. The garage owes suppliers $40,000 that it cannot pay. What could happen to Rafael?',
      ['His personal savings or car could be used to pay the garage\'s debts', 'He loses only the money he put into the garage', 'The government will pay the debt because he is a sole trader', 'His suppliers must write off the debt because he has limited liability'],
      'Sole traders have unlimited liability: the owner and the business are treated as the same, so the owner\'s personal assets can be taken to pay business debts.'),
    { skill: 'liability', gen: function () {
      var inv = rint(4, 30) * 1000, debt = rint(15, 90) * 10000;
      var name = pick(['Halima', 'Tomasz', 'Priya', 'Kwame', 'Elena']);
      var co = pick(['Brightline Media Ltd', 'Corran Engineering Ltd', 'Saltmarsh Foods Ltd', 'Kestrel Print Ltd']);
      return { kind: 'num', q: name + ' paid $' + fmt(inv, 0) + ' for shares in ' + co + '. The company has now failed, owing its creditors $' + fmt(debt, 0) + '. What is the <b>maximum</b> amount ' + name + ' could lose? Give your answer in $.',
        answer: inv, unit: '$', display: fmt(inv, 0),
        why: 'Shareholders in a limited company have limited liability, so ' + name + ' can lose only the $' + fmt(inv, 0) + ' paid for the shares, not any share of the $' + fmt(debt, 0) + ' debt.' };
    } },
    M1('features-of-form', 'Which one of the following applies <b>only</b> to a public limited company (plc)?',
      ['Its shares can be bought and sold by the public on a stock exchange', 'Its owners have limited liability', 'It must have at least two partners', 'It is owned and controlled by the state'],
      'Both Ltd and plc owners have limited liability, but only a plc can offer its shares to the general public on a stock exchange. Partners belong to partnerships and state ownership to public corporations.'),
    M1('public-corporation', 'Which of these describes a <b>public corporation</b>?',
      ['It is owned and controlled by the government', 'Its shares are sold to the public on a stock exchange', 'Its main aim is always to maximise profit', 'It is owned by a single individual'],
      'A public corporation belongs to the state and usually aims to provide a service. Do not confuse it with a public limited company, which is owned by private shareholders.'),
    M1('public-corporation', 'Why might a government keep a rail service to remote villages as a public corporation?',
      ['The service is needed but may not make a profit for a private firm', 'Public corporations never make losses, so taxpayers always save money overall', 'A public corporation can sell shares to raise money', 'Private businesses are not allowed to run any transport'],
      'Governments often own services that society needs but that would be unprofitable, so a private business would cut or close them.'),
    M1('public-corporation', 'Which one of the following is a reason <b>against</b> public ownership of a business?',
      ['With no profit motive, it may become inefficient and rely on taxpayers', 'It allows essential services to reach every part of the country, including remote areas', 'It can keep prices low for people on low incomes', 'It protects jobs in an important industry'],
      'The first answer is a drawback: with no need to make profit, there may be less pressure to control costs, and losses are paid for by taxpayers. The others are reasons for public ownership.'),
    M1('tax', 'A private limited company makes a profit. Which tax does the company pay on that profit?',
      ['Corporation tax', 'Income tax', 'Sales tax', 'Import duty'],
      'Companies (Ltd and plc) pay corporation tax on their profits. A sole trader\'s profit counts as the owner\'s income, so it is taxed with income tax.'),
    M1('tax', 'Leila is a sole trader who runs a florist. Which tax is charged on the profit her business makes?',
      ['Income tax', 'Corporation tax', 'Import duty', 'Sales tax'],
      'A sole trader is not a company, so the profit is treated as the owner\'s personal income and taxed with income tax.'),
    M1('advantages-disadvantages', 'Which one of the following is a <b>disadvantage</b> for a partner in a partnership?',
      ['Each partner can be liable for all the firm\'s debts', 'Partners can share the workload between them', 'Partners can bring more capital into the business', 'Partners can bring different skills to the business'],
      'In an ordinary partnership the partners usually have unlimited liability, so one partner could have to pay debts run up by the whole firm. The other three are advantages.'),
    MU('features-of-form', 'Select <b>all</b> the usual features of an ordinary partnership.',
      ['It is owned by two or more people', 'Profits are shared between the partners', 'The partners usually have unlimited liability'],
      ['Its shares are traded on a stock exchange', 'It is owned by the government', 'It pays corporation tax on its profits'],
      'A partnership has two or more owners who share decisions and profit, usually with unlimited liability. Share trading is for plcs, government ownership is a public corporation and corporation tax is paid by companies.'),
    M1('advantages-disadvantages', 'Which answer is the best developed explanation of an advantage of being a sole trader?',
      ['The owner has full control, so decisions can be made quickly, letting the business react fast to what customers want',
       'The owner has full control of the business and is the only person who owns it',
       'A sole trader is a business that is owned and run by one person',
       'The owner has limited liability, so personal possessions are protected if the business fails and cannot pay its debts'],
      'The best answer gives a feature (full control) then two linked steps (quick decisions, faster response to customers). The second has no development, the third is a definition, and the fourth is wrong: sole traders have unlimited liability.'),
    M1('advantages-disadvantages', 'Which one of the following is a <b>disadvantage</b> of being a sole trader?',
      ['It can be hard to raise capital because only one person\'s savings and borrowing are available', 'The owner keeps all of the profit the business makes, so has a strong reason to work hard', 'The owner can choose their own working hours', 'Few legal formalities are needed to start trading'],
      'A single owner has limited money of their own and banks may lend only small amounts, so growth can be slow. The other three are advantages.'),
    M1('plc-vs-ltd', 'Why might a successful private limited company choose to become a public limited company?',
      ['To raise a large amount of capital by selling shares to the public', 'To give its owners unlimited liability', 'To keep its financial information completely private from rivals and the public', 'To stop anyone else from buying its shares'],
      'Becoming a plc lets the company sell shares to anyone on a stock exchange, which can raise far more money than a Ltd. It does not change limited liability, and accounts become more public, not less.'),
    M1('plc-vs-ltd', 'Which one of the following is a <b>drawback</b> for the original owners when a Ltd becomes a plc?',
      ['They may lose control, because anyone can buy enough shares to take over', 'They lose limited liability and could lose their homes', 'They can no longer raise money by selling shares', 'They must pay income tax instead of corporation tax'],
      'Once shares trade publicly, outsiders can build up large holdings, so the founders may be outvoted or the company taken over. Liability stays limited and tax stays corporation tax.'),
    M1('advantages-disadvantages', 'Sanjay is changing his sole-trader plumbing business into a private limited company. Which one of the following is a <b>disadvantage</b> of this change?',
      ['He must register the company and publish its accounts, so he has less privacy', 'He will gain limited liability, protecting his house if the business fails', 'He can sell shares to friends and family to raise extra capital for the business', 'The business will continue even if he stops working in it'],
      'Companies must be registered and must file accounts that others can see. The other three are advantages of becoming a company.'),
    M1('choose-form', 'Two friends are starting a fashion app that needs $200,000 of investment and could easily fail. They want to protect their homes if things go wrong. Which form of ownership is most suitable?',
      ['Private limited company, because the owners would have limited liability', 'Partnership, because the friends can share the workload', 'Sole trader, because one of them could keep all the profit', 'Public corporation, because the government would pay any debts'],
      'The business is risky and needs a lot of capital, so limited liability matters most. A Ltd protects the owners\' personal assets and lets them sell shares to investors they choose.'),
    M1('choose-form', 'Mei wants to start a small dog-walking service on her own, with no borrowing and very low costs. Which form of ownership is most suitable?',
      ['Sole trader, because it is cheap and simple to set up and she keeps full control', 'Public limited company, because it can sell shares on a stock exchange', 'Partnership, because it must have at least two owners', 'Private limited company, because it is required for any business that has paying customers'],
      'With low risk and one owner, the simplicity, low cost and full control of being a sole trader outweigh the lack of limited liability.'),
    M1('choose-form', 'A student writes: "A partnership is the best choice for the two owners because partners have limited liability, so their homes are safe." What is the flaw in this judgement?',
      ['Ordinary partners usually have unlimited liability', 'Partnerships must have at least ten partners', 'Partnerships are owned by the government', 'Partners cannot share the profit of the business between them'],
      'The judgement rests on a wrong fact. Ordinary partners usually have unlimited liability, so a limited company would be the form that protects their homes.'),
    M1('choose-form', 'Should Ruth convert her successful sole-trader bakery into a private limited company? Her decision will <b>most</b> depend on:',
      ['how much risk and borrowing the planned expansion involves', 'whether her customers prefer bread to cakes', 'whether she pays her staff weekly or monthly', 'how many bakeries there are in other countries'],
      'If expansion needs large loans and carries real risk, limited liability and the ability to sell shares become worth the extra paperwork. If not, staying a sole trader may be better.'),
    MU('features-of-form', 'Select <b>all</b> the features that apply to limited companies (both Ltd and plc) but <b>not</b> to sole traders.',
      ['Owners have limited liability', 'Owners hold shares in the business', 'The business pays corporation tax'],
      ['The business is owned by one person', 'Owners have unlimited liability', 'The business is owned by the government'],
      'Companies are owned by shareholders who have limited liability, and they pay corporation tax. One owner and unlimited liability describe a sole trader, and government ownership is a public corporation.'),
    M1('features-of-form', 'Which form of ownership is described here: "Owned by members of a family; shares can only be sold with the agreement of the other shareholders; owners have limited liability."',
      ['Private limited company', 'Public limited company', 'Partnership', 'Public corporation'],
      'Limited liability and shares point to a company. Restricting who can buy the shares means the shares are not traded publicly, so it is a private limited company.'),
    M1('public-corporation', 'A student writes that "a public corporation is a company whose shares can be bought by the public". What is wrong with this?',
      ['That describes a public limited company; a public corporation is owned by the government', 'Nothing; public corporations and public limited companies are the same', 'Public corporations have no owners at all', 'Public corporations are always partnerships'],
      'This is a common mix-up. A plc is owned by private shareholders; a public corporation is owned and run by the state.')
  ] };

  // =====================================================================
  B['BUS-S1-35'] = { title: 'Measuring business success', items: [
    M1('measure-vs-objective', 'Which one of the following is a way for a business to <b>measure</b> its success, rather than an objective?',
      ['Comparing this year\'s profit with last year\'s profit', 'Aiming to survive its first full year of trading without a loss', 'Wanting to be independent of a boss', 'Aiming to grow into a national chain'],
      'A measure checks how well the business is doing, for example comparing profit over time. Surviving, independence and growing are objectives: things the business is aiming for.'),
    M1('choose-measure', 'Coral Bay Dive School wants to know whether customers enjoy its diving courses. Which is the best way for it to measure this kind of success?',
      ['Track 5-star reviews and repeat bookings', 'Count the number of diving instructors it employs', 'Check the interest rate on its bank loan', 'Compare the price of its boat with other dive schools'],
      'Customer satisfaction can be measured through reviews, complaints and repeat bookings. Staff numbers, loan rates and boat prices do not show whether customers are happy.'),
    MU('choose-measure', 'Select <b>all</b> the <b>non-financial</b> measures of success.',
      ['Rate of staff turnover', 'Number of customer complaints', 'Number of repeat customers'],
      ['Sales revenue', 'Operating profit', 'Value of sales compared with last year'],
      'Staff turnover, complaints and repeat visits show employee and customer satisfaction, which are non-financial. Revenue, profit and sales value are financial measures.'),
    M1('choose-measure', 'Which figure would best show that the employees of a hotel chain are satisfied?',
      ['Staff turnover falling from 30% to 12% a year', 'Room bookings rising by 8% a year', 'Profit rising from $2.1m to $2.6m', 'Market share rising from 9% to 11%'],
      'Satisfied staff are less likely to leave, so falling staff turnover is a good sign of employee satisfaction. The other figures measure financial success.'),
    M1('choose-measure', 'How could the shareholders of Northmere Energy plc judge whether the company has been a success for them?',
      ['By the dividends paid and any rise in the share price', 'By the number of employees who took sick leave', 'By the number of new products launched by rivals', 'By the rate of interest charged on the company\'s loans'],
      'Owner or shareholder satisfaction depends on the return they get: dividends and a rising share price. The other figures do not show what shareholders receive.'),
    M1('interpret-comparison', 'Bluefin Bistro\'s results are shown below.<br><table class="mc-table"><tr><th></th><th>Year 1</th><th>Year 2</th></tr><tr><td>Revenue</td><td>$310,000</td><td>$352,000</td></tr><tr><td>Profit</td><td>$46,000</td><td>$38,000</td></tr></table>Which conclusion is supported by the data?',
      ['Revenue rose, but costs rose faster, so profit fell', 'The bistro was more successful in Year 2 on every measure', 'Revenue fell because profit fell', 'The bistro lost market share to its rivals'],
      'Revenue rose by $42,000 but profit fell by $8,000, so costs must have risen by $50,000. Nothing in the table shows market share.', 'bistro'),
    M1('interpret-comparison', 'Over three years, Tern Outdoor\'s revenue rose by 5% a year, but its market share fell from 14% to 11%. What does this show?',
      ['The whole market grew faster than Tern\'s sales, so rivals are gaining ground', 'Tern is clearly becoming more successful than its rivals', 'Tern\'s profit must have fallen in each year', 'The data contain an error, because revenue and market share always move together'],
      'Market share is Tern\'s sales as a percentage of all sales. If share falls while Tern\'s revenue rises, total market sales must have grown faster, so competitors grew more.'),
    M1('interpret-comparison', 'Why is a single figure, such as "profit of $50,000", of limited use for judging success on its own?',
      ['It needs comparing with past results, targets or rivals', 'Profit is never a useful measure of success', 'Profit can only be measured by large companies', 'A profit figure is always out of date by the time it is published'],
      'A figure becomes meaningful when compared: is it higher than last year, did it meet the objective, and how does it compare with competitors?'),
    M1('limits-of-measure', 'Profit at Spindle Café rose by 20% this year, but online complaints doubled after it cut staff and portion sizes. What is the main limitation of using profit alone to judge success here?',
      ['Profit may fall in future if unhappy customers stop coming back', 'Profit is a non-financial measure, so it cannot be trusted', 'Complaints show that the café\'s revenue must have fallen this year', 'Profit only matters to the café\'s employees'],
      'Profit rose because costs were cut, but unhappy customers may go elsewhere. A fuller picture uses non-financial measures such as complaints alongside profit.'),
    M1('limits-of-measure', 'Which measure of success is usually the <b>hardest</b> to measure accurately?',
      ['Customer satisfaction', 'Sales revenue', 'Profit', 'Number of shops owned'],
      'Revenue, profit and number of shops are exact figures from the records. Customer satisfaction relies on surveys and reviews, which only some customers give and which are opinions.'),
    M1('missed-growth', 'Which answer is the best developed explanation of a problem caused when a business misses its planned growth?',
      ['Shareholders may be disappointed and sell their shares, so the share price falls, making it harder to raise finance by issuing new shares',
       'The business will not grow as fast as it planned to grow',
       'Growth means an increase in the size of a business, such as more sales or outlets',
       'Missing growth leaves more cash unspent, so dividends can rise and new shareholders are attracted, which makes the share price rise quickly'],
      'The best answer gives the point (unhappy shareholders) and two linked steps (shares sold, finance harder to raise). The others repeat the question, define growth, or claim that missing growth helps shareholders, which is the wrong direction.'),
    MU('missed-growth', 'Fable Toys planned to open 12 new shops this year but opened only 4. Select the <b>two</b> statements that best develop a disadvantage for Fable Toys.',
      ['Revenue is lower than forecast, so less profit is available to reinvest', 'With less money to reinvest, Fable may fall further behind rivals that are expanding'],
      ['Fable has 8 fewer shops than it planned', 'Growth is a measure of success', 'Fable should have set a smaller objective'],
      'The chain runs: lower revenue than planned, less money to reinvest, so rivals pull ahead. Restating the shortfall or defining growth does not explain an effect.'),
    M1('interpret-comparison', 'Kito Mobile finds that its market share is 9% while its main rival\'s is 21%. Which next step best shows how Kito could <b>use</b> this comparison?',
      ['Find out why customers choose the rival, then improve its own offer', 'Report the 9% figure to staff and managers, but change nothing about how it trades', 'Stop measuring market share because the figure is low', 'Assume its own revenue must be falling'],
      'Comparing with rivals is only useful if it leads to a decision. Finding out why the rival is ahead lets Kito act to close the gap.'),
    M1('evaluate-judgement', 'A new restaurant has made a loss in its first year because of high set-up costs, but bookings rise every month. Which measure gives the fairest picture of its success so far?',
      ['Growth in the number of customers and bookings', 'Profit for the first year', 'Dividends paid to shareholders', 'Total corporation tax paid'],
      'In year one, set-up costs make profit look poor. Rising bookings show the business is building a customer base, which is a better early sign of success.'),
    M1('evaluate-judgement', 'A student writes: "Profit doubled this year, so the business is clearly successful." The same business saw staff turnover and customer complaints both rise sharply. What is the main flaw in the judgement?',
      ['It relies on profit alone and ignores falling staff and customer satisfaction', 'Profit is not a measure of success at all', 'Staff turnover only matters to shareholders', 'Rising complaints always lead to higher profit, so they support the judgement'],
      'A balanced judgement weighs money measures against satisfaction measures. Rising complaints and staff leaving may harm future sales and costs.'),
    M1('interpret-comparison', 'Ashgrove Garden Centres\' results are shown below.<br><table class="mc-table"><tr><th></th><th>2024</th><th>2025</th><th>2026</th></tr><tr><td>Revenue ($m)</td><td>4.2</td><td>4.6</td><td>5.1</td></tr><tr><td>Staff turnover</td><td>9%</td><td>15%</td><td>24%</td></tr></table>Which statement is best supported by the data?',
      ['Revenue is rising, but staff turnover suggests worsening employee satisfaction', 'The business is unsuccessful because revenue has fallen', 'Rising staff turnover shows employees are happier each year', 'Profit must have risen every year, because revenue went up in every year shown'],
      'Revenue rose each year, but more staff leaving each year points to unhappy employees. Revenue alone does not tell us about profit, because costs are not given.', 'garden'),
    M1('choose-measure', 'Which one of the following measures the <b>growth</b> of a business?',
      ['An increase in the number of branches from 6 to 9', 'A fall in customer complaints from 40 to 25', 'A fall in staff absence from 5% to 3%', 'An increase in the share price of a rival firm'],
      'Growth means the business is getting bigger: more sales, outlets, products or staff. Fewer complaints or lower absence are satisfaction measures.'),
    M1('choose-measure', 'Which answer is the best developed explanation of using customer satisfaction to measure success?',
      ['High satisfaction means customers return and recommend the business, so repeat sales rise and revenue grows',
       'Customer satisfaction is how happy customers are with a business',
       'The business could carry out a survey to measure customer satisfaction',
       'Customer satisfaction is shown by profit, so if profit rises customers must be satisfied and will buy more again'],
      'The best answer links the measure to what it shows (customers return and recommend) and then to an outcome (higher revenue). The others define or describe the measure, or wrongly treat profit as proof that customers are satisfied.'),
    M1('choose-measure', 'A business finds that its employee satisfaction scores have risen sharply. Which chain best shows why this matters?',
      ['Fewer staff leave, so recruitment and training costs fall, helping profit', 'Staff are happier, so the business has more shareholders', 'Happier staff mean customers pay higher prices', 'Employee satisfaction is easy to measure, so the scores are always fully accurate'],
      'Satisfied staff stay longer, so recruitment and training costs fall. Lower costs support higher profit. The other options do not follow logically.'),
    M1('evaluate-judgement', 'Whether a business is judged successful depends <b>most</b> on:',
      ['the objectives that the owners set for it', 'the number of employees it has', 'whether it is a sole trader or a company', 'the colour of its brand logo'],
      'Success is measured against what the business set out to do. A social enterprise meeting its social aims, or a start-up surviving its first year, can be successful without high profit.'),
    M1('measure-vs-objective', 'What does <b>market share</b> measure?',
      ['A business\'s sales as a percentage of the total sales in its market', 'The percentage of a company\'s shares owned by the public', 'The amount of profit made from each product sold', 'The number of markets a business sells in'],
      'Market share shows how big a business is compared with all its competitors in the same market. It is not about shares in the company.'),
    M1('evaluate-judgement', 'Orrin Electronics has the highest profit in its industry but its market share has fallen for three years in a row. Which judgement is best supported?',
      ['It is profitable now, but falling market share puts future success at risk', 'It is unsuccessful, because a falling market share always means the business makes losses', 'It is completely successful because profit is the only measure that matters', 'Its market share must be falling because its profit is too high'],
      'A balanced judgement accepts the strong profit but notes that losing share means rivals are winning customers, which could hurt profit in future.')
  ] };

  // =====================================================================
  // Exchange-rate calculations: every generator is a different question shape.
  B['BUS-CALC-01'] = { title: 'Convert prices between currencies with exchange rates', items: [
    { skill: 'multiply-rate', gen: function () {
      var p = pick([['GBP', 'EUR'], ['USD', 'KES'], ['GBP', 'PKR'], ['USD', 'MXN'], ['EUR', 'ZAR']]), a = p[0], b = p[1], r = rateFor(a, b);
      var item = pick(['laminating machine', 'commercial coffee grinder', 'industrial sewing machine', 'electric bread oven']);
      var P = rint(60, 240) * 10 + pick([0, 0.5]);
      var ans = R.roundDp(P * r, 2);
      var lead = an(CUR[b].adj); lead = lead.charAt(0).toUpperCase() + lead.slice(1);
      return { kind: 'num', q: lead + ' business buys ' + an(item) + ' from ' + an(CUR[a].adj) + ' supplier for ' + amt(a, P) + '. The exchange rate is ' + line(a, b, r) + '. How much does the business pay in ' + CUR[b].s + '? Give your answer to 2 decimal places.',
        answer: ans, unit: CUR[b].s, tol: 0.01, display: fmt(ans),
        why: 'The rate has the 1 in front of ' + CUR[a].s + ', and we are going from ' + CUR[a].s + ' to ' + CUR[b].s + ', so multiply: ' + fmt(P) + ' × ' + fmt(r) + ' = ' + amt(b, ans) + '.' };
    } },
    { skill: 'divide-rate', gen: function () {
      var a = 'GBP', b = 'CNY', r = rateFor(a, b);
      var item = pick(['silk scarf', 'bamboo cutting board', 'ceramic teapot', 'desk lamp']);
      var Pb = rint(30, 180) + pick([0, 0.5]);
      var ans = R.roundDp(Pb / r, 2);
      return { kind: 'num', q: 'A British gift shop buys ' + an(item) + ' from a Chinese supplier for ' + amt(b, Pb) + '. The exchange rate is ' + line(a, b, r) + '. What is the cost of one ' + item + ' in pounds (£)? Give your answer to 2 decimal places.',
        answer: ans, unit: '£', tol: 0.01, display: fmt(ans),
        why: 'The 1 is in front of £, and we are going from CNY to £, so divide: ' + fmt(Pb) + ' ÷ ' + fmt(r) + ' = £' + fmt(ans) + '. The answer is smaller because each pound is worth several yuan.' };
    } },
    { skill: 'quantity-total', gen: function () {
      var a = 'USD', b = 'INR', r = rateFor(a, b);
      var item = pick(['solar lanterns', 'water filters', 'bicycle helmets', 'tablet cases']);
      var q = rint(20, 80), P = rint(12, 45) + pick([0, 0.5]);
      var tot = q * P, ans = R.roundDp(tot * r, 2);
      return { kind: 'num', q: 'An Indian retailer orders ' + q + ' ' + item + ' from an American supplier at ' + amt(a, P) + ' each. The exchange rate is ' + line(a, b, r) + '. How much does the retailer pay in INR for the whole order? Give your answer to 2 decimal places.',
        answer: ans, unit: 'INR', tol: R.roundDp(0.01 + q * 0.005, 3), display: fmt(ans),
        why: 'Total in dollars = ' + q + ' × $' + fmt(P) + ' = $' + fmt(tot) + '. Going from $ (the 1) to INR, multiply: ' + fmt(tot) + ' × ' + fmt(r) + ' = ' + fmt(ans) + ' INR.' };
    } },
    { skill: 'quantity-total', gen: function () {
      var a = 'EUR', b = 'MYR', r = rateFor(a, b);
      var item = pick(['rattan chairs', 'batik cushion covers', 'wooden picture frames', 'pewter tankards']);
      var q = rint(12, 60), Pb = rint(40, 260);
      var tot = q * Pb, ans = R.roundDp(tot / r, 2);
      return { kind: 'num', q: 'A furniture shop in Portugal buys ' + q + ' ' + item + ' from a Malaysian maker at ' + amt(b, Pb, 0) + ' each. The exchange rate is ' + line(a, b, r) + '. What is the total cost in euros (€)? Give your answer to 2 decimal places.',
        answer: ans, unit: '€', tol: R.roundDp(0.01 + q * 0.005, 3), display: fmt(ans),
        why: 'Total in MYR = ' + q + ' × ' + fmt(Pb, 0) + ' = ' + fmt(tot, 0) + ' MYR. The 1 is in front of €, so going from MYR to € divide: ' + fmt(tot, 0) + ' ÷ ' + fmt(r) + ' = €' + fmt(ans) + '.' };
    } },
    { skill: 'reversed-rate', gen: function () {
      var a = 'EUR', b = 'MYR', r = rateFor(a, b);
      var Pb = rint(150, 900) * 10;
      var ans = R.roundDp(Pb / r, 2);
      return { kind: 'num', q: 'A Malaysian palm-sugar producer quotes a French chocolatier ' + amt(b, Pb, 0) + ' for one pallet. The exchange rate is written as <b>' + rline(a, b, r) + '</b>. How much is the pallet in euros (€)? Give your answer to 2 decimal places.',
        answer: ans, unit: '€', tol: 0.01, display: fmt(ans),
        why: 'Read which side has the 1: it is €. To go from MYR to €, divide: ' + fmt(Pb, 0) + ' ÷ ' + fmt(r) + ' = €' + fmt(ans) + '.' };
    } },
    { skill: 'reversed-rate', gen: function () {
      var a = 'GBP', b = 'INR', r = rateFor(a, b);
      var P = rint(18, 95) * 10;
      var ans = R.roundDp(P * r, 2);
      return { kind: 'num', q: 'A firm in Mumbai pays a London web designer ' + amt(a, P, 0) + ' for a new logo. The exchange rate is written as <b>' + rline(a, b, r) + '</b>. How much is this in INR? Give your answer to 2 decimal places.',
        answer: ans, unit: 'INR', tol: 0.01, display: fmt(ans),
        why: 'The 1 is in front of £, and we go from £ to INR, so multiply: ' + fmt(P, 0) + ' × ' + fmt(r) + ' = ' + fmt(ans) + ' INR, whichever way round the rate is written.' };
    } },
    { skill: 'quantity-total', gen: function () {
      var a = 'USD', b = 'SGD', r = rateFor(a, b);
      var wk = rint(3, 9), P = rint(18, 60) * 10;
      var tot = wk * P, ans = R.roundDp(tot * r, 2);
      return { kind: 'num', q: 'A Singapore events company hires a stage lighting rig from a US firm for ' + wk + ' weeks. The hire charge is ' + amt(a, P, 0) + ' per week. The exchange rate is ' + line(a, b, r) + '. What is the total hire cost in SGD? Give your answer to 2 decimal places.',
        answer: ans, unit: 'SGD', tol: 0.01, display: fmt(ans),
        why: 'Total in dollars = ' + wk + ' × $' + fmt(P, 0) + ' = $' + fmt(tot, 0) + '. Multiply by the rate to get SGD: ' + fmt(tot, 0) + ' × ' + fmt(r) + ' = ' + fmt(ans) + ' SGD.' };
    } },
    { skill: 'rounding', gen: function () {
      var a = 'USD', b = 'JPY', r = rateFor(a, b);
      var n = rint(3, 7), P = rint(9, 26) * 10;
      var tot = n * P, ans = R.roundDp(tot * r, 0);
      return { kind: 'num', q: 'A Japanese family books ' + n + ' nights at a beach hotel in Florida at ' + amt(a, P, 0) + ' per night. The exchange rate is ' + line(a, b, r) + '. How much do they pay in JPY? Give your answer to the nearest whole yen.',
        answer: ans, unit: 'JPY', display: fmt(ans, 0),
        why: 'Total = ' + n + ' × $' + fmt(P, 0) + ' = $' + fmt(tot, 0) + '. Then ' + fmt(tot, 0) + ' × ' + fmt(r) + ' = ' + fmt(R.roundDp(tot * r, 2)) + ', which is ' + fmt(ans, 0) + ' JPY to the nearest yen.' };
    } },
    { skill: 'rounding', gen: function () {
      var a = 'USD', b = 'MXN', r = rateFor(a, b);
      var q = rint(40, 150), Pb = rint(35, 120);
      var tot = q * Pb, exact = tot / r, ans = R.roundDp(exact, 0);
      return { kind: 'num', q: 'A Texas interior designer buys ' + q + ' handmade tiles from a Mexican workshop at ' + amt(b, Pb, 0) + ' per tile. The exchange rate is ' + line(a, b, r) + '. How much does the designer pay in dollars ($)? Give your answer to the nearest dollar.',
        answer: ans, unit: '$', tol: 1, display: fmt(ans, 0),
        why: 'Total = ' + q + ' × ' + fmt(Pb, 0) + ' = ' + fmt(tot, 0) + ' MXN. The 1 is in front of $, so divide: ' + fmt(tot, 0) + ' ÷ ' + fmt(r) + ' = ' + fmt(R.roundDp(exact, 2)) + ', which is $' + fmt(ans, 0) + ' to the nearest dollar.' };
    } },
    { skill: 'method-check', gen: function () {
      for (var k = 0; k < 20; k++) {
        var a = 'GBP', b = 'EUR', r = rateFor(a, b);
        var q = rint(8, 40), P = rint(25, 140);
        var right = R.roundDp(q * P * r, 2), d1 = R.roundDp(q * P / r, 2), d2 = R.roundDp(P * r, 2), d3 = R.roundDp(q * P + r, 2);
        var opts = ['€' + fmt(right), '€' + fmt(d1), '€' + fmt(d2), '€' + fmt(d3)];
        if (distinct(opts)) break;
      }
      return { kind: 'mcq', q: 'A Dutch garden centre buys ' + q + ' cast-iron benches from a British foundry at ' + amt(a, P, 0) + ' each. The exchange rate is ' + line(a, b, r) + '. How much does the garden centre pay in euros?', options: opts, answer: 0,
        why: 'Total = ' + q + ' × £' + fmt(P, 0) + ' = £' + fmt(q * P, 0) + ', then × ' + fmt(r) + ' = €' + fmt(right) + '. The wrong options come from dividing by the rate, forgetting the quantity, or adding the rate.' };
    } },
    { skill: 'method-check', gen: function () {
      for (var k = 0; k < 20; k++) {
        var a = 'USD', b = 'KES', r = rateFor(a, b);
        var q = rint(5, 30), Pb = rint(25, 60) * 1000;
        var right = R.roundDp(q * Pb / r, 2), d1 = R.roundDp(q * Pb * r, 2), d2 = R.roundDp(Pb / r, 2), d3 = R.roundDp(q * Pb - r, 2);
        var opts = ['$' + fmt(right), '$' + fmt(d1), '$' + fmt(d2), '$' + fmt(d3)];
        if (distinct(opts)) break;
      }
      return { kind: 'mcq', q: 'A US coffee roaster buys ' + q + ' sacks of coffee beans from a Kenyan co-operative at ' + amt(b, Pb, 0) + ' per sack. The exchange rate is ' + line(a, b, r) + '. How much does the roaster pay in dollars?', options: opts, answer: 0,
        why: 'Total = ' + q + ' × ' + fmt(Pb, 0) + ' = ' + fmt(q * Pb, 0) + ' KES. The 1 is in front of $, so divide: ' + fmt(q * Pb, 0) + ' ÷ ' + fmt(r) + ' = $' + fmt(right) + '. Multiplying would give far too many dollars.' };
    } },
    { skill: 'compare-and-change', gen: function () {
      var r1 = rateFor('GBP', 'EUR'), r2 = rateFor('GBP', 'USD');
      var Pe = rint(380, 720), Pd = R.roundDp(Pe * r2 / r1 * (pick([0.9, 0.94, 1.06, 1.1])), 0);
      var ce = R.roundDp(Pe / r1, 2), cd = R.roundDp(Pd / r2, 2);
      if (ce === cd) cd = R.roundDp(cd + 3, 2);
      var cheaper = ce < cd ? 'the Italian supplier' : 'the American supplier', diff = R.roundDp(Math.abs(ce - cd), 2);
      return { kind: 'num', q: 'A British bike shop can buy the same e-bike motor from an Italian supplier for €' + fmt(Pe, 0) + ' or from an American supplier for $' + fmt(Pd, 0) + '. The exchange rates are £1 = €' + fmt(r1) + ' and £1 = $' + fmt(r2) + '. Work out each price in pounds to 2 decimal places. How much cheaper, in £, is the cheaper supplier?',
        answer: diff, unit: '£', tol: 0.02, display: fmt(diff),
        why: 'Italian: ' + fmt(Pe, 0) + ' ÷ ' + fmt(r1) + ' = £' + fmt(ce) + '. American: ' + fmt(Pd, 0) + ' ÷ ' + fmt(r2) + ' = £' + fmt(cd) + '. So ' + cheaper + ' is cheaper by £' + fmt(diff) + '.' };
    } },
    { skill: 'divide-rate', gen: function () {
      var a = 'GBP', b = 'PKR', r = rateFor(a, b);
      var q = pick([20, 25, 40, 50]), Pu = rint(30, 90) * 50;
      var tot = q * Pu, ans = R.roundDp(Pu / r, 2);
      return { kind: 'num', q: 'A UK sports shop paid a total of ' + amt(b, tot, 0) + ' to a Sialkot manufacturer for ' + q + ' hand-stitched footballs. The exchange rate is ' + line(a, b, r) + '. What was the price of <b>one</b> football in pounds (£)? Give your answer to 2 decimal places.',
        answer: ans, unit: '£', tol: 0.01, display: fmt(ans),
        why: 'Price per ball in PKR = ' + fmt(tot, 0) + ' ÷ ' + q + ' = ' + fmt(Pu, 0) + ' PKR. Going from PKR to £, divide: ' + fmt(Pu, 0) + ' ÷ ' + fmt(r) + ' = £' + fmt(ans) + '.' };
    } },
    { skill: 'compare-and-change', gen: function () {
      var a = 'GBP', b = 'EUR', r = rateFor(a, b);
      var P = rint(120, 900) * 10;
      var E = R.roundDp(P * r, 2);
      return { kind: 'num', q: 'A Scottish distillery paid £' + fmt(P, 0) + ' for a shipment of oak casks. The French cooperage that made them received €' + fmt(E) + '. Calculate the exchange rate used, in the form £1 = €?. Give your answer to 2 decimal places.',
        answer: r, unit: '€', tol: 0.005, display: fmt(r),
        why: 'Euros per pound = ' + fmt(E) + ' ÷ ' + fmt(P, 0) + ' = ' + fmt(r) + ', so the rate was £1 = €' + fmt(r) + '.' };
    } },
    { skill: 'compare-and-change', gen: function () {
      var r1 = rateFor('GBP', 'USD'), r2 = R.roundDp(r1 - rint(5, 15) / 100, 2);
      var P = rint(40, 160) * 100;
      var c1 = R.roundDp(P / r1, 2), c2 = R.roundDp(P / r2, 2), diff = R.roundDp(c2 - c1, 2);
      return { kind: 'num', q: 'A London shop orders vintage guitars from a US dealer costing $' + fmt(P, 0) + '. When it ordered, the rate was £1 = $' + fmt(r1) + '. By the time it pays, the rate is £1 = $' + fmt(r2) + '. Work out each cost in pounds to 2 decimal places. How much <b>more</b> does the shop pay in £?',
        answer: diff, unit: '£', tol: 0.02, display: fmt(diff),
        why: 'Before: ' + fmt(P, 0) + ' ÷ ' + fmt(r1) + ' = £' + fmt(c1) + '. After: ' + fmt(P, 0) + ' ÷ ' + fmt(r2) + ' = £' + fmt(c2) + '. Extra cost = £' + fmt(c2) + ' − £' + fmt(c1) + ' = £' + fmt(diff) + '. Each pound now buys fewer dollars.' };
    } },
    { skill: 'quantity-total', gen: function () {
      var a = 'EUR', b = 'ZAR', r = rateFor(a, b);
      var q = rint(10, 40), P = rint(30, 95), del = rint(12, 30) * 10;
      var tot = q * P + del, ans = R.roundDp(tot * r, 2);
      return { kind: 'num', q: 'A Cape Town restaurant orders ' + q + ' cast-iron pans from a German maker at €' + fmt(P, 0) + ' each, plus a delivery charge of €' + fmt(del, 0) + '. The exchange rate is ' + line(a, b, r) + '. What is the total cost in ZAR? Give your answer to 2 decimal places.',
        answer: ans, unit: 'ZAR', tol: 0.01, display: fmt(ans),
        why: 'Total in euros = ' + q + ' × €' + fmt(P, 0) + ' + €' + fmt(del, 0) + ' = €' + fmt(tot, 0) + '. Then multiply: ' + fmt(tot, 0) + ' × ' + fmt(r) + ' = ' + fmt(ans) + ' ZAR.' };
    } },
    { skill: 'divide-rate', gen: function () {
      var a = 'EUR', b = 'ZAR', r = rateFor(a, b);
      var q = rint(15, 60), Pb = rint(18, 60) * 10;
      var tot = q * Pb, ans = R.roundDp(tot / r, 2);
      return { kind: 'num', q: 'A South African winery sells cases of wine to a Belgian importer at ' + amt(b, Pb, 0) + ' per case. The importer buys ' + q + ' cases. The exchange rate is ' + line(a, b, r) + '. How much does the importer pay in euros (€)? Give your answer to 2 decimal places.',
        answer: ans, unit: '€', tol: R.roundDp(0.01 + q * 0.005, 3), display: fmt(ans),
        why: 'Total = ' + q + ' × ' + fmt(Pb, 0) + ' = ' + fmt(tot, 0) + ' ZAR. The 1 is in front of €, so divide: ' + fmt(tot, 0) + ' ÷ ' + fmt(r) + ' = €' + fmt(ans) + '.' };
    } },
    { skill: 'method-check', gen: function () {
      var a = 'GBP', b = 'INR', r = rateFor(a, b), P = rint(30, 90) * 10;
      return { kind: 'mcq', q: 'A British tea merchant pays an Assam estate for a crate of tea priced at ' + amt(b, P * 100, 0) + '. The exchange rate is ' + line(a, b, r) + '. Which calculation gives the price in pounds?',
        options: [fmt(P * 100, 0) + ' ÷ ' + fmt(r), fmt(P * 100, 0) + ' × ' + fmt(r), fmt(P * 100, 0) + ' − ' + fmt(r), fmt(r) + ' ÷ ' + fmt(P * 100, 0)], answer: 0,
        why: 'The 1 is in front of £. Going from INR to £ means dividing by the rate. Multiplying would give a huge number of pounds, and subtracting the rate makes no sense.' };
    } },
    { skill: 'method-check', gen: function () {
      var a = 'USD', b = 'KES', r = rateFor(a, b), q = rint(6, 20), P = rint(15, 60), right = R.roundDp(q * P * r, 2);
      var errs = [
        ['divided by the exchange rate instead of multiplying', R.roundDp(q * P / r, 2)],
        ['forgot to multiply by the number of items', R.roundDp(P * r, 2)],
        ['added the exchange rate instead of multiplying by it', R.roundDp(q * P + r, 2)]
      ];
      var e = pick(errs);
      var opts = ['The student ' + e[0]].concat(errs.filter(function (x) { return x !== e; }).map(function (x) { return 'The student ' + x[0]; }), ['The student\'s answer is correct']);
      return { kind: 'mcq', q: 'A Nairobi gym buys ' + q + ' kettlebells from a US firm at $' + fmt(P, 0) + ' each. The rate is ' + line(a, b, r) + '. A student works out the cost in KES as <b>' + fmt(e[1]) + '</b>. What mistake did the student make?',
        options: opts, answer: 0,
        why: 'Correct: ' + q + ' × $' + fmt(P, 0) + ' = $' + fmt(q * P, 0) + ', then × ' + fmt(r) + ' = ' + fmt(right) + ' KES. The student got ' + fmt(e[1]) + ', which comes from having ' + e[0] + '.' };
    } },
    { skill: 'divide-rate', gen: function () {
      var r = 3.67, m = rint(3, 12), Pb = rint(80, 240) * 100;
      var tot = m * Pb, ans = R.roundDp(tot / r, 2);
      return { kind: 'num', q: 'A Dubai property firm pays a consultant ' + amt('AED', Pb, 0) + ' a month for ' + m + ' months. The consultant\'s US employer records the fee in dollars. The exchange rate is $1 = 3.67 AED. What is the total fee in dollars ($)? Give your answer to 2 decimal places.',
        answer: ans, unit: '$', tol: 0.01, display: fmt(ans),
        why: 'Total = ' + m + ' × ' + fmt(Pb, 0) + ' = ' + fmt(tot, 0) + ' AED. Going from AED to $ (the 1), divide: ' + fmt(tot, 0) + ' ÷ 3.67 = $' + fmt(ans) + '.' };
    } },
    { skill: 'multiply-rate', gen: function () {
      var a = 'USD', b = 'CHF', r = rateFor(a, b), d = rint(2, 6), P = rint(45, 95);
      var tot = d * P, ans = R.roundDp(tot * r, 2);
      return { kind: 'num', q: 'A Zurich hotel rents e-bikes to guests through a US booking website. A guest books an e-bike for ' + d + ' days at $' + fmt(P, 0) + ' per day. The exchange rate is ' + line(a, b, r) + '. How much does the hotel receive in CHF? Give your answer to 2 decimal places.',
        answer: ans, unit: 'CHF', tol: 0.01, display: fmt(ans),
        why: 'Total = ' + d + ' × $' + fmt(P, 0) + ' = $' + fmt(tot, 0) + '. Going from $ (the 1) to CHF, multiply: ' + fmt(tot, 0) + ' × ' + fmt(r) + ' = ' + fmt(ans) + ' CHF. CHF is worth a little more than $, so the number gets slightly smaller.' };
    } },
    { skill: 'multiply-rate', gen: function () {
      var a = 'GBP', b = 'USD', r = rateFor(a, b), kg = rint(20, 120), P = rint(8, 18) + pick([0, 0.5]);
      var tot = kg * P, ans = R.roundDp(tot * r, 2);
      return { kind: 'num', q: 'A Boston bakery buys ' + kg + ' kg of Scottish shortbread from a supplier in Edinburgh at £' + fmt(P) + ' per kg. The exchange rate is ' + line(a, b, r) + '. What is the cost in dollars ($)? Give your answer to 2 decimal places.',
        answer: ans, unit: '$', tol: 0.01, display: fmt(ans),
        why: 'Total = ' + kg + ' × £' + fmt(P) + ' = £' + fmt(tot) + '. Going from £ (the 1) to $, multiply: ' + fmt(tot) + ' × ' + fmt(r) + ' = $' + fmt(ans) + '.' };
    } },
    { skill: 'method-check', gen: function () {
      var a = 'GBP', b = 'PKR', r = rateFor(a, b), P = rint(30, 90);
      var right = R.roundDp(P * r, 2);
      var opts = [fmt(right) + ' PKR', fmt(R.roundDp(P / r, 2)) + ' PKR', fmt(R.roundDp(P * r * 10, 2)) + ' PKR', fmt(R.roundDp(P * r / 100, 2)) + ' PKR'];
      return { kind: 'mcq', q: 'A Karachi student buys a textbook from a UK website for £' + fmt(P, 0) + '. The rate is ' + line(a, b, r) + '. Using a sense check, which amount in PKR is correct?',
        options: opts, answer: 0,
        why: 'One pound buys about ' + fmt(r, 0) + ' rupees, so £' + fmt(P, 0) + ' must be about ' + fmt(P, 0) + ' × ' + fmt(r, 0) + ' rupees: ' + fmt(P, 0) + ' × ' + fmt(r) + ' = ' + fmt(right) + ' PKR. The other amounts are far too small or ten times too large.' };
    } }
  ] };

  // =====================================================================
  B['BUS-S1-22'] = { title: 'Effects of interest rate changes', items: [
    M1('define', 'What does the term <b>interest rate</b> mean?',
      ['The cost of borrowing money, or the reward for saving, as a percentage', 'The percentage of its yearly profit that a company pays out to its shareholders', 'The price of one currency in terms of another currency', 'The percentage increase in prices across the economy in a year'],
      'An interest rate is the cost of borrowing, or the reward for saving, shown as a percentage. Dividends, exchange rates and inflation are different ideas.'),
    M1('define', 'A student is asked to define interest rate. Which answer would earn the mark?',
      ['The cost of borrowing money, as a percentage of the amount borrowed', 'Something that goes up and down and makes loans harder for businesses to get', 'The money that a bank lends to a business to buy equipment', 'The amount of tax a business pays on its profit'],
      'The definition must say what an interest rate is: the cost of borrowing (or reward for saving) as a percentage. The second describes an effect, the third a loan and the fourth tax.'),
    M1('business-costs', 'Interest rates rise from 4% to 6%. Which one of the following is the most likely effect on a business with a large bank loan at a variable rate?',
      ['Higher loan repayments', 'Lower labour costs', 'Higher net cash flow', 'Higher sales revenue'],
      'With a variable-rate loan, the interest charged rises with the rate, so repayments go up. That increases costs and reduces cash flow, not the opposite.'),
    M1('business-costs', 'Interest rates fall from 7% to 4%. What is the most likely effect on businesses planning to expand?',
      ['Borrowing becomes cheaper, so more firms take out loans to invest', 'Loans become dearer, so businesses delay or cancel their expansion plans', 'Wages fall, so businesses hire more staff', 'Exchange rates rise, so exports become cheaper'],
      'Lower rates reduce the cost of loans, so investment projects become more affordable and more likely to make a profit after interest.'),
    M1('consumer-spending', 'Interest rates rise sharply. How are households with large mortgages most likely to be affected?',
      ['Their repayments rise, leaving less disposable income for other spending', 'Their repayments fall, so they spend more in shops', 'Their wages rise, so they save more each month', 'Their homes become cheaper to heat and run'],
      'Higher rates increase mortgage and loan repayments, so households have less money left to spend, which reduces demand for many products.'),
    M1('consumer-spending', 'Why might higher interest rates reduce consumer spending, even for people who have no loans?',
      ['Saving becomes more rewarding, so people save more and spend less', 'Prices in shops automatically fall by the same amount when interest rates rise', 'Banks stop paying any interest on savings accounts', 'People pay less income tax when interest rates rise'],
      'Higher rates mean savers earn more interest, so saving becomes more attractive than spending. This is the second channel by which rates affect demand.'),
    M1('applied-context', 'Interest rates rise. Which business is likely to be hit <b>hardest</b> by a fall in demand?',
      ['A showroom selling luxury cars that most customers buy on finance', 'A bakery selling everyday bread and rolls', 'A pharmacy selling prescription medicines', 'A petrol station on a busy main road'],
      'Expensive, non-essential items bought with borrowed money become much dearer to finance, so customers delay or cancel. Bread, medicines and fuel are necessities, so demand changes little.'),
    M1('applied-context', 'Interest rates rise. Which business is most likely to <b>gain</b>?',
      ['A firm with large cash savings in the bank and no loans', 'A builder that has borrowed heavily to buy land', 'A furniture store whose customers pay by monthly credit', 'A new café paying off a large overdraft'],
      'A business with cash in the bank earns more interest when rates rise and has no extra repayments to make. The others either borrow or rely on customers who borrow.'),
    M1('chain-explain', 'Which answer is the best developed explanation of how a rise in interest rates can affect a business?',
      ['Repayments on its bank loan rise, so its costs increase, which reduces its profit and could delay its expansion plans',
       'Interest rates are the cost of borrowing money from a bank',
       'The business will be affected because interest rates have gone up',
       'Repayments on its bank loan fall, so its costs decrease, which raises its profit and lets it expand more quickly than before'],
      'The best answer gives the direction (higher repayments) and two linked steps (higher costs, lower profit and delayed expansion). The others define the term, repeat the question, or get the direction wrong: loan repayments rise, not fall.'),
    MU('chain-explain', 'Kova Kitchens has a large overdraft and interest rates have just risen. Select the <b>two</b> statements that develop this into a chain of reasoning.',
      ['The interest charged on its overdraft increases, so more cash leaves the business each month', 'With less cash available, Kova may have to delay buying new equipment'],
      ['An overdraft lets a business take more money out of its account than it has', 'Interest rates are set as a percentage', 'Higher interest rates mean Kova will sell more kitchens'],
      'The chain runs: higher overdraft interest, worse cash flow, delayed investment. The definition and the "percentage" point add nothing, and higher rates do not raise sales.'),
    M1('chain-explain', 'A student writes: "Interest rates rise, so customers have less to spend." Which step would best develop this for a holiday company?',
      ['So fewer families book foreign holidays, and the company\'s revenue falls', 'So the holiday company pays lower wages to its staff', 'So the holiday company\'s loans become cheaper', 'So more customers book luxury cruises'],
      'Holidays are non-essential, so when families have less disposable income they cut back on them, reducing the company\'s sales revenue.'),
    M1('direction-error', 'A student writes: "When interest rates rise, people buy more products on credit, so sales increase." What is wrong with this?',
      ['Credit becomes dearer, so people usually buy less on credit', 'Nothing; higher rates always increase sales', 'Interest rates only affect businesses, not the customers who buy from them', 'Credit is not affected by interest rates at all'],
      'This gets the direction wrong. Higher rates raise the cost of buying on credit, so demand for items bought on credit usually falls.'),
    M1('business-costs', 'How does a rise in interest rates usually affect the <b>net cash flow</b> of a business with an overdraft?',
      ['It worsens, because more cash is paid out in interest', 'It improves, because the bank pays the business more', 'It is unchanged, because interest is not a cash payment', 'It improves, because customers pay faster'],
      'Interest on an overdraft is a cash outflow. When the rate rises, outflows rise, so net cash flow falls.'),
    M1('evaluate', 'Interest rates rise from 3% to 6%. How much this affects Halden Haulage\'s costs will depend <b>most</b> on:',
      ['how much it has borrowed and whether its loans are fixed or variable', 'how many lorries its rivals own', 'whether it is classed as a primary, secondary or tertiary sector business', 'how many shareholders it has'],
      'A business with little debt, or with fixed-rate loans, will see little change in repayments. A business with large variable-rate loans will be hit hard.'),
    M1('evaluate', 'Pellucid Glass has a fixed-rate loan for the next five years. Interest rates rise. What is the effect on its loan repayments?',
      ['They stay the same, because the rate on the loan is fixed', 'They rise immediately by the same amount as the rate rise', 'They fall, because fixed-rate loans move the opposite way', 'They stop, because the bank cancels the loan'],
      'A fixed-rate loan keeps the same interest rate for the agreed period, so repayments do not change. The business may still be hit by lower customer spending.'),
    M1('business-costs', 'Ferris Engineering planned to borrow $500,000 to build a new workshop. Interest rates then rise from 3% to 7%. What is the most likely decision?',
      ['Delay or scale back the expansion, because the loan will now cost much more', 'Borrow more, because loans are now cheaper', 'Expand faster, because customers will spend more', 'Cut prices, because interest rates have fallen'],
      'At 7% the yearly interest is more than double what it would be at 3%, so the project may no longer be profitable. Many firms postpone investment when rates rise.'),
    M1('consumer-spending', 'Interest rates fall. Why might sales at Hearthstone Furnishings, which sells sofas and beds, increase?',
      ['Lower loan and mortgage repayments leave households more to spend', 'Lower interest rates make sofas cheaper to manufacture', 'Lower interest rates mean people save more of their income and spend less', 'Lower interest rates force shops to cut their prices'],
      'When rates fall, borrowers pay less interest, so disposable income rises. Furniture is often a big purchase that people make when they feel better off.'),
    M1('applied-context', 'Aurum Motors sells cars, and most of its customers pay through monthly finance deals. Interest rates rise. Which effect is most important for Aurum?',
      ['Monthly payments on car finance rise, so fewer customers can afford to buy', 'Aurum\'s staff will ask for lower wages', 'Customers will switch to buying more expensive cars', 'Aurum will receive more interest from its customers\' banks'],
      'Because Aurum\'s customers borrow to buy, higher rates directly raise what they pay each month, so demand for its cars is likely to fall.'),
    M1('evaluate', 'Brindle Boutique sells designer handbags and has no loans. Interest rates rise. Which effect is likely to matter <b>more</b> for Brindle?',
      ['The fall in customer spending, because its products are expensive luxuries', 'The rise in its loan repayments, because its borrowing costs will go up sharply', 'The rise in its savings interest, which will double its profit', 'There will be no effect, because only borrowers are affected'],
      'With no loans, Brindle has no extra repayments. But designer bags are non-essential, so customers with less disposable income are likely to cut back.'),
    M1('evaluate', 'Granary Mills sells flour to bakeries and has a large variable-rate loan for its new factory. Interest rates rise. Which effect is likely to matter <b>more</b> for Granary Mills?',
      ['The rise in loan repayments, because demand for flour changes little', 'The fall in demand, because flour is a luxury product', 'The rise in exports, because higher rates make its flour cheaper abroad', 'Neither, because interest rates do not affect manufacturers'],
      'Flour is a basic product, so demand is fairly stable. But a large variable-rate loan means repayments, and therefore costs, rise straight away.'),
    M1('chain-explain', 'Which chain correctly shows how a <b>fall</b> in interest rates can help a small business that wants to grow?',
      ['Cheaper loans, so it can borrow to buy equipment, so output and sales rise', 'Dearer loans, so it saves more cash, so it grows faster', 'Cheaper loans, so its customers save more of their income, so its sales rise', 'Higher savings interest, so it borrows more, so costs fall'],
      'Lower rates make borrowing cheaper, which makes investment more affordable, which allows the business to produce and sell more.'),
    MU('consumer-spending', 'Interest rates rise. Select <b>all</b> the likely effects on consumers.',
      ['Mortgage repayments rise for many households', 'Saving becomes more attractive', 'Buying goods on credit becomes more expensive'],
      ['Shop prices fall straight away', 'Wages rise to match the new rate'],
      'Higher rates raise the cost of mortgages and credit and increase the reward for saving, so spending tends to fall. They do not directly cut prices or raise wages.')
  ] };

  // =====================================================================
  B['BUS-S1-12'] = { title: 'Choosing where to locate a business', items: [
    M1('identify-factor', 'Corrie Cement turns limestone into cement. Each tonne of cement needs about 1.5 tonnes of limestone. Which location factor is likely to matter <b>most</b>?',
      ['Being close to the limestone quarries', 'Being close to other cement makers', 'Being in a busy shopping area', 'Being near a university'],
      'The raw material is heavy and loses weight in production, so carrying it far is expensive. Locating near the quarries cuts transport costs.'),
    M1('identify-factor', 'Which location factor is likely to matter <b>most</b> to a new hair salon?',
      ['Being close to its customers, where many people pass by', 'Being close to the firms that supply its shampoo and hair dye', 'Being close to a port for exports', 'Being close to a coal mine'],
      'A salon serves customers in person, so it must be where customers can easily reach it. Supplies are light and cheap to deliver.'),
    M1('identify-factor', 'Quanta Code, a software developer, needs programmers with advanced skills. Which location factor matters most?',
      ['Being near a supply of skilled labour, such as a university city', 'Being close to supplies of raw materials such as metals and plastics', 'Being on a busy high street', 'Being close to a seaport'],
      'Software firms need skilled staff more than materials or passing trade, so they locate where qualified workers live, often near universities.'),
    M1('internet-impact', 'Velvet Lane sells clothes only through its website. How does this affect its choice of location?',
      ['It can choose a cheaper site with good transport links, as customers never visit', 'It must be on the busiest high street so that customers can find its shop easily', 'It must locate next to its competitors\' shops', 'It must locate in the same country as all of its customers'],
      'E-commerce means customers order online, so being near shoppers matters less. The firm can choose cheap land near roads for fast delivery.'),
    M1('competitors', 'Mosaic Kitchen plans to open a restaurant on a street that already has ten restaurants. Why might this be a good location?',
      ['Diners already come to the street to eat, so it can attract passing trade', 'There will be no competition on that street', 'Rents are always lower near competitors', 'Planning laws require all of a town\'s restaurants to be located in the same street'],
      'Some firms cluster near rivals because the area is known for that product, so customers already visit. The risk is strong competition, so it must stand out.'),
    M1('competitors', 'Why might a new pharmacy choose a small town that has no pharmacy, rather than a city centre with five?',
      ['It avoids direct rivals, so it can win most of the town\'s customers', 'Small towns always have higher rents', 'It wants to be close to its raw materials', 'Pharmacies are not allowed to open in city centres under planning laws'],
      'Locating away from rivals means customers in the area have nowhere else nearby to go, so the pharmacy can build a large share of local demand.'),
    M1('legal-trade-blocs', 'Lindqvist Motors, which is based outside a trading bloc, opens a factory inside the bloc. Why might it do this?',
      ['To avoid tariffs on cars it sells to customers inside the bloc', 'To pay higher taxes on the parts it imports into its home country', 'To be further from its customers', 'To avoid having to follow any laws'],
      'Goods made inside a trade bloc can usually be sold to other members free of tariffs, so locating inside makes its cars cheaper to sell there.'),
    M1('legal-trade-blocs', 'Hollin Chemicals wants to build a factory on the edge of a housing estate, but local rules only allow homes and shops there. Which location factor is this?',
      ['Legal controls, such as planning rules', 'Proximity to labour', 'Proximity to the market', 'The impact of the internet'],
      'Governments and local councils use planning laws to control where certain businesses, especially polluting ones, can be built.'),
    M1('factor-chain', 'Which answer is the best developed explanation of why being near materials matters to a business opening a new factory?',
      ['Materials travel a shorter distance, so transport costs fall, which lowers the cost of each unit and raises profit',
       'Being close to materials is an important location factor for a factory',
       'Proximity means being close to something',
       'Being near materials puts the factory near its customers, so it sells more products and its revenue and profit rise'],
      'The best answer gives the factor and two linked steps (lower transport costs, lower unit costs and higher profit). The others repeat the factor, define a word, or confuse being near materials with being near customers.'),
    MU('factor-chain', 'Tamsin Textiles needs hundreds of machinists. Select the <b>two</b> statements that develop why being near a large labour force matters.',
      ['It can recruit enough trained machinists quickly when orders rise', 'So production is not held back, and it can meet orders on time and keep customers'],
      ['A labour force is the people available to work in an area', 'Tamsin Textiles is a manufacturing business', 'Being near labour means rents are always lower'],
      'The chain runs: enough workers available, production keeps up with orders, customers stay. Definitions and unrelated facts do not develop the point.'),
    M1('choose-site', 'Brew &amp; Bloom, a café, is choosing between two sites.<br><table class="mc-table"><tr><th></th><th>Site A</th><th>Site B</th></tr><tr><td>Monthly rent</td><td>$4,800</td><td>$2,100</td></tr><tr><td>People passing per day</td><td>6,500</td><td>900</td></tr><tr><td>Location</td><td>Next to a railway station</td><td>Back street, industrial estate</td></tr></table>Which choice is best justified?',
      ['Site A, because a café relies on passing trade, which should more than cover the rent', 'Site B, because the lower rent always matters more than any other factor when choosing a site', 'Site B, because an industrial estate has fewer cafés', 'Site A, because higher rent means the café can charge any price'],
      'A café needs many customers walking past. Site A has about seven times the footfall for just over twice the rent, so it is likely to bring in far more revenue.', 'cafe-sites'),
    M1('choose-site', 'Delmar Packaging, which makes heavy cardboard boxes for factories, is choosing between a city-centre unit with high rent and an out-of-town site beside a motorway with cheap land. Which is best justified?',
      ['The motorway site, as it is cheaper and lorries can reach its customers easily', 'The city-centre unit, because many shoppers will walk past, come in and buy its boxes', 'The city-centre unit, because high rent shows a better business', 'The motorway site, because there will be no legal controls there'],
      'Delmar sells to other businesses, not passers-by, so footfall is not important. Cheap land and good road links reduce costs and delivery times.'),
    M1('choose-site', 'A student recommends a site for a new sports shop "because it has the cheapest rent", but the site is far from any town and has no parking. What is the flaw?',
      ['The student ignored how few customers could reach it, so sales would be low', 'The student should have chosen the site with the highest rent, as it is the best', 'Rent is not a cost for a sports shop', 'Sports shops should always locate next to a factory'],
      'Low cost is only one factor. A shop needs customers, and a remote site with no parking would lose far more in sales than it saves in rent.'),
    M1('relocation', 'Why might a call centre decide to relocate from a capital city to a smaller town?',
      ['Lower rents and wages in the town reduce its costs', 'Its customers must visit the call centre in person', 'Smaller towns are always closer to raw materials', 'Laws require call centres to be in towns'],
      'Call-centre work is done by phone, so it does not need to be near customers. Moving where rent and wages are lower cuts costs.'),
    M1('nature-of-business', 'Saltwick Seafoods processes freshly caught fish into frozen fillets. Why is it likely to locate near a fishing port?',
      ['The fish are perishable, so it must process them soon after they are landed', 'Fishing ports have the most shoppers', 'Frozen fillets cannot be transported by road', 'It wants to be as far away as possible from other seafood processing firms'],
      'Perishable raw materials must be processed quickly, so being close to the supply reduces spoilage and transport costs.'),
    M1('nature-of-business', 'Cascade Drinks bottles water and soft drinks. The bottled product is much heavier and bulkier than the ingredients. Where is it most likely to locate?',
      ['Close to its main markets, as the finished product is costly to move', 'Close to a sugar plantation, because sugar is the heaviest of all its inputs', 'Far from any towns, to keep rents low', 'Next to a university, to find skilled staff'],
      'When a product gains weight during production, it is cheaper to carry the light ingredients and make the heavy product near the customers.'),
    M1('internet-impact', 'Which is a likely <b>drawback</b> for a furniture business that closes its showroom and sells only online?',
      ['Customers can no longer see and try the furniture before buying, so some may buy elsewhere', 'Its rent and staff costs will rise', 'It can only sell to customers in one town', 'It must now locate next to its competitors'],
      'Online selling cuts the costs of premises, but for products customers like to see and touch, losing a showroom can reduce sales.'),
    M1('nature-of-business', 'Where is a ski-hire shop most likely to locate, and why?',
      ['At a ski resort, because that is where its customers need the equipment', 'Near a steel works, because skis contain metal', 'In a city far from the mountains, because rents are lower', 'Next to a port, so it can export skis'],
      'The nature of the business decides location. Customers hire skis where they ski, so being close to the market is vital.'),
    M1('relocation', 'Paloma Garments moves its sewing factory to a country where wages are much lower. Which location factor explains this?',
      ['The cost of labour', 'Proximity to competitors', 'Proximity to the market', 'Legal controls on advertising'],
      'Making clothes is labour-intensive, so wages are a large share of costs. Moving where labour is cheaper reduces the cost of each garment.'),
    M1('evaluate-factors', 'A business is deciding where to build a new distribution warehouse. Which factor is it likely to weigh <b>most</b>?',
      ['Access to major roads and the cost of a large site', 'How many shoppers walk past each day', 'Whether competitors\' shops are nearby', 'How close it is to a university'],
      'A warehouse needs lots of space and fast routes to customers and shops. Passing shoppers and nearby rivals matter little for this kind of business.'),
    M1('identify-factor', 'Which answer best states one factor that Dr Osei should consider when choosing a location for her new dental clinic?',
      ['Whether the area has enough local residents who need a dentist nearby', 'Whether there are raw materials in the ground', 'The location of the nearest steel works', 'A location factor such as proximity'],
      'A clinic serves patients in person, so the size of the local market matters. The last answer names no actual factor, and the others do not fit a dental clinic.'),
    M1('evaluate-factors', 'Ardent Electronics is choosing between a site near cheap labour but far from customers, and a site near customers with higher wages. The best choice depends <b>most</b> on:',
      ['whether labour costs or delivery costs make up a bigger share of its total costs', 'the colour scheme of its packaging', 'whether its competitors are sole traders', 'the number of shareholders it has'],
      'A good location decision weighs the factors that affect costs and sales most for this business. If wages are a big share of costs, cheap labour may win; if delivery is costly, being near customers may.')
  ] };

  // =====================================================================
  B['BUS-S1-16'] = { title: 'Multinationals and globalisation', items: [
    M1('define-terms', 'What is meant by a <b>multinational</b> business?',
      ['A business that operates in more than one country', 'A business that is owned by more than one person', 'A business that sells many different products', 'A business that is owned by the government'],
      'A multinational produces or sells in more than one country, for example with factories or offices abroad. The number of owners or products does not matter.'),
    M1('define-terms', 'What is meant by <b>globalisation</b>?',
      ['The growth of trade and business links across the world', 'A single business opening a branch in a second country', 'The government taking ownership of large businesses', 'A business selling its products only in its home country'],
      'Globalisation is a world-wide trend. One firm opening abroad is an example of a multinational, not the meaning of globalisation.'),
    M1('define-terms', 'Which statement correctly separates the two terms?',
      ['Globalisation is a world-wide trend; a multinational is one business that operates in several countries', 'A multinational is a world-wide trend; globalisation is one large business in many countries', 'Both terms mean a business with more than one shop', 'Globalisation only applies to governments, not businesses'],
      'Do not mix them up: globalisation describes the whole world becoming more connected, and a multinational is a single business working across borders.'),
    M1('define-terms', 'Which one of the following businesses is a multinational?',
      ['A clothing firm with factories in Vietnam and offices in France', 'A national supermarket chain with 300 stores, all in one country', 'A sole trader who runs a bakery in her home town', 'A large bus company that runs routes in only one country'],
      'Operating in more than one country is the key test. Size alone does not make a business a multinational.'),
    M1('benefits-to-business', 'Halvor Sportswear moves production from its home country to a country where wages are much lower. Which benefit to Halvor does this show?',
      ['Lower production costs, which can raise its profit margin', 'More government control over its decisions', 'Higher wages for its existing workers', 'Less competition from the local firms in its own home market'],
      'Producing where costs are lowest is a major reason to become a multinational. Lower costs per item mean more profit on each sale.'),
    M1('benefits-to-business', 'Sales of Marisol Foods fall in one country during a recession, but rise in its other markets. Which benefit of being a multinational does this show?',
      ['Risk is spread across several countries', 'It can avoid paying any taxes', 'It no longer needs to advertise', 'It can ignore the laws of other countries'],
      'Operating in many countries means a problem in one market can be balanced by success elsewhere, so the business is less likely to fail.'),
    M1('benefits-to-business', 'Why might becoming a multinational help a business gain economies of scale?',
      ['Selling to more customers lets it produce more, lowering its average cost per unit', 'It can charge higher prices in every country, because it is now a much bigger business', 'It no longer needs to buy raw materials', 'It can employ fewer managers in total'],
      'A bigger market means bigger output. Larger output spreads fixed costs and allows bulk buying, so each unit costs less to make.'),
    M1('benefits-to-business', 'Kalinda Paints, based in Australia, opens a factory in Indonesia to supply customers across South-East Asia. What is the most likely benefit?',
      ['Lower transport costs and quicker delivery to its Asian customers', 'It can avoid all competition in Indonesia', 'It no longer needs any Australian staff', 'Its products become more expensive to make'],
      'Producing close to a large market cuts shipping costs and delivery times, which can help win more sales there.'),
    M1('benefits-to-host', 'A multinational opens a car factory in a region with high unemployment. Which is the most likely benefit to the host country?',
      ['New jobs, so local people earn incomes and spend more in the area', 'Higher prices in local shops', 'Fewer people paying income tax', 'Less training for local workers'],
      'Jobs are the most direct benefit to a host country. Workers earn wages, spend them locally and help other businesses grow.'),
    M1('benefits-to-host', 'How can a multinational help a host country\'s public services?',
      ['It pays taxes that the government can spend on schools and hospitals', 'It runs all of the country\'s schools and hospitals itself, free of charge', 'It stops the government collecting taxes', 'It lends money to the government interest-free'],
      'Multinationals pay taxes on profits, and their workers pay income tax. That extra tax revenue can fund public services.'),
    M1('benefits-to-host', 'Ostrava Aerospace sets up a factory abroad and trains hundreds of local engineers. Why does this benefit the host country?',
      ['Local workers gain skills they can use in other businesses too', 'It reduces the number of jobs available locally', 'It means the host country no longer needs schools', 'It raises the prices of goods and services across the host country'],
      'Training spreads skills and know-how into the local workforce, which raises productivity across the economy, not only in the multinational.'),
    MU('drawbacks-to-host', 'Select <b>all</b> the possible <b>drawbacks</b> to a host country of a multinational locating there.',
      ['Profits may be sent back to the multinational\'s home country', 'Local businesses may be forced to close by the stronger competitor', 'Factories may harm the local environment'],
      ['New jobs are created for local people', 'The government receives extra tax revenue', 'Local workers gain new skills'],
      'The first three are drawbacks. Jobs, tax revenue and skills are benefits to the host country.'),
    M1('drawbacks-to-host', 'A large multinational supermarket opens in a small town. Which is the most likely drawback for the town?',
      ['Small local shops lose customers and some may close', 'Shoppers have a wider choice of products', 'Some local people get jobs in the new store', 'The council receives extra business tax from the store'],
      'A multinational can often charge lower prices than small firms, so local shops may lose trade. The other options are benefits.'),
    M1('whose-side', 'A question asks: "Explain one benefit to a <b>country</b> of a multinational locating there." Which answer is about the wrong side?',
      ['The multinational can cut its costs by using cheaper labour', 'Local people gain jobs, so household incomes rise', 'The government gains extra tax revenue to spend on public services', 'Local workers learn new skills through training'],
      'Cheaper labour benefits the business, not the host country. Always check whose side the question asks about: the firm or the country.'),
    M1('whose-side', 'A question asks for a benefit to a <b>business</b> of becoming a multinational. Which answer fits?',
      ['It can sell to customers in many countries, raising revenue', 'The host country gains more tax revenue', 'Local people in the host country get new jobs in its factories', 'The host government can spend more on roads'],
      'More customers and higher revenue are a gain for the business. The other three are benefits to the host country.'),
    M1('globalisation', 'Which is an <b>opportunity</b> that globalisation gives to a small business?',
      ['It can sell to customers in other countries through its website', 'It faces more competition from foreign firms in its home market', 'It must pay higher wages to its local workers', 'It can no longer import any materials'],
      'Globalisation opens up world markets, even to small firms selling online. More foreign competition is a threat, not an opportunity.'),
    M1('globalisation', 'Which is a <b>threat</b> to a small local shoe maker caused by globalisation?',
      ['Cheaper imported shoes take some of its customers', 'It can buy leather from suppliers in other countries', 'It can sell its shoes to tourists online', 'It can learn new designs from abroad'],
      'With more world trade, cheaper foreign products enter the home market, increasing competition. The other options are opportunities.'),
    M1('chain-explain', 'Which answer is the best developed explanation of one benefit to a business of becoming a multinational?',
      ['It gains access to more customers abroad, so its sales rise, which increases revenue and can raise profit',
       'A multinational is a business that operates in more than one country',
       'It can benefit from being a multinational',
       'It gains access to more customers abroad, so the host country gains jobs and more tax revenue for its government'],
      'The best answer gives one benefit then two linked steps (more sales, higher revenue and profit). The others are a definition, a restatement, or a chain about the host country rather than the business.'),
    MU('chain-explain', 'A multinational opens a factory in a host country. Select the <b>two</b> statements that develop the point "it creates jobs" into a chain showing a benefit to the country.',
      ['Workers earn incomes, so they spend more in local shops', 'Higher spending helps other local businesses grow and the government collects more tax'],
      ['Multinationals operate in more than one country', 'The multinational can reduce its wage costs', 'Jobs are positions of paid employment'],
      'The chain runs: jobs, incomes, spending, growth of local firms and tax. A definition or a gain to the business does not develop a benefit to the country.'),
    M1('group-ownership', 'Saffron Group owns a chain of 60 hotels across Asia and also owns a new bottled-water brand. Which is the most likely benefit to the water brand of being owned by Saffron Group?',
      ['Its water can be sold in all of the group\'s hotels, giving it guaranteed sales', 'It no longer needs to make a profit', 'It cannot be affected by competition', 'It has unlimited liability for the group\'s debts'],
      'A large group can support a new brand with its outlets, brand name and money. Selling through the hotels gives the water brand customers straight away.'),
    M1('evaluate-host', 'A student writes: "A multinational always benefits the country where it locates." What is the best counter-argument?',
      ['Profits may go abroad and local firms may close, so the gain depends on how it operates', 'Multinationals never create any jobs', 'Host countries cannot collect tax from multinationals', 'Multinationals are owned by the host government'],
      'A balanced view weighs jobs and tax against drawbacks such as profits leaving the country and harm to local firms or the environment.'),
    M1('evaluate-host', 'Whether a multinational benefits a host country depends <b>most</b> on:',
      ['whether it employs and trains local people and how much of its profit stays in the country', 'what colour its logo is', 'how many products it sells in its home country', 'whether its head office is a rented building'],
      'If the multinational hires local workers, pays fair wages and taxes and reinvests locally, the host gains more. If it brings in its own staff and sends profits home, the gains are smaller.')
  ] };
})();
