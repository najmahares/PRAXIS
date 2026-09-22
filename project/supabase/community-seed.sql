insert into community_posts
  (user_id, author_name, author_initials, author_color, kind, title, body, tags, is_pinned, is_official)
values
  ('official', 'PRAXIS Team', 'PT', '#2563eb', 'discussion',
   'Welcome to Community',
   'Share what you are learning, ask questions about anything you do not understand, and celebrate the trades that taught you something.

Two rules that keep this useful:
No price predictions on specific tickers. No promises of returns.
No contact requests. If someone asks you to DM or WhatsApp them, report it.

Everything here is practice. Nothing is advice.',
   ARRAY['welcome', 'rules'], true, true),
  ('official', 'PRAXIS Team', 'PT', '#2563eb', 'challenge',
   'This week: describe one holding in three sentences',
   'Pick any position in your portfolio. Write three sentences: what the company does, why you bought it, and what would make you sell.

Post it as a reply. Getting it into words is the exercise. Do not polish it, just say it.',
   ARRAY['challenge', 'thesis'], false, true),
  ('official', 'PRAXIS Team', 'PT', '#2563eb', 'discussion',
   'What did your first loss teach you?',
   'Most people remember their first loss far longer than their first win. If you have taken one, what did it change about the way you trade?

If you have not taken one yet, what do you think it will feel like?',
   ARRAY['psychology', 'losses'], false, true);
