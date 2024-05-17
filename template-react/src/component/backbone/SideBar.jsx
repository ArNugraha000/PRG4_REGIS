import Menu from "./Menu";

export default function SideBar() {
  return (
    <div
      className="border-end position-fixed h-100 pt-2 overflow-y-auto"
      style={{ width: "13vw" }}
    >
      <Menu />
    </div>
  );
}
