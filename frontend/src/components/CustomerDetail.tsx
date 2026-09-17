import type { Customer } from "./CustomerManagement";

type CustomerDetailProps = {
    customer: Customer;
    onClose: () => void;
};

function CustomerDetail({
    customer,
    onClose,
}: CustomerDetailProps) {
    return (
        <div className="detail-overlay">
            <div className="detail-modal">
                <div className="detail-header">
                    <div>
                        <p className="page-label">CUSTOMER DETAIL</p>
                        <h2>顧客詳細</h2>
                    </div>

                    <button
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="閉じる"
                    >
                        ×
                    </button>
                </div>

                <div className="detail-profile">
                    <div className="profile-icon">
                        {customer.name.charAt(0)}
                    </div>

                    <div>
                        <h3>{customer.name}</h3>
                        <p>
                            {customer.company || "会社名未登録"}
                        </p>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-item">
                        <span>電話番号</span>
                        <strong>
                            {customer.phone || "未登録"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>担当者</span>
                        <strong>
                            {customer.staff || "未登録"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>会社名</span>
                        <strong>
                            {customer.company || "未登録"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>初回来店日</span>
                        <strong>
                            {customer.firstVisitDate || "未登録"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>紹介者</span>
                        <strong>
                            {customer.referrer || "なし"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>名刺</span>

                        {customer.businessCard ? (
                            <span className="badge badge-yes">
                                登録済
                            </span>
                        ) : (
                            <span className="badge badge-no">
                                未登録
                            </span>
                        )}
                    </div>
                </div>

                <div className="detail-memo">
                    <span>メモ</span>
                    <p>
                        {customer.memo || "メモはありません。"}
                    </p>
                </div>

                <div className="detail-footer">
                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;