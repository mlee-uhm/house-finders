import { PrismaClient, Role, Subrole } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    let subrole: Subrole = 'RENTER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
      subrole = 'ADMIN';
    }
    if (account.subrole === 'LANDLORD') {
      subrole = 'LANDLORD';
    }
    console.log(`  Creating user: ${account.email} with role: ${role} and subrole: ${subrole}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
        subrole,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  // config.defaultData.forEach(async (data, index) => {
  //   let condition: Condition = 'good';
  //   if (data.condition === 'poor') {
  //     condition = 'poor';
  //   } else if (data.condition === 'excellent') {
  //     condition = 'excellent';
  //   } else {
  //     condition = 'fair';
  //   }
  //   console.log(`  Adding stuff: ${data.address} (${data.landlord})`);
  //   await prisma.property.upsert({
  //     where: { id: index + 1 },
  //     update: {},
  //     create: {
  //       address: data.address,
  //       price: data.price,
  //       condition,
  //       bedrooms: data.bedrooms,
  //       bathrooms: data.bathrooms,
  //       sqft: data.sqft,
  //       landlord: data.landlord,
  //     },
  //   });
  // });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
