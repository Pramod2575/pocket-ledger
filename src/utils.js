export const CATEGORIES = {
  Food: "#E8A33D",
  Transport: "#3D7EA6",
  Bills: "#7A5C99",
  Shopping: "#D9534F",
  Health: "#2F9E8F",
  Other: "#7C8F8A",
};

export const INCOME_CATEGORY = "Income";

export const formatMoney = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

export const todayISO = () => daysAgo(0);

export const SAMPLE_DATA = [
  { id: 1, title: "Monthly stipend", amount: 25000, kind: "income", category: INCOME_CATEGORY, date: daysAgo(6) },
  { id: 2, title: "Groceries", amount: 1850, kind: "expense", category: "Food", date: daysAgo(5) },
  { id: 3, title: "Metro card top-up", amount: 500, kind: "expense", category: "Transport", date: daysAgo(4) },
  { id: 4, title: "Internet bill", amount: 899, kind: "expense", category: "Bills", date: daysAgo(3) },
  { id: 5, title: "Running shoes", amount: 2999, kind: "expense", category: "Shopping", date: daysAgo(1) },
];
