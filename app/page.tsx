"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarNav } from "@/components/sidebar-nav"
import { AiChatPanel } from "@/components/ai-chat-panel"
import { FrameworkColumn } from "@/components/framework-column"
import { AnalysisSubject } from "@/components/analysis-subject"
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react"

export default function ProductServicePage() {
  const [analysisSubject, setAnalysisSubject] = useState({
    content:
      "基于 AI 技术的智能商业分析平台，帮助创业者快速构建和验证商业模式，通过 Co-Fo AI 助手提供实时引导和专业建议。",
    isGenerated: true,
  })

  const [benefits, setBenefits] = useState([
    {
      id: "benefit-1",
      content: "AI 驱动的实时引导，让商业规划过程更高效、更专业，降低创业者的学习成本和决策风险。",
      isAiGenerated: true,
    },
    {
      id: "benefit-2",
      content: "倒推式思考框架，从客户价值出发，确保产品与服务真正解决市场痛点，提高成功率。",
      isAiGenerated: true,
    },
  ])

  const [assets, setAssets] = useState([
    {
      id: "asset-1",
      content: "先进的 AI 算法和自然语言处理技术，能够理解创业者的想法并提供精准建议。",
      isAiGenerated: true,
      isUpdated: false,
    },
    {
      id: "asset-2",
      content: "完整的商业分析方法论和框架体系，经过多个成功案例验证。",
      isAiGenerated: true,
      isUpdated: false,
    },
    {
      id: "asset-3",
      content: "专业的商业顾问团队和行业专家网络，为 AI 训练提供高质量数据。",
      isAiGenerated: true,
      isUpdated: false,
    },
  ])

  const [competencies, setCompetencies] = useState([
    {
      id: "competency-1",
      content:
        "将 AI 技术、商业咨询经验和用户体验设计深度融合的能力，创造出既专业又易用的商业分析工具。这种多职能组合的技能能够持续为创业者提供差异化价值，形成难以复制的竞争优势。",
      isAiGenerated: true,
    },
  ])

  const [isCompleted, setIsCompleted] = useState(false)

  const handleItemChange = (type: "benefits" | "assets" | "competencies", id: string, content: string) => {
    if (type === "benefits") {
      setBenefits(benefits.map((item) => (item.id === id ? { ...item, content } : item)))
    } else if (type === "assets") {
      setAssets(assets.map((item) => (item.id === id ? { ...item, content } : item)))
    } else {
      setCompetencies(competencies.map((item) => (item.id === id ? { ...item, content } : item)))
    }
  }

  const handleRequestSuggestions = (type: string, id: string) => {
    console.log(`Requesting suggestions for ${type} ${id}`)
    // Simulate AI update
    if (type === "assets") {
      setAssets(assets.map((item) => (item.id === id ? { ...item, isUpdated: true } : { ...item, isUpdated: false })))
      setTimeout(() => {
        setAssets(assets.map((item) => ({ ...item, isUpdated: false })))
      }, 3000)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">「事」商业价值设计</h1>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  产品与服务
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">定义你的核心产品与服务，建立商业价值基础</p>
            </div>
            <Button size="lg" disabled={!isCompleted} onClick={() => console.log("Mark as complete")} className="gap-2">
              <CheckCircle2 className="h-5 w-5" />
              标记完成
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {/* Co-Fo Guidance */}
            <div className="mb-6 rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Co-Fo 引导</h3>
                  <p className="leading-relaxed text-foreground/80">
                    让我们从<span className="font-semibold text-accent">客户获益</span>
                    开始，倒推你的
                    <span className="font-semibold text-secondary">战略资产</span>
                    ，最终定义你的
                    <span className="font-semibold text-primary">核心竞争力</span>
                    。我已经根据你的创业路径生成了初始草案，你可以随时修改或让我提供更多建议。
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Subject */}
            <div className="mb-8">
              <AnalysisSubject
                content={analysisSubject.content}
                isGenerated={analysisSubject.isGenerated}
                onSave={(content) => {
                  setAnalysisSubject({ content, isGenerated: false })
                  setIsCompleted(true)
                }}
              />
            </div>

            {/* Framework Columns */}
            <div className="grid grid-cols-3 gap-6">
              <FrameworkColumn
                title="客户获益"
                subtitle="top 1-2"
                description="为什么客户会选择你（而不是其他竞争对手）？请列出你具体差异化的 1-2 个客户价值点。"
                items={benefits}
                color="accent"
                onItemChange={(id, content) => handleItemChange("benefits", id, content)}
                onRequestSuggestions={(id) => handleRequestSuggestions("benefits", id)}
              />

              <FrameworkColumn
                title="战略资产"
                subtitle="top 3-5"
                description="支撑上述客户收益的，是哪 3-5 项你拥有的关键战略资产（有形与无形）。"
                items={assets}
                color="secondary"
                onItemChange={(id, content) => handleItemChange("assets", id, content)}
                onRequestSuggestions={(id) => handleRequestSuggestions("assets", id)}
              />

              <FrameworkColumn
                title="核心竞争力"
                subtitle="top 1"
                description="一种多职能组合的技能，能够带来可持续的竞争优势。这是结合你的特质和创业策略进行的核心竞争力分析。"
                items={competencies}
                color="primary"
                onItemChange={(id, content) => handleItemChange("competencies", id, content)}
                onRequestSuggestions={(id) => handleRequestSuggestions("competencies", id)}
              />
            </div>
          </div>

          {/* AI Chat Panel */}
          <div className="w-96">
            <AiChatPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
