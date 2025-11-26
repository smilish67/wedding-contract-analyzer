import { X, AlertTriangle, CheckCircle, AlertCircleIcon, MessageSquare, FileText, ClipboardList } from 'lucide-react'
import { useState } from 'react'

export default function Modal({ onClose, contract }) {
  const [activeTab, setActiveTab] = useState('summary') // summary, clauses, checklist

  // 데모 데이터인지 확인 (string이면 데모)
  const isDemo = typeof contract === 'string'

  if (isDemo) {
    // 기존 데모 표시 로직 (간단히 처리)
    return (
      <div className="modal active" onClick={onClose}>
        <div className="modal-overlay" />
        <div className="modal-content w-[95%] max-w-6xl max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">예시 계약서</h2>
              <p className="text-sm text-muted-foreground mt-1">데모 계약서입니다</p>
            </div>
            <button className="modal-close" onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="p-8 overflow-y-auto max-h-[calc(95vh-100px)]">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm">{contract}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // n8n JSON 응답 파싱
  const { contract_summary, clause_analysis = [], checklist_evaluation = [] } = contract || {}

  // 위험도별 카운트
  const severityCounts = {
    high: clause_analysis.filter(c => c.severity === 'high').length,
    medium: clause_analysis.filter(c => c.severity === 'medium').length,
    low: clause_analysis.filter(c => c.severity === 'low').length,
  }

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high': return 'destructive'
      case 'medium': return 'warning'
      case 'low': return 'info'
      default: return 'muted'
    }
  }

  const getRiskLevelText = (level) => {
    switch (level) {
      case 'high': return '높음'
      case 'medium': return '중간'
      case 'low': return '낮음'
      default: return '알 수 없음'
    }
  }

  const getChecklistStatusIcon = (status) => {
    switch (status) {
      case 'ok': return <CheckCircle className="w-5 h-5 text-success" />
      case 'risky': return <AlertTriangle className="w-5 h-5 text-destructive" />
      case 'missing': return <AlertCircleIcon className="w-5 h-5 text-warning" />
      default: return <AlertCircleIcon className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-overlay" />
      <div className="modal-content w-[95%] max-w-6xl max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">계약서 분석 결과</h2>
              <p className="text-sm text-muted-foreground mt-1">
                전체 위험도: <span className={`font-bold text-${getRiskLevelColor(contract_summary?.overall_risk_level)}`}>
                  {getRiskLevelText(contract_summary?.overall_risk_level)}
                </span>
              </p>
            </div>
            <button className="modal-close" onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border -mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'summary'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              전체 요약
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'clauses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('clauses')}
            >
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              조항별 분석 ({clause_analysis.length})
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'checklist'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('checklist')}
            >
              <ClipboardList className="w-4 h-4 inline mr-2" />
              체크리스트 ({checklist_evaluation.length})
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-180px)]">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Risk Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-destructive/10 rounded-lg p-4 text-center border border-destructive/20">
                  <div className="text-3xl font-black text-destructive mb-1">{severityCounts.high}</div>
                  <div className="text-xs text-muted-foreground font-medium">높은 위험</div>
                </div>
                <div className="bg-warning/10 rounded-lg p-4 text-center border border-warning/20">
                  <div className="text-3xl font-black text-warning mb-1">{severityCounts.medium}</div>
                  <div className="text-xs text-muted-foreground font-medium">중간 위험</div>
                </div>
                <div className="bg-info/10 rounded-lg p-4 text-center border border-info/20">
                  <div className="text-3xl font-black text-info mb-1">{severityCounts.low}</div>
                  <div className="text-xs text-muted-foreground font-medium">낮은 위험</div>
                </div>
              </div>

              {/* Summary */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">전체 요약</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {contract_summary?.summary}
                </p>
                {contract_summary?.main_issues && contract_summary.main_issues.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">주요 이슈</h4>
                    <ul className="space-y-2">
                      {contract_summary.main_issues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-1" />
                          <span className="text-sm text-muted-foreground">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clauses Tab */}
          {activeTab === 'clauses' && (
            <div className="space-y-4">
              {clause_analysis.map((clause) => (
                <div
                  key={clause.clause_id}
                  className={`card p-6 border-l-4 border-${getRiskLevelColor(clause.severity)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{clause.title}</h3>
                        <span className={`badge badge-${clause.severity === 'high' ? 'destructive' : clause.severity === 'medium' ? 'secondary' : 'default'} text-xs`}>
                          {getRiskLevelText(clause.severity)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {clause.risk_tags?.map((tag, idx) => (
                          <span key={idx} className="badge badge-outline text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* User Clause Text */}
                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">📄 계약서 원문</h4>
                    <p className="text-sm leading-relaxed">
                      {clause.user_clause_text}
                      {clause.span_hint?.snippet && (
                        <span className={`ml-2 px-2 py-1 rounded bg-${getRiskLevelColor(clause.severity)}/20 text-${getRiskLevelColor(clause.severity)} font-semibold`}>
                          ⚠️ "{clause.span_hint.snippet}"
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Standard Reference */}
                  {clause.standard_reference && (
                    <div className="bg-success/10 p-4 rounded-lg mb-4 border border-success/20">
                      <h4 className="text-sm font-semibold mb-2 text-success">✅ 표준 계약서 기준</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{clause.standard_reference}</p>
                    </div>
                  )}

                  {/* Reason */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">💡 위험 사유</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{clause.reason}</p>
                  </div>

                  {/* Suggested Revision */}
                  {clause.suggested_revision && (
                    <div className="bg-info/10 p-4 rounded-lg mb-4 border border-info/20">
                      <h4 className="text-sm font-semibold mb-2 text-info">🔧 제안 수정안</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{clause.suggested_revision}</p>
                    </div>
                  )}

                  {/* Question for Vendor */}
                  {clause.question_for_vendor && (
                    <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
                      <h4 className="text-sm font-semibold mb-2 text-warning flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> 업체에 물어볼 질문
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{clause.question_for_vendor}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              {checklist_evaluation.map((item) => (
                <div key={item.checklist_id} className="card p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getChecklistStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.comment}</p>
                      {item.related_clauses && item.related_clauses.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          관련 조항: {item.related_clauses.join(', ')}
                        </div>
                      )}
                    </div>
                    <span className={`badge badge-${
                      item.status === 'ok' ? 'default' :
                      item.status === 'risky' ? 'destructive' :
                      item.status === 'missing' ? 'secondary' :
                      'outline'
                    } text-xs`}>
                      {item.status === 'ok' ? '양호' :
                       item.status === 'risky' ? '위험' :
                       item.status === 'missing' ? '누락' :
                       '해당없음'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
