import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
} from "@agent-native/core/client/hooks";
import { useEffect, useState, type FormEvent } from "react";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

import {
  Dialog,
  DialogContent,
} from "./ui/dialog";

type CatalogTab = "products" | "offers";

export function AdvertiserCatalog({
  initialTab,
  startWithCreate,
  onBack,
}: {
  initialTab: CatalogTab;
  startWithCreate: "product" | null;
  onBack: () => void;
}) {
  const catalog = useActionQuery("get-advertiser-catalog", {});
  const saveProduct = useActionMutation("save-advertiser-product");
  const submitProduct = useActionMutation("submit-advertiser-product-review");
  const saveOffer = useActionMutation("save-advertiser-offer");
  const submitOffer = useActionMutation("submit-advertiser-offer-review");
  const [tab, setTab] = useState<CatalogTab>(initialTab);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Record<string, unknown> | null>(null);
  const [editingOffer, setEditingOffer] = useState<Record<string, unknown> | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setTab(initialTab);
    if (startWithCreate === "product") setProductDialogOpen(true);
  }, [initialTab, startWithCreate]);

  const closeProductDialog = () => {
    setProductDialogOpen(false);
    setEditingProduct(null);
  };

  const closeOfferDialog = () => {
    setOfferDialogOpen(false);
    setEditingOffer(null);
  };

  const handleSaveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setNotice("");
    try {
      await saveProduct.mutateAsync({
        ...(editingProduct ? { id: String(editingProduct.id) } : {}),
        name: String(values.get("name") || "").trim(),
        websiteUrl: String(values.get("websiteUrl") || "").trim(),
        category: String(values.get("category") || "").trim(),
      });
      closeProductDialog();
      await catalog.refetch();
      setNotice("Draft produk berhasil disimpan.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Produk belum dapat disimpan.");
    }
  };

  const handleSaveOffer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setNotice("");
    try {
      await saveOffer.mutateAsync({
        ...(editingOffer ? { id: String(editingOffer.id) } : {}),
        productId: String(values.get("productId") || ""),
        name: String(values.get("name") || "").trim(),
        payoutIdr: Number(values.get("payoutIdr")),
      });
      closeOfferDialog();
      await catalog.refetch();
      setNotice("Draft offer berhasil disimpan.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Offer belum dapat disimpan.");
    }
  };

  const handleSubmitProduct = async (id: string) => {
    setNotice("");
    try {
      await submitProduct.mutateAsync({ id });
      await catalog.refetch();
      setNotice("Produk berhasil diajukan untuk review.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Produk belum dapat diajukan.");
    }
  };

  const handleSubmitOffer = async (id: string) => {
    setNotice("");
    try {
      await submitOffer.mutateAsync({ id });
      await catalog.refetch();
      setNotice("Offer berhasil diajukan untuk review.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Offer belum dapat diajukan.");
    }
  };

  const products = catalog.data?.products ?? [];
  const offers = catalog.data?.offers ?? [];

  return (
    <section className="ad-catalog-page">
      <div className="ad-catalog-heading">
        <div>
          <span className="ad-kicker">Advertiser</span>
          <h1>Produk &amp; Offer</h1>
          <p>Kelola katalog dan ajukan perubahan untuk ditinjau admin.</p>
        </div>
        <button className="ad-button ad-button-light" onClick={onBack} type="button">
          Kembali ke Dashboard
        </button>
      </div>

      <div className="ad-catalog-tabs" role="tablist" aria-label="Katalog advertiser">
        <button
          aria-selected={tab === "products"}
          className={tab === "products" ? "is-active" : ""}
          onClick={() => setTab("products")}
          role="tab"
          type="button"
        >
          Produk ({products.length})
        </button>
        <button
          aria-selected={tab === "offers"}
          className={tab === "offers" ? "is-active" : ""}
          onClick={() => setTab("offers")}
          role="tab"
          type="button"
        >
          Offer ({offers.length})
        </button>
      </div>

      {notice && <p className="ad-catalog-notice" role="status">{notice}</p>}

      {catalog.isLoading ? (
        <section className="ad-panel"><p>Memuat katalog…</p></section>
      ) : catalog.error ? (
        <section className="ad-panel">
          <p className="ad-form-error">{actionErrorMessage(catalog.error) ?? "Katalog belum dapat dimuat."}</p>
          <button className="ad-button ad-button-light" onClick={() => void catalog.refetch()} type="button">Coba lagi</button>
        </section>
      ) : tab === "products" ? (
        <section className="ad-panel ad-catalog-panel">
          <div className="ad-panel-heading">
            <h2>Produk</h2>
            <button
              className="ad-button ad-button-primary"
              onClick={() => {
                setEditingProduct(null);
                setProductDialogOpen(true);
              }}
              type="button"
            >
              Tambah Produk
            </button>
          </div>
          {products.length === 0 ? (
            <p className="ad-catalog-empty">Belum ada produk. Tambahkan produk sebagai draft untuk memulai.</p>
          ) : (
            <div className="ad-table-wrap">
              <table className="ad-campaign-table ad-catalog-table">
                <thead><tr><th>Nama</th><th>Kategori</th><th>Website</th><th>Status</th><th>Aksi</th></tr></thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category || "—"}</td>
                      <td>{product.websiteUrl || "—"}</td>
                      <td><span className="ad-catalog-status">{product.status}</span></td>
                      <td className="ad-catalog-actions">
                        {(product.status === "Draft" || product.status === "Rejected") && (
                          <>
                            <button className="ad-table-action" onClick={() => { setEditingProduct(product); setProductDialogOpen(true); }} type="button">Edit</button>
                            <button className="ad-table-action" disabled={submitProduct.isPending} onClick={() => void handleSubmitProduct(String(product.id))} type="button">Ajukan Review</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : (
        <section className="ad-panel ad-catalog-panel">
          <div className="ad-panel-heading">
            <h2>Offer</h2>
            <button
              className="ad-button ad-button-primary"
              onClick={() => {
                setEditingOffer(null);
                setOfferDialogOpen(true);
              }}
              type="button"
            >
              Tambah Offer
            </button>
          </div>
          {offers.length === 0 ? (
            <p className="ad-catalog-empty">Belum ada offer. Buat offer sebagai draft untuk memulai.</p>
          ) : (
            <div className="ad-table-wrap">
              <table className="ad-campaign-table ad-catalog-table">
                <thead><tr><th>Nama</th><th>Produk</th><th>Payout</th><th>Status</th><th>Aksi</th></tr></thead>
                <tbody>
                  {offers.map((offer) => {
                    const product = products.find((item) => item.id === offer.productId);
                    return (
                      <tr key={offer.id}>
                        <td>{offer.name}</td>
                        <td>{product?.name ?? "Tidak ditautkan"}</td>
                        <td>Rp {new Intl.NumberFormat("id-ID").format(Number(offer.payoutIdr))}</td>
                        <td><span className="ad-catalog-status">{offer.status}</span></td>
                        <td className="ad-catalog-actions">
                          {(offer.status === "Draft" || offer.status === "Rejected") && (
                            <>
                              <button className="ad-table-action" onClick={() => { setEditingOffer(offer); setOfferDialogOpen(true); }} type="button">Edit</button>
                              <button className="ad-table-action" disabled={submitOffer.isPending} onClick={() => void handleSubmitOffer(String(offer.id))} type="button">Ajukan Review</button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      <Dialog open={productDialogOpen} onOpenChange={(open) => !open && closeProductDialog()}>
        <DialogContent className="ad-dialog-content">
          <div className="ad-dialog-heading">
            <DialogTitle>{editingProduct ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
            <DialogDescription>Produk disimpan sebagai draft sampai diajukan untuk review.</DialogDescription>
          </div>
          <form className="ad-campaign-form" key={String(editingProduct?.id ?? "new-product")} onSubmit={handleSaveProduct}>
            <label>Nama produk<input name="name" defaultValue={String(editingProduct?.name ?? "")} maxLength={160} required /></label>
            <label>Website<input name="websiteUrl" type="url" defaultValue={String(editingProduct?.websiteUrl ?? "")} maxLength={2048} /></label>
            <label>Kategori<input name="category" defaultValue={String(editingProduct?.category ?? "")} maxLength={100} /></label>
            <button className="ad-button ad-button-primary" disabled={saveProduct.isPending} type="submit">{saveProduct.isPending ? "Menyimpan…" : "Simpan Draft"}</button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={offerDialogOpen} onOpenChange={(open) => !open && closeOfferDialog()}>
        <DialogContent className="ad-dialog-content">
          <div className="ad-dialog-heading">
            <DialogTitle>{editingOffer ? "Edit Offer" : "Tambah Offer"}</DialogTitle>
            <DialogDescription>Offer terhubung ke produk aktif dan perlu review admin.</DialogDescription>
          </div>
          <form className="ad-campaign-form" key={String(editingOffer?.id ?? "new-offer")} onSubmit={handleSaveOffer}>
            <label>Nama offer<input name="name" defaultValue={String(editingOffer?.name ?? "")} maxLength={160} required /></label>
            <label>Produk
              <select name="productId" defaultValue={String(editingOffer?.productId ?? "")} required>
                {products.filter((product) => product.status === "Active").map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
              </select>
            </label>
            <label>Payout (IDR)<input name="payoutIdr" type="number" min="0" max="2147483647" step="1" defaultValue={Number(editingOffer?.payoutIdr ?? 0)} required /></label>
            <button className="ad-button ad-button-primary" disabled={saveOffer.isPending} type="submit">{saveOffer.isPending ? "Menyimpan…" : "Simpan Draft"}</button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
