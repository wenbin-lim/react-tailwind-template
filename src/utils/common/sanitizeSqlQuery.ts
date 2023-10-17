import SqlString from "sqlstring";

export default function sanitizeSqlQuery(query: string) {
  return SqlString.escape(query.replace(/\\/g, ""));
}
