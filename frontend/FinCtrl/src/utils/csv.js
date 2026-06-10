const escapeValue = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export const toCsv = (rows, headers) => {
  const headerRow = headers.map((header) => escapeValue(header.label)).join(",");
  const dataRows = rows.map((row) =>
    headers.map((header) => escapeValue(row[header.key])).join(","),
  );

  return [headerRow, ...dataRows].join("\n");
};
