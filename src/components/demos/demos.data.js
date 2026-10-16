// Sample call scenarios.
//   lines: [speaker, text]   'a' = agent, 'c' = caller
//   steps: { at, text }      ticks off in the call report when line index `at` starts playing
//   problem / result / stamp  plain-language summary shown in the call report
export const DEMOS = [
  { tag: 'HVAC',
    short: 'Furnace failure at night', biz: 'Northline Heating & Cooling',
    problem: 'The furnace shut off in the middle of the night and the house is getting cold.',
    steps: [{ at: 2, text: 'Checked for gas or a burning smell' },{ at: 4, text: 'Offered two arrival times' },{ at: 6, text: 'Confirmed the address on file' },{ at: 8, text: 'Texted the on-call technician' }],
    result: 'Technician booked for 11:30 PM tonight.', stamp: 'Booked', when: 'Night call · 1:52 AM', title: 'HVAC & Emergency Furnace Failure', desc: 'A furnace dies on a freezing night. The agent checks for gas, offers two arrival windows and texts the on-call tech.',
    lines: [
      ['a', 'Thank you for calling Northline Heating and Cooling. This is Ava, how can I help?'],
      ['c', 'Hi, my furnace just shut off and the house is getting really cold.'],
      ['a', 'I am sorry to hear that. Is the thermostat still lit, and do you smell gas or burning?'],
      ['c', 'The screen is on. No smell, it just will not start.'],
      ['a', 'Good, that makes this urgent but not dangerous. I can send a technician tonight at eleven thirty, or first thing at seven. Which works?'],
      ['c', 'Tonight please. It is twenty degrees outside.'],
      ['a', 'Booked for eleven thirty. Can you confirm the address on file, four twelve Birch Street?'],
      ['c', 'Yes, that is right.'],
      ['a', 'Done. The on-call tech has been texted, and you will get a confirmation with his name in a moment.']
    ] },
  { tag: 'Medical & Dental',
    short: 'Urgent appointment change', biz: 'Lakeside Family Dental',
    problem: 'A patient with a worsening toothache needs to move her appointment.',
    steps: [{ at: 2, text: 'Asked for name and date of birth' },{ at: 4, text: 'Found the booking and offered a same-day slot' },{ at: 6, text: 'Moved the visit, flagged it urgent and sent a text' }],
    result: 'Moved to 2:15 PM today and flagged as urgent for the clinical team.', stamp: 'Rescheduled', when: 'Morning · 8:41 AM', title: 'Dental & Medical Urgent Appointment Rescheduling', desc: 'A patient in pain needs to move an appointment. The agent finds the booking, offers a same-day slot and flags it urgent.',
    lines: [
      ['a', 'Good morning, Lakeside Family Dental, this is Ava. How can I help?'],
      ['c', 'I need to move my appointment. I have a toothache that is getting worse.'],
      ['a', 'I am sorry you are in pain. Can I have your name and date of birth to find your appointment?'],
      ['c', 'Maria Alvarez, March ninth, nineteen eighty-eight.'],
      ['a', 'Thanks, Maria. You are booked for next Thursday. Because of the pain, I can offer today at two fifteen. Would that work?'],
      ['c', 'Yes, today is much better.'],
      ['a', 'Done. I have moved you to two fifteen today and flagged the visit as urgent for the clinical team. A text confirmation is on its way.']
    ] },
  { tag: 'Plumbing',
    short: 'Leak through the ceiling', biz: 'Rivermark Plumbing',
    problem: 'Water is dripping through the ceiling from the upstairs bathroom.',
    steps: [{ at: 2, text: 'Checked the water was shut off' },{ at: 4, text: 'Asked about the ceiling and electrical safety' },{ at: 6, text: 'Rated it a same-day leak and offered a 1–3 PM window' },{ at: 8, text: 'Sent the details to dispatch' }],
    result: 'Plumber booked for between 1 and 3 PM today.', stamp: 'Dispatched', when: 'Afternoon · 3:07 PM', title: 'Plumbing Dispatch & Leak Assessment', desc: 'Water through a ceiling. The agent runs a quick safety check, rates the leak and books a same-day plumber.',
    lines: [
      ['a', 'Rivermark Plumbing, this is Ava. What is going on?'],
      ['c', 'There is water dripping through my ceiling from the upstairs bathroom.'],
      ['a', 'Understood. Is the water still running, and can you reach the shutoff valve for that bathroom?'],
      ['c', 'I turned it off at the valve. It is slowing down.'],
      ['a', 'That is the right move. Is the ceiling sagging, or is any water near outlets or lights?'],
      ['c', 'It is bulging a bit, but no water near the lights.'],
      ['a', 'Okay, I am marking this as a same-day leak. A plumber can arrive between one and three. What is the address?'],
      ['c', 'Twenty-two Ashford Court.'],
      ['a', 'Booked. Your plumber will text you when he is on the way, and I have sent the details to dispatch.']
    ] },
  { tag: 'Roofing',
    short: 'Storm damage inspection', biz: 'Ridgeview Roofing',
    problem: 'Last night\'s storm blew shingles off the roof and the owner wants it looked at.',
    steps: [{ at: 2, text: 'Checked for water coming inside' },{ at: 4, text: 'Offered a free inspection with two time slots' },{ at: 6, text: 'Booked it and promised a text with the inspector\'s name' }],
    result: 'Free inspection booked for Wednesday at 10 AM.', stamp: 'Booked', when: 'Morning · 9:20 AM', title: 'Roofing & Storm Damage Free Inspection Booking', desc: 'The morning after a storm. The agent confirms the damage is outside only and books a free inspection.',
    lines: [
      ['a', 'Thanks for calling Ridgeview Roofing, this is Ava.'],
      ['c', 'Hi, that storm last night took some shingles off my roof. I would like someone to look at it.'],
      ['a', 'Sorry to hear that. Do you see any water coming inside, or is the damage only outside?'],
      ['c', 'Just outside so far. A few shingles in the yard.'],
      ['a', 'Got it. We offer a free storm damage inspection. I have Wednesday at ten or Thursday at one.'],
      ['c', 'Wednesday at ten.'],
      ['a', 'You are set for Wednesday at ten. Please keep any photos of the damage handy. I will text you a confirmation and the inspector\'s name.'],
      ['c', 'Great, thank you.'],
      ['a', 'You are welcome. Stay safe.']
    ] }
];
