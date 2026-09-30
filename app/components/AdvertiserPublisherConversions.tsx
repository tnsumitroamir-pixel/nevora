import {
  actionErrorMessage,
  useActionMutation,
  useActionQuery,
} from "@agent-native/core/client/hooks";
import { useState, type FormEvent } from "react";

export function AdvertiserPublisherConversions({ onBack }: { onBack: () => void }) {
  const clicks = useActionQuery("get-advertiser-publisher-clicks", {});
  const record = useActionMutation("record-publisher-conversion");
  const [eventIds, setEventIds] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>, clickId: string) => {
    event.preventDefault();
    setNotice("");
    try {
      await record.mutateAsync({ clickId, externalEventId: eventIds[clickId] });
      await clicks.refetch();
      setEventIds((current) => ({ ...current, [clickId]: "" }));
      setNotice("Conversion tersimpan untuk ditinjau Admin Root.");
    } catch (error) {
      setNotice(actionErrorMessage(error) ?? "Conversion belum dapat disimpan.");
    }
  };

  return (
    <div className="admin-catalog-page">
      <div className="admin-panel-heading admin-catalog-heading">
        <div><h1>Conversion Publisher</h1><p>Catat conversion hanya dengan ID event transaksi yang benar-benar terjadi.</p></div>
        <button className="admin-catalog-back" onClick={onBack} type="button">Kembali</button>
      </div>
      {notice && <p className="admin-catalog-notice" role="status">{notice}</p>}
      {clicks.isLoading ? <section className="admin-panel"><p>Memuat klik Publisher…</p></section> : clicks.error ? <section className="admin-panel"><p className="admin-catalog-error">{actionErrorMessage(clicks.error) ?? "Klik Publisher belum dapat dimuat."}</p><button onClick={() => void clicks.refetch()} type="button">Coba lagi</button></section> : clicks.data?.length ? clicks.data.map((click) => (
        <form className="publisher-conversion-report" key={click.clickId} onSubmit={(event) => void submit(event, click.clickId)}>
          <div><b>{click.offerName}</b><small>{click.publisherName} · {click.publisherEmail} · {String(click.clickedAt)}</small></div>
          <label>ID event transaksi nyata<input maxLength={160} required value={eventIds[click.clickId] ?? ""} onChange={(event) => setEventIds((current) => ({ ...current, [click.clickId]: event.target.value }))} /></label>
          <button disabled={record.isPending} type="submit">Catat conversion</button>
        </form>
      )) : <section className="admin-panel"><p>Belum ada klik Publisher aktif yang menunggu conversion.</p></section>}
    </div>
  );
}
