import { useEffect, useState } from "react";
import CustomerDetail from "./CustomerDetail";
import CustomerEdit from "./CustomerEdit";

export type Customer = {
    id: number;
    name: string;
    phone: string;
    staff: string;
    company: string;
    firstVisitDate: string;
    referrer: string;
    businessCard: boolean;
    memo: string;
};

function CustomerManagement({ onBack }: { onBack: () => void }) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCustomer, setSelectedCustomer] =
        useState<Customer | null>(null);
    const [editingCustomer, setEditingCustomer] =
        useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const keywords = searchKeyword.trim()
        ? searchKeyword.trim().split(/\s+/)
        : [];

    async function loadCustomers() {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("ログイン情報がありません。");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8080/customers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("顧客情報の取得に失敗しました。");
            }

            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error(error);
            setError("顧客情報を取得できませんでした。");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCustomers();
    }, []);

    async function deleteCustomer(id: number) {
        const customer = customers.find(
            (customer) => customer.id === id
        );

        const confirmed = window.confirm(
            `「${customer?.name ?? "この顧客"}」を削除しますか？\nこの操作は元に戻せません。`
        );

        if (!confirmed) {
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:8080/customers/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("削除に失敗しました。");
            }

            if (selectedCustomer?.id === id) {
                setSelectedCustomer(null);
            }

            await loadCustomers();
        } catch (error) {
            console.error(error);
            setError("顧客の削除に失敗しました。");
        }
    }

    if (editingCustomer) {
        return (
            <CustomerEdit
                customer={editingCustomer}
                onUpdated={() => {
                    setEditingCustomer(null);
                    loadCustomers();
                }}
            />
        );
    }

    const filteredCustomers = customers.filter((customer) =>
        keywords.every((keyword) =>
            Object.values(customer).some((value) =>
                String(value)
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
            )
        )
    );

    return (
        <div className="customer-page">

            {/* =========================
                Header
            ========================= */}

            <div className="customer-header">
                <p className="page-label">CUSTOMERS</p>

                <h2>顧客一覧</h2>

                <p className="page-description">
                    登録されている顧客情報を確認・管理できます。
                </p>
            </div>


            {/* =========================
                Customer List
            ========================= */}

            <div className="customer-list-card">

                {/* Search */}

                <div className="search-area">

                    <div className="search-text">
                        <h3>顧客データ</h3>

                        <p>
                            名前・会社名・電話番号・担当者などから検索できます。
                        </p>
                    </div>

                    <input
                        className="search-input"
                        value={searchKeyword}
                        onChange={(e) =>
                            setSearchKeyword(e.target.value)
                        }
                        placeholder="🔍 キーワードで検索"
                    />

                </div>


                {/* Error */}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {/* Loading */}

                {loading ? (
                    <div className="empty-message">
                        顧客情報を読み込んでいます...
                    </div>

                ) : filteredCustomers.length === 0 ? (

                    <div className="empty-message">

                        <strong>
                            {searchKeyword
                                ? "検索結果がありません"
                                : "顧客が登録されていません"}
                        </strong>

                        <p>
                            {searchKeyword
                                ? "検索キーワードを変更してみてください。"
                                : "顧客登録画面から新しい顧客を登録してください。"}
                        </p>

                    </div>

                ) : (

                    /* =========================
                       Table
                    ========================= */

                    <div className="customer-table-wrapper">

                        <table className="customer-table">

                            <thead>

                                <tr>
                                    <th>氏名</th>
                                    <th>会社名</th>
                                    <th>担当</th>
                                    <th>初回来店日</th>
                                    <th>名刺</th>
                                    <th className="action-header">
                                        {/* 操作という見出しは表示しない */}
                                    </th>
                                </tr>

                            </thead>


                            <tbody>

                                {filteredCustomers.map(
                                    (customer) => (

                                        <tr key={customer.id}>

                                            <td>
                                                <strong>
                                                    {customer.name}
                                                </strong>
                                            </td>


                                            <td>
                                                {customer.company ||
                                                    "―"}
                                            </td>


                                            <td>
                                                {customer.staff ||
                                                    "―"}
                                            </td>


                                            <td>
                                                {customer.firstVisitDate ||
                                                    "―"}
                                            </td>


                                            {/* 名刺 */}

                                            <td>

                                                {customer.businessCard ? (

                                                    <span className="badge badge-yes">
                                                        名刺あり
                                                    </span>

                                                ) : (

                                                    <span className="badge badge-no">
                                                        名刺なし
                                                    </span>

                                                )}

                                            </td>


                                            {/* Buttons */}

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="small-button detail-button"
                                                        onClick={() =>
                                                            setSelectedCustomer(
                                                                customer
                                                            )
                                                        }
                                                    >
                                                        詳細
                                                    </button>


                                                    <button
                                                        className="small-button edit-button"
                                                        onClick={() =>
                                                            setEditingCustomer(
                                                                customer
                                                            )
                                                        }
                                                    >
                                                        編集
                                                    </button>


                                                    <button
                                                        className="small-button danger"
                                                        onClick={() =>
                                                            deleteCustomer(
                                                                customer.id
                                                            )
                                                        }
                                                    >
                                                        削除
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* =========================
                Back to Menu
            ========================= */}

            <button
                className="customer-back-button"
                onClick={onBack}
            >
                ← メニューに戻る
            </button>


            {/* =========================
                Customer Detail
            ========================= */}

            {selectedCustomer && (
                <CustomerDetail
                    customer={selectedCustomer}
                    onClose={() =>
                        setSelectedCustomer(null)
                    }
                />
            )}

        </div>
    );
}

export default CustomerManagement;