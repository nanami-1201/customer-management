import { useState } from "react";
import type { Customer } from "./CustomerManagement";

type CustomerEditProps = {
    customer: Customer;
    onUpdated: () => void;
};

function CustomerEdit({
    customer,
    onUpdated,
}: CustomerEditProps) {
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    const [staff, setStaff] = useState(customer.staff);
    const [company, setCompany] = useState(customer.company);
    const [firstVisitDate, setFirstVisitDate] = useState(
        customer.firstVisitDate
    );
    const [referrer, setReferrer] = useState(customer.referrer);
    const [businessCard, setBusinessCard] = useState(
        customer.businessCard
    );
    const [memo, setMemo] = useState(customer.memo || "");

    const [error, setError] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    async function updateCustomer() {
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

        try {
            setIsUpdating(true);

            const response = await fetch(
                `http://localhost:8080/customers/${customer.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        staff,
                        company,
                        firstVisitDate,
                        referrer,
                        businessCard,
                        memo,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("更新に失敗しました。");
            }

            onUpdated();
        } catch (error) {
            console.error(error);
            setError(
                "顧客情報を更新できませんでした。もう一度お試しください。"
            );
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <div className="edit-page">
            <div className="edit-header">
                <div>
                    <p className="page-label">CUSTOMER EDIT</p>
                    <h1>顧客編集</h1>
                    <p className="page-description">
                        顧客情報を編集して更新できます。
                    </p>
                </div>
            </div>

            <div className="edit-card">
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
                        className="secondary-button"
                        onClick={onUpdated}
                        disabled={isUpdating}
                    >
                        戻る
                    </button>

                    <button
                        className="primary-button"
                        onClick={updateCustomer}
                        disabled={isUpdating}
                    >
                        {isUpdating ? "更新中..." : "変更を保存"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerEdit;