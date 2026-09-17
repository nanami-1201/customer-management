import { useState } from "react";

type LoginProps = {
    onLogin: () => void;
};

function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        if (!email || !password) {
            setError("メールアドレスとパスワードを入力してください。");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const result = await response.text();

            if (!response.ok) {
                setError("メールアドレスまたはパスワードが正しくありません。");
                return;
            }

            if (result.startsWith("eyJ")) {
                localStorage.setItem("token", result);
                onLogin();
            } else {
                setError("ログインに失敗しました。");
            }
        } catch (error) {
            console.error(error);
            setError("サーバーに接続できませんでした。");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Customer Management</h1>
                <p className="login-subtitle">顧客管理システム</p>

                <div className="form-group">
                    <label>メールアドレス</label>
                    <input
                        type="email"
                        placeholder="メールアドレスを入力"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>パスワード</label>
                    <input
                        type="password"
                        placeholder="パスワードを入力"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="login-error">{error}</p>}

                <button className="login-button" onClick={handleLogin}>
                    ログイン
                </button>
            </div>
        </div>
    );
}

export default Login;