// components/FacebookConnectButton.tsx
export default function FacebookConnectButton() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!;
  const REDIRECT_URI = "http://localhost:3001/api/facebook/callback";
  const SCOPES = "pages_show_list,pages_manage_posts,pages_read_engagement";

  const handleLogin = () => {
    const authUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}&response_type=code`;
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Connect Facebook</button>;
}
