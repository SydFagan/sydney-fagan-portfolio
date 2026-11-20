/* =========================================================
   MUSIC PLAYER PLAYLIST
   ---------------------------------------------------------
   The first three tracks are ORIGINAL songs made for this
   site. They're played live by the browser (no audio files),
   so there's nothing copyrighted to worry about.

   ADDING YOUR OWN SONGS
   1. Put the .mp3 file in the "music" folder.
   2. Add a line like this to the list below:
        { title: 'Song Name', artist: 'Artist', src: 'music/song-name.mp3' },
   Only add music you have the rights to use: your own
   songs, or royalty-free tracks whose license allows use
   on a website (e.g. Pixabay Music, Free Music Archive with
   a CC license). Popular songs from Spotify/YouTube
   are NOT okay to upload, even with credit.
   ========================================================= */
const PLAYLIST = [
  // bossa nova & 70s Japanese soft-pop vibes (inspired by bands like Lamp)
  { title: 'Afternoon Breeze',     artist: 'Sydney FM · original bossa', generator: 'breeze' },
  { title: 'City Lights at Dusk',  artist: 'Sydney FM · original soft pop', generator: 'dusk' },
  { title: 'Rain on the Window',   artist: 'Sydney FM · original ballad', generator: 'rain' },

  // the earlier Y2K tracks: remove the // to add them back
  // { title: 'Strawberry Breakbeat', artist: 'Sydney FM · original', generator: 'strawberry' },
  // { title: 'Bubblegum Dreams',     artist: 'Sydney FM · original', generator: 'bubblegum' },
  // { title: 'Latte at Midnight',    artist: 'Sydney FM · original', generator: 'latte' },

  // { title: 'My Song', artist: 'Me', src: 'music/my-song.mp3' },
];

/* Waves in the background pulse along with the music (true / false) */
const WAVES_DANCE = true;
