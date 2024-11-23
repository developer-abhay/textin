import {
  Bell,
  BotMessageSquare,
  CircleUserRound,
  EllipsisVertical,
  Plus,
  Users,
} from "lucide-react";

function Header() {
  return (
    <nav className="flex h-14 items-center justify-between bg-[#ED6645] px-10 text-white">
      <div className="flex gap-2 text-xl font-semibold tracking-wider">
        <BotMessageSquare size={32} />
        <p className="text-md">TEXTIN</p>
      </div>

      <div className="hidden items-center gap-5 sm:flex">
        <Plus size={20} />
        <Users size={20} />
        <Bell size={20} />
        <CircleUserRound size={32} />
      </div>
      <EllipsisVertical className="flex sm:hidden" />
    </nav>
  );
}

export default Header;
