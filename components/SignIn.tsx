import { ConnectEmbed, darkTheme } from "@thirdweb-dev/react";

const customTheme = darkTheme({
    colors: {
        modalBg: "black",
    }
});

const SignIn = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
            <h1>Login to chat</h1>
            <ConnectEmbed
              theme={customTheme}
              style={{
                border: "none",
              }}
            />
          </div>
    )
};

export default SignIn;