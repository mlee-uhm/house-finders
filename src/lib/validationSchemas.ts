import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});
export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  subrole: string;
}

export const AddPropertySchema = Yup.object({
  id: Yup.number().required(),
  address: Yup.string().required(),
  price: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  bedrooms: Yup.number().positive().required(),
  bathrooms: Yup.number().positive().required(),
  sqft: Yup.string().required(),
  landlord: Yup.string().required(),
});
