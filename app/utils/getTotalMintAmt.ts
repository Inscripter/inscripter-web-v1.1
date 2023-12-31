type TotalMintAmtResponse = {
  data: { totalMintAmt: number }[];
}

export async function getTotalMintAmt(): Promise<number> {
  try {
    const res = await fetch('/api/totalMintAmt');
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data: TotalMintAmtResponse = await res.json();
    return data.data[0]?.totalMintAmt || 0;
  } catch (error) {
    return 0;
  }
}
