export default function LinkedInConnectButton() {
    console.log("client Id", process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!)
  
  const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!;
  const REDIRECT_URI = "http://localhost:3001/api/linkedin/callback";
  const SCOPE = "w_member_social";

  const handleConnect = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPE)}`;
    window.location.href = authUrl;
  };

  return <button onClick={handleConnect}>Connect LinkedIn</button>;
}
