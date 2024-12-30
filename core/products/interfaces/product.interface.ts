import { User } from "@/core/auth/interface/user";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user?: User;
}



export enum Gender{
    Kid = 'kid',
    Men = 'men',
    Women = 'women',
    Unisex = 'unisex'
}

export enum Size{
    Xs = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    Xl = 'XL',
    Xxl = 'XXL',
    Xxxl = 'XXXL'
}
