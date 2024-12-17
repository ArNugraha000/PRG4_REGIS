import Menu from "./Menu";

export default function SideBar() {
  return (
    <div
      className="border-end position-fixed h-100 pt-2 overflow-y-auto"
      style={{
        width: "13vw",
        left: "0", // Posisikan menu di sisi kiri
        top: "1", // Mulai dari atas layar
        zIndex: "0", // Pastikan elemen berada di atas elemen lainnya
      }}
    >
      <Menu />
    </div>
  );
}
