// Scenarios for the live call simulator (w: 'a' = agent, 'c' = caller, lat = response latency in ms).
export const SC = [
  { name: 'Emergency AC Repair', sub: 'Tuesday · 2:14 PM', biz: 'Summit Comfort Heating & Air',
    at: 1, intent: 'Emergency AC repair', urgency: 'High', outcome: 'Booked 4:00 PM · SMS sent',
    lines: [
      { w: 'a', lat: 312, t: 'Thanks for calling Summit Comfort Heating and Air, this is Ava. How can I help?' },
      { w: 'c', t: 'Hi, my AC just stopped blowing cold air and it is ninety-eight degrees in here.' },
      { w: 'a', lat: 287, t: 'I am sorry about that, let us get a technician out to you. Is the system running at all, or completely off?' },
      { w: 'c', t: 'The fan runs, but the air is warm.' },
      { w: 'a', lat: 341, t: 'Got it. I can have a technician there today between four and six. Can I get your address?' },
      { w: 'c', t: 'Sure, two fourteen Maple Ridge Drive.' },
      { w: 'a', lat: 296, t: 'Perfect. You are booked for four o\'clock today, and I am texting a confirmation to this number now.' }
    ] },
  { name: 'Weekend Emergency', sub: 'Saturday · 11:48 PM', biz: 'Harbor Plumbing, after-hours line',
    at: 1, intent: 'Burst pipe', urgency: 'Critical', outcome: 'On-call tech dispatched',
    lines: [
      { w: 'a', lat: 301, t: 'Harbor Plumbing after-hours line, this is Ava. What is happening?' },
      { w: 'c', t: 'A pipe burst under my kitchen sink and water is going everywhere.' },
      { w: 'a', lat: 276, t: 'First, shut off the valve under the sink or the main water line. Can you do that safely?' },
      { w: 'c', t: 'Okay, it is off.' },
      { w: 'a', lat: 318, t: 'Good. I am dispatching our on-call plumber now. What is the address?' },
      { w: 'c', t: 'Eighty-eight Cedar Lane.' },
      { w: 'a', lat: 289, t: 'Dispatched. Estimated arrival is thirty-five minutes, and your plumber has been alerted by text.' }
    ] },
  { name: 'Pricing Inquiry', sub: 'Wednesday · 10:05 AM', biz: 'Brightline Electric',
    at: 1, intent: 'Quote request', urgency: 'Low', outcome: 'Estimate booked Thu 9 AM',
    lines: [
      { w: 'a', lat: 298, t: 'Brightline Electric, this is Ava. How can I help today?' },
      { w: 'c', t: 'How much does it cost to upgrade an electrical panel?' },
      { w: 'a', lat: 322, t: 'It depends on the amperage and the age of the home, so I cannot quote an exact price over the phone. I can book a no-obligation estimate. Would Thursday morning work?' },
      { w: 'c', t: 'Thursday at nine works.' },
      { w: 'a', lat: 283, t: 'Booked for Thursday at nine. You will get a text with the estimator\'s name and a calendar invite.' }
    ] }
];
