"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Check, Sparkles } from "lucide-react"

interface AnalysisSubjectProps {
  content: string
  isGenerated: boolean
  onSave: (content: string) => void
}

export function AnalysisSubject({ content, isGenerated, onSave }: AnalysisSubjectProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleSave = () => {
    onSave(editedContent)
    setIsEditing(false)
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">分析主体</h3>
            <p className="text-xs text-muted-foreground">后续所有模块的核心关联线索</p>
          </div>
        </div>
        {isGenerated && (
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI 生成
          </Badge>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[120px] resize-none"
            autoFocus
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              <Check className="mr-2 h-4 w-4" />
              确认保存
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditedContent(content)
                setIsEditing(false)
              }}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm leading-relaxed text-card-foreground">{content}</p>
          <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full">
            <Edit2 className="mr-2 h-4 w-4" />
            编辑描述
          </Button>
        </>
      )}
    </Card>
  )
}
