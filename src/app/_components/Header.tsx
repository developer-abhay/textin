import { Bell, BotMessageSquare, CircleUserRound, EllipsisVertical, Plus, Users } from "lucide-react";

function Header() {
    return (
        <nav className="h-14 bg-[#ED6645] flex items-center justify-between text-white px-10">
            <div className="flex gap-2 font-semibold text-xl tracking-wider">
                <BotMessageSquare size={32} />
                <p
                    className="text-md"                    >
                    TEXTIN
                </p>
            </div>

            <div className='hidden sm:flex gap-5 items-center'>
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