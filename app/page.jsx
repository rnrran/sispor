import Image from "next/image";

export default function Home() {
  return (
    <>
      <div style={{ position: "relative", height: "100vh" }}>
        <Image
          src="/resources/images/background.jpg" // path to your image
          alt="Background Image"
          layout="fill" // Ensures the image covers the entire container
          objectFit="cover" // Ensures the image is properly scaled
          className=""
          priority // Optional: If the image is critical, it will load first
        />
        {/* Content goes here */}
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "4rem", // Menambahkan ukuran font yang lebih besar
            fontWeight: "bold", // Membuat font menjadi lebih tebal
          }}
        >
          "Shaping knowledge, one note at a time with Sigma."
        </h1>
      </div>
    </>
  );
}
