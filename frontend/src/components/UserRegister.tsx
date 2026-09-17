import { useState } from "react";

type UserRegisterProps = {
    onRegistered: () => void;
};

function UserRegister({
    onRegistered,
}: UserRegisterProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    async function registerUser() {
        setError("");

        if (!name.trim()) {
            setError("名前を入力してください。");
            return;
        }

        if (!email.trim()) {
            setError("メールアドレスを入力してください。");
            return;
        }

        if (!password) {
            setError("パスワードを入力してください。");
            return;
        }

        if (password.length < 8) {
            setError("パスワードは8文字以上で入力してください。");
            return;
        }

        try {
            setIsRegistering(true);

            const response = await fetch(
                "http://localhost:8080/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "ユーザー登録に失敗しました。"
                );
            }

            alert("ユーザー登録しました");

            setName("");
            setEmail("");
            setPassword("");

            onRegistered();
        } catch (error) {
            console.error(error);
            setError(
                "ユーザー登録に失敗しました。入力内容を確認してください。"
            );
        } finally {
            setIsRegistering(false);
        }
    }

    return (
        <div className="register-page">
            <div className="register-header">
                <div>
                    <p className="page-label">USER REGISTRATION</p>
                    <h1>ユーザー登録</h1>
                    <p className="page-description">
                        システムを利用するユーザーを登録します。
                    </p>
                </div>
            </div>

            <div className="register-card user-register-card">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-field">
                    <label>
                        名前 <span className="required">必須</span>
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="名前を入力"
                    />
                </div>

                <div className="form-field">
                    <label>
                        メールアドレス{" "}
                        <span className="required">
                            必須
                        </span>
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="example@example.com"
                    />
                </div>

                <div className="form-field">
                    <label>
                        パスワード{" "}
                        <span className="required">
                            必須
                        </span>
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="8文字以上"
                    />

                    <small className="field-help">
                        パスワードは8文字以上で入力してください。
                    </small>
                </div>

                <div className="form-actions">
                    <button
                        className="secondary-button"
                        onClick={onRegistered}
                        disabled={isRegistering}
                    >
                        戻る
                    </button>

                    <button
                        className="primary-button"
                        onClick={registerUser}
                        disabled={isRegistering}
                    >
                        {isRegistering
                            ? "登録中..."
                            : "ユーザーを登録"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserRegister;