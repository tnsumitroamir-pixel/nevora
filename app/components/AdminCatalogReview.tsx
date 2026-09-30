import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
} from "@agent-native/core/client/hooks";
import { useState } from "react";

export function AdminCatalogReview({ onBack }: { onBack: () => void }) {
  const reviewQueue = useActionQuery("get-admin-catalog-review", {});
  const reviewItem = useActionMutation("review-catalog-item");
  const [notice, setNotice] = useState("");

  const decide = async (
    itemType: "product" | "offer",
    itemId: string,
    decision: "approve" | "reject",
  ) => {
    setNotice("");
    try {
      await reviewItem.mutateAsync({ itemType, itemId, decision });
      await reviewQueue.refetch();
      setNotice(decision === "approve" ? "Item berhasil disetujui." : "Item ditolak.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Keputusan review belum dapat disimpan.");
    }
  };

  const products = reviewQueue.data?.products ?? [];
  const offers = reviewQueue.data?.offers ?? [];

  return (
    <div className="admin-catalog-page">
      <div className="admin-panel-heading admin-catalog-heading">
        <div>
          <h1>Review Produk &amp; Offer</h1>
          <p>Setujui atau tolak pengajuan advertiser.</p>
        </div>
        <button className="admin-catalog-back" onClick={onBack} type="button">Dashboard</button>
      </div>

      {notice && <p className="admin-catalog-notice" role="status">{notice}</p>}
      {reviewQueue.isLoading ? (
        <section className="admin-panel"><p>Memuat antrean review…</p></section>
      ) : reviewQueue.error ? (
        <section className="admin-panel">
          <p className="admin-catalog-error">{actionErrorMessage(reviewQueue.error) ?? "Antrean review belum dapat dimuat."}</p>
          <button className="admin-catalog-back" onClick={() => void reviewQueue.refetch()} type="button">Coba lagi</button>
        </section>
      ) : (
        <>
          <section className="admin-panel admin-catalog-review-panel">
            <div className="admin-panel-heading"><h2>Produk ({products.length})</h2></div>
            {products.length === 0 ? <p className="admin-catalog-empty">Tidak ada produk menunggu review.</p> : (
              <div className="admin-table-scroll">
                <table className="admin-table admin-catalog-table">
                  <thead><tr><th>Produk</th><th>Advertiser</th><th>Kategori</th><th>Website</th><th>Aksi</th></tr></thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.advertiserEmail}</td>
                        <td>{product.category || "—"}</td>
                        <td>{product.websiteUrl || "—"}</td>
                        <td className="admin-catalog-actions">
                          <button className="admin-table-action" disabled={reviewItem.isPending} onClick={() => void decide("product", String(product.id), "approve")} type="button">Setujui</button>
                          <button className="admin-table-action is-reject" disabled={reviewItem.isPending} onClick={() => void decide("product", String(product.id), "reject")} type="button">Tolak</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="admin-panel admin-catalog-review-panel">
            <div className="admin-panel-heading"><h2>Offer ({offers.length})</h2></div>
            {offers.length === 0 ? <p className="admin-catalog-empty">Tidak ada offer menunggu review.</p> : (
              <div className="admin-table-scroll">
                <table className="admin-table admin-catalog-table">
                  <thead><tr><th>Offer</th><th>Advertiser</th><th>Produk</th><th>Payout</th><th>Aksi</th></tr></thead>
                  <tbody>
                    {offers.map((offer) => (
                      <tr key={offer.id}>
                        <td>{offer.name}</td>
                        <td>{offer.advertiserEmail}</td>
                        <td>{offer.productName ?? "Tidak ditautkan"}</td>
                        <td>Rp {new Intl.NumberFormat("id-ID").format(Number(offer.payoutIdr))}</td>
                        <td className="admin-catalog-actions">
                          <button className="admin-table-action" disabled={reviewItem.isPending} onClick={() => void decide("offer", String(offer.id), "approve")} type="button">Setujui</button>
                          <button className="admin-table-action is-reject" disabled={reviewItem.isPending} onClick={() => void decide("offer", String(offer.id), "reject")} type="button">Tolak</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
