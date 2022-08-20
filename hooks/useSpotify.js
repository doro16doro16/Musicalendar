import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

// 싱글톤 패턴. 하나의 인스턴스 만들어서 spotify 객체 한 번 초기화한 후 전체에서 재사용
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, direct user to login...
      // 수동 로그인
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.accessToken); // 수정
      // spotifyApi.setAccessToken(session?.accessToken);
    }
  }, [session]); // login & logout
  return spotifyApi;
}

export default useSpotify;
