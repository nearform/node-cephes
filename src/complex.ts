export type Complex = { [part in "real" | "imag"]: number };
export function isComplex(obj: any): obj is Complex {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.real === "number" &&
    typeof obj.imag === "number"
  );
}

class ComplexNumber {
  constructor(
    public real: number,
    public imag: number,
  ) {}
  toString = () => {
    const { real, imag } = this;
    if (imag === 0) return `${real}`;
    if (real === 0) return `${imag}i`;

    const sign = imag > 0 ? "+" : "-";
    return `${real} ${sign} ${Math.abs(imag)}i`;
  };
}
export const create = (real?: number, imag?: number): Complex =>
  new ComplexNumber(real ?? 0, imag ?? 0);
