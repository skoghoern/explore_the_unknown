"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BookOpen, Users, FolderGit2 } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/education",
      label: "Education",
      icon: BookOpen,
    },
    {
      href: "/team",
      label: "Team",
      icon: Users,
    },
    {
      href: "/projects",
      label: "Projects",
      icon: FolderGit2,
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm transition-colors hover:text-blue-400",
              pathname === route.href ? "text-blue-400 font-medium" : "text-gray-400",
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {route.label}
          </Link>
        )
      })}
    </nav>
  )
}

