// import NextAuth from "next-auth";
// import SpotifyProvider from "next-auth/providers/spotify";
// import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

// // Server Side
// // Using a JWT callback and a session callback
// // we can persist OAuth tokens and refresh them when they expire
// async function refreshAccessToken(token) {
//   try {
//     spotifyApi.setAccessToken(token.accessToken);
//     spotifyApi.setRefreshToken(token.refreshToken);

//     const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
//     console.log("REFRESH TOKEN IS: ", refreshedToken);
//     return {
//       ...token,
//       accessToken: refreshedToken.access_token,
//       accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
//       refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
//       // token.refreshToken work as default if refreshedToken.refresh_token is null
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export default NextAuth({
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//       authorization: LOGIN_URL,
// "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-read-collaborative,user-top-read,user-read-currently-playing,user-read-recently-played,user-read-email,streaming,user-read-private,user-library-read,user-library-modify,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-follow-read,user-follow-modify",
//     }),
//   ],
//   secret: process.env.JWT_SECRET,
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     // add the AccessToken and RefreshToken and User to the json web token returned by spotify API
//     async jwt({ token, account, user }) {
//       // initial Sign in
//       if (account && user) {
//         return {
//           ...token,
//           user,
//           accessToken: account.access_token,
//           refreshToken: account.refresh_token,
//           username: account.provider.providerAccountId,
//           accessTokenExpires: account.expires_at * 1000, // account.expires_at=3600sec and *1000 is to get the expiry times in millisecondes
//         };
//       }

//       // return previous token if the access token has not expired yet
//       if (Date.now() < token.accessTokenExpires) {
//         console.log("ACCESS TOKEN IS VALID");
//         return token;
//       }

//       // get a new one if access Token has expired
//       console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
//       return await refreshAccessToken(token);
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       session.accessToken = token.accessToken;
//       session.error = token.error;

//       return session;
//     },
//   },
// });

// 되는 예니퍼 코드
// import NextAuth from "next-auth";
// import SpotifyProvider from "next-auth/providers/spotify";

// /**
//  * Takes a token, and returns a new token with updated
//  * `accessToken` and `accessTokenExpires`. If an error occurs,
//  * returns the old token and an error property
//  */
// async function refreshAccessToken(token) {
//   try {
//     const url =
//       "https://accounts.spotify.com/api/token?" +
//       new URLSearchParams({
//         client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//         client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       });

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//       authorization:
//         "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-read-email,streaming,user-read-private,user-library-read,user-library-modify,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-follow-read",
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   // Refresh Token Rotation 참고
//   callbacks: {
//     async jwt({ token, user, account }) {
//       // Initial sign in
//       if (account && user) {
//         return {
//           accessToken: account.access_token,
//           accessTokenExpires: Date.now() + account.expires_at * 1000,
//           refreshToken: account.refresh_token,
//           user,
//         };
//       }

//       // Return previous token if the access token has not expired yet
//       if (Date.now() < token.accessTokenExpires) {
//         return token;
//       }

//       // Access token has expired, try to update it
//       return refreshAccessToken(token);
//     },
//     async session({ session, token }) {
//       // session.user = token.user;
//       // session.accessToken = token.accessToken;
//       // session.error = token.error;
//       session.user.accessToken = token.accessToken;
//       session.user.refreshToken = token.refreshToken;
//       session.user.username = token.username;

//       return session;
//     },
//   },
// });

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

// Server Side
// Using a JWT callback and a session callback
// we can persist OAuth tokens and refresh them when they expire
async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESH TOKEN IS : ", refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, //token.refreshToken work as default if refreshedToken.refresh_token is null
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //add the AccessToken and RefreshToken and User to the json web token returned by spotify API
    async jwt({ token, account, user }) {
      //initial Sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.provider.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // account.expires_at=3600sec and *1000 is to get the expiry times in millisecondes
        };
      }

      //return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("ACCESS TOKEN IS VALID");
        return token;
      }

      //Access Token has expired ==> we need to get a new one
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
