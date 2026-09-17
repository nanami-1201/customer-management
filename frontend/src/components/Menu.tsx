import CustomerManagement from "./CustomerManagement";
import CustomerRegister from "./CustomerRegister";
import UserRegister from "./UserRegister";
import { useState } from "react";

type MenuProps = {
    onLogout: () => void;
};

function Menu({ onLogout }: MenuProps) {
    const [showCustomers, setShowCustomers] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showUserRegister, setShowUserRegister] = useState(false);

    const token = localStorage.getItem("token");

    let userName = "ゲスト";

    if (token) {
        try {
            const base64Url = token.split(".")[1];

            const base64 = base64Url
                .replace(/-/g, "+")
                .replace(/_/g, "/");

            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(
                        (char) =>
                            "%" +
                            ("00" + char.charCodeAt(0).toString(16)).slice(-2)
                    )
                    .join("")
            );

            const payload = JSON.parse(jsonPayload);

            userName = payload.name || "ゲスト";
        } catch (error) {
            console.error("JWTの読み取りに失敗しました", error);
        }
    }

    if (showRegister) {
        return (
            <div className="app-page">
                <CustomerRegister
                    onRegistered={() => setShowRegister(false)}
                />

                <button
                    className="secondary-button"
                    onClick={() => setShowRegister(false)}
                >
                    ← メニューに戻る
                </button>
            </div>
        );
    }

    if (showCustomers) {
        return (
            <div className="app-page">
                <CustomerManagement
                    onBack={() => setShowCustomers(false)}
                />
            </div>
        );
    }

    if (showUserRegister) {
        return (
            <div className="app-page">
                <UserRegister
                    onRegistered={() => setShowUserRegister(false)}
                />

                <button
                    className="secondary-button"
                    onClick={() => setShowUserRegister(false)}
                >
                    ← メニューに戻る
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <p className="app-name">CUSTOMER MANAGEMENT</p>
                    <h1>ダッシュボード</h1>
                </div>

                <div className="user-area">
                    <span>こんにちは、{userName}さん</span>

                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        ログアウト
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="welcome-section">
                    <h2>今日もお疲れ様です。</h2>
                    <p>
                        顧客情報の管理や登録をここから行えます。
                    </p>
                </section>

                <section className="menu-grid">
                    <button
                        className="menu-card primary"
                        onClick={() => setShowCustomers(true)}
                    >
                        <span className="menu-icon">👥</span>
                        <span className="menu-title">顧客一覧</span>
                        <span className="menu-description">
                            顧客情報の確認・検索・編集
                        </span>
                    </button>

                    <button
                        className="menu-card"
                        onClick={() => setShowRegister(true)}
                    >
                        <span className="menu-icon">＋</span>
                        <span className="menu-title">顧客登録</span>
                        <span className="menu-description">
                            新しい顧客情報を登録
                        </span>
                    </button>

                    <button className="menu-card">
                        <span className="menu-icon">📋</span>
                        <span className="menu-title">共有情報</span>
                        <span className="menu-description">
                            チームで共有する情報
                        </span>
                    </button>

                    <button className="menu-card">
                        <span className="menu-icon">📅</span>
                        <span className="menu-title">スケジュール</span>
                        <span className="menu-description">
                            予定の確認
                        </span>
                    </button>

                    <button
                        className="menu-card"
                        onClick={() => setShowUserRegister(true)}
                    >
                        <span className="menu-icon">👤</span>
                        <span className="menu-title">ユーザー登録</span>
                        <span className="menu-description">
                            システム利用者を登録
                        </span>
                    </button>
                </section>
            </main>
        </div>
    );
}

export default Menu;