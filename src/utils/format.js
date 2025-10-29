export const parseBRL = (value) => {
  if (value === null || value === undefined || value === "") return 0;

  if (typeof value === "number" && !Number.isNaN(value)) return value;

  let s = String(value).trim();

  s = s.replace(/R\$\s?/gi, "").trim();

  if (s.indexOf(",") > -1 && s.indexOf(".") > -1) {
    s = s.replace(/\./g, "").replace(/,/g, ".");
  } else if (s.indexOf(",") > -1 && s.indexOf(".") === -1) {
    s = s.replace(/,/g, ".");
  } else {
    s = s.replace(/[^\d.-]/g, "");
  }

  const n = Number(s);
  return Number.isNaN(n) ? 0 : n;
};

export const formatBRL = (value) => {
  const n = parseBRL(value);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
