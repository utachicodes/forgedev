import { PrismaClient, Role, UserStatus } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Admin User Details
    const adminEmail = 'abdoullahaljersi@gmail.com';
    const adminPassword = 'adminPassword123!'; // User can change this later
    const hashedPassword = await hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            role: Role.ADMIN,
            status: UserStatus.APPROVED,
        },
        create: {
            email: adminEmail,
            passwordHash: hashedPassword,
            fullName: 'Abdoullah Aljersi',
            role: Role.ADMIN,
            status: UserStatus.APPROVED, // Auto-approve admin
        },
    });

    console.log(`Created/Updated admin user: ${admin.email}`);
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
