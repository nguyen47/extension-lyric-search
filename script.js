let word = chrome.extension.getBackgroundPage().word;

const URL = "https://api.musixmatch.com/ws/1.1/";
const apiKey = "";

const searchTrack = async word => {
  const endPoint = `https://cors-anywhere.herokuapp.com/${URL}track.search?apikey=${apiKey}&q=${word}&s_track_rating=desc`;
  const response = await fetch(endPoint);
  const result = await response.json();
  let track_id;
  if (result.message.body.track_list.length > 0) {
    track_id = result.message.body.track_list[0].track.track_id;
  } else {
    track_id = null;
  }
  console.log(track_id);
  return track_id;
};

const getLyrics = async track_id => {
  const endPoint = `https://cors-anywhere.herokuapp.com/${URL}track.lyrics.get?apikey=${apiKey}&track_id=${track_id}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result.message.body.lyrics.lyrics_body;
};

const start = async word => {
  $(".title").append(word);
  const track_id = await searchTrack(word);
  if (track_id != null) {
    const lyric = await getLyrics(track_id);
    $(".lyric").append(lyric);
  }
  $(".lyric").append("Lyric not found !!");
};

start(word);
