import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    alert(`Logging in with ${email}`);
  };

  return (
    <div>
      <h2>Login 🔐</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
