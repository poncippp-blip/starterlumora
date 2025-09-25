import TokenPurchase from "@/components/TokenPurchase";

export default function TokenPurchaseDemo() {
  const handlePurchase = (tokenAmount: number) => {
    console.log("Purchased tokens:", tokenAmount);
    alert(`Successfully purchased ${tokenAmount} tokens!`);
  };

  return (
    <div className="bg-black min-h-screen">
      <TokenPurchase onPurchase={handlePurchase} />
    </div>
  );
}
