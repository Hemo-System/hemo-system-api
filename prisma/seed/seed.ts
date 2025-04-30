import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient();

async function seed() {
    const password = await bcrypt.hash('hemosystem', 10)

    await prisma.admin.create({
        data: {
            name: 'Admin',
            email: 'admin@admin.com',
            password: password,
        }
    });

    console.log('Database seeded');
    await prisma.$disconnect();
}

seed().catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
