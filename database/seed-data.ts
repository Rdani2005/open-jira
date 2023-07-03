interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: "Finish Backend",
            createdAt: Date.now(),
            status: "Pending",
        },
        {
            description: "Finish Backend",
            createdAt: Date.now(),
            status: "Pending",
        },

        {
            description: "Finish Backend",
            createdAt: Date.now(),
            status: "Pending",
        },
    ],
};
