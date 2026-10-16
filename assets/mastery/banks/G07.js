/* Group G07 mastery bank: Selection, workplace law, safety and motivation theory; Further topics: dismissal, averages and productivity. Original questions, not copied from past papers. */
(function () {
  'use strict';
  var B = window.MASTERY_BANKS = window.MASTERY_BANKS || {};
  var R = window.Mastery;   // R.roundDp(x, dp), R.roundSf(x, n): correct half-up rounding

  function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function fmt(n) {
    var s = String(n), parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  function listAnd(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }
  function money2(x) { var v = R.roundDp(x, 2).toFixed(2); return fmt(v); }
  function mc(skill, q, options, answer, why, extra) {
    var o = { skill: skill, kind: 'mcq', q: q, options: options, answer: answer, why: why };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  function mu(skill, q, options, answers, why, extra) {
    var o = { skill: skill, kind: 'multi', q: q, options: options, answers: answers, why: why };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  function table(head, rows) {
    var h = '<table class="mc-table"><tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>';
    rows.forEach(function (r) { h += '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; });
    return h + '</table>';
  }

  /* ===================== BUS-S2-14 Equal opportunities and minimum wage laws ===================== */
  B['BUS-S2-14'] = { title: 'Equal opportunities and minimum wage laws', items: [
    mc('protected-characteristic', 'Under equal opportunities laws, which one of these characteristics is protected?',
      ['Religion', 'Work experience', 'Qualifications', 'Typing speed'], 0,
      'Religion is a protected characteristic. A business is allowed to choose staff on experience, qualifications or skills, because these relate to doing the job.'),
    mc('protected-characteristic', 'Which one of these is a protected characteristic under equal opportunities legislation?',
      ['Disability', 'Ability to drive', 'Previous salary', 'Personality type'], 0,
      'Disability is protected, so a business must not treat a disabled person unfairly. Ability, past pay and personality are not on the protected list.'),
    mu('protected-characteristic', 'Select <b>all</b> the characteristics that equal opportunities laws protect from discrimination.',
      ['Gender', 'Race', 'Age', 'Skills', 'Political views', 'Experience'], [0, 1, 2],
      'Gender, race and age are protected characteristics (along with disability, religion and sexual orientation). Skills and experience are fair reasons to choose staff, and political views are not on the syllabus list.'),
    mc('protected-characteristic', 'Which one of the following is <b>not</b> a protected characteristic in equal opportunities law?',
      ['Political views', 'Race', 'Sexual orientation', 'Gender'], 0,
      'The syllabus lists gender, race, disability, religion, sexual orientation and age. Political views are not on that list.'),
    mc('protected-characteristic', 'A seaside café turns down an applicant for a waiter job only because she is 58 years old. Which type of discrimination is this?',
      ['Age discrimination', 'Disability discrimination', 'Paying below the minimum wage', 'Discrimination by ability'], 0,
      'The applicant was rejected only because of her age, and age is a protected characteristic, so this is age discrimination under equal opportunities law.'),
    mc('protected-characteristic', 'Discrimination at work means:',
      ['treating someone unfairly because of who they are, such as their race or religion', 'choosing the applicant with the best qualifications and experience for the job', 'paying a worker the lowest hourly rate that the law allows', 'giving more responsibility and promotion to staff who perform well'], 0,
      'Discrimination is unfair treatment because of who a person is. Choosing staff on qualifications or performance is fair and lawful.'),

    mc('fair-practice', 'A garden centre is choosing between applicants for a sales assistant job. Which reason for rejecting an applicant is <b>lawful</b>?',
      ['He cannot handle customer payments, which the job requires', 'He is a Sikh and may want time off for religious festivals', 'He uses a wheelchair, so a ramp would need to be fitted', 'He is a man, and most of the customers are women'], 0,
      'Rejecting someone because they lack a skill the job needs is fair. Religion, disability and gender are protected characteristics, so rejecting him for those reasons is discrimination.'),
    mc('fair-practice', 'Which action shows a furniture factory following equal opportunities law on pay?',
      ['Paying men and women the same hourly rate for the same assembly work', 'Paying female assemblers less because fewer women apply', 'Paying workers of one religion a higher rate', 'Paying disabled assemblers less to cover the cost of adapted tools'], 0,
      'Equal opportunities law requires equal pay for the same work, whatever a worker\'s gender, religion or disability.'),
    mc('fair-practice', 'A call centre employs a new adviser who uses a wheelchair. Which change best shows the business complying with equal opportunities law?',
      ['Fitting a ramp and providing a desk at the right height', 'Paying her a lower wage to cover the cost of the changes', 'Placing her in a separate room away from her team', 'Leaving her out of training because she may need extra support'], 0,
      'Businesses should make reasonable changes so disabled people can work, such as ramps or adapted equipment. Lower pay, separation or missing training would be unfair treatment.'),
    mc('fair-practice', 'Which job advertisement follows equal opportunities law?',
      ['Experienced chef wanted. Food hygiene certificate required.', 'Young, energetic men wanted to join our busy kitchen team.', 'Chef wanted. Applicants must be under 30 years of age.', 'Chef wanted. Only applicants of our faith need apply.'], 0,
      'The first advert asks only for job-related experience and a certificate. The others exclude people because of gender, age or religion, which are protected characteristics.'),
    mu('fair-practice', 'Select <b>all</b> the practices that would break equal opportunities law.',
      ['Interviewing only male applicants for warehouse jobs', 'Refusing an employee a training course because of her religion', 'Choosing the applicant with the most relevant experience for the job', 'Paying a disabled worker less than colleagues for the same work', 'Requiring a driving licence for a delivery driver job'], [0, 1, 3],
      'Excluding by gender, refusing training because of religion and paying a disabled worker less are all discrimination. Experience and a driving licence are genuine job requirements.'),
    mc('fair-practice', 'A bank must promote one of its branch officers to manager. On which basis should it decide, to follow equal opportunities law?',
      ['Each officer\'s performance record and skills', 'Which officer is youngest', 'Which officer shares the owner\'s religion', 'Which officer is the same gender as the current managers'], 0,
      'Promotion must be open to all and based on job-related factors such as performance. Age, religion and gender are protected characteristics.'),

    mc('minimum-wage', 'Which one of the following describes the minimum wage?',
      ['The lowest hourly rate an employer is legally allowed to pay a worker', 'A fixed yearly amount that is paid to a worker in twelve monthly parts', 'Extra pay for any hours worked beyond the normal working week', 'A percentage of the value of the sales a worker makes'], 0,
      'The minimum wage is the legal floor for pay per hour. A fixed yearly amount is a salary, extra hours earn overtime and a percentage of sales is commission.'),
    mc('minimum-wage', 'Which statement about minimum wage laws is correct?',
      ['A business may pay more than the minimum wage, but not less', 'Each business sets its own minimum wage for its own workers', 'The minimum wage only applies to managers and supervisors', 'The minimum wage is the average wage paid in a country'], 0,
      'The government sets the minimum wage as the lowest legal rate. Businesses are free to pay above it, but paying below it breaks the law.'),
    { skill: 'minimum-wage', gen: function () {
      var min = pick([9.5, 10, 10.5, 11, 11.5, 12]);
      var paid = R.roundDp(min - pick([0.25, 0.5, 0.75, 1]), 2);
      var hours = rint(30, 40);
      var extra = R.roundDp((min - paid) * hours, 2);
      var shop = pick(['A car wash', 'A fruit-packing firm', 'A dry cleaner', 'A small hotel', 'A takeaway restaurant']);
      return { kind: 'num', q: shop + ' pays one worker $' + money2(paid) + ' per hour for a ' + hours + '-hour week. The minimum wage is $' + money2(min) + ' per hour.<br>How much more must the business pay this worker each week to comply with the minimum wage law? Give your answer in $ to 2 decimal places.',
        answer: extra, unit: '$', tol: 0.005, display: money2(extra),
        why: 'The worker is underpaid by $' + money2(min) + ' − $' + money2(paid) + ' = $' + money2(min - paid) + ' per hour. Over ' + hours + ' hours that is $' + money2(min - paid) + ' × ' + hours + ' = $' + money2(extra) + ' per week.' };
    } },
    { skill: 'minimum-wage', gen: function () {
      var min = pick([8.5, 9, 9.5, 10, 10.5, 11]);
      var hours = rint(4, 9) * 4;
      var pool = [R.roundDp(min - 0.4, 2), min, R.roundDp(min + 0.6, 2), R.roundDp(min - 0.1, 2), R.roundDp(min - 0.75, 2), R.roundDp(min + 1.25, 2)];
      var order = [0, 1, 2, 3, 4, 5].sort(function () { return Math.random() - 0.5; }).slice(0, 4);
      if (!order.some(function (i) { return pool[i] < min; })) order[0] = 0;
      if (!order.some(function (i) { return pool[i] >= min; })) order[1] = 1;
      var rates = order.map(function (i) { return pool[i]; });
      var names = ['Amara', 'Bilal', 'Chen', 'Dina'];
      var below = [], ok = [];
      rates.forEach(function (r, i) { (r < min ? below : ok).push(i); });
      var rows = names.map(function (n, i) { return [n, '$' + money2(rates[i])]; });
      return { kind: 'multi', q: 'The minimum wage in a country is $' + money2(min) + ' per hour. The table shows the hourly pay of four workers at a laundry, who each work ' + hours + ' hours a week.' + table(['Worker', 'Hourly pay'], rows) + 'Select <b>all</b> the workers who are paid less than the law allows.',
        options: names, answers: below, keepOrder: true,
        why: 'Any hourly rate below $' + money2(min) + ' breaks the law. ' + listAnd(below.map(function (i) { return names[i] + ' ($' + money2(rates[i]) + ')'; })) + (below.length > 1 ? ' are' : ' is') + ' below it. Being paid exactly the minimum or more is legal: ' + ok.map(function (i) { return names[i] + ' ($' + money2(rates[i]) + ')'; }).join(', ') + '.' };
    } },

    mc('why-comply', 'Which answer gives the best <b>developed</b> explanation of one reason why a business complies with equal opportunities law?',
      ['A rejected applicant could take it to a tribunal, so it may pay compensation and legal costs, which reduces its profit', 'Because equal opportunities is a law, and every business in the country has to follow the law or it will be breaking it', 'Equal opportunities means treating all employees and applicants fairly, whatever their gender, race, disability, religion or age', 'It must not discriminate on gender, race, disability, religion, sexual orientation or age when it recruits, pays or promotes staff'], 0,
      'A developed explanation gives a reason and then linked consequences: legal action, then compensation and costs, then lower profit. A definition or a list of protected groups earns little in an Explain question.'),
    mc('why-comply', 'A clothing manufacturer is found to have paid its machinists below the minimum wage for a year. Which is the most likely consequence?',
      ['It may be fined and have to pay workers the wages they are owed', 'Its profit will rise, because it kept its wage costs lower for a year', 'It will receive a government grant to help it raise its wages', 'Its workers will become more productive and less likely to leave'], 0,
      'Breaking minimum wage law can lead to fines and back pay to the workers, and the bad publicity can also damage the firm\'s reputation.'),
    mu('why-comply', 'A hotel group follows equal opportunities law when it recruits receptionists. Select the <b>two</b> linked steps that develop this into a chain of reasoning.',
      ['so it considers people from every background, giving it a wider pool of talent', 'so it is more likely to appoint the best receptionist, improving guest service', 'so it is allowed to pay its receptionists below the minimum wage while they train', 'so it will no longer need to interview applicants before offering the job', 'so it can choose staff by religion if that is what most of its guests prefer'], [0, 1],
      'Fair recruitment opens the job to everyone (wider talent pool), which makes it more likely the best person is chosen, which improves guest service. The other options are false or unlawful.'),
    mc('why-comply', 'Which step is missing from this chain?<br><i>A taxi firm refuses to hire older drivers → ? → fewer customers book its taxis.</i>',
      ['A rejected driver wins a tribunal case and the news damages its reputation', 'The firm pays all its drivers above the minimum wage to keep them happy', 'The firm buys newer, cleaner taxis so that more customers notice it', 'The firm trains its drivers to use a new app for taking bookings'], 0,
      'The link between discrimination and lost customers is the legal case and the bad publicity that harms the firm\'s reputation, so customers go elsewhere.'),
    mc('why-comply', 'A student writes: <i>"Businesses comply with equal opportunities law because of gender, race, disability and age."</i> Why would this earn few marks in a 3-mark Explain question?',
      ['It lists protected groups but gives no reason or consequence for the business', 'Age is not one of the protected characteristics, so the list is wrong', 'It should have explained the minimum wage law instead of discrimination', 'It is far too long and detailed for a question worth only 3 marks'], 0,
      'Explain answers need a reason and linked steps, such as avoiding legal action and its costs. Listing protected groups shows knowledge but no explanation.'),
    mc('effects', 'The government raises the minimum wage. Which is the most likely effect on a fast-food chain that pays most of its staff the minimum wage?',
      ['Its wage costs rise, so it may raise prices or cut staff hours', 'Its wage costs fall, so it can afford to lower its prices', 'It no longer has to follow equal opportunities law for new staff', 'Its staff will have to accept a pay cut to protect their jobs'], 0,
      'If most staff earn the minimum, a higher minimum directly increases wage costs. The chain may pass this on in higher prices or try to reduce hours.'),
    mc('effects', 'Which is a likely benefit to a business of obeying minimum wage law, even though it raises costs?',
      ['Workers feel fairly treated, so they may be more motivated and less likely to leave', 'The business is then allowed to choose its staff by age instead of skill', 'Customers are then legally required to pay higher prices to the business', 'The business no longer needs a recruitment process to find new staff'], 0,
      'Fair pay helps workers feel valued, which can improve motivation and reduce staff turnover, saving recruitment costs.'),
    mc('effects', 'A recruitment agency employs only staff from one ethnic group. Which is the most likely <b>business</b> problem this creates, apart from legal risk?',
      ['It misses talented applicants, so its staff may not be the best available', 'Its wage costs will fall below the minimum wage set by the government', 'It will have to pay overtime to all of its staff every week', 'Its staff will need more health and safety training than other firms'], 0,
      'Discrimination shrinks the pool of applicants, so the agency may miss the most skilled people and its service may suffer.')
  ] };

  /* ===================== BUS-S2-18 Health and safety at work ===================== */
  B['BUS-S2-18'] = { title: 'Health and safety at work', items: [
    mc('hazards-and-ways', 'In health and safety at work, what is a hazard?',
      ['Anything that could cause harm, such as a trailing wire or a hot oven', 'An accident at work that has already caused an injury to someone', 'A fine paid by a business for breaking health and safety law', 'A form that new workers sign to show they have read all of the safety rules'], 0,
      'A hazard is something that <i>could</i> cause harm. Businesses spot hazards and then act to reduce the risk of an accident.'),
    mc('hazards-and-ways', 'A bakery uses large ovens and dough mixers. Which is the best way for it to follow health and safety law?',
      ['Train bakers to use the mixers safely and give them heat-proof gloves', 'Pay bakers a bonus for every extra tray of loaves that they bake per hour', 'Advertise vacancies for bakers on its website and in local shops', 'Offer staff a discount on the bread and cakes the bakery sells'], 0,
      'Training and protective gloves reduce the risk of burns and injuries from the bakery\'s real hazards. The other options are about pay, recruitment or perks, not safety.'),
    mc('hazards-and-ways', 'A building company works on tall housing projects. Which is the most relevant way to comply with health and safety laws?',
      ['Provide hard hats and harnesses and check scaffolding before each shift', 'Hold a weekly sales meeting with site managers to discuss new orders', 'Pay site workers above the minimum wage so that they stay with the firm', 'Give the most experienced builders longer holidays as a reward'], 0,
      'Falls and falling objects are the main hazards on a building site, so hard hats, harnesses and scaffold checks directly reduce the risk of injury.'),
    mc('hazards-and-ways', 'A hair salon uses strong chemicals to colour hair. Which is the best way for it to follow health and safety law?',
      ['Give stylists gloves and train them to store and mix the dyes safely', 'Lower the price of hair colouring to attract more customers', 'Ask stylists to work longer shifts during the busiest weeks of the year', 'Interview stylists carefully before offering them a job'], 0,
      'Gloves and training protect stylists from the chemical hazard in this workplace, which is what the law requires.'),
    mc('hazards-and-ways', 'A leisure centre runs an indoor swimming pool. Which action best helps it comply with health and safety laws?',
      ['Employ lifeguards trained in first aid and put warning signs by wet floors', 'Open the pool for longer hours at weekends and in school holidays', 'Sell swimming costumes, towels and goggles at the reception desk', 'Offer cheaper entry for families who visit more than once a week'], 0,
      'Drowning and slipping are the main hazards at a pool. Trained lifeguards and wet-floor signs reduce these risks to staff and customers.'),
    mu('hazards-and-ways', 'Select <b>all</b> the actions that are ways a business can follow health and safety law.',
      ['Holding fire drills and keeping exits clearly marked', 'Checking electrical equipment regularly', 'Putting up signs near wet floors', 'Giving staff a discount on the products they buy', 'Starting a loyalty card scheme for regular customers', 'Cutting the price of its best-selling product for a month'], [0, 1, 2],
      'Fire drills, equipment checks and safety signs all reduce the risk of harm. Discounts, loyalty cards and price cuts are marketing or staff perks, not safety measures.'),
    mc('hazards-and-ways', 'A school science technician prepares acids for lessons. Which is the most suitable health and safety measure for this job?',
      ['Wearing safety goggles and gloves and storing acids in a locked cupboard', 'Working flexible hours during the school holidays when labs are empty', 'Being given a job title that shows seniority within the science department', 'Attending a course on using spreadsheets to record lab orders'], 0,
      'The hazard here is chemical burns, so eye and hand protection plus safe storage are the measures that apply to this job.'),

    mc('reasons', 'Which one of these is a valid reason for a business to obey health and safety laws?',
      ['To avoid being fined or taken to court', 'To make its products cheaper to advertise', 'To reduce the number of competitors in its market', 'To avoid having to pay the minimum wage'], 0,
      'Breaking health and safety law can lead to fines or legal action, so avoiding these is a key reason to comply.'),
    mc('reasons', 'Why is health and safety training often included in a new employee\'s induction?',
      ['So new staff know the hazards and emergency procedures before they start work', 'Because it replaces the need to interview applicants before they are hired', 'Because experienced staff do not need to follow the same safety rules', 'So the business can legally pay new staff a lower wage while they are still training'], 0,
      'Induction happens before new staff begin their normal duties, so it is the right time to teach them the hazards and what to do in an emergency.'),
    mc('reasons', 'A theme park trains all ride operators in safety checks. How does this benefit the park\'s <b>customers</b>?',
      ['Rides are less likely to injure customers, so they feel safe and keep visiting', 'Customers will pay lower entry prices because the park saves money', 'Customers will be allowed to operate the rides by themselves', 'Customers will no longer need to queue for the most popular rides'], 0,
      'Safe rides protect customers from harm. Customers who feel safe are more willing to visit again and recommend the park.'),
    mc('reasons', 'How can complying with health and safety laws help a business keep its costs down?',
      ['Fewer accidents mean fewer staff off injured, so less is spent on cover', 'Safety equipment and training cost nothing, so they never add to a firm\'s costs', 'Workers accept lower pay when they feel safe, so the wage bill falls', 'The government pays the wages of firms that follow safety law'], 0,
      'Fewer injuries mean fewer days lost to absence, so the business needs less cover staff and output is not disrupted. Safety measures do have a cost, but accidents usually cost more.'),
    mc('reasons', 'How can a safe workplace affect the <b>motivation</b> of staff?',
      ['Staff who feel safe are more confident and motivated in their work', 'Staff who feel safe will always accept lower wages without complaint', 'Safety rules remove the need for any other rewards for staff', 'A safe workplace has no effect at all on how staff feel about work'], 0,
      'When staff are not worried about being hurt they work with more confidence, which can raise their motivation and productivity.'),

    mc('developed-chain', 'Which answer is the best <b>developed</b> explanation of why a warehouse that uses forklift trucks should give staff health and safety training?',
      ['Trained staff drive forklifts safely, so fewer are injured, so fewer working days are lost and orders go out on time', 'To keep people safe at work, because health and safety is important for every business and all of its staff', 'Because it is the law, to avoid fines, to protect the warehouse\'s reputation and to keep its staff happy', 'Health and safety training is training that teaches staff how to stay safe when they are at work'], 0,
      'The first answer gives a reason linked to the forklift hazard and then two consequences. The second is generic and undeveloped, the third lists several reasons with no development, and the fourth is only a definition.'),
    mu('developed-chain', 'A sawmill trains its workers to use cutting machines safely. Select the <b>two</b> linked steps that develop this point.',
      ['so workers are less likely to be injured by the saws', 'so fewer days are lost to injury and production is not disrupted', 'so the sawmill can pay its workers lower wages from now on', 'so the sawmill no longer needs to check its machines for faults', 'so the sawmill can sell its timber at a higher price to builders'], [0, 1],
      'Safe use of the saws means fewer injuries, which then means fewer absences and steady production. The other options do not follow from safety training.'),
    mc('developed-chain', 'Which step is missing from this chain?<br><i>A restaurant does not train its kitchen staff in safe use of deep-fat fryers → ? → the restaurant is fined and its reputation suffers.</i>',
      ['A cook is badly burned by hot oil and inspectors find the law was broken', 'The restaurant adds new fried dishes to its menu to attract diners', 'The restaurant raises its prices to cover its higher costs of oil', 'Customers leave good online reviews about the quality of the restaurant\'s fried food'], 0,
      'The missing link is the accident and the finding that the law was broken. That is what leads to the fine and the bad publicity.'),
    mc('developed-chain', 'A student writes for a 3-mark Explain question: <i>"To keep staff safe, to avoid fines and to protect its reputation."</i> What is the main weakness?',
      ['It lists three reasons but does not explain any of them, so it earns only 1 mark', 'Avoiding fines is not a valid reason for a business to comply with safety law', 'It should have started by defining health and safety before giving reasons', 'Reputation has nothing to do with health and safety law, so that part of it is wrong'], 0,
      'Explain questions reward one reason developed through linked steps. A list of reasons with no development is worth a maximum of 1 mark.'),
    mc('developed-chain', 'Which answer is applied to the context of a bicycle repair workshop rather than being generic?',
      ['Mechanics trained to use the wheel press safely are less likely to trap their fingers', 'Health and safety training keeps all staff safe, so fewer people are injured at work', 'All businesses must follow health and safety laws, or they could be fined by the courts', 'Safety training reduces accidents in every workplace, which helps the business run smoothly'], 0,
      'Only the first answer refers to the workshop\'s actual hazard and work. The others could be written about any business.'),

    mc('consequences', 'A factory ignores repeated warnings about unguarded machinery and a worker is seriously injured. Which is the most likely consequence for the business?',
      ['It could be fined, sued by the worker or even closed down', 'Its profits will rise because it saved money on guards', 'It will be given extra time to make its products', 'It will no longer have to follow health and safety law'], 0,
      'Breaking health and safety law can lead to fines, compensation claims and in serious cases closure, as well as damage to the factory\'s reputation.'),
    mc('consequences', 'A small café owner says safety training is too expensive. Which is the strongest counter-argument?',
      ['One serious accident could cost far more in fines, compensation and lost trade than the training', 'Training is always free for small businesses, so the café will not have to pay anything', 'Customers never find out about accidents, so the café\'s reputation is not at risk', 'Untrained staff work faster, so the café serves more customers and earns more revenue'], 0,
      'A balanced judgement weighs the cost of training against the possible cost of an accident. Fines, compensation and lost customers can easily exceed the training cost.'),
    mc('consequences', 'Which of the following is a <b>cost</b> to a business of complying with health and safety law?',
      ['Buying protective clothing and paying staff while they attend training', 'Paying fines to the courts after breaking health and safety law', 'Losing customers after a serious accident is reported in the news', 'Paying compensation to a worker who was injured by unsafe machinery at the factory'], 0,
      'Protective clothing and paid training time are costs of complying. Fines, lost customers and compensation are costs of <i>not</i> complying.'),
    mc('consequences', 'Which stakeholders are mainly protected by health and safety laws?',
      ['Employees and customers', 'Shareholders and banks', 'Suppliers and competitors', 'The government and tax officials'], 0,
      'Health and safety laws require businesses to protect people who could be harmed on their premises, which mainly means employees and customers.'),

    mc('boundary', 'Which of these situations is a health and safety issue rather than an equal opportunities issue?',
      ['Staff in a print works are not given ear protection near loud presses', 'A manager refuses to promote an employee because of her religion and her age', 'A firm pays women less than men for the same job', 'An applicant is rejected because he is 61'], 0,
      'Lack of ear protection exposes staff to harm, so it is a health and safety issue. The other three are discrimination, which is equal opportunities law.'),
    mc('boundary', 'A courier company wants to analyse the benefits of safety training in induction for its van drivers. Which pair of points is best for this analysis?',
      ['Drivers who learn safe lifting are less likely to hurt their backs, so fewer days are lost; drivers who check their vans reduce the risk of crashes and claims', 'Drivers paid by the parcel work faster, so more parcels are delivered; drivers in company uniforms look smart, so customers trust the brand', 'Advertising for drivers online reaches more applicants, so vacancies fill quickly; shortlisting saves managers time, so interviews are quicker', 'Drivers given a pay rise feel valued, so they stay longer; drivers promoted after a year work harder, so service improves'], 0,
      'An analysis needs two chains in context. The first pair links safety training to the drivers\' real hazards and then to the business effect. The others are not about safety training.')
  ] };

  /* ===================== BUS-S2-20 Motivation theories ===================== */
  B['BUS-S2-20'] = { title: 'Motivation theories: Maslow, Taylor and Herzberg', items: [
    mc('taylor', 'Which statement best summarises Taylor\'s view of motivation?',
      ['Workers are motivated mainly by money', 'Workers are motivated by reaching their full potential', 'Workers are motivated by recognition and responsibility', 'Workers are motivated by friendships at work'], 0,
      'Taylor believed workers mainly want money, so pay should be linked to how much they produce. Potential is Maslow; recognition and responsibility are Herzberg\'s motivators.'),
    mc('taylor', 'A manager who follows Taylor\'s ideas wants to raise output in a shoe factory. Which payment method would he most likely use?',
      ['Piece rate, paying workers for each pair of shoes they finish', 'A fixed monthly salary that stays the same whatever is produced', 'Extra holiday for staff who join the factory\'s social events', 'A new job title for the longest-serving worker'], 0,
      'Taylor linked pay to output. Piece rate pays per item made, so workers earn more by producing more.'),
    mc('taylor', 'Which statement would Taylor be <b>most</b> likely to agree with?',
      ['If workers are paid more for producing more, they will work harder', 'Workers will only work hard once they feel part of a friendly team', 'Pay can only stop workers feeling dissatisfied', 'Workers work hardest when they are given responsibility'], 0,
      'Taylor saw money as the main motivator, so higher pay for higher output should raise effort. The other statements fit Maslow or Herzberg.'),

    mc('maslow', 'In Maslow\'s hierarchy of needs, which level is Level 4, counting from the bottom?',
      ['Esteem', 'Social', 'Safety', 'Self-actualisation'], 0,
      'From the bottom: 1 basic (physiological), 2 safety, 3 social, 4 esteem, 5 self-actualisation.'),
    mc('maslow', 'Which shows Maslow\'s hierarchy of needs in order from the <b>bottom</b> to the <b>top</b>?',
      ['Basic, safety, social, esteem, self-actualisation', 'Self-actualisation, esteem, social, safety, basic', 'Basic, social, safety, esteem, self-actualisation', 'Safety, basic, esteem, social, self-actualisation'], 0,
      'The hierarchy starts with basic physical needs at the bottom and ends with self-actualisation at the top. Counting from the top is a common mistake.'),
    mc('maslow', 'Which workplace example meets a worker\'s <b>safety</b> needs in Maslow\'s hierarchy?',
      ['A permanent contract that gives job security', 'Being named employee of the month in the newsletter', 'Joining the company football team', 'Being trusted to design a new product'], 0,
      'Safety needs (Level 2) are about security, such as a secure job and safe working conditions. The other examples meet esteem, social and self-actualisation needs.'),
    mc('maslow', 'A firm organises team lunches and group projects so staff can make friends at work. Which of Maslow\'s needs does this meet?',
      ['Social needs', 'Esteem needs', 'Basic needs', 'Safety needs'], 0,
      'Friendship and belonging to a group are social needs, Level 3 of the hierarchy.'),
    mc('maslow', 'Which example best meets a worker\'s <b>basic</b> (physiological) needs at work?',
      ['Wages high enough to pay for food and housing', 'Praise from the manager in front of the whole team', 'A chance to lead a new project', 'A company sports club'], 0,
      'Basic needs (Level 1) are food, water and shelter. At work these are met through pay that covers living costs.'),
    mc('maslow', 'A senior designer is given the freedom to create her own range of products and develop her full talents. Which of Maslow\'s needs does this meet?',
      ['Self-actualisation', 'Esteem', 'Social', 'Safety'], 0,
      'Self-actualisation, the top level, is about reaching your full potential, which creative freedom allows.'),
    mc('maslow', 'According to Maslow, what must happen before esteem needs will motivate a worker?',
      ['The worker\'s basic, safety and social needs must be met first', 'The worker must first have reached self-actualisation at work', 'The worker must be paid by piece rate for everything they make', 'The worker\'s hygiene factors must all be removed from the job'], 0,
      'Maslow said lower needs must be met before higher ones motivate. Esteem is Level 4, so Levels 1 to 3 come first.'),
    mc('maslow', 'Kofi has a secure, well-paid job and good friends in his team. According to Maslow, what is most likely to motivate him now?',
      ['Recognition and a more senior job title', 'A permanent contract', 'A higher basic wage to cover his rent', 'Joining a lunchtime social club'], 0,
      'Kofi\'s basic, safety and social needs are already met, so the next level, esteem, will motivate him. Recognition and status meet esteem needs.'),

    mc('herzberg', 'Which one of these is a <b>hygiene factor</b> in Herzberg\'s theory?',
      ['Working conditions', 'Recognition', 'Responsibility', 'Achievement'], 0,
      'Herzberg\'s hygiene factors include pay, working conditions and job security. Recognition, responsibility and achievement are motivators.'),
    mc('herzberg', 'Which one of these is a <b>motivator</b> in Herzberg\'s theory?',
      ['The chance of promotion', 'Pay', 'Job security', 'Company rules and policies'], 0,
      'Promotion is a motivator because it gives recognition and growth. Pay, job security and company policies are hygiene factors.'),
    mu('herzberg', 'Select <b>all</b> the factors that Herzberg classed as hygiene factors.',
      ['Pay', 'Job security', 'Working conditions', 'Achievement', 'Recognition', 'Responsibility'], [0, 1, 2],
      'Pay, job security and working conditions are hygiene factors. Achievement, recognition and responsibility are motivators.'),
    mc('herzberg', 'What did Herzberg say about hygiene factors?',
      ['If they are poor, workers become dissatisfied, but improving them does not truly motivate', 'They are the main way to motivate workers, so improving them makes staff work harder', 'They form the top level of a hierarchy of needs, above esteem and social needs', 'They only matter to managers, because other workers care mainly about money'], 0,
      'Hygiene factors prevent dissatisfaction. Herzberg said only motivators, such as achievement and recognition, truly motivate.'),
    mc('herzberg', 'Lina received a pay rise last month, but she still finds her job boring and puts in little effort. Which theory best explains this?',
      ['Herzberg: pay is a hygiene factor, so it removes dissatisfaction but does not motivate', 'Taylor: money is the main motivator, so the pay rise should make her work harder', 'Maslow: she has already reached self-actualisation, so nothing can motivate her', 'Herzberg: pay is a motivator, so her effort should rise once she gets used to it'], 0,
      'Herzberg would say the pay rise stops Lina feeling underpaid but cannot make the job interesting. She needs motivators such as responsibility or achievement.'),
    mc('herzberg', 'A supermarket gives an experienced cashier responsibility for training new staff. According to Herzberg, this is:',
      ['a motivator, which can increase her satisfaction and effort', 'a hygiene factor, which only prevents dissatisfaction', 'a safety need from Maslow\'s hierarchy', 'a piece-rate payment method'], 0,
      'Responsibility is one of Herzberg\'s motivators, so it can genuinely motivate the cashier.'),
    mc('herzberg', 'A call centre has broken air conditioning and cramped desks. According to Herzberg, what is the likely effect on staff?',
      ['Staff become dissatisfied, because working conditions are a poor hygiene factor', 'Staff become highly motivated, because conditions are a motivator', 'Staff reach self-actualisation, because they must cope with difficult conditions', 'There is no effect, because only the level of pay affects how staff feel'], 0,
      'Working conditions are a hygiene factor. When they are poor, staff feel dissatisfied, which can lower effort and increase staff leaving.'),
    mc('herzberg', 'Which answer best explains one of the factors in Herzberg\'s theory?',
      ['Recognition is a motivator; if a manager praises good work, staff feel valued and so are likely to work harder', 'Herzberg said there are two kinds of factor at work: hygiene factors and motivators', 'Recognition is one of the factors in Herzberg\'s theory, along with achievement and responsibility', 'Hygiene factors are pay, working conditions and job security; motivators include achievement and recognition'], 0,
      'A full explanation names the factor, gives an example and shows its effect on effort. The other answers only state or list factors.'),

    mc('match-theorist', 'Which theorist is linked to hygiene factors and motivators?',
      ['Herzberg', 'Maslow', 'Taylor'], 0,
      'Herzberg divided workplace factors into hygiene factors and motivators. Maslow has the hierarchy of needs and Taylor focused on money.'),
    mc('match-theorist', 'A student writes: <i>"Herzberg\'s Level 3 is social needs."</i> What is wrong with this statement?',
      ['Levels of needs belong to Maslow, not Herzberg', 'Social needs are Level 2, not Level 3', 'It should say Taylor, not Herzberg', 'Herzberg had five levels starting with esteem'], 0,
      'The student has mixed up the theorists. Maslow\'s hierarchy has levels, and social needs are Level 3. Herzberg has hygiene factors and motivators.'),
    mc('match-theorist', 'A packing firm pays staff for every box they pack, and also runs team social events. Which pair of theorists do these two methods reflect?',
      ['Taylor (pay per box) and Maslow (social needs)', 'Herzberg (pay per box) and Taylor (social needs)', 'Maslow (pay per box) and Herzberg (social needs)', 'Taylor (pay per box) and Herzberg (social needs)'], 0,
      'Paying per unit packed reflects Taylor\'s money-based view. Team social events meet social needs in Maslow\'s hierarchy.'),
    mc('match-theorist', 'Which theorist would say that workers must have their lower needs met before higher needs can motivate them?',
      ['Maslow', 'Taylor', 'Herzberg'], 0,
      'Maslow\'s hierarchy says needs are met in order from the bottom up, so lower needs come first.')
  ] };

  /* ===================== BUS-S2-11 Selection ===================== */
  B['BUS-S2-11'] = { title: 'Selection: shortlisting and interviewing candidates', items: [
    mc('define-stages', 'What is shortlisting?',
      ['Picking out the applicants who best match the person specification, to invite for interview', 'Writing a job advertisement and choosing where to place it so that people apply', 'Training a new employee during their first week so that they learn the job', 'Asking a candidate questions face to face to judge their skills and attitude'], 0,
      'Shortlisting filters the applications so only the most suitable applicants go forward to interview. Asking questions face to face is the interview itself.'),
    mc('define-stages', 'At which stage does a business decide which applicants will be invited to an interview?',
      ['Shortlisting', 'Induction', 'Advertising', 'Appraisal'], 0,
      'Shortlisting is the step that chooses which applicants go forward to interview. Advertising happens before applications arrive, and induction after someone is appointed.'),
    mc('define-stages', 'Which shows the stages of recruitment and selection in the correct order?',
      ['Advertise the job, receive applications, shortlist, interview, appoint', 'Shortlist, advertise the job, interview, receive applications, appoint', 'Advertise the job, interview, receive applications, shortlist, appoint', 'Receive applications, appoint, shortlist, interview, advertise the job'], 0,
      'A business advertises, collects applications, shortlists the best, interviews them and then appoints the most suitable candidate.'),
    mc('define-stages', 'What does selection mean in human resources?',
      ['Choosing the best person for the job from the people who applied', 'Finding new markets for the business\'s products in other countries', 'Deciding which products to stop selling because demand has fallen', 'Choosing which staff to make redundant when jobs are cut'], 0,
      'Selection is choosing the most suitable applicant. It includes shortlisting and interviewing.'),
    mc('define-stages', 'Which activity is part of <b>selection</b> rather than advertising the vacancy?',
      ['Interviewing shortlisted candidates', 'Placing the vacancy on a job website', 'Writing the job advertisement', 'Choosing a newspaper to advertise in'], 0,
      'Advertising attracts applicants. Selection starts once applications arrive: shortlisting and interviewing.'),
    mc('define-stages', 'Which documents does a manager usually compare against each application when shortlisting?',
      ['The job description and person specification', 'The income statement and statement of financial position', 'The cash-flow forecast and budget', 'The marketing plan and sales figures'], 0,
      'Shortlisting checks each CV or application form against the duties of the job (job description) and the qualities needed (person specification).'),

    { skill: 'apply-shortlist', family: 'shortlist-table-1', kind: 'multi',
      q: 'A garden-design firm needs a landscape gardener. The person specification asks for <b>a driving licence</b> and <b>at least 2 years\' gardening experience</b>.' +
        table(['Applicant', 'Driving licence', 'Gardening experience'], [['P', 'Yes', '4 years'], ['Q', 'No', '6 years'], ['R', 'Yes', '3 years'], ['S', 'Yes', '1 year']]) +
        'Select <b>all</b> the applicants the firm should shortlist.',
      options: ['P', 'Q', 'R', 'S'], answers: [0, 2],
      why: 'Only P and R meet both requirements. Q has no driving licence and S has less than 2 years\' experience, so they do not match the person specification.' },
    { skill: 'apply-shortlist', family: 'shortlist-table-2', kind: 'mcq',
      q: 'A pharmacy wants a dispensing assistant. Essential: <b>a pharmacy qualification</b> and <b>customer service experience</b>.' +
        table(['Applicant', 'Pharmacy qualification', 'Customer service experience'], [['W', 'Yes', 'No'], ['X', 'No', 'Yes'], ['Y', 'Yes', 'Yes'], ['Z', 'No', 'No']]) +
        'Which applicant should be shortlisted?',
      options: ['W', 'X', 'Y', 'Z'], answer: 2,
      why: 'Only Y meets both essential requirements. Shortlisting removes applicants who do not match the person specification, saving interview time.' },
    mc('apply-shortlist', 'A logistics firm has 250 applications for 3 forklift driver jobs. Which is the most suitable criterion for shortlisting?',
      ['Holds a valid forklift licence', 'Lives in the same street as the manager', 'Is under 35 years old', 'Has the neatest handwriting'], 0,
      'A forklift licence is essential for the job, so it is a fair, job-related criterion. Age is a protected characteristic and the others are irrelevant.'),
    mc('apply-shortlist', 'A software company receives 400 applications for two programmer jobs. What is the main benefit of shortlisting for this company?',
      ['Managers only interview applicants with the required coding skills, saving time', 'It means the company does not need to advertise the two jobs at all', 'It guarantees that every one of the 400 applicants gets an interview', 'It replaces the need to write a person specification for the jobs'], 0,
      'With 400 applicants, interviewing everyone would take far too long. Shortlisting narrows the field to those who match the job requirements.'),

    mc('purpose-interview', 'Why do businesses interview shortlisted candidates?',
      ['To check their CV details and judge their skills, attitude and fit with the team', 'To tell candidates about the company\'s sales figures and future plans', 'To train candidates in the job before they are offered a contract', 'To decide which newspapers and websites to advertise the vacancy in'], 0,
      'An interview lets the business test what the applicant wrote and see how they communicate and behave, which a CV cannot show.'),
    mc('purpose-interview', 'What can an interview show that an application form usually cannot?',
      ['How well the candidate communicates and handles questions face to face', 'The qualifications the candidate has gained at school or college', 'The names of the candidate\'s previous employers and the job titles they held', 'The candidate\'s home address and contact telephone number'], 0,
      'Qualifications, past employers and address are written on the form. Communication skills and attitude are best judged in person.'),
    mc('purpose-interview', 'A children\'s nursery interviews shortlisted applicants for a childcare assistant job. Which reason is best applied to this business?',
      ['To check that applicants can talk calmly and kindly to young children', 'To find out how many people have applied for the childcare job', 'To check the nursery\'s own cash flow before it decides to hire anyone new', 'To help the nursery decide what prices to charge parents'], 0,
      'An applied answer links the interview to the job: a nursery needs staff who handle young children well, and the interview tests this.'),
    mc('purpose-interview', 'A hotel is interviewing for a receptionist. Which interview activity would best help it judge a candidate\'s suitability?',
      ['A role-play of checking in a guest who has a complaint', 'Asking the candidate to name their favourite film', 'Asking the candidate to repeat their date of birth', 'Asking the candidate how far they live from the city centre'], 0,
      'The role-play tests the real skills of the job: dealing with guests politely and handling problems. The other questions tell the hotel little about suitability.'),
    mc('purpose-interview', 'A theme park interviews applicants for ride operator jobs. Which is the best applied reason for interviewing them?',
      ['To check they can follow safety instructions, so riders are kept safe', 'To make sure that they have really applied for the ride operator job at the park', 'Because interviews are always part of the recruitment process', 'To find the applicant who has the most friends working at the park'], 0,
      'The applied reason connects the interview to the job: ride operators must follow safety procedures, and an interview can test their understanding.'),

    mc('consequences', 'Why can a poor selection decision be expensive for a business?',
      ['Wages and training are wasted, and the business may need to recruit again', 'The business must then pay the new worker at least the minimum wage', 'The business will have to change the prices of all its products', 'The business will lose its limited liability and its legal status'], 0,
      'If the wrong person is hired, the wages and training spent on them are wasted and recruiting again costs more time and money.'),
    mu('consequences', 'A dental practice interviews candidates for a dental nurse job. Select the <b>two</b> linked steps that develop this point.',
      ['so it can check each candidate\'s experience of helping during treatments', 'so a calm, skilled nurse is appointed and the practice\'s reputation improves', 'so it no longer needs to shortlist applicants before the interviews', 'so it can pay the new dental nurse below the minimum wage', 'so it can advertise the job in more newspapers and on more websites'], [0, 1],
      'Interviewing lets the practice test real experience, which makes a good appointment more likely, which leads to happy patients and a good reputation.'),
    mc('consequences', 'Which step is missing from this chain?<br><i>A bus company interviews applicants carefully → ? → passengers are kept safe and complaints fall.</i>',
      ['It appoints drivers who have shown they understand road safety rules', 'It pays drivers a bonus for every trip they complete on time', 'It raises its ticket prices to pay for the interviews', 'It advertises the driver jobs in more newspapers and websites'], 0,
      'Careful interviewing leads to appointing safe, suitable drivers. That is the link to fewer accidents and complaints.'),
    mc('consequences', 'Which is a likely benefit to a restaurant of selecting staff carefully?',
      ['Customers receive better service, so they are more likely to return', 'The restaurant no longer needs to plan a menu for its customers', 'Food costs fall to zero because the staff are more skilled', 'The restaurant can ignore health and safety law in its kitchen from now on'], 0,
      'Good selection puts skilled, suitable staff in front of customers. Better service encourages repeat visits.'),

    mc('judge-answer', 'For "Analyse why a supermarket interviews candidates", a student describes how to set up the interview room and how long it should last. What is the main weakness?',
      ['It describes how to hold an interview instead of explaining why it helps the supermarket', 'It is too short to count as an analysis, so it needs more paragraphs', 'It should have started with a definition of shortlisting and interviews', 'It mentions the supermarket by name, which is not allowed in an analysis'], 0,
      'The question asks <i>why</i> interviewing helps the business. Describing the process does not show the benefits, such as checking skills and choosing staff who give good service.'),
    mc('judge-answer', 'Which answer best outlines one reason why a chocolate maker shortlists applicants for factory jobs?',
      ['Only applicants with food-production experience are interviewed, saving managers\' time', 'Shortlisting is when a business chooses which of its applicants to invite to an interview', 'Shortlisting helps a business choose the best person, so it is used by most businesses', 'All businesses shortlist when they recruit, because it is part of the selection process'], 0,
      'An Outline answer needs a reason plus a link to the context. The first answer gives the reason (saving time) and applies it to food production.'),
    mc('judge-answer', 'How useful shortlisting is to a business depends most on:',
      ['how clearly the person specification sets out what the job needs', 'how many different products the business sells to its customers', 'how large the business\'s advertising budget is for the year', 'how many shareholders own the business and receive a share of its profits'], 0,
      'Shortlisting compares applicants with the person specification. If the specification is vague, the wrong applicants may be shortlisted or good ones left out.'),
    mc('judge-answer', 'Which statement about shortlisting is correct?',
      ['It happens after applications are received and before interviews', 'It happens after the successful candidate has been appointed to the job', 'It is the same as advertising the vacancy', 'It means interviewing every applicant'], 0,
      'Shortlisting uses the applications already received to choose who goes forward to interview.')
  ] };

  /* ===================== BUS-S2-36 Dismissing an employee ===================== */
  B['BUS-S2-36'] = { title: 'Dismissing an employee', items: [
    mc('fair-reason', 'What does dismissal mean?',
      ['The employer ends a worker\'s job because of the worker\'s conduct or ability', 'The employer ends a job because the business no longer needs that job to be done', 'The worker chooses to leave the business to take a job elsewhere', 'The worker retires and stops working at the end of their career'], 0,
      'Dismissal is linked to the worker\'s conduct or ability. When the job itself is no longer needed, that is redundancy.'),
    mc('fair-reason', 'Which one of these is a fair reason to dismiss an employee?',
      ['Repeatedly arriving late for shifts after being warned', 'Belonging to a religion that is different from the manager\'s', 'Reaching the age of 50 while working on the shop floor', 'Asking the employer for equal pay with colleagues'], 0,
      'Repeated lateness after warnings is a conduct reason. Dismissing someone for their religion or age, or for asking for equal pay, is unfair.'),
    mu('fair-reason', 'Select <b>all</b> the fair reasons for dismissing an employee.',
      ['Stealing stock from the business', 'Being violent towards a colleague', 'Repeatedly breaking safety rules', 'The employee\'s race', 'The employee\'s disability', 'The business closing the department'], [0, 1, 2],
      'Theft, violence and repeatedly breaking safety rules are misconduct. Race and disability are protected characteristics, and closing a department is redundancy, not dismissal.'),
    mc('fair-reason', 'A sales assistant has been given extra training but still cannot use the till correctly after many months. Which type of fair reason for dismissal is this?',
      ['Being unable to do the job properly', 'Redundancy, as the job is no longer needed', 'Discrimination against the sales assistant', 'Gross misconduct by the sales assistant'], 0,
      'If an employee cannot do the job to the required standard even after support, this is a fair reason linked to their ability. It is not misconduct, because the assistant has not broken any rules, and the job still exists, so it is not redundancy.'),
    mc('fair-reason', 'Which one of these is an example of <b>serious misconduct</b>?',
      ['A warehouse worker switches off a machine safety guard to work faster', 'A worker takes a day of paid holiday that the manager had agreed', 'A worker asks the manager whether they can go on a health and safety training course', 'A worker politely turns down an offer of extra overtime hours'], 0,
      'Removing a safety guard puts people at risk and breaks safety rules, which is serious misconduct. The other actions are normal and allowed.'),

    mc('dismissal-vs-redundancy', 'Which situation is <b>redundancy</b> rather than dismissal?',
      ['A bank closes a branch, so the cashier jobs there are no longer needed', 'A cashier is caught on camera taking money from the till', 'A cashier is repeatedly rude to customers even after two warnings', 'A cashier is often absent from work without giving the bank any good reason'], 0,
      'Redundancy happens when the job is no longer needed, which is not the worker\'s fault. The other three are about the worker\'s conduct, so they are dismissal.'),
    mc('dismissal-vs-redundancy', 'What is the key difference between dismissal and redundancy?',
      ['Dismissal is due to the worker\'s conduct or ability; redundancy is because the job is no longer needed', 'Dismissal only applies to managers and supervisors; redundancy only applies to all the other staff in the business', 'Dismissal is always unfair to the worker; redundancy is always fair because it is legal', 'Dismissal can only happen in the first year; redundancy can only happen after the first year'], 0,
      'Dismissal is linked to the employee; redundancy is linked to the business no longer needing that job.'),
    mc('dismissal-vs-redundancy', 'Asked "State one reason why a printing firm could dismiss an employee", a student writes: <i>"The firm buys new machines and needs fewer workers."</i> Why is this wrong?',
      ['It describes redundancy, not a reason linked to the employee\'s conduct or ability', 'It is not set in the context of the printing firm, so it is too generic', 'Printing firms are not allowed by law to dismiss any of their employees', 'It is an example of discrimination against the older workers who will lose their jobs'], 0,
      'Needing fewer workers is a redundancy reason. A dismissal reason must be about the employee, such as lateness or theft.'),
    mc('dismissal-vs-redundancy', 'A toy maker stops making one product range, so the 12 workers on that line lose their jobs. This is:',
      ['redundancy, because their jobs are no longer needed', 'dismissal, because the workers performed badly', 'unfair dismissal, because the business is discriminating', 'retirement, because the workers have finished their careers'], 0,
      'The workers did nothing wrong; their jobs disappeared when the range stopped. That is redundancy.'),

    mc('unfair-dismissal', 'Which one of these would be <b>unfair</b> dismissal?',
      ['Sacking a worker because of his race', 'Sacking a worker who stole from the business', 'Sacking a worker who was violent to a customer', 'Sacking a worker who was repeatedly absent without reason after warnings'], 0,
      'Race is a protected characteristic, so dismissing someone for it is unfair. The other reasons relate to the worker\'s conduct.'),
    mc('unfair-dismissal', 'What is unfair dismissal?',
      ['Ending someone\'s job for a reason the law does not allow, such as discrimination', 'Ending someone\'s job because they were caught stealing money or stock from the business', 'Ending a job because the business needs fewer workers than before', 'A worker deciding to leave the business without giving any notice'], 0,
      'Unfair dismissal is ending a job for a reason the law does not allow, for example because of age, religion or race.'),
    mc('unfair-dismissal', 'An employee who was dismissed because of her religion takes her employer to a tribunal and wins. What is the most likely consequence for the business?',
      ['It must pay her compensation and its reputation may suffer', 'It can keep the dismissal and pay nothing', 'It receives a government payment for the lost worker', 'It no longer needs to follow employment law'], 0,
      'Losing an unfair dismissal case usually means paying compensation, plus legal costs and possible bad publicity.'),
    mc('unfair-dismissal', 'A 61-year-old factory supervisor with a good performance record is dismissed so the firm can "bring in younger staff". This is:',
      ['unfair dismissal, because age is a protected characteristic', 'fair dismissal, because of poor performance in the job', 'redundancy, because the factory supervisor job is no longer needed', 'fair dismissal, because of serious misconduct at work'], 0,
      'The reason given is the supervisor\'s age, which the law protects. Her good record means there is no fair conduct or ability reason.'),

    mc('procedure', 'Before dismissing an employee for poor timekeeping, what does a business usually do first?',
      ['Follow a disciplinary procedure, such as giving verbal and written warnings', 'Make the employee redundant so the business does not need a reason', 'Promote the employee to a new role where timekeeping matters less', 'Advertise the employee\'s job straight away to find a replacement'], 0,
      'Businesses usually give warnings first, so the employee has a chance to improve and the business can show it acted fairly.'),
    mc('procedure', 'Why do businesses follow a disciplinary procedure before dismissing someone?',
      ['To give the worker a chance to improve and lower the risk of an unfair dismissal claim', 'To delay paying the employee\'s wages until the procedure is finished', 'To avoid having to pay the employee the minimum wage while they improve', 'To make the employee redundant instead, which is cheaper for the business'], 0,
      'Warnings give the worker a fair chance and provide evidence that the business acted fairly if the dismissal is challenged.'),
    mc('procedure', 'Which department in a business usually handles disciplinary procedures and dismissal?',
      ['Human resources', 'Marketing', 'Finance', 'Production'], 0,
      'Human resources deals with employment issues, including discipline, dismissal and redundancy.'),

    mc('apply-outline', 'Which reason for dismissal is applied to the context of a parcel delivery company?',
      ['A driver keeps arriving late for his shift, so parcels are delivered after the promised time', 'An employee is often late for work, which is a common reason for dismissal in any business', 'An employee breaks the rules of the business, so the managers decide that they must dismiss them', 'An employee is not good at their job, even though the business has tried to help them'], 0,
      'Only the first answer uses the delivery context and shows the effect on the business. The others could apply to any business.'),
    mc('apply-outline', 'Which answer best outlines one reason why a restaurant may dismiss a chef?',
      ['The chef keeps ignoring food hygiene rules, which could make diners ill and harm the restaurant\'s reputation', 'The chef could be dismissed for misconduct, which is one of the fair reasons for dismissal in any kind of business', 'The restaurant may dismiss a chef because it is the employer, and so it is allowed to do this', 'The chef might be dismissed if the restaurant has fewer customers and so needs fewer chefs'], 0,
      'An Outline answer gives a reason linked to the employee and develops it in context. The last option is a redundancy reason.'),
    mc('apply-outline', 'Which step is missing from this chain?<br><i>A cook at a hotel takes food home without paying → ? → the hotel dismisses the cook.</i>',
      ['The hotel\'s food costs rise and there may not be enough food for guests\' meals', 'The hotel advertises for more cooks to work in its busy kitchen', 'Guests ask the hotel for a cheaper menu with smaller portions', 'The cook asks the hotel manager for a pay rise to cover his food bills'], 0,
      'The theft has a cost for the hotel: higher food costs and possible shortages. That consequence explains why the hotel treats theft as a reason for dismissal.'),
    mc('apply-outline', 'A car assembly worker is often absent without a good reason. How might this affect the business if it does not act?',
      ['Others must cover the gaps, so overtime costs rise and cars may be late', 'The business will sell more cars because fewer workers are on the line', 'The worker\'s absence reduces the factory\'s energy bills, raising profit', 'The business no longer needs to train the other staff on the line'], 0,
      'Unexplained absence disrupts the production line. Covering it costs money and can delay orders, which is why it can be a fair reason for dismissal.'),
    mc('apply-outline', 'A hotel receptionist is repeatedly rude to guests, even after two written warnings. Would dismissing the receptionist be fair?',
      ['Yes, because it is repeated poor conduct after warnings that harms guest service', 'No, because rudeness to guests can never be a fair reason for dismissal', 'No, because this is a redundancy situation, not a dismissal', 'Yes, but only if the receptionist is also over a certain age'], 0,
      'Repeated misconduct after warnings is a fair reason, and it harms the hotel\'s service and reputation. Age is never a fair reason.'),
    mc('apply-outline', 'A chemical plant worker smokes next to fuel tanks despite safety signs. Which is the most likely result once managers find out?',
      ['Dismissal for serious misconduct, because it puts lives and the plant at risk', 'Redundancy, because the worker\'s job is no longer needed at the plant', 'Promotion, because the worker showed initiative by ignoring the signs', 'A pay rise, to motivate the worker to stop smoking near the tanks'], 0,
      'Smoking next to fuel tanks breaks a serious safety rule and puts lives at risk, so it is serious (gross) misconduct. After investigating, the business could dismiss the worker even for a first offence.')
  ] };

  /* ===================== BUS-CALC-19 Average (mean) per unit or outlet ===================== */
  function meanCtx(cfg) {
    // cfg: { count:[a,b], mean:[a,b,step], text(total,count), why noun }
    return function () {
      var n = rint(cfg.count[0], cfg.count[1]);
      var m = rint(cfg.mean[0], cfg.mean[1]) * (cfg.step || 1);
      var total = n * m;
      return { kind: 'num', q: cfg.text(fmt(total), fmt(n)), answer: m, unit: '', display: fmt(m),
        why: 'Average = total ÷ number = ' + fmt(total) + ' ÷ ' + fmt(n) + ' = ' + fmt(m) + ' ' + cfg.unit + '.' };
    };
  }
  B['BUS-CALC-19'] = { title: 'Average (mean) per unit or outlet', items: [
    { skill: 'mean-simple', gen: meanCtx({ count: [12, 40], mean: [180, 650], unit: 'loaves per shop',
      text: function (t, n) { return 'A bakery chain sold ' + t + ' loaves of bread last week across its ' + n + ' shops.<br>Calculate the average number of loaves sold per shop.'; } }) },
    { skill: 'mean-simple', gen: meanCtx({ count: [6, 18], mean: [140, 480], unit: 'guests per hotel',
      text: function (t, n) { return 'On one night, a hotel group had ' + t + ' guests staying in its ' + n + ' hotels.<br>Calculate the average number of guests per hotel.'; } }) },
    { skill: 'mean-simple', gen: meanCtx({ count: [15, 60], mean: [25, 90], unit: 'cars per site',
      text: function (t, n) { return 'A hand car-wash business has ' + n + ' sites. On Saturday the sites washed ' + t + ' cars in total.<br>Calculate the average number of cars washed per site on Saturday.'; } }) },
    { skill: 'mean-simple', gen: meanCtx({ count: [20, 75], mean: [12, 60], step: 100, unit: 'cups per café',
      text: function (t, n) { return 'A juice bar franchise sold ' + t + ' cups of juice in March from its ' + n + ' cafés.<br>Calculate the average number of cups sold per café in March.'; } }) },
    { skill: 'mean-simple', gen: meanCtx({ count: [30, 120], mean: [12, 30], step: 10, unit: 'litres per cow',
      text: function (t, n) { return 'A dairy farm has ' + n + ' cows. In one week they produced ' + t + ' litres of milk.<br>Calculate the average amount of milk produced per cow that week, in litres.'; } }) },

    { skill: 'mean-large', gen: function () {
      var n = pick([120, 150, 200, 240, 250, 300, 400, 480, 500]);
      var mean = rint(20, 80) * 500;
      var total = n * mean;
      var mil = R.roundDp(total / 1e6, 3);
      return { kind: 'num', q: 'A book distributor delivered ' + fmt(mil) + ' million books last year to ' + n + ' bookshops.<br>Calculate the average number of books delivered per bookshop.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'Write the total in full: ' + fmt(mil) + ' million = ' + fmt(total) + '. Average = ' + fmt(total) + ' ÷ ' + n + ' = ' + fmt(mean) + ' books per bookshop.' };
    } },
    { skill: 'mean-large', gen: function () {
      var n = rint(12, 48);
      var mean = rint(30, 95) * 10000;
      var total = n * mean;
      var mil = R.roundDp(total / 1e6, 2);
      return { kind: 'num', q: 'A pizza restaurant chain had revenue of $' + fmt(mil) + ' million last year from its ' + n + ' restaurants.<br>Calculate the average revenue per restaurant. Give your answer in $.',
        answer: mean, unit: '$', display: fmt(mean),
        why: '$' + fmt(mil) + ' million = $' + fmt(total) + '. Average = $' + fmt(total) + ' ÷ ' + n + ' = $' + fmt(mean) + ' per restaurant.' };
    } },
    { skill: 'mean-large', gen: function () {
      var n = pick([40000, 48000, 50000, 60000]);
      var mean = rint(20, 60) * 1000;
      var total = n * mean;
      var bil = R.roundDp(total / 1e9, 3);
      return { kind: 'num', q: 'A national postal service delivered ' + fmt(bil) + ' billion letters last year using ' + fmt(n) + ' delivery vans.<br>Calculate the average number of letters delivered per van.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'One billion is 1,000,000,000, so ' + fmt(bil) + ' billion = ' + fmt(total) + '. Average = ' + fmt(total) + ' ÷ ' + fmt(n) + ' = ' + fmt(mean) + ' letters per van.' };
    } },
    { skill: 'mean-large', gen: function () {
      var n = pick([80, 160, 200, 240, 320, 400]);
      var mean = rint(32, 80) * 250;
      var total = n * mean;
      var mil = R.roundDp(total / 1e6, 3);
      return { kind: 'num', q: 'A cinema company sold ' + fmt(mil) + ' million tickets last year. It has ' + n + ' screens.<br>Calculate the average number of tickets sold per screen.',
        answer: mean, unit: '', display: fmt(mean),
        why: fmt(mil) + ' million = ' + fmt(total) + '. Average = ' + fmt(total) + ' ÷ ' + n + ' = ' + fmt(mean) + ' tickets per screen.' };
    } },
    { skill: 'mean-large', gen: function () {
      var mil = pick([1.5, 2.4, 3.6, 4.8, 6.5, 7.2, 9.25, 12.5]);
      var full = R.roundDp(mil * 1e6, 0);
      var wrongA = full / 10, wrongB = full * 10, wrongC = R.roundDp(mil * 1e3, 0);
      return { kind: 'mcq', q: 'A sports-drink maker sold ' + mil + ' million bottles last year. Which number shows this written in full, ready to divide?',
        options: [fmt(full), fmt(wrongA), fmt(wrongB), fmt(wrongC)], answer: 0,
        why: 'One million is 1,000,000 (six zeros), so ' + mil + ' million = ' + mil + ' × 1,000,000 = ' + fmt(full) + '.' };
    } },

    { skill: 'mean-select', gen: function () {
      var n = rint(14, 36);
      var mean = rint(40, 220);
      var total = n * mean;
      var staff = n * rint(8, 25);
      var rev = rint(20, 90) * 100000;
      return { kind: 'num', q: 'Facts about a sportswear retailer last month:' + table(['Item', 'Figure'], [['Number of stores', fmt(n)], ['Number of employees', fmt(staff)], ['Pairs of trainers sold', fmt(total)], ['Revenue', '$' + fmt(rev)]]) +
        'Calculate the average number of pairs of trainers sold per store.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'Use only the trainers sold and the number of stores: ' + fmt(total) + ' ÷ ' + n + ' = ' + fmt(mean) + ' pairs per store. The employees and revenue figures are not needed.' };
    } },
    { skill: 'mean-select', gen: function () {
      var n = rint(8, 24);
      var mean = rint(25, 140) * 10;
      var total = n * mean;
      var staff = n * rint(5, 14);
      return { kind: 'num', q: 'A garden centre group has ' + n + ' branches and employs ' + fmt(staff) + ' people. In spring it sold ' + fmt(total) + ' rose bushes.<br>Calculate the average number of rose bushes sold per branch.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'Divide the bushes sold by the number of branches: ' + fmt(total) + ' ÷ ' + n + ' = ' + fmt(mean) + ' per branch. The number of employees is extra information.' };
    } },
    { skill: 'mean-select', gen: function () {
      var n = rint(10, 30);
      var mean = rint(15, 70) * 20;
      var total = n * mean;
      var staff = n * rint(4, 9);
      var right = fmt(total) + ' ÷ ' + n;
      return { kind: 'mcq', q: 'An ice-cream company has ' + n + ' kiosks and ' + fmt(staff) + ' staff. Last summer it sold ' + fmt(total) + ' ice creams.<br>Which calculation gives the average number of ice creams sold per kiosk?',
        options: [right, fmt(total) + ' ÷ ' + fmt(staff), n + ' ÷ ' + fmt(total), fmt(total) + ' × ' + n], answer: 0,
        why: 'Average per kiosk = total sold ÷ number of kiosks = ' + right + ' = ' + fmt(mean) + '. Dividing by staff gives sales per worker, and dividing the kiosks by the total is upside down.' };
    } },
    { skill: 'mean-select', gen: function () {
      var n = rint(5, 12);
      var mean = rint(30, 90) * 100;
      var total = n * mean;
      var vans = n * rint(3, 6);
      return { kind: 'num', q: 'A furniture company owns ' + vans + ' delivery vans and ' + n + ' showrooms. Last year the showrooms sold ' + fmt(total) + ' sofas.<br>Calculate the average number of sofas sold per showroom.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'Average per showroom = ' + fmt(total) + ' ÷ ' + n + ' = ' + fmt(mean) + ' sofas. The number of vans is not needed.' };
    } },

    { skill: 'mean-table', gen: function () {
      var names = ['North', 'South', 'East', 'West', 'Central'];
      var mean = rint(60, 180);
      var vals = names.map(function () { return mean + rint(-10, 10); });
      var s = vals.reduce(function (a, b) { return a + b; }, 0);
      vals[4] += mean * 5 - s;
      var total = mean * 5;
      return { kind: 'num', q: 'A bicycle hire firm has five branches. The table shows the number of bikes hired at each branch last week.' + table(['Branch', 'Bikes hired'], names.map(function (n, i) { return [n, fmt(vals[i])]; })) + 'Calculate the average (mean) number of bikes hired per branch.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'Add the branches: ' + vals.join(' + ') + ' = ' + fmt(total) + '. Then divide by the 5 branches: ' + fmt(total) + ' ÷ 5 = ' + fmt(mean) + ' bikes per branch.' };
    } },
    { skill: 'mean-table', gen: function () {
      var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var vals = days.map(function () { return rint(40, 160); });
      var total = vals.reduce(function (a, b) { return a + b; }, 0);
      var mean = R.roundDp(total / 6, 1);
      return { kind: 'num', q: 'A phone repair shop recorded the number of customers each day for one week.' + table(['Day'].concat(days), [['Customers'].concat(vals.map(String))]) + 'Calculate the average number of customers per day. Give your answer to 1 decimal place.',
        answer: mean, unit: '', tol: 0.05, display: mean.toFixed(1),
        why: 'Total customers = ' + vals.join(' + ') + ' = ' + fmt(total) + '. Average = ' + fmt(total) + ' ÷ 6 days = ' + mean.toFixed(1) + ' to 1 decimal place.' };
    } },
    { skill: 'mean-table', gen: function () {
      var labels = ['Shop A', 'Shop B', 'Shop C', 'Shop D'];
      var mean = rint(30, 120) * 100;
      var vals = [mean + rint(-8, 8) * 100, mean + rint(-8, 8) * 100, mean + rint(-8, 8) * 100];
      vals.push(mean * 4 - vals[0] - vals[1] - vals[2]);
      return { kind: 'num', q: 'A stationery chain recorded its monthly revenue at four shops.' + table(['Shop', 'Revenue ($)'], labels.map(function (l, i) { return [l, fmt(vals[i])]; })) + 'Calculate the average revenue per shop. Give your answer in $.',
        answer: mean, unit: '$', display: fmt(mean),
        why: 'Total = $' + vals.map(fmt).join(' + $') + ' = $' + fmt(mean * 4) + '. Average = $' + fmt(mean * 4) + ' ÷ 4 = $' + fmt(mean) + ' per shop.' };
    } },
    { skill: 'mean-simple', gen: function () {
      var n = rint(7, 13);
      var mean = rint(6, 30);
      var total = n * mean;
      return { kind: 'num', q: 'A food-truck business runs ' + n + ' trucks at a city festival. Between them, the trucks served ' + fmt(total) + ' customers in the first hour.<br>Calculate the average number of customers served per truck in that hour.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'Average = ' + fmt(total) + ' ÷ ' + n + ' trucks = ' + fmt(mean) + ' customers per truck.' };
    } },
    { skill: 'mean-rounded', gen: function () {
      var n = rint(7, 15);
      var total = rint(900, 4000);
      if (total % n === 0) total += 1;
      var mean = Math.round(total / n);
      return { kind: 'num', q: 'A chain of ' + n + ' flower stalls sold ' + fmt(total) + ' bunches of tulips on Mother\'s Day.<br>Calculate the average number of bunches sold per stall. Give your answer to the nearest whole number.',
        answer: mean, unit: '', display: fmt(mean),
        why: 'Average = ' + fmt(total) + ' ÷ ' + n + ' = ' + R.roundDp(total / n, 2) + ' (to 2 decimal places), which is ' + fmt(mean) + ' bunches to the nearest whole number.' };
    } },

    { skill: 'mean-method', gen: function () {
      var n = rint(15, 45);
      var mean = rint(80, 400);
      var total = n * mean;
      var wrong = R.roundDp(n / total, 4);
      return { kind: 'mcq', q: 'A phone network has ' + n + ' shops that sold ' + fmt(total) + ' phones in a year. A student calculates ' + n + ' ÷ ' + fmt(total) + ' = ' + wrong + '. What mistake has the student made?',
        options: ['Dividing the shops by the total, instead of the total by the shops', 'Forgetting to write the total in millions before dividing', 'Multiplying the two numbers when they should be divided', 'Using the number of employees instead of the number of shops'], answer: 0,
        why: 'The average is total ÷ number = ' + fmt(total) + ' ÷ ' + n + ' = ' + fmt(mean) + ' phones per shop. The student divided upside down, giving a tiny figure that makes no sense.' };
    } },
    mc('mean-method', 'Which formula gives the average (mean) number of units sold per outlet?',
      ['Total units sold ÷ number of outlets', 'Number of outlets ÷ total units sold', 'Total units sold × number of outlets', 'Total units sold − number of outlets'], 0,
      'The mean shares the total equally between the outlets, so divide the total by the number of outlets.'),
    { skill: 'mean-method', gen: function () {
      var mil = pick([2.4, 3.6, 4.8, 7.2]);
      var n = pick([1200, 2400, 3000, 4800]);
      var total = R.roundDp(mil * 1e6, 0);
      var right = R.roundDp(total / n, 0);
      var wrong = R.roundDp(mil * 1e5 / n, 0);
      return { kind: 'mcq', q: 'A tyre maker sold ' + mil + ' million tyres through ' + fmt(n) + ' garages. A student wrote ' + fmt(R.roundDp(mil * 1e5, 0)) + ' ÷ ' + fmt(n) + ' = ' + fmt(wrong) + ' tyres per garage. What has gone wrong?',
        options: ['The total is written with one zero too few; it should be ' + fmt(total), 'The student should have multiplied the total by the number of garages', 'The student should have divided the garages by the total', 'Nothing is wrong; the working and answer are correct'], answer: 0,
        why: mil + ' million = ' + fmt(total) + ', not ' + fmt(R.roundDp(mil * 1e5, 0)) + '. The correct average is ' + fmt(total) + ' ÷ ' + fmt(n) + ' = ' + fmt(right) + ' tyres per garage.' };
    } }
  ] };

  /* ===================== BUS-CALC-21 Labour productivity ===================== */
  function prodHour(cfg) {
    return function () {
      var h = rint(cfg.hours[0], cfg.hours[1]);
      var p = rint(cfg.rate[0], cfg.rate[1]) * (cfg.step || 1);
      var out = h * p;
      return { kind: 'num', q: cfg.text(fmt(out), h), answer: p, unit: cfg.unit, display: fmt(p),
        why: 'Productivity = output ÷ hours = ' + fmt(out) + ' ÷ ' + h + ' = ' + fmt(p) + ' ' + cfg.unitLong + '.' };
    };
  }
  B['BUS-CALC-21'] = { title: 'Labour productivity: output per hour', items: [
    { skill: 'per-hour', gen: prodHour({ hours: [16, 40], rate: [12, 90], unit: 'per hour', unitLong: 'bottles per hour',
      text: function (o, h) { return 'A small family juice business filled ' + o + ' bottles by hand in ' + h + ' hours of work.<br>Calculate the labour productivity in bottles per hour.'; } }) },
    { skill: 'per-hour', gen: prodHour({ hours: [6, 12], rate: [8, 30], unit: 'per hour', unitLong: 'calls per hour',
      text: function (o, h) { return 'A customer helpline team handled ' + o + ' calls during a ' + h + '-hour shift.<br>Calculate the team\'s productivity in calls per hour.'; } }) },
    { skill: 'per-hour', gen: prodHour({ hours: [20, 50], rate: [4, 25], step: 10, unit: 'per hour', unitLong: 'books per hour',
      text: function (o, h) { return 'A printing works printed ' + o + ' books in ' + h + ' hours.<br>Calculate its productivity in books per hour.'; } }) },
    { skill: 'per-hour', gen: prodHour({ hours: [8, 24], rate: [15, 60], unit: 'per hour', unitLong: 'toys per hour',
      text: function (o, h) { return 'A toy factory made ' + o + ' wooden toys in ' + h + ' hours.<br>Calculate the factory\'s productivity in toys per hour.'; } }) },
    { skill: 'per-hour', gen: function () {
      var h = rint(5, 10), p = rint(18, 45), out = h * p;
      return { kind: 'num', q: 'A bakery\'s night team baked ' + fmt(out) + ' loaves between 10pm and ' + (10 + h - 12 > 0 ? (10 + h - 12) + 'am' : (10 + h) + 'pm') + ', working without a break.<br>Calculate the team\'s productivity in loaves per hour.',
        answer: p, unit: 'per hour', display: fmt(p),
        why: 'The shift lasted ' + h + ' hours. Productivity = ' + fmt(out) + ' ÷ ' + h + ' = ' + fmt(p) + ' loaves per hour.' };
    } },

    { skill: 'per-worker', gen: function () {
      var w = rint(12, 60), p = rint(15, 45), out = w * p;
      return { kind: 'num', q: 'In one day, ' + w + ' machinists at a clothing workshop sewed ' + fmt(out) + ' shirts.<br>Calculate the labour productivity in shirts per worker per day.',
        answer: p, unit: 'per worker', display: fmt(p),
        why: 'Productivity = output ÷ number of workers = ' + fmt(out) + ' ÷ ' + w + ' = ' + fmt(p) + ' shirts per worker per day.' };
    } },
    { skill: 'per-worker', gen: function () {
      var w = rint(6, 20), p = rint(3, 12) * 10, out = w * p;
      return { kind: 'num', q: 'A fruit farm employs ' + w + ' pickers. Yesterday they picked ' + fmt(out) + ' crates of apples.<br>Calculate the productivity in crates per picker.',
        answer: p, unit: 'per worker', display: fmt(p),
        why: fmt(out) + ' crates ÷ ' + w + ' pickers = ' + fmt(p) + ' crates per picker.' };
    } },
    { skill: 'per-worker', gen: function () {
      var w = rint(25, 80), p = rint(40, 160), out = w * p;
      return { kind: 'num', q: 'A data-processing office has ' + w + ' clerks. In one week they processed ' + fmt(out) + ' insurance claims.<br>Calculate the labour productivity in claims per clerk per week.',
        answer: p, unit: 'per worker', display: fmt(p),
        why: 'Productivity = ' + fmt(out) + ' ÷ ' + w + ' = ' + fmt(p) + ' claims per clerk per week.' };
    } },

    { skill: 'hours-first', gen: function () {
      var w = rint(4, 15), s = pick([6, 7, 8, 10, 12]), p = rint(2, 8), hrs = w * s, out = hrs * p;
      return { kind: 'num', q: 'A furniture factory has ' + w + ' workers who each work a ' + s + '-hour shift. Together they assemble ' + fmt(out) + ' chairs in that shift.<br>Calculate the labour productivity in chairs per labour hour.',
        answer: p, unit: 'per hour', display: fmt(p),
        why: 'Total labour hours = ' + w + ' × ' + s + ' = ' + hrs + '. Productivity = ' + fmt(out) + ' ÷ ' + hrs + ' = ' + fmt(p) + ' chairs per labour hour.' };
    } },
    { skill: 'hours-first', gen: function () {
      var w = rint(3, 8), d = 5, s = pick([7, 8]), p = rint(2, 5), hrs = w * d * s, out = hrs * p;
      return { kind: 'num', q: 'A solar-panel installer has ' + w + ' fitters. Each works ' + s + ' hours a day for ' + d + ' days. That week they fitted ' + fmt(out) + ' panels.<br>Calculate the productivity in panels per labour hour.',
        answer: p, unit: 'per hour', display: fmt(p),
        why: 'Labour hours = ' + w + ' × ' + s + ' × ' + d + ' = ' + hrs + '. Productivity = ' + fmt(out) + ' ÷ ' + hrs + ' = ' + fmt(p) + ' panels per labour hour.' };
    } },
    { skill: 'hours-first', gen: function () {
      var w = rint(10, 30), s = 8, p = rint(10, 40), hrs = w * s, out = hrs * p;
      var opts = [fmt(out) + ' ÷ (' + w + ' × ' + s + ')', fmt(out) + ' ÷ ' + w + ' ÷ ' + s + ' × ' + s, fmt(out) + ' × ' + w + ' × ' + s, '(' + w + ' × ' + s + ') ÷ ' + fmt(out)];
      opts[1] = fmt(out) + ' ÷ ' + s;
      return { kind: 'mcq', q: 'A packaging plant has ' + w + ' workers on an ' + s + '-hour shift who pack ' + fmt(out) + ' boxes. Which calculation gives productivity in boxes per labour hour?',
        options: opts, answer: 0,
        why: 'First find the labour hours, ' + w + ' × ' + s + ' = ' + hrs + ', then divide output by it: ' + fmt(out) + ' ÷ ' + hrs + ' = ' + fmt(p) + ' boxes per labour hour.' };
    } },

    { skill: 'compare', gen: function () {
      var h = rint(10, 20), p1 = rint(20, 50), up = rint(3, 15), p2 = p1 + up;
      var o1 = h * p1, o2 = h * p2;
      return { kind: 'num', q: 'A printer-cartridge factory made ' + fmt(o1) + ' cartridges in ' + h + ' hours. After new equipment was installed it made ' + fmt(o2) + ' cartridges in the same number of hours.<br>By how many cartridges per hour has productivity increased?',
        answer: up, unit: 'per hour', display: String(up),
        why: 'Before: ' + fmt(o1) + ' ÷ ' + h + ' = ' + p1 + ' per hour. After: ' + fmt(o2) + ' ÷ ' + h + ' = ' + p2 + ' per hour. Increase = ' + p2 + ' − ' + p1 + ' = ' + up + ' cartridges per hour.' };
    } },
    { skill: 'compare', gen: function () {
      var ha = rint(8, 16), pa = rint(20, 40), hb = rint(8, 16), pb = pa + pick([-6, -4, -3, 3, 4, 6]);
      var oa = ha * pa, ob = hb * pb;
      var better = pa > pb ? 'Factory A' : 'Factory B';
      var worse = pa > pb ? 'Factory B' : 'Factory A';
      return { kind: 'mcq', q: 'Factory A made ' + fmt(oa) + ' lamps in ' + ha + ' hours. Factory B made ' + fmt(ob) + ' lamps in ' + hb + ' hours. Which statement is correct?',
        options: [better + ' is more productive, with ' + Math.max(pa, pb) + ' lamps per hour', worse + ' is more productive, with ' + Math.min(pa, pb) + ' lamps per hour', 'Both factories have the same productivity', 'The factory with the larger total output must be more productive'], answer: 0,
        why: 'A: ' + fmt(oa) + ' ÷ ' + ha + ' = ' + pa + ' per hour. B: ' + fmt(ob) + ' ÷ ' + hb + ' = ' + pb + ' per hour. Productivity compares output per hour, not total output.' };
    } },
    { skill: 'compare', gen: function () {
      var h1 = rint(8, 12), h2 = h1 - rint(1, 3), m = rint(3, 8);
      var out = m * h1 * h2, p1 = m * h2, p2 = m * h1, up = p2 - p1;
      return { kind: 'num', q: 'A car-parts workshop used to take ' + h1 + ' hours to make ' + fmt(out) + ' brake pads. After staff training it makes the same ' + fmt(out) + ' brake pads in ' + h2 + ' hours.<br>By how many brake pads per hour has productivity increased?',
        answer: up, unit: 'per hour', display: String(up),
        why: 'Before: ' + fmt(out) + ' ÷ ' + h1 + ' = ' + p1 + ' per hour. After: ' + fmt(out) + ' ÷ ' + h2 + ' = ' + p2 + ' per hour. Increase = ' + p2 + ' − ' + p1 + ' = ' + up + ' brake pads per hour.' };
    } },
    { skill: 'compare', gen: function () {
      var w = rint(10, 25), p = rint(20, 40), out = w * p, extra = rint(2, 6) * w;
      var p2 = (out + extra) / w;
      return { kind: 'num', q: 'A call centre has ' + w + ' staff who answer ' + fmt(out) + ' calls a day. A new phone system raises this to ' + fmt(out + extra) + ' calls a day with the same staff.<br>Calculate the new productivity in calls per worker per day.',
        answer: p2, unit: 'per worker', display: fmt(p2),
        why: 'New productivity = ' + fmt(out + extra) + ' ÷ ' + w + ' = ' + fmt(p2) + ' calls per worker per day (up from ' + p + ').' };
    } },

    { skill: 'method', gen: function () {
      var h = rint(8, 25), p = rint(20, 80), out = h * p;
      return { kind: 'mcq', q: 'A jam factory made ' + fmt(out) + ' jars in ' + h + ' hours. A student calculates ' + h + ' ÷ ' + fmt(out) + '. What mistake has the student made?',
        options: ['The division is upside down; it should be output ÷ hours', 'The student should have multiplied the output by the hours', 'The student should have added the hours to the total output', 'There is no mistake; the calculation is set up correctly'], answer: 0,
        why: 'Productivity = output ÷ hours = ' + fmt(out) + ' ÷ ' + h + ' = ' + fmt(p) + ' jars per hour. Hours ÷ output gives a tiny number that is not productivity.' };
    } },
    mc('method', 'Which formula gives labour productivity?',
      ['Total output ÷ labour input (hours worked or number of workers)', 'Labour input (hours worked or number of workers) ÷ total output', 'Total output × labour input (hours worked or number of workers)', 'Total revenue − total costs of the business'], 0,
      'Labour productivity measures output for each unit of labour, so divide output by the hours or workers. Revenue minus costs is profit.'),
    mc('method', 'A student writes the answer to a productivity question as "45". Which version would be the clearest answer?',
      ['45 televisions per hour', '45 hours per television', '45 televisions in total', '45% productivity'], 0,
      'Productivity always needs its unit: the output per unit of labour, here televisions per hour.'),

    mc('concept', 'What does labour productivity measure?',
      ['How efficiently workers turn their time into output', 'How much profit the business makes from each worker', 'How many workers the business employs on its payroll', 'How much each worker is paid for every hour worked'], 0,
      'Productivity compares output with labour input, so it shows how efficient workers are.'),
    mc('concept', 'A factory raises its productivity while its wage bill stays the same. What is the most likely effect?',
      ['The labour cost of making each unit falls', 'The labour cost of making each unit rises', 'Total output falls because workers are busier', 'The number of workers must increase'], 0,
      'More output from the same wage bill spreads the labour cost over more units, so the cost per unit falls, which can allow lower prices or higher profit.'),
    mu('concept', 'Select <b>all</b> the changes that would be likely to <b>increase</b> labour productivity.',
      ['Training workers to use machines more skilfully', 'Replacing old machines with faster ones', 'Improving motivation so workers put in more effort', 'Making workers wait longer for materials to arrive', 'Using worn-out tools that often break'], [0, 1, 2],
      'Training, better machinery and motivation all help each worker produce more per hour. Delays and broken tools reduce output per hour.'),
    mc('concept', 'Factory X makes more units in total than Factory Y. Why does this not prove that Factory X is more productive?',
      ['Factory X may use many more labour hours, so its output per hour could be lower', 'Productivity depends only on the price of the product, not on output', 'Total output and productivity always mean exactly the same thing', 'Productivity is always measured in dollars, not in units of output'], 0,
      'Productivity is output per unit of labour. A bigger factory can make more in total but still produce less per hour worked.')
  ] };
})();
