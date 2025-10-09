import Image from 'next/image';

export default function Home() {
  return (
    <div className="from-primary/20 via-accent/30 to-secondary/40 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br">
      <div className="flex flex-col items-center space-y-4 rounded-2xl bg-white/30 p-8 shadow-lg backdrop-blur-md dark:bg-black/20">
        <Image
          src="/NittoPonno_Logo.svg"
          alt="Description"
          width={100}
          height={100}
        />
        <h1 className="text-primary text-3xl font-bold">
          Welcome to Nitto Ponno
        </h1>
        <p className="text-muted-foreground text-sm">
          Empowering your digital marketplace
        </p>
      </div>
    </div>
  );
}
