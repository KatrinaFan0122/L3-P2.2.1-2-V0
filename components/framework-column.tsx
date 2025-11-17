"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Edit2, Check } from "lucide-react"

interface FrameworkItem {
  id: string
  content: string
  isAiGenerated: boolean
  isUpdated?: boolean
}

interface FrameworkColumnProps {
  title: string
  subtitle: string
  description: string
  items: FrameworkItem[]
  color: "primary" | "secondary" | "accent"
  onItemChange: (id: string, content: string) => void
  onRequestSuggestions: (id: string) => void
}

const colorClasses = {
  primary: {
    border: "border-primary/30",
    bg: "bg-primary/5",
    badge: "bg-primary/10 text-primary border-primary/20",
    button: "border-primary/30 hover:bg-primary/10 hover:text-primary",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
  },
  secondary: {
    border: "border-secondary/30",
    bg: "bg-secondary/5",
    badge: "bg-secondary/10 text-secondary border-secondary/20",
    button: "border-secondary/30 hover:bg-secondary/10 hover:text-secondary",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  accent: {
    border: "border-accent/30",
    bg: "bg-accent/5",
    badge: "bg-accent/10 text-accent border-accent/20",
    button: "border-accent/30 hover:bg-accent/10 hover:text-accent",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
}

export function FrameworkColumn({
  title,
  subtitle,
  description,
  items,
  color,
  onItemChange,
  onRequestSuggestions,
}: FrameworkColumnProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const classes = colorClasses[color]

  return (
    <div className={`flex flex-col rounded-2xl border-2 ${classes.border} ${classes.bg} p-6 ${classes.glow}`}>
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <Badge variant="outline" className={`${classes.badge} border text-xs`}>
            {subtitle}
          </Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`group relative rounded-xl border bg-card p-4 transition-all ${
              item.isUpdated ? "animate-pulse-glow border-primary" : "border-border"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                {title} {index + 1}
              </span>
              {item.isAiGenerated && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Sparkles className="h-3 w-3" />
                  AI 草案
                </Badge>
              )}
              {item.isUpdated && (
                <Badge variant="default" className="gap-1 text-xs bg-primary">
                  <Sparkles className="h-3 w-3" />
                  Co-Fo 已更新
                </Badge>
              )}
            </div>

            {editingId === item.id ? (
              <div className="space-y-2">
                <Textarea
                  defaultValue={item.content}
                  className="min-h-[100px] resize-none"
                  onBlur={(e) => {
                    onItemChange(item.id, e.target.value)
                    setEditingId(null)
                  }}
                  autoFocus
                />
                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="w-full">
                  <Check className="mr-2 h-4 w-4" />
                  确认
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-3 text-sm leading-relaxed text-card-foreground">{item.content}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingId(item.id)} className="flex-1">
                    <Edit2 className="mr-2 h-3 w-3" />
                    编辑
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRequestSuggestions(item.id)}
                    className={`flex-1 ${classes.button}`}
                  >
                    <Sparkles className="mr-2 h-3 w-3" />让 Co-Fo 提供建议
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
