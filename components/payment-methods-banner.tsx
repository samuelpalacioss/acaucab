import Image from "next/image";

interface PaymentMethodsBannerProps {
  className?: string;
}

export function PaymentMethodsBanner({ className = "" }: PaymentMethodsBannerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Image
        src="/visa-logo.svg"
        alt="Visa"
        width={60}
        height={20}
        className="object-contain"
        priority
      />
      <Image
        src="/mastercard-logo.svg"
        alt="Mastercard"
        width={45}
        height={28}
        className="object-contain"
        priority
      />
      <Image
        src="/amex-logo.svg"
        alt="American Express"
        width={45}
        height={28}
        className="object-contain"
        priority
      />
    </div>
  );
}
