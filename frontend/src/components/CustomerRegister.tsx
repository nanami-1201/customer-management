import { useState } from "react";

type CustomerRegisterProps = {
    onRegistered: () => void;
};

function CustomerRegister({
    onRegistered,
}: CustomerRegisterProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [staff, setStaff] = useState("");
    const [company, setCompany] = useState("");
    const [firstVisitDate, setFirstVisitDate] = useState("");
    const [referrer, setReferrer] = useState("");
    const [businessCard, setBusinessCard] = useState(false);
    const [memo, setMemo] = useState("");

    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    async function addCustomer() {
        setError("");

        if (!name.trim()) {
            setError("氏名を入力してください。");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setError("ログイン情報がありません。");
            return;
        }

        const newCustomer = {
            name: name.trim(),
            phone: phone.trim(),
            staff: staff.trim(),
            company: company.trim(),
            firstVisitDate,
            referrer: referrer.trim(),
            businessCard,
            memo: memo.trim(),
        };

        try {
            setIsRegistering(true);

            const response = await fetch(
                "http://localhost:8080/customers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newCustomer),
                }
            );

            if (!response.ok) {
                throw new Error("顧客登録に失敗しました。");
            }

            setName("");
            setPhone("");
            setStaff("");
            setCompany("");
            setFirstVisitDate("");
            setReferrer("");
            setBusinessCard(false);
            setMemo("");

            onRegistered();
        } catch (error) {
            console.error(error);
            setError(
                "顧客を登録できませんでした。もう一度お試しください。"
            );
        } finally {
            setIsRegistering(false);
        }
    }

    return (
        <div className="register-page">
            <div className="register-header">
                <div>
                    <p className="page-label">CUSTOMER REGISTRATION</p>
                    <h1>顧客登録</h1>
                    <p className="page-description">
                        新しい顧客情報を登録します。
                    </p>
                </div>
            </div>

            <div className="register-card">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-grid">
                    <div className="form-field">
                        <label>
                            氏名 <span className="required">必須</span>
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="氏名を入力"
                        />
                    </div>

                    <div className="form-field">
                        <label>電話番号</label>

                        <input
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            placeholder="090-1234-5678"
                        />
                    </div>

                    <div className="form-field">
                        <label>担当</label>

                        <input
                            value={staff}
                            onChange={(e) =>
                                setStaff(e.target.value)
                            }
                            placeholder="担当者名"
                        />
                    </div>

                    <div className="form-field">
                        <label>会社名</label>

                        <input
                            value={company}
                            onChange={(e) =>
                                setCompany(e.target.value)
                            }
                            placeholder="会社名"
                        />
                    </div>

                    <div className="form-field">
                        <label>初回来店日</label>

                        <input
                            type="date"
                            value={firstVisitDate}
                            onChange={(e) =>
                                setFirstVisitDate(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-field">
                        <label>紹介者</label>

                        <input
                            value={referrer}
                            onChange={(e) =>
                                setReferrer(e.target.value)
                            }
                            placeholder="紹介者名"
                        />
                    </div>

                    <div className="form-field full-width">
                        <label>メモ</label>

                        <textarea
                            value={memo}
                            onChange={(e) =>
                                setMemo(e.target.value)
                            }
                            placeholder="顧客についてのメモを入力"
                            rows={5}
                        />
                    </div>

                    <div className="form-field full-width">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={businessCard}
                                onChange={(e) =>
                                    setBusinessCard(
                                        e.target.checked
                                    )
                                }
                            />

                            <span>名刺あり</span>
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        className="primary-button"
                        onClick={addCustomer}
                        disabled={isRegistering}
                    >
                        {isRegistering
                            ? "登録中..."
                            : "顧客を登録"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerRegister;