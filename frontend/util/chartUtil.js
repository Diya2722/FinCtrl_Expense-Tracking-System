const getLatestMonthYear = (transactions) => {
    if (!transactions?.length) return null;

    return transactions.reduce((latest, item) => {
        const date = new Date(item.date);
        if (Number.isNaN(date.getTime())) return latest;
        return !latest || date > latest ? date : latest;
    }, null);
};

const formatDayLabel = (date) =>
    date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short"
    });

const buildLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const latestDate = getLatestMonthYear(transactions);
    if (!latestDate) return [];

    const targetMonth = latestDate.getMonth();
    const targetYear = latestDate.getFullYear();
    const dailyData = {};

    transactions.forEach((item) => {
        const date = new Date(item.date);

        if (
            !Number.isNaN(date.getTime()) &&
            date.getMonth() === targetMonth &&
            date.getFullYear() === targetYear
        ) {
            const key = date.toISOString().slice(0, 10);
            if (!dailyData[key]) {
                dailyData[key] = 0;
            }

            dailyData[key] += Number(item.amount || 0);
        }
    });

    return Object.keys(dailyData)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((key) => ({
            day: formatDayLabel(new Date(key)),
            amount: dailyData[key],
        }));
};

export const prepareIncomeLineChartData = (transactions) => buildLineChartData(transactions);

export const prepareExpenseLineChartData = (transactions) => buildLineChartData(transactions);
