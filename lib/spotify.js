import SpotifyWebApi from "spotify-web-api-node";

// https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
].join(","); // 스트림 하나로

const params = {
  scope: scopes,
};

// "https://accounts.spotify.com/authorize?scope=user-read-email"
const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;
// const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  // redirectUri: 'http://www.example.com/callback'
});

export default spotifyApi;

// [...nextauth].js에서 쓰임
export { LOGIN_URL };
