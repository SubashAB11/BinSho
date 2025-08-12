import { Product } from "./product.model";

export class Section {
    id!: number;
    leftRack!: Product[];
    rightRack!: Product[];
    theme!: string;
}
