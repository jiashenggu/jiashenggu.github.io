const stat = document.querySelector<HTMLElement>("[data-scholar-stats]");
const totalTarget = stat?.querySelector<HTMLElement>("[data-scholar-total]");
const label = stat?.querySelector<HTMLElement>(".scholar-label");

if (stat && totalTarget && label) {
  const update = (total: string, caption: string, state: string): void => {
    totalTarget.textContent = total;
    label.textContent = caption;
    stat.dataset.state = state;
  };

  const url = stat.dataset.url;
  if (!url) {
    update("View", "profile", "unavailable");
  } else {
    fetch(url, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Scholar request failed: ${response.status}`);
        return response.json() as Promise<{ citedby?: unknown } | null>;
      })
      .then((data) => {
        const total = Number(data?.citedby);
        if (!Number.isFinite(total)) throw new Error("Scholar citation count is unavailable.");
        update(total.toLocaleString(), "citations", "ready");
      })
      .catch(() => update("View", "profile", "unavailable"));
  }
}
