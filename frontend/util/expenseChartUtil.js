export const prepareExpenseLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const dailyData = {};

    transactions.forEach((item) => {
        const date = new Date(item.date);

        if (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        ) {
            const day = date.getDate();

            if (!dailyData[day]) {
                dailyData[day] = 0;
            }

            dailyData[day] += Number(item.amount);
        }
    });

    return Object.keys(dailyData)
        .sort((a, b) => a - b)
        .map((day) => ({
            day: `${day}th`,
            amount: dailyData[day],
        }));
};