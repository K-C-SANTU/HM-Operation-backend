import { prisma } from "./connection";

async function seedInitialData() {
    let role = await prisma.operationRole.findFirst({
        where: { operationRoleName: "supper admin" },
    });
    if (!role) {
        role = await prisma.operationRole.create({
            data: {
                operationRoleName: "supper admin",
                permissions: ["read", "write"],
                expiredDate: new Date("2050-12-30T00:00:00.000Z"),
                createdDate: new Date(),
            },
        });
        console.log("Seeded operation role: supper admin");
    } else {
        console.log("Operation role 'supper admin' already exists");
    }

    const userExists = await prisma.user.findUnique({ where: { email: "kc@gmail.com" } });
    if (!userExists) {
        const bcrypt = await import("bcryptjs");
        const hashedPassword = await bcrypt.hash("123456", 10);
        await prisma.user.create({
            data: {
                firstName: "KC",
                lastName: "Santosh",
                email: "kc@gmail.com",
                password: hashedPassword,
                accountType: "operation",
                operationRoleId: role.operationRoleId,
                expiredDate: new Date("2050-12-30T00:00:00.000Z"),
                createdDate: new Date(),
            },
        });
        console.log("Seeded user KC Santosh");
    } else {
        console.log("User with email kc@gmail.com already exists");
    }
}

export { seedInitialData };
