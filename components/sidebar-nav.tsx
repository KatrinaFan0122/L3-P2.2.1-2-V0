"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Target, Package, Users, TrendingUp, FileText, Settings, ChevronRight } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "概览", href: "/", active: false },
  { icon: Target, label: "创业路径", href: "/path", active: false, completed: true },
  { icon: Package, label: "产品与服务", href: "/product", active: true },
  { icon: Users, label: "目标客户", href: "/customer", active: false },
  { icon: TrendingUp, label: "商业模式", href: "/business", active: false },
  { icon: FileText, label: "财务规划", href: "/finance", active: false },
]

export function SidebarNav() {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      <div className="border-b border-sidebar-border px-6 py-5">
        <h2 className="text-xl font-bold text-sidebar-foreground">BizFile</h2>
        <p className="text-xs text-sidebar-foreground/60">商业价值设计平台</p>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.completed && (
                <Badge variant="outline" className="h-5 bg-success/10 text-success border-success/20 text-xs">
                  ✓
                </Badge>
              )}
              {item.active && <ChevronRight className="h-4 w-4" />}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-4">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground/70">
          <Settings className="h-4 w-4" />
          设置
        </Button>
      </div>
    </div>
  )
}
