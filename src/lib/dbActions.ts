'use server';

import { Condition, Subrole, Stuff, Property } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'AVAILABLE';
  if (stuff.condition === 'PENDING') {
    condition = 'PENDING';
  } else if (stuff.condition === 'UNAVAILABLE') {
    condition = 'UNAVAILABLE';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Adds a new property to the database.
 * @param property  an object with the following properties: address, price, condition, bedrooms, bathrooms,
 *                  sqft, landlord.
 */
export async function addProperty(property: {
  address: string;
  price: number;
  condition: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  landlord: string;
}) {
  let condition: Condition = 'AVAILABLE';
  if (property.condition === 'PENDING') {
    condition = 'PENDING';
  } else if (property.condition === 'UNAVAILABLE') {
    condition = 'UNAVAILABLE';
  }
  await prisma.property.create({
    data: {
      address: property.address,
      price: property.price,
      condition,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      landlord: property.landlord,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

export async function editProperty(property: Property) {
  await prisma.property.update({
    where: { id: property.id },
    data: {
      address: property.address,
      price: property.price,
      condition: property.condition,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      landlord: property.landlord,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
// export async function deleteStuff(id: number) {
//   // console.log(`deleteStuff id: ${id}`);
//   await prisma.stuff.delete({
//     where: { id },
//   });
//   // After deleting, redirect to the list page
//   redirect('/list');
// }

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string; subrole: Subrole }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      subrole: credentials.subrole,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
