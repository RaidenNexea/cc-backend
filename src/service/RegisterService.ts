import { Designation, PrismaClient } from '@prisma/client';
// import passport from 'passport';

const prisma = new PrismaClient();

interface User {
  email: string;
  password: string;
}

interface SuperAdmin {
  name: string;
  designation: string;
  country: string;
  phoneNumber: string;
}

export const registerUser = async ({ email, password }: User) => {
  await prisma.user.create({
    data: {
      email: email,
      password: password,
      role: 'creator',
    },
  });
};

export const registerSuperadmin = async (
  { email, password }: User,
  { name, designation, country, phoneNumber }: SuperAdmin,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        country,
        phoneNumber,
        email: email,
        password: password,
        role: 'admin',
      },
    });

    await prisma.admin.create({
      data: {
        userId: user?.id,
        designation: designation as Designation,
        mode: 'god',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
