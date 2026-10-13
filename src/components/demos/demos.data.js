// Audio demo scenarios. Lines are [speaker, text]; 'a' = agent, 'c' = caller.
export const DEMOS = [
  { tag: 'HVAC', when: 'Night call · 1:52 AM', title: 'HVAC & Emergency Furnace Failure', desc: 'A furnace dies on a freezing night. The agent checks for gas, offers two arrival windows and texts the on-call tech.',
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
  { tag: 'Medical & Dental', when: 'Morning · 8:41 AM', title: 'Dental & Medical Urgent Appointment Rescheduling', desc: 'A patient in pain needs to move an appointment. The agent finds the booking, offers a same-day slot and flags it urgent.',
    lines: [
      ['a', 'Good morning, Lakeside Family Dental, this is Ava. How can I help?'],
      ['c', 'I need to move my appointment. I have a toothache that is getting worse.'],
      ['a', 'I am sorry you are in pain. Can I have your name and date of birth to find your appointment?'],
      ['c', 'Maria Alvarez, March ninth, nineteen eighty-eight.'],
      ['a', 'Thanks, Maria. You are booked for next Thursday. Because of the pain, I can offer today at two fifteen. Would that work?'],
      ['c', 'Yes, today is much better.'],
      ['a', 'Done. I have moved you to two fifteen today and flagged the visit as urgent for the clinical team. A text confirmation is on its way.']
    ] },
  { tag: 'Plumbing', when: 'Afternoon · 3:07 PM', title: 'Plumbing Dispatch & Leak Assessment', desc: 'Water through a ceiling. The agent runs a quick safety check, rates the leak and books a same-day plumber.',
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
  { tag: 'Roofing', when: 'Morning · 9:20 AM', title: 'Roofing & Storm Damage Free Inspection Booking', desc: 'The morning after a storm. The agent confirms the damage is outside only and books a free inspection.',
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
