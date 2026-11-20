
const BOARD_CONFIG = {

  supabaseUrl: 'https://bhrjkgwjeutoxzmogvav.supabase.co',   
  supabaseKey: 'sb_publishable_sGuafm-qyRLS3wJyQRe2eA_nB1YKiBi',
  maxNotes: 40,
  cooldownSeconds: 45,

 
  blockedWords: ['viagra', 'casino', 'crypto giveaway', 'free money', 'click here', 'subscribe', 'follow me', 'porn', 'sex', 'nude', 'xxx', ],

  welcomeNotes: [
    { name: 'Sydney', message: 'Welcome to my board! Leave a note, say hi, or tell me your favorite latte flavor ♡', color: 'pink' }
  ],

  // show the reason on the page when the board can't connect (set to false once it works)
  showErrors: true
};
