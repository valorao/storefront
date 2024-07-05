import { redirect } from "next/navigation";

export const metadata = {
  title: "valorao",
  description: "Bem-vindo ao valorao, aqui você pode ver perfis de jogadores, loja e outras informações sobre o VALORANT!",
}

export default async function Home() {
  return (
    redirect("/store")
  );
}
