import { Injectable } from "@nestjs/common";
import { z } from "zod";
interface Product {
    id: string,
    name: string,
    modelo: string,
    dateManufacture: string,
    year: string,
    brand: string,
    email: string,
    cpf: string,
}


interface CreateProductServiceRequest {
    id: string,
    name: string,
    modelo: string,
    dateManufacture: string,
    year: string,
    brand: string,
    email: string,
    cpf: string,
}

type CreateProductServiceResponse = {
    product: Product;
}


@Injectable()
export class CreateProductService {
    constructor() { }

    async execute({
        id,
        name,
        modelo,
        dateManufacture,
        year,
        brand,
        email,
        cpf,
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {

    }
}