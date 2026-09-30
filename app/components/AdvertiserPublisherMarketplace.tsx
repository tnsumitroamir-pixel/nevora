import { actionErrorMessage, useActionQuery } from "@agent-native/core/client/hooks";
import { useMemo, useState } from "react";

export type AdvertiserPublisherTab = "directory" | "selected";

type PublisherChannelRow = {
  id: string;
  name: string;
  type: string;
  url: string;
  publisherName: string;
};

type SelectedPublisherRow = {
  id: string;
  publisherName: string;
  channelName: string;
  channelType: string;
  channelUrl: string;
  offerName: string;
  campaignName: string | null;
  status: string;
  createdAt: string;
};

export function AdvertiserPublisherMarketplace({ onBack, initialTab }: { onBack: () => void; initialTab: AdvertiserPublisherTab }) {
  const query = useActionQuery("get-advertiser-publisher-marketplace", {});
  const [tab, setTab] = useState(initialTab);
  const [search, setSearch] = useState("");
  const data = query.data as { channels: PublisherChannelRow[]; selectedPublishers: SelectedPublisherRow[] } | undefined;
  const needle = search.trim().toLocaleLowerCase("id-ID");
  const channels = useMemo(
    () => (data?.channels ?? []).filter((channel) =>
      `${channel.publisherName} ${channel.name} ${channel.type}`.toLocaleLowerCase("id-ID").includes(needle),
    ),
    [data?.channels, needle],
  );
  const selectedPublishers = useMemo(
    () => (data?.selectedPublishers ?? []).filter((publisher) =>
      `${publisher.publisherName} ${publisher.channelName} ${publisher.offerName} ${publisher.campaignName ?? ""}`.toLocaleLowerCase("id-ID").includes(needle),
    ),
    [data?.selectedPublishers, needle],
  );

  return (
    <section className="ad-catalog-page">
      <div className="ad-catalog-heading">
        <div>
          <span className="ad-kicker">Advertiser · Demand</span>
          <h1>Publisher Marketplace</h1>
          <p>Publisher adalah audiens yang mempromosikan produk dan campaign Anda melalui channel terverifikasi.</p>
        </div>
        <button className="ad-button ad-button-light" onClick={onBack} type="button">Kembali ke Dashboard</button>
      </div>
      <div className="ad-catalog-tabs" role="tablist" aria-label="Marketplace publisher">
        <button aria-selected={tab === "directory"} className={tab === "directory" ? "is-active" : ""} onClick={() => setTab("directory")} role="tab" type="button">Channel terverifikasi</button>
        <button aria-selected={tab === "selected"} className={tab === "selected" ? "is-active" : ""} onClick={() => setTab("selected")} role="tab" type="button">Publisher campaign</button>
      </div>
      {tab === "directory" && <label className="ad-search"><input aria-label="Cari publisher atau channel" onChange={(event) => setSearch(event.target.value)} placeholder="Cari audiens atau channel…" value={search} /></label>}
      {tab === "selected" && <label className="ad-search"><input aria-label="Cari publisher yang dipilih" onChange={(event) => setSearch(event.target.value)} placeholder="Cari publisher, campaign, atau offer…" value={search} /></label>}
      {query.isLoading ? (
        <section className="ad-panel"><p>Memuat marketplace publisher…</p></section>
      ) : query.error ? (
        <section className="ad-panel">
          <p className="ad-form-error">{actionErrorMessage(query.error) ?? "Marketplace publisher belum dapat dimuat."}</p>
          <button className="ad-button ad-button-light" onClick={() => void query.refetch()} type="button">Coba lagi</button>
        </section>
      ) : tab === "directory" ? (
        <section className="ad-panel ad-catalog-panel">
          <div className="ad-panel-heading"><h2>Channel terverifikasi ({channels.length})</h2><span>Kontak pribadi tidak ditampilkan</span></div>
          {channels.length === 0 ? <p className="ad-catalog-empty">Belum ada channel publisher aktif.</p> : (
            <div className="ad-table-wrap">
              <table className="ad-campaign-table ad-catalog-table">
                <thead><tr><th>Publisher</th><th>Channel</th><th>Jenis</th><th>URL audiens</th></tr></thead>
                <tbody>{channels.map((channel) => (
                  <tr key={channel.id}>
                    <td>{channel.publisherName}</td>
                    <td>{channel.name}</td>
                    <td>{channel.type}</td>
                    <td><a href={channel.url} rel="noreferrer" target="_blank">Buka channel</a></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>
      ) : (
        <section className="ad-panel ad-catalog-panel">
          <div className="ad-panel-heading"><h2>Publisher yang menyetujui campaign ({selectedPublishers.length})</h2></div>
          {selectedPublishers.length === 0 ? <p className="ad-catalog-empty">Belum ada publisher yang disetujui untuk offer Anda. Publisher mengajukan dari marketplace; admin mengaktifkan aplikasi setelah memeriksa channel.</p> : (
            <div className="ad-table-wrap">
              <table className="ad-campaign-table ad-catalog-table">
                <thead><tr><th>Publisher</th><th>Campaign / Offer</th><th>Channel</th><th>Status</th><th>Mulai</th></tr></thead>
                <tbody>{selectedPublishers.map((publisher) => (
                  <tr key={publisher.id}>
                    <td>{publisher.publisherName}</td>
                    <td>{publisher.campaignName ?? publisher.offerName}</td>
                    <td>{publisher.channelName} · {publisher.channelType}</td>
                    <td>{publisher.status}</td>
                    <td>{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(publisher.createdAt))}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </section>
  );
}
