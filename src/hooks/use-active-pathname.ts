import { usePathname } from "next/navigation";

export function useActivePathname(path: string) {
    const pathname = usePathname()

    if (path === "/") {
        return pathname === "/"
    }

    return pathname === path || pathname.startsWith(path)
}